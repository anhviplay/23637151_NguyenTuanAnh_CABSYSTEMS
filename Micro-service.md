# Thiết kế microservice CAB System

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

## 1. Phạm vi thiết kế

Tài liệu cụ thể hóa ranh giới trách nhiệm, dữ liệu và giao tiếp để review kiến trúc. SRS v1.4 là nguồn nghiệp vụ duy nhất trong bộ tài liệu. Không đưa voucher, giá động, OTP, quên mật khẩu hoặc release MBB vào phạm vi mặc định. Xác thực cần thiết theo FR-56; phương thức cụ thể chờ OI-18.

Phân tách bên dưới là ranh giới logic đề xuất, không phải cam kết triển khai từng ranh giới thành một tiến trình/database riêng ngay trong release đầu. Quyết định tách/gộp triển khai phụ thuộc OI-11, tải OI-13 và năng lực vận hành.

## 2. Ranh giới trách nhiệm và dữ liệu

| Thành phần đề xuất | Trách nhiệm / dữ liệu sở hữu | Liên kết SRS |
| --- | --- | --- |
| Identity & Profile | Danh tính, xác thực, hồ sơ Customer; quyền truy cập dùng chung theo quyết định OI-08 | FR-01–FR-03, FR-04–FR-05 phối hợp Driver, FR-56–FR-57; UC-01–UC-03, UC-15 |
| Driver | Hồ sơ Driver, phương tiện, trạng thái làm việc/sẵn sàng; không sở hữu quyền quản trị tài khoản | FR-04–FR-09, FR-44–FR-45, FR-48; UC-03–UC-04, UC-16–UC-17, UC-12 |
| Location | Vị trí Driver, thời điểm tiếp nhận và dữ liệu hỗ trợ ETA | FR-10, FR-22; UC-18, UC-07 |
| Booking & Dispatch | Booking, đề nghị Driver, phản hồi và tiến trình tìm Driver | FR-11–FR-21; UC-05–UC-07 |
| Trip | Mốc Trip và quyền cập nhật; nguồn dữ liệu chuyến cho cước/lịch sử | FR-23–FR-27, FR-46–FR-47; UC-07–UC-08, UC-12 |
| Fare & Payment | Cước, khoản phải trả, giao dịch và các lần xử lý với provider | FR-28–FR-34, FR-50; UC-09, UC-13 |
| Notification | Ý định gửi, adapter kênh và kết quả gửi | FR-15, FR-33, FR-35–FR-40; các UC phát sinh mốc tương ứng |
| History & Rating | Read model lịch sử và dữ liệu đánh giá | FR-29, FR-41–FR-42; UC-10–UC-11 |
| Operations | Giao diện/điều phối thao tác hỗ trợ, hồ sơ xử lý sự cố; cập nhật qua owner nghiệp vụ | FR-43–FR-50, FR-57; UC-12–UC-13 |
| Reporting | Read model chỉ số, kỳ và nguồn dữ liệu báo cáo; không sửa dữ liệu gốc | FR-51–FR-55; UC-14; actor TBD OI-09 |
| Audit | Bằng chứng các thao tác thuộc danh mục OI-16, không phải mọi dữ liệu/request | FR-58; xử lý nội bộ; NFR-09 |

Gateway định tuyến và xác minh ngữ cảnh danh tính; service owner vẫn kiểm tra quyền đối tượng. Operations và Reporting không truy cập ghi trực tiếp kho dữ liệu của owner khác. Admin không được tự thêm thành actor riêng; quyền quản trị thuộc mô hình OI-08.

## 3. Mô hình dữ liệu logic

