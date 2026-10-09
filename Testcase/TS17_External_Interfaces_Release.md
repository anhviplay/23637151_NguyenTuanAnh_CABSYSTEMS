# TS17 – External Interfaces

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Kiểm thử EIR-01–EIR-06 trên luồng thành công, lỗi và bảo vệ dữ liệu.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-17-01 | Customer Interface | Interface / P0 | EIR-01; AC-46 | Bản build Customer trên thiết bị di động được hỗ trợ. | Chạy smoke và negative cho tài khoản, Booking, theo dõi, Payment, lịch sử, Rating. | Các luồng FR được liên kết hoạt động; lỗi rõ ràng; dữ liệu Customer khác không bị lộ. |
| TC-17-02 | Driver Interface | Interface / P0 | EIR-02; AC-47 | Bản build Driver trên thiết bị di động được hỗ trợ. | Chạy tài khoản, hồ sơ, trạng thái làm việc, vị trí, Assignment, Trip và Cash confirmation. | Các luồng FR được liên kết hoạt động; cập nhật sai quyền/trạng thái bị từ chối. |
| TC-17-03 | Operations Interface | Interface / P0 | EIR-03; AC-48 | Giao diện web và các tài khoản Staff có quyền khác nhau. | Chạy tạo/duyệt Driver, hỗ trợ, báo cáo, giá, audit và kiểm tra trái quyền. | Chức năng hiển thị và thực thi theo quyền; server vẫn chặn khi gọi trực tiếp trái quyền. |
| TC-17-04 | External Payment Provider | Integration / P0 | EIR-04; AC-49 | Sandbox Provider và secret kiểm thử sẵn sàng. | Kiểm thử gửi yêu cầu, callback thành công/thất bại/trùng, chữ ký sai và timeout. | Trao đổi qua kết nối bảo mật; mã tham chiếu duy nhất; callback hợp lệ idempotent; callback giả bị từ chối; không lộ dữ liệu nhạy cảm. |
| TC-17-05 | Location and Routing | Integration / P0 | EIR-05; AC-50 | Dịch vụ bản đồ/định tuyến kiểm thử sẵn sàng. | Gửi vị trí; tìm Driver; tính ETA, khoảng cách và quãng đường Trip; giả lập lỗi dịch vụ. | Dữ liệu hợp lệ được dùng đúng; vị trí cũ bị loại; lỗi được xử lý rõ mà không tạo kết quả giả. |
| TC-17-06 | Notification Channel | Integration / P1 | EIR-06; AC-51 | In-app và push provider kiểm thử sẵn sàng. | Gửi các mốc thông báo; kiểm thử thành công, lỗi tạm thời và callback trùng. | Đúng người nhận/nội dung; kết quả được ghi; xử lý lại theo cấu hình; giao dịch nguồn không bị đảo. |
| TC-17-07 | Hợp đồng giao tiếp và phiên bản | Contract / P1 | NFR-06, NFR-07; AC-39, AC-40 | Có schema/hợp đồng API và event của bản phát hành. | Chạy contract test producer/consumer và regression khi thay implementation tương thích. | Hợp đồng hiện hành tương thích; thay thành phần tương thích không làm hỏng luồng nghiệp vụ liên quan. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-17-01 |  |  | Not Run |  |  |  |
| TC-17-02 |  |  | Not Run |  |  |  |
| TC-17-03 |  |  | Not Run |  |  |  |
| TC-17-04 |  |  | Not Run |  |  |  |
| TC-17-05 |  |  | Not Run |  |  |  |
| TC-17-06 |  |  | Not Run |  |  |  |
| TC-17-07 |  |  | Not Run |  |  |  |
