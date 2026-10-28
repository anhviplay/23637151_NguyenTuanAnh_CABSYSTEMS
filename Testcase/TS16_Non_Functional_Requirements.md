# TS16 – Non-Functional Requirements

**Phiên bản:** 2.0  
**Baseline:** `srs.md` v2.2  
**Trạng thái:** Sẵn sàng thực thi  
**Mục tiêu:** Kiểm thử và review NFR-01–NFR-12.

## Điều kiện chung

- Môi trường kiểm thử đã triển khai đúng build được phê duyệt.
- Dữ liệu và tài khoản kiểm thử được cô lập; thời gian, ngưỡng và chính sách có thể cấu hình phải lấy từ cấu hình của môi trường.
- Mỗi lần chạy phải ghi kết quả `Pass`, `Fail`, `Blocked` hoặc `Not Run`, kèm bằng chứng và mã lỗi nếu có.

## Test cases

| ID | Test case | Loại / Ưu tiên | Truy xuất | Tiền điều kiện | Bước kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| TC-16-01 | 95% thao tác không quá 2 giây | Performance / P0 | NFR-01; AC-34 | Môi trường và tải thiết kế đã xác định; loại thời gian chờ Provider. | Chạy tập thao tác đọc/ghi thông thường và thu percentile. | Ít nhất 95% thao tác phản hồi trong 2 giây; báo cáo nêu rõ mẫu, tải và phần thời gian bị loại. |
| TC-16-02 | 500 phiên và 50 Booking/phút | Load / P0 | NFR-02; AC-35 | Có kịch bản tải đại diện. | Duy trì 500 phiên đồng thời và tạo 50 Booking mới/phút. | Vẫn đạt NFR-01; không mất hoặc tạo trùng Booking. |
| TC-16-03 | Availability chức năng lõi | Availability / P1 | NFR-03; AC-36 | Có dữ liệu giám sát tháng và lịch bảo trì. | Tính availability sau khi loại bảo trì đã thông báo. | Kết quả tối thiểu 99,5% và có bằng chứng nguồn cho thời gian hoạt động/gián đoạn. |
| TC-16-04 | Cô lập lỗi Payment | Resilience / P0 | NFR-04; AC-37 | Giả lập Payment không khả dụng. | Tạo Booking, điều phối và cập nhật Trip trong thời gian lỗi. | Các luồng này vẫn hoạt động; tác vụ Payment lỗi được ghi nhận để xử lý tiếp. |
| TC-16-05 | Cô lập lỗi Notification | Resilience / P0 | NFR-04; AC-37 | Giả lập Notification không khả dụng. | Thực hiện Booking và Trip phát sinh thông báo. | Giao dịch nguồn hoàn tất; lỗi gửi được ghi nhận và không đảo Booking/Trip. |
| TC-16-06 | Điều chỉnh năng lực xử lý độc lập | Architecture review / P1 | NFR-05; AC-38 | Có sơ đồ triển khai và số liệu tải. | Review khả năng điều chỉnh riêng Booking/Dispatch, Trip/Location, Payment, Notification. | Bằng chứng cho thấy từng năng lực có thể thay đổi tài nguyên xử lý mà không buộc mở rộng toàn bộ hệ thống. |
| TC-16-07 | Phạm vi ảnh hưởng khi thay đổi | Maintainability review / P1 | NFR-06; AC-39 | Có một thay đổi mẫu và danh sách thành phần. | Thực hiện impact analysis, build và regression liên quan. | Phạm vi ảnh hưởng được xác định; không cần xây dựng lại toàn bộ ứng dụng; regression liên quan đạt. |
| TC-16-08 | Khả năng mở rộng nghiệp vụ | Architecture review / P1 | NFR-07; AC-40 | Có tài liệu kiến trúc và hợp đồng giao tiếp. | Review kịch bản thêm loại dịch vụ, phương thức Payment, nhà cung cấp Notification hoặc thay thành phần kỹ thuật. | Mỗi kịch bản có điểm mở rộng rõ và không yêu cầu xây dựng lại toàn bộ ứng dụng. |
| TC-16-09 | Bảo vệ dữ liệu xác thực và nhạy cảm | Security / P0 | NFR-08; AC-41 | Có quyền kiểm tra cấu hình, lưu trữ và giao tiếp. | Kiểm tra mã hóa kết nối, mật khẩu, secret, log và dữ liệu nhạy cảm. | Dữ liệu được bảo vệ khi truyền/lưu; mật khẩu không thể đọc lại; secret không lộ trong log/phản hồi. |
| TC-16-10 | Phân quyền phía server | Security / P0 | NFR-09; AC-42 | Tài khoản thiếu quyền đã đăng nhập. | Gọi trực tiếp các API quản trị bị cấm. | Mọi thao tác bị từ chối tại server và không trả dữ liệu được bảo vệ. |
| TC-16-11 | Audit chống sửa đổi qua nghiệp vụ | Security / P0 | NFR-10; AC-43 | Có audit log và tài khoản có quyền tra cứu. | Thử cập nhật hoặc xóa audit qua các chức năng nghiệp vụ; kiểm tra dữ liệu trước/sau. | Mọi yêu cầu sửa/xóa bị từ chối; audit không đổi và tiếp tục tuân theo chính sách lưu trữ đã cấu hình. |
| TC-16-12 | Khôi phục RPO/RTO | Recovery / P0 | NFR-11; AC-44 | Có bản sao lưu hằng ngày và môi trường khôi phục. | Giả lập mất hệ thống; khôi phục và đo mất dữ liệu/thời gian. | RPO không quá 24 giờ; RTO không quá 4 giờ; dữ liệu sau khôi phục vượt kiểm tra toàn vẹn. |
| TC-16-13 | Nhất quán khi gửi lặp và chuyển trạng thái sai | Reliability / P0 | NFR-12; AC-45 | Có lệnh trạng thái, callback Payment và gói đồng bộ. | Gửi lặp và gửi chuyển trạng thái không hợp lệ. | Không tạo dữ liệu trùng; kết quả idempotent; mọi chuyển trạng thái sai bị từ chối. |
| TC-16-14 | Rate limiting tại Gateway | Security + Resilience / P0 | Rubric-29; NFR-03, NFR-08 | Gateway đã cấu hình ngưỡng rate limit cho môi trường; có công cụ gửi tải. | Gửi nhiều request liên tiếp tới API Booking vượt ngưỡng cấu hình, ghi ngưỡng thật của môi trường. | Request vượt ngưỡng trả HTTP 429, không tạo Booking cho request bị chặn; Gateway/hệ thống vẫn đáp ứng request hợp lệ sau đó. |

## Ghi nhận thực thi

| ID | Build | Môi trường | Kết quả | Bằng chứng / Defect | Người chạy | Ngày chạy |
| --- | --- | --- | --- | --- | --- | --- |
| TC-16-01 |  |  | Not Run |  |  |  |
| TC-16-02 |  |  | Not Run |  |  |  |
| TC-16-03 |  |  | Not Run |  |  |  |
| TC-16-04 |  |  | Not Run |  |  |  |
| TC-16-05 |  |  | Not Run |  |  |  |
| TC-16-06 |  |  | Not Run |  |  |  |
| TC-16-07 |  |  | Not Run |  |  |  |
| TC-16-08 |  |  | Not Run |  |  |  |
| TC-16-09 |  |  | Not Run |  |  |  |
| TC-16-10 |  |  | Not Run |  |  |  |
| TC-16-11 |  |  | Not Run |  |  |  |
| TC-16-12 |  |  | Not Run |  |  |  |
| TC-16-13 |  |  | Not Run |  |  |  |
| TC-16-14 |  |  | Not Run |  |  |  |
