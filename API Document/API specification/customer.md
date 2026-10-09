# API Customer

Tất cả operation đi qua API Gateway. Trừ đăng ký, đăng nhập và khôi phục mật khẩu, actor phải có vai trò `CUSTOMER` và chỉ được truy cập dữ liệu của mình.

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
  "pickup": {"address": "Điểm đón", "location": {"latitude": 10.77, "longitude": 106.70}},
  "destination": {"address": "Điểm đến", "location": {"latitude": 10.79, "longitude": 106.68}},
  "serviceType": "BIKE"
}
```

## CUS-07 Theo dõi Booking

- **Operation:** `GET /api/v1/bookings/{bookingId}`
- **Truy xuất:** FR-19, FR-20; UC-11, UC-12; AC-11, AC-12
- **Kết quả:** trạng thái Booking, Driver được gán nếu có, ETA và `tripId` nếu Trip đã tạo

## CUS-08 Hủy Booking hoặc Trip trước Picked Up

- **Operation:** `POST /api/v1/bookings/{bookingId}/cancellations`
- **Truy xuất:** FR-29; UC-14; AC-16
- **Header:** `Idempotency-Key`
- **Body:** `reasonCode`, `reasonText`, `expectedVersion`
- **Kết quả:** `200` với trạng thái sau xử lý
- **Lỗi chính:** `CANCELLATION_NOT_ALLOWED`, `VERSION_CONFLICT`

## CUS-09 Theo dõi Trip

- **Operation:** `GET /api/v1/trips/{tripId}`
- **Truy xuất:** FR-21; UC-12; AC-12
- **Kết quả:** trạng thái Trip, các mốc đã ghi nhận, thông tin Driver/Vehicle và ETA hiện hành

## CUS-10 Xem lịch sử Trip

- **Operation:** `GET /api/v1/customers/me/trips`
- **Truy xuất:** FR-46; UC-16; AC-26
- **Query:** `page`, `pageSize`, `status`, `from`, `to`
- **Kết quả:** danh sách Trip thuộc Customer kèm Fare và trạng thái Payment

## CUS-11 Xem Fare

- **Operation:** `GET /api/v1/trips/{tripId}/fare`
- **Truy xuất:** FR-33, FR-34, FR-35; UC-15; AC-19
- **Kết quả:** `serviceType`, `billableDistanceKm`, `pricePerKm`, `totalAmount`, `currency`
- **Quy tắc:** Fare bằng quãng đường tính cước nhân đơn giá/km của loại dịch vụ

## CUS-12 Chọn phương thức Payment

- **Operation:** `POST /api/v1/trips/{tripId}/payments`
- **Truy xuất:** FR-36, FR-37; UC-15; AC-20, AC-21
- **Header:** `Idempotency-Key`
- **Body:** `method` nhận `CASH` hoặc `ELECTRONIC`
- **Kết quả:** `201` với `paymentId`, `method`, `status`; với điện tử có dữ liệu chuyển hướng do provider cho phép

## CUS-13 Xem trạng thái Payment

- **Operation:** `GET /api/v1/payments/{paymentId}`
- **Truy xuất:** FR-38, FR-39; UC-15; AC-21, AC-22
- **Kết quả:** `paymentId`, `fareId`, `method`, `status`, `providerReference`, `updatedAt`

## CUS-14 Thực hiện lại Payment điện tử

- **Operation:** `POST /api/v1/payments/{paymentId}/retry`
- **Truy xuất:** FR-40; UC-15; AC-22
- **Header:** `Idempotency-Key`
- **Điều kiện:** Payment hiện tại ở `FAILED`
- **Kết quả:** `202`; Payment chuyển về `PENDING` khi yêu cầu được chấp nhận

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

## CUS-17 Xem điểm tổng hợp Driver

- **Operation:** `GET /api/v1/drivers/{driverId}/rating-summary`
- **Truy xuất:** FR-48; UC-16; AC-27
- **Kết quả:** `driverId`, `averageScore`, `ratingCount`, `updatedAt`
