
# API Customer

**Baseline:** SRS v2.2  
**API Specification:** v2.0 — cập nhật hợp đồng đồng bộ nội bộ

Tất cả operation đi qua API Gateway.

Trừ đăng ký, đăng nhập và khôi phục mật khẩu, actor phải có vai trò `CUSTOMER` và chỉ được truy cập dữ liệu của mình.

API công khai trả kết quả được xác nhận bởi service sở hữu dữ liệu. Những thay đổi được truyền qua Kafka có thể chưa xuất hiện đồng thời ở mọi service.

## CUS-01 Đăng ký Customer

- **Operation:** `POST /api/v1/auth/customer/registrations`
- **Truy xuất:** FR-01; UC-01; AC-01
- **Body:** `phoneNumber`, `password`, `otp`
- **Kết quả:** `201` với `customerId`, `accountId`, `status`
- **Lỗi chính:** `PHONE_ALREADY_EXISTS`, `OTP_INVALID`, `VALIDATION_ERROR`

## CUS-02 Đăng nhập

- **Operation:** `POST /api/v1/auth/sessions`
- **Truy xuất:** FR-02; UC-02; AC-01
- **Body:** `phoneNumber`, `password`, `actorType=CUSTOMER`
- **Kết quả:** `200` với access token, refresh token và thời điểm hết hạn
- **Lỗi chính:** `INVALID_CREDENTIALS`, `ACCOUNT_DISABLED`

## CUS-03 Yêu cầu OTP khôi phục mật khẩu

- **Operation:** `POST /api/v1/auth/password-recovery/otp`
- **Truy xuất:** FR-03; UC-03; AC-01
- **Body:** `phoneNumber`, `actorType=CUSTOMER`
- **Kết quả:** `202`; không tiết lộ tài khoản có tồn tại hay không

## CUS-04 Xác nhận mật khẩu mới

- **Operation:** `POST /api/v1/auth/password-recovery/confirm`
- **Truy xuất:** FR-03; UC-03; AC-01
- **Body:** `phoneNumber`, `otp`, `newPassword`
- **Kết quả:** `204`
- **Lỗi chính:** `OTP_INVALID`, `OTP_EXPIRED`, `PASSWORD_POLICY_VIOLATION`

## CUS-05 Cập nhật hồ sơ Customer

- **Operation:** `PATCH /api/v1/customers/me`
- **Truy xuất:** FR-04; UC-04; AC-02
- **Body:** các trường hồ sơ được phép cập nhật và `version`
- **Kết quả:** `200` với hồ sơ và version mới

## CUS-06 Tạo Booking

- **Operation:** `POST /api/v1/bookings`
- **Truy xuất:** FR-10, FR-11; UC-10; AC-06
- **Header:** `Idempotency-Key`
- **Body:** `pickup`, `destination`, `serviceType`
- **Kết quả:** `201` với `bookingId`, trạng thái `SEARCHING`, thời điểm tạo

```json
{
  "pickup": {
    "address": "Điểm đón",
    "location": {
      "latitude": 10.77,
      "longitude": 106.70
    }
  },
  "destination": {
    "address": "Điểm đến",
    "location": {
      "latitude": 10.79,
      "longitude": 106.68
    }
  },
  "serviceType": "BIKE"
}
```

## CUS-07 Theo dõi Booking

- **Operation:** `GET /api/v1/bookings/{bookingId}`
- **Truy xuất:** FR-19, FR-20; UC-11, UC-12; AC-11, AC-12
- **Kết quả:** trạng thái Booking, Driver được gán nếu có, ETA và `tripId` nếu Trip đã tạo

### Quy tắc trạng thái

- `SEARCHING`: Booking đang tìm Driver.
- `DRIVER_ASSIGNED`: Assignment Accepted đã được công nhận; Trip có thể đang được tạo bất đồng bộ.
- `TRIP_CREATED`: `trip-service` đã tạo Trip và Booking đã nhận dữ liệu đồng bộ.
- `COMPLETED`: Trip hoàn thành và Booking đã đồng bộ sự kiện hoàn thành.
- `CANCELLED`: Booking đã hủy hợp lệ.
- `NO_DRIVER_AVAILABLE`: quy trình tìm Driver kết thúc mà không có Driver phù hợp.

