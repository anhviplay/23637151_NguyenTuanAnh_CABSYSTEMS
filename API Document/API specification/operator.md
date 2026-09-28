# API Operations Staff

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

Quy ước/schema/lỗi dùng chung: [common.md](common.md). Bảng truy vết đầy đủ: [traceability.md](../../traceability.md).

FR-43–FR-46 bao gồm năng lực quản lý nhưng tập thao tác chưa được chốt. Các GET dưới đây chỉ đặc tả phần tra cứu đề xuất; quyền, tạo/sửa/xóa/khóa và kết quả từng action phải được quyết định tại OI-08/OI-20 trước khi triển khai. Không coi danh sách endpoint hiện tại là coverage hoàn chỉnh của năng lực quản lý.

## API-21 — Operations Staff tạo tài khoản Driver

**Operation đề xuất:** `POST /operations/drivers`.

**Truy vết:** FR-05, FR-57; UC-03, UC-12; AC-05, AC-57.

**Điều kiện quyết định:** OI-08, OI-16, OI-18

**Đầu vào:** RegistrationInput theo OI-18, không nhận quyền vượt phạm vi người tạo.

**Kết quả:** 201; AccountReceipt.

**Hành vi:** Yêu cầu xác thực và quyền tạo Driver; không dùng endpoint đăng ký công khai. Ghi audit khi thao tác thuộc danh mục OI-16.

**Quyền:** Operations Staff đã xác thực và có quyền action theo OI-08.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-22 — Tra cứu customers

**Operation đề xuất:** `GET /operations/customers`.

**Truy vết:** FR-43, FR-57; UC-03, UC-12; AC-43, AC-57.

**Điều kiện quyết định:** OI-08, OI-20

**Đầu vào:** Filters và phân trang theo OI-20; quyền theo OI-08.

**Kết quả:** 200; Collection<ProfileView>.

**Hành vi:** Là phần tra cứu của năng lực quản lý. Không coi endpoint GET đã bao phủ toàn bộ thao tác quản lý; phần ghi/sửa/xóa còn phụ thuộc OI-20.

**Quyền:** Operations Staff đã xác thực và có quyền action theo OI-08.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-23 — Tra cứu drivers

**Operation đề xuất:** `GET /operations/drivers`.

**Truy vết:** FR-44, FR-57; UC-03, UC-12; AC-44, AC-57.

**Điều kiện quyết định:** OI-08, OI-20

**Đầu vào:** Filters và phân trang theo OI-20; quyền theo OI-08.

**Kết quả:** 200; Collection<DriverView>.

**Hành vi:** Là phần tra cứu của năng lực quản lý. Không coi endpoint GET đã bao phủ toàn bộ thao tác quản lý; phần ghi/sửa/xóa còn phụ thuộc OI-20.

**Quyền:** Operations Staff đã xác thực và có quyền action theo OI-08.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-24 — Tra cứu vehicles

**Operation đề xuất:** `GET /operations/vehicles`.

**Truy vết:** FR-45, FR-57; UC-03, UC-12; AC-45, AC-57.

**Điều kiện quyết định:** OI-08, OI-20

**Đầu vào:** Filters và phân trang theo OI-20; quyền theo OI-08.

**Kết quả:** 200; Collection<VehicleView>.

**Hành vi:** Là phần tra cứu của năng lực quản lý. Không coi endpoint GET đã bao phủ toàn bộ thao tác quản lý; phần ghi/sửa/xóa còn phụ thuộc OI-20.

**Quyền:** Operations Staff đã xác thực và có quyền action theo OI-08.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-25 — Tra cứu trips

**Operation đề xuất:** `GET /operations/trips`.

**Truy vết:** FR-46, FR-57; UC-03, UC-12; AC-46, AC-57.

**Điều kiện quyết định:** OI-08, OI-20

**Đầu vào:** Filters và phân trang theo OI-20; quyền theo OI-08.

**Kết quả:** 200; Collection<TripView>.

**Hành vi:** Là phần tra cứu của năng lực quản lý. Không coi endpoint GET đã bao phủ toàn bộ thao tác quản lý; phần ghi/sửa/xóa còn phụ thuộc OI-20.

**Quyền:** Operations Staff đã xác thực và có quyền action theo OI-08.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-26 — Xem Trip đang diễn ra

**Operation đề xuất:** `GET /operations/active-trips`.

**Truy vết:** FR-47, FR-57; UC-03, UC-12; AC-47, AC-57.

**Điều kiện quyết định:** OI-08, OI-14

**Đầu vào:** Phân trang; định nghĩa đang diễn ra theo OI-14.

**Kết quả:** 200; Collection<TripView>.

**Hành vi:** Lọc đúng tập trạng thái được duyệt, kiểm soát quyền và trường dữ liệu trả về.

**Quyền:** Operations Staff đã xác thực và có quyền action theo OI-08.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-27 — Kiểm tra trạng thái Driver

**Operation đề xuất:** `GET /operations/drivers/{driverId}/status`.

**Truy vết:** FR-48, FR-57; UC-03, UC-12; AC-48, AC-57.

**Điều kiện quyết định:** OI-08

**Đầu vào:** driverId: ID.

**Kết quả:** 200; DriverStatusView.

**Hành vi:** Hiển thị riêng trạng thái hoạt động, sẵn sàng và thông tin tài khoản được phép xem; không cấp quyền sửa qua thao tác đọc.

**Quyền:** Operations Staff đã xác thực và có quyền action theo OI-08.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-28 — Hỗ trợ Trip lỗi

**Operation đề xuất:** `POST /operations/trips/{tripId}/support-actions`.

**Truy vết:** FR-49, FR-57; UC-03, UC-12; AC-49, AC-57.

**Điều kiện quyết định:** OI-08, OI-14, OI-16, OI-20

**Đầu vào:** SupportActionInput: actionCode và actionData thuộc danh mục OI-20; expectedVersion.

**Kết quả:** 202; SupportActionReceipt.

**Hành vi:** Xác thực thao tác cụ thể, không cho văn bản tự do trở thành lệnh tùy ý. Tác động trạng thái và audit phụ thuộc OI-14/OI-16/OI-20.

**Quyền:** Operations Staff đã xác thực và có quyền action theo OI-08.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-29 — Tra cứu giao dịch

**Operation đề xuất:** `GET /operations/payment-transactions`.

**Truy vết:** FR-50, FR-57; UC-03, UC-12, UC-13; AC-50, AC-57.

**Điều kiện quyết định:** OI-06, OI-08, OI-20

**Đầu vào:** Filters theo OI-20, quyền và phạm vi thời gian lưu.

**Kết quả:** 200; Collection<PaymentTransactionView>.

**Hành vi:** Trả từng attempt/mã tham chiếu và kết quả tương ứng được phép xem, không cung cấp dữ liệu thanh toán nhạy cảm.

**Quyền:** Operations Staff đã xác thực và có quyền action theo OI-08.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.
