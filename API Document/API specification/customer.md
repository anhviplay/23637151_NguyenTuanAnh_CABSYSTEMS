# API Customer

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

Quy ước/schema/lỗi dùng chung: [common.md](common.md). Bảng truy vết đầy đủ: [traceability.md](../../traceability.md).

## API-01 — Đăng ký Customer

**Operation đề xuất:** `POST /customers/registrations`.

**Truy vết:** FR-01; UC-01; AC-01.

**Điều kiện quyết định:** OI-18

**Đầu vào:** RegistrationInput: profile và authenticationEnrollment theo OI-18.

**Kết quả:** 201; AccountReceipt.

**Hành vi:** Cho phép chưa đăng nhập. Tạo tài khoản khi dữ liệu đáp ứng quy tắc; không tự coi đăng ký là đăng nhập thành công.

**Quyền:** Không yêu cầu session có sẵn; dữ liệu đăng ký/xác thực theo OI-18.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-02 — Xác thực Customer

**Operation đề xuất:** `POST /sessions/customer`.

**Truy vết:** FR-02, FR-56; UC-02; AC-02, AC-56.

**Điều kiện quyết định:** OI-08, OI-18

**Đầu vào:** AuthenticationInput theo cơ chế OI-18.

**Kết quả:** 200; SessionReceipt.

**Hành vi:** Không đòi session trước khi xác thực. Danh tính được server xác minh, không nhận quyền do client tự khai.

**Quyền:** Không yêu cầu session có sẵn; dữ liệu đăng ký/xác thực theo OI-18.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-03 — Cập nhật thông tin Customer

**Operation đề xuất:** `PATCH /customers/me/profile`.

**Truy vết:** FR-03; UC-15; AC-03.

**Điều kiện quyết định:** OI-18

**Đầu vào:** ProfilePatch: các trường được phép cập nhật theo OI-18.

**Kết quả:** 200; ProfileView.

**Hành vi:** Chỉ cập nhật hồ sơ gắn với danh tính đã xác thực; kiểm tra trường và dữ liệu trước khi ghi.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-04 — Gửi Booking

**Operation đề xuất:** `POST /bookings`.

**Truy vết:** FR-11, FR-12; UC-05; AC-11, AC-12.

**Điều kiện quyết định:** OI-14, OI-15, OI-18

**Đầu vào:** BookingInput: pickup: Place, destination: Place, vehicleTypeId: ID.

**Kết quả:** 201; BookingView.

**Hành vi:** Tiếp nhận Booking và bắt đầu luồng tìm Driver; tạo Trip tại thời điểm nào phụ thuộc OI-14. Không yêu cầu chọn thanh toán trước Booking nếu chưa có quyết định.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-05 — Theo dõi Booking

**Operation đề xuất:** `GET /bookings/{bookingId}`.

**Truy vết:** FR-19, FR-20, FR-21, FR-22; UC-05, UC-06, UC-07; AC-19, AC-20, AC-21, AC-22.

**Điều kiện quyết định:** OI-14, OI-19

**Đầu vào:** bookingId: ID thuộc Customer hiện tại.

**Kết quả:** 200; BookingView, gồm Driver được gán và ETA khi có.

**Hành vi:** Hiển thị kết quả tìm Driver, Driver nhận chuyến và thời gian dự kiến đến. Không biến chưa có ETA thành giá trị 0.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-06 — Theo dõi Trip

**Operation đề xuất:** `GET /trips/{tripId}`.

**Truy vết:** FR-21, FR-22, FR-23; UC-05, UC-06, UC-07, UC-08; AC-21, AC-22, AC-23.

**Điều kiện quyết định:** OI-05, OI-14, OI-19

**Đầu vào:** tripId: ID thuộc Customer hiện tại.

**Kết quả:** 200; TripView.

**Hành vi:** Trả trạng thái, thông tin Driver phù hợp quyền và ETA. Cách thể hiện dữ liệu cũ/mất kết nối phụ thuộc OI-05.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-07 — Xem số tiền phải trả

**Operation đề xuất:** `GET /trips/{tripId}/fare`.

**Truy vết:** FR-29; UC-09, UC-10; AC-29.

**Điều kiện quyết định:** OI-01, OI-15

**Đầu vào:** tripId: ID thuộc Customer.