`tripId` chỉ xuất hiện sau khi Trip đã thực sự được tạo và dữ liệu liên kết đã sẵn sàng.

API không được trả một `tripId` giả ngay khi Assignment mới được công nhận.

## CUS-08 Hủy Booking hoặc Trip trước Picked Up

- **Operation:** `POST /api/v1/bookings/{bookingId}/cancellations`
- **Truy xuất:** FR-29; UC-14; AC-16
- **Header:** `Idempotency-Key`
- **Body:** `reasonCode`, `reasonText`, `expectedVersion`
- **Kết quả:** `200` khi Booking được hủy hợp lệ tại `booking-service`
- **Lỗi chính:** `CANCELLATION_NOT_ALLOWED`, `VERSION_CONFLICT`

### Điều kiện

- Customer phải sở hữu Booking.
- Hủy thông thường chỉ được phép trước `PICKED_UP`.
- Server phải từ chối thao tác trái trạng thái, kể cả khi dữ liệu hiển thị trên client chưa cập nhật.
- Yêu cầu hủy lặp không tạo hiệu ứng nghiệp vụ lặp.

### Đồng bộ liên service

Khi `booking-service` công nhận hủy:

1. Booking được cập nhật theo trạng thái hợp lệ.
2. `booking.cancelled` được ghi vào Outbox.
3. `trip-service` xử lý event nếu Trip đã tồn tại.
4. `driver-service` cập nhật Availability khi đủ điều kiện.
5. `notification-service` thông báo bên còn lại.

Kết quả `200` không khẳng định mọi service đã hoàn tất đồng bộ.

Nếu Trip đã vượt giới hạn cho phép hủy thông thường, API không được trả thành công.

## CUS-09 Theo dõi Trip

- **Operation:** `GET /api/v1/trips/{tripId}`
- **Truy xuất:** FR-21; UC-12; AC-12
- **Kết quả:** trạng thái Trip, các mốc đã ghi nhận, thông tin Driver/Vehicle và ETA hiện hành

`trip-service` sở hữu dữ liệu Trip và trạng thái vòng đời.

Khi Trip chuyển `COMPLETED`, dữ liệu Trip có thể xuất hiện trước khi Fare hoặc Booking projection được cập nhật qua Kafka.

## CUS-10 Xem lịch sử Trip

- **Operation:** `GET /api/v1/customers/me/trips`
- **Truy xuất:** FR-46; UC-16; AC-26
- **Query:** `page`, `pageSize`, `status`, `from`, `to`
- **Kết quả:** danh sách Trip thuộc Customer kèm Fare và trạng thái Payment đã khả dụng

Thông tin Fare/Payment được hiển thị theo dữ liệu hiện có của service sở hữu; không suy diễn Payment đã hoàn tất từ trạng thái Trip Completed.

## CUS-11 Xem Fare

- **Operation:** `GET /api/v1/trips/{tripId}/fare`
- **Truy xuất:** FR-33, FR-34, FR-35; UC-15; AC-19
- **Kết quả khi sẵn sàng:** `200` với `serviceType`, `billableDistanceKm`, `pricePerKm`, `totalAmount`, `currency`

### Quy tắc

- Fare bằng quãng đường tính cước nhân đơn giá/km theo loại dịch vụ.
- Chỉ `payment-service` sở hữu và ghi dữ liệu Fare.
- `trip.completed` kích hoạt quy trình tính Fare bất đồng bộ.
- Khi Fare chưa được xác định xong, API không được trả số tiền giả hoặc mặc định bằng 0 như thể đã tính thành công.
- Giao diện phải phân biệt rõ Trip đã hoàn thành với Fare đã sẵn sàng.

## CUS-12 Chọn phương thức Payment

