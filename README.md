# CAB System — Bộ tài liệu phân tích và thiết kế

Ngày cập nhật: 09/10/2026  
Trạng thái: Baseline phục vụ phát triển và kiểm thử CAB Core Ride-Hailing MVP.

## Baseline tài liệu

| Tài liệu | Phiên bản | Vai trò |
|---|---:|---|
| `srs.md` | 2.2 | Yêu cầu nghiệp vụ, phạm vi MVP, quy tắc, yêu cầu chức năng, yêu cầu phi chức năng và tiêu chí chấp nhận. |
| `Microservice.docx` | Theo SRS 2.2 | Thiết kế bounded context, microservice, giao tiếp và dữ liệu sở hữu. |
| `API Document/API specification` | 2.0 | Hợp đồng API cho Customer, Driver, Operations Staff và nhà cung cấp bên ngoài. |
| `Testcase` | 2.0 | Đặc tả 104 test case trong 17 test suite; chưa ghi nhận kết quả thực thi. |

Nguồn yêu cầu nghiệp vụ có thẩm quyền là `Customer-Requirement.docx` do người dùng cung cấp. File nguồn không nằm trong thư mục này.

## Thứ tự đọc

1. [SRS](srs.md)
2. [Microservice Design](Microservice.docx)
3. [Microservice Diagrams](Microservice-Diagrams/)
4. [API Specification](API%20Document/API%20specification/README.md)
5. [Test Case Specification](Testcase/CAB_Test_Cases.md)

Chuỗi tài liệu áp dụng: Customer Requirement → SRS → Microservice Design → API Specification → Test Case → Code.

## Phạm vi bộ tài liệu

- SRS 2.2 gồm 5 Business Goal, 21 Business Requirement, 62 Functional Requirement, 12 Non-Functional Requirement, 6 External Interface Requirement, 19 Use Case và 52 Acceptance Criterion.
- Microservice Design gồm 9 bounded context tương ứng 9 microservice, mỗi service sở hữu dữ liệu của mình.
- API Specification gồm 8 file đặc tả, bao phủ giao diện Customer, Driver, Operations, tích hợp Map/Route, Payment Provider và Notification Provider.
- Test Case Specification gồm 104 test case và bao phủ FR-01–FR-62, NFR-01–NFR-12, EIR-01–EIR-06 và AC-01–AC-52.

## Sơ đồ microservice

- `01-ERD-Tong-The.svg/png`: mô hình quan hệ dữ liệu nghiệp vụ tổng thể.
- `02-Bounded-Context.svg/png`: phân nhóm entity theo bounded context.
- `03-Kien-Truc-Microservice-Tong-The.svg/png`: kiến trúc microservice, database và giao tiếp.
- `04-Luong-Nghiep-Vu-Chinh.svg/png`: luồng chính từ Booking đến Payment và Notification.
- `05-Data-Ownership-Theo-Service.svg/png`: quyền sở hữu dữ liệu của từng service.

## Nguyên tắc sử dụng

- Yêu cầu và tiêu chí nghiệm thu được quản lý trong `srs.md`.
- Quyết định kỹ thuật được quản lý trong `Microservice.docx` và các sơ đồ kèm theo; không dùng thiết kế để tạo thêm yêu cầu nghiệp vụ.
- API phải tuân theo SRS và ranh giới sở hữu của Microservice Design.
- Test case truy vết về SRS và hợp đồng API. Trạng thái Pass/Fail chỉ được cập nhật sau khi thực thi kiểm thử.
- Thời hạn phản hồi Assignment, độ mới vị trí, retry và retention lấy từ cấu hình được phê duyệt; tài liệu không đặt giá trị cố định ngoài SRS.
