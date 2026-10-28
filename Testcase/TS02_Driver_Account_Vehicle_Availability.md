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
| TC-02-01 | Driver tự đăng ký | Positive / P0 | Rubric-21; FR-05; UC-05; AC-03 | Số điện thoại chưa được sử dụng. | Yêu cầu OTP, xác minh OTP hợp lệ rồi gửi thông tin Driver, phương tiện và giấy tờ tối thiểu. | Tài khoản và hồ sơ được tạo ở Pending Verification sau xác minh OTP; Driver chưa thể nhận Booking. |
| TC-02-02 | Operations Staff tạo Driver | Positive / P1 | FR-06; UC-05; AC-03 | Operations Staff có quyền tạo Driver. | Tạo Driver với dữ liệu và giấy tờ hợp lệ. | Hồ sơ được tạo ở Pending Verification; thao tác gắn đúng người thực hiện. |
| TC-02-03 | Duyệt hồ sơ Driver | Positive / P0 | FR-07; UC-06; AC-04 | Driver ở Pending Verification; Staff có quyền. | Cập nhật kết quả xác minh thành Active kèm lý do. | Driver chuyển Active; kết quả và lý do được lưu; audit có actor, thời điểm và trước/sau. |
| TC-02-04 | Từ chối hồ sơ Driver | Positive / P1 | FR-07; UC-06; AC-04 | Driver ở Pending Verification; Staff có quyền. | Từ chối hồ sơ và nhập lý do. | Trạng thái từ chối và lý do được lưu; Driver không thể chuyển Available; thao tác có audit. |
| TC-02-05 | Cập nhật hồ sơ hoặc phương tiện cần xác minh | Business rule / P0 | FR-08; UC-07, UC-08; AC-05 | Driver Active đã đăng nhập. | Thay đổi thông tin thuộc nhóm cần xác minh. | Thay đổi được lưu; hồ sơ về Pending Verification; Driver không nhận Booking cho tới khi được duyệt lại. |
| TC-02-06 | Chuyển Offline sang Available | Positive / P0 | FR-09; UC-09; AC-05 | Driver Active, không có Trip. | Chuyển trạng thái làm việc từ Offline sang Available rồi trở lại Offline. | Mỗi chuyển trạng thái hợp lệ được lưu và phản ánh đúng khi đọc lại. |
| TC-02-07 | Chặn chuyển trạng thái làm việc không hợp lệ | Negative / P0 | FR-09; UC-09; AC-05 | Driver chưa Active hoặc đang có Trip. | Yêu cầu chuyển sang Available hoặc Offline trái quy tắc. | Server từ chối; trạng thái Driver và Trip không thay đổi. |
| TC-02-08 | Xem Driver theo ID bằng token | API + Authorization / P0 | Rubric-12; FR-08, FR-49; DRV-12 | Có hai Driver, token Driver và token Staff có quyền. | GET theo ID của mình; Staff GET ID Driver; thử token thiếu/sai, Customer token, Driver khác và ID không tồn tại. | Driver và Staff đúng quyền nhận 200 với hồ sơ giới hạn; token thiếu/sai 401; Customer hoặc Driver khác 403; ID không tồn tại 404; không lộ giấy tờ. |
| TC-02-09 | Từ chối OTP tự đăng ký Driver không hợp lệ | Negative / P0 | Rubric-21; FR-05; UC-05; AC-03 | Số điện thoại chưa đăng ký; có OTP theo cấu hình identity. | Thử OTP sai, hết hạn, đã dùng hoặc proof không khớp số điện thoại khi tự đăng ký. | Mỗi trường hợp bị từ chối; không tạo tài khoản/hồ sơ Driver hoặc phát sự kiện xét duyệt. Nhánh Staff tạo hồ sơ không bị yêu cầu OTP. |

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
| TC-02-08 |  |  | Not Run |  |  |  |
| TC-02-09 |  |  | Not Run |  |  |  |
