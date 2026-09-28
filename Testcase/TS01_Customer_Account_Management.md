# TS01 — Customer Account Management

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-01 — Kiểm chứng AC-01 — FR-01

- Yêu cầu: FR-01.
- Tiêu chí: AC-01.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Customer chưa có tài khoản; bộ dữ liệu đăng ký hợp lệ theo OI-18.

**Các bước:**

1. Gửi đăng ký Customer.
2. Ghi nhận accountId.
3. Truy xuất bằng chứng tạo tài khoản bằng quyền kiểm thử.

**Kết quả mong đợi:** Với thông tin đăng ký đáp ứng quy tắc, Customer hoàn tất đăng ký và có tài khoản để sử dụng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-02 — Kiểm chứng AC-02 — FR-02

- Yêu cầu: FR-02.
- Tiêu chí: AC-02.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Tài khoản Customer hợp lệ; dữ liệu xác thực đúng theo OI-18.

**Các bước:**

1. Thực hiện xác thực Customer.
2. Dùng kết quả xác thực truy cập một chức năng yêu cầu tài khoản theo danh mục.

**Kết quả mong đợi:** Customer có tài khoản hợp lệ đăng nhập thành công; truy cập chức năng yêu cầu tài khoản chịu kiểm soát theo FR-56.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-03 — Kiểm chứng AC-03 — FR-03

- Yêu cầu: FR-03.
- Tiêu chí: AC-03.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Customer đã xác thực; hồ sơ có giá trị ban đầu và giá trị thay thế hợp lệ.

**Các bước:**

1. Đọc hồ sơ.
2. Cập nhật một trường được phép.
3. Đọc lại và đối chiếu cả trường thay đổi lẫn trường không thay đổi.

**Kết quả mong đợi:** Customer đã được xác thực thay đổi thông tin được phép cập nhật; thông tin sau cập nhật phản ánh thay đổi.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-76 — Dữ liệu đăng ký không hợp lệ

- Yêu cầu: FR-01, FR-04.
- Tiêu chí: AC-01, AC-04.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Bộ trường thiếu/sai/trùng theo OI-18.

**Các bước:**

1. Gửi từng bộ dữ liệu.
2. Kiểm tra phản hồi và kho tài khoản.

**Kết quả mong đợi:** Kết quả theo quy tắc đầu vào đã duyệt; không tạo tài khoản từ yêu cầu bị từ chối.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
