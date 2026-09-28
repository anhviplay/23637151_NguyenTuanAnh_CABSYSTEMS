# TS09 — Notification

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-35 — Kiểm chứng AC-35 — FR-35

- Yêu cầu: FR-35.
- Tiêu chí: AC-35.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Booking hợp lệ; kênh thông báo thử.

**Các bước:**

1. Tiếp nhận Booking.
2. Kiểm tra thông báo tới Customer đúng bookingId.

**Kết quả mong đợi:** Booking được tiếp nhận; Customer nhận thông báo tiếp nhận Booking tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-36 — Kiểm chứng AC-36 — FR-36

- Yêu cầu: FR-36.
- Tiêu chí: AC-36.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver đã chấp nhận và được ghi nhận cho chuyến.

**Các bước:**

1. Quan sát thông báo nhận chuyến.
2. Đối chiếu Customer, Driver và Booking/Trip.

**Kết quả mong đợi:** Driver nhận chuyến; Customer nhận thông báo Driver đã nhận chuyến tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-37 — Kiểm chứng AC-37 — FR-37

- Yêu cầu: FR-37.
- Tiêu chí: AC-37.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Trip được ghi mốc đến điểm đón.

**Các bước:**

1. Quan sát thông báo.
2. Đối chiếu Customer và Trip tương ứng.

**Kết quả mong đợi:** Driver cập nhật đã đến điểm đón; Customer nhận thông báo đến điểm đón của Trip tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-38 — Kiểm chứng AC-38 — FR-38

- Yêu cầu: FR-38.
- Tiêu chí: AC-38.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Trip vừa hoàn thành.

**Các bước:**

1. Quan sát thông báo hoàn thành.
2. Đối chiếu Customer và Trip.

**Kết quả mong đợi:** Trip hoàn thành; Customer nhận thông báo hoàn thành Trip tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-39 — Kiểm chứng AC-39 — FR-39

- Yêu cầu: FR-39.
- Tiêu chí: AC-39.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Giao dịch có kết quả đã xác định.

**Các bước:**

1. Quan sát thông báo thanh toán.
2. Đối chiếu paymentId và kết quả với bản ghi giao dịch.

**Kết quả mong đợi:** Khi có kết quả thanh toán, Customer nhận thông báo phản ánh đúng kết quả của giao dịch tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-40 — Kiểm chứng AC-40 — FR-40

- Yêu cầu: FR-40.
- Tiêu chí: AC-40.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Thay đổi Trip thuộc danh mục cần báo Driver theo OI-12.

**Các bước:**

1. Thực hiện thay đổi được duyệt.
2. Kiểm tra thông báo tới Driver liên quan.

**Kết quả mong đợi:** Khi phát sinh thay đổi thuộc danh mục, Driver nhận thông báo về thay đổi của Trip đang thực hiện.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-93 — Provider ACK không có nghĩa Customer đã nhận

- Yêu cầu: EIR-06.
- Tiêu chí: AC-74.
- Cơ sở: Proposal kiểm thử thiết kế.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Kênh phân biệt tiếp nhận và kết quả gửi.

**Các bước:**

1. Nhận ACK đang xử lý.
2. Đọc delivery state.
3. Đưa kết quả gửi theo provider.

**Kết quả mong đợi:** Không suy ra delivered từ ACK; trạng thái đối chiếu hợp đồng kênh.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
