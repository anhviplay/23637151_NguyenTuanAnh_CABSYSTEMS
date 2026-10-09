# TS15 – End-to-End Critical Scenarios

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Các luồng xuyên suốt trọng yếu của CAB Core Ride-Hailing MVP.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-15-01 | E2E Bike thanh toán tiền mặt | E2E / P0 | FR-10–FR-46; AC-06–AC-26 | Customer/Driver hợp lệ; Driver Bike Available. | Tạo Booking; điều phối; nhận chuyến; hoàn thành Trip; tính Fare; chọn Cash; Driver xác nhận thu; xem lịch sử. | Một chuỗi Booking–Trip–Fare–Payment nhất quán; Fare dùng 5.000 VNĐ/km; thông báo và lịch sử đúng. |
| TC-15-02 | E2E Car 4-seat thanh toán điện tử | E2E / P0 | FR-10–FR-46; AC-06–AC-26 | Driver Car 4-seat Available; Provider trả thành công. | Thực hiện toàn bộ chuyến và thanh toán điện tử. | Fare dùng 10.000 VNĐ/km; Payment thành công đúng một lần; dữ liệu xuyên suốt cùng Customer/Driver/Trip. |
| TC-15-03 | E2E Car 7-seat Payment thất bại rồi tiền mặt | E2E / P0 | FR-10–FR-46; AC-06–AC-26 | Driver Car 7-seat Available; Provider trả thất bại. | Hoàn thành Trip; thử Electronic; đổi sang Cash; xác nhận thu. | Fare dùng 13.000 VNĐ/km; Fare không tạo lại; Payment chuyển hợp lệ và Customer được thông báo. |
| TC-15-04 | E2E không tìm được Driver | E2E exception / P0 | FR-12–FR-19; AC-07–AC-11 | Không có Driver đủ điều kiện. | Customer tạo Booking và chờ quy trình kết thúc theo cấu hình. | Booking thành No Driver Available; không tạo Trip; Customer được thông báo. |
| TC-15-05 | E2E mất mạng trong Trip | E2E recovery / P0 | FR-23–FR-32; AC-14, AC-15, AC-18 | Trip đang thực hiện. | Ngắt mạng; tạo cập nhật cục bộ; kết nối lại và đồng bộ. | Vị trí/trạng thái được khôi phục theo thứ tự, không trùng và không ghi đè dữ liệu mới hơn; Trip tiếp tục hợp lệ. |
| TC-15-06 | Xác nhận phạm vi release 7 tuần | Release verification / P0 | CON-01; AC-52 | Có danh sách phạm vi MVP, kế hoạch release và bằng chứng triển khai. | Đối chiếu các hạng mục phát hành với phạm vi SRS và mốc 7 tuần. | Các chức năng MVP đã phê duyệt có bằng chứng build, test và triển khai trong 7 tuần; hạng mục ngoài phạm vi không được tính là điều kiện nghiệm thu MVP. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-15-01 |  |  | Not Run |  |  |  |
| TC-15-02 |  |  | Not Run |  |  |  |
| TC-15-03 |  |  | Not Run |  |  |  |
| TC-15-04 |  |  | Not Run |  |  |  |
| TC-15-05 |  |  | Not Run |  |  |  |
| TC-15-06 |  |  | Not Run |  |  |  |