| Đối tượng | Định danh / thuộc tính đề xuất | Quan hệ và giới hạn |
| --- | --- | --- |
| Account | accountId, identityRef, trạng thái tài khoản | Quy tắc định danh/xác thực OI-18; quyền OI-08 |
| Driver / Vehicle | driverId, accountId; vehicleId và profile dữ liệu | Quan hệ Driver–phương tiện và các trường bắt buộc OI-18 |
| DriverLocation | locationId, driverId, tọa độ, observedAt nếu có, receivedAt | Độ mới/tần suất OI-19; retention OI-06; offline OI-05 |
| Booking | bookingId, customerId, pickup, destination, vehicleTypeId, trạng thái nghiệp vụ, version | Không dùng bookingId thay tripId; thời điểm tạo và quan hệ Trip OI-14 |
| Assignment | assignmentId, bookingId, driverId, phản hồi, thời điểm và version | Mỗi phản hồi trỏ đúng đề nghị; timeout OI-03; gửi tuần tự/song song và winner OI-02/OI-14 |
| Trip | tripId, bookingRef, Driver liên quan, mốc và version | Thời điểm hình thành, cardinality và chuyển tiếp OI-14; hủy OI-04 |
| Fare | fareId, tripId, Money, căn cứ tính theo ruleVersion | Không cố định base/per-km/per-minute; công thức OI-01 và loại dịch vụ OI-15 |
| Payment / Attempt | paymentId, tripId; attemptId, paymentId, merchantReference, providerReference, kết quả, thời điểm | Mô hình kỹ thuật nhiều attempt đề xuất; không tự cho phép retry. Nghiệp vụ OI-07/OI-17 |
| Rating | ratingId, tripId, customerId, driverId, nội dung theo OI-10 | Không tự đặt thang điểm, số lần hoặc thời hạn |
| Notification | notificationId, businessRef, recipientRef, kết quả gửi và providerReference | Phân biệt tiếp nhận/gửi/nhận theo khả năng kênh OI-12 |
| AuditEntry | auditId, actorRef, action, targetRef, occurredAt, correlationId, dữ liệu được phép | Danh mục, nội dung OI-16; retention OI-06; không ghi payload nhạy cảm |

Money được đề xuất biểu diễn bằng chuỗi thập phân và mã tiền tệ để tránh mất chính xác do số dấu phẩy động. Tiền tệ, số chữ số thập phân và làm tròn là OI-01, không mặc định VND hoặc hai chữ số.

## 4. Sự kiện và hợp đồng nội bộ

Envelope đề xuất: eventId, eventType, schemaVersion, occurredAt, producer, aggregateId, aggregateVersion, correlationId, payload. ID phục vụ truy vết; không chứa credential hoặc dữ liệu thanh toán nhạy cảm. Tên event là thiết kế kỹ thuật, không bổ sung trạng thái nghiệp vụ vào SRS.

| Event | Producer → Consumer | Nội dung tối thiểu / mục đích |
| --- | --- | --- |
| booking.received | Booking → Dispatch, Notification | bookingId, customerRef, thông tin điều phối cần thiết; FR-12, FR-35 |
| assignment.offered | Dispatch → kênh Driver, Notification | assignmentId, bookingId, driverId; FR-15 |
| assignment.responded | Dispatch → tiến trình điều phối | assignmentId, decision; FR-16–FR-18 |
| booking.driver-assigned | Dispatch → Trip, Notification, trạng thái Customer | bookingId, driverId, assignmentId; FR-21, FR-36; tạo Trip theo OI-14 |
| booking.no-driver | Dispatch → Notification, trạng thái Customer | bookingId, kết quả không tìm được; FR-19 |
| trip.milestone-recorded | Trip → Notification, các read model | tripId, milestone, version; FR-23–FR-27, FR-37–FR-38, FR-40 theo OI-12 |
| trip.completed | Trip → Fare, History, Rating eligibility, Notification | tripId, căn cứ chuyến cần cho tính cước; FR-27–FR-28, FR-38, FR-41–FR-42 |
| fare.determined | Fare → Payment, read model Customer | tripId, fareId, Money, ruleVersion; FR-28–FR-29 |
| payment.result-recorded | Payment → Notification, Reporting, read model Customer | paymentId, attemptId, tripId, kết quả đã đối chiếu; FR-32–FR-33, FR-39 |
| auditable-action.recorded | Owner nghiệp vụ → Audit | danh tính, thao tác, đối tượng và dữ liệu theo OI-16; FR-58 |

Reporting nhận sự kiện cần thiết từ Booking, Trip, Payment và Driver theo định nghĩa chỉ số OI-09. Bảng trên không tự quyết công thức doanh thu hoặc tỷ lệ hủy.

## 5. Trình tự xử lý

### 5.1. Booking và nhận chuyến

