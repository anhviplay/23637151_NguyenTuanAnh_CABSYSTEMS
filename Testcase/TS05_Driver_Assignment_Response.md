# TS05 — Driver Assignment Response

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-15 — Kiểm chứng AC-15 — FR-15

- Yêu cầu: FR-15.
- Tiêu chí: AC-15.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Assignment hợp lệ gửi tới Driver cụ thể; kênh thử theo OI-12.

**Các bước:**

1. Tạo đề nghị chuyến.
2. Quan sát thông báo phía Driver.
3. Đối chiếu người nhận và bookingId/assignmentId.

**Kết quả mong đợi:** Khi có yêu cầu phù hợp gửi tới Driver, Driver nhận được thông báo về yêu cầu đó qua kênh.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-16 — Kiểm chứng AC-16 — FR-16

- Yêu cầu: FR-16.
- Tiêu chí: AC-16.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver nhận assignment hợp lệ; Customer theo dõi Booking.

**Các bước:**

1. Driver gửi accept.
2. Kiểm tra kết quả gán.
3. Customer đọc trạng thái và thông báo về Driver nhận chuyến.

**Kết quả mong đợi:** Driver chấp nhận yêu cầu; Customer có thể biết Driver đã nhận chuyến theo FR-21 và FR-36.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-17 — Kiểm chứng AC-17 — FR-17

- Yêu cầu: FR-17.
- Tiêu chí: AC-17.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: Không có OI riêng; cần dữ liệu và môi trường thử phù hợp.
- Trạng thái: Not Run.

**Tiền điều kiện và dữ liệu thử:** Booking có Driver được đề nghị và ứng viên khác phù hợp.

**Các bước:**

1. Driver đầu từ chối.
2. Quan sát tìm Driver tiếp theo.
3. Xác minh bookingId giữ nguyên và Customer không phải gửi lại.

**Kết quả mong đợi:** Driver từ chối; hệ thống tiếp tục tìm Driver khác với thông tin Booking đã gửi, không yêu cầu Customer nhập và gửi lại.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-83 — Phản hồi sát ranh giới timeout

- Yêu cầu: FR-18.
- Tiêu chí: AC-18.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-03, OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Ngưỡng T và cách xác định thời điểm phản hồi được duyệt.

**Các bước:**

1. Gửi ở trước T, tại T và sau T bằng đồng hồ kiểm soát.
2. Đối chiếu mỗi tình huống.

**Kết quả mong đợi:** Kết quả đúng quy tắc biên OI-03/OI-14; không mặc định 15 giây hoặc cách xử lý tại T.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-84 — Hai phản hồi chấp nhận cạnh tranh

- Yêu cầu: FR-16.
- Tiêu chí: AC-16.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-02, OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Hai đề nghị theo phương thức điều phối đã duyệt; quy tắc cạnh tranh OI-14.

**Các bước:**

1. Gửi phản hồi cạnh tranh.
2. Đọc kết quả và dữ liệu điều phối.

**Kết quả mong đợi:** Chỉ kết luận theo quy tắc được duyệt; phát hiện/lưu vết xung đột, không tự áp first-wins.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
