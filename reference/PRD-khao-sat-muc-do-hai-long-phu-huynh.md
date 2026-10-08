# [PH-15] Khảo sát mức độ hài lòng của Phụ huynh

| Priority | MUST HAVE |
|---|---|
| **Document Status** | READY FOR REVIEW |
| **Document Owner** | diem.vo@finviet.com.vn |
| **Created date** | 09 Jul 2026 |
| **Last Updated** | 08 Oct 2026 |
| **Reviewer** | hieu.vo1@finviet.com.vn |

### Lịch sử tài liệu

| Phiên bản | Mức thay đổi | Nội dung | Ngày | Phụ trách tài liệu |
|---|---|---|---|---|
| 1.0 | All | Khởi tạo tài liệu đặc tả ban đầu | 09 Jul 2026 | diem.vo@finviet.com.vn |
| 2.0 | Major | Cập nhật toàn bộ logic nghiệp vụ mới:<br>1. Bổ sung Entry Point 2: Card cố định "Khảo sát & Đóng góp" tại màn hình Chi tiết Học sinh (không hiển thị badge Mới/Đã hoàn thành).<br>2. Cập nhật quy tắc đóng Bottom sheet: lùi **7 ngày dương lịch** tính theo mốc **00:00** nửa đêm (thay vì 14 ngày/2 tuần).<br>3. Cập nhật chu kỳ khảo sát định kỳ: **60 ngày** kể từ lần gửi gần nhất (thay vì 3 tháng).<br>4. Chuẩn hóa nội dung mô tả, nhãn nút "Làm khảo sát", "Để sau", vị trí icon đóng (X) góc trên phải và thiết kế Bottom sheet chuẩn. | 08 Oct 2026 | diem.vo@finviet.com.vn<br>hieu.vo1@finviet.com.vn |

---

### Mục lục

- **1. Thông tin tổng quan**
  - 1.1 Giới thiệu chung
  - 1.2 Mục tiêu
  - 1.3 Phạm vi
  - 1.4 Tài liệu tham khảo
- **2. Tổng quan nghiệp vụ**
  - 2.1 Mô hình hóa nghiệp vụ
  - 2.2 Mô tả các bước nghiệp vụ & Quy tắc tính ngày
- **3. Đặc tả tính năng**
  - 3.1 Phân rã chức năng
  - 3.2 Use cases
    - UC-01: Hiển thị & tương tác Bottom sheet khảo sát (Entry Point 1)
    - UC-02: Truy cập khảo sát từ Màn hình Chi tiết Học sinh (Entry Point 2)
    - UC-03: Trả lời & Gửi khảo sát (Survey Form)
- **4. Giao diện người dùng**
  - 4.1 Bảng đặc tả chi tiết giao diện (Kèm ảnh chụp màn hình Prototype)
- **5. Tiêu chí nghiệm thu (Acceptance Criteria - AC)**

---

## 1. Thông tin tổng quan

### 1.1 Giới thiệu chung
Tính năng khảo sát cho phép thu thập định kỳ mức độ hài lòng (**CSAT**) và khả năng giới thiệu (**NPS**) của phụ huynh đối với ứng dụng ECO School, thông qua **2 điểm chạm (Entry Points)** trong ứng dụng:
1. **Entry Point 1:** Bottom sheet nhắc nhở khảo sát ngắn gọn, tự động xuất hiện sau **30 giây** khi phụ huynh mở ứng dụng ECO Me (dành cho phụ huynh đủ điều kiện và chưa gửi khảo sát trong 60 ngày gần nhất).
2. **Entry Point 2:** Card cố định "Khảo sát & Đóng góp" tại màn hình Chi tiết Học sinh (nằm ngay dưới cụm "Chỉ số sức khoẻ" và trên cụm "Hoạt động gần đây"), luôn luôn sẵn sàng để phụ huynh chủ động đóng góp ý kiến bất kỳ lúc nào.

