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

- CAB dùng `PENDING`, `PAID`, `FAILED`.
- Khi Customer thực hiện lại sau `FAILED`, cùng Payment chuyển về `PENDING`; không tạo Fare mới.
- Kết quả `PAID` đã đối soát không bị callback muộn ghi đè thành `FAILED`.
- CAB chỉ lưu `providerReference`, trạng thái và dữ liệu đối soát được phép; không lưu dữ liệu thẻ/tài khoản nhạy cảm.
- Lỗi provider không làm rollback Booking hoặc Trip.
