# Hợp đồng sandbox thanh toán cục bộ

payment-service gọi `https://payment-sandbox:3000` với X-Sandbox-Key. Sandbox lưu giao dịch bền vững trong SQLite trên volume riêng; không sử dụng tiền thật. Client quản lý sandbox qua Gateway bằng Operations có payment:sandbox.

## Tạo và truy vấn giao dịch

POST /payments nhận paymentId, merchantReference, amount, currency=VND, commandId, callbackUrl. Trả 201 với providerReference và thông tin giao dịch. Cùng commandId/nội dung trả nguyên response; khác nội dung trả 409. payment-service dùng paymentId + Idempotency-Key làm commandId.
GET /payments/{providerReference} trả providerStatus, callbackDelivered, callbackAttempts cùng mã đối soát. Đây là API của sandbox; CAB xác nhận kết quả bằng callback có chữ ký.

## Hoàn tất và callback

Qua Gateway: POST /api/v1/sandbox/payments/{providerReference}/settle với result=SUCCESS/FAILED. Sandbox gửi POST /api/v1/integrations/payments/local-sandbox/results qua Gateway với eventId, providerReference, merchantReference, result, amount, currency, occurredAt, signature.
Chữ ký HMAC-SHA256 tính từ `eventId|providerReference|merchantReference|result|amount|currency|occurredAt`, dùng PAYMENT_CALLBACK_SECRET. Callback đối chiếu mã tham chiếu, số tiền, VND và eventId; chữ ký sai 401, đối soát sai 409, hợp lệ/trùng trả 204. Callback không yêu cầu Idempotency-Key vì chống lặp bằng eventId.

SUCCESS chuyển Payment COMPLETED, FAILED chuyển FAILED. Payment đã COMPLETED không bị kết quả muộn hạ trạng thái. payment.status-changed cập nhật Trip.paymentStatus=COMPLETED, paymentId, paidAt; Trip.status vẫn COMPLETED. Thông báo kết quả được gửi vào hộp in-app.
POST /api/v1/sandbox/payments/{providerReference}/replay-callback gửi lại cùng event. Không tạo giao dịch hay thanh toán lần hai. Sandbox tự thử lại callback chưa được tiếp nhận. Command CAB cùng Idempotency-Key trả nguyên response cũ kể cả sau khi Payment đã đổi trạng thái.
