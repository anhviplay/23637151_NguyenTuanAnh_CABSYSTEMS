# TS09 – Notification

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Thông báo theo mốc nghiệp vụ và xử lý lỗi nhà cung cấp.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-09-01 | Thông báo Customer theo mốc nghiệp vụ | Positive / P1 | FR-43; AC-24 | Có các sự kiện Booking tiếp nhận, Driver nhận, Driver đến, Trip hoàn thành và Payment có kết quả. | Phát từng sự kiện. | Đúng Customer nhận nội dung tương ứng qua in-app và push; thông báo gắn đúng đối tượng nghiệp vụ. |
| TC-09-02 | Thông báo Driver | Positive / P0 | FR-44; AC-24 | Có Assignment mới hoặc thay đổi Trip được gán. | Phát từng sự kiện. | Đúng Driver nhận thông báo; Driver khác không nhận dữ liệu của Trip. |
| TC-09-03 | Nhà cung cấp lỗi tạm thời | Recovery / P0 | FR-45; AC-25 | Chính sách xử lý lại đã cấu hình; Provider trả lỗi tạm thời. | Gửi thông báo và thực thi xử lý lại theo cấu hình. | Mỗi kết quả gửi được ghi nhận; xử lý lại đúng cấu hình; giao dịch Booking/Trip/Payment nguồn không bị đảo. |
| TC-09-04 | Callback trạng thái gửi trùng | Reliability / P1 | FR-45; NFR-12; AC-25, AC-45 | Đã ghi nhận một kết quả gửi. | Provider gửi lại cùng callback. | Không tạo kết quả giao trùng hoặc chuyển sai trạng thái; callback được xử lý idempotent. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-09-01 |  |  | Not Run |  |  |  |
| TC-09-02 |  |  | Not Run |  |  |  |
| TC-09-03 |  |  | Not Run |  |  |  |
| TC-09-04 |  |  | Not Run |  |  |  |
