# Kiểm thử Notification

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 16 | POSTMAN: Tài xế nhận chuyến | Offer còn hạn, Driver đủ điều kiện | Driver ACCEPTED; Customer đọc Booking/Trip có driverId, driverInfo.fullName và vehicle.plateNumber. | Ride/Trip được gán tài xế; khách hàng nhận thông tin tài xế. |
| 18 | POSTMAN: Hủy chuyến | Trip trước PICKED_UP | Customer gửi lý do và version, đợi Trip CANCELED; đọc hộp thông báo của hai bên và đối chiếu bookingId. | Ride/Trip chuyển sang CANCELED; các bên nhận thông báo. |
| 22 | POSTMAN: Duyệt hồ sơ tài xế | Operations có driver:verify; hồ sơ chờ duyệt | Mở danh sách hồ sơ, đọc chi tiết, duyệt ACTIVE và thử REJECTED trên hồ sơ khác; Driver đọc kết quả thông báo. | Trạng thái hồ sơ được cập nhật; tài xế nhận kết quả. |
