# Kế hoạch và danh mục Test Case CAB System

Phiên bản 1.0 — 27/09/2026. Baseline: [SRS v1.4](../srs.md). Trạng thái: Dự thảo kiểm thử; chưa thực thi.

## Quy ước

Bộ tài liệu gồm 107 Test Case: 75 case kiểm chứng trực tiếp AC-01–AC-75 và các case bổ sung về dữ liệu lỗi, quyền, tích hợp, cạnh tranh và E2E. Số lượng là coverage thiết kế, không phải số test đã pass. TC-01–TC-75 tương ứng AC cùng số; các TC tiếp theo là tình huống bổ sung.

Các file TS là nguồn chi tiết duy nhất; tài liệu này chỉ lập danh mục, không sao chép toàn bộ bảng Test Case để tránh lệch phiên bản. Không dùng bộ 140 TC của baseline cũ làm nguồn requirement.

Case phụ thuộc OI chỉ được thực thi nghiệm thu khi có quyết định tương ứng và dữ liệu chuẩn. Chờ quyết định không có nghĩa requirement bị bỏ; Not Run không có nghĩa đã pass. Case Proposal kiểm tra phương án kỹ thuật và chỉ áp dụng sau khi phương án đó được duyệt; không dùng để ép stakeholder chấp thuận nghiệp vụ mới.

## Chuẩn bị và thực thi

1. Ghi baseline SRS, phiên bản thiết kế/API, phạm vi release và quyết định OI áp dụng.
2. Chuẩn bị tài khoản Customer, Driver, Operations Staff và quyền thử; actor báo cáo theo OI-09. Dữ liệu thử dùng danh tính giả, không dùng credential/thẻ thật.
3. Chuẩn bị provider sandbox/stub, bộ dữ liệu cước/chỉ số chuẩn tính độc lập, đồng hồ thử và bộ Driver theo chính sách đã duyệt.
4. Chạy case, ghi actual result, bằng chứng và defect. Không ghi Pass nếu chỉ quan sát HTTP thành công mà chưa kiểm tra kết quả nghiệp vụ.
5. Case không thuộc release phải ghi Not Applicable cùng quyết định OI-11; case chưa chốt giữ Chờ quyết định. Không dùng N/A để che yêu cầu chưa hoàn thiện.

Test kết thúc theo AC-75 và điều kiện nghiệm thu SRS §12.4; chưa có mục tiêu tỷ lệ pass, ưu tiên release hoặc công thức KPI tự đặt.

## Danh mục nhóm

- [TS01 — Customer Account Management](TS01_Customer_Account_Management.md): 4 case.
- [TS02 — Driver Account Vehicle Availability](TS02_Driver_Account_Vehicle_Availability.md): 7 case.
- [TS03 — Create Booking](TS03_Create_Booking.md): 4 case.
- [TS04 — Driver Search Assignment](TS04_Driver_Search_Assignment.md): 4 case.
- [TS05 — Driver Assignment Response](TS05_Driver_Assignment_Response.md): 5 case.
- [TS06 — Trip Status Management](TS06_Trip_Status_Management.md): 9 case.
- [TS07 — Driver Location](TS07_Driver_Location.md): 2 case.
- [TS08 — Fare Payment](TS08_Fare_Payment.md): 13 case.
- [TS09 — Notification](TS09_Notification.md): 7 case.
- [TS10 — Trip History Rating](TS10_Trip_History_Rating.md): 4 case.
- [TS11 — Operations](TS11_Operations.md): 8 case.
- [TS12 — Authorization Audit](TS12_Authorization_Audit.md): 4 case.
- [TS13 — Operation Report](TS13_Operation_Report.md): 6 case.
- [TS14 — Data Integrity Security](TS14_Data_Integrity_Security.md): 5 case.
- [TS15 — End to End Critical Scenarios](TS15_End_to_End_Critical_Scenarios.md): 10 case.
- [TS16 — Non Functional Requirements](TS16_Non_Functional_Requirements.md): 8 case.
- [TS17 — External Interfaces Release](TS17_External_Interfaces_Release.md): 7 case.

## Phạm vi kiểm chứng còn cần quyết định

Trường dữ liệu tài khoản/đánh giá, điều phối, timeout, hủy, mất mạng, retention, quyền, thao tác vận hành, ngưỡng NFR, công thức báo cáo và provider chưa được tự hoàn thiện bằng giả định. Toàn bộ phụ thuộc nằm ở từng case và SRS §13. Hủy là khung E2E có điều kiện OI-04; đây không phải xác nhận Customer được hủy tại một trạng thái cố định.

API contract checks đối chiếu schema tại common.md và operation liên quan sau khi được duyệt; hiện chưa có OpenAPI hoặc code test tự động được tạo trong bộ Markdown này.
