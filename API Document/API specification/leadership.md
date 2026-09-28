# API báo cáo hoạt động

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

Quy ước/schema/lỗi dùng chung: [common.md](common.md). Bảng truy vết đầy đủ: [traceability.md](../../traceability.md).

Tên file được giữ để thay tài liệu repo cũ. UC-14 có actor truy cập TBD — OI-09; tài liệu không thiết lập actor Leadership hoặc quyền mặc định cho Operations Staff.

## API-30 — Báo cáo hoạt động

**Operation đề xuất:** `GET /reports/operations`.

**Truy vết:** FR-51, FR-52, FR-53, FR-54, FR-55; UC-14; AC-51, AC-52, AC-53, AC-54, AC-55.

**Điều kiện quyết định:** OI-04, OI-09, OI-14

**Đầu vào:** ReportQuery: kỳ báo cáo và bộ chỉ số theo OI-09.

**Kết quả:** 200; OperationsReport.

**Hành vi:** Actor truy cập chưa chốt OI-09; tên file không tạo actor Leadership hoặc cấp quyền mặc định. Chỉ số dùng công thức, nguồn và kỳ đã duyệt.

**Quyền:** Actor và quyền truy cập báo cáo chờ OI-09; không cấp mặc định.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.
