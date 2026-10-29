# Hợp đồng thông báo in-app

notification-service nhận Kafka, lưu Notification trong notification_db và trả qua `GET /api/v1/notifications/me`. Token Customer/Driver/Operations chỉ đọc thông báo có recipientId của chính actor. page/pageSize giới hạn danh sách; mới nhất trước.

Notification gồm notificationId, recipientId, eventId, eventType, bookingId/tripId/paymentId khi có, details.status, details.reason, channel=IN_APP, status=AVAILABLE, createdAt.

Sự kiện đăng ký/duyệt Driver, tiếp nhận Booking, offer, gán tài xế, không tìm được xe, hủy Trip và kết quả Payment được lưu cho người nhận trong payload. Kết quả duyệt có ACTIVE/REJECTED và lý do; hủy chuyến có CANCELED và bookingId để đối chiếu hai bên.

Inbox eventId chống tạo lại cùng sự kiện; Kafka và database đảm bảo thông báo được ghi độc lập với phản hồi API nguồn. Client đọc lại khi projection chưa xuất hiện. Không triển khai Push Provider, DeliveryAttempt hay callback push trong phạm vi 30 mục.