### 1.2 Mục tiêu
- Thu thập định kỳ chỉ số CSAT và NPS từ phụ huynh thực tế để đo lường mức độ hài lòng và mức độ gắn kết với sản phẩm ECO School.
- Bổ sung câu hỏi mở (open-ended) để thu thập ý kiến định tính, giúp đội ngũ phát triển sản phẩm hiểu rõ nguyên nhân cốt lõi đằng sau các con số định lượng (GA4/Mixpanel) và đưa ra quyết định cải tiến chính xác.
- Tối ưu trải nghiệm phụ huynh: không gây phiền toái nhờ cơ chế hoãn thông minh (giữ ẩn 7 ngày dương lịch nếu phụ huynh đóng/bỏ qua, và không hiển thị lại trong 60 ngày sau khi đã hoàn thành khảo sát).

### 1.3 Phạm vi
- **Nền tảng:** ECO Me (Ứng dụng ECO School dành cho Phụ huynh - iOS & Android).

### 1.4 Tài liệu tham khảo

| STT | Loại tài liệu | Đường dẫn / Mô tả |
|---|---|---|
| 1 | Tài liệu Business (BRD) | `https://docs.google.com/document/d/1c-xw5x__64M32vg4HsT5XyHfi0_G2QP9q78gnyw1ABg/edit?usp=sharing` |
| 2 | Google Sheet lưu câu trả lời | `Worksheet ID: 1vF-jcfseKAEAX5w0PESEDM2xxTZJ9-9QgQ_q8Qx7-S8/edit?usp=sharing` |
| 3 | Prototype & UI Reference | Bản mẫu trực tiếp trên codebase Next.js (`web/components/parents/survey/`) |
| 4 | Data Contracts & API | Local storage state & Async Google Sheets integration |

---

## 2. Tổng quan nghiệp vụ

### 2.1 Mô hình hóa nghiệp vụ
Hệ thống theo dõi thời điểm kích hoạt học sinh (`firstKidActivationDate`), lịch sử gửi khảo sát gần nhất (`lastSubmission`), và lịch sử tương tác đóng/hoãn của phụ huynh (`lastDismissedAt`) để kiểm soát tự động việc hiển thị:
- **Ngưỡng điều kiện kích hoạt:** Phụ huynh chỉ được coi là đủ điều kiện tham gia khảo sát khi đã kích hoạt học sinh đầu tiên từ **14 ngày trở lên** (≥ 14 ngày).
- **Chu kỳ gửi lại:** Sau khi phụ huynh gửi khảo sát thành công, hệ thống ẩn hoàn toàn Bottom sheet nhắc nhở trong vòng **60 ngày** kể từ ngày gửi.
- **Chu kỳ hiển thị lại sau khi hoãn:** Nếu phụ huynh đóng Bottom sheet, hệ thống sẽ ẩn Bottom sheet trong vòng **7 ngày dương lịch**. Ngày được tính tăng thêm 1 mỗi khi thời gian bước qua mốc **00:00:00** nửa đêm.
- **Tính khả dụng thường trực tại Màn hình Học sinh:** Card "Khảo sát & Đóng góp" tại Màn hình Chi tiết Học sinh luôn luôn hiển thị cho mọi phụ huynh đã kích hoạt học sinh ≥ 14 ngày, cho phép phụ huynh chủ động gửi khảo sát bất kỳ thời điểm nào mà không phụ thuộc vào trạng thái đóng của Bottom sheet.

### 2.2 Mô tả các bước nghiệp vụ & Quy tắc tính ngày

1. **Ghi nhận thời điểm kích hoạt học sinh:**
   - Hệ thống ghi nhận timestamp kích hoạt của học sinh đầu tiên (sớm nhất) thuộc tài khoản phụ huynh.
   - Nếu chưa kích hoạt học sinh nào, hoặc thời gian kích hoạt chưa đủ 14 ngày: Không hiển thị Bottom sheet và không hiển thị Card khảo sát.

