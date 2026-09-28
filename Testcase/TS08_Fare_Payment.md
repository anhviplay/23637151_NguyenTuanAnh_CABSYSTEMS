# TS08 — Fare Payment

Baseline: [SRS v1.4](../srs.md). Quy ước và trạng thái: [CAB_Test_Cases.md](CAB_Test_Cases.md).

## TC-28 — Kiểm chứng AC-28 — FR-28

- Yêu cầu: FR-28.
- Tiêu chí: AC-28.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-01, OI-15
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Trip hoàn thành, thông tin dịch vụ/chuyến đầy đủ; số tiền chuẩn tính độc lập theo OI-01/OI-15.

**Các bước:**

1. Kích hoạt tính cước.
2. Đọc Fare.
3. Đối chiếu số tiền, tiền tệ và quy tắc làm tròn với kết quả chuẩn.

**Kết quả mong đợi:** Với Trip hoàn thành và bộ dữ liệu tính cước, số tiền hệ thống xác định khớp kết quả tính độc lập theo chính sách cước.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-29 — Kiểm chứng AC-29 — FR-29

- Yêu cầu: FR-29.
- Tiêu chí: AC-29.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: Không có OI riêng; cần dữ liệu và môi trường thử phù hợp.
- Trạng thái: Not Run.

**Tiền điều kiện và dữ liệu thử:** Trip có Fare đã xác định.

**Các bước:**

1. Customer xem cước trực tiếp và trong lịch sử nếu áp dụng.
2. Đối chiếu số tiền phải trả.

**Kết quả mong đợi:** Với Trip đã xác định được cước, số tiền Customer nhìn thấy trùng với số tiền phải trả của Trip.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-30 — Kiểm chứng AC-30 — FR-30

- Yêu cầu: FR-30.
- Tiêu chí: AC-30.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Trip có cước; quy trình và chủ thể xác nhận tiền mặt theo OI-17.

**Các bước:**

1. Chọn cash.
2. Thực hiện đúng các bước xác nhận nhận tiền.
3. Đối chiếu kết quả, không coi chọn phương thức là đã thu tiền.

**Kết quả mong đợi:** Customer sử dụng phương thức tiền mặt; việc ghi nhận kết quả thanh toán tuân theo quy trình xác nhận tiền mặt.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-31 — Kiểm chứng AC-31 — FR-31

- Yêu cầu: FR-31.
- Tiêu chí: AC-31.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Trip có cước; provider sandbox/adapter và credential hợp lệ theo OI-17.

**Các bước:**

1. Gửi yêu cầu electronic.
2. Quan sát request tại adapter.
3. Đối chiếu merchantReference, số tiền và kết quả trả về.

**Kết quả mong đợi:** Yêu cầu thanh toán điện tử được xử lý qua External Payment Provider; CAB System nhận được kết quả giao dịch.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-32 — Kiểm chứng AC-32 — FR-32

- Yêu cầu: FR-32.
- Tiêu chí: AC-32.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Hai giao dịch thử độc lập; provider trả lần lượt thành công và thất bại.

**Các bước:**

1. Gửi kết quả provider.
2. Truy vấn payment tương ứng.
3. Đối chiếu mã giao dịch, kết quả và thông tin Customer nhận.

**Kết quả mong đợi:** Với kết quả thành công hoặc thất bại do nhà cung cấp trả về, kết quả CAB System cung cấp tương ứng giao dịch đó.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-33 — Kiểm chứng AC-33 — FR-33

- Yêu cầu: FR-33.
- Tiêu chí: AC-33.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-12
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Một giao dịch điện tử nhận kết quả thất bại đã xác minh.

**Các bước:**

1. Ghi nhận failure.
2. Quan sát thông báo tới đúng Customer.
3. Đối chiếu paymentId.

**Kết quả mong đợi:** Khi External Payment Provider trả kết quả thất bại, Customer nhận được thông báo thanh toán thất bại.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-34 — Kiểm chứng AC-34 — FR-34

- Yêu cầu: FR-34.
- Tiêu chí: AC-34.
- Cơ sở: Source-derived qua SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-07, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Giao dịch thất bại đủ điều kiện xử lý lại theo OI-07/OI-17.

**Các bước:**

1. Yêu cầu xử lý lại.
2. Quan sát luồng được duyệt, định danh lần thử và kết quả.
3. Đối chiếu với chính sách.

