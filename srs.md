# Đặc tả yêu cầu CAB System

Phiên bản 3.0 — 29/10/2026

Bản triển khai CAB System được xác định theo 30 mục của PHIEU_CHAM_PROJECT.pdf. Số thứ tự và tên mục chấm giữ nguyên. Các ví dụ payload trên phiếu được ánh xạ vào tài nguyên CAB: tài khoản dùng phoneNumber; thanh toán dùng paymentId và Idempotency-Key. Kết quả HTTP, quyền truy cập và trạng thái phải giữ đúng yêu cầu chấm.

## Phạm vi nghiệp vụ

- Booking mới trả `201` với `SEARCHING`. Dispatch dùng vị trí còn hiệu lực, bán kính cấu hình, eligibility và reservation để gửi từng offer; không có ứng viên thì `NO_DRIVER_AVAILABLE`.
- Driver chấp nhận offer còn hạn. Booking ghi `driverId`, `vehicleId`, `driverInfo` và phát `booking.driver-assigned`; Trip được tạo qua Kafka. Customer xem tên tài xế và thông tin xe trong Booking/Trip của mình, không được gọi API hồ sơ Driver.
- Trip đi đúng thứ tự `CREATED → DRIVER_ARRIVED → PICKED_UP → IN_PROGRESS → COMPLETED`. Lệnh hoàn thành có `distanceKm` không âm; vị trí di chuyển được gửi riêng tới Location.
- Customer hoặc Driver chỉ hủy trước khi đón khách. Customer gửi reasonCode, reasonText và expectedVersion. Trip chuyển `CANCELED`; cả Customer và Driver nhận thông báo in-app.
- Trip hoàn thành tạo một Fare và một Payment `PENDING`. Đơn giá BIKE/CAR_4/CAR_7 là 5.000/10.000/13.000 VND/km; totalAmount làm tròn về số nguyên VND.
- Customer chọn `ELECTRONIC`; sandbox cục bộ tạo giao dịch và gửi callback có chữ ký. Callback hợp lệ đưa Payment về `COMPLETED` hoặc `FAILED`. Sự kiện Payment cập nhật Trip: `paymentStatus=COMPLETED`, paymentId, paidAt; trạng thái vòng đời Trip vẫn `COMPLETED`.
- Chọn CASH hoặc retry Payment điện tử dùng cùng Payment hiện hành. Callback trùng và lệnh cùng Idempotency-Key không tạo thêm giao dịch. Payment đã COMPLETED không bị kết quả muộn ghi đè thành FAILED.
- Rating có score nguyên 1–5 và comment, thuộc Customer của Trip đã COMPLETED, mỗi Trip một Rating; không bắt buộc thanh toán trước khi đánh giá.
- Driver đăng ký bằng OTP xác minh một lần, hồ sơ cá nhân và xe; trạng thái ban đầu PENDING_VERIFICATION. Operations có driver:verify quyết định ACTIVE/REJECTED và nêu lý do; Driver nhận kết quả qua in-app.
- Driver ACTIVE và không có chuyến đang chạy được đổi AVAILABLE/OFFLINE. BUSY do sự kiện nhận chuyến; hoàn thành hoặc hủy giải phóng Driver.
- Thông báo được lưu vào hộp in-app và đọc qua GET /api/v1/notifications/me với token của chính người nhận. Không có Push Provider hoặc callback nhận trạng thái push trong bản triển khai này.

## Kiến trúc và dữ liệu

| Service | Trách nhiệm | Kho dữ liệu | Loại bản ghi nghiệp vụ |
| --- | --- | --- | --- |
| identity-service | Tài khoản, OTP đăng ký, phiên và JWT | identity_db (PostgreSQL) | account, phone, otp, otp_delivery, used_proof, session |
| customer-service | Hồ sơ Customer, Rating và điểm tổng hợp Driver | customer_db (PostgreSQL) | customer, completed_trip, rating |
| driver-service | Hồ sơ, xe, xét duyệt và availability | driver_db (PostgreSQL) | driver, closed_booking |
| location-service | Vị trí, nearby và ETA | location_db (MongoDB + Redis GEO) | current, history |
| booking-service | Booking, tìm tài xế, Assignment và reservation | booking_db (PostgreSQL) | booking, assignment, reservation |
| trip-service | Vòng đời Trip và ghi nhận thanh toán | trip_db (PostgreSQL) | trip, cancelled_booking |
| payment-service | Đơn giá, Fare, Payment và callback | payment_db (PostgreSQL) | service_rate, fare, payment, callback |
| notification-service | Hộp thông báo in-app của từng actor | notification_db (MongoDB) | notification |
| operations-service | Read model vận hành và audit sự kiện | operations_db (PostgreSQL) | driver, booking, trip, payment, audit |

