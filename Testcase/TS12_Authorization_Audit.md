# TS12 — Authorization Audit

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-56 — Kiểm chứng AC-56 — FR-56

- Yêu cầu: FR-56.
- Tiêu chí: AC-56.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-08, OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Customer/Driver chưa xác thực và đã xác thực; danh mục chức năng OI-08/OI-18.

**Các bước:**

1. Gọi từng chức năng áp dụng với cả hai nhóm.
2. Kiểm tra nhóm chưa xác thực bị chặn và nhóm hợp lệ tiếp tục theo quyền.

**Kết quả mong đợi:** Đối với chức năng thuộc danh mục yêu cầu tài khoản, Customer/Driver chưa được xác thực không sử dụng được; người đã được xác thực có thể tiếp tục theo quyền áp dụng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-57 — Kiểm chứng AC-57 — FR-57

- Yêu cầu: FR-57.
- Tiêu chí: AC-57.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-08
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Ma trận quyền được duyệt; tài khoản được phép và bị từ chối cho từng thao tác nhạy cảm.

**Các bước:**

1. Thử mỗi thao tác với hai loại tài khoản.
2. Đối chiếu phản hồi và dữ liệu sau xử lý.

**Kết quả mong đợi:** Với từng thao tác nhạy cảm trong ma trận quyền, nhân viên thiếu quyền bị ngăn thực hiện; người có quyền thực hiện được.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-58 — Kiểm chứng AC-58 — FR-58

- Yêu cầu: FR-58.
- Tiêu chí: AC-58.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-16
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Danh mục audit, nội dung và retention đã duyệt; thao tác mẫu có actor/target xác định.

**Các bước:**

1. Thực hiện thao tác.
2. Tìm bằng chứng audit qua fixture được cấp quyền.
3. Đối chiếu nội dung và khả năng lưu/tra cứu trong hạn quy định.

**Kết quả mong đợi:** Khi thực hiện thao tác thuộc danh mục audit, CAB System lưu vết đầy đủ nội dung tương ứng; dữ liệu lưu vết có thể được kiểm tra trong thời hạn lưu trữ.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-77 — Xác thực sai không cấp quyền

- Yêu cầu: FR-56.
- Tiêu chí: AC-56.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-08, OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Cơ chế xác thực và dữ liệu sai OI-18.

**Các bước:**

1. Thực hiện xác thực sai.
2. Gọi chức năng yêu cầu tài khoản.

**Kết quả mong đợi:** Không được truy cập bằng kết quả xác thực không hợp lệ.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
