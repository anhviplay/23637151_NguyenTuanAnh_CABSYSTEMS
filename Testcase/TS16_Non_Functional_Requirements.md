# Kiểm thử Non Functional Requirements

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 6 | POSTMAN: API health check | Gateway HTTPS sẵn sàng, có token Operations | Gọi /health, /ready, /health/services. | Endpoint trả trạng thái healthy/ready và danh sách service. |
| 7 | Kiểm tra hệ thống Kafka / Rabbit MQ | Kafka healthy | Liệt kê topic, đối chiếu business event và consumer xử lý. | Kafka KRaft hoạt động; 14 topic nghiệp vụ; producer và consumer xử lý được sự kiện. |
| 8 | Kiểm tra mọi request đều phải đi qua Gateway | Các container đang chạy | Đối chiếu host ports và gọi API qua Gateway; không có cổng nghiệp vụ riêng. | Chỉ Gateway công bố cổng máy chủ 127.0.0.1:8443; API nghiệp vụ và callback đi qua Gateway. |
| 29 | POSTMAN: Rate limit attack | Gateway và Redis healthy | Gửi 1.100 request Booking đồng thời với cùng key/body đã có; nhận 429 và /ready vẫn 200. Chờ hết cửa sổ rate limit trước đợt thao tác mới. | HTTP 429 Too Many Requests; rate limit hoạt động; hệ thống vẫn phản hồi. |
