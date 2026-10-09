
# Hợp đồng nội bộ giữa các microservice

**Baseline:** SRS v2.2  
**Kiến trúc:** Microservice Design — 9 bounded context / 9 microservice  
**Phạm vi:** CAB Core Ride-Hailing MVP

## 1. Nguyên tắc

- Client giao tiếp với API Gateway qua REST/HTTPS/JSON.
- gRPC dùng cho truy vấn nội bộ cần kết quả tức thời theo kiến trúc đã duyệt.
- Kafka truyền domain event và xử lý bất đồng bộ.
- Mỗi service chỉ ghi dữ liệu do chính service đó sở hữu.
- Không truy cập trực tiếp hoặc JOIN database của service khác.
- Producer ghi thay đổi nghiệp vụ và OutboxEvent trong cùng transaction.
- Consumer xử lý nghiệp vụ và Inbox/Dedup trong cùng transaction khi kho dữ liệu hỗ trợ.
- Consumer kiểm tra `eventId` và `aggregateVersion` để chống xử lý lặp, ghi đè trạng thái mới hoặc xử lý sai thứ tự.
- Mọi giao tiếp liên service mang `correlationId`.
- Event được phát sau khi giao dịch nguồn được xác nhận; việc các consumer cập nhật xong là bất đồng bộ.
- Không tự bổ sung business rule, timeout hoặc retry cố định ngoài SRS và cấu hình đã duyệt.

## 2. Hợp đồng gRPC

### INT-GRPC-01 CheckDriverEligibility

- **Caller:** `booking-service`
- **Owner:** `driver-service`
- **Input:** `driverId`, `serviceType`, `bookingId`
- **Output:** `eligible`, `availability`, `vehicleId`, `reasonCode`
- **Truy xuất:** FR-12; AC-07

Dữ liệu trả về phản ánh điều kiện tại thời điểm truy vấn. Quyết định công nhận Assignment vẫn do `booking-service` kiểm soát, kể cả khi có phản hồi đồng thời.

### INT-GRPC-02 FindNearbyDrivers

- **Caller:** `booking-service`
- **Owner:** `location-service`
- **Input:** Điểm đón, loại dịch vụ và tiêu chí tìm từ cấu hình
- **Output:** Danh sách `driverId`, khoảng cách, thời điểm vị trí được nhận
- **Truy xuất:** FR-12, FR-23, FR-24; AC-07, AC-14

### INT-GRPC-03 EstimateETA

- **Caller:** `booking-service`
- **Owner:** `location-service`
- **Input:** Vị trí Driver và điểm đón
- **Output:** `etaSeconds`, `distanceMeters`, `calculatedAt`
- **Truy xuất:** FR-13, FR-20; AC-08, AC-12

Các hợp đồng trên là truy vấn đồng bộ. Không sử dụng gRPC để tạo Trip, tính Fare hoặc cập nhật database của service khác.

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

### Quy tắc envelope

- `eventId`: định danh duy nhất của sự kiện.
- `eventType`: tên sự kiện nghiệp vụ.
- `eventVersion`: phiên bản schema của sự kiện.
- `aggregateId`: ID aggregate nguồn.
- `aggregateVersion`: phiên bản aggregate sau thay đổi.
- `correlationId`: liên kết giao dịch xuyên service.
- `payload`: dữ liệu nghiệp vụ cần thiết cho consumer.

Các trường tham chiếu đến service khác là logical reference, không phải foreign key xuyên database.

## 4. Danh mục domain event

| Event | Producer | Consumer | Mục đích |
| --- | --- | --- | --- |
| `identity.account-created` | identity-service | customer-service, driver-service | Liên kết hồ sơ theo loại tài khoản. |
| `driver.profile-submitted` | driver-service | operations-service | Đưa hồ sơ Driver vào quy trình xét duyệt. |
| `driver.verification-changed` | driver-service | notification-service, operations-service | Thông báo kết quả xét duyệt. |
| `driver.availability-changed` | driver-service | booking-service | Cập nhật khả năng tham gia Dispatch. |
| `booking.created` | booking-service | notification-service, operations-service | Xác nhận tiếp nhận và phục vụ thống kê. |
| `assignment.offered` | booking-service | notification-service | Gửi Assignment cho Driver. |
| `assignment.responded` | booking-service | operations-service | Ghi nhận Accepted, Rejected hoặc No Response. |
| `booking.driver-assigned` | booking-service | trip-service, driver-service, notification-service | Tạo Trip; chuyển Driver khỏi Available; thông báo hai phía. |
| `booking.no-driver-available` | booking-service | notification-service, operations-service | Kết thúc tìm Driver và thông báo Customer. |
| `booking.cancelled` | booking-service | trip-service, driver-service, notification-service | Đồng bộ hủy từ Booking và giải phóng Driver khi đủ điều kiện. |
| `trip.status-changed` | trip-service | booking-service, driver-service, notification-service, operations-service | Đồng bộ vòng đời Trip, bao gồm khi Trip được tạo và khi Trip bị hủy. |
| `trip.completed` | trip-service | booking-service, driver-service, payment-service, customer-service, operations-service | Hoàn tất Booking, cập nhật Driver, tính Fare, mở quyền Rating và báo cáo. |
| `payment.status-changed` | payment-service | notification-service, operations-service | Thông báo Payment và cập nhật doanh thu. |
| `rating.submitted` | customer-service | operations-service | Cập nhật chỉ số Driver. |

