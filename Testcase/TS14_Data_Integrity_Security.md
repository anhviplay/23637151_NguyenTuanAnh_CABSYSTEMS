# Kiểm thử Data Integrity Security

STT dưới đây là STT gốc trong phiếu chấm.

| STT | Nội dung | Tiền điều kiện | Kiểm tra | Kết quả |
| --- | --- | --- | --- | --- |
| 2 | Kiểm tra .gitignore và .env trên github | Repository đã khởi tạo | Đối chiếu git check-ignore và git ls-files với .env, .env.example, .data. | .env bị Git bỏ qua; .env.example chỉ chứa biến mẫu, không chứa mật khẩu hoặc khóa thực. |
| 24 | POSTMAN: Data encryption at rest | DB có hồ sơ và tài khoản | Đọc trực tiếp hash/cipher trong DB; đối chiếu khóa chỉ ở cấu hình, không nằm trong DB hay Git. | Dữ liệu nhạy cảm không lưu plaintext; mật khẩu được băm; dữ liệu cần khôi phục được mã hóa; khóa tách khỏi DB. |
| 25 | POSTMAN: SQL injection attempt | API đăng nhập sẵn sàng | Gửi email hoặc phoneNumber chứa SQL injection và password bất kỳ; kiểm tra 400/401, không có token/lỗi DB. | Query không bị bypass; không đăng nhập thành công; không lộ dữ liệu DB; HTTP 400 hoặc 401. |
| 26 | POSTMAN: XSS input test | Có token Customer và version hồ sơ | Gửi <script>alert('hack')</script> trong tên hoặc comment; kiểm tra response application/json và ký tự được escape. | Script không được execute; output được escape. |
| 27 | POSTMAN: JWT tampering | Có JWT hợp lệ | Sửa payload sub/actorType mà giữ chữ ký cũ; gọi API bảo vệ và kiểm tra 401. | Token bị sửa bị từ chối; HTTP 401; không truy cập được API. |
| 28 | POSTMAN: Unauthorized API access | Có token Customer | Customer gọi GET Driver profile; kiểm tra 403 và không có data. | HTTP 403 Forbidden; không trả dữ liệu. |
| 30 | POSTMAN: Replay attack (idempotency) | Đã chọn ELECTRONIC với Idempotency-Key | Gửi lại command cùng key/body trước/sau callback; so status/body gốc, Payment version và số giao dịch sandbox; gửi lại callback cùng eventId. | Không xử lý lại transaction; không double charge; trả response cũ. |