**Kết quả:** 200; FareView.

**Hành vi:** Trả tiền tệ và số tiền cuối cùng khi đã tính; trạng thái chưa có cước được phân biệt với số tiền bằng 0.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-08 — Đề nghị thanh toán

**Operation đề xuất:** `POST /trips/{tripId}/payments`.

**Truy vết:** FR-30, FR-31; UC-09; AC-30, AC-31.

**Điều kiện quyết định:** OI-17

**Đầu vào:** PaymentInput: method = cash hoặc electronic; Idempotency-Key theo common.md.

**Kết quả:** 202; PaymentView.

**Hành vi:** Khởi tạo hoặc tiếp nhận xử lý thanh toán. Chọn cash không đồng nghĩa xác nhận đã nhận tiền; chủ thể và bằng chứng nhận tiền chờ OI-17. Không nhận thẻ/tài khoản nhạy cảm trực tiếp.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-09 — Xem kết quả thanh toán

**Operation đề xuất:** `GET /payments/{paymentId}`.

**Truy vết:** FR-32, FR-39; UC-09; AC-32, AC-39.

**Điều kiện quyết định:** OI-12, OI-17

**Đầu vào:** paymentId: ID được phép truy cập.

**Kết quả:** 200; PaymentView.

**Hành vi:** Customer truy xuất kết quả đã được CAB ghi nhận. Kết quả chưa xác định được hiển thị riêng, không suy ra thất bại từ timeout.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-10 — Yêu cầu xử lý lại thanh toán

**Operation đề xuất:** `POST /payments/{paymentId}/retry-requests`.

**Truy vết:** FR-34; UC-09; AC-34.

**Điều kiện quyết định:** OI-07, OI-17

**Đầu vào:** paymentId và Idempotency-Key; không cho client tự đặt số tiền.

**Kết quả:** 202; RetryReceipt gồm paymentId và attemptId nếu được phép tạo attempt.

**Hành vi:** Chỉ xử lý theo điều kiện ABC duyệt tại OI-07/OI-17. Lưu dấu vết từng lần thử, không ghi đè lịch sử; idempotency không quyết định chính sách nghiệp vụ.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-11 — Xem lịch sử Trip

**Operation đề xuất:** `GET /customers/me/trips`.

**Truy vết:** FR-41, FR-29; UC-09, UC-10; AC-41, AC-29.

**Điều kiện quyết định:** OI-06

**Đầu vào:** Bộ lọc và phân trang theo common.md; kỳ dữ liệu theo OI-06.

**Kết quả:** 200; Collection<TripHistoryItem>.

**Hành vi:** Chỉ trả lịch sử của Customer; mỗi mục có Trip, thời điểm, trạng thái, FareView khi có. Không tự giới hạn chỉ Trip đã thanh toán.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## API-12 — Đánh giá Driver

**Operation đề xuất:** `POST /trips/{tripId}/ratings`.

**Truy vết:** FR-42; UC-11; AC-42.

**Điều kiện quyết định:** OI-10

**Đầu vào:** RatingInput theo thang điểm, nội dung và quy tắc tại OI-10.

**Kết quả:** 201; RatingReceipt.

**Hành vi:** Kiểm tra Trip hoàn thành và quyền đánh giá. Không yêu cầu thanh toán thành công. Không tự đặt giới hạn một đánh giá, điểm 1–5 hoặc thời hạn đánh giá.

**Quyền:** Customer đã xác thực; kiểm tra quyền trên đối tượng được yêu cầu.

**Lỗi:** Theo common.md §4. Dữ liệu lỗi không ghi một phần; xung đột không tự ghi đè trạng thái.

**Kiểm chứng:** Đối chiếu AC nêu trên, kiểm tra body theo type tương ứng trong common.md và dữ liệu sau xử lý. Các quyết định còn mở phải có bản phê duyệt trước khi dùng hành vi phụ thuộc chúng làm kết quả nghiệm thu.

## Hủy Booking / Trip

Chưa ban hành endpoint hoặc giới hạn trạng thái hủy vì OI-04 chưa được giải quyết. Sau quyết định về chủ thể, điều kiện, kết quả và ảnh hưởng thanh toán, mới bổ sung operation, exception và test tương ứng. Không giữ quy tắc cũ “chỉ hủy khi đang tìm Driver”.
