# TS02 – Driver Account, Vehicle and Availability

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Hồ sơ Driver, xác minh, phương tiện và trạng thái làm việc.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-02-01 | Driver tự đăng ký | Positive / P0 | FR-05; UC-05; AC-03 | Số điện thoại chưa được sử dụng. | Gửi thông tin Driver, phương tiện và giấy tờ tối thiểu hợp lệ. | Tài khoản và hồ sơ được tạo ở Pending Verification; Driver chưa thể nhận Booking. |
| TC-02-02 | Operations Staff tạo Driver | Positive / P1 | FR-06; UC-05; AC-03 | Operations Staff có quyền tạo Driver. | Tạo Driver với dữ liệu và giấy tờ hợp lệ. | Hồ sơ được tạo ở Pending Verification; thao tác gắn đúng người thực hiện. |
| TC-02-03 | Duyệt hồ sơ Driver | Positive / P0 | FR-07; UC-06; AC-04 | Driver ở Pending Verification; Staff có quyền. | Cập nhật kết quả xác minh thành Active kèm lý do. | Driver chuyển Active; kết quả và lý do được lưu; audit có actor, thời điểm và trước/sau. |
| TC-02-04 | Từ chối hồ sơ Driver | Positive / P1 | FR-07; UC-06; AC-04 | Driver ở Pending Verification; Staff có quyền. | Từ chối hồ sơ và nhập lý do. | Trạng thái từ chối và lý do được lưu; Driver không thể chuyển Available; thao tác có audit. |
| TC-02-05 | Cập nhật hồ sơ hoặc phương tiện cần xác minh | Business rule / P0 | FR-08; UC-07, UC-08; AC-05 | Driver Active đã đăng nhập. | Thay đổi thông tin thuộc nhóm cần xác minh. | Thay đổi được lưu; hồ sơ về Pending Verification; Driver không nhận Booking cho tới khi được duyệt lại. |
| TC-02-06 | Chuyển Offline sang Available | Positive / P0 | FR-09; UC-09; AC-05 | Driver Active, không có Trip. | Chuyển trạng thái làm việc từ Offline sang Available rồi trở lại Offline. | Mỗi chuyển trạng thái hợp lệ được lưu và phản ánh đúng khi đọc lại. |
| TC-02-07 | Chặn chuyển trạng thái làm việc không hợp lệ | Negative / P0 | FR-09; UC-09; AC-05 | Driver chưa Active hoặc đang có Trip. | Yêu cầu chuyển sang Available hoặc Offline trái quy tắc. | Server từ chối; trạng thái Driver và Trip không thay đổi. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-02-01 |  |  | Not Run |  |  |  |
| TC-02-02 |  |  | Not Run |  |  |  |
| TC-02-03 |  |  | Not Run |  |  |  |
| TC-02-04 |  |  | Not Run |  |  |  |
| TC-02-05 |  |  | Not Run |  |  |  |
| TC-02-06 |  |  | Not Run |  |  |  |
| TC-02-07 |  |  | Not Run |  |  |  |
