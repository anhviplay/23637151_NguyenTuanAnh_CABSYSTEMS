# TS08 – Fare and Payment

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Tính cước theo đơn giá/km và xử lý Payment tiền mặt/điện tử.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-08-01 | Tính Fare Bike | Positive / P0 | FR-33–FR-35; UC-15; AC-19 | Trip Bike Completed; quãng đường tính cước D km. | Kích hoạt tính Fare. | Fare = D × 5.000 VNĐ; lưu loại dịch vụ, D, đơn giá 5.000 và tổng tiền cho đúng Trip; một Payment hiện hành được tạo ở PENDING. |
| TC-08-02 | Tính Fare Car 4-seat | Positive / P0 | FR-33–FR-35; UC-15; AC-19 | Trip Car 4-seat Completed; quãng đường D km. | Kích hoạt tính Fare. | Fare = D × 10.000 VNĐ và lưu đầy đủ dữ liệu đầu vào tính cước. |
| TC-08-03 | Tính Fare Car 7-seat | Positive / P0 | FR-33–FR-35; UC-15; AC-19 | Trip Car 7-seat Completed; quãng đường D km. | Kích hoạt tính Fare. | Fare = D × 13.000 VNĐ và lưu đầy đủ dữ liệu đầu vào tính cước. |
| TC-08-04 | Không tạo Fare trùng | Reliability / P0 | FR-35; NFR-12; UC-15; AC-19, AC-45 | Trip đã có Fare. | Gửi lặp sự kiện/yêu cầu Completed. | Vẫn chỉ có một Fare và một Payment hiện hành cho Trip; số tiền không bị cộng hoặc tính lại ngoài quy tắc. |
| TC-08-05 | Chọn phương thức tiền mặt | Positive / P0 | FR-36; UC-15; AC-20 | Fare ở Payment Pending. | Customer chọn Cash. | Payment PENDING đã có gắn đúng Fare được cập nhật phương thức Cash; không tạo Fare hoặc Payment mới. |
| TC-08-06 | Thanh toán điện tử thành công | Positive / P0 | FR-37–FR-39; UC-15; AC-21, AC-22 | Fare ở Payment Pending; Provider khả dụng. | Chọn Electronic; gửi giao dịch; nhận callback thành công hợp lệ. | Payment thành công đúng một lần theo mã tham chiếu; Customer được thông báo; CAB không lưu dữ liệu thẻ/tài khoản nhạy cảm. |
| TC-08-07 | Callback thanh toán trùng | Reliability / P0 | FR-38; NFR-12; UC-15; AC-21, AC-45 | Payment đã xử lý callback thành công. | Gửi lại cùng callback và mã tham chiếu. | Callback được nhận diện là lặp; trạng thái và số tiền không bị xử lý lần hai. |
| TC-08-08 | Thực hiện lại Payment điện tử thất bại | Exception / P0 | FR-39, FR-40; UC-15; AC-22 | Payment điện tử ở Failed. | Customer yêu cầu thực hiện lại. | Payment được đưa vào luồng điện tử mới theo cùng Fare; Fare không được tạo lại; kết quả mới được thông báo. |
| TC-08-09 | Chuyển Payment thất bại sang tiền mặt | Exception / P0 | FR-39, FR-41; UC-15; AC-22 | Payment điện tử ở Failed. | Customer đổi phương thức sang Cash. | Phương thức và trạng thái Payment được cập nhật hợp lệ; Fare giữ nguyên; Customer thấy phương thức mới. |
| TC-08-10 | Xác nhận thu tiền mặt và hỗ trợ ngoại lệ | Positive + Authorization / P0 | FR-42, FR-60; UC-15; AC-23 | Payment Cash; Driver thuộc Trip hoặc Staff có quyền hỗ trợ. | Driver xác nhận đã thu; kiểm tra thêm thao tác xử lý ngoại lệ của Staff kèm lý do. | Payment chuyển đúng trạng thái; thao tác Staff có audit; người không có quyền bị từ chối. |
| TC-08-11 | Replay lệnh Payment | Security + Reliability / P0 | Rubric-30; NFR-12; AC-45; CUS-12 | Có Fare và Payment hiện hành ở PENDING, Provider sandbox ghi được số giao dịch. | Gửi lệnh chọn phương thức ELECTRONIC cùng `Idempotency-Key`/body hai lần; đối chiếu HTTP status/body, Payment và giao dịch Provider. | Lần sau trả đúng HTTP status/body cũ; vẫn một Payment và một giao dịch Provider, không double charge. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-08-01 |  |  | Not Run |  |  |  |
| TC-08-02 |  |  | Not Run |  |  |  |
| TC-08-03 |  |  | Not Run |  |  |  |
| TC-08-04 |  |  | Not Run |  |  |  |
| TC-08-05 |  |  | Not Run |  |  |  |
| TC-08-06 |  |  | Not Run |  |  |  |
| TC-08-07 |  |  | Not Run |  |  |  |
| TC-08-08 |  |  | Not Run |  |  |  |
| TC-08-09 |  |  | Not Run |  |  |  |
| TC-08-10 |  |  | Not Run |  |  |  |
| TC-08-11 |  |  | Not Run |  |  |  |
