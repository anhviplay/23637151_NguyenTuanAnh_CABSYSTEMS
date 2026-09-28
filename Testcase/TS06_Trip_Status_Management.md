# TS06 — Trip Status Management

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-20 — Kiểm chứng AC-20 — FR-20

- Yêu cầu: FR-20.
- Tiêu chí: AC-20.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: Không có OI riêng; cần dữ liệu và môi trường thử phù hợp.
- Trạng thái: Not Run.

**Tiền điều kiện và dữ liệu thử:** Booking đang trong giai đoạn tìm Driver.

**Các bước:**

1. Customer đọc Booking trong giai đoạn này.
2. Đối chiếu trạng thái hiển thị với tiến trình tìm.

**Kết quả mong đợi:** Trong khi tìm Driver cho Booking, Customer xem được tình trạng đang tìm Driver.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-21 — Kiểm chứng AC-21 — FR-21

- Yêu cầu: FR-21.
- Tiêu chí: AC-21.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: Không có OI riêng; cần dữ liệu và môi trường thử phù hợp.
- Trạng thái: Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver cụ thể đã nhận chuyến hợp lệ.

**Các bước:**

1. Customer đọc Booking/Trip.
2. Đối chiếu Driver hiển thị với kết quả phân công.

**Kết quả mong đợi:** Sau khi Driver nhận chuyến, thông tin hiển thị xác định được Driver nhận chuyến tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-22 — Kiểm chứng AC-22 — FR-22

- Yêu cầu: FR-22.
- Tiêu chí: AC-22.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-19
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver đã nhận chuyến; dữ liệu vị trí và kết quả ETA chuẩn theo OI-19.

**Các bước:**

1. Customer đọc ETA.
2. Đối chiếu thời điểm dự kiến đến, thời điểm tính và phương pháp được duyệt.

**Kết quả mong đợi:** Sau khi có Driver nhận chuyến và dữ liệu ước tính hợp lệ, Customer xem được thời gian dự kiến đến; kết quả khớp phương pháp ước tính áp dụng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-23 — Kiểm chứng AC-23 — FR-23

- Yêu cầu: FR-23.
- Tiêu chí: AC-23.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-05, OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Trip hợp lệ; các mốc được Driver cập nhật theo OI-14.

**Các bước:**

1. Cập nhật từng mốc áp dụng.
2. Customer đọc sau từng cập nhật.
3. Đối chiếu trạng thái, không chỉ màn hình cuối.

**Kết quả mong đợi:** Sau các cập nhật trạng thái hợp lệ của Driver, Customer xem được trạng thái Trip tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-24 — Kiểm chứng AC-24 — FR-24

- Yêu cầu: FR-24.
- Tiêu chí: AC-24.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver được phép thực hiện Trip và đủ điều kiện cập nhật đến điểm đón.

**Các bước:**

1. Ghi mốc arrived.
2. Customer đọc Trip.
3. Kiểm tra thông báo đến điểm đón tương ứng.

**Kết quả mong đợi:** Driver cập nhật đã đến điểm đón; trạng thái được thể hiện cho Customer và kích hoạt thông báo đến điểm đón.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-25 — Kiểm chứng AC-25 — FR-25

- Yêu cầu: FR-25.
- Tiêu chí: AC-25.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver/Trip đáp ứng điều kiện ghi đã đón Customer.

**Các bước:**

1. Ghi mốc pickedUp.
2. Kiểm tra dữ liệu Trip và thông tin Customer theo dõi.

**Kết quả mong đợi:** Driver cập nhật đã đón Customer; Customer theo dõi được mốc đã đón khách của Trip.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-26 — Kiểm chứng AC-26 — FR-26

- Yêu cầu: FR-26.
- Tiêu chí: AC-26.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver/Trip đáp ứng điều kiện ghi đang di chuyển.

**Các bước:**

1. Ghi mốc moving.
2. Đọc trạng thái Trip từ phía Customer.

**Kết quả mong đợi:** Driver cập nhật đang di chuyển; trạng thái hiện tại của Trip thể hiện mốc tương ứng.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-27 — Kiểm chứng AC-27 — FR-27

- Yêu cầu: FR-27.
- Tiêu chí: AC-27.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver/Trip đáp ứng điều kiện hoàn thành OI-14.

**Các bước:**

1. Ghi mốc completed.
2. Customer đọc Trip.
3. Quan sát thông báo hoàn thành và sự kiện nghiệp vụ sau Trip.

**Kết quả mong đợi:** Driver cập nhật hoàn thành; Customer thấy Trip hoàn thành, nhận thông báo hoàn thành và có thể sử dụng nghiệp vụ sau Trip.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-85 — Chuyển tiếp không hợp lệ

- Yêu cầu: FR-23, FR-24, FR-25, FR-26, FR-27.
- Tiêu chí: AC-23, AC-24, AC-25, AC-26, AC-27.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-05, OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Tập chuyển tiếp được phép/cấm đã duyệt OI-14.

**Các bước:**

1. Gửi từng chuyển tiếp bị cấm.
2. Đọc trạng thái sau request.

**Kết quả mong đợi:** Không áp dụng chuyển tiếp trái quy tắc; giữ trạng thái đã cam kết và phản hồi theo contract.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
