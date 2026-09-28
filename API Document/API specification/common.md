# Quy ước và mô hình dữ liệu API

Phiên bản: 1.0 — 27/09/2026. Baseline: [SRS v1.4](../../srs.md). Trạng thái: Dự thảo để review, chưa phê duyệt.

Yêu cầu nghiệp vụ lấy từ SRS; endpoint, schema, service, cơ chế kỹ thuật và mã trạng thái trong tài liệu này là **Proposal**. Chúng không thay thế quyết định của các Open Issue. Initial Release Scope: TBD — OI-11.

## 1. Phạm vi hợp đồng

Tài liệu Markdown mô tả hợp đồng đề xuất, không phải OpenAPI có thể sinh client trực tiếp. Các operation có ID API-NN ổn định trong bộ tài liệu này; các ID FR/UC/AC giữ nguyên từ SRS. Base path HTTP đề xuất `/api/v1`; adapter port có tên `provider-adapter:*` hoặc `notification-adapter:*` không phải URL công khai.

Mỗi operation phải được review cùng file này. Body dùng JSON; ID là chuỗi opaque không có ý nghĩa cấp quyền. Trường thời gian dùng timestamp kèm múi giờ. Phiên bản, tên trường và HTTP status là quyết định kỹ thuật đề xuất.

## 2. Danh tính và quyền

- Đăng ký Customer/Driver và bước xác thực ban đầu không yêu cầu session có sẵn. Cơ chế chống lạm dụng/xác thực dữ liệu đầu vào được thiết kế sau OI-18; không suy ra chúng đã được nguồn yêu cầu xác nhận.
- Mọi chức năng yêu cầu tài khoản kiểm tra danh tính Customer/Driver theo FR-56. Cơ chế credential/session/token chờ OI-18; không mặc định JWT hoặc password 8 ký tự.
- Quyền đối tượng được kiểm tra trên server: Customer chỉ xem/thao tác tài nguyên được phép; Driver phản hồi assignment gửi cho mình và cập nhật Trip/phương tiện được phép. Các quyền chi tiết chờ OI-08/OI-14/OI-18.
- Operations Staff cần quyền cho từng action. Không có role Admin hay Leadership được tự xác nhận bởi tên file. Actor báo cáo chờ OI-09.
- Callback dùng chứng thực nhà cung cấp, không dùng session Customer. Adapter outbound dùng credential do CAB quản lý. Cơ chế ký, chứng thư hoặc thông tin xác thực cụ thể chờ OI-12/OI-17.

## 3. Quy tắc đọc schema

Các trường dưới đây là đề xuất giao tiếp để diễn đạt dữ liệu đã có trong SRS, không phải schema database. Các trường định danh đối tượng được trả về khi đối tượng tồn tại. Thành phần chưa có dữ liệu có trạng thái rõ ràng, không điền số 0 hoặc chuỗi rỗng thay cho kết quả chưa xác định. Các nhóm `profile`, `authenticationEnrollment`, `actionData`, `ratingData` chỉ nhận tập trường đã được định nghĩa sau OI tương ứng; không phải JSON tùy ý được phép ghi vào hệ thống.

