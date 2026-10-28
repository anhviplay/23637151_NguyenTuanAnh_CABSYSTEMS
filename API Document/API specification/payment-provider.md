# Hợp đồng External Payment Provider

Hợp đồng này thuộc `payment-service`. Provider được truy cập qua adapter để có thể thay thế mà không sửa Booking hoặc Dispatch.

## PAY-01 Tạo giao dịch điện tử

- **Contract:** `payment-adapter.createPayment`
- **Truy xuất:** FR-37; UC-15; AC-21
- **Input:** `paymentId`, `merchantReference`, `amount`, `currency`, `returnUrl`, `callbackUrl`, `commandId`
- **Output:** `providerReference`, `providerStatus`, dữ liệu chuyển hướng được phép
- **Quy tắc:** không gửi dữ liệu ngoài phạm vi provider yêu cầu; `commandId` và `merchantReference` chống tạo trùng

## PAY-02 Tiếp nhận kết quả

- **Operation:** `POST /api/v1/integrations/payments/{providerKey}/results`
- **Truy xuất:** FR-38, FR-39; UC-15; AC-21, AC-22
- **Bảo mật:** xác minh chữ ký/chứng thực và nguồn callback theo hợp đồng provider
- **Body:** `eventId`, `providerReference`, `merchantReference`, `result`, `amount`, `currency`, `occurredAt`, `signature`
- **Kết quả:** `204` khi đã tiếp nhận; callback trùng trả cùng kết quả và không cập nhật lặp

## PAY-03 Truy vấn đối soát

- **Contract:** `payment-adapter.queryPayment`
- **Truy xuất:** FR-38; UC-15; AC-21
- **Input:** `paymentId`, `providerReference`
- **Output:** trạng thái provider và thời điểm cập nhật gần nhất

## Trạng thái và quy tắc

- CAB dùng `PENDING`, `COMPLETED`, `FAILED`.
- Khi Customer thực hiện lại sau `FAILED`, cùng Payment chuyển về `PENDING`; không tạo Fare mới.
- Kết quả `COMPLETED` đã đối soát không bị callback muộn ghi đè thành `FAILED`.
- CAB chỉ lưu `providerReference`, trạng thái và dữ liệu đối soát được phép; không lưu dữ liệu thẻ/tài khoản nhạy cảm.
- Lỗi provider không làm rollback Booking hoặc Trip.


## Cấu hình môi trường thực hành — sandbox cục bộ

- Provider: `payment-sandbox`, kết nối qua adapter của `payment-service`.
- Sandbox xử lý giao dịch trong môi trường kiểm thử, không sử dụng tiền thật. Adapter Payment kết nối qua HTTPS nội bộ; API quản lý sandbox yêu cầu `X-Sandbox-Key` lấy từ cấu hình.
- PAY-01 được ánh xạ tới `POST /payments`; cùng `commandId` và nội dung trả cùng mã tham chiếu; khác nội dung trả 409.
- PAY-03 được ánh xạ tới `GET /payments/{providerReference}`.
- Thao tác kiểm thử `POST /payments/{providerReference}/settle` nhận `result=SUCCESS` hoặc `FAILED`; sandbox gửi callback PAY-02 qua Gateway. `POST /payments/{providerReference}/replay-callback` gửi lại cùng event để kiểm tra chống lặp.
- Chữ ký callback là HMAC-SHA256 theo chuỗi `eventId|providerReference|merchantReference|result|amount|currency|occurredAt`; secret nằm trong `.env`, tách khỏi dữ liệu giao dịch.
- `SUCCESS` ánh xạ sang Payment `COMPLETED`; `FAILED` ánh xạ sang `FAILED`. Không thay đổi quy tắc tạo Fare, Payment hiện hành hoặc idempotency của CAB.