1. Customer gửi Booking qua gateway; owner kiểm tra danh tính, dữ liệu và lưu Booking.
2. Thông báo tiếp nhận được phát sinh; Dispatch chọn Driver theo tiêu chí OI-02.
3. Driver nhận assignmentId và phản hồi đúng đề nghị. Từ chối/không phản hồi tiếp tục tìm trên cùng bookingId; ngưỡng không phản hồi OI-03.
4. Owner kiểm tra phiên bản khi ghi phản hồi. Cạnh tranh đồng thời được phát hiện; cách chọn kết quả hợp lệ chờ OI-14, không mặc định first-wins.
5. Kết quả gán Driver được công bố cho Customer. Trip được tạo/liên kết tại mốc và cardinality được duyệt OI-14; Location hỗ trợ ETA theo OI-19.

### 5.2. Hoàn thành, cước và thanh toán

1. Driver ghi nhận hoàn thành hợp lệ theo OI-14; Trip lưu kết quả trước khi phát sự kiện.
2. Fare nhận trip.completed và tính số tiền theo OI-01/OI-15, sau đó phát fare.determined.
3. Payment sử dụng cước đã xác định, không dùng số tiền do Customer tự khai. Khi cước chưa có, contract biểu diễn chưa sẵn sàng thay vì lấy 0.
4. Tiền mặt được xử lý theo chủ thể và bằng chứng xác nhận OI-17. Điện tử tạo attempt có merchantReference riêng và gọi provider adapter.
5. Callback/đối soát được chứng thực, đối chiếu và ghi bền vững. Kết quả được đưa tới Customer và Notification. Kết quả chưa biết không tự thành thất bại.
6. Retry chỉ sau quyết định OI-07/OI-17, giữ lịch sử các attempt. Khi callback cũ đến muộn, xử lý theo chính sách đã chốt thay vì ghi đè kết quả cuối tùy ý.

Customer có thể đánh giá sau Trip hoàn thành theo FR-42; không thêm tiền điều kiện thanh toán thành công. Tính cước/thanh toán lỗi không được dùng để tự đảo trạng thái Trip nếu chưa có quy tắc OI-14/OI-17.

### 5.3. Thông báo, vận hành và báo cáo

Owner nghiệp vụ lưu kết quả trước; Notification xử lý độc lập để lỗi kênh không làm dừng toàn bộ đặt xe theo NFR-02. Operations gọi owner để thực hiện action nằm trong danh mục OI-20; không sửa kho Trip trực tiếp. Reporting lưu read model và công bố kỳ dữ liệu/căn cứ chỉ số; độ trễ và tiêu chí kiểm chứng OI-09/OI-13.

## 6. Nhất quán, bảo mật và vận hành

Các cơ chế sau là Proposal kỹ thuật: transactional outbox để không mất event giữa ghi dữ liệu và gửi; inbox/dedup theo eventId; optimistic concurrency theo version; idempotency cho các command có thể gửi lặp; correlationId xuyên dịch vụ. Chúng không quyết định chính sách hủy, winner điều phối hoặc số lần retry nghiệp vụ. Thời gian lưu khóa/event/log phải được chốt cùng OI-06, không đặt vô hạn.

Đối tượng liên quan tới Customer/Driver được kiểm tra quyền trên server, không chỉ tại gateway. Provider callback phải xác minh bằng cơ chế provider chấp thuận; không công bố endpoint tích hợp không xác thực làm baseline. Secret nằm trong cấu hình bảo mật, không nằm trong log hoặc payload công khai.

Theo dõi lỗi/độ trễ, tình trạng queue, giao dịch chưa xác định và backlog event. Tải, độ sẵn sàng, phục hồi và ảnh hưởng cho phép khi triển khai/mở rộng chờ OI-13. Không hứa hẹn exactly-once toàn hệ thống; consumer phải xử lý lặp an toàn theo quyết định được duyệt.

## 7. Các quyết định chặn hoàn thiện thiết kế

OI-01/OI-15: giá và dịch vụ; OI-02/OI-03: điều phối/phản hồi; OI-04: hủy; OI-05/OI-19: offline/vị trí; OI-06: lưu trữ; OI-07/OI-17: thanh toán; OI-08/OI-18/OI-20: quyền, đầu vào và thao tác; OI-09: báo cáo; OI-10: đánh giá; OI-11: release; OI-12: thông báo; OI-13: chất lượng; OI-14: vòng đời; OI-16: audit; OI-21: giao diện. Quyết định được quản lý tại SRS §13; tài liệu thiết kế không đóng OI thay stakeholder.