- API máy chủ công khai là `https://localhost:8443`; chỉ Gateway có host port. Service HTTP nội bộ dùng cổng 3000; Driver/Location cung cấp gRPC 50051 trên mạng backend nội bộ.
- PostgreSQL có 7 database với user riêng; MongoDB replica set có location_db và notification_db với user riêng. Không JOIN hoặc truy cập database của service khác.
- Trong PostgreSQL, dữ liệu nghiệp vụ nằm ở `records(kind,id,body JSONB)`; trong MongoDB dùng collection `records` với `kind` và `body`. `outbox` và `inbox` lưu sự kiện gửi/chống lặp. Sơ đồ entity là mô hình logic, không phải danh sách bảng SQL riêng cho từng entity.
- Redis Location lưu chỉ mục GEO theo Driver; MongoDB lưu vị trí và lịch sử. Redis Gateway lưu bộ đếm giới hạn request, tách credential khỏi Redis Location.
- Kafka có 14 topic nghiệp vụ. Outbox cùng transaction với thay đổi nguồn; Inbox chống xử lý lại cùng eventId. Các consumer cần thứ tự dùng version của projection tương ứng.
- 16 dịch vụ chạy lâu dài gồm Gateway, 9 service, PostgreSQL, MongoDB, 2 Redis, Kafka và payment-sandbox. Bốn init job gồm mongo-keyfile, mongo-init, kafka-storage-init và kafka-init.
- Mọi API nghiệp vụ từ Postman đi qua Gateway. Callback sandbox cũng gọi Gateway; gRPC và Kafka là giao tiếp nội bộ.

## Bảo mật và nhất quán

- JWT HS256 kiểm tra chữ ký, issuer, audience và thời hạn tại Gateway và service. Token sai trả 401; actor sai quyền trả 403 trước khi trả dữ liệu.
- Mật khẩu băm scrypt với salt ngẫu nhiên; số điện thoại, giấy phép và biển số trong hồ sơ gốc được mã hóa AES-256-GCM. Tra cứu điện thoại dùng HMAC. Tên tài xế và biển số được cấp cho Customer đã gán chuyến trong driverInfo để nhận diện xe.
- Khóa mã hóa, JWT, callback, sandbox và mật khẩu kho dữ liệu lấy từ .env. .env, .data và TLS private key không được Git theo dõi; .env.example và environment Postman mẫu không chứa secret thật.
- SQL dùng tham số; input sai trả 400 hoặc 401, không bypass xác thực hoặc lộ lỗi DB. JSON dùng escape cho <, > và &, giữ Content-Type application/json; script đầu vào không thực thi.
- Rate limit mặc định 120 request/60 giây theo IP, tài khoản, method và path; cấu hình trong .env. Vượt ngưỡng trả 429 với Retry-After. Bộ kiểm tra bắn 1.100 request đồng thời và kiểm tra readiness sau burst.
- Command tạo hoặc thay đổi trạng thái có Idempotency-Key. Cùng actor/key và cùng method/path/body trả nguyên status/body cũ, kể cả metadata. Khác nội dung cùng key trả 409. Phiên đăng nhập và callback có cơ chế riêng.
- Cập nhật có version gửi expectedVersion trong body; PATCH hồ sơ Customer dùng version. Bản này không dùng If-Match làm điều kiện cập nhật. Danh sách dùng page/pageSize, pageSize là limit, mặc định 20 và tối đa 100 do service kiểm tra.

## Yêu cầu theo phiếu chấm

Các mục 1–5, 7 và 8 có phần trình bày dựa trên source/cấu hình và kết quả kiểm tra thực tế. Các mục còn lại kiểm tra bằng API, dữ liệu hoặc phản hồi hệ thống. Không đổi số thứ tự thành thứ tự thao tác.

