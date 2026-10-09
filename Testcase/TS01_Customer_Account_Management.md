# TS01 – Customer Account Management

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Đăng ký, đăng nhập, khôi phục mật khẩu và cập nhật hồ sơ Customer.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-01-01 | Đăng ký Customer hợp lệ | Positive / P0 | FR-01; UC-01; AC-01 | Số điện thoại chưa tồn tại; dịch vụ OTP hoạt động. | Gửi thông tin đăng ký; nhập OTP hợp lệ. | Tài khoản Customer được tạo duy nhất; OTP được đánh dấu đã dùng; người dùng nhận kết quả thành công. |
| TC-01-02 | Từ chối OTP không hợp lệ | Negative / P0 | FR-01, FR-03; UC-01, UC-03; AC-01 | Có yêu cầu OTP còn hiệu lực. | Lần lượt gửi OTP sai, hết hạn và đã sử dụng. | Mỗi yêu cầu bị từ chối an toàn; không tạo tài khoản hoặc đổi mật khẩu; lỗi không làm lộ dữ liệu xác thực. |
| TC-01-03 | Đăng nhập Customer và Driver | Positive / P0 | FR-02; UC-02; AC-01 | Có tài khoản Customer và Driver hợp lệ. | Đăng nhập từng tài khoản bằng số điện thoại và mật khẩu đúng. | Mỗi người dùng nhận phiên hợp lệ với đúng danh tính và quyền; không trả mật khẩu trong phản hồi. |
| TC-01-04 | Khôi phục mật khẩu | Positive / P0 | FR-03; UC-03; AC-01 | Tài khoản đã tồn tại; OTP khôi phục hợp lệ. | Yêu cầu OTP; xác nhận mật khẩu mới; đăng nhập bằng mật khẩu mới rồi thử mật khẩu cũ. | Mật khẩu mới hoạt động; mật khẩu cũ bị từ chối; OTP không thể dùng lại. |
| TC-01-05 | Cập nhật hồ sơ Customer | Positive + Negative / P1 | FR-04; UC-04; AC-02 | Customer đã đăng nhập. | Cập nhật dữ liệu hợp lệ và đọc lại; sau đó gửi dữ liệu sai định dạng. | Dữ liệu hợp lệ được lưu và đọc đúng; lần gửi sai bị từ chối và không làm thay đổi hồ sơ hiện có. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-01-01 |  |  | Not Run |  |  |  |
| TC-01-02 |  |  | Not Run |  |  |  |
| TC-01-03 |  |  | Not Run |  |  |  |
| TC-01-04 |  |  | Not Run |  |  |  |
| TC-01-05 |  |  | Not Run |  |  |  |
