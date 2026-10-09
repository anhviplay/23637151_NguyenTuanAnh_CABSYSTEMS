# TS14 – Data Integrity and Security

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Bảo vệ dữ liệu, toàn vẹn, idempotency và chống sửa audit.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-14-01 | Mật khẩu không lưu dạng đọc được | Security / P0 | NFR-08; AC-41 | Có quyền kiểm tra bản ghi và cấu hình môi trường kiểm thử. | Tạo/đổi mật khẩu rồi kiểm tra dữ liệu lưu và log. | Không tìm thấy mật khẩu rõ trong DB, log hoặc phản hồi; cơ chế băm phù hợp được áp dụng. |
| TC-14-02 | Bảo vệ dữ liệu nhạy cảm khi truyền và lưu | Security / P0 | NFR-08; CON-02, CON-05; AC-41 | Môi trường tích hợp hoàn chỉnh. | Kiểm tra kết nối, payload, log và dữ liệu lưu của tài khoản, vị trí, phương tiện, Payment. | Kết nối bảo mật; trường nhạy cảm không lộ trái phép; CAB không lưu dữ liệu thẻ/tài khoản thanh toán nhạy cảm. |
| TC-14-03 | Ràng buộc quan hệ nghiệp vụ | Data integrity / P0 | FR-11, FR-35, FR-38, FR-47 | Có dữ liệu Customer, Driver, Booking, Trip, Fare và Payment. | Thử tạo bản ghi thiếu đối tượng cha hoặc liên kết sang đối tượng không phù hợp. | Giao dịch bị từ chối; không có Booking/Trip/Fare/Payment/Rating mồ côi hoặc liên kết sai chủ thể. |
| TC-14-04 | Idempotency lệnh và callback | Reliability / P0 | NFR-12; AC-45 | Có lệnh cập nhật trạng thái và callback hợp lệ. | Gửi lặp cùng định danh nhiều lần. | Hiệu ứng nghiệp vụ chỉ xảy ra một lần; phản hồi sau nhất quán với kết quả ban đầu. |
| TC-14-05 | Chặn sửa hoặc xóa audit qua ứng dụng | Security / P0 | FR-61; NFR-10; AC-32, AC-43 | Có audit và tài khoản có quyền tra cứu. | Thử sửa/xóa audit qua các API và đường dẫn nghiệp vụ. | Không có thao tác sửa/xóa được hỗ trợ; yêu cầu bị từ chối; bản ghi audit không đổi. |
| TC-14-06 | Thực thi retention có kiểm soát | Data lifecycle / P1 | FR-62; NFR-10; AC-33, AC-43 | Có chính sách đã phê duyệt và dữ liệu biên trước/sau điều kiện. | Chạy xử lý retention và kiểm tra audit/log. | Chỉ dữ liệu đủ điều kiện bị xử lý; dữ liệu còn hạn giữ nguyên; kết quả có thể truy vết. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-14-01 |  |  | Not Run |  |  |  |
| TC-14-02 |  |  | Not Run |  |  |  |
| TC-14-03 |  |  | Not Run |  |  |  |
| TC-14-04 |  |  | Not Run |  |  |  |
| TC-14-05 |  |  | Not Run |  |  |  |
| TC-14-06 |  |  | Not Run |  |  |  |