2. **Quy tắc đếm 30 giây trong phiên (Session In-App Timing):**
   - Khi phụ huynh mở ứng dụng ECO Me, bộ đếm thời gian bắt đầu chạy.
   - Nếu phụ huynh ở trong ứng dụng liên tục đủ **30 giây**, hệ thống kiểm tra điều kiện trigger để hiển thị Bottom sheet.
   - Nếu phụ huynh thoát app trước 30 giây, thời gian đếm sẽ được đặt lại từ đầu vào lần mở app tiếp theo.

3. **Quy tắc tính 7 ngày dương lịch qua mốc 00:00 (Midnight Cutoff Rule):**
   - Khi phụ huynh đóng Bottom sheet (bằng nút đóng (X), nút "Để sau", hoặc chạm ra vùng nền ngoài), hệ thống lưu timestamp `lastDismissedAt`.
   - Một "ngày" được tính là hoàn tất khi mốc thời gian thực vượt qua **00:00:00** nửa đêm (Local Midnight).
   - Số ngày đã trôi qua được tính bằng chênh lệch ngày giữa ngày hiện tại và ngày đóng sheet:
     DaysDiff = StartOfDay(Today) - StartOfDay(DismissedDate)
   - **Ví dụ cụ thể:**
     - Phụ huynh mở app lần đầu và đóng Bottom sheet vào **19:00 ngày 08/10**.
     - Lúc 23:59 ngày 08/10: Chênh lệch là 0 ngày → Ẩn.
     - Lúc 00:01 ngày 09/10: Vượt qua mốc 00:00 lần thứ nhất = 1 ngày → Ẩn.
     - Lúc 23:59 ngày 14/10: Đã qua 6 lần 00:00 = 6 ngày → Ẩn.
     - Lúc **08:00 ngày 15/10**: Đã qua đúng 7 lần mốc 00:00 = **7 ngày** → **Bottom sheet tự động xuất hiện lại!**

4. **Quy tắc khảo sát lại sau 60 ngày:**
   - Sau khi phụ huynh nhấn "Gửi khảo sát" thành công, hệ thống lưu `submittedAt` và xóa cờ `lastDismissedAt`.
   - Trong vòng **60 ngày** kể từ thời điểm gửi, Bottom sheet trên trang chủ sẽ không xuất hiện.
   - Sau 60 ngày, Bottom sheet sẽ được kích hoạt lại theo chu kỳ thông thường.

---

## 3. Đặc tả tính năng

### 3.1 Phân rã chức năng

| Epic | Feature | Platform | Priority | User Story | Status |
|---|---|---|---|---|---|
| Đo lường trải nghiệm Phụ huynh | Khảo sát mức độ hài lòng của Phụ huynh | App ECO Me (iOS, Android, Web) | MUST HAVE | Là Phụ huynh, tôi muốn đóng góp ý kiến về chất lượng ứng dụng ECO School để nhà trường và đội ngũ phục vụ con tôi tốt hơn. | APPROVED / COMPLETED |

---

### 3.2 Use cases

#### UC-01: Hiển thị & tương tác Bottom sheet nhắc khảo sát (Entry Point 1)

