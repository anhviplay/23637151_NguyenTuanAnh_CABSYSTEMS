# Kiểm thử End to End Critical Scenarios

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 15 | POSTMAN: Đặt xe | Driver ACTIVE/AVAILABLE có xe đúng loại và vị trí gần | Tạo Booking bằng Customer, đọc SEARCHING và offer của Driver. | Booking được tạo; khách hàng thấy trạng thái đang tìm tài xế. |
| 16 | POSTMAN: Tài xế nhận chuyến | Offer còn hạn, Driver đủ điều kiện | Driver ACCEPTED; Customer đọc Booking/Trip có driverId, driverInfo.fullName và vehicle.plateNumber. | Ride/Trip được gán tài xế; khách hàng nhận thông tin tài xế. |
| 17 | POSTMAN: Cập nhật trạng thái chuyến | Trip CREATED thuộc Driver | Chuyển DRIVER_ARRIVED, PICKED_UP, IN_PROGRESS, gửi vị trí tăng sequence, hoàn thành với distanceKm; thử chuyển sai thứ tự. | Trạng thái chuyến cập nhật đúng trình tự. |
| 18 | POSTMAN: Hủy chuyến | Trip trước PICKED_UP | Customer gửi lý do và version, đợi Trip CANCELED; đọc hộp thông báo của hai bên và đối chiếu bookingId. | Ride/Trip chuyển sang CANCELED; các bên nhận thông báo. |
| 19 | POSTMAN: Thanh toán online | Trip COMPLETED, Fare và Payment PENDING | Chọn ELECTRONIC, settle sandbox, kiểm tra Payment COMPLETED và Trip.paymentStatus=COMPLETED, paymentId, paidAt. | Payment chuyển COMPLETED; chuyến được ghi nhận đã thanh toán. |
| 20 | POSTMAN: Đánh giá chuyến đi | Trip COMPLETED, chưa có Rating | Gửi score 1–5 và comment, kiểm tra rating.tripId; gửi lần hai không được tạo thêm. | Review được lưu và liên kết với chuyến đi. |
