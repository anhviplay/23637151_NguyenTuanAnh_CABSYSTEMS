# Kiểm thử Fare Payment

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 19 | POSTMAN: Thanh toán online | Trip COMPLETED, Fare và Payment PENDING | Chọn ELECTRONIC, settle sandbox, kiểm tra Payment COMPLETED và Trip.paymentStatus=COMPLETED, paymentId, paidAt. | Payment chuyển COMPLETED; chuyến được ghi nhận đã thanh toán. |
| 30 | POSTMAN: Replay attack (idempotency) | Đã chọn ELECTRONIC với Idempotency-Key | Gửi lại command cùng key/body trước/sau callback; so status/body gốc, Payment version và số giao dịch sandbox; gửi lại callback cùng eventId. | Không xử lý lại transaction; không double charge; trả response cũ. |
