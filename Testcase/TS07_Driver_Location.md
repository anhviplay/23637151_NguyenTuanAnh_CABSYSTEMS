# TS07 — Driver Location

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-10 — Kiểm chứng AC-10 — FR-10

- Yêu cầu: FR-10.
- Tiêu chí: AC-10.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-19
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Driver đã xác thực; bản ghi vị trí hợp lệ và thời điểm theo OI-19.

**Các bước:**

1. Gửi vị trí.
2. Ghi locationId.
3. Truy vấn bằng chứng lưu sau tiếp nhận.
4. Đối chiếu driverId và giá trị.
5. Dùng dữ liệu trong luồng tìm Driver/ước tính ETA.

**Kết quả mong đợi:** Khi nhận dữ liệu vị trí hợp lệ, CAB System ghi nhận và lưu dữ liệu gắn với Driver tương ứng; kiểm tra sau bước tiếp nhận xác nhận dữ liệu đã được lưu và có thể được truy xuất để phục vụ tìm Driver, ước tính thời gian đến.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-86 — Vị trí đến muộn và mất kết nối

- Yêu cầu: FR-10, FR-22, FR-23.
- Tiêu chí: AC-10, AC-22, AC-23.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-05, OI-06, OI-14, OI-19
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Hai vị trí có thời điểm quan sát khác nhau; chính sách OI-05/OI-19.

**Các bước:**

1. Gửi vị trí mới rồi vị trí cũ.
2. Ngắt/khôi phục kết nối.
3. Quan sát lưu trữ, ETA và Trip.

**Kết quả mong đợi:** Áp dụng chính sách được duyệt; không tự coi vị trí tới sau là mới nhất hoặc tự đặt quy tắc reconnect.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
