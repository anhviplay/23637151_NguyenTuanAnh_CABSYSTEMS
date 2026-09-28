# TS10 — Trip History Rating

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-41 — Kiểm chứng AC-41 — FR-41

- Yêu cầu: FR-41.
- Tiêu chí: AC-41.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Customer có Trip còn trong thời hạn lưu; bộ lịch sử chuẩn.

**Các bước:**

1. Đọc lịch sử.
2. Đối chiếu các Trip, danh tính Customer và dữ liệu liên quan.

**Kết quả mong đợi:** Customer xem được lịch sử Trip tương ứng còn trong thời hạn lưu trữ.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-42 — Kiểm chứng AC-42 — FR-42

- Yêu cầu: FR-42.
- Tiêu chí: AC-42.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-10
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Hai Trip của Customer: một hoàn thành, một chưa hoàn thành; dữ liệu rating hợp lệ OI-10.

**Các bước:**

1. Đánh giá Trip hoàn thành và kiểm tra lưu.
2. Thử đánh giá Trip chưa hoàn thành.
3. Kiểm tra không được ghi nhận trái điều kiện.

**Kết quả mong đợi:** Customer thực hiện đánh giá đối với Trip hoàn thành và đánh giá được ghi nhận; đánh giá trước khi hoàn thành không đáp ứng điều kiện nghiệp vụ.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-94 — Rating khi Trip hoàn thành nhưng thanh toán lỗi

- Yêu cầu: FR-42.
- Tiêu chí: AC-42.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-10
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Trip hoàn thành; giao dịch thất bại; dữ liệu rating hợp lệ.

**Các bước:**

1. Customer gửi rating.
2. Kiểm tra kết quả và tiền điều kiện áp dụng.

**Kết quả mong đợi:** Không tự áp thanh toán thành công làm điều kiện đánh giá; các quy tắc rating khác theo OI-10.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-95 — Đánh giá lặp hoặc chỉnh sửa

- Yêu cầu: FR-42.
- Tiêu chí: AC-42.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-10
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Quy tắc số lần/chỉnh sửa theo OI-10.

**Các bước:**

1. Gửi đánh giá tiếp theo hoặc yêu cầu sửa theo giao diện đã duyệt.
2. Đối chiếu dữ liệu.

**Kết quả mong đợi:** Kết quả theo chính sách được duyệt; không mặc định cấm đánh giá lần hai.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
