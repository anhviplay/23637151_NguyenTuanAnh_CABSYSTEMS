# TS03 – Create Booking

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Tạo Booking và kiểm tra dữ liệu đầu vào.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-03-01 | Tạo Booking Bike | Positive / P0 | FR-10, FR-11; UC-10; AC-06 | Customer đã đăng nhập; điểm đón và điểm đến hợp lệ. | Chọn Bike và xác nhận Booking. | Một Booking có mã duy nhất được tạo ở Searching; loại dịch vụ và địa điểm được lưu; Customer nhận xác nhận tiếp nhận. |
| TC-03-02 | Tạo Booking Car 4-seat và Car 7-seat | Positive / P0 | FR-10, FR-11; UC-10; AC-06 | Customer đã đăng nhập. | Tạo lần lượt Booking với hai loại dịch vụ ô tô. | Mỗi Booking được tạo duy nhất ở Searching và giữ đúng loại dịch vụ đã chọn. |
| TC-03-03 | Từ chối dữ liệu Booking thiếu hoặc sai | Negative / P0 | FR-10, FR-11; UC-10; AC-06 | Customer đã đăng nhập. | Bỏ trống điểm đón, điểm đến hoặc gửi loại dịch vụ không hỗ trợ. | Yêu cầu bị từ chối với lỗi trường dữ liệu; không tạo Booking dở dang. |
| TC-03-04 | Gửi lặp yêu cầu tạo Booking | Reliability / P0 | FR-11; NFR-12; AC-06, AC-45 | Customer đã đăng nhập; dùng cùng Idempotency-Key. | Gửi lại cùng yêu cầu tạo Booking do mất phản hồi. | Chỉ một Booking được tạo; các phản hồi trỏ tới cùng bookingId. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-03-01 |  |  | Not Run |  |  |  |
| TC-03-02 |  |  | Not Run |  |  |  |
| TC-03-03 |  |  | Not Run |  |  |  |
| TC-03-04 |  |  | Not Run |  |  |  |
