# TS10 – Trip History and Rating

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Lịch sử Trip và đánh giá Driver sau chuyến.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-10-01 | Xem lịch sử Trip của Customer | Positive / P0 | FR-46; UC-16; AC-26 | Customer có nhiều Trip ở các trạng thái. | Mở danh sách và chi tiết Trip. | Chỉ Trip của Customer được hiển thị; chi tiết khớp Booking, Fare và Payment đã ghi nhận. |
| TC-10-02 | Chặn xem Trip của Customer khác | Authorization / P0 | FR-46; UC-16; AC-26 | Customer A biết tripId của Customer B. | A yêu cầu chi tiết Trip của B. | Server từ chối và không trả dữ liệu được bảo vệ. |
| TC-10-03 | Gửi Rating hợp lệ | Positive / P1 | FR-47, FR-48; UC-16; AC-27 | Trip của Customer đã Completed và chưa có Rating. | Gửi lần lượt giá trị nguyên trong miền 1–5 kèm nhận xét không rỗng trên bộ dữ liệu kiểm thử. | Score và nhận xét được lưu cho đúng Trip/Driver; điểm tổng hợp Driver được cập nhật từ các Rating hợp lệ. |
| TC-10-04 | Từ chối Rating ngoài miền | Negative / P1 | FR-47; UC-16; AC-27 | Trip Completed chưa có Rating. | Gửi 0, 6 và giá trị không phải số nguyên. | Mỗi yêu cầu bị từ chối; không tạo Rating và không đổi điểm tổng hợp. |
| TC-10-05 | Từ chối Rating trùng hoặc sai Trip | Negative / P0 | FR-47; UC-16; AC-27 | Trip đã có Rating hoặc chưa Completed hoặc không thuộc Customer. | Gửi Rating. | Server từ chối; mỗi Trip chỉ có tối đa một Rating của Customer sở hữu. |
| TC-10-06 | Từ chối Rating thiếu nhận xét | Negative / P1 | Rubric-20; FR-47; UC-16; AC-27 | Trip Completed thuộc Customer và chưa có Rating. | Gửi score hợp lệ nhưng bỏ `comment` hoặc gửi nhận xét rỗng. | Yêu cầu bị từ chối; không tạo Rating và không đổi điểm tổng hợp Driver. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-10-01 |  |  | Not Run |  |  |  |
| TC-10-02 |  |  | Not Run |  |  |  |
| TC-10-03 |  |  | Not Run |  |  |  |
| TC-10-04 |  |  | Not Run |  |  |  |
| TC-10-05 |  |  | Not Run |  |  |  |
| TC-10-06 |  |  | Not Run |  |  |  |