`audit.recorded` trong Microservice Design là sự kiện nội bộ phục vụ lưu vết của `operations-service` tới kho audit do chính service này sở hữu. Không mặc định biến nó thành một topic Kafka liên service.

## 5. Hợp đồng sự kiện ảnh hưởng trạng thái liên service

### INT-EVT-01 booking.driver-assigned

**Producer:** `booking-service`

**Consumer:** `trip-service`, `driver-service`, `notification-service`

**Payload tối thiểu:**
- `bookingId`
- `assignmentId`
- `customerId`
- `driverId`
- `vehicleId`
- `serviceType`
- `pickup`
- `destination`
- `acceptedAt`

**Xử lý:**
1. `booking-service` công nhận duy nhất một Assignment Accepted.
2. Giao dịch Booking và OutboxEvent được commit.
3. `trip-service` tạo tối đa một Trip cho Booking.
4. `driver-service` cập nhật Driver sang `BUSY` nếu event hợp lệ và chưa được xử lý.
5. `notification-service` xử lý thông báo theo mốc được yêu cầu.

**Nhất quán:**
- Trip được tạo bất đồng bộ, không phải ngay khi API chấp nhận Assignment.
- Booking có thể ở `DRIVER_ASSIGNED` trước khi `tripId` xuất hiện.
- `booking-service` phải bảo vệ tính duy nhất của Assignment được công nhận, kể cả trong thời gian consumer chưa đồng bộ.
- Event lặp không tạo Trip mới hoặc cập nhật Driver sai.

**Truy xuất:** FR-15, FR-17, FR-20, FR-22; AC-09, AC-10, AC-12, AC-13.

### INT-EVT-02 trip.status-changed

**Producer:** `trip-service`

**Consumer:** `booking-service`, `driver-service`, `notification-service`, `operations-service`

**Payload tối thiểu:**
- `tripId`
- `bookingId`
- `driverId`
- `previousStatus` (có thể null khi tạo Trip)
- `currentStatus`
- `occurredAt`
- `reasonCode` (khi áp dụng)

**Xử lý:**
- Khi Trip được tạo ở `CREATED`, `booking-service` có thể cập nhật Booking sang `TRIP_CREATED` và liên kết `tripId`.
- Các mốc `DRIVER_ARRIVED`, `PICKED_UP`, `IN_PROGRESS` được phản ánh cho consumer cần thiết.
- Nếu Trip bị hủy hợp lệ, `booking-service` đồng bộ Booking sang `CANCELLED`.
- `driver-service` giải phóng Driver sau khi hủy hợp lệ, nếu Driver vẫn làm việc và không có Trip khác.
- `notification-service` và `operations-service` cập nhật thông báo/read model tương ứng.

**Nhất quán:**
- Trạng thái do `trip-service` sở hữu là nguồn sự thật của Trip.
- Consumer không được dùng event cũ để lùi trạng thái.
- Event `COMPLETED` không được làm phát sinh tính Fare nhiều lần; việc tính Fare sử dụng `trip.completed`.

**Truy xuất:** FR-20, FR-21, FR-25–FR-32; AC-12, AC-15–AC-18.

### INT-EVT-03 trip.completed

**Producer:** `trip-service`

**Consumer:** `booking-service`, `driver-service`, `payment-service`, `customer-service`, `operations-service`

**Payload tối thiểu:**
- `tripId`
- `bookingId`
- `customerId`
- `driverId`
- `serviceType`
- `distanceKm`
- `completedAt`

`distanceKm` là thông tin quãng đường của Trip phục vụ xác định quãng đường tính cước theo SRS; event không tự đặt đơn giá hoặc tính Fare.

**Xử lý:**
- `booking-service` cập nhật Booking sang `COMPLETED`.
- `driver-service` đưa Driver về `AVAILABLE` khi Driver còn làm việc và không có Trip khác; nếu không, giữ trạng thái phù hợp.
- `payment-service` xác định Fare đúng một lần từ Trip hoàn thành.
- `customer-service` ghi nhận quyền đánh giá Trip Completed theo dữ liệu nhận được.
- `operations-service` cập nhật báo cáo theo dữ liệu sự kiện.

**Nhất quán:**
- Trip Completed không đồng nghĩa Payment đã Paid.
- Booking Completed phản ánh kết thúc chuyến đi, không phải kết quả thanh toán.
- Consumer xử lý event lặp an toàn.
- Fare của cùng Trip không được tạo lặp.

