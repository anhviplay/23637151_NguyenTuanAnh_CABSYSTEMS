# Kiểm thử Create Booking

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 14 | POSTMAN: Liệt kê danh sách các booking của Customer | Có >=5 Booking của Customer | Token Customer gọi danh sách với pageSize=2, nhiều trang; kiểm tra quyền sở hữu. | Danh sách Booking liên quan đến khách hàng, danh sách có giới hạn (limit) và phân trang (paging). |
| 15 | POSTMAN: Đặt xe | Driver ACTIVE/AVAILABLE có xe đúng loại và vị trí gần | Tạo Booking bằng Customer, đọc SEARCHING và offer của Driver. | Booking được tạo; khách hàng thấy trạng thái đang tìm tài xế. |
