# Kiểm thử External Interfaces Release

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 1 | Mô tả kiến trúc tổ chức source code | Source đã có đủ thư mục nghiệp vụ | Kiểm tra Gateway, shared, proto, infra và 9 owner. | Source gồm Gateway, 9 service nghiệp vụ, shared, proto, infra và sandbox thanh toán. |
| 2 | Kiểm tra .gitignore và .env trên github | Repository đã khởi tạo | Đối chiếu git check-ignore và git ls-files với .env, .env.example, .data. | .env bị Git bỏ qua; .env.example chỉ chứa biến mẫu, không chứa mật khẩu hoặc khóa thực. |
| 3 | Mô tả nhiệm vụ gateway trong hệ thống | Gateway đang chạy | Đối chiếu source xác thực/định tuyến/Redis và phản hồi HTTP. | Gateway xác thực JWT, định tuyến tới owner, giới hạn request và tổng hợp health. |
| 4 | Mô tả IPC của các microservice | Kafka và gRPC đang chạy | Tạo Booking, nhận offer, chấp nhận và đọc Trip sau sự kiện. | Booking gọi Driver/Location qua gRPC; Kafka truyền sự kiện nghiệp vụ qua outbox/inbox. |
| 5 | Compose hệ thống và liệt kê các container | Docker Desktop hoạt động | Đối chiếu Compose, danh sách container, health và exit code init. | 16 container chạy báo healthy; 4 tác vụ khởi tạo kết thúc mã 0. |
| 6 | POSTMAN: API health check | Gateway HTTPS sẵn sàng, có token Operations | Gọi /health, /ready, /health/services. | Endpoint trả trạng thái healthy/ready và danh sách service. |
| 7 | Kiểm tra hệ thống Kafka / Rabbit MQ | Kafka healthy | Liệt kê topic, đối chiếu business event và consumer xử lý. | Kafka KRaft hoạt động; 14 topic nghiệp vụ; producer và consumer xử lý được sự kiện. |
| 8 | Kiểm tra mọi request đều phải đi qua Gateway | Các container đang chạy | Đối chiếu host ports và gọi API qua Gateway; không có cổng nghiệp vụ riêng. | Chỉ Gateway công bố cổng máy chủ 127.0.0.1:8443; API nghiệp vụ và callback đi qua Gateway. |
| 19 | POSTMAN: Thanh toán online | Trip COMPLETED, Fare và Payment PENDING | Chọn ELECTRONIC, settle sandbox, kiểm tra Payment COMPLETED và Trip.paymentStatus=COMPLETED, paymentId, paidAt. | Payment chuyển COMPLETED; chuyến được ghi nhận đã thanh toán. |
| 30 | POSTMAN: Replay attack (idempotency) | Đã chọn ELECTRONIC với Idempotency-Key | Gửi lại command cùng key/body trước/sau callback; so status/body gốc, Payment version và số giao dịch sandbox; gửi lại callback cùng eventId. | Không xử lý lại transaction; không double charge; trả response cũ. |