| Thuộc tính | Chi tiết đặc tả |
|---|---|
| **Use case ID** | UC-01 |
| **Use case name** | Hiển thị & tương tác Bottom sheet nhắc khảo sát |
| **Actor** | Phụ huynh |
| **Trigger** | Phụ huynh mở ứng dụng ECO Me và ở lại trong app đủ 30 giây khi thỏa mãn đồng thời các điều kiện trigger. |
| **Pre-condition** | 1. Phụ huynh đã kích hoạt ít nhất 1 học sinh ≥ 14 ngày.<br>2. Chưa từng gửi khảo sát HOẶC lần gửi gần nhất đã cách đây ≥ 60 ngày.<br>3. Chưa từng đóng Bottom sheet HOẶC lần đóng gần nhất đã qua ≥ 7 ngày dương lịch (qua 7 lần mốc 00:00).<br>4. Phụ huynh đang ở màn hình trang chủ ECO Me. |
| **Happy path** | 1. Phụ huynh mở app ECO Me.<br>2. Sau 30 giây, hệ thống kiểm tra và xác nhận đủ điều kiện hiển thị.<br>3. Hệ thống hiển thị Bottom sheet khảo sát trượt từ đáy màn hình với 2 CTA: "Làm khảo sát" (nút chính màu đen) và "Để sau" (nút phụ chữ xám).<br>4a. **Phụ huynh bấm "Làm khảo sát":** Hệ thống đóng Bottom sheet và điều hướng đến màn hình Survey Form (xem UC-03).<br>4b. **Phụ huynh bấm "Để sau":** Hệ thống đóng Bottom sheet, lưu lastDismissedAt, lên lịch hiển thị lại sau đúng 7 ngày dương lịch.<br>4c. **Phụ huynh bấm nút đóng (X) hoặc chạm ra vùng nền ngoài (scrim):** Hệ thống đóng Bottom sheet và xử lý giống bước 4b (lưu lastDismissedAt, hẹn hiển thị lại sau 7 ngày dương lịch). |
| **Exception** | - Phụ huynh kích hoạt học sinh < 14 ngày: Không hiển thị.<br>- Phụ huynh đóng app trước khi đủ 30 giây: Hủy timer phiên hiện tại; lần mở app tiếp theo sẽ đếm lại từ 0. |
| **Post-condition** | Bottom sheet được đóng; thời điểm đóng hoặc điều hướng được cập nhật chính xác vào bộ nhớ hệ thống. |

---

#### UC-02: Truy cập khảo sát từ Màn hình Chi tiết Học sinh (Entry Point 2)

| Thuộc tính | Chi tiết đặc tả |
|---|---|
| **Use case ID** | UC-02 |
| **Use case name** | Truy cập khảo sát từ Màn hình Chi tiết Học sinh |
| **Actor** | Phụ huynh |
| **Trigger** | Phụ huynh truy cập màn hình Học sinh (StudentScreen) và bấm vào Card "Khảo sát & Đóng góp". |
| **Pre-condition** | 1. Phụ huynh đã kích hoạt học sinh đang chọn ≥ 14 ngày.<br>2. Phụ huynh đang mở màn hình Chi tiết Học sinh. |
| **Happy path** | 1. Phụ huynh mở màn hình Chi tiết Học sinh, cuộn xuống dưới phần "Chỉ số sức khoẻ" và trên phần "Hoạt động gần đây".<br>2. Hệ thống hiển thị Card khảo sát cố định:<br>- **Trường hợp chưa gửi khảo sát:** Tiêu đề "Đóng góp ý kiến cho ECO School", phụ đề "Chỉ 1 phút — Chia sẻ cảm nhận để nâng cao chất lượng ứng dụng", nhãn hành động "Bắt đầu >". (Không có badge "Mới").<br>- **Trường hợp đã từng gửi khảo sát:** Tiêu đề "Đã gửi ý kiến đóng góp", hiển thị thời gian gửi "Lần gửi gần nhất: DD/MM/YYYY lúc HH:mm", nhãn hành động "Gửi lại >". (Không có badge "Đã hoàn thành").<br>3. Phụ huynh nhấn vào Card.<br>4. Hệ thống điều hướng phụ huynh sang màn hình Survey Form (UC-03). |
| **Business Rules** | Card này **luôn luôn hiển thị** bất kể phụ huynh có vừa đóng Bottom sheet ở UC-01 hay không, đảm bảo phụ huynh luôn có lối vào chủ động khi muốn phản ánh ý kiến. |

---

#### UC-03: Trả lời & Gửi khảo sát (Survey Form)

