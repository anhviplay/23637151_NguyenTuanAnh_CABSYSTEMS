# Kiểm thử Driver Account Vehicle Availability

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 12 | POSTMAN: Lấy thông tin tài xế với mã số | Có token Driver | Đọc Driver của actor; thử ID không thuộc mình. | Sử dụng token để xem thông tin tài xế. |
| 21 | POSTMAN: Đăng ký tài xế | Số Driver chưa đăng ký | OTP request, verify, dùng proof gửi hồ sơ và vehicle; đọc PENDING_VERIFICATION. | Hồ sơ tài xế được tạo ở trạng thái chờ duyệt. |
| 22 | POSTMAN: Duyệt hồ sơ tài xế | Operations có driver:verify; hồ sơ chờ duyệt | Mở danh sách hồ sơ, đọc chi tiết, duyệt ACTIVE và thử REJECTED trên hồ sơ khác; Driver đọc kết quả thông báo. | Trạng thái hồ sơ được cập nhật; tài xế nhận kết quả. |
| 23 | POSTMAN: Bật/tắt trạng thái nhận chuyến | Driver ACTIVE và chưa có Trip đang chạy | Đổi OFFLINE rồi AVAILABLE với version hiện hành; đọc lại trạng thái. | Trạng thái nhận chuyến thay đổi và được hệ thống ghi nhận. |
