# Kiểm thử Authorization Audit

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 11 | POSTMAN: Lấy thông tin khách hàng với mã số | Có token Customer | Đọc Customer của actor; thử ID không thuộc mình. | Sử dụng token để xem thông tin khách hàng. |
| 12 | POSTMAN: Lấy thông tin tài xế với mã số | Có token Driver | Đọc Driver của actor; thử ID không thuộc mình. | Sử dụng token để xem thông tin tài xế. |
| 27 | POSTMAN: JWT tampering | Có JWT hợp lệ | Sửa payload sub/actorType mà giữ chữ ký cũ; gọi API bảo vệ và kiểm tra 401. | Token bị sửa bị từ chối; HTTP 401; không truy cập được API. |
| 28 | POSTMAN: Unauthorized API access | Có token Customer | Customer gọi GET Driver profile; kiểm tra 403 và không có data. | HTTP 403 Forbidden; không trả dữ liệu. |
