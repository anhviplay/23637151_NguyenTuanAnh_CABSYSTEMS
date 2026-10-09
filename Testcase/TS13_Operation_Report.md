# TS13 – Operation Reporting

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Báo cáo vận hành từ dữ liệu đã ghi nhận.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-13-01 | Báo cáo số Booking và Trip | Reporting / P1 | FR-54; UC-18; AC-30 | Có dữ liệu nhiều trạng thái, loại dịch vụ và ngày. | Lọc theo khoảng thời gian, trạng thái và loại dịch vụ. | Số liệu khớp tập bản ghi nguồn và điều kiện biên thời gian. |
| TC-13-02 | Báo cáo doanh thu | Reporting / P0 | FR-55; UC-18; AC-30 | Có Payment thành công, thất bại và đang chờ. | Xem doanh thu trong khoảng thời gian. | Chỉ Payment được ghi nhận thành công theo quy tắc báo cáo được tổng hợp; tổng khớp dữ liệu chi tiết. |
| TC-13-03 | Tỷ lệ Trip hoàn thành | Reporting / P1 | FR-56; UC-18; AC-30 | Có Trip Completed và không Completed. | Xem tỷ lệ theo bộ lọc. | Tử số, mẫu số và kết quả nhất quán với dữ liệu Trip trong phạm vi lọc. |
| TC-13-04 | Tỷ lệ Booking hoặc Trip bị hủy | Reporting / P1 | FR-57; UC-18; AC-30 | Có bản ghi hủy và không hủy. | Xem tỷ lệ theo cùng khoảng thời gian và điều kiện lọc. | Kết quả khớp trạng thái/lý do hủy đã lưu và không đếm trùng Booking/Trip. |
| TC-13-05 | Hiệu quả Driver | Reporting / P1 | FR-58; UC-18; AC-30 | Có dữ liệu Trip và Rating của nhiều Driver. | Xem báo cáo theo Driver và khoảng thời gian. | Chỉ dữ liệu đã ghi nhận được tổng hợp; số Trip và Rating khớp dữ liệu chi tiết. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-13-01 |  |  | Not Run |  |  |  |
| TC-13-02 |  |  | Not Run |  |  |  |
| TC-13-03 |  |  | Not Run |  |  |  |
| TC-13-04 |  |  | Not Run |  |  |  |
| TC-13-05 |  |  | Not Run |  |  |  |
