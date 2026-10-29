# Kiểm thử Driver Location

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 13 | POSTMAN: Liệt kê danh sách tài xế tại khu vực | Có >=5 Driver khác trạng thái, vị trí còn hiệu lực trong 1 km | Operations gọi nearby với radiusMeters=1000, pageSize=2, trang 1 và 2; kiểm tra totalItems và khoảng cách. | Danh sách Driver xung quanh tọa độ có bán kính 1 km, danh sách có giới hạn (limit) và phân trang (paging). |
| 17 | POSTMAN: Cập nhật trạng thái chuyến | Trip CREATED thuộc Driver | Chuyển DRIVER_ARRIVED, PICKED_UP, IN_PROGRESS, gửi vị trí tăng sequence, hoàn thành với distanceKm; thử chuyển sai thứ tự. | Trạng thái chuyến cập nhật đúng trình tự. |
