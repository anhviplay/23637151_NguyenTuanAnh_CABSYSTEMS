# Đặc tả kiểm thử CAB System

Bản triển khai CAB System được xác định theo 30 mục của PHIEU_CHAM_PROJECT.pdf. Số thứ tự và tên mục chấm giữ nguyên. Các ví dụ payload trên phiếu được ánh xạ vào tài nguyên CAB: tài khoản dùng phoneNumber; thanh toán dùng paymentId và Idempotency-Key. Kết quả HTTP, quyền truy cập và trạng thái phải giữ đúng yêu cầu chấm.

| STT | Nội dung | Kết quả |
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

## Phân nhóm

- [TS01_Customer_Account_Management.md](TS01_Customer_Account_Management.md): 9, 10, 11
- [TS02_Driver_Account_Vehicle_Availability.md](TS02_Driver_Account_Vehicle_Availability.md): 12, 21, 22, 23
- [TS03_Create_Booking.md](TS03_Create_Booking.md): 14, 15
- [TS04_Driver_Search_Assignment.md](TS04_Driver_Search_Assignment.md): 13, 15, 16
- [TS05_Driver_Assignment_Response.md](TS05_Driver_Assignment_Response.md): 16
- [TS06_Trip_Status_Management.md](TS06_Trip_Status_Management.md): 17, 18
- [TS07_Driver_Location.md](TS07_Driver_Location.md): 13, 17
- [TS08_Fare_Payment.md](TS08_Fare_Payment.md): 19, 30
- [TS09_Notification.md](TS09_Notification.md): 16, 18, 22
- [TS10_Trip_History_Rating.md](TS10_Trip_History_Rating.md): 20
- [TS11_Operations.md](TS11_Operations.md): 22
- [TS12_Authorization_Audit.md](TS12_Authorization_Audit.md): 11, 12, 27, 28
- [TS14_Data_Integrity_Security.md](TS14_Data_Integrity_Security.md): 2, 24, 25, 26, 27, 28, 30
- [TS15_End_to_End_Critical_Scenarios.md](TS15_End_to_End_Critical_Scenarios.md): 15, 16, 17, 18, 19, 20
- [TS16_Non_Functional_Requirements.md](TS16_Non_Functional_Requirements.md): 6, 7, 8, 29
- [TS17_External_Interfaces_Release.md](TS17_External_Interfaces_Release.md): 1, 2, 3, 4, 5, 6, 7, 8, 19, 30

## Nguyên tắc xác nhận

Kiểm thử hệ thống ghi đủ 30 STT; API Postman kiểm tra phản hồi và trạng thái thật. Mục 16 phải có thông tin Driver, mục 18 có Trip CANCELED và thông báo hai bên, mục 19 có Payment COMPLETED cùng Trip ghi nhận đã thanh toán. Mục 24 kiểm tra DB/khóa; các mục kiến trúc kiểm tra source/cấu hình, không thay bằng một response API.

Không mặc định testcase đạt chỉ vì có đặc tả. Kết quả chạy lưu riêng trong .data/latest-verification.json và .data/postman-run.json để không đưa credential vào repository.
