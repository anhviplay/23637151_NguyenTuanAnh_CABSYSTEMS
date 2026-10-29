# API Driver

Mọi path dưới đây có tiền tố `/api/v1`. Dùng quy ước trong [common.md](common.md).

| Method | Path | Actor hoặc permission | Dữ liệu | Kết quả |
| --- | --- | --- | --- | --- |
| POST | /auth/driver/registration-otp | PUBLIC | phoneNumber | 202; tạo OTP |
| POST | /auth/driver/registration-otp/verify | PUBLIC | phoneNumber, otp | 200; otpVerificationToken dùng một lần |
| POST | /auth/driver/registrations | PUBLIC | phoneNumber, password, otpVerificationToken, fullName, licenseNumber, vehicle | 201; driverId, PENDING_VERIFICATION |
| POST | /auth/sessions | PUBLIC | phoneNumber, password, actorType=DRIVER | 200; token và actorId |
| GET | /drivers/{driverId} | DRIVER/OPERATIONS | Driver xem chính mình; Operations cần driver:read | 200; verificationStatus, availability, vehicleIds, version |
| PATCH | /drivers/me/availability | DRIVER | availability=AVAILABLE/OFFLINE, expectedVersion | 200; trạng thái và version mới |
| POST | /drivers/me/locations | DRIVER | latitude, longitude, observedAt, sequence | 201; locationId, receivedAt, acceptedForDispatch |
| GET | /drivers/me/assignments/current | DRIVER | token của Driver | 200; offer còn hạn hoặc data=null |
| POST | /assignments/{assignmentId}/responses | DRIVER | decision=ACCEPTED/REJECTED | 200; quyết định được ghi; Trip tạo qua Kafka khi ACCEPTED |
| GET | /trips/{tripId} | DRIVER | Trip được gán cho Driver | 200; Trip |
| POST | /trips/{tripId}/status-transitions | DRIVER | targetStatus, occurredAt, expectedVersion; COMPLETED có distanceKm | 200; chuyển đúng thứ tự; sai thứ tự trả 409 |
| POST | /trips/{tripId}/driver-cancellation | DRIVER | reasonCode, expectedVersion | 200; CANCELED trước PICKED_UP; sau đó 422 |
| POST | /payments/{paymentId}/cash-confirmation | DRIVER | Payment CASH, PENDING của Trip được gán | 200; Payment COMPLETED, Trip cập nhật qua Kafka |

## Dữ liệu đăng ký và vòng đời

vehicle gồm plateNumber và serviceType. License và biển số trong hồ sơ gốc được mã hóa. OTP proof chỉ dùng một lần cho đúng số điện thoại.

CREATED → DRIVER_ARRIVED → PICKED_UP → IN_PROGRESS → COMPLETED. distanceKm là quãng đường thực tế không âm. sequence vị trí phải tăng; observedAt là ISO 8601. Chuyển availability cần ACTIVE, không có chuyến đang chạy. BUSY do sự kiện gán chuyến quản lý.

Assignment có thời hạn theo ASSIGNMENT_RESPONSE_SECONDS; quyết định đầu tiên còn hợp lệ được ghi nhận. Driver chỉ đọc/trả lời offer của mình. Việc tạo Trip và giải phóng Driver sau hủy/hoàn thành là xử lý Kafka.
