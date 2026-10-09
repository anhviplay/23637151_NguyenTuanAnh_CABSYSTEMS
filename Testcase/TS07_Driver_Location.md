# TS07 – Driver Location

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Tiếp nhận vị trí, kiểm tra độ mới và đồng bộ sau mất mạng.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-07-01 | Lưu vị trí Driver Available | Positive / P0 | FR-23; UC-13; AC-14 | Driver Active và Available. | Gửi tọa độ, độ chính xác và thời điểm hợp lệ. | Vị trí được lưu cho đúng Driver và có thể dùng để tìm Driver. |
| TC-07-02 | Lưu vị trí trong Trip | Positive / P0 | FR-23; UC-13; AC-14 | Driver đang thực hiện Trip. | Gửi chuỗi cập nhật vị trí theo thời gian. | Các điểm được ghi nhận theo đúng Driver/Trip; vị trí hiện hành phản ánh bản ghi mới nhất hợp lệ. |
| TC-07-03 | Không dùng vị trí hết hiệu lực | Business rule / P0 | FR-24; UC-13; AC-14 | Ngưỡng độ mới T được cấu hình. | Để vị trí vượt T rồi yêu cầu tìm Driver và tính ETA. | Dữ liệu hết hiệu lực không được dùng; hệ thống yêu cầu hoặc chờ vị trí hợp lệ theo luồng nghiệp vụ. |
| TC-07-04 | Đồng bộ sau mất mạng | Recovery / P0 | FR-32; UC-13; AC-18 | Thiết bị lưu cục bộ cập nhật vị trí/trạng thái khi mất mạng. | Khôi phục kết nối và gửi lại theo thứ tự, bao gồm một bản ghi lặp. | Cập nhật được xử lý theo thứ tự; bản ghi lặp không tạo dữ liệu trùng; trạng thái mới hơn không bị ghi đè. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-07-01 |  |  | Not Run |  |  |  |
| TC-07-02 |  |  | Not Run |  |  |  |
| TC-07-03 |  |  | Not Run |  |  |  |
| TC-07-04 |  |  | Not Run |  |  |  |
