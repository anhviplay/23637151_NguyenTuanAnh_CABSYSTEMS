# Hợp đồng kênh thông báo

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

Quy ước/schema/lỗi dùng chung: [common.md](common.md). Bảng truy vết đầy đủ: [traceability.md](../../traceability.md).

## API-34 — Gửi thông báo qua kênh được chọn

**Operation đề xuất:** `POST notification-adapter:send`.

**Truy vết:** FR-15, FR-33, FR-35, FR-36, FR-37, FR-38, FR-39, FR-40; UC-05, UC-06, UC-07, UC-08, UC-09; AC-15, AC-33, AC-35, AC-36, AC-37, AC-38, AC-39, AC-40.

**Điều kiện quyết định:** OI-12, OI-17

**Đầu vào:** NotificationCommand: notificationId, recipientRef, eventType, businessRef và nội dung theo OI-12.

**Kết quả:** DeliveryReceipt: providerReference và kết quả tiếp nhận.

**Hành vi:** Adapter kỹ thuật, không bổ sung actor chính thức. Phân biệt tiếp nhận, gửi và người dùng nhận; không coi ACK là delivered. Lỗi kênh không làm dừng toàn bộ đặt xe.

**Quyền:** Chứng thực tích hợp theo hợp đồng provider/kênh; không dùng session Customer.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-35 — Nhận trạng thái gửi

**Operation đề xuất:** `POST /integrations/notifications/{providerKey}/results`.

**Truy vết:** FR-15, FR-33, FR-35, FR-36, FR-37, FR-38, FR-39, FR-40; UC-05, UC-06, UC-07, UC-08, UC-09; AC-15, AC-33, AC-35, AC-36, AC-37, AC-38, AC-39, AC-40.

**Điều kiện quyết định:** OI-12, OI-17

**Đầu vào:** DeliveryResult: eventId, providerReference, notificationId và trạng thái provider.

**Kết quả:** 200; IntegrationReceipt.

**Hành vi:** Chỉ áp dụng nếu kênh hỗ trợ callback; chứng thực và chống xử lý trùng trước khi cập nhật. Cơ chế thay thế khi không callback chờ OI-12.

**Quyền:** Chứng thực tích hợp theo hợp đồng provider/kênh; không dùng session Customer.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.
