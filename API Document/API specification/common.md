# Quy ước API dùng chung

## 1. Giao thức và định dạng

- API công khai: REST qua HTTPS, định dạng JSON UTF-8.
- Base path: `/api/v1`.
- Thời gian: ISO 8601 có múi giờ, ví dụ `2026-10-09T20:30:00+07:00`.
- Tiền: số nguyên VNĐ; không dùng số thực cho giá trị tiền.
- ID: chuỗi UUID do CAB System phát hành.
- Tên trường JSON dùng `camelCase`.

## 2. Header

| Header | Bắt buộc | Mục đích |
| --- | :---: | --- |
| `Authorization: Bearer <token>` | Có, trừ đăng ký/đăng nhập/khôi phục mật khẩu | Xác thực phiên. |
| `Content-Type: application/json` | Có với request body | Khai báo định dạng. |
| `Idempotency-Key` | Có với command tạo hoặc chuyển trạng thái | Ngăn xử lý lặp do retry mạng. |
| `X-Correlation-Id` | Khuyến nghị | Liên kết log và event xuyên service. |
| `If-Match` | Khi cập nhật tài nguyên có version | Ngăn ghi đè đồng thời. |

## 3. Vai trò và quyền

| Vai trò | Phạm vi |
| --- | --- |
| `CUSTOMER` | Chỉ truy cập tài khoản, Booking, Trip, Fare, Payment và Rating thuộc mình. |
| `DRIVER` | Chỉ truy cập hồ sơ, phương tiện, Assignment và Trip được gán cho mình. |
| `OPERATIONS` | Truy cập chức năng vận hành theo permission được cấp; không có quyền mặc định đọc mọi dữ liệu. |

API Gateway xác thực token. Service sở hữu tài nguyên phải kiểm tra actor, permission và quan hệ sở hữu trước khi xử lý.

## 4. Phản hồi chuẩn

### 4.1 Thành công

```json
{
  "data": {},
  "meta": {
    "correlationId": "uuid",
    "occurredAt": "2026-10-09T20:30:00+07:00"
  }
}
```

### 4.2 Lỗi

```json
{
  "error": {
    "code": "BOOKING_INVALID_STATE",
    "message": "Booking không thể thực hiện thao tác ở trạng thái hiện tại.",
    "fieldErrors": [],
    "correlationId": "uuid"
  }
}
```

| HTTP | Sử dụng |
| --- | --- |
| `200` | Đọc hoặc cập nhật thành công. |
| `201` | Tạo tài nguyên thành công. |
| `202` | Command đã được tiếp nhận để xử lý. |
| `204` | Thành công và không có response body. |
| `400` | Dữ liệu đầu vào không hợp lệ. |
| `401` | Chưa xác thực hoặc token không hợp lệ. |
| `403` | Đã xác thực nhưng không có quyền. |
| `404` | Không tìm thấy tài nguyên trong phạm vi được phép. |
| `409` | Xung đột trạng thái, version hoặc idempotency key. |
| `422` | Vi phạm quy tắc nghiệp vụ. |
| `429` | Vượt giới hạn tần suất. |
| `502` | Nhà cung cấp bên ngoài không phản hồi hợp lệ. |
| `503` | Thành phần phụ thuộc tạm thời không khả dụng. |

## 5. Phân trang và lọc

Danh sách dùng `page`, `pageSize`, `sort` và bộ lọc được công bố tại từng operation. `pageSize` chịu giới hạn cấu hình của API Gateway.

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 0,
    "totalPages": 0
  }
}
```

## 6. Kiểu dữ liệu dùng chung

| Kiểu | Trường chính | Quy tắc |
| --- | --- | --- |
| `GeoPoint` | `latitude`, `longitude`, `observedAt` | Tọa độ hợp lệ; độ mới được kiểm tra theo cấu hình. |
| `Place` | `address`, `location` | Điểm đón hoặc điểm đến. |
| `Money` | `amount`, `currency` | `amount` là số nguyên không âm; MVP dùng `VND`. |
| `ServiceType` | `BIKE`, `CAR_4`, `CAR_7` | Đơn giá/km lần lượt 5.000, 10.000 và 13.000 VNĐ. |
| `ActorRef` | `actorId`, `actorType` | Tham chiếu logic, không làm lộ credential. |

## 7. Trạng thái nghiệp vụ

| Đối tượng | Trạng thái |
| --- | --- |
| Booking | `SEARCHING`, `DRIVER_ASSIGNED`, `TRIP_CREATED`, `COMPLETED`, `CANCELLED`, `NO_DRIVER_AVAILABLE` |
| Assignment | `OFFERED`, `ACCEPTED`, `REJECTED`, `NO_RESPONSE`, `EXPIRED` |
| Trip | `CREATED`, `DRIVER_ARRIVED`, `PICKED_UP`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` |
| Payment | `PENDING`, `PAID`, `FAILED` |
| Driver availability | `OFFLINE`, `AVAILABLE`, `BUSY` |
| Driver verification | `PENDING_VERIFICATION`, `ACTIVE`, `REJECTED` |

## 8. Gửi lặp và cạnh tranh

- Cùng `Idempotency-Key` và cùng nội dung trả lại kết quả nghiệp vụ đã ghi nhận.
- Cùng key nhưng khác nội dung trả `409 IDEMPOTENCY_CONFLICT`.
- Chuyển trạng thái dùng version hoặc compare-and-set; phản hồi Assignment hợp lệ đầu tiên được công nhận.
- Callback Payment và Notification phải chống xử lý lặp theo mã sự kiện hoặc mã tham chiếu.

## 9. Bảo vệ dữ liệu

- Không ghi mật khẩu, OTP, token, dữ liệu thẻ hoặc tài khoản thanh toán vào log.
- Response chỉ trả trường cần thiết cho actor.
- Tọa độ Driver chỉ được sử dụng trong phạm vi điều phối, theo dõi Trip và vận hành được phép.
- Audit ghi actor, action, target, thời điểm, correlation ID và lý do khi operation yêu cầu.
