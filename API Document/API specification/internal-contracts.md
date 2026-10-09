# Hợp đồng nội bộ giữa các microservice

## 1. Nguyên tắc

- REST/HTTPS/JSON chỉ dành cho client qua API Gateway.
- gRPC chỉ dùng cho truy vấn nội bộ cần kết quả tức thời.
- Kafka dùng cho domain event và xử lý bất đồng bộ.
- Producer ghi dữ liệu nghiệp vụ và Outbox trong cùng transaction.
- Consumer dùng Inbox/Dedup theo `eventId` trước khi cập nhật dữ liệu.
- Không service nào truy cập trực tiếp database của service khác.

## 2. Hợp đồng gRPC

### INT-GRPC-01 CheckDriverEligibility

- **Caller:** `booking-service`
- **Owner:** `driver-service`
- **Input:** `driverId`, `serviceType`, `bookingId`
- **Output:** `eligible`, `availability`, `vehicleId`, `reasonCode`
- **Truy xuất:** FR-12; AC-07

### INT-GRPC-02 FindNearbyDrivers

- **Caller:** `booking-service`
- **Owner:** `location-service`
- **Input:** điểm đón, service type và tiêu chí tìm từ cấu hình
- **Output:** danh sách `driverId`, khoảng cách và thời điểm vị trí được nhận
- **Truy xuất:** FR-12, FR-23, FR-24; AC-07, AC-14

### INT-GRPC-03 EstimateETA

- **Caller:** `booking-service`
- **Owner:** `location-service`
- **Input:** vị trí Driver và điểm đón
- **Output:** `etaSeconds`, `distanceMeters`, `calculatedAt`
- **Truy xuất:** FR-13, FR-20; AC-08, AC-12

## 3. Event envelope

```json
{
  "eventId": "uuid",
  "eventType": "trip.completed",
  "eventVersion": 1,
  "occurredAt": "2026-10-09T20:30:00+07:00",
  "producer": "trip-service",
  "aggregateId": "uuid",
  "aggregateVersion": 5,
  "correlationId": "uuid",
  "payload": {}
}
```

## 4. Domain event

| Event | Producer | Consumer chính | Mục đích |
| --- | --- | --- | --- |
| `identity.account-created` | identity-service | customer-service, driver-service | Khởi tạo hồ sơ tương ứng. |
| `driver.verification-changed` | driver-service | notification-service, operations-service | Thông báo kết quả và cập nhật read model. |
| `driver.availability-changed` | driver-service | booking-service | Cập nhật khả năng tham gia điều phối. |
| `booking.created` | booking-service | notification-service, operations-service | Xác nhận tiếp nhận và thống kê. |
| `assignment.offered` | booking-service | notification-service | Thông báo Assignment cho Driver. |
| `assignment.responded` | booking-service | operations-service | Ghi nhận Accepted, Rejected hoặc No Response. |
| `booking.driver-assigned` | booking-service | trip-service, notification-service | Tạo Trip và thông báo hai phía. |
| `booking.no-driver-available` | booking-service | notification-service, operations-service | Kết thúc tìm Driver. |
| `booking.cancelled` | booking-service | trip-service, driver-service, notification-service | Đồng bộ hủy và giải phóng Driver. |
| `trip.status-changed` | trip-service | notification-service, operations-service | Theo dõi Trip và thông báo mốc cần thiết. |
| `trip.completed` | trip-service | payment-service, customer-service, operations-service | Tính Fare, mở quyền Rating và cập nhật báo cáo. |
| `payment.status-changed` | payment-service | notification-service, operations-service | Thông báo kết quả và cập nhật doanh thu. |
| `rating.submitted` | customer-service | operations-service | Cập nhật chỉ số Driver. |

## 5. Nhất quán và lỗi

- `booking.driver-assigned` là cách duy nhất tạo Trip; không gọi gRPC để tạo Trip.
- `trip.completed` kích hoạt tính Fare một lần.
- Callback Payment trùng hoặc muộn được đối soát trước khi cập nhật.
- Notification lỗi không đảo event nguồn.
- Command từ thiết bị sau mất mạng phải có `commandId`; service xử lý idempotent và từ chối trạng thái cũ hơn.
