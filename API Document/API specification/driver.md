# API Driver

Trừ đăng ký, đăng nhập và khôi phục mật khẩu, actor phải có vai trò `DRIVER`. Driver chỉ được thao tác hồ sơ, phương tiện, Assignment và Trip thuộc mình.

## DRV-01 Đăng ký Driver

- **Operation:** `POST /api/v1/auth/driver/registrations`
- **Truy xuất:** FR-05; UC-05; AC-03
- **Body:** thông tin tài khoản, hồ sơ Driver, giấy phép và thông tin phương tiện bắt buộc
- **Kết quả:** `201` với `driverId`, trạng thái `PENDING_VERIFICATION`

## DRV-02 Đăng nhập và khôi phục mật khẩu

- **Operations:** `POST /api/v1/auth/sessions`, `POST /api/v1/auth/password-recovery/otp`, `POST /api/v1/auth/password-recovery/confirm`
- **Truy xuất:** FR-02, FR-03; UC-02, UC-03; AC-01
- **Quy tắc:** `actorType=DRIVER`; response và lỗi theo [common.md](common.md)

## DRV-03 Cập nhật hồ sơ Driver

- **Operation:** `PATCH /api/v1/drivers/me/profile`
- **Truy xuất:** FR-08; UC-07; AC-05
- **Body:** các trường hồ sơ được phép cập nhật và `version`
- **Kết quả:** `200`; trường cần xác minh có thể đưa hồ sơ về `PENDING_VERIFICATION`

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
- **Kết quả:** Assignment đang `OFFERED`, thông tin điểm đón, loại dịch vụ và hạn phản hồi theo cấu hình

## DRV-08 Phản hồi Assignment

- **Operation:** `POST /api/v1/assignments/{assignmentId}/responses`
- **Truy xuất:** FR-15, FR-16, FR-17; UC-11; AC-09, AC-10
- **Header:** `Idempotency-Key`
- **Body:** `decision` nhận `ACCEPTED` hoặc `REJECTED`, `reasonCode` khi từ chối
- **Kết quả:** `200` với kết quả được công nhận; chỉ phản hồi chấp nhận hợp lệ đầu tiên tạo Trip

## DRV-09 Cập nhật trạng thái Trip

- **Operation:** `POST /api/v1/trips/{tripId}/status-transitions`
- **Truy xuất:** FR-25, FR-26, FR-27, FR-28; UC-13; AC-15
- **Header:** `Idempotency-Key`
- **Body:** `targetStatus`, `occurredAt`, `expectedVersion`
- **Trạng thái cho phép:** `DRIVER_ARRIVED`, `PICKED_UP`, `IN_PROGRESS`, `COMPLETED`
- **Lỗi chính:** `TRIP_INVALID_TRANSITION`, `TRIP_NOT_ASSIGNED_TO_DRIVER`, `VERSION_CONFLICT`

## DRV-10 Yêu cầu hủy trước Picked Up

- **Operation:** `POST /api/v1/trips/{tripId}/driver-cancellation`
- **Truy xuất:** FR-30; UC-14; AC-16
- **Body:** `reasonCode`, `reasonText`, `expectedVersion`
- **Kết quả:** `200` với trạng thái Booking/Trip và khả năng nhận Booking tiếp theo

## DRV-11 Xác nhận đã thu tiền mặt

- **Operation:** `POST /api/v1/payments/{paymentId}/cash-confirmation`
- **Truy xuất:** FR-42; UC-15; AC-23
- **Header:** `Idempotency-Key`
- **Điều kiện:** Payment dùng `CASH` và Trip thuộc Driver
- **Kết quả:** `200` với Payment `PAID`
