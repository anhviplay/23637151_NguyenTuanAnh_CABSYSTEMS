
# API Driver

**Baseline:** SRS v2.2  
**API Specification:** v2.0 — cập nhật hợp đồng đồng bộ nội bộ

Tất cả operation đi qua API Gateway.

Trừ đăng ký, đăng nhập và khôi phục mật khẩu, actor phải có vai trò `DRIVER`. Driver chỉ được thao tác hồ sơ, phương tiện, Assignment và Trip thuộc mình.

Mọi command phải được service sở hữu dữ liệu kiểm tra quyền, điều kiện nghiệp vụ và trạng thái hiện hành.

## DRV-01 Đăng ký Driver

- **Operation:** `POST /api/v1/auth/driver/registrations`
- **Truy xuất:** FR-05; UC-05; AC-03
- **Body:** thông tin tài khoản, hồ sơ Driver, giấy phép và thông tin phương tiện bắt buộc
- **Kết quả:** `201` với `driverId`, trạng thái `PENDING_VERIFICATION`

Hồ sơ do `driver-service` sở hữu. Sự kiện `driver.profile-submitted` được phát để `operations-service` cập nhật dữ liệu xét duyệt.

## DRV-02 Đăng nhập và khôi phục mật khẩu

- **Operations:** `POST /api/v1/auth/sessions`, `POST /api/v1/auth/password-recovery/otp`, `POST /api/v1/auth/password-recovery/confirm`
- **Truy xuất:** FR-02, FR-03; UC-02, UC-03; AC-01
- **Quy tắc:** `actorType=DRIVER`; response và lỗi theo [common.md](common.md)

## DRV-03 Cập nhật hồ sơ Driver

- **Operation:** `PATCH /api/v1/drivers/me/profile`
- **Truy xuất:** FR-08; UC-07; AC-05
- **Body:** các trường hồ sơ được phép cập nhật và `version`
- **Kết quả:** `200` với hồ sơ và version mới
- **Quy tắc:** trường cần xác minh có thể đưa hồ sơ về `PENDING_VERIFICATION`

## DRV-04 Cập nhật phương tiện

- **Operation:** `PUT /api/v1/drivers/me/vehicles/{vehicleId}`
- **Truy xuất:** FR-08; UC-08; AC-05
- **Body:** biển số, loại phương tiện, service type và dữ liệu xác minh cần thiết
- **Kết quả:** `200` với Vehicle và version mới

## DRV-05 Cập nhật trạng thái làm việc

- **Operation:** `PATCH /api/v1/drivers/me/availability`
- **Truy xuất:** FR-09; UC-09; AC-05
- **Body:** `availability` nhận `OFFLINE` hoặc `AVAILABLE`, `expectedVersion`
- **Lỗi chính:** `ACTIVE_TRIP_EXISTS`, `DRIVER_NOT_ACTIVE`, `VERSION_CONFLICT`

Quy tắc:
- Driver chỉ được chuyển sang `AVAILABLE` khi đủ điều kiện.
- Khi một Assignment được công nhận, `driver-service` nhận `booking.driver-assigned` để cập nhật Driver sang `BUSY`.
- Khi Trip hoàn thành, `driver-service` nhận `trip.completed` để khôi phục `AVAILABLE` nếu Driver vẫn làm việc và không có Trip khác.
- Khi Booking hoặc Trip hủy hợp lệ, Driver được giải phóng qua `booking.cancelled` hoặc `trip.status-changed`.
- Event lặp hoặc cũ không được làm Driver chuyển sai trạng thái.

## DRV-06 Gửi vị trí

- **Operation:** `POST /api/v1/drivers/me/locations`
- **Truy xuất:** FR-23, FR-24; UC-13; AC-14
- **Header:** `Idempotency-Key`
- **Body:** `latitude`, `longitude`, `observedAt`, `sequence`
- **Kết quả:** `201` với `locationId`, `receivedAt`, `acceptedForDispatch`
- **Quy tắc:** CAB System lưu vị trí; việc dùng cho Nearby/ETA phụ thuộc ngưỡng độ mới trong cấu hình

## DRV-07 Xem Assignment hiện hành

- **Operation:** `GET /api/v1/drivers/me/assignments/current`
- **Truy xuất:** FR-14, FR-44; UC-11; AC-09, AC-24
- **Kết quả:** Assignment đang `OFFERED`, điểm đón, loại dịch vụ và hạn phản hồi theo cấu hình

## DRV-08 Phản hồi Assignment

- **Operation:** `POST /api/v1/assignments/{assignmentId}/responses`
- **Truy xuất:** FR-15, FR-16, FR-17; UC-11; AC-09, AC-10
- **Header:** `Idempotency-Key`
- **Body:** `decision` nhận `ACCEPTED` hoặc `REJECTED`, `reasonCode` khi từ chối
- **Kết quả:** `200` với kết quả được `booking-service` công nhận
- **Lỗi chính:** Assignment hết hạn, phản hồi không hợp lệ hoặc Booking đã được gán

