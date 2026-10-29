# Hợp đồng IPC và dữ liệu

Booking gọi Driver.CheckDriverEligibility và Location.FindNearbyDrivers/EstimateETA qua gRPC. Proto dùng package cab, Query.json và Result.json chứa JSON; X-Internal-Key được kiểm tra trên server. gRPC chỉ truy vấn, không tạo Trip hoặc ghi DB khác. Kết nối gRPC nằm trong backend Docker nội bộ; REST công khai dùng HTTPS.

## Payload gRPC

CheckDriverEligibility nhận driverId, serviceType, bookingId; trả eligible, availability, vehicleId, reasonCode và driverInfo khi đủ điều kiện. driverInfo nội bộ gồm driverId, fullName, vehicle với vehicleId, serviceType, plateCipher. Biển số giữ dạng mã hóa trong event và DB; REST Booking/Trip giải mã thành plateNumber sau khi kiểm tra quyền sở hữu.
FindNearbyDrivers nhận pickup(latitude,longitude), serviceType, radiusMeters; trả drivers với driverId, distanceMeters, observedAt. Driver owner kiểm tra eligibility riêng.
EstimateETA nhận driverId và pickup; trả etaSeconds, distanceMeters, calculatedAt; ETA tính từ khoảng cách địa lý và tốc độ cấu hình.

## Event envelope

eventId, eventType, eventVersion, occurredAt, producer, aggregateId, aggregateVersion, correlationId, payload. Gửi qua Outbox; eventId được ghi Inbox cùng transaction xử lý. Không cam kết mọi service đã cập nhật ngay khi API nguồn trả thành công.

## Topic nghiệp vụ

- `identity.account-created`
- `driver.profile-submitted`
- `driver.verification-changed`
- `driver.availability-changed`
- `booking.created`
- `assignment.offered`
- `assignment.responded`
- `booking.driver-assigned`
- `booking.no-driver-available`
- `booking.cancelled`
- `trip.status-changed`
- `trip.completed`
- `payment.status-changed`
- `rating.submitted`

## Consumer theo source

```javascript
{
 'identity-service':[],
 'customer-service':['identity.account-created','trip.completed'],
 'driver-service':['identity.account-created','booking.driver-assigned','trip.completed','booking.cancelled','trip.status-changed'],
 'location-service':[],
 'booking-service':['driver.availability-changed','trip.status-changed','trip.completed'],
 'trip-service':['booking.driver-assigned','booking.cancelled','payment.status-changed'],
 'payment-service':['trip.completed'],
 'notification-service':['driver.verification-changed','booking.created','assignment.offered','booking.driver-assigned','booking.no-driver-available','booking.cancelled','trip.status-changed','payment.status-changed'],
 'operations-service':topics
}
```

operations-service nhận cả 14 topic và lưu audit/read model; audit không phải topic thứ 15. trip-service nhận payment.status-changed, cập nhật paymentStatus/paymentId/paidAt, dùng paymentVersion riêng và không thay version vòng đời Trip.

## Kho dữ liệu

| Service | Trách nhiệm | Kho dữ liệu | Loại bản ghi nghiệp vụ |
| --- | --- | --- | --- |
| identity-service | Tài khoản, OTP đăng ký, phiên và JWT | identity_db (PostgreSQL) | account, phone, otp, otp_delivery, used_proof, session |
| customer-service | Hồ sơ Customer, Rating và điểm tổng hợp Driver | customer_db (PostgreSQL) | customer, completed_trip, rating |
| driver-service | Hồ sơ, xe, xét duyệt và availability | driver_db (PostgreSQL) | driver, closed_booking |
| location-service | Vị trí, nearby và ETA | location_db (MongoDB + Redis GEO) | current, history |
| booking-service | Booking, tìm tài xế, Assignment và reservation | booking_db (PostgreSQL) | booking, assignment, reservation |
| trip-service | Vòng đời Trip và ghi nhận thanh toán | trip_db (PostgreSQL) | trip, cancelled_booking |
| payment-service | Đơn giá, Fare, Payment và callback | payment_db (PostgreSQL) | service_rate, fare, payment, callback |
| notification-service | Hộp thông báo in-app của từng actor | notification_db (MongoDB) | notification |
| operations-service | Read model vận hành và audit sự kiện | operations_db (PostgreSQL) | driver, booking, trip, payment, audit |

- API máy chủ công khai là `https://localhost:8443`; chỉ Gateway có host port. Service HTTP nội bộ dùng cổng 3000; Driver/Location cung cấp gRPC 50051 trên mạng backend nội bộ.
- PostgreSQL có 7 database với user riêng; MongoDB replica set có location_db và notification_db với user riêng. Không JOIN hoặc truy cập database của service khác.
- Trong PostgreSQL, dữ liệu nghiệp vụ nằm ở `records(kind,id,body JSONB)`; trong MongoDB dùng collection `records` với `kind` và `body`. `outbox` và `inbox` lưu sự kiện gửi/chống lặp. Sơ đồ entity là mô hình logic, không phải danh sách bảng SQL riêng cho từng entity.
- Redis Location lưu chỉ mục GEO theo Driver; MongoDB lưu vị trí và lịch sử. Redis Gateway lưu bộ đếm giới hạn request, tách credential khỏi Redis Location.
- Kafka có 14 topic nghiệp vụ. Outbox cùng transaction với thay đổi nguồn; Inbox chống xử lý lại cùng eventId. Các consumer cần thứ tự dùng version của projection tương ứng.
- 16 dịch vụ chạy lâu dài gồm Gateway, 9 service, PostgreSQL, MongoDB, 2 Redis, Kafka và payment-sandbox. Bốn init job gồm mongo-keyfile, mongo-init, kafka-storage-init và kafka-init.
- Mọi API nghiệp vụ từ Postman đi qua Gateway. Callback sandbox cũng gọi Gateway; gRPC và Kafka là giao tiếp nội bộ.
