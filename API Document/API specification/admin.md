# Kiểm soát quản trị và audit

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

## Phạm vi

Tài liệu thay thế admin.yaml của repo cũ về mặt mô tả trách nhiệm. SRS không xác nhận một actor Admin riêng hoặc chức năng tra cứu audit công khai. Vì vậy không tạo `/admin/audit-logs` như yêu cầu đã chốt.

## Kiểm soát quyền

FR-57 / BRULE-02 / AC-57 áp dụng cho UC-03 và UC-12, đồng thời các giao diện quản trị chịu EIR-03. Mọi operation quản trị phải kiểm tra danh tính và quyền action trước khi đọc/ghi. Ma trận quyền, cách cấp quyền và danh mục thao tác nhạy cảm: OI-08. [operator.md](operator.md) mô tả các operation nghiệp vụ; tài liệu này không tạo thêm role.

## Ghi nhận audit nội bộ

FR-58 / BRULE-09 / AC-58: khi thao tác thuộc danh mục đã duyệt OI-16 xảy ra, owner nghiệp vụ phát bằng chứng có actor, action, target, thời điểm và dữ liệu được phép. Audit lưu bền vững theo cơ chế được duyệt, liên kết correlationId để tra cứu sự cố. Mẫu dữ liệu và thời hạn lưu OI-16/OI-06; danh tính người tra cứu và hình thức tra cứu chưa chốt.

Không ghi credential hoặc thông tin thanh toán nhạy cảm. Không diễn giải FR-58 thành quyền mọi Operations Staff đọc toàn bộ log. Kiểm chứng phải có thao tác thuộc danh mục, đối chiếu bằng chứng, quyền và retention sau khi được duyệt. Khi khâu audit lỗi, cơ chế chặn hay tiếp tục thao tác chưa được nguồn xác định; cần quyết định trong thiết kế OI-16/NFR liên quan trước vận hành.
