# TS11 – Operations

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Tra cứu, giám sát, hỗ trợ và quản lý đơn giá của Operations Staff.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-11-01 | Tra cứu dữ liệu vận hành | Positive / P1 | FR-49; UC-17; AC-28 | Staff có quyền tra cứu. | Tìm Customer, Driver, phương tiện, Booking, Trip và Payment theo các khóa hợp lệ. | Kết quả đúng điều kiện lọc, phân trang và phạm vi quyền; không lẫn dữ liệu. |
| TC-11-02 | Ghi nhận hỗ trợ vận hành | Positive / P1 | FR-50; UC-17; AC-28 | Staff có quyền hỗ trợ. | Tạo ghi chú xử lý cho đối tượng nghiệp vụ. | Ghi chú được lưu với Staff, thời điểm và đối tượng; người không có quyền không sửa được. |
| TC-11-03 | Giám sát Trip đang diễn ra | Positive / P0 | FR-51; UC-17; AC-28 | Có Trip đang diễn ra và vị trí Driver đã ghi nhận. | Mở danh sách Trip hoạt động và chi tiết. | Hiển thị đúng trạng thái Trip và thời điểm cập nhật vị trí cuối; không trình bày vị trí cũ như dữ liệu hiện thời. |
| TC-11-04 | Tra cứu lịch sử Payment | Positive / P1 | FR-52; UC-17; AC-28 | Staff có quyền; có Payment Cash/Electronic. | Tìm theo mã Payment, Trip và trạng thái. | Trả đúng lịch sử, phương thức, trạng thái và mã tham chiếu được phép hiển thị. |
| TC-11-05 | Tạo đơn giá mới có hiệu lực | Positive / P0 | FR-53, FR-60; UC-17; AC-29 | Staff có quyền quản lý giá. | Tạo đơn giá/km hợp lệ cho loại dịch vụ với thời điểm hiệu lực. | Đơn giá được lưu và dùng cho Fare phát sinh theo hiệu lực; thao tác có audit. |
| TC-11-06 | Không tính lại Fare cũ khi đổi giá | Business rule / P0 | FR-53; UC-17; AC-29 | Đã có Fare trước thời điểm đơn giá mới hiệu lực. | Đổi đơn giá rồi đọc Fare cũ và tạo Trip mới. | Fare cũ giữ nguyên; Fare mới dùng đơn giá hiệu lực tương ứng. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-11-01 |  |  | Not Run |  |  |  |
| TC-11-02 |  |  | Not Run |  |  |  |
| TC-11-03 |  |  | Not Run |  |  |  |
| TC-11-04 |  |  | Not Run |  |  |  |
| TC-11-05 |  |  | Not Run |  |  |  |
| TC-11-06 |  |  | Not Run |  |  |  |
