# Kiểm thử Customer Account Management

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 9 | POSTMAN: Đăng ký tài khoản khách hàng | Số điện thoại chưa đăng ký | Yêu cầu OTP Customer, lấy mã từ hộp thư sandbox, đăng ký và đăng nhập. | Tài khoản được tạo; khách hàng đăng nhập được vào hệ thống. |
| 10 | POSTMAN: Đăng nhập khách hàng | Customer ACTIVE | Gửi phoneNumber, password, actorType; nhận token hợp lệ. | Hệ thống cấp token. |
| 11 | POSTMAN: Lấy thông tin khách hàng với mã số | Có token Customer | Đọc Customer của actor; thử ID không thuộc mình. | Sử dụng token để xem thông tin khách hàng. |
