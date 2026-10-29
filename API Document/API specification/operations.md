# API Operations

Mọi path dưới đây có tiền tố `/api/v1`. Dùng quy ước trong [common.md](common.md).

| Method | Path | Actor hoặc permission | Dữ liệu | Kết quả |
| --- | --- | --- | --- | --- |
| GET | /drivers/nearby | location:read | latitude, longitude, radiusMeters=1000, page, pageSize | 200; vị trí còn hiệu lực, sắp khoảng cách rồi driverId |
| GET | /drivers/{driverId} | driver:read | driverId | 200; chi tiết hồ sơ xét duyệt |
| PATCH | /operations/drivers/{driverId}/verification | driver:verify | decision=ACTIVE/REJECTED, reason, expectedVersion | 200; phát kết quả để Driver nhận thông báo |
| GET | /operations/drivers | driver:read | page, pageSize | 200; read model hồ sơ từ Kafka |
| GET | /operations/bookings | booking:read | page, pageSize | 200; read model Booking |
| GET | /operations/trips | trip:read | page, pageSize | 200; read model Trip |
| GET | /operations/payments | payment:read | page, pageSize | 200; read model Payment |
| GET | /operations/audit-entries | audit:read | page, pageSize | 200; audit sự kiện chỉ đọc |

## Quyền và dữ liệu đọc

Tất cả operation yêu cầu actorType=OPERATIONS và permission tương ứng. Tài khoản bootstrap lấy số điện thoại và mật khẩu từ .env; không đưa credential vào Git. Danh sách vận hành là read model từ Kafka; API xét duyệt cập nhật trực tiếp Driver owner. Audit lưu eventType, producer/actor khi có, aggregateId, occurredAt và correlationId; không có API sửa hoặc xóa audit.

Nearby dùng dữ liệu vị trí, không tự loại OFFLINE hoặc PENDING_VERIFICATION trong danh sách kiểm tra mục 13. Dispatch vẫn kiểm tra ACTIVE, AVAILABLE, loại xe và reservation qua Driver/Booking trước khi gửi offer.
