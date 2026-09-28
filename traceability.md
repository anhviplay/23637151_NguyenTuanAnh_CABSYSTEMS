# Truy vết thiết kế, API và kiểm thử

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

## 1. Quy tắc truy vết

Ma trận này mở rộng RTM của SRS v1.4, không thay thế RTM hoặc tạo requirement mới. Liên kết tới API mô tả phương án thực hiện; có liên kết không có nghĩa OI đã chốt hoặc đã bao phủ đầy đủ thao tác quản lý. Không quy đổi ID theo số thứ tự từ baseline repo cũ.

## 2. Functional Requirement

| FR | UC theo SRS | AC | Hợp đồng đề xuất / xử lý nội bộ | Test Case |
| --- | --- | --- | --- | --- |
| FR-01 | UC-01 | AC-01 | [API-01](API%20Document/API%20specification/customer.md) | [TC-01](Testcase/TS01_Customer_Account_Management.md), [TC-76](Testcase/TS01_Customer_Account_Management.md) |
| FR-02 | UC-02 | AC-02 | [API-02](API%20Document/API%20specification/customer.md) | [TC-02](Testcase/TS01_Customer_Account_Management.md) |
| FR-03 | UC-15 | AC-03 | [API-03](API%20Document/API%20specification/customer.md) | [TC-03](Testcase/TS01_Customer_Account_Management.md) |
| FR-04 | UC-03 | AC-04 | [API-13](API%20Document/API%20specification/driver.md) | [TC-04](Testcase/TS02_Driver_Account_Vehicle_Availability.md), [TC-76](Testcase/TS01_Customer_Account_Management.md) |
| FR-05 | UC-03 | AC-05 | [API-21](API%20Document/API%20specification/operator.md) | [TC-05](Testcase/TS02_Driver_Account_Vehicle_Availability.md) |
| FR-06 | UC-04 | AC-06 | [API-15](API%20Document/API%20specification/driver.md) | [TC-06](Testcase/TS02_Driver_Account_Vehicle_Availability.md) |
| FR-07 | UC-16 | AC-07 | [API-16](API%20Document/API%20specification/driver.md) | [TC-07](Testcase/TS02_Driver_Account_Vehicle_Availability.md) |
| FR-08 | UC-17 | AC-08 | [API-17](API%20Document/API%20specification/driver.md) | [TC-08](Testcase/TS02_Driver_Account_Vehicle_Availability.md), [TC-80](Testcase/TS02_Driver_Account_Vehicle_Availability.md) |
| FR-09 | UC-17 | AC-09 | [API-17](API%20Document/API%20specification/driver.md) | [TC-09](Testcase/TS02_Driver_Account_Vehicle_Availability.md) |
| FR-10 | UC-18 | AC-10 | [API-18](API%20Document/API%20specification/driver.md) | [TC-10](Testcase/TS07_Driver_Location.md), [TC-86](Testcase/TS07_Driver_Location.md) |
| FR-11 | UC-05 | AC-11 | [API-04](API%20Document/API%20specification/customer.md) | [TC-11](Testcase/TS03_Create_Booking.md), [TC-81](Testcase/TS03_Create_Booking.md), [TC-98](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-12 | UC-05 | AC-12 | [API-04](API%20Document/API%20specification/customer.md) | [TC-12](Testcase/TS03_Create_Booking.md), [TC-81](Testcase/TS03_Create_Booking.md), [TC-82](Testcase/TS03_Create_Booking.md), [TC-98](Testcase/TS15_End_to_End_Critical_Scenarios.md), [TC-104](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-13 | UC-05 | AC-13 | [Xử lý nội bộ](API%20Document/API%20specification/internal-contracts.md) | [TC-13](Testcase/TS04_Driver_Search_Assignment.md) |
| FR-14 | UC-05 | AC-14 | [Xử lý nội bộ](API%20Document/API%20specification/internal-contracts.md) | [TC-14](Testcase/TS04_Driver_Search_Assignment.md) |
| FR-15 | UC-05, UC-06 | AC-15 | [API-19](API%20Document/API%20specification/driver.md); [API-34](API%20Document/API%20specification/notification-provider.md); [API-35](API%20Document/API%20specification/notification-provider.md) | [TC-15](Testcase/TS05_Driver_Assignment_Response.md) |
| FR-16 | UC-05, UC-06 | AC-16 | [API-19](API%20Document/API%20specification/driver.md) | [TC-16](Testcase/TS05_Driver_Assignment_Response.md), [TC-79](Testcase/TS14_Data_Integrity_Security.md), [TC-84](Testcase/TS05_Driver_Assignment_Response.md), [TC-98](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-17 | UC-05, UC-06 | AC-17 | [API-19](API%20Document/API%20specification/driver.md) | [TC-17](Testcase/TS05_Driver_Assignment_Response.md), [TC-79](Testcase/TS14_Data_Integrity_Security.md), [TC-99](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-18 | UC-05 | AC-18 | [Xử lý nội bộ](API%20Document/API%20specification/internal-contracts.md) | [TC-18](Testcase/TS04_Driver_Search_Assignment.md), [TC-83](Testcase/TS05_Driver_Assignment_Response.md), [TC-100](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-19 | UC-05 | AC-19 | [API-05](API%20Document/API%20specification/customer.md) | [TC-19](Testcase/TS04_Driver_Search_Assignment.md), [TC-101](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-20 | UC-05, UC-07 | AC-20 | [API-05](API%20Document/API%20specification/customer.md) | [TC-20](Testcase/TS06_Trip_Status_Management.md) |
| FR-21 | UC-05, UC-06, UC-07 | AC-21 | [API-05](API%20Document/API%20specification/customer.md); [API-06](API%20Document/API%20specification/customer.md) | [TC-21](Testcase/TS06_Trip_Status_Management.md) |
| FR-22 | UC-07 | AC-22 | [API-05](API%20Document/API%20specification/customer.md); [API-06](API%20Document/API%20specification/customer.md) | [TC-22](Testcase/TS06_Trip_Status_Management.md), [TC-86](Testcase/TS07_Driver_Location.md) |
| FR-23 | UC-07, UC-08 | AC-23 | [API-06](API%20Document/API%20specification/customer.md) | [TC-23](Testcase/TS06_Trip_Status_Management.md), [TC-85](Testcase/TS06_Trip_Status_Management.md), [TC-86](Testcase/TS07_Driver_Location.md), [TC-105](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-24 | UC-08 | AC-24 | [API-20](API%20Document/API%20specification/driver.md) | [TC-24](Testcase/TS06_Trip_Status_Management.md), [TC-85](Testcase/TS06_Trip_Status_Management.md), [TC-98](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-25 | UC-08 | AC-25 | [API-20](API%20Document/API%20specification/driver.md) | [TC-25](Testcase/TS06_Trip_Status_Management.md), [TC-85](Testcase/TS06_Trip_Status_Management.md), [TC-98](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-26 | UC-08 | AC-26 | [API-20](API%20Document/API%20specification/driver.md) | [TC-26](Testcase/TS06_Trip_Status_Management.md), [TC-85](Testcase/TS06_Trip_Status_Management.md), [TC-98](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-27 | UC-08 | AC-27 | [API-20](API%20Document/API%20specification/driver.md) | [TC-27](Testcase/TS06_Trip_Status_Management.md), [TC-85](Testcase/TS06_Trip_Status_Management.md), [TC-98](Testcase/TS15_End_to_End_Critical_Scenarios.md), [TC-102](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-28 | UC-09 | AC-28 | [Xử lý nội bộ](API%20Document/API%20specification/internal-contracts.md) | [TC-28](Testcase/TS08_Fare_Payment.md), [TC-102](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-29 | UC-09, UC-10 | AC-29 | [API-07](API%20Document/API%20specification/customer.md); [API-11](API%20Document/API%20specification/customer.md) | [TC-29](Testcase/TS08_Fare_Payment.md), [TC-102](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-30 | UC-09 | AC-30 | [API-08](API%20Document/API%20specification/customer.md) | [TC-30](Testcase/TS08_Fare_Payment.md), [TC-92](Testcase/TS08_Fare_Payment.md), [TC-102](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-31 | UC-09 | AC-31 | [API-08](API%20Document/API%20specification/customer.md); [API-31](API%20Document/API%20specification/payment-provider.md) | [TC-31](Testcase/TS08_Fare_Payment.md), [TC-103](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-32 | UC-09 | AC-32 | [API-09](API%20Document/API%20specification/customer.md); [API-32](API%20Document/API%20specification/payment-provider.md); [API-33](API%20Document/API%20specification/payment-provider.md) | [TC-32](Testcase/TS08_Fare_Payment.md), [TC-87](Testcase/TS08_Fare_Payment.md), [TC-88](Testcase/TS08_Fare_Payment.md), [TC-89](Testcase/TS08_Fare_Payment.md), [TC-90](Testcase/TS08_Fare_Payment.md), [TC-103](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-33 | UC-09 | AC-33 | [API-32](API%20Document/API%20specification/payment-provider.md); [API-34](API%20Document/API%20specification/notification-provider.md); [API-35](API%20Document/API%20specification/notification-provider.md) | [TC-33](Testcase/TS08_Fare_Payment.md), [TC-103](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-34 | UC-09 | AC-34 | [API-10](API%20Document/API%20specification/customer.md) | [TC-34](Testcase/TS08_Fare_Payment.md), [TC-90](Testcase/TS08_Fare_Payment.md), [TC-91](Testcase/TS08_Fare_Payment.md), [TC-103](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-35 | UC-05 | AC-35 | [API-34](API%20Document/API%20specification/notification-provider.md); [API-35](API%20Document/API%20specification/notification-provider.md) | [TC-35](Testcase/TS09_Notification.md) |
| FR-36 | UC-05, UC-06, UC-07 | AC-36 | [API-34](API%20Document/API%20specification/notification-provider.md); [API-35](API%20Document/API%20specification/notification-provider.md) | [TC-36](Testcase/TS09_Notification.md) |
| FR-37 | UC-08 | AC-37 | [API-34](API%20Document/API%20specification/notification-provider.md); [API-35](API%20Document/API%20specification/notification-provider.md) | [TC-37](Testcase/TS09_Notification.md) |
| FR-38 | UC-08 | AC-38 | [API-34](API%20Document/API%20specification/notification-provider.md); [API-35](API%20Document/API%20specification/notification-provider.md) | [TC-38](Testcase/TS09_Notification.md) |
| FR-39 | UC-09 | AC-39 | [API-09](API%20Document/API%20specification/customer.md); [API-32](API%20Document/API%20specification/payment-provider.md); [API-34](API%20Document/API%20specification/notification-provider.md); [API-35](API%20Document/API%20specification/notification-provider.md) | [TC-39](Testcase/TS09_Notification.md), [TC-103](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-40 | UC-08 | AC-40 | [API-34](API%20Document/API%20specification/notification-provider.md); [API-35](API%20Document/API%20specification/notification-provider.md) | [TC-40](Testcase/TS09_Notification.md) |
| FR-41 | UC-10 | AC-41 | [API-11](API%20Document/API%20specification/customer.md) | [TC-41](Testcase/TS10_Trip_History_Rating.md), [TC-97](Testcase/TS14_Data_Integrity_Security.md), [TC-106](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-42 | UC-11 | AC-42 | [API-12](API%20Document/API%20specification/customer.md) | [TC-42](Testcase/TS10_Trip_History_Rating.md), [TC-94](Testcase/TS10_Trip_History_Rating.md), [TC-95](Testcase/TS10_Trip_History_Rating.md), [TC-106](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-43 | UC-12 | AC-43 | [API-22](API%20Document/API%20specification/operator.md); thao tác ghi chờ OI-20 | [TC-43](Testcase/TS11_Operations.md) |
| FR-44 | UC-12 | AC-44 | [API-23](API%20Document/API%20specification/operator.md); thao tác ghi chờ OI-20 | [TC-44](Testcase/TS11_Operations.md) |
| FR-45 | UC-12 | AC-45 | [API-24](API%20Document/API%20specification/operator.md); thao tác ghi chờ OI-20 | [TC-45](Testcase/TS11_Operations.md) |
| FR-46 | UC-12 | AC-46 | [API-25](API%20Document/API%20specification/operator.md); thao tác ghi chờ OI-20 | [TC-46](Testcase/TS11_Operations.md) |
| FR-47 | UC-12 | AC-47 | [API-26](API%20Document/API%20specification/operator.md) | [TC-47](Testcase/TS11_Operations.md) |
| FR-48 | UC-12 | AC-48 | [API-27](API%20Document/API%20specification/operator.md) | [TC-48](Testcase/TS11_Operations.md) |
| FR-49 | UC-12 | AC-49 | [API-28](API%20Document/API%20specification/operator.md) | [TC-49](Testcase/TS11_Operations.md) |
| FR-50 | UC-13 | AC-50 | [API-29](API%20Document/API%20specification/operator.md) | [TC-50](Testcase/TS11_Operations.md), [TC-97](Testcase/TS14_Data_Integrity_Security.md) |
| FR-51 | UC-14 | AC-51 | [API-30](API%20Document/API%20specification/leadership.md) | [TC-51](Testcase/TS13_Operation_Report.md), [TC-96](Testcase/TS13_Operation_Report.md) |
| FR-52 | UC-14 | AC-52 | [API-30](API%20Document/API%20specification/leadership.md) | [TC-52](Testcase/TS13_Operation_Report.md), [TC-96](Testcase/TS13_Operation_Report.md) |
| FR-53 | UC-14 | AC-53 | [API-30](API%20Document/API%20specification/leadership.md) | [TC-53](Testcase/TS13_Operation_Report.md), [TC-96](Testcase/TS13_Operation_Report.md) |
| FR-54 | UC-14 | AC-54 | [API-30](API%20Document/API%20specification/leadership.md) | [TC-54](Testcase/TS13_Operation_Report.md), [TC-96](Testcase/TS13_Operation_Report.md), [TC-107](Testcase/TS15_End_to_End_Critical_Scenarios.md) |
| FR-55 | UC-14 | AC-55 | [API-30](API%20Document/API%20specification/leadership.md) | [TC-55](Testcase/TS13_Operation_Report.md), [TC-96](Testcase/TS13_Operation_Report.md) |
| FR-56 | UC-02 | AC-56 | [API-02](API%20Document/API%20specification/customer.md); [API-14](API%20Document/API%20specification/driver.md) | [TC-56](Testcase/TS12_Authorization_Audit.md), [TC-77](Testcase/TS12_Authorization_Audit.md), [TC-78](Testcase/TS14_Data_Integrity_Security.md) |
| FR-57 | UC-03, UC-12 | AC-57 | [API-21](API%20Document/API%20specification/operator.md); [API-22](API%20Document/API%20specification/operator.md); [API-23](API%20Document/API%20specification/operator.md); [API-24](API%20Document/API%20specification/operator.md); [API-25](API%20Document/API%20specification/operator.md); [API-26](API%20Document/API%20specification/operator.md); [API-27](API%20Document/API%20specification/operator.md); [API-28](API%20Document/API%20specification/operator.md); [API-29](API%20Document/API%20specification/operator.md) | [TC-57](Testcase/TS12_Authorization_Audit.md), [TC-80](Testcase/TS02_Driver_Account_Vehicle_Availability.md) |
| FR-58 | Xử lý nội bộ khi phát sinh thao tác thuộc danh mục audit | AC-58 | [Xử lý nội bộ](API%20Document/API%20specification/internal-contracts.md) | [TC-58](Testcase/TS12_Authorization_Audit.md), [TC-97](Testcase/TS14_Data_Integrity_Security.md) |

## 3. Toàn bộ tiêu chí chấp nhận

| AC | Yêu cầu | Case chính | Phụ thuộc quyết định theo SRS |
| --- | --- | --- | --- |
| AC-01 | FR-01 | [TC-01](Testcase/TS01_Customer_Account_Management.md) | Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-02 | FR-02 | [TC-02](Testcase/TS01_Customer_Account_Management.md) | Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-03 | FR-03 | [TC-03](Testcase/TS01_Customer_Account_Management.md) | Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-04 | FR-04 | [TC-04](Testcase/TS02_Driver_Account_Vehicle_Availability.md) | Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-05 | FR-05 | [TC-05](Testcase/TS02_Driver_Account_Vehicle_Availability.md) | Danh mục chức năng và quyền truy cập (OI-08); Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-06 | FR-06 | [TC-06](Testcase/TS02_Driver_Account_Vehicle_Availability.md) | Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-07 | FR-07 | [TC-07](Testcase/TS02_Driver_Account_Vehicle_Availability.md) | Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-08 | FR-08 | [TC-08](Testcase/TS02_Driver_Account_Vehicle_Availability.md) | Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-09 | FR-09 | [TC-09](Testcase/TS02_Driver_Account_Vehicle_Availability.md) | — |
| AC-10 | FR-10 | [TC-10](Testcase/TS07_Driver_Location.md) | Cơ chế tiếp nhận, chất lượng vị trí và phương pháp ước tính thời gian đến (OI-19); Thời hạn lưu dữ liệu liên quan (OI-06) |
| AC-11 | FR-11 | [TC-11](Testcase/TS03_Create_Booking.md) | Danh mục loại xe/dịch vụ và kịch bản mở rộng (OI-15); Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-12 | FR-12 | [TC-12](Testcase/TS03_Create_Booking.md) | Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-13 | FR-13 | [TC-13](Testcase/TS04_Driver_Search_Assignment.md) | Tiêu chí lựa chọn và thứ tự ưu tiên Driver (OI-02) |
| AC-14 | FR-14 | [TC-14](Testcase/TS04_Driver_Search_Assignment.md) | Tiêu chí lựa chọn và thứ tự ưu tiên Driver (OI-02) |
| AC-15 | FR-15 | [TC-15](Testcase/TS05_Driver_Assignment_Response.md) | Kênh, nội dung và mốc thông báo (OI-12) |
| AC-16 | FR-16 | [TC-16](Testcase/TS05_Driver_Assignment_Response.md) | Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-17 | FR-17 | [TC-17](Testcase/TS05_Driver_Assignment_Response.md) | — |
| AC-18 | FR-18 | [TC-18](Testcase/TS04_Driver_Search_Assignment.md) | Thời hạn phản hồi và điều kiện không phản hồi (OI-03) |
| AC-19 | FR-19 | [TC-19](Testcase/TS04_Driver_Search_Assignment.md) | Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-20 | FR-20 | [TC-20](Testcase/TS06_Trip_Status_Management.md) | — |
| AC-21 | FR-21 | [TC-21](Testcase/TS06_Trip_Status_Management.md) | — |
| AC-22 | FR-22 | [TC-22](Testcase/TS06_Trip_Status_Management.md) | Cơ chế tiếp nhận, chất lượng vị trí và phương pháp ước tính thời gian đến (OI-19) |
| AC-23 | FR-23 | [TC-23](Testcase/TS06_Trip_Status_Management.md) | Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-24 | FR-24 | [TC-24](Testcase/TS06_Trip_Status_Management.md) | Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-25 | FR-25 | [TC-25](Testcase/TS06_Trip_Status_Management.md) | Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-26 | FR-26 | [TC-26](Testcase/TS06_Trip_Status_Management.md) | Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-27 | FR-27 | [TC-27](Testcase/TS06_Trip_Status_Management.md) | Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-28 | FR-28 | [TC-28](Testcase/TS08_Fare_Payment.md) | Quy tắc và dữ liệu đầu vào tính cước (OI-01); Danh mục loại xe/dịch vụ và kịch bản mở rộng (OI-15) |
| AC-29 | FR-29 | [TC-29](Testcase/TS08_Fare_Payment.md) | — |
| AC-30 | FR-30 | [TC-30](Testcase/TS08_Fare_Payment.md) | Nhà cung cấp, giao tiếp và chính sách thanh toán liên quan (OI-17) |
| AC-31 | FR-31 | [TC-31](Testcase/TS08_Fare_Payment.md) | Nhà cung cấp, giao tiếp và chính sách thanh toán liên quan (OI-17) |
| AC-32 | FR-32 | [TC-32](Testcase/TS08_Fare_Payment.md) | Nhà cung cấp, giao tiếp và chính sách thanh toán liên quan (OI-17) |
| AC-33 | FR-33 | [TC-33](Testcase/TS08_Fare_Payment.md) | Kênh, nội dung và mốc thông báo (OI-12) |
| AC-34 | FR-34 | [TC-34](Testcase/TS08_Fare_Payment.md) | Điều kiện và luồng xử lý lại thanh toán (OI-07); Nhà cung cấp, giao tiếp và chính sách thanh toán liên quan (OI-17) |
| AC-35 | FR-35 | [TC-35](Testcase/TS09_Notification.md) | Kênh, nội dung và mốc thông báo (OI-12) |
| AC-36 | FR-36 | [TC-36](Testcase/TS09_Notification.md) | Kênh, nội dung và mốc thông báo (OI-12) |
| AC-37 | FR-37 | [TC-37](Testcase/TS09_Notification.md) | Kênh, nội dung và mốc thông báo (OI-12) |
| AC-38 | FR-38 | [TC-38](Testcase/TS09_Notification.md) | Kênh, nội dung và mốc thông báo (OI-12) |
| AC-39 | FR-39 | [TC-39](Testcase/TS09_Notification.md) | Kênh, nội dung và mốc thông báo (OI-12); Nhà cung cấp, giao tiếp và chính sách thanh toán liên quan (OI-17) |
| AC-40 | FR-40 | [TC-40](Testcase/TS09_Notification.md) | Kênh, nội dung và mốc thông báo (OI-12) |
| AC-41 | FR-41 | [TC-41](Testcase/TS10_Trip_History_Rating.md) | Thời hạn lưu dữ liệu liên quan (OI-06) |
| AC-42 | FR-42 | [TC-42](Testcase/TS10_Trip_History_Rating.md) | Quy tắc ghi nhận đánh giá (OI-10) |
| AC-43 | FR-43 | [TC-43](Testcase/TS11_Operations.md) | Danh mục chức năng và quyền truy cập (OI-08); Danh mục thao tác vận hành và tiêu chí tra cứu (OI-20) |
| AC-44 | FR-44 | [TC-44](Testcase/TS11_Operations.md) | Danh mục chức năng và quyền truy cập (OI-08); Danh mục thao tác vận hành và tiêu chí tra cứu (OI-20) |
| AC-45 | FR-45 | [TC-45](Testcase/TS11_Operations.md) | Danh mục chức năng và quyền truy cập (OI-08); Danh mục thao tác vận hành và tiêu chí tra cứu (OI-20) |
| AC-46 | FR-46 | [TC-46](Testcase/TS11_Operations.md) | Danh mục chức năng và quyền truy cập (OI-08); Danh mục thao tác vận hành và tiêu chí tra cứu (OI-20) |
| AC-47 | FR-47 | [TC-47](Testcase/TS11_Operations.md) | Danh mục chức năng và quyền truy cập (OI-08); Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-48 | FR-48 | [TC-48](Testcase/TS11_Operations.md) | Danh mục chức năng và quyền truy cập (OI-08) |
| AC-49 | FR-49 | [TC-49](Testcase/TS11_Operations.md) | Danh mục chức năng và quyền truy cập (OI-08); Danh mục thao tác vận hành và tiêu chí tra cứu (OI-20) |
| AC-50 | FR-50 | [TC-50](Testcase/TS11_Operations.md) | Thời hạn lưu dữ liệu liên quan (OI-06); Danh mục chức năng và quyền truy cập (OI-08); Danh mục thao tác vận hành và tiêu chí tra cứu (OI-20) |
| AC-51 | FR-51 | [TC-51](Testcase/TS13_Operation_Report.md) | Định nghĩa chỉ số, công thức, dữ liệu và kỳ báo cáo (OI-09) |
| AC-52 | FR-52 | [TC-52](Testcase/TS13_Operation_Report.md) | Định nghĩa chỉ số, công thức, dữ liệu và kỳ báo cáo (OI-09) |
| AC-53 | FR-53 | [TC-53](Testcase/TS13_Operation_Report.md) | Định nghĩa chỉ số, công thức, dữ liệu và kỳ báo cáo (OI-09); Trạng thái và quy tắc chuyển tiếp liên quan (OI-14) |
| AC-54 | FR-54 | [TC-54](Testcase/TS13_Operation_Report.md) | Định nghĩa và chính sách hủy (OI-04); Định nghĩa chỉ số, công thức, dữ liệu và kỳ báo cáo (OI-09) |
| AC-55 | FR-55 | [TC-55](Testcase/TS13_Operation_Report.md) | Định nghĩa chỉ số, công thức, dữ liệu và kỳ báo cáo (OI-09) |
| AC-56 | FR-56 | [TC-56](Testcase/TS12_Authorization_Audit.md) | Danh mục chức năng và quyền truy cập (OI-08); Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18) |
| AC-57 | FR-57 | [TC-57](Testcase/TS12_Authorization_Audit.md) | Danh mục chức năng và quyền truy cập (OI-08) |
| AC-58 | FR-58 | [TC-58](Testcase/TS12_Authorization_Audit.md) | Thời hạn lưu dữ liệu liên quan (OI-06); Tiêu chí bảo vệ dữ liệu và danh mục, nội dung audit (OI-16) |
| AC-59 | NFR-01 | [TC-59](Testcase/TS16_Non_Functional_Requirements.md) | Kịch bản kiểm chứng, thước đo và ngưỡng chất lượng (OI-13) |
| AC-60 | NFR-02 | [TC-60](Testcase/TS16_Non_Functional_Requirements.md) | Kịch bản kiểm chứng, thước đo và ngưỡng chất lượng (OI-13) |
| AC-61 | NFR-03 | [TC-61](Testcase/TS16_Non_Functional_Requirements.md) | Kịch bản kiểm chứng, thước đo và ngưỡng chất lượng (OI-13) |
| AC-62 | NFR-04 | [TC-62](Testcase/TS16_Non_Functional_Requirements.md) | Kịch bản kiểm chứng, thước đo và ngưỡng chất lượng (OI-13) |
| AC-63 | NFR-05 | [TC-63](Testcase/TS16_Non_Functional_Requirements.md) | Danh mục loại xe/dịch vụ và kịch bản mở rộng (OI-15) |
| AC-64 | NFR-06 | [TC-64](Testcase/TS16_Non_Functional_Requirements.md) | Nhà cung cấp, giao tiếp và chính sách thanh toán liên quan (OI-17) |
| AC-65 | NFR-07 | [TC-65](Testcase/TS16_Non_Functional_Requirements.md) | Kênh, nội dung và mốc thông báo (OI-12) |
| AC-66 | NFR-08 | [TC-66](Testcase/TS16_Non_Functional_Requirements.md) | Kịch bản kiểm chứng, thước đo và ngưỡng chất lượng (OI-13) |
| AC-67 | NFR-09 | [TC-67](Testcase/TS14_Data_Integrity_Security.md) | Thời hạn lưu dữ liệu liên quan (OI-06); Tiêu chí bảo vệ dữ liệu và danh mục, nội dung audit (OI-16) |
| AC-68 | NFR-10 | [TC-68](Testcase/TS14_Data_Integrity_Security.md) | Danh mục dữ liệu thanh toán nhạy cảm không được lưu (OI-17) |
| AC-69 | EIR-01 | [TC-69](Testcase/TS17_External_Interfaces_Release.md) | Nền tảng và giao diện sử dụng (OI-21) |
| AC-70 | EIR-02 | [TC-70](Testcase/TS17_External_Interfaces_Release.md) | Trường dữ liệu, quy tắc đầu vào và cơ chế xác thực (OI-18); Nền tảng và giao diện sử dụng (OI-21) |
| AC-71 | EIR-03 | [TC-71](Testcase/TS17_External_Interfaces_Release.md) | Danh mục chức năng và quyền truy cập (OI-08); Danh mục thao tác vận hành và tiêu chí tra cứu (OI-20); Nền tảng và giao diện sử dụng (OI-21) |
| AC-72 | EIR-04 | [TC-72](Testcase/TS17_External_Interfaces_Release.md) | Điều kiện và luồng xử lý lại thanh toán (OI-07); Nhà cung cấp, giao tiếp và chính sách thanh toán liên quan (OI-17) |
| AC-73 | EIR-05 | [TC-73](Testcase/TS17_External_Interfaces_Release.md) | Quy tắc xử lý mất kết nối (OI-05); Cơ chế tiếp nhận, chất lượng vị trí và phương pháp ước tính thời gian đến (OI-19) |
| AC-74 | EIR-06 | [TC-74](Testcase/TS17_External_Interfaces_Release.md) | Kênh, nội dung và mốc thông báo (OI-12) |
| AC-75 | CON-01 | [TC-75](Testcase/TS17_External_Interfaces_Release.md) | Phạm vi release, mốc bắt đầu và thủ tục nghiệm thu (OI-11) |

## 4. Chất lượng, giao tiếp và release

NFR-01–NFR-08 được thiết kế tại Micro-service.docx §2, §5–§6 và kiểm chứng bởi AC-59–AC-66/TS16. NFR-09/NFR-10 gắn kiểm soát dữ liệu tại common.md §2/§5, Micro-service.md §6 và TS14. EIR-01–EIR-03 áp dụng các API Customer/Driver/Operations cùng giao diện OI-21; EIR-04 áp dụng payment-provider.md; EIR-05 áp dụng vị trí Driver; EIR-06 áp dụng notification-provider.md. TS17 đối chiếu AC-69–AC-75, gồm CON-01.

## 5. Quản lý thay đổi

Nếu OI có quyết định mới, cập nhật baseline SRS và trạng thái phê duyệt trước hoặc cùng thay đổi downstream được phê duyệt; sau đó sửa service/schema/operation/case liên quan. Không đánh dấu test Pass chỉ vì tài liệu có đủ liên kết. Nếu sửa ID phải cập nhật tất cả file tham chiếu trong một phiên bản.
