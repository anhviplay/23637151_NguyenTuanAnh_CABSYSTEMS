# Hợp đồng xử lý nội bộ

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

## Điều phối — FR-13, FR-14, FR-18

Đầu vào: bookingId, điểm đón, loại xe và snapshot ứng viên gồm driverId, dữ liệu vị trí có thời điểm, readiness và tiêu chí vận hành được duyệt. Đầu ra: tập ứng viên/kết quả lựa chọn, assignmentId được đề nghị hoặc kết quả không tìm được. Kết quả phải gắn version của chính sách để kiểm chứng.

Tiêu chí và mức ưu tiên OI-02; điều kiện không phản hồi OI-03; kết thúc tìm/chấp nhận muộn/đồng thời OI-14. Không mặc định bán kính, 15 giây, gửi tuần tự, số lần tối đa hoặc first-wins. Driver từ chối/không phản hồi tiếp tục trên cùng bookingId. Callback/command từ Driver trỏ assignmentId để không nhầm lần đề nghị.

## Tính cước — FR-28

Đầu vào: tripId đã hoàn thành, loại dịch vụ và thông tin chuyến theo công thức đã duyệt. Đầu ra: FareView gồm fareId, Money, căn cứ và phiên bản quy tắc. Khi thiếu dữ liệu hoặc chưa tính được, không cung cấp số tiền 0 thay cho kết quả chưa xác định. Không phát lệnh thu tiền trước khi có cước hợp lệ. Công thức, dữ liệu, làm tròn và tiền tệ OI-01/OI-15.

## Tạo và gửi thông báo — FR-15, FR-33, FR-35–FR-40

Đầu vào là sự kiện nghiệp vụ đã ghi nhận, định danh đối tượng và người nhận. Notification lưu ý định gửi rồi chọn adapter theo OI-12; không lấy quyền quyết định trạng thái Trip/Payment. Việc CAB đã ghi nhận ý định, provider đã tiếp nhận và người dùng đã nhận là các mốc khác nhau. Retry gửi kỹ thuật, retention và xác nhận delivery cần quyết định OI-12/OI-06. Lỗi kênh được kiểm chứng theo NFR-02, không hứa hẹn không ảnh hưởng bất kỳ thao tác nào.

## Quyền và audit — FR-56–FR-58

Kiểm soát danh tính và action áp dụng tại owner. Quyền cụ thể OI-08; xác thực OI-18. Khi sự kiện thuộc danh mục audit OI-16 xảy ra, chuyển AuditEntry theo [admin.md](admin.md); chỉ có kết quả lưu bền vững mới được coi là bằng chứng. Phương án đảm bảo ghi log và hành vi khi lỗi phải được review, không tự đặt thời gian lưu hay quyền đọc audit.

## Các năng lực chưa thể đóng hợp đồng

FR-43–FR-46: GET trong operator.md chỉ là đọc. OI-20 cần xác định cụ thể các action, điều kiện, input/output, side effect và dữ liệu còn lại khi thất bại; sau đó mới thêm operation ghi. Không dùng một endpoint quản lý tổng quát nhận JSON tùy ý để che khoảng trống đặc tả.

OI-04: chưa thiết lập command hủy, actor hoặc trạng thái cho phép. OI-09: chỉ số/actor báo cáo và dữ liệu thiếu chưa được chốt. Các nội dung này được truy vết rõ trong Test Case, không bị bỏ khỏi phạm vi phân tích.
