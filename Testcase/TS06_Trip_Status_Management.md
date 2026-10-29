# Kiểm thử Trip Status Management

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 17 | POSTMAN: Cập nhật trạng thái chuyến | Trip CREATED thuộc Driver | Chuyển DRIVER_ARRIVED, PICKED_UP, IN_PROGRESS, gửi vị trí tăng sequence, hoàn thành với distanceKm; thử chuyển sai thứ tự. | Trạng thái chuyến cập nhật đúng trình tự. |
| 18 | POSTMAN: Hủy chuyến | Trip trước PICKED_UP | Customer gửi lý do và version, đợi Trip CANCELED; đọc hộp thông báo của hai bên và đối chiếu bookingId. | Ride/Trip chuyển sang CANCELED; các bên nhận thông báo. |