### Khi ACCEPTED

- `booking-service` kiểm tra Assignment và xử lý cạnh tranh.
- Chỉ phản hồi Accepted hợp lệ đầu tiên được công nhận.
- Booking có thể chuyển sang `DRIVER_ASSIGNED`.
- `booking.driver-assigned` được phát qua Kafka.
- `trip-service` tạo Trip bất đồng bộ từ event.
- `driver-service` cập nhật trạng thái Driver từ event.
- `tripId` chỉ được trả khi Trip đã thực sự được tạo và thông tin đã khả dụng.

Phản hồi `200` xác nhận quyết định Assignment được ghi nhận; không bảo đảm mọi consumer Kafka đã xử lý xong.

### Khi REJECTED

- Assignment chuyển `REJECTED`.
- Booking tiếp tục tìm Driver phù hợp khác.
- Driver trở lại hoặc duy trì `AVAILABLE` khi đủ điều kiện.
- Không tạo Trip từ Assignment bị từ chối.

## DRV-09 Cập nhật trạng thái Trip

- **Operation:** `POST /api/v1/trips/{tripId}/status-transitions`
- **Truy xuất:** FR-25, FR-26, FR-27, FR-28; UC-13; AC-15
- **Header:** `Idempotency-Key`
- **Body:** `targetStatus`, `occurredAt`, `expectedVersion`
- **Trạng thái cho phép:** `DRIVER_ARRIVED`, `PICKED_UP`, `IN_PROGRESS`, `COMPLETED`
- **Lỗi chính:** `TRIP_INVALID_TRANSITION`, `TRIP_NOT_ASSIGNED_TO_DRIVER`, `VERSION_CONFLICT`

### Khi cập nhật thành công

- `trip-service` xác nhận trạng thái và thời điểm.
- Phát `trip.status-changed` cho các consumer liên quan.
- Trạng thái trả về là trạng thái đã được `trip-service` ghi nhận.

### Khi COMPLETED

- `trip-service` phát `trip.completed` qua Kafka.
- `booking-service` cập nhật Booking sang `COMPLETED`.
- `driver-service` cập nhật Availability theo điều kiện.
- `payment-service` xác định Fare đúng một lần.

Phản hồi Trip `COMPLETED` không đồng nghĩa Fare đã được tính xong hoặc Payment đã `PAID`.

## DRV-10 Yêu cầu hủy trước Picked Up

- **Operation:** `POST /api/v1/trips/{tripId}/driver-cancellation`
- **Truy xuất:** FR-30; UC-14; AC-16
- **Body:** `reasonCode`, `reasonText`, `expectedVersion`
- **Kết quả:** `200` khi `trip-service` đã công nhận hủy và ghi trạng thái Trip `CANCELLED`
- **Lỗi chính:** `CANCELLATION_NOT_ALLOWED`, `TRIP_INVALID_STATE`, `VERSION_CONFLICT`

### Đồng bộ liên service

1. `trip-service` kiểm tra Trip thuộc Driver và còn trước `PICKED_UP`.
2. Khi hủy hợp lệ, Trip được chuyển `CANCELLED`.
3. `trip-service` phát `trip.status-changed` với `currentStatus=CANCELLED`.
4. `booking-service` cập nhật Booking tương ứng sang `CANCELLED`.
5. `driver-service` cập nhật Availability theo điều kiện.
6. `notification-service` gửi thông báo cho Customer.

Phản hồi API xác nhận Trip đã hủy tại service sở hữu. Booking và Driver Availability được đồng bộ bất đồng bộ, không được mô tả là cập nhật nguyên tử cùng Trip.

Nếu Trip đã `PICKED_UP` hoặc không còn cho phép hủy thông thường, request bị từ chối và không phát event hủy thành công.

## DRV-11 Xác nhận đã thu tiền mặt

- **Operation:** `POST /api/v1/payments/{paymentId}/cash-confirmation`
- **Truy xuất:** FR-42; UC-15; AC-23
- **Header:** `Idempotency-Key`
- **Điều kiện:** Payment dùng `CASH` và Trip thuộc Driver
- **Kết quả:** `200` với Payment `PAID`

`payment-service` là chủ sở hữu trạng thái Payment. Khi Payment thay đổi, service phát `payment.status-changed` tới consumer liên quan.

## Quy tắc nhất quán chung

- Driver chỉ được thay đổi Trip/Assignment thuộc mình.
- Không có Trip trùng từ một Booking.
- Gửi lặp command với cùng `Idempotency-Key` không tạo hiệu ứng mới.
- Assignment Accepted, Trip Created và Trip Completed là những mốc riêng.
- API không được trả trạng thái downstream như thể Kafka đã xử lý xong khi điều đó chưa xảy ra.
- Event đồng bộ trạng thái sử dụng contract tại [internal-contracts.md](internal-contracts.md).
