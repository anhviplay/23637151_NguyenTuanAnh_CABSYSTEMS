# Quy ước API CAB System

## Kết nối và header

Base URL `https://localhost:8443`; nghiệp vụ dưới `/api/v1`. ID là UUID, JSON camelCase, thời gian ISO 8601, tiền nguyên VND. TLS certificate cục bộ nằm trong .data/tls; client tin cậy certificate khi kiểm tra HTTPS.

- Authorization Bearer bắt buộc trừ auth đăng ký/OTP/đăng nhập, sandbox OTP và callback thanh toán. Callback có chữ ký; sandbox OTP cần X-Sandbox-Key. /health và /ready không cần token.
- Command tạo hoặc chuyển trạng thái cần Idempotency-Key; đăng nhập và callback không dùng cache command này. Cùng actor/key, method/path/body trả nguyên status/body đã lưu; khác nội dung trả 409 IDEMPOTENCY_CONFLICT.
- Content-Type application/json với body; X-Correlation-Id được chuyển xuyên Gateway/service.
- Cập nhật có version gửi expectedVersion trong body; hồ sơ Customer dùng version. Không dùng If-Match để kiểm tra version.
- page bắt đầu từ 1; pageSize là limit, mặc định 20, tối đa 100 do service kiểm tra. Chỉ hỗ trợ bộ lọc/sắp xếp được ghi rõ tại operation.

## Phản hồi

Thành công: `{ "data": {}, "meta": { "correlationId": "uuid", "occurredAt": "ISO8601" } }`.
Danh sách: data là array, meta có page, pageSize, totalItems, totalPages.
Lỗi: `{ "error": { "code": "FORBIDDEN", "message": "FORBIDDEN", "fieldErrors": [], "correlationId": "uuid" } }`.
204 không có body. 400 dữ liệu sai; 401 token/chữ ký/credential sai; 403 sai quyền; 404 không tìm thấy; 409 xung đột/version/idempotency; 422 không được phép về nghiệp vụ; 429 vượt tần suất; 502/503 lỗi phụ thuộc.

## Trạng thái

Booking: SEARCHING, DRIVER_ASSIGNED, TRIP_CREATED, COMPLETED, CANCELED, NO_DRIVER_AVAILABLE.
Assignment: OFFERED, ACCEPTED, REJECTED, NO_RESPONSE, EXPIRED.
Trip: CREATED, DRIVER_ARRIVED, PICKED_UP, IN_PROGRESS, COMPLETED, CANCELED.
Payment: PENDING, COMPLETED, FAILED. Trip.paymentStatus dùng cùng bộ giá trị, độc lập Trip.status.
Driver verification: PENDING_VERIFICATION, ACTIVE, REJECTED. Availability: OFFLINE, AVAILABLE, BUSY.

## Health và Gateway

GET /health trả 200, data.status=HEALTHY. GET /ready trả 200, data.status=READY khi Gateway kết nối được Redis; nếu không trả 503.
GET /health/services cần OPERATIONS và health:read, trả data.services gồm đúng 9 service với name/status. Readiness Gateway không thay việc đọc health của từng service.
Chỉ Gateway công bố host port 127.0.0.1:8443. Rate limit cấu hình trong .env theo IP + tài khoản + method + path, mặc định 120/60 giây; 429 kèm Retry-After.

## Hộp thư OTP sandbox

GET /api/v1/sandbox/otp nhận query phoneNumber và actorType=CUSTOMER/DRIVER, cần X-Sandbox-Key; trả 200 với data.otp hoặc 403 khi sai key. Mã OTP có thời hạn theo OTP_TTL_SECONDS, chỉ dùng một lần cho đăng ký tương ứng. Hộp thư được truy cập qua Gateway.
