# TS06 – Trip Status Management

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Theo dõi vòng đời, hủy và xử lý sự cố Trip.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-06-01 | Customer theo dõi Booking và Trip | Positive / P0 | FR-20, FR-21; UC-12; AC-12 | Customer sở hữu Booking đã được gán và có Trip. | Đọc trạng thái trước và sau từng cập nhật của Driver. | Customer thấy đúng trạng thái tìm kiếm, Driver, ETA và trạng thái Trip mới nhất. |
| TC-06-02 | Vòng đời Trip hợp lệ | Positive / P0 | FR-25–FR-28; UC-13; AC-15 | Trip đã tạo. | Cập nhật Driver Arrived → Picked Up → In Progress → Completed. | Mỗi trạng thái và thời điểm được lưu theo thứ tự; Completed kích hoạt tính Fare đúng một lần. |
| TC-06-03 | Từ chối chuyển trạng thái sai thứ tự | Negative / P0 | FR-25–FR-28; NFR-12; UC-13; AC-15, AC-45 | Trip đang ở trạng thái trước Picked Up. | Yêu cầu In Progress hoặc Completed không qua trạng thái bắt buộc. | Server từ chối; trạng thái và thời điểm cũ được giữ nguyên. |
| TC-06-04 | Customer hủy trước Picked Up | Exception / P0 | FR-29; UC-14; AC-16 | Trip chưa Picked Up. | Customer hủy và chọn lý do. | Booking/Trip chuyển trạng thái hủy phù hợp; lý do được lưu; Driver được thông báo và khôi phục trạng thái nếu đủ điều kiện. |
| TC-06-05 | Driver yêu cầu hủy trước Picked Up | Exception / P0 | FR-30; UC-14; AC-16 | Trip chưa Picked Up. | Driver yêu cầu hủy và chọn lý do. | Trip bị hủy đúng quy tắc; Customer được thông báo; lý do được lưu. |
| TC-06-06 | Chặn hủy thông thường sau Picked Up | Negative / P0 | FR-29, FR-30, FR-31; UC-14; AC-16, AC-17 | Trip đã Picked Up. | Customer hoặc Driver gọi luồng hủy thông thường. | Yêu cầu bị từ chối; Trip không thay đổi; chỉ luồng xử lý sự cố có quyền mới được dùng. |
| TC-06-07 | Operations xử lý Trip gặp sự cố | Exception / P0 | FR-31, FR-60; UC-14; AC-17 | Trip đã Picked Up; Staff có quyền. | Kết thúc Trip do sự cố kèm lý do. | Trạng thái phù hợp và lý do được lưu; audit có actor, đối tượng, trước/sau và thời điểm. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-06-01 |  |  | Not Run |  |  |  |
| TC-06-02 |  |  | Not Run |  |  |  |
| TC-06-03 |  |  | Not Run |  |  |  |
| TC-06-04 |  |  | Not Run |  |  |  |
| TC-06-05 |  |  | Not Run |  |  |  |
| TC-06-06 |  |  | Not Run |  |  |  |
| TC-06-07 |  |  | Not Run |  |  |  |