| Thuộc tính | Chi tiết đặc tả |
|---|---|
| **Use case ID** | UC-03 |
| **Use case name** | Trả lời & Gửi khảo sát |
| **Actor** | Phụ huynh |
| **Trigger** | Phụ huynh mở Survey Form từ UC-01 hoặc UC-02 và bấm "Gửi khảo sát". |
| **Pre-condition** | Phụ huynh đang ở màn hình Survey Form. |
| **Happy path** | 1. Hệ thống hiển thị form khảo sát gồm 3 câu hỏi:<br>- **Câu 1 (CSAT - Bắt buộc):** "Bạn hãy đánh giá mức độ hài lòng của mình khi sử dụng ECO School:". Thang điểm 0–10 dạng nút tròn. Kèm ô nhập lý do (tùy chọn, tối đa 255 ký tự).<br>- **Câu 2 (NPS - Bắt buộc):** "Bạn có sẵn sàng giới thiệu ECO School cho những phụ huynh khác không?". Thang điểm 0–10 dạng nút tròn. Kèm ô nhập lý do (tùy chọn, tối đa 255 ký tự).<br>- **Câu 3 (Ý kiến mở - Tùy chọn):** "Bạn vui lòng chia sẻ thêm những ý kiến khác về ứng dụng ECO School." (Tối đa 255 ký tự).<br>2. Phụ huynh chọn điểm cho Câu 1 và Câu 2.<br>3. Hệ thống kích hoạt nút "Gửi khảo sát" từ trạng thái Disable sang Enable.<br>4. Phụ huynh nhấn "Gửi khảo sát".<br>5. Hệ thống lưu kết quả, cập nhật lastSubmission và reset lastDismissedAt.<br>6. Hệ thống hiển thị Toast xác nhận: "Gửi khảo sát thành công. Cảm ơn bạn đã dành thời gian chia sẻ ý kiến."<br>7. Hệ thống tự động đóng màn hình khảo sát và đưa phụ huynh quay trở lại màn hình trước đó. |
| **Exception** | - Chưa chọn điểm Câu 1 hoặc Câu 2: Nút "Gửi khảo sát" luôn ở trạng thái Disable.<br>- Mất kết nối mạng khi gửi: Hệ thống lưu cục bộ (local queue) và thử lại nền (retry async), hiển thị Toast thông báo thành công để không làm gián đoạn trải nghiệm của phụ huynh. |
| **Post-condition** | Dữ liệu được lưu trữ, Card ở Màn hình Học sinh cập nhật thời gian vừa gửi, Bottom sheet nhắc nhở bị ẩn trong 60 ngày tiếp theo. |

---

## 4. Giao diện người dùng

### 4.1 Bảng đặc tả chi tiết giao diện (Kèm ảnh chụp màn hình Prototype)