**Kết quả mong đợi:** Với giao dịch thất bại đủ điều kiện theo chính sách, Customer có thể thực hiện luồng xử lý lại được cho phép.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-87 — Kết quả provider chưa xác định

- Yêu cầu: FR-32.
- Tiêu chí: AC-32.
- Cơ sở: Proposal kiểm thử thiết kế.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Provider tiếp nhận nhưng chưa có kết quả nghiệp vụ.

**Các bước:**

1. Khởi tạo payment.
2. Giữ trạng thái provider chưa biết.
3. Đọc kết quả CAB.

**Kết quả mong đợi:** Biểu diễn chưa xác định theo OI-17; không tự thành FAILED hoặc SUCCESS từ HTTP ACK.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-88 — Callback không được chứng thực

- Yêu cầu: FR-32, NFR-09.
- Tiêu chí: AC-32, AC-67.
- Cơ sở: Proposal kiểm thử thiết kế.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-16, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Cơ chế chứng thực provider được duyệt; callback giả hợp lệ về cấu trúc.

**Các bước:**

1. Gửi callback sai chứng thực.
2. Đọc payment.

**Kết quả mong đợi:** Không áp dụng kết quả không được xác minh; dữ liệu đã cam kết không đổi.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-89 — Callback trùng

- Yêu cầu: FR-32.
- Tiêu chí: AC-32.
- Cơ sở: Proposal kiểm thử thiết kế.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-12, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Hợp đồng dedup đã duyệt; một kết quả provider hợp lệ.

**Các bước:**

1. Gửi cùng eventId nhiều lần.
2. Kiểm tra payment và sự kiện downstream.

**Kết quả mong đợi:** Kết quả được ghi một lần về mặt tác dụng nghiệp vụ; bản trùng không tạo ghi nhận giao dịch/thông báo nghiệp vụ mới ngoài chính sách.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-90 — Callback cũ sau khi retry

- Yêu cầu: FR-32, FR-34.
- Tiêu chí: AC-32, AC-34.
- Cơ sở: Proposal kiểm thử thiết kế.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-07, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Hai attempt được phép theo OI-07/OI-17; kết quả lần đầu đến muộn.

**Các bước:**

1. Bắt đầu attempt sau.
2. Đưa kết quả attempt trước.
3. Đối chiếu lịch sử và kết quả tổng hợp.

**Kết quả mong đợi:** Đối chiếu đúng attempt, không ghi đè tùy ý; xử lý nghiệp vụ theo quyết định OI-17.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-91 — Yêu cầu retry đồng thời

- Yêu cầu: FR-34.
- Tiêu chí: AC-34.
- Cơ sở: Proposal kiểm thử thiết kế.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-06, OI-07, OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Retry đủ điều kiện và cơ chế key đã duyệt.

**Các bước:**

1. Gửi đồng thời cùng key.
2. Kiểm tra số attempt và request provider.

**Kết quả mong đợi:** Không nhân đôi attempt vì gửi lặp cùng thao tác kỹ thuật; số lần retry nghiệp vụ vẫn theo chính sách.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.

## TC-92 — Chọn tiền mặt chưa phải nhận tiền

- Yêu cầu: FR-30.
- Tiêu chí: AC-30.
- Cơ sở: Derived từ yêu cầu SRS.
- Ưu tiên: Theo ưu tiên release — OI-11.
- Điều kiện quyết định: OI-17
- Trạng thái: Chờ quyết định áp dụng / Not Run.

**Tiền điều kiện và dữ liệu thử:** Chủ thể/bằng chứng xác nhận tiền mặt đã duyệt.

**Các bước:**

1. Customer chọn cash nhưng chưa có bằng chứng nhận tiền.
2. Đọc kết quả.
3. Hoàn tất xác nhận theo quy trình.

**Kết quả mong đợi:** Kết quả phản ánh từng giai đoạn của quy trình đã duyệt, không đánh SUCCESS chỉ do chọn phương thức.

**Bằng chứng cần ghi:** dữ liệu đầu vào đã che thông tin nhạy cảm, định danh nghiệp vụ, phản hồi/hiển thị, dữ liệu sau xử lý và sự kiện liên quan. Ghi phiên bản quyết định OI và thiết kế áp dụng cùng kết quả thực thi.
