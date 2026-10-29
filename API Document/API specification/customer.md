# API Customer

Mọi path dưới đây có tiền tố `/api/v1`. Dùng quy ước trong [common.md](common.md).

| Method | Path | Actor hoặc permission | Dữ liệu | Kết quả |
| --- | --- | --- | --- | --- |
| POST | /auth/customer/registration-otp | PUBLIC | phoneNumber | 202; OTP được lưu vào hộp thư sandbox, có thời hạn |
| POST | /auth/customer/registrations | PUBLIC | phoneNumber, password, otp, fullName | 201; accountId, customerId, status=ACTIVE |
| POST | /auth/sessions | PUBLIC | phoneNumber, password, actorType=CUSTOMER | 200; accessToken, refreshToken, expiresAt, actorId |
| GET | /customers/{customerId} | CUSTOMER | ID của chính Customer | 200; hồ sơ Customer |
| PATCH | /customers/me | CUSTOMER | fullName, version | 200; hồ sơ và version mới |
| GET | /customers/me/bookings | CUSTOMER | page, pageSize | 200; Booking của token, mới nhất trước |
| POST | /bookings | CUSTOMER | pickup, destination, serviceType | 201; SEARCHING |
| GET | /bookings/{bookingId} | CUSTOMER | Booking của token | 200; trạng thái, driverInfo khi đã gán, tripId sau Kafka |
| POST | /bookings/{bookingId}/cancellations | CUSTOMER | reasonCode, reasonText, expectedVersion | 200; Booking CANCELED; Trip và thông báo cập nhật qua Kafka |
| GET | /trips/{tripId} | CUSTOMER | Trip của token | 200; trạng thái, driverInfo, paymentStatus, paymentId, paidAt |
| GET | /customers/me/trips | CUSTOMER | page, pageSize | 200; Trip của token |
| GET | /trips/{tripId}/fare | CUSTOMER | Trip của token | 200; Fare và paymentId; 409 FARE_NOT_READY khi sự kiện chưa xử lý |
| GET | /payments/{paymentId} | CUSTOMER | Payment của token | 200; trạng thái hiện hành |
| PATCH | /payments/{paymentId}/method | CUSTOMER | method=CASH/ELECTRONIC, expectedVersion | 200; cập nhật Payment; chỉ chọn lần đầu hoặc đổi sau FAILED |
| POST | /payments/{paymentId}/retry | CUSTOMER | Payment điện tử FAILED | 202; cùng Payment chuyển PENDING |
| POST | /trips/{tripId}/ratings | CUSTOMER | score, comment | 201; Rating gắn đúng Trip |
| GET | /drivers/{driverId}/rating-summary | CUSTOMER/DRIVER/OPERATIONS | driverId | 200; ratingCount, averageScore, updatedAt |
| GET | /notifications/me | CUSTOMER/DRIVER/OPERATIONS | page, pageSize | 200; thông báo của chính actor |

## Quy tắc Booking và thanh toán

`pickup` và `destination` chứa address và location với latitude/longitude; serviceType là BIKE, CAR_4 hoặc CAR_7. Thông tin Driver chỉ xuất hiện trong tài nguyên Booking/Trip thuộc Customer đã được gán; gọi GET /drivers/{driverId} bằng Customer bị 403.

Khi nhận `booking.driver-assigned`, Trip được tạo bất đồng bộ. Khi Trip hoàn thành, Payment tạo Fare; phản hồi hoàn thành Trip không xác nhận Fare đã sẵn sàng. Khi Payment COMPLETED, Trip nhận paymentStatus=COMPLETED, paymentId, paidAt qua Kafka. Đọc lại projection đến khi điều kiện này xuất hiện; status vòng đời Trip vẫn COMPLETED.

Hủy Customer chỉ trước PICKED_UP. Rating chỉ cần Trip COMPLETED, score 1–5 và comment không rỗng. Mỗi Trip một Rating. Lỗi quyền trả 403, không tồn tại trả 404, version sai trả 409.
