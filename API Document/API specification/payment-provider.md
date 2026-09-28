# Hợp đồng External Payment Provider

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

Quy ước/schema/lỗi dùng chung: [common.md](common.md). Bảng truy vết đầy đủ: [traceability.md](../../traceability.md).

## API-31 — Gửi giao dịch tới External Payment Provider

**Operation đề xuất:** `POST provider-adapter:create-payment`.

**Truy vết:** FR-31; UC-09; AC-31.

**Điều kiện quyết định:** OI-17

**Đầu vào:** ProviderPaymentCommand: paymentId, attemptId, merchantReference, Money; returnRoute do CAB cấu hình.

**Kết quả:** ProviderAcknowledgement: providerReference và kết quả tiếp nhận.

**Hành vi:** Đây là port nội bộ adapter, không giả định URL thật. Thông tin xác thực merchant qua cấu hình bảo mật; không nhận callback URL từ Customer.

**Quyền:** Chứng thực tích hợp theo hợp đồng provider/kênh; không dùng session Customer.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-32 — Tiếp nhận kết quả giao dịch

**Operation đề xuất:** `POST /integrations/payments/{providerKey}/results`.

**Truy vết:** FR-32, FR-33, FR-39; UC-09; AC-32, AC-33, AC-39.

**Điều kiện quyết định:** OI-12, OI-17

**Đầu vào:** ProviderResult: eventId, providerReference, merchantReference, kết quả gốc, Money nếu provider cung cấp, occurredAt.

**Kết quả:** 200; IntegrationReceipt sau khi nhận bền vững; lỗi theo common.md.

**Hành vi:** Xác minh chứng thực theo hợp đồng provider trước khi xử lý; đối chiếu attempt, số tiền/tiền tệ nếu có; xử lý lặp theo mã sự kiện. Kết quả muộn/xung đột chờ OI-17, không last-write-wins.

**Quyền:** Chứng thực tích hợp theo hợp đồng provider/kênh; không dùng session Customer.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-33 — Đối soát kết quả chưa xác định

**Operation đề xuất:** `GET provider-adapter:query-payment`.

**Truy vết:** FR-32; UC-09; AC-32.

**Điều kiện quyết định:** OI-17

**Đầu vào:** providerReference hoặc merchantReference theo hợp đồng provider.

**Kết quả:** ProviderResult hoặc trạng thái chưa xác định.

**Hành vi:** Port có điều kiện: chỉ dùng nếu provider hỗ trợ; nếu không cần phương án đối soát được duyệt tại OI-17. Không tự đặt tần suất hoặc timeout.

**Quyền:** Chứng thực tích hợp theo hợp đồng provider/kênh; không dùng session Customer.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.
