# TS14 — Data Integrity Security

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-67 — Kiểm chứng AC-67 — NFR-09

- Yêu cầu: NFR-09.
- Tiêu chí: AC-67.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-16
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Dữ liệu cá nhân, phương tiện, vị trí, giao dịch và tiêu chí bảo vệ OI-16; retention OI-06.

**Các bước:**

1. Thực hiện checklist bảo mật đã duyệt trên từng nhóm.
2. Kiểm tra quyền truy cập, lưu giữ và bằng chứng bảo vệ.

**Kết quả mong đợi:** Đánh giá và kiểm thử bảo mật đối với các nhóm dữ liệu theo tiêu chí bảo vệ; mọi tiêu chí áp dụng đều đạt.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-68 — Kiểm chứng AC-68 — NFR-10

- Yêu cầu: NFR-10.
- Tiêu chí: AC-68.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Giao dịch thành công/thất bại với dữ liệu thử provider; danh mục nhạy cảm OI-17.

**Các bước:**

1. Thực hiện thanh toán.
2. Kiểm tra kho dữ liệu, log và mọi nơi lưu thuộc CAB.
3. Tìm dữ liệu thử thuộc danh mục không được lưu.

**Kết quả mong đợi:** Sau các giao dịch thử thành công/thất bại, kiểm tra kho dữ liệu, nhật ký và các nơi lưu trữ thuộc CAB System; không có thông tin thuộc danh mục dữ liệu thanh toán nhạy cảm không được lưu.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-78 — Customer không truy cập dữ liệu ngoài quyền

- Yêu cầu: FR-56, NFR-09.
- Tiêu chí: AC-56, AC-67.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-08, OI-16, OI-18
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Hai Customer A/B có Booking, Trip và thanh toán riêng.

**Các bước:**

1. Dùng A truy xuất tài nguyên B.
2. Kiểm tra response và side effect.

**Kết quả mong đợi:** Không trả dữ liệu hoặc cho thao tác vượt quyền được duyệt.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-79 — Driver phản hồi assignment không gửi cho mình

- Yêu cầu: FR-16, FR-17, NFR-09.
- Tiêu chí: AC-16, AC-17, AC-67.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-08, OI-14, OI-16
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Assignment dành cho Driver A; Driver B xác thực.

**Các bước:**

1. B gửi phản hồi cho assignment của A.
2. Kiểm tra bản ghi và tiến trình điều phối.

**Kết quả mong đợi:** Không áp dụng phản hồi ngoài quyền; đề nghị không bị gán/từ chối bởi B.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-97 — Hết hạn dữ liệu theo retention

- Yêu cầu: FR-41, FR-50, FR-58, NFR-09.
- Tiêu chí: AC-41, AC-50, AC-58, AC-67.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-08, OI-16, OI-20
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Chính sách retention từng nhóm, dữ liệu trước/tại/sau biên hạn.

**Các bước:**

1. Dùng đồng hồ thử.
2. Thực hiện tra cứu và xử lý hết hạn.
3. Đối chiếu quy tắc từng nhóm.

**Kết quả mong đợi:** Dữ liệu được lưu/tra cứu/xử lý hết hạn theo chính sách, không đặt một thời hạn cho mọi nhóm.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
