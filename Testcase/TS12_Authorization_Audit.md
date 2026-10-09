# TS12 – Authorization and Audit

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Phân quyền phía server, audit và chính sách lưu trữ.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-12-01 | Cho phép thao tác đúng quyền | Authorization / P0 | FR-59; AC-31 | Staff được cấp quyền cho chức năng mục tiêu. | Gọi trực tiếp API chức năng. | Server cho phép và chỉ trả dữ liệu trong phạm vi quyền. |
| TC-12-02 | Từ chối thao tác trái quyền | Authorization / P0 | FR-59; NFR-09; AC-31, AC-42 | Staff đăng nhập nhưng thiếu quyền. | Gọi trực tiếp API quản trị dù giao diện có thể bị bỏ qua. | Server trả lỗi quyền; không thay đổi dữ liệu và không trả nội dung được bảo vệ. |
| TC-12-03 | Tạo audit cho thao tác nhạy cảm | Audit / P0 | FR-60; UC-19; AC-32 | Có thao tác duyệt Driver, đổi giá, xử lý Trip/Payment hoặc đổi quyền. | Thực hiện thao tác hợp lệ. | Audit ghi actor, thời điểm, đối tượng, hành động, giá trị trước/sau và lý do khi bắt buộc. |
| TC-12-04 | Tra cứu audit theo quyền | Positive + Negative / P0 | FR-61; UC-19; AC-32 | Có audit; hai Staff có và không có quyền xem. | Tìm kiếm audit bằng từng tài khoản. | Tài khoản có quyền xem đúng kết quả; tài khoản thiếu quyền bị từ chối. |
| TC-12-05 | Áp dụng chính sách lưu trữ được phê duyệt | Data lifecycle / P1 | FR-62; AC-33 | ABC đã phê duyệt và cấu hình chính sách cho từng nhóm dữ liệu. | Chạy xử lý vòng đời trên dữ liệu đạt điều kiện. | Dữ liệu được lưu, xóa hoặc ẩn danh đúng cấu hình; có log thực thi; không dùng thời hạn ngoài cấu hình. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-12-01 |  |  | Not Run |  |  |  |
| TC-12-02 |  |  | Not Run |  |  |  |
| TC-12-03 |  |  | Not Run |  |  |  |
| TC-12-04 |  |  | Not Run |  |  |  |
| TC-12-05 |  |  | Not Run |  |  |  |