| Type | Trường và kiểu đề xuất | Ràng buộc / OI |
| --- | --- | --- |
| ID | string opaque | Không giả định ID tăng dần; không dùng ID thay kiểm tra quyền |
| Place | locationRef hoặc dữ liệu địa điểm có cấu trúc | Điểm đón/đến bắt buộc về nghiệp vụ; biểu diễn địa chỉ/tọa độ chờ OI-18/OI-19 |
| Money | amount: decimal-string; currency: string | Khi tiền đã xác định phải có cả hai; scale/làm tròn/tiền tệ OI-01 |
| RegistrationInput | profile: bộ trường; authenticationEnrollment: bộ dữ liệu đăng ký xác thực | Trường bắt buộc, duy nhất, phương thức đăng ký OI-18 |
| AuthenticationInput | bộ dữ liệu chứng minh danh tính | Cơ chế Customer/Driver OI-18; không cố định email/phone |
| AccountReceipt | accountId: ID; actorCategory: Customer hoặc Driver; registrationOutcome | Không tự cấp quyền Operations Staff từ input |
| SessionReceipt | subjectId: ID; authenticationOutcome; dữ liệu phiên phù hợp cơ chế | Cách truyền, hết hạn và thu hồi OI-18; không tự đặt TTL |
| ProfilePatch / ProfileView | tập trường cá nhân được duyệt; ProfileView có subjectId | Trường được sửa và validation OI-18; quyền OI-08 |
| VehiclePatch / VehicleView | tập trường phương tiện; View có vehicleId và quan hệ Driver được phép xem | OI-18; không cho client sửa owner ngoài quyền |
| DriverView | driverId; profile được phép xem; WorkStatusView | OI-08/OI-18 |
| WorkStatusInput / WorkStatusView | activityStatus: nhãn theo danh mục; readiness: thông tin sẵn sàng | Trạng thái hoạt động OI-14; không có accountStatus hoặc role trong input |
| DriverStatusView | driverId; WorkStatusView; thông tin tài khoản nếu được cấp quyền | OI-08; field tài khoản chỉ đọc tại endpoint này |
| LocationInput | tọa độ theo hệ tọa độ được chọn; observedAt nếu nguồn hỗ trợ | Nếu chọn WGS84, giới hạn kỹ thuật lat/lon tương ứng; lựa chọn hệ tọa độ và độ mới OI-19 |
| LocationReceipt | locationId; driverId; receivedAt | Chỉ xác nhận sau khi ghi nhận/lưu; retention OI-06 |
| BookingInput | pickup: Place; destination: Place; vehicleTypeId: ID | Ba nhóm dữ liệu bắt buộc theo FR-11; danh mục OI-15, định dạng OI-18 |
| BookingView | bookingId; bookingStatus; assignedDriver nếu có; eta: ETAView; tripRefs: danh sách ID nếu đã liên kết; version | Tên mã trạng thái, thời điểm tạo Trip và cardinality OI-14; danh sách kỹ thuật không chốt quan hệ nhiều Trip |
| ETAView | availability: available hoặc unavailable; estimatedArrivalAt khi available; calculatedAt khi có | Thời gian dự kiến có múi giờ; phương pháp và độ mới OI-19. Giá trị unavailable không thay nghĩa thời gian đến bằng 0 |
| TripView | tripId; bookingRef nếu đã liên kết; milestone; assignedDriver; eta: ETAView; version | Mốc, quyền xem trường, quan hệ Booking OI-14/OI-08; dữ liệu mất kết nối OI-05 |
| AssignmentResponseReceipt | assignmentId; bookingId; responseRecorded; outcome | Phân biệt đã ghi phản hồi với đã gán Driver; chấp nhận muộn/đồng thời OI-14 |
| TripMilestoneInput | milestone; expectedVersion | Nhãn arrived/pickedUp/moving/completed là đề xuất ánh xạ mốc nguồn; không chốt các chuyển tiếp |
| FareView | tripId; availability; fareId và Money khi available | Chưa tính cước không là 0; công thức OI-01/OI-15 |
| PaymentInput | method: cash hoặc electronic | Không nhận amount hoặc dữ liệu thẻ nhạy cảm do Customer gửi; xác nhận cash OI-17 |
| PaymentView | paymentId; tripId; Money nếu đã xác định; method; businessOutcome; attempts: danh sách AttemptSummary được phép xem | Tập kết quả và quan hệ khoản phải thu OI-17 |
| AttemptSummary | attemptId; providerReference nếu có; result; recordedAt | Mỗi lần thử có lịch sử riêng; nhận diện lần thử không tự cho phép retry |
| RetryReceipt | paymentId; requestOutcome; attemptId nếu đã tạo | Điều kiện OI-07/OI-17; cùng idempotency key không tạo hai lần thử kỹ thuật |
| PaymentTransactionView | paymentId; attemptId; tripId; Money; providerReference; result; recordedAt | Không đưa credential, thẻ hoặc tài khoản thanh toán nhạy cảm vào response |
| TripHistoryItem | tripId; mốc thời gian; trạng thái; FareView | Danh mục hiển thị và dữ liệu còn hạn lưu OI-06/OI-18 |
| RatingInput / RatingReceipt | ratingData theo OI-10; receipt có ratingId, tripId và kết quả ghi nhận | Không mặc định điểm 1–5, một lần hoặc không được sửa |
| SupportActionInput | actionCode; actionData; expectedVersion | Action và quyền OI-20/OI-08; không chạy lệnh từ văn bản tự do |
| SupportActionReceipt | actionId; tripId; processingOutcome; resultingVersion nếu đã hoàn tất | 202 chỉ là tiếp nhận; kết quả xử lý phải truy vết được qua read model vận hành |
| ReportQuery | periodStart; periodEnd; metricKeys theo OI-09 | Múi giờ, biên kỳ và điều kiện dữ liệu OI-09 |
| OperationsReport | period; generatedAt; metrics: danh sách MetricResult | Actor và công thức OI-09 |
| MetricResult | metricKey; value khi có; unit; definitionVersion; dataAvailability; sourcePeriod | Có các nhóm số Trip/doanh thu/tỷ lệ hoàn thành/tỷ lệ hủy/hiệu quả Driver. Không tự quy dữ liệu thiếu thành 0 |
| Collection<T> | items: T[]; pageInfo: thông tin điều hướng | Cách phân trang, giới hạn và filters theo OI-20/OI-21 khi liên quan; không mặc định 100 bản ghi |
| ProviderPaymentCommand | paymentId; attemptId; merchantReference; Money; returnRoute | returnRoute cấu hình bởi CAB, không do người dùng tùy chọn |
| ProviderAcknowledgement | providerReference nếu đã cấp; acknowledgement; providerOutcome nếu đã xác định | ACK không tự là thanh toán thành công |
| ProviderResult | eventId; providerReference; merchantReference; providerOutcome; occurredAt; Money nếu provider cung cấp | Cần ánh xạ theo provider; OI-17; không xử lý giao dịch không đối chiếu được |
| NotificationCommand | notificationId; recipientRef; eventType; businessRef; nội dung được phép | OI-12; tối thiểu hóa dữ liệu cá nhân |
| DeliveryReceipt / DeliveryResult | notificationId; providerReference; providerStatus; eventId đối với callback | Phân biệt queued/sent/delivered theo khả năng thật; OI-12 |
| IntegrationReceipt | eventId; receiptOutcome: accepted hoặc duplicate | Chỉ ACK sau ghi bền vững; không phát tác dụng phụ lần nữa với event trùng |
| Error | code: string; message: string; correlationId: ID; fieldErrors khi phù hợp | Không chứa secret, dữ liệu nhạy cảm hoặc chi tiết nội bộ |

