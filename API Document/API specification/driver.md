# API Driver

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

Quy ước/schema/lỗi dùng chung: [common.md](common.md). Bảng truy vết đầy đủ: [traceability.md](../../traceability.md).

## API-13 — Driver tự đăng ký

**Operation đề xuất:** `POST /drivers/registrations`.

**Truy vết:** FR-04; UC-03; AC-04.

**Điều kiện quyết định:** OI-18

**Đầu vào:** RegistrationInput theo OI-18.

**Kết quả:** 201; AccountReceipt.

**Hành vi:** Không yêu cầu session có sẵn; tách khỏi endpoint tạo tài khoản của Operations Staff. Không buộc tạo phương tiện trong cùng giao dịch nếu chưa chốt.

**Quyền:** Không yêu cầu session có sẵn; dữ liệu đăng ký/xác thực theo OI-18.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-14 — Xác thực Driver

**Operation đề xuất:** `POST /sessions/driver`.

**Truy vết:** FR-56; UC-02; AC-56.

**Điều kiện quyết định:** OI-08, OI-18

**Đầu vào:** AuthenticationInput theo OI-18.

**Kết quả:** 200; SessionReceipt.

**Hành vi:** Cung cấp đường xác thực riêng cho Driver. Không mặc định đăng nhập email/password khi nguồn chưa chốt cơ chế.

**Quyền:** Không yêu cầu session có sẵn; dữ liệu đăng ký/xác thực theo OI-18.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-15 — Cập nhật hồ sơ Driver

**Operation đề xuất:** `PATCH /drivers/me/profile`.

**Truy vết:** FR-06; UC-04; AC-06.

**Điều kiện quyết định:** OI-18

**Đầu vào:** ProfilePatch theo OI-18.

**Kết quả:** 200; ProfileView.

**Hành vi:** Chỉ cập nhật trường hồ sơ được phép; không nhận quyền hoặc trạng thái đình chỉ tài khoản trong payload.

**Quyền:** Driver đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-16 — Cập nhật phương tiện

**Operation đề xuất:** `PATCH /drivers/me/vehicles/{vehicleId}`.

**Truy vết:** FR-07; UC-16; AC-07.

**Điều kiện quyết định:** OI-18

**Đầu vào:** vehicleId: ID và VehiclePatch theo OI-18.

**Kết quả:** 200; VehicleView.

**Hành vi:** Kiểm tra quan hệ Driver–phương tiện được phép sửa; cardinality và trường chi tiết chờ OI-18. Không tạo/xóa phương tiện ngầm qua thao tác cập nhật.

**Quyền:** Driver đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-17 — Cập nhật hoạt động và sẵn sàng

**Operation đề xuất:** `PATCH /drivers/me/work-status`.

**Truy vết:** FR-08, FR-09; UC-17; AC-08, AC-09.

**Điều kiện quyết định:** OI-14

**Đầu vào:** WorkStatusInput gồm trạng thái hoạt động và readiness theo OI-14.

**Kết quả:** 200; WorkStatusView.

**Hành vi:** Tách trạng thái làm việc khỏi trạng thái tài khoản do quản trị kiểm soát. Không cho Driver tự sửa vai trò hoặc trạng thái đình chỉ qua endpoint này.

**Quyền:** Driver đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-18 — Gửi vị trí Driver

**Operation đề xuất:** `POST /drivers/me/locations`.

**Truy vết:** FR-10; UC-18; AC-10.

**Điều kiện quyết định:** OI-05, OI-06, OI-19

**Đầu vào:** LocationInput: tọa độ, observedAt nếu nguồn hỗ trợ; quy tắc độ mới OI-19.

**Kết quả:** 201; LocationReceipt gồm locationId, driverId và receivedAt.

**Hành vi:** Gắn vị trí với danh tính Driver, lưu trước khi xác nhận tiếp nhận thành công. Thời gian lưu chờ OI-06; xử lý vị trí đến muộn/mất mạng chờ OI-05/OI-19.

**Quyền:** Driver đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-19 — Phản hồi đề nghị chuyến

**Operation đề xuất:** `POST /assignments/{assignmentId}/responses`.

**Truy vết:** FR-15, FR-16, FR-17; UC-05, UC-06; AC-15, AC-16, AC-17.

**Điều kiện quyết định:** OI-03, OI-12, OI-14

**Đầu vào:** assignmentId: ID; decision = accept hoặc reject.

**Kết quả:** 200; AssignmentResponseReceipt.

**Hành vi:** Kiểm tra đề nghị gửi đúng Driver. Reject tiếp tục tìm trên cùng Booking. Accept đồng thời hoặc muộn áp dụng OI-14; không tự chọn first-wins.

**Quyền:** Driver đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-20 — Ghi nhận mốc Trip

**Operation đề xuất:** `POST /trips/{tripId}/milestones`.

**Truy vết:** FR-24, FR-25, FR-26, FR-27; UC-08; AC-24, AC-25, AC-26, AC-27.

**Điều kiện quyết định:** OI-14

**Đầu vào:** TripMilestoneInput: arrived, pickedUp, moving hoặc completed; expectedVersion kỹ thuật.

**Kết quả:** 200; TripView.

**Hành vi:** Driver được phép ghi nhận mốc. Kiểm tra chuyển tiếp theo mô hình được duyệt OI-14; optimistic concurrency phát hiện xung đột nhưng không tự quyết người thắng.

**Quyền:** Driver đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## Các thao tác còn phụ thuộc quyết định

Cách Driver nhận/đọc nội dung đề nghị và thay đổi Trip được xác định cùng kênh OI-12. Assignment cần mang assignmentId để phản hồi đúng đề nghị; đường hiển thị kênh cụ thể chưa chốt. API không mở endpoint Driver tự quản lý quyền hoặc trạng thái đình chỉ tài khoản.
