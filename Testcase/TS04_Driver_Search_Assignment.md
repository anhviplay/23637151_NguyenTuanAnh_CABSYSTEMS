# TS04 — Driver Search Assignment

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-13 — Kiểm chứng AC-13 — FR-13

- Yêu cầu: FR-13.
- Tiêu chí: AC-13.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-02
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Tập Driver khác nhau về vị trí, readiness và tiêu chí vận hành; kết quả chuẩn theo OI-02.

**Các bước:**

1. Gửi một Booking phù hợp bộ dữ liệu.
2. Thu tập ứng viên được chọn.
3. Đối chiếu từng Driver với kết quả chuẩn.

**Kết quả mong đợi:** Với tập Driver có vị trí và trạng thái khác nhau, kết quả tìm Driver tuân theo bộ tiêu chí vận hành.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-14 — Kiểm chứng AC-14 — FR-14

- Yêu cầu: FR-14.
- Tiêu chí: AC-14.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-02
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Nhiều Driver phù hợp tại các vị trí khác nhau; thứ tự chuẩn được tính độc lập từ chính sách OI-02.

**Các bước:**

1. Kích hoạt điều phối.
2. Ghi thứ tự/ưu tiên thực tế.
3. So với thứ tự chuẩn, kể cả trường hợp đồng hạng theo chính sách.

**Kết quả mong đợi:** Với bộ dữ liệu có nhiều Driver phù hợp, kết quả ưu tiên đúng thứ tự theo chính sách.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-18 — Kiểm chứng AC-18 — FR-18

- Yêu cầu: FR-18.
- Tiêu chí: AC-18.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-03
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Booking có Driver được đề nghị; thời hạn/điều kiện không phản hồi đã duyệt OI-03.

**Các bước:**

1. Không gửi phản hồi.
2. Dùng đồng hồ thử tới điều kiện không phản hồi.
3. Quan sát tìm Driver khác trên cùng Booking.

**Kết quả mong đợi:** Khi Driver không phản hồi trong thời hạn quy định, CAB System tìm Driver khác cho Booking hiện có.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-19 — Kiểm chứng AC-19 — FR-19

- Yêu cầu: FR-19.
- Tiêu chí: AC-19.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Bộ Driver không đáp ứng điều kiện kết thúc tìm kiếm đã duyệt OI-14.

**Các bước:**

1. Gửi Booking.
2. Cho tiến trình đạt điều kiện không tìm được.
3. Đọc thông báo phía Customer.

**Kết quả mong đợi:** Khi đáp ứng điều kiện kết thúc tìm kiếm mà không có Driver nhận chuyến, Customer nhận thông báo không tìm được Driver.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
