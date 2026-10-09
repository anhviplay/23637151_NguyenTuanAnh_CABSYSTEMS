# TS05 – Driver Assignment Response

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Chấp nhận, từ chối, hết hạn và cạnh tranh phản hồi Assignment.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-05-01 | Driver chấp nhận đúng hạn | Positive / P0 | FR-15; UC-11; AC-09 | Assignment đang hiệu lực; thời hạn T được cấu hình. | Driver chấp nhận trước T. | Assignment Accepted; Booking được gán đúng Driver; một Trip được tạo; Driver không còn Available. |
| TC-05-02 | Driver từ chối | Exception / P0 | FR-15, FR-22; UC-11; AC-09, AC-13 | Assignment đang hiệu lực. | Driver từ chối và hệ thống còn ứng viên. | Kết quả Rejected được lưu; Driver trở lại Available nếu vẫn làm việc và không có Trip; hệ thống mời ứng viên tiếp theo. |
| TC-05-03 | Driver không phản hồi | Exception / P0 | FR-16, FR-22; UC-11; AC-09, AC-13 | Assignment đang hiệu lực; thời hạn T được cấu hình. | Không gửi phản hồi cho tới sau T. | Assignment thành No Response; Driver được khôi phục đúng trạng thái; điều phối chuyển ứng viên kế tiếp. |
| TC-05-04 | Chấp nhận sau khi hết hạn | Negative / P0 | FR-17; UC-11; AC-10 | Assignment đã hết hạn hoặc Booking đã được gán. | Driver gửi Accept. | Phản hồi bị từ chối; không thay Driver đã gán và không tạo Trip mới. |
| TC-05-05 | Hai phản hồi chấp nhận gần đồng thời | Concurrency / P0 | FR-17; UC-11; AC-10 | Hai phản hồi có thể tới gần đồng thời cho cùng Booking. | Gửi đồng thời hai yêu cầu Accept. | Chỉ phản hồi hợp lệ đầu tiên thắng; một Driver và một Trip được ghi nhận; phản hồi còn lại bị từ chối nhất quán. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-05-01 |  |  | Not Run |  |  |  |
| TC-05-02 |  |  | Not Run |  |  |  |
| TC-05-03 |  |  | Not Run |  |  |  |
| TC-05-04 |  |  | Not Run |  |  |  |
| TC-05-05 |  |  | Not Run |  |  |  |
