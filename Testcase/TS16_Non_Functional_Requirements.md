# TS16 — Non Functional Requirements

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-59 — Kiểm chứng AC-59 — NFR-01

- Yêu cầu: NFR-01.
- Tiêu chí: AC-59.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-13
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Kịch bản tải, số người dùng/Trip đồng thời, thời lượng và ngưỡng OI-13.

**Các bước:**

1. Chạy workload được duyệt.
2. Thu thập số đo theo cửa sổ quy định.
3. So từng thước đo với ngưỡng.

**Kết quả mong đợi:** Kiểm thử tải theo số người dùng, Trip đồng thời, thời lượng và ngưỡng đáp ứng; kết quả đạt toàn bộ ngưỡng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-60 — Kiểm chứng AC-60 — NFR-02

- Yêu cầu: NFR-02.
- Tiêu chí: AC-60.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-13
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Luồng Booking đang chạy; phạm vi ảnh hưởng cho phép OI-13.

**Các bước:**

1. Gây lỗi thanh toán và thông báo riêng từng lần.
2. Tiếp tục workload Booking.
3. Đo khả năng hoạt động và phạm vi ảnh hưởng.

**Kết quả mong đợi:** Gây lỗi riêng ở thanh toán và thông báo; kiểm tra các luồng đặt xe trong kịch bản vẫn hoạt động, đối chiếu phạm vi và mức ảnh hưởng cho phép.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-61 — Kiểm chứng AC-61 — NFR-03

- Yêu cầu: NFR-03.
- Tiêu chí: AC-61.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-13
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Thành phần chịu tải được chọn và kịch bản mở rộng OI-13.

**Các bước:**

1. Tăng năng lực thành phần đó.
2. Giữ phần còn lại theo kịch bản.
3. Đo kết quả và kiểm tra không bắt buộc scale toàn bộ cùng mức.

**Kết quả mong đợi:** Tăng năng lực thành phần chịu tải trong kịch bản; chứng minh không bắt buộc mở rộng toàn bộ hệ thống cùng mức.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-62 — Kiểm chứng AC-62 — NFR-04

- Yêu cầu: NFR-04.
- Tiêu chí: AC-62.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-13
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Phiên bản hiện hữu, thay đổi chức năng mẫu và ngưỡng ảnh hưởng OI-13.

**Các bước:**

1. Triển khai từng phần trong môi trường thử.
2. Chạy hồi quy chức năng hiện hữu.
3. Đối chiếu số đo và ngưỡng.

**Kết quả mong đợi:** Triển khai thay đổi chức năng trong môi trường kiểm chứng; ảnh hưởng đo được đến chức năng hiện hữu không vượt ngưỡng chất lượng áp dụng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-63 — Kiểm chứng AC-63 — NFR-05

- Yêu cầu: NFR-05.
- Tiêu chí: AC-63.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-15
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Loại dịch vụ mới và kịch bản mở rộng được duyệt OI-15.

**Các bước:**

1. Review thiết kế.
2. Thực hiện kịch bản bổ sung dịch vụ.
3. Ghi nhận phạm vi thay đổi và chạy hồi quy liên quan.

**Kết quả mong đợi:** Đánh giá thiết kế và thực hiện một kịch bản bổ sung loại dịch vụ; chứng minh phạm vi thay đổi không yêu cầu xây dựng lại toàn bộ ứng dụng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-64 — Kiểm chứng AC-64 — NFR-06

- Yêu cầu: NFR-06.
- Tiêu chí: AC-64.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Phương thức thanh toán bổ sung và kịch bản OI-17.

**Các bước:**

1. Review adapter và thực hiện kịch bản mở rộng.
2. Chạy lại các phương thức hiện hữu.

**Kết quả mong đợi:** Đánh giá thiết kế và trình diễn bổ sung một phương thức thanh toán trong kịch bản; các nghiệp vụ hiện hữu vẫn đáp ứng yêu cầu liên quan.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-65 — Kiểm chứng AC-65 — NFR-07

- Yêu cầu: NFR-07.
- Tiêu chí: AC-65.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Kênh/nhà cung cấp thông báo bổ sung theo OI-12.

**Các bước:**

1. Cấu hình/thay adapter theo thiết kế.
2. Phát các mốc thông báo hiện hữu.
3. Đối chiếu người nhận và kết quả.

**Kết quả mong đợi:** Đánh giá thiết kế và trình diễn kịch bản bổ sung kênh/nhà cung cấp; các mốc thông báo hiện hữu vẫn được đáp ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-66 — Kiểm chứng AC-66 — NFR-08

- Yêu cầu: NFR-08.
- Tiêu chí: AC-66.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-13
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Thành phần kỹ thuật thay thế và phạm vi hồi quy/ngưỡng theo OI-13.

**Các bước:**

1. Review phạm vi ảnh hưởng.
2. Thay thế trong môi trường thử.
3. Thực hiện hồi quy và thu bằng chứng.

**Kết quả mong đợi:** Đánh giá thiết kế và trình diễn một trường hợp thay thế thành phần; phạm vi thay đổi và kết quả hồi quy đáp ứng tiêu chí kiểm chứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
