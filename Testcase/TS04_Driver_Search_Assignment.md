# Kiểm thử Driver Search Assignment

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 13 | POSTMAN: Liệt kê danh sách tài xế tại khu vực | Có >=5 Driver khác trạng thái, vị trí còn hiệu lực trong 1 km | Operations gọi nearby với radiusMeters=1000, pageSize=2, trang 1 và 2; kiểm tra totalItems và khoảng cách. | Danh sách Driver xung quanh tọa độ có bán kính 1 km, danh sách có giới hạn (limit) và phân trang (paging). |
| 15 | POSTMAN: Đặt xe | Driver ACTIVE/AVAILABLE có xe đúng loại và vị trí gần | Tạo Booking bằng Customer, đọc SEARCHING và offer của Driver. | Booking được tạo; khách hàng thấy trạng thái đang tìm tài xế. |
| 16 | POSTMAN: Tài xế nhận chuyến | Offer còn hạn, Driver đủ điều kiện | Driver ACCEPTED; Customer đọc Booking/Trip có driverId, driverInfo.fullName và vehicle.plateNumber. | Ride/Trip được gán tài xế; khách hàng nhận thông tin tài xế. |