| Màn hình | Field/Component | Format | Description | Note |
|---|---|---|---|---|
| **Màn hình 1: Bottom sheet nhắc khảo sát (Trang chủ ECO Me)**<br><br>![Bottom sheet nhắc khảo sát](reference/screenshots/screen_1_bottom_sheet.png) | Lớp nền mờ (Scrim) | Overlay Background | Nền tối mờ (rgba(0,0,0,0.45)) phủ toàn bộ màn hình phía sau. Chặn thao tác với các thành phần phía sau. Bấm vào lớp nền sẽ đóng sheet và ghi nhận hoãn 7 ngày. | Như hiện tại |
| | Khung Bottom Sheet | Bottom Sheet Container | Neo cố định ở cạnh đáy (bottom: 0, left: 0, right: 0), bo 2 góc trên (border-radius: 24px 24px 0 0), hiệu ứng trượt từ dưới lên (slideUp). Nền trắng, shadow nổi. | Chuẩn mobile bottom sheet |
| | Nút đóng (X) | Icon Button | Nằm cố định ở góc trên cùng bên phải của Bottom Sheet (top: 14px; right: 14px;). Nhấn vào sẽ đóng sheet và ghi nhận sự kiện hoãn 7 ngày. | Cố định góc trên phải |
| | Icon chủ đề | Icon Circle | Hình bong bóng đối thoại nằm trong vòng tròn xám (#f0f0f0), viền #e6e6e6, kích thước 56x56px, căn giữa. | Nhận diện tính năng |
| | Tiêu đề nhắc nhở | Heading Text | "Trải nghiệm ECO School của bạn thế nào?" (Font chữ đậm, cỡ 16.5px, màu #111111, căn giữa). | Bắt buộc |
| | Nội dung mô tả | Body Text | "Hãy dành 1 phút chia sẻ cảm nhận để chúng tôi cải thiện ứng dụng và phục vụ con bạn tốt hơn." (Cỡ chữ 13.5px, màu xám đậm #595959, căn giữa). | Nội dung chuẩn mới |
| | CTA "Làm khảo sát" | Primary Button | Nền màu đen (#000000), chữ trắng, bo tròn viền. Nhấn vào sẽ mở Survey Form. | Nút chính |
| | CTA "Để sau" | Secondary Button | Dạng text button màu xám (#737373). Nhấn vào sẽ đóng sheet và ghi nhận hoãn 7 ngày dương lịch. | Nút phụ hoãn 7 ngày |
| **Màn hình 2: Card Khảo sát & Đóng góp (Màn hình Chi tiết Học sinh)**<br><br>![Card Khảo sát & Đóng góp](reference/screenshots/screen_2_student_card.png) | Section Heading | Section Title | Hiển thị tiêu đề "Khảo sát & Đóng góp" thuần túy. Tuyệt đối không hiển thị badge nhãn "Mới" hoặc "Đã hoàn thành". | Luôn hiển thị nếu ≥ 14 ngày |
| | Card tổng thể | Action Card | Thẻ viền xám nhạt, bo góc 12px, nền trắng. Nằm cố định giữa mục "Chỉ số sức khoẻ" và "Hoạt động gần đây" trong StudentScreen. Bấm vào mở Survey Form. | Entry Point 2 |
| | Icon thẻ | Icon Box | Icon trang tài liệu (trạng thái chưa gửi) hoặc icon tích xanh hoàn thành (trạng thái đã gửi). | Trực quan trạng thái |
| | Tiêu đề Card | Title Text | Chưa gửi: "Đóng góp ý kiến cho ECO School". Đã gửi: "Đã gửi ý kiến đóng góp". | Tự động đổi theo trạng thái |
| | Phụ đề / Thời gian | Subtitle Text | Chưa gửi: "Chỉ 1 phút — Chia sẻ cảm nhận để nâng cao chất lượng ứng dụng". Đã gửi: "Lần gửi gần nhất: DD/MM/YYYY lúc HH:mm". | Ghi nhận thời gian thực |
| | Nút hành động | Action Link | Chưa gửi: "Bắt đầu >". Đã gửi: "Gửi lại >". Màu đen đậm kèm chevron mũi tên. | Lối vào chủ động |
| **Màn hình 3: Màn hình Biểu mẫu Khảo sát (Survey Form)**<br><br>![Biểu mẫu Khảo sát](reference/screenshots/screen_3_survey_form.png) | Nút quay lại [<] | Icon Button | Icon mũi tên quay lại ở góc trên bên trái. Nhấn vào đóng form quay về màn hình trước đó, không lưu nháp. | Điều hướng |
| | Tiêu đề Header | Header Text | Tiêu đề "Khảo sát ý kiến" căn giữa thanh điều hướng trên cùng. | Bắt buộc |
| | Thẻ giới thiệu | Info Card | Thẻ nền xám nhạt với nội dung: "Ý kiến của bạn giúp chúng tôi cải thiện ECO School mỗi ngày. Vui lòng dành ít phút trả lời các câu hỏi ngắn dưới đây." | Hướng dẫn |
| | Câu 1: Điểm CSAT | Mandatory Scale | Badge số 1 + Câu hỏi mức độ hài lòng. Thang điểm từ 0 đến 10 dạng các nút tròn. Hai đầu có nhãn "Rất không hài lòng" (0) và "Rất hài lòng" (10). Bắt buộc chọn. | Câu hỏi cốt lõi |
| | Lý do CSAT | Text Area | Ô nhập lý do (không bắt buộc). Có placeholder và bộ đếm ký tự thực tế (tối đa 255 ký tự). | Định tính |
| | Câu 2: Điểm NPS | Mandatory Scale | Badge số 2 + Câu hỏi khả năng giới thiệu. Thang điểm từ 0 đến 10 dạng nút tròn. Hai đầu có nhãn "Không bao giờ" (0) và "Chắc chắn giới thiệu" (10). Bắt buộc chọn. | Câu hỏi cốt lõi |
| | Lý do NPS | Text Area | Ô nhập lý do (không bắt buộc). Có placeholder và bộ đếm ký tự thực tế (tối đa 255 ký tự). | Định tính |
| | Câu 3: Ý kiến đóng góp khác | Text Area | Badge số 3 + Câu hỏi mở chia sẻ thêm ý kiến. Không bắt buộc, tối đa 255 ký tự. | Tùy chọn |
| | Nút "Gửi khảo sát" | Primary Sticky Button | Nút cố định ở chân màn hình. Mặc định Disable (màu xám nhạt). Chỉ chuyển sang Enable (màu đen) khi phụ huynh đã chọn điểm cả Câu 1 và Câu 2. | Validation bắt buộc |
| **Màn hình 4: Thông báo gửi thành công (Toast Confirmation)**<br><br>![Toast gửi thành công](reference/screenshots/screen_4_toast.png) | Toast thông báo | Floating Toast | Banner thông báo nổi với nền xám đen mờ, bo góc, xuất hiện ngay sau khi nhấn Gửi thành công. | Phản hồi tức thì |
| | Nội dung Toast | Text | "Gửi khảo sát thành công. Cảm ơn bạn đã dành thời gian chia sẻ ý kiến." | Thông điệp cảm ơn |
| | Tự động điều hướng | Navigation Auto | Tự động biến mất sau 2.4 giây và đưa phụ huynh trở về màn hình trước đó (Home hoặc Chi tiết học sinh). | Trải nghiệm mượt mà |
| | Cập nhật dữ liệu ngầm | Background Sync | Lưu kết quả vào hệ thống, cập nhật timestamp trên Card học sinh, kích hoạt thời gian bảo lưu 60 ngày không hiển thị Bottom sheet. | Đồng bộ ngầm |

---

## 5. Tiêu chí nghiệm thu (Acceptance Criteria - AC)

### AC-01: Điều kiện kích hoạt hiển thị (Eligibility Gate)
- **Áp dụng:** Phụ huynh đã kích hoạt học sinh đầu tiên (sớm nhất) ≥ 14 ngày.
- **Điều kiện chặn:** Chưa kích hoạt học sinh HOẶC thời gian kích hoạt < 14 ngày → Ẩn cả Bottom sheet (Home) và Card (Chi tiết học sinh).

---

### AC-02: Trigger Bottom Sheet tại Trang chủ (Entry Point 1)
- **Thời gian chờ trong app:** Phụ huynh ở trong ứng dụng liên tục đủ **30 giây** → Bottom sheet tự động trượt lên.
- **Thoát trước 30s:** Không hiển thị; đếm lại từ đầu vào phiên mở app tiếp theo.
- **Điều kiện hiển thị đồng thời:**
  1. Đã kích hoạt học sinh ≥ 14 ngày.
  2. Chưa từng gửi khảo sát HOẶC lần gửi gần nhất đã qua ≥ 60 ngày.
  3. Chưa từng đóng sheet HOẶC lần đóng gần nhất đã qua ≥ 7 ngày dương lịch.

---

### AC-03: Cơ chế đóng & Hoãn 7 ngày dương lịch (00:00 Cutoff)
- **Thao tác kích hoạt hoãn:** Bấm nút đóng (X), bấm "Để sau", hoặc chạm ra ngoài vùng nền mờ (scrim).
- **Xử lý hệ thống:** Đóng sheet ngay lập tức và lưu timestamp `lastDismissedAt`.
- **Quy tắc tính ngày:** Mỗi lần thời gian thực vượt qua mốc **00:00:00** nửa đêm được tính là 1 ngày.
- **Thời điểm xuất hiện lại:** Chỉ xuất hiện lại khi đã vượt qua mốc 00:00 đúng **7 lần** (≥ 7 ngày dương lịch).
  *(Ví dụ: Đóng 19:00 ngày 08/10 → Vẫn ẩn đến hết 14/10 → Xuất hiện lại từ 08:00 ngày 15/10).*

---

### AC-04: Card cố định tại Màn hình Học sinh (Entry Point 2)
- **Vị trí:** Cố định giữa "Chỉ số sức khoẻ" và "Hoạt động gần đây" trong `StudentScreen`.
- **Tiêu đề Section:** Chỉ hiển thị chữ `"Khảo sát & Đóng góp"`, **không có badge nhãn** ("Mới" / "Đã hoàn thành").
- **Trạng thái chưa gửi:**
  - Tiêu đề: *"Đóng góp ý kiến cho ECO School"*
  - Phụ đề: *"Chỉ 1 phút — Chia sẻ cảm nhận để nâng cao chất lượng ứng dụng"*
  - Nút hành động: `"Bắt đầu >"`
- **Trạng thái đã gửi:**
  - Tiêu đề: *"Đã gửi ý kiến đóng góp"*
  - Thời gian: *"Lần gửi gần nhất: DD/MM/YYYY lúc HH:mm"* (Cập nhật thời gian gửi thực tế)
  - Nút hành động: `"Gửi lại >"`
- **Tính khả dụng:** Luôn luôn mở được form khảo sát, không bị ảnh hưởng bởi thời gian hoãn 7 ngày của Bottom sheet.

---

### AC-05: Giao diện chuẩn Bottom Sheet
- **Bố cục:** Bottom sheet neo cố định ở đáy màn hình (`bottom: 0`), bo 2 góc trên (`border-radius: 24px 24px 0 0`), trượt từ dưới lên.
- **Nút đóng (X):** Neo cố định ở góc trên bên phải sheet (`top: 14px; right: 14px;`).
- **Tiêu đề:** `"Trải nghiệm ECO School của bạn thế nào?"`
- **Nội dung mô tả:** `"Hãy dành 1 phút chia sẻ cảm nhận để chúng tôi cải thiện ứng dụng và phục vụ con bạn tốt hơn."`
- **CTA:**
  - Nút chính: `"Làm khảo sát"` (Nền đen, chữ trắng, mở Survey Form).
  - Nút phụ: `"Để sau"` (Chữ xám, đóng sheet và hoãn 7 ngày).

---

### AC-06: Điều kiện gửi & Form Validation
- **Câu bắt buộc:** Câu 1 (CSAT: Thang điểm 0–10) & Câu 2 (NPS: Thang điểm 0–10).
- **Câu tùy chọn:** Lý do CSAT, lý do NPS, và Câu 3 (Ý kiến mở) — tối đa 255 ký tự/ô.
- **Trạng thái nút "Gửi khảo sát":**
  - Mặc định: **Disable** (màu xám, không thể bấm).
  - Chuyển sang **Enable** (màu đen, có thể bấm): Khi và chỉ khi đã chấm điểm cả Câu 1 và Câu 2.

---

### AC-07: Xác nhận gửi & Chu kỳ lặp lại 60 ngày
- **Xác nhận:** Hiển thị Toast `"Gửi khảo sát thành công. Cảm ơn bạn đã dành thời gian chia sẻ ý kiến."` và tự động quay về màn hình trước sau 2.4s.
- **Cập nhật Card:** Card tại Màn hình Học sinh lập tức chuyển sang trạng thái đã gửi kèm ngày giờ vừa gửi thực tế.
- **Chu kỳ bảo lưu:** Bottom sheet tại Trang chủ bị **ẩn hoàn toàn trong 60 ngày** kể từ thời điểm gửi.
