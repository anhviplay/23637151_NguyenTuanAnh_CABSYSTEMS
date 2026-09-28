# TS03 — Create Booking

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-11 — Kiểm chứng AC-11 — FR-11

- Yêu cầu: FR-11.
- Tiêu chí: AC-11.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-15, OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Customer đã xác thực; hai địa điểm hợp lệ và loại xe có trong danh mục.

**Các bước:**

1. Nhập điểm đón, điểm đến và loại xe.
2. Gửi Booking.
3. Kiểm tra dữ liệu gắn đúng bookingId.

**Kết quả mong đợi:** Customer nhập hai địa điểm và chọn một loại xe trong danh mục; thông tin lựa chọn gắn với Booking gửi đi.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-12 — Kiểm chứng AC-12 — FR-12

- Yêu cầu: FR-12.
- Tiêu chí: AC-12.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-14, OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Customer đã xác thực; Booking hợp lệ.

**Các bước:**

1. Gửi Booking.
2. Ghi nhận bookingId.
3. Quan sát việc chuyển yêu cầu tới tiến trình tìm Driver.

**Kết quả mong đợi:** Khi Customer gửi thông tin Booking đáp ứng quy tắc, hệ thống tiếp nhận Booking để tìm Driver.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-81 — Thiếu thông tin Booking bắt buộc

- Yêu cầu: FR-11, FR-12.
- Tiêu chí: AC-11, AC-12.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-14, OI-15, OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Ba request lần lượt thiếu điểm đón, điểm đến, loại xe.

**Các bước:**

1. Gửi từng request.
2. Kiểm tra kết quả tiếp nhận và Booking được lưu.

**Kết quả mong đợi:** Không coi request thiếu thông tin là Booking hợp lệ; thông báo/validation theo OI-18.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-82 — Gửi lại cùng request Booking

- Yêu cầu: FR-12.
- Tiêu chí: AC-12.
- Cơ sở: Proposal kiểm thử thiết kế.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-14, OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Cơ chế idempotency trong common.md đã duyệt.

**Các bước:**

1. Gửi cùng key và payload hai lần.
2. Đối chiếu bookingId và sự kiện.

**Kết quả mong đợi:** Không tạo hai Booking do gửi lặp kỹ thuật; phản hồi liên kết cùng kết quả.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
