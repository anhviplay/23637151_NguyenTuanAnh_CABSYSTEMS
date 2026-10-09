# Hợp đồng nhà cung cấp thông báo

Hợp đồng này thuộc `notification-service`. Provider được đặt sau adapter để có thể bổ sung hoặc thay thế kênh mà không sửa service tạo sự kiện nghiệp vụ.

## NOT-01 Gửi thông báo

- **Contract:** `notification-adapter.send`
- **Truy xuất:** FR-43, FR-44, FR-45; AC-24, AC-25
- **Input:** `notificationId`, `recipient`, `channel`, `templateKey`, `templateData`, `commandId`
- **Output:** `providerMessageId`, `deliveryStatus`, `acceptedAt`
- **Kênh MVP:** in-app và push

## NOT-02 Nhận trạng thái gửi

- **Operation:** `POST /api/v1/integrations/notifications/{providerKey}/results`
- **Truy xuất:** FR-45; AC-25
- **Body:** `eventId`, `providerMessageId`, `deliveryStatus`, `occurredAt`, `failureCode`, `signature`
- **Kết quả:** `204`; event trùng không tạo DeliveryAttempt trùng

## Mốc thông báo

| Người nhận | Mốc chính |
| --- | --- |
| Customer | Booking được tiếp nhận, Driver được gán, Driver đến, Trip hoàn thành, Payment có kết quả, không tìm được Driver. |
| Driver | Assignment mới, kết quả phản hồi và thay đổi liên quan đến Trip được gán. |

## Xử lý lỗi

- Lỗi tạm thời được ghi nhận và xử lý lại theo cấu hình.
- Mỗi lần gửi tới provider được ghi thành DeliveryAttempt để phục vụ kiểm tra.
- Notification lỗi không rollback Booking, Trip hoặc Payment.
- Không đặt cố định số lần retry hoặc thời hạn lưu trong hợp đồng API.
