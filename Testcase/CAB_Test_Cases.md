# CAB System – Test Case Specification

**Document Version:** 2.0  
**Date:** 09/10/2026  
**Requirements Baseline:** `srs.md` v2.2  
**API Baseline:** `API Document/API specification` v2.0  
**Status:** Sẵn sàng thực thi

## 1. Mục đích

Bộ tài liệu này xác định kiểm thử chức năng, tích hợp, bảo mật, dữ liệu, phi chức năng và luồng xuyên suốt cho CAB Core Ride-Hailing MVP. Mỗi test case truy xuất trực tiếp đến FR, NFR, EIR, UC hoặc AC trong SRS v2.2.

## 2. Phạm vi

Bao gồm tài khoản Customer/Driver, hồ sơ và phương tiện Driver, Booking, điều phối, Trip, Location, Fare, Payment, Notification, lịch sử, Rating, Operations, báo cáo, phân quyền, audit, retention, NFR và external interfaces.

## 3. Nguyên tắc

- Giá trị cấu hình được đọc từ môi trường kiểm thử; không cố định thêm timeout, số lần retry hoặc thời hạn lưu trữ ngoài SRS.
- Fare được kiểm tra theo đơn giá MVP: Bike 5.000 VNĐ/km, Car 4-seat 10.000 VNĐ/km, Car 7-seat 13.000 VNĐ/km.
- Rating thuộc luồng Customer/Trip; không xem là một hệ thống con độc lập.
- Payment và Notification phải được kiểm thử cô lập lỗi với Booking, Dispatch và Trip.
- Mọi lỗi phải có bằng chứng tái hiện và liên kết defect; không sửa expected result theo hành vi sai của build.

## 4. Danh mục test suite

| Suite | Tài liệu | Phạm vi chính | Số test |
| --- | --- | --- | ---: |
| TS01 | [TS01_Customer_Account_Management.md](TS01_Customer_Account_Management.md) | Đăng ký, đăng nhập, khôi phục mật khẩu và hồ sơ Customer. | 6 |
| TS02 | [TS02_Driver_Account_Vehicle_Availability.md](TS02_Driver_Account_Vehicle_Availability.md) | Hồ sơ Driver, OTP tự đăng ký, xác minh, phương tiện và trạng thái làm việc. | 9 |
| TS03 | [TS03_Create_Booking.md](TS03_Create_Booking.md) | Tạo Booking, kiểm tra đầu vào và danh sách Booking của Customer. | 5 |
| TS04 | [TS04_Driver_Search_Assignment.md](TS04_Driver_Search_Assignment.md) | Nearby, lọc, xếp hạng và gửi Assignment tuần tự. | 6 |
| TS05 | [TS05_Driver_Assignment_Response.md](TS05_Driver_Assignment_Response.md) | Chấp nhận, từ chối, hết hạn và cạnh tranh phản hồi Assignment. | 5 |
| TS06 | [TS06_Trip_Status_Management.md](TS06_Trip_Status_Management.md) | Theo dõi vòng đời, hủy và xử lý sự cố Trip. | 7 |
| TS07 | [TS07_Driver_Location.md](TS07_Driver_Location.md) | Tiếp nhận vị trí, kiểm tra độ mới và đồng bộ sau mất mạng. | 4 |
| TS08 | [TS08_Fare_Payment.md](TS08_Fare_Payment.md) | Tính cước, Payment tiền mặt/điện tử và replay. | 11 |
| TS09 | [TS09_Notification.md](TS09_Notification.md) | Thông báo theo mốc nghiệp vụ và xử lý lỗi nhà cung cấp. | 4 |
| TS10 | [TS10_Trip_History_Rating.md](TS10_Trip_History_Rating.md) | Lịch sử Trip và đánh giá Driver gồm sao và nhận xét. | 6 |
| TS11 | [TS11_Operations.md](TS11_Operations.md) | Tra cứu, giám sát, hỗ trợ và quản lý đơn giá của Operations Staff. | 6 |
| TS12 | [TS12_Authorization_Audit.md](TS12_Authorization_Audit.md) | Phân quyền phía server, JWT, audit và chính sách lưu trữ. | 7 |
| TS13 | [TS13_Operation_Report.md](TS13_Operation_Report.md) | Báo cáo vận hành từ dữ liệu đã ghi nhận. | 5 |
| TS14 | [TS14_Data_Integrity_Security.md](TS14_Data_Integrity_Security.md) | Bảo vệ dữ liệu, SQLi/XSS, toàn vẹn và chống sửa audit. | 9 |
| TS15 | [TS15_End_to_End_Critical_Scenarios.md](TS15_End_to_End_Critical_Scenarios.md) | Các luồng xuyên suốt trọng yếu của CAB Core Ride-Hailing MVP. | 6 |
| TS16 | [TS16_Non_Functional_Requirements.md](TS16_Non_Functional_Requirements.md) | Kiểm thử NFR-01–NFR-12 và rate limit. | 14 |
| TS17 | [TS17_External_Interfaces_Release.md](TS17_External_Interfaces_Release.md) | Kiểm thử EIR-01–EIR-06, health check và hợp đồng giao tiếp. | 8 |
| **Tổng** | **17 test suite** |  | **118** |

## 5. Bao phủ Acceptance Criteria

- AC-01–AC-33: TS01–TS14 và các luồng E2E tại TS15.
- AC-34–AC-45: TS16, với kiểm tra bảo mật/toàn vẹn bổ trợ tại TS12 và TS14.
- AC-46–AC-51: TS17.
- AC-52: TS15.
- Mọi AC-01–AC-52 đều có ít nhất một test case trực tiếp; các rủi ro trọng yếu có thêm test negative, concurrency, recovery hoặc idempotency.

## 6. Tiêu chí bắt đầu

- SRS v2.2 và API Specification v2.0 được đặt làm baseline.
- Build, môi trường, dữ liệu, tài khoản và sandbox tích hợp sẵn sàng.
- Các giá trị cấu hình dùng trong lần chạy được ghi nhận cùng test evidence.

## 7. Tiêu chí kết thúc

- 100% test P0 và toàn bộ AC-01–AC-52 đã được thực thi.
- Không còn defect P0/P1 mở ảnh hưởng luồng MVP; defect còn lại có quyết định chấp nhận rõ ràng.
- Kiểm thử regression, contract, recovery và E2E trọng yếu đạt.
- Báo cáo tổng kết liên kết được Requirement → AC → Test Case → kết quả → Defect.

## 8. Quy ước trạng thái

| Trạng thái | Ý nghĩa |
| --- | --- |
| Not Run | Chưa thực thi. |
| Pass | Kết quả thực tế khớp toàn bộ expected result. |
| Fail | Có ít nhất một expected result không đạt. |
| Blocked | Không thể thực thi vì phụ thuộc hoặc môi trường; phải ghi rõ nguyên nhân. |
