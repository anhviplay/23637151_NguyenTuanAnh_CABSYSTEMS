# TS04 – Driver Search and Assignment

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Lọc, xếp hạng và gửi Assignment tuần tự.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-04-01 | Lọc đúng Driver đủ điều kiện | Positive / P0 | FR-12; UC-11; AC-07 | Có Driver khác nhau về xác minh, trạng thái, loại phương tiện, Trip và độ mới vị trí. | Khởi chạy tìm Driver cho một Booking. | Chỉ Driver Active, Available, đúng loại dịch vụ, không có Trip và có vị trí còn hiệu lực được chọn. |
| TC-04-02 | Loại vị trí hết hiệu lực | Negative / P0 | FR-12, FR-24; UC-11, UC-13; AC-07, AC-14 | Ngưỡng độ mới T đã cấu hình; Driver có vị trí cũ hơn T. | Tìm Driver cho Booking gần Driver đó. | Driver không nằm trong danh sách ứng viên và dữ liệu cũ không được dùng để tính ETA. |
| TC-04-03 | Ưu tiên Driver gần và phù hợp | Positive / P0 | FR-13; UC-11; AC-08 | Có ít nhất hai Driver đủ điều kiện với ETA khác nhau. | Xếp hạng ứng viên. | Driver phù hợp với ETA tốt hơn được ưu tiên; kết quả dùng cùng bộ dữ liệu là ổn định. |
| TC-04-04 | Gửi Assignment tuần tự | Positive / P0 | FR-14; UC-11; AC-09 | Có danh sách Driver đã xếp hạng. | Bắt đầu điều phối và quan sát các Assignment. | Mỗi thời điểm chỉ Driver theo thứ tự hiện hành được mời; kết quả của Assignment trước được ghi trước khi tiếp tục. |
| TC-04-05 | Kết thúc khi hết ứng viên | Exception / P0 | FR-18, FR-19; UC-11; AC-11 | Không còn Driver phù hợp hoặc đạt điều kiện kết thúc đã cấu hình. | Tiếp tục quy trình tìm Driver. | Tìm kiếm dừng; Booking thành No Driver Available; Customer được thông báo đúng Booking. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-04-01 |  |  | Not Run |  |  |  |
| TC-04-02 |  |  | Not Run |  |  |  |
| TC-04-03 |  |  | Not Run |  |  |  |
| TC-04-04 |  |  | Not Run |  |  |  |
| TC-04-05 |  |  | Not Run |  |  |  |
