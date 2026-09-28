# TS15 — End to End Critical Scenarios

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-98 — Booking đến hoàn thành Trip

- Yêu cầu: FR-11, FR-12, FR-16, FR-24, FR-25, FR-26, FR-27.
- Tiêu chí: AC-11, AC-12, AC-16, AC-24, AC-25, AC-26, AC-27.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-02, OI-12, OI-14, OI-15, OI-18, OI-19
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Tạo Booking.
2. Driver nhận.
3. Cập nhật các mốc hợp lệ đến hoàn thành.

**Kết quả mong đợi:** Booking/Trip/Driver liên kết đúng; Customer theo dõi kết quả; chuyển tiếp đúng baseline đã duyệt.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-99 — Từ chối rồi tìm Driver khác

- Yêu cầu: FR-17.
- Tiêu chí: AC-17.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-02, OI-12, OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Tạo Booking.
2. Driver được đề nghị từ chối.
3. Quan sát tìm ứng viên khác.

**Kết quả mong đợi:** Customer không phải gửi lại Booking; bookingId được giữ.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-100 — Không phản hồi rồi tìm Driver khác

- Yêu cầu: FR-18.
- Tiêu chí: AC-18.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-02, OI-03, OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Đề nghị Driver.
2. Không phản hồi tới điều kiện đã duyệt.
3. Quan sát lần tìm tiếp.

**Kết quả mong đợi:** Tiếp tục trên cùng Booking theo OI-03, không dùng timeout cố định tự đặt.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-101 — Không tìm được Driver

- Yêu cầu: FR-19.
- Tiêu chí: AC-19.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-02, OI-12, OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Gửi Booking với tập ứng viên không phù hợp.
2. Đạt điều kiện kết thúc tìm.
3. Xem thông báo.

**Kết quả mong đợi:** Customer nhận kết quả rõ ràng theo điều kiện tìm đã chốt.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-102 — Hoàn thành và thanh toán tiền mặt

- Yêu cầu: FR-27, FR-28, FR-29, FR-30.
- Tiêu chí: AC-27, AC-28, AC-29, AC-30.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-01, OI-14, OI-15, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Hoàn thành Trip.
2. Tính cước.
3. Chọn cash.
4. Xác nhận nhận tiền theo quy trình.

**Kết quả mong đợi:** Số tiền và kết quả thanh toán đúng dữ liệu chuẩn, chủ thể xác nhận và chính sách.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-103 — Điện tử thất bại và xử lý lại

- Yêu cầu: FR-31, FR-32, FR-33, FR-34, FR-39.
- Tiêu chí: AC-31, AC-32, AC-33, AC-34, AC-39.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-01, OI-07, OI-12, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Khởi tạo payment.
2. Provider báo failure.
3. Thông báo Customer.
4. Xử lý lại theo chính sách.
5. Nhận kết quả.

**Kết quả mong đợi:** Giao dịch và các attempt đối chiếu đúng; Customer nhận kết quả theo chính sách đã chốt.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-104 — Thông báo lỗi trong lúc đặt xe

- Yêu cầu: NFR-02, FR-12.
- Tiêu chí: AC-60, AC-12.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12, OI-13, OI-14, OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Đặt Booking.
2. Gây lỗi kênh thông báo.
3. Tiếp tục luồng đặt xe.
4. Đo ảnh hưởng.

**Kết quả mong đợi:** Lỗi không làm toàn bộ đặt xe ngừng; mức ảnh hưởng đối chiếu OI-13.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-105 — Mất kết nối khi cập nhật Trip

- Yêu cầu: FR-23, EIR-05.
- Tiêu chí: AC-23, AC-73.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-05, OI-14, OI-19
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Thực hiện Trip.
2. Mất kết nối.
3. Phát các cập nhật theo tình huống thử.
4. Khôi phục.
5. Đối chiếu dữ liệu.

**Kết quả mong đợi:** Hành vi hiển thị/đồng bộ đúng quyết định OI-05, không mặc định last-state/reconnect tự động.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-106 — Lịch sử và đánh giá sau Trip

- Yêu cầu: FR-41, FR-42.
- Tiêu chí: AC-41, AC-42.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-10, OI-14
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Hoàn thành Trip.
2. Xem lịch sử còn hạn lưu.
3. Gửi rating hợp lệ.

**Kết quả mong đợi:** Lịch sử đúng Customer và rating đáp ứng điều kiện hoàn thành; không thêm điều kiện thanh toán thành công.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-107 — Hủy theo chính sách được duyệt

- Yêu cầu: FR-54.
- Tiêu chí: AC-54.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-04, OI-09, OI-14, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Môi trường tích hợp và bộ dữ liệu hợp lệ; các OI liên quan đã có quyết định áp dụng.

**Các bước:**

1. Tạo Booking/Trip tại các mốc thuộc chính sách hủy.
2. Gửi yêu cầu từ chủ thể được duyệt.
3. Kiểm tra kết quả và báo cáo.

**Kết quả mong đợi:** Toàn bộ điều kiện hủy, hệ quả và số liệu tuân theo OI-04/OI-09. Đây là khung test có điều kiện; chưa có endpoint hủy mặc định.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
