# TS02 — Driver Account Vehicle Availability

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-04 — Kiểm chứng AC-04 — FR-04

- Yêu cầu: FR-04.
- Tiêu chí: AC-04.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver chưa có tài khoản; dữ liệu đăng ký hợp lệ OI-18.

**Các bước:**

1. Đăng ký Driver khi chưa có session.
2. Ghi nhận accountId.
3. Kiểm tra tài khoản tương ứng được tạo.

**Kết quả mong đợi:** Driver đăng ký với dữ liệu đáp ứng quy tắc và có tài khoản tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-05 — Kiểm chứng AC-05 — FR-05

- Yêu cầu: FR-05.
- Tiêu chí: AC-05.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-08, OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Hai Operations Staff có/không có quyền tạo Driver; hai bộ đăng ký hợp lệ.

**Các bước:**

1. Dùng người có quyền tạo Driver.
2. Dùng người thiếu quyền gửi thao tác tương đương.
3. Đối chiếu phản hồi và dữ liệu được tạo.

**Kết quả mong đợi:** Operations Staff có quyền tạo tài khoản Driver; nhân viên thiếu quyền không thực hiện được thao tác.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-06 — Kiểm chứng AC-06 — FR-06

- Yêu cầu: FR-06.
- Tiêu chí: AC-06.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver đã xác thực, hồ sơ riêng và dữ liệu thay đổi hợp lệ.

**Các bước:**

1. Cập nhật trường hồ sơ được phép.
2. Đọc lại bằng giao diện hoặc fixture được cấp quyền.
3. Đối chiếu giá trị.

**Kết quả mong đợi:** Driver được xác thực cập nhật trường hồ sơ được phép; hồ sơ phản ánh thay đổi.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-07 — Kiểm chứng AC-07 — FR-07

- Yêu cầu: FR-07.
- Tiêu chí: AC-07.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver có phương tiện thuộc phạm vi được phép; dữ liệu cập nhật hợp lệ.

**Các bước:**

1. Cập nhật phương tiện xác định.
2. Đọc lại vehicleId tương ứng và kiểm tra thông tin không gắn nhầm phương tiện.

**Kết quả mong đợi:** Thông tin phương tiện do Driver cập nhật được thể hiện trong hồ sơ phương tiện tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-08 — Kiểm chứng AC-08 — FR-08

- Yêu cầu: FR-08.
- Tiêu chí: AC-08.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver hợp lệ; tập chuyển trạng thái hoạt động theo OI-14.

**Các bước:**

1. Thực hiện một chuyển tiếp hợp lệ.
2. Đọc lại trạng thái hoạt động.

**Kết quả mong đợi:** Driver thay đổi một trạng thái hoạt động; hệ thống thể hiện trạng thái đã cập nhật.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-09 — Kiểm chứng AC-09 — FR-09

- Yêu cầu: FR-09.
- Tiêu chí: AC-09.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: Không có OI riêng; cần dữ liệu và môi trường thử phù hợp.
- Trạng thái: Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver đang làm việc; tập ứng viên kiểm thử có Driver này.

**Các bước:**

1. Chuyển sẵn sàng nhận chuyến.
2. Kích hoạt tìm Driver.
3. Quan sát dữ liệu sẵn sàng được đưa vào đánh giá, không suy ra Driver chắc chắn được chọn.

**Kết quả mong đợi:** Driver chọn sẵn sàng nhận chuyến; thông tin sẵn sàng được sử dụng khi tìm Driver.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-80 — Không sửa trạng thái quản trị qua work-status

- Yêu cầu: FR-08, FR-57.
- Tiêu chí: AC-08, AC-57.
- Cơ sở: Proposal kiểm thử thiết kế.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-08, OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Contract work-status và quyền quản trị được duyệt.

**Các bước:**

1. Driver gửi thêm accountStatus hoặc role vào payload.
2. Đối chiếu tài khoản.

**Kết quả mong đợi:** Không thay đổi trạng thái quản trị/quyền từ endpoint Driver.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