| STT | Nội dung | Kết quả của CAB |
| --- | --- | --- |
| 1 | Mô tả kiến trúc tổ chức source code | Source gồm Gateway, 9 service nghiệp vụ, shared, proto, infra và sandbox thanh toán. |
| 2 | Kiểm tra .gitignore và .env trên github | .env bị Git bỏ qua; .env.example chỉ chứa biến mẫu, không chứa mật khẩu hoặc khóa thực. |
| 3 | Mô tả nhiệm vụ gateway trong hệ thống | Gateway xác thực JWT, định tuyến tới owner, giới hạn request và tổng hợp health. |
| 4 | Mô tả IPC của các microservice | Booking gọi Driver/Location qua gRPC; Kafka truyền sự kiện nghiệp vụ qua outbox/inbox. |
| 5 | Compose hệ thống và liệt kê các container | 16 container chạy báo healthy; 4 tác vụ khởi tạo kết thúc mã 0. |
| 6 | POSTMAN: API health check | Endpoint trả trạng thái healthy/ready và danh sách service. |
| 7 | Kiểm tra hệ thống Kafka / Rabbit MQ | Kafka KRaft hoạt động; 14 topic nghiệp vụ; producer và consumer xử lý được sự kiện. |
| 8 | Kiểm tra mọi request đều phải đi qua Gateway | Chỉ Gateway công bố cổng máy chủ 127.0.0.1:8443; API nghiệp vụ và callback đi qua Gateway. |
| 9 | POSTMAN: Đăng ký tài khoản khách hàng | Tài khoản được tạo; khách hàng đăng nhập được vào hệ thống. |
| 10 | POSTMAN: Đăng nhập khách hàng | Hệ thống cấp token. |
| 11 | POSTMAN: Lấy thông tin khách hàng với mã số | Sử dụng token để xem thông tin khách hàng. |
| 12 | POSTMAN: Lấy thông tin tài xế với mã số | Sử dụng token để xem thông tin tài xế. |
| 13 | POSTMAN: Liệt kê danh sách tài xế tại khu vực | Danh sách Driver xung quanh tọa độ có bán kính 1 km, danh sách có giới hạn (limit) và phân trang (paging). |
| 14 | POSTMAN: Liệt kê danh sách các booking của Customer | Danh sách Booking liên quan đến khách hàng, danh sách có giới hạn (limit) và phân trang (paging). |
| 15 | POSTMAN: Đặt xe | Booking được tạo; khách hàng thấy trạng thái đang tìm tài xế. |
| 16 | POSTMAN: Tài xế nhận chuyến | Ride/Trip được gán tài xế; khách hàng nhận thông tin tài xế. |
| 17 | POSTMAN: Cập nhật trạng thái chuyến | Trạng thái chuyến cập nhật đúng trình tự. |
| 18 | POSTMAN: Hủy chuyến | Ride/Trip chuyển sang CANCELED; các bên nhận thông báo. |
| 19 | POSTMAN: Thanh toán online | Payment chuyển COMPLETED; chuyến được ghi nhận đã thanh toán. |
| 20 | POSTMAN: Đánh giá chuyến đi | Review được lưu và liên kết với chuyến đi. |
| 21 | POSTMAN: Đăng ký tài xế | Hồ sơ tài xế được tạo ở trạng thái chờ duyệt. |
| 22 | POSTMAN: Duyệt hồ sơ tài xế | Trạng thái hồ sơ được cập nhật; tài xế nhận kết quả. |
| 23 | POSTMAN: Bật/tắt trạng thái nhận chuyến | Trạng thái nhận chuyến thay đổi và được hệ thống ghi nhận. |
| 24 | POSTMAN: Data encryption at rest | Dữ liệu nhạy cảm không lưu plaintext; mật khẩu được băm; dữ liệu cần khôi phục được mã hóa; khóa tách khỏi DB. |
| 25 | POSTMAN: SQL injection attempt | Query không bị bypass; không đăng nhập thành công; không lộ dữ liệu DB; HTTP 400 hoặc 401. |
| 26 | POSTMAN: XSS input test | Script không được execute; output được escape. |
| 27 | POSTMAN: JWT tampering | Token bị sửa bị từ chối; HTTP 401; không truy cập được API. |
| 28 | POSTMAN: Unauthorized API access | HTTP 403 Forbidden; không trả dữ liệu. |
| 29 | POSTMAN: Rate limit attack | HTTP 429 Too Many Requests; rate limit hoạt động; hệ thống vẫn phản hồi. |
| 30 | POSTMAN: Replay attack (idempotency) | Không xử lý lại transaction; không double charge; trả response cũ. |

## Điều kiện dữ liệu và kiểm chứng

Có ít nhất 5 Driver với các trạng thái xác minh/availability khác nhau trong vùng 1 km và ít nhất 5 Booking thuộc Customer thực hành. Dữ liệu vị trí có observedAt còn hiệu lực; phân trang thử với pageSize=2.

`scripts/verify-system.mjs` kiểm tra 30 mục; collection Postman giữ STT của phiếu và chờ có giới hạn ở bước đọc projection Kafka. Kết quả mỗi lần chạy lưu cục bộ dưới .data, không đưa token hoặc mật khẩu vào Git. Testcase đặc tả kết quả cần kiểm chứng; kết quả chạy được xác nhận riêng, không mặc định mọi testcase đã đạt.
