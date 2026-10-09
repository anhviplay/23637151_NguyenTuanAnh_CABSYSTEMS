# CAB System API Specification

**Phiên bản:** 2.0  
**Ngày:** 09/10/2026  
**Baseline nghiệp vụ:** `srs.md` phiên bản 2.2  
**Baseline kiến trúc:** Microservice Design phiên bản cuối  
**Trạng thái:** Sẵn sàng để Dev triển khai và Tester xây dựng kiểm thử hợp đồng

## 1. Phạm vi

Bộ tài liệu này đặc tả giao tiếp bên ngoài và giao tiếp nội bộ của CAB System trong phạm vi MVP. API công khai sử dụng REST qua API Gateway. Các truy vấn nội bộ cần kết quả tức thời sử dụng gRPC. Domain event được truyền bất đồng bộ qua Kafka.

Tài liệu không mô tả schema vật lý hoặc cách cài đặt bên trong service. Mỗi service chỉ được thay đổi dữ liệu do mình sở hữu.

## 2. Cấu trúc tài liệu

| File | Nội dung |
| --- | --- |
| [common.md](common.md) | Quy ước HTTP, xác thực, lỗi, phân trang, kiểu dữ liệu và trạng thái dùng chung. |
| [customer.md](customer.md) | API cho Customer: tài khoản, Booking, Trip, Fare, Payment, lịch sử và Rating. |
| [driver.md](driver.md) | API cho Driver: hồ sơ, phương tiện, trạng thái làm việc, vị trí, Assignment và Trip. |
| [operations.md](operations.md) | API cho Operations Staff: Driver, tra cứu, hỗ trợ, đơn giá, báo cáo và audit. |
| [payment-provider.md](payment-provider.md) | Hợp đồng adapter với External Payment Provider. |
| [notification-provider.md](notification-provider.md) | Hợp đồng adapter với nhà cung cấp thông báo. |
| [internal-contracts.md](internal-contracts.md) | gRPC và domain event giữa các microservice. |

## 3. Danh mục API công khai

| Nhóm | Operation chính | Tài liệu |
| --- | --- | --- |
| Identity & Customer | Đăng ký, đăng nhập, khôi phục mật khẩu, cập nhật hồ sơ | [customer.md](customer.md) |
| Booking & Trip | Tạo/hủy Booking, theo dõi Booking và Trip, lịch sử | [customer.md](customer.md) |
| Fare & Payment | Xem Fare, chọn phương thức, thực hiện lại Payment | [customer.md](customer.md) |
| Rating | Gửi Rating và xem điểm tổng hợp Driver | [customer.md](customer.md) |
| Driver & Vehicle | Đăng ký Driver, hồ sơ, phương tiện, trạng thái làm việc | [driver.md](driver.md) |
| Location | Gửi vị trí Driver | [driver.md](driver.md) |
| Assignment & Trip | Phản hồi Assignment và cập nhật trạng thái Trip | [driver.md](driver.md) |
| Operations | Quản lý Driver, tra cứu, hỗ trợ, báo cáo và audit | [operations.md](operations.md) |

## 4. Nguyên tắc truy xuất

- Mỗi operation ghi rõ FR, UC và AC liên quan trong SRS 2.2.
- API Gateway xác thực và định tuyến; service sở hữu nghiệp vụ vẫn kiểm tra quyền trên tài nguyên.
- Command có nguy cơ gửi lặp phải hỗ trợ `Idempotency-Key`.
- Payment và Notification lỗi không được đảo Booking hoặc Trip đã ghi nhận.
- Không lưu hoặc trả về thông tin thẻ/tài khoản thanh toán nhạy cảm.
- Thời hạn phản hồi, độ mới vị trí, retry và retention lấy từ cấu hình đã được phê duyệt; API không tự đặt giá trị cố định.
