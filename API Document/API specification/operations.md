# API Operations Staff

Actor phải có vai trò `OPERATIONS`. Mỗi operation kiểm tra permission cụ thể; tài liệu không tạo các role Support hoặc Manager cố định. Thao tác nhạy cảm phải ghi audit.

## OPS-01 Tạo hồ sơ Driver

- **Operation:** `POST /api/v1/operations/drivers`
- **Truy xuất:** FR-06; UC-05; AC-03
- **Body:** thông tin tài khoản, hồ sơ và phương tiện bắt buộc
- **Kết quả:** `201` với Driver `PENDING_VERIFICATION`

## OPS-02 Cập nhật trạng thái xác minh Driver

- **Operation:** `PATCH /api/v1/operations/drivers/{driverId}/verification`
- **Truy xuất:** FR-07; UC-06; AC-04
- **Body:** `decision` nhận `ACTIVE` hoặc `REJECTED`, `reason`, `expectedVersion`
- **Kết quả:** `200`; luôn tạo audit

## OPS-03 Tra cứu Customer

- **Operation:** `GET /api/v1/operations/customers`
- **Truy xuất:** FR-49; UC-17; AC-28
- **Query:** `keyword`, `status`, `page`, `pageSize`

## OPS-04 Tra cứu Driver và phương tiện

- **Operations:** `GET /api/v1/operations/drivers`, `GET /api/v1/operations/vehicles`
- **Truy xuất:** FR-49; UC-17; AC-28
- **Query:** trạng thái xác minh, availability, service type và từ khóa

## OPS-05 Tra cứu Booking và Trip

- **Operations:** `GET /api/v1/operations/bookings`, `GET /api/v1/operations/trips`
- **Truy xuất:** FR-49; UC-17; AC-28
- **Query:** khoảng thời gian, trạng thái, service type, Customer hoặc Driver

## OPS-06 Xem Trip đang diễn ra

- **Operation:** `GET /api/v1/operations/active-trips`
- **Truy xuất:** FR-51; UC-17; AC-28
- **Kết quả:** trạng thái Trip, Driver, Customer, vị trí cập nhật gần nhất và thời điểm nhận vị trí

## OPS-07 Tra cứu Payment

- **Operation:** `GET /api/v1/operations/payments`
- **Truy xuất:** FR-49, FR-52; UC-17; AC-28
- **Query:** `paymentId`, `tripId`, `method`, `status`, `providerReference`, khoảng thời gian
- **Kết quả:** trạng thái Payment; không trả dữ liệu thanh toán nhạy cảm

## OPS-08 Ghi nhận hỗ trợ vận hành

- **Operation:** `POST /api/v1/operations/cases`
- **Truy xuất:** FR-31, FR-42, FR-50; UC-14, UC-15, UC-17; AC-17, AC-23, AC-28
- **Body:** `caseType`, `targetType`, `targetId`, `reason`, `action`, `expectedVersion`
- **Kết quả:** `201` hoặc `202` với `caseId`, trạng thái xử lý và audit reference
- **Quy tắc:** action chỉ được thực hiện khi permission và trạng thái mục tiêu cho phép

## OPS-09 Quản lý đơn giá/km

- **Operations:** `GET /api/v1/operations/service-rates`, `POST /api/v1/operations/service-rates`
- **Truy xuất:** FR-53; UC-17; AC-29
- **Body tạo:** `serviceType`, `pricePerKm`, `effectiveFrom`, `reason`
- **Quy tắc:** thay đổi không tính lại Fare đã xác định; mức MVP hiện hành là BIKE 5.000, CAR_4 10.000 và CAR_7 13.000 VNĐ/km

## OPS-10 Báo cáo hoạt động

- **Operation:** `GET /api/v1/operations/reports`
- **Truy xuất:** FR-54, FR-55, FR-56, FR-57, FR-58; UC-18; AC-30
- **Query:** `from`, `to`, `serviceType`, `driverId`, `metric`
- **Metric:** số Booking/Trip, doanh thu Payment thành công, tỷ lệ hoàn thành/hủy và hiệu quả Driver
- **Kết quả:** dữ liệu tổng hợp nhất quán từ read model vận hành

## OPS-11 Tra cứu audit

- **Operation:** `GET /api/v1/operations/audit-entries`
- **Truy xuất:** FR-60, FR-61; UC-19; AC-32
- **Query:** actor, action, target, khoảng thời gian, correlation ID
- **Kết quả:** bản ghi chỉ đọc gồm actor, action, target, trước/sau, lý do và thời điểm

## OPS-12 Phân quyền bắt buộc

FR-59 và AC-31 áp dụng cho mọi operation trong file này. Truy cập trái quyền trả `403`; API không trả dữ liệu mục tiêu và ghi sự kiện an ninh phù hợp.