## 4. Phản hồi và xử lý lỗi chung

| HTTP đề xuất | Ý nghĩa | Dữ liệu và tác động |
| --- | --- | --- |
| 200 / 201 | Đọc/cập nhật hoặc tạo thành công | Body theo operation; chỉ báo thành công sau điều kiện lưu tương ứng |
| 202 | Đã tiếp nhận xử lý bất đồng bộ | Có định danh theo dõi; không đồng nghĩa nghiệp vụ hoàn tất |
| 400 / 422 | Không phân tích được request / dữ liệu không hợp lệ | Error; không ghi một phần yêu cầu bị từ chối |
| 401 | Chưa xác thực hoặc chứng thực không hợp lệ | Error; không thực hiện hành động được bảo vệ |
| 403 | Đã xác thực nhưng thiếu quyền | Error; không sửa dữ liệu hoặc phát sự kiện thành công |
| 404 | Đối tượng không tồn tại trong phạm vi truy cập | Error; chính sách che giấu tài nguyên phối hợp OI-08 |
| 409 | Xung đột phiên bản, thao tác không phù hợp chính sách hoặc key tái dùng với payload khác | Error; giữ trạng thái đã cam kết, không tự chọn kết quả nghiệp vụ |
| 503 | Phụ thuộc cần cho thao tác chưa sẵn sàng | Error; không suy ra thanh toán thất bại từ việc chưa biết kết quả |

Danh sách status là hợp đồng kỹ thuật chung; không tạo thêm nghiệp vụ bị cấm/được phép. Provider adapter ánh xạ lỗi theo hợp đồng thật, không giả định provider dùng đúng các status này.

## 5. Gửi lặp, cạnh tranh và bảo vệ dữ liệu

Idempotency-Key là đề xuất cho tạo Booking, payment, retry và ghi nhận command có nguy cơ lặp. Scope key gồm danh tính, operation và nội dung được fingerprint an toàn; key trùng/nội dung trùng trả kết quả đã ghi hoặc định danh đang xử lý; key trùng/nội dung khác trả xung đột. TTL/lưu kết quả chờ OI-06 và quyết định kỹ thuật; không tự đặt thời hạn. Khóa idempotency không thay thế quy tắc số Booking/đánh giá/retry được phép.

expectedVersion giúp phát hiện cập nhật cạnh tranh; consumer kiểm tra eventId để xử lý trùng an toàn. Không coi cơ chế này là phê duyệt first-wins, reconnect hoặc tập chuyển trạng thái. Callback không đối chiếu/chứng thực được không được áp dụng thành kết quả giao dịch; cách tiếp nhận để điều tra theo OI-17.

Thông tin thẻ/tài khoản nhạy cảm không đi qua payload thanh toán công khai của CAB; nếu tích hợp provider cần tương tác người dùng, phải dùng hình thức provider được duyệt tại OI-17. Không log toàn bộ request xác thực, payment callback hay secret. Kiểm thử phải xét cả kho dữ liệu và log.
