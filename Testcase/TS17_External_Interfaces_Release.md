# TS17 — External Interfaces Release

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-69 — Kiểm chứng AC-69 — EIR-01

- Yêu cầu: EIR-01.
- Tiêu chí: AC-69.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-21
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Nền tảng Customer được duyệt OI-21; dữ liệu luồng tài khoản/Booking/Trip/thanh toán/đánh giá.

**Các bước:**

1. Chạy các luồng Customer đã chọn trên từng nền tảng.
2. Đối chiếu input/output với FR và AC tương ứng.

**Kết quả mong đợi:** Kiểm tra các luồng Customer trên nền tảng mục tiêu; dữ liệu vào/ra đáp ứng các FR tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-70 — Kiểm chứng AC-70 — EIR-02

- Yêu cầu: EIR-02.
- Tiêu chí: AC-70.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-18, OI-21
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Nền tảng Driver OI-21; tài khoản, phương tiện và dữ liệu OI-18.

**Các bước:**

1. Chạy đăng ký/xác thực/hồ sơ/phương tiện/readiness/assignment/mốc/vị trí.
2. Đối chiếu các FR tương ứng.

**Kết quả mong đợi:** Kiểm tra các luồng Driver trên nền tảng mục tiêu; các thao tác và thông tin hiển thị đáp ứng các FR tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-71 — Kiểm chứng AC-71 — EIR-03

- Yêu cầu: EIR-03.
- Tiêu chí: AC-71.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-08, OI-20, OI-21
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Giao diện Operations theo OI-21; danh mục thao tác và ma trận quyền OI-20/OI-08.

**Các bước:**

1. Thực hiện từng thao tác trên giao diện với người có/thiếu quyền.
2. Đối chiếu dữ liệu và kiểm soát truy cập.

**Kết quả mong đợi:** Trên giao diện quản trị, đối chiếu các thao tác với ma trận quyền; không cung cấp khả năng thực hiện thao tác trái quyền.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-72 — Kiểm chứng AC-72 — EIR-04

- Yêu cầu: EIR-04.
- Tiêu chí: AC-72.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-07, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Provider sandbox; mapping và chính sách OI-07/OI-17.

**Các bước:**

1. Chạy thành công, thất bại và xử lý lại hợp lệ.
2. Quan sát cả chiều gửi yêu cầu, nhận kết quả và kết quả cho Customer.

**Kết quả mong đợi:** Kiểm thử tích hợp với môi trường thử của nhà cung cấp đã chọn, bao gồm thành công, thất bại và xử lý lại theo chính sách.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-73 — Kiểm chứng AC-73 — EIR-05

- Yêu cầu: EIR-05.
- Tiêu chí: AC-73.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-05, OI-19
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Nguồn vị trí, cơ chế tiếp nhận/ETA OI-19; tình huống mạng OI-05.

**Các bước:**

1. Cấp dữ liệu vị trí hợp lệ.
2. Xác minh dữ liệu được tiếp nhận và sử dụng trong tìm Driver/ETA theo chính sách mạng.

**Kết quả mong đợi:** Cấp dữ liệu vị trí hợp lệ qua cơ chế tiếp nhận; xác minh dữ liệu được sử dụng cho tìm Driver và ước tính thời gian đến.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-74 — Kiểm chứng AC-74 — EIR-06

- Yêu cầu: EIR-06.
- Tiêu chí: AC-74.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Danh mục sự kiện, người nhận, nội dung và kênh theo OI-12.

**Các bước:**

1. Phát lần lượt các mốc FR-15, FR-33, FR-35–FR-40.
2. Đối chiếu từng thông báo với bộ kỳ vọng.

**Kết quả mong đợi:** Phát sinh từng mốc thông báo và kiểm tra đúng người nhận, nội dung nghiệp vụ và kênh.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-75 — Kiểm chứng AC-75 — CON-01

- Yêu cầu: CON-01.
- Tiêu chí: AC-75.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-11
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Phạm vi release, mốc bắt đầu và thủ tục chấp nhận đã duyệt OI-11.

**Các bước:**

1. Đối chiếu bằng chứng hoàn tất xây dựng/triển khai với mốc bắt đầu.
2. Kiểm tra thời gian không vượt 7 tuần và đúng phạm vi release.

**Kết quả mong đợi:** Ngày hoàn tất xây dựng và triển khai phạm vi release không vượt quá 7 tuần tính từ mốc bắt đầu.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