**Truy xuất:** FR-20, FR-28, FR-33–FR-35, FR-47, FR-54–FR-58; AC-12, AC-15, AC-19, AC-27, AC-30.

### INT-EVT-04 booking.cancelled

**Producer:** `booking-service`

**Consumer:** `trip-service`, `driver-service`, `notification-service`

**Payload tối thiểu:**
- `bookingId`
- `tripId` (nếu đã có Trip)
- `driverId` (nếu đã gán)
- `cancelledBy`
- `reasonCode`
- `cancelledAt`

**Xử lý:**
- Đây là event hủy được công nhận từ Booking theo điều kiện nghiệp vụ.
- `trip-service` đồng bộ hủy nếu Trip hiện hành còn cho phép.
- `driver-service` giải phóng Driver nếu không còn Trip và vẫn làm việc.
- `notification-service` thông báo bên còn lại.

**Nhất quán:**
- Event hủy không được ghi đè Trip đã vượt qua giới hạn hủy thông thường.
- Nếu consumer phát hiện xung đột trạng thái, giữ invariant của service owner, ghi nhận lỗi đồng bộ để xử lý; không ép dữ liệu về trạng thái sai.
- Không thực hiện hủy lặp do nhận event nhiều lần.

**Truy xuất:** FR-22, FR-29–FR-31; AC-13, AC-16, AC-17.

## 6. Hai chiều khởi phát hủy

### 6.1. Customer hủy từ Booking

1. Customer gọi REST cancellation qua Gateway.
2. `booking-service` xử lý yêu cầu theo quyền và trạng thái hợp lệ.
3. Khi hủy được công nhận, `booking-service` phát `booking.cancelled`.
4. `trip-service`, `driver-service` và `notification-service` xử lý event theo quyền sở hữu.

### 6.2. Driver hủy từ Trip

1. Driver gọi REST cancellation qua Gateway.
2. `trip-service` kiểm tra quyền, trạng thái và giới hạn hủy.
3. Khi hủy hợp lệ, Trip chuyển `CANCELLED`.
4. `trip-service` phát `trip.status-changed` với `currentStatus=CANCELLED`.
5. `booking-service` cập nhật Booking; `driver-service` cập nhật Availability; các consumer còn lại đồng bộ theo event.

Không phát `booking.cancelled` như một thao tác hủy thứ hai khi Booking chỉ đang đồng bộ kết quả từ Trip. Điều này tránh tạo vòng lặp event.

## 7. Cơ chế nhất quán và xử lý lỗi

### 7.1. Transactional Outbox

Producer phải ghi thay đổi nghiệp vụ và OutboxEvent cùng transaction. Không công bố event trước khi commit dữ liệu nguồn.

### 7.2. Inbox và xử lý lặp

- Consumer kiểm tra `eventId` trước khi áp dụng thay đổi.
- Event đã xử lý không được gây hiệu ứng nghiệp vụ lần hai.
- Cập nhật dữ liệu và ghi nhận event đã xử lý cần bảo đảm tính nguyên tử phù hợp với kho dữ liệu sử dụng.

### 7.3. Thứ tự và version

- Event mang `aggregateId`, `aggregateVersion`.
- Consumer không áp dụng bản cũ đè bản mới.
- Sự kiện đến sai thứ tự phải được trì hoãn/xử lý phục hồi theo chính sách kỹ thuật, không được tự ý chuyển trạng thái sai.

### 7.4. Lỗi service phụ thuộc

- Payment hoặc Notification lỗi không rollback Booking hay Trip.
- Consumer không khả dụng phải có cơ chế tiếp tục xử lý event khi khôi phục.
- Retry dùng cấu hình, không cố định số lần trong tài liệu này.
- Sự kiện không thể áp dụng vì xung đột nghiệp vụ phải được ghi nhận để đối soát, không bỏ qua âm thầm.

### 7.5. Trạng thái trong thời gian đồng bộ

- Assignment Accepted có thể xảy ra trước khi Trip được tạo.
- Trip Completed có thể xảy ra trước khi Booking projection hoặc Fare được cập nhật.
- Driver Availability có thể cần thời gian đồng bộ từ event.
- API chỉ được trả các trạng thái đã biết, không tự khẳng định toàn bộ consumer hoàn tất.

## 8. Giới hạn hợp đồng

Tài liệu này làm rõ đồng bộ liên service từ thiết kế hiện có, không tạo thêm bounded context, microservice, business state hoặc chính sách nghiệp vụ mới.

Điều kiện chống hủy đua tranh giữa Booking và Trip phải tiếp tục được kiểm chứng bằng integration test, đặc biệt khi event đến trễ. Không coi eventual consistency là lý do cho phép vi phạm quy tắc hủy trước `PICKED_UP`.