- **Operation:** `POST /api/v1/trips/{tripId}/payments`
- **Truy xuất:** FR-36, FR-37; UC-15; AC-20, AC-21
- **Header:** `Idempotency-Key`
- **Body:** `method` nhận `CASH` hoặc `ELECTRONIC`
- **Kết quả:** `201` với `paymentId`, `method`, `status`; với điện tử có dữ liệu chuyển hướng do provider cho phép

### Điều kiện

- Fare phải được xác định trước khi lựa chọn phương thức Payment.
- Không tạo Fare mới do Customer chọn hoặc thay đổi phương thức Payment.

## CUS-13 Xem trạng thái Payment

- **Operation:** `GET /api/v1/payments/{paymentId}`
- **Truy xuất:** FR-38, FR-39; UC-15; AC-21, AC-22
- **Kết quả:** `paymentId`, `fareId`, `method`, `status`, `providerReference`, `updatedAt`

Payment có thể ở `PENDING`, `PAID` hoặc `FAILED`.

Trạng thái Trip Completed không đồng nghĩa Payment `PAID`.

## CUS-14 Thực hiện lại Payment điện tử

- **Operation:** `POST /api/v1/payments/{paymentId}/retry`
- **Truy xuất:** FR-40; UC-15; AC-22
- **Header:** `Idempotency-Key`
- **Điều kiện:** Payment hiện tại ở `FAILED`
- **Kết quả:** `202`; Payment chuyển về `PENDING` khi yêu cầu được chấp nhận

Không tạo Fare mới do thử lại thanh toán.

## CUS-15 Chuyển sang tiền mặt

- **Operation:** `PATCH /api/v1/payments/{paymentId}/method`
- **Truy xuất:** FR-41; UC-15; AC-22
- **Body:** `method=CASH`, `expectedVersion`
- **Kết quả:** `200` với Payment đã cập nhật; không tạo Fare mới

## CUS-16 Đánh giá Driver

- **Operation:** `POST /api/v1/trips/{tripId}/ratings`
- **Truy xuất:** FR-47; UC-16; AC-27
- **Header:** `Idempotency-Key`
- **Body:** `score` là số nguyên từ 1 đến 5
- **Điều kiện:** Trip `COMPLETED`, thuộc Customer, chưa có Rating
- **Kết quả:** `201` với `ratingId`, `tripId`, `driverId`, `score`

### Nhất quán liên service

- `customer-service` sở hữu Rating.
- `trip.completed` cung cấp dữ liệu cần thiết để xác định Trip đủ điều kiện Rating.
- Nếu dữ liệu hoàn thành Trip chưa được đồng bộ đến `customer-service`, API không được tạo Rating khi chưa xác minh điều kiện.
- Event lặp không mở quyền đánh giá trùng hoặc tạo Rating trùng.
- Payment `PAID` không phải điều kiện bắt buộc để Customer đánh giá Trip Completed.

## CUS-17 Xem điểm tổng hợp Driver

- **Operation:** `GET /api/v1/drivers/{driverId}/rating-summary`
- **Truy xuất:** FR-48; UC-16; AC-27
- **Kết quả:** `driverId`, `averageScore`, `ratingCount`, `updatedAt`

Dữ liệu tổng hợp được tính từ Rating hợp lệ do `customer-service` sở hữu.

## Quy tắc nhất quán chung

- Booking và Trip là hai đối tượng nghiệp vụ riêng.
- Assignment Accepted không đồng nghĩa Trip đã được tạo.
- Trip Completed không đồng nghĩa Fare đã được xác định hoặc Payment đã Paid.
- Các trạng thái liên service được đồng bộ qua event theo [internal-contracts.md](internal-contracts.md).
- Response chỉ khẳng định kết quả đã được service nguồn ghi nhận.
- Không đọc hoặc ghi trực tiếp database của service khác.
- Không trả dữ liệu chưa xác minh hoặc trạng thái suy diễn như dữ liệu đã hoàn tất.
