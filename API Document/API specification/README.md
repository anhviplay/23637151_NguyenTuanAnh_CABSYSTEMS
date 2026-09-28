# Danh mục API CAB System

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

Quy ước: [common.md](common.md). Xử lý tự động: [internal-contracts.md](internal-contracts.md).

| ID | Hợp đồng | Operation | FR |
| --- | --- | --- | --- |
| API-01 | [Đăng ký Customer](customer.md) | `POST /customers/registrations` | FR-01 |
| API-02 | [Xác thực Customer](customer.md) | `POST /sessions/customer` | FR-02, FR-56 |
| API-03 | [Cập nhật thông tin Customer](customer.md) | `PATCH /customers/me/profile` | FR-03 |
| API-04 | [Gửi Booking](customer.md) | `POST /bookings` | FR-11, FR-12 |
| API-05 | [Theo dõi Booking](customer.md) | `GET /bookings/{bookingId}` | FR-19, FR-20, FR-21, FR-22 |
| API-06 | [Theo dõi Trip](customer.md) | `GET /trips/{tripId}` | FR-21, FR-22, FR-23 |
| API-07 | [Xem số tiền phải trả](customer.md) | `GET /trips/{tripId}/fare` | FR-29 |
| API-08 | [Đề nghị thanh toán](customer.md) | `POST /trips/{tripId}/payments` | FR-30, FR-31 |
| API-09 | [Xem kết quả thanh toán](customer.md) | `GET /payments/{paymentId}` | FR-32, FR-39 |
| API-10 | [Yêu cầu xử lý lại thanh toán](customer.md) | `POST /payments/{paymentId}/retry-requests` | FR-34 |
| API-11 | [Xem lịch sử Trip](customer.md) | `GET /customers/me/trips` | FR-41, FR-29 |
| API-12 | [Đánh giá Driver](customer.md) | `POST /trips/{tripId}/ratings` | FR-42 |
| API-13 | [Driver tự đăng ký](driver.md) | `POST /drivers/registrations` | FR-04 |
| API-14 | [Xác thực Driver](driver.md) | `POST /sessions/driver` | FR-56 |
| API-15 | [Cập nhật hồ sơ Driver](driver.md) | `PATCH /drivers/me/profile` | FR-06 |
| API-16 | [Cập nhật phương tiện](driver.md) | `PATCH /drivers/me/vehicles/{vehicleId}` | FR-07 |
| API-17 | [Cập nhật hoạt động và sẵn sàng](driver.md) | `PATCH /drivers/me/work-status` | FR-08, FR-09 |
| API-18 | [Gửi vị trí Driver](driver.md) | `POST /drivers/me/locations` | FR-10 |
| API-19 | [Phản hồi đề nghị chuyến](driver.md) | `POST /assignments/{assignmentId}/responses` | FR-15, FR-16, FR-17 |
| API-20 | [Ghi nhận mốc Trip](driver.md) | `POST /trips/{tripId}/milestones` | FR-24, FR-25, FR-26, FR-27 |
| API-21 | [Operations Staff tạo tài khoản Driver](operator.md) | `POST /operations/drivers` | FR-05, FR-57 |
| API-22 | [Tra cứu customers](operator.md) | `GET /operations/customers` | FR-43, FR-57 |
| API-23 | [Tra cứu drivers](operator.md) | `GET /operations/drivers` | FR-44, FR-57 |
| API-24 | [Tra cứu vehicles](operator.md) | `GET /operations/vehicles` | FR-45, FR-57 |
| API-25 | [Tra cứu trips](operator.md) | `GET /operations/trips` | FR-46, FR-57 |
| API-26 | [Xem Trip đang diễn ra](operator.md) | `GET /operations/active-trips` | FR-47, FR-57 |
| API-27 | [Kiểm tra trạng thái Driver](operator.md) | `GET /operations/drivers/{driverId}/status` | FR-48, FR-57 |
| API-28 | [Hỗ trợ Trip lỗi](operator.md) | `POST /operations/trips/{tripId}/support-actions` | FR-49, FR-57 |
| API-29 | [Tra cứu giao dịch](operator.md) | `GET /operations/payment-transactions` | FR-50, FR-57 |
| API-30 | [Báo cáo hoạt động](leadership.md) | `GET /reports/operations` | FR-51, FR-52, FR-53, FR-54, FR-55 |
| API-31 | [Gửi giao dịch tới External Payment Provider](payment-provider.md) | `POST provider-adapter:create-payment` | FR-31 |
| API-32 | [Tiếp nhận kết quả giao dịch](payment-provider.md) | `POST /integrations/payments/{providerKey}/results` | FR-32, FR-33, FR-39 |
| API-33 | [Đối soát kết quả chưa xác định](payment-provider.md) | `GET provider-adapter:query-payment` | FR-32 |
| API-34 | [Gửi thông báo qua kênh được chọn](notification-provider.md) | `POST notification-adapter:send` | FR-15, FR-33, FR-35, FR-36, FR-37, FR-38, FR-39, FR-40 |
| API-35 | [Nhận trạng thái gửi](notification-provider.md) | `POST /integrations/notifications/{providerKey}/results` | FR-15, FR-33, FR-35, FR-36, FR-37, FR-38, FR-39, FR-40 |

[admin.md](admin.md) mô tả kiểm soát nội bộ, không tạo endpoint/actor quản trị mới. Các operation management còn thiếu dữ liệu phải giải quyết OI-20 trước triển khai.
