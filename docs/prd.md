---
id: PRD-EDU-PARENTS
title: Product Requirements Document — ECO School Phụ huynh
status: active
owner_skill: sophia-product-manager
source_trace:
  - reference/prd.md
  - docs/research/claims.jsonl
  - docs/research/contradictions.md
  - web/app/page.tsx
  - web/components/parents/student-screen.tsx
verification:
  - web/components/parents/
---

# Product Requirements Document: ECO School Phụ huynh
## Feature: Tiến Trình Phát Triển Của Trẻ Mầm Non (Early Childhood Development Milestones)

## 1. Product Overview & Legal Rationale

ECO School Phụ huynh is a mobile application prototype providing Vietnamese parents with transparent insight into their children's daily educational, behavioral, and physical growth. This specification defines the **Tiến trình phát triển của trẻ (Early Childhood Development & Milestone Tracking)** module, tailored strictly to the Vietnamese regulatory framework for early childhood education (Giáo dục Mầm non).

### Legal & Regulatory Foundation
1. **Thông tư số 51/2020/TT-BGDĐT** (sửa đổi, bổ sung Thông tư 28/2016/TT-BGDĐT và Thông tư 17/2009/TT-BGDĐT của Bộ GD&ĐT): Quy định Chương trình Giáo dục mầm non quốc gia với **5 lĩnh vực phát triển bắt buộc**: Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Kỹ năng xã hội, và Thẩm mỹ.
2. **Thông tư số 52/2020/TT-BGDĐT** (Điều lệ trường mầm non): Quy định nguyên tắc đánh giá phát triển lấy trẻ làm trung tâm, nghiêm cấm mọi hình thức xếp loại thi đua, so sánh thành tích giữa các trẻ nhỏ.
3. **Thông tư số 23/2010/TT-BGDĐT**: Ban hành Bộ chuẩn phát triển trẻ em 5 tuổi (28 chuẩn, 120 chỉ số) áp dụng cho học sinh Mẫu giáo lớn (5-6 tuổi / Lớp Lá).
4. **Nghị định số 13/2023/NĐ-CP** (Điều 19) & **Luật Trẻ em 2016** (Điều 21, 54): Quy định bảo vệ dữ liệu cá nhân của trẻ em, bắt buộc phải có sự đồng ý minh bạch của cha mẹ trước khi thu thập hình ảnh, video và nhật ký phát triển.
5. **Quyết định số 3777/QĐ-BYT**: Quy định theo dõi thể trạng nhân trắc học bằng chỉ số Z-score theo tuổi và giới tính.

---

## 2. Target Users & Persona Profiles

1. **Phan Khánh Vy (`vy`)**: Lớp Lá (5-6 tuổi / 72 tháng), Trường Mầm non Demo. Chuẩn bị vào Lớp 1. Đối tượng áp dụng Bộ chuẩn phát triển trẻ 5 tuổi (Thông tư 23/2010). Thể trạng phát triển tốt (Z-score 0.4).
2. **Võ Phạm Hiểu Lam (`lam`)**: Lớp Mầm (3-4 tuổi / 46 tháng), Trường Mầm non Demo. Giai đoạn thích nghi nhà trường, làm quen vận động tinh, giao tiếp và kỹ năng tự phục vụ. Thể trạng nhẹ cân (Z-score -2.4).
3. **Trần Đăng Khoa (`khoa`)**: Lớp 10A1 (16 tuổi), Trường FINVIET. Học sinh cấp phổ thông trung học, tự động chuyển hướng sang giao diện Học bạ số và Điểm số môn học (Epic E-007), không áp dụng bộ mốc phát triển mầm non.
4. **Giáo viên Mầm non**: Đánh giá định kỳ theo học kỳ và xác thực minh chứng phát triển cha mẹ gửi từ gia đình.

---

## 3. The 5 Statutory Development Domains (Thông tư 51/2020/TT-BGDĐT)

Thay vì mô hình 4 trục thiếu sót, hệ thống bắt buộc triển khai đầy đủ **5 Lĩnh vực phát triển chuẩn quốc gia**:

| Lĩnh vực | Tên Tiếng Anh | Nội Dung Quan Sát & Đánh Giá Cốt Lõi | Ví Dụ Mốc Chuẩn Lớp Mầm / Lá |
| :--- | :--- | :--- | :--- |
| **1. Phát triển Thể chất** | Physical Development | Vận động thô (chạy, nhảy, thăng bằng), Vận động tinh (cầm bút, cài cúc, xé dán), Dinh dưỡng và thói quen vệ sinh tự lập. | - Nhảy lò cò 5 bước liên tục<br>- Cầm kéo cắt thẳng một đoạn 10cm |
| **2. Phát triển Nhận thức** | Cognitive Development | Khám phá khoa học, làm quen với khái niệm toán sơ đẳng (số lượng, hình khối, so sánh), nhận biết môi trường xung quanh. | - Đếm và nhận biết mặt số đến 10<br>- Phân biệt các khối hình học cơ bản |
| **3. Phát triển Ngôn ngữ** | Language & Communication | Khả năng nghe hiểu, vốn từ, diễn đạt mạch lạc bằng câu đầy đủ, làm quen với việc đọc và sao chép nét chữ. | - Kể lại câu chuyện có mở đầu, kết thúc<br>- Nhận dạng chữ cái trong tên mình |
| **4. Tình cảm & Kỹ năng xã hội** | Social-Emotional Skills | Ý thức bản thân, nhận biết và thể hiện cảm xúc phù hợp, chia sẻ đồ chơi, tôn trọng quy tắc lớp học và gia đình. | - Chủ động chào hỏi người lớn<br>- Biết lắng nghe và chờ đến lượt khi chơi |
| **5. Phát triển Thẩm mỹ** | Aesthetic Development | Cảm nhận cái đẹp thiên nhiên, thể hiện cảm xúc và sáng tạo qua âm nhạc (ca hát, vận động theo giai điệu) và tạo hình (vẽ, nặn, xé dán). | - Hát đúng giai điệu bài hát thiếu nhi<br>- Vẽ tranh thể hiện chi tiết người thân |

---

## 4. Functional Requirements

### FR-001: La Bàn Phát Triển Ngũ Giác (5-Axis Development Radar)
- Hệ thống BẮT BUỘC hiển thị biểu đồ mạng nhện ngũ giác với 5 đỉnh tương ứng 5 lĩnh vực phát triển chuẩn.
- Điểm phần trăm trên mỗi trục được tính theo công thức: $\text{Tỷ lệ} = (\text{Số mốc đã đạt} / \text{Tổng số mốc chuẩn lứa tuổi}) \times 100\%$.
- Tuyệt đối không xếp loại học sinh theo danh hiệu thi đua (như "Xuất sắc" hay "Kém"). Hệ thống hiển thị trạng thái tổng quan trung tính: `Đạt yêu cầu độ tuổi (>= 80%)`, `Đang trên đà phát triển (60% - 79%)`, `Cần tăng cường rèn luyện (< 60%)`.

### FR-002: Danh Mục Mốc Chuẩn Phân Theo Độ Tuổi & Lĩnh Vực
- Cung cấp bộ lọc dạng tab: `[Tất cả] [Thể chất] [Nhận thức] [Ngôn ngữ] [Tình cảm - Xã hội] [Thẩm mỹ]`.
- Mỗi card mốc hiển thị: Biểu tượng mô tả, Tiêu đề kỹ năng, Độ tuổi chuẩn (tháng), Trạng thái (`ĐÃ ĐẠT`, `CHỜ DUYỆT`, `CẦN RÈN LUYỆN`, `CHẬM TIẾN ĐỘ`).
- Đối với học sinh 5-6 tuổi (Lớp Lá), các mốc được gắn nhãn tương thích `Bộ chuẩn trẻ 5 tuổi (Thông tư 23/2010)`.

### FR-003: Phụ Huynh Ghi Nhận Mốc Tại Nhà & Cổng Đồng Thuận Riêng Tư (Consent Gate)
- Cho phép phụ huynh chọn mốc con đã làm được ở nhà, nhập ngày đạt (`achievedDate <= Hôm nay`), ghi chú và đính kèm tối đa 3 ảnh hoặc 1 video ngắn dưới 30 giây.
- **Cổng đồng thuận dữ liệu (Nghị định 13/2023/NĐ-CP)**: Trước khi gửi minh chứng lần đầu, phụ huynh BẮT BUỘC phải đọc và xác nhận hộp kiểm: *"Tôi là cha/mẹ/người giám hộ hợp pháp của bé, tôi đồng ý tải lên hình ảnh/video này để phục vụ theo dõi giáo dục nội bộ giữa gia đình và nhà trường."*
- Cung cấp tính năng xem lại và quyền rút lại sự đồng ý / xóa minh chứng bất kỳ lúc nào.

### FR-004: Tiếp Nhận Báo Cáo Đánh Giá Định Kỳ Của Giáo Viên
- Hiển thị phiếu báo cáo đánh giá định kỳ chính thức (Học kỳ I / Học kỳ II) do giáo viên chủ nhiệm lập và Ban Giám Hiệu phê duyệt.
- Nhận xét chi tiết trên cả 5 lĩnh vực phát triển.
- Nút xác nhận `Đã xem & Gửi phản hồi` kích hoạt biên nhận đọc (Read Receipt) minh bạch.

### FR-005: Cảnh Báo Sớm Mốc Chậm Tiến Độ Phi Chẩn Đoán (Non-Diagnostic Alert)
- Tự động phát hiện khi tuổi thực của trẻ vượt quá mốc chuẩn trên 60 ngày mà mốc vẫn chưa đạt.
- Hiển thị cảnh báo màu cam dịu nhẹ `#FFF7ED` (không dùng màu đỏ nguy hiểm).
- Đề xuất 1-3 trò chơi / hoạt động tương tác tại nhà mà cha mẹ có thể chơi cùng con để kích thích phát triển tự nhiên.
- Bắt buộc gắn tuyên bố miễn trừ y khoa: *"Các gợi ý mang tính chất sư phạm tham khảo. Để được chẩn đoán chuyên sâu, ba mẹ nên tham vấn bác sĩ nhi khoa hoặc chuyên gia tâm lý giáo dục."*

### FR-006: Chuyển Đổi Ngữ Cảnh Sibling & Xuất Sổ Tay Phát Triển
- Nút `"👥 Đổi"` mở `StudentPickerSheet` chuẩn, chuyển đổi nhanh giữa các con mà không thoát màn hình.
- Nút `"Xuất sổ tay hành trình"` tạo bản tóm tắt infographic để lưu máy hoặc in ấn kỷ niệm.
- Tự động chuyển hướng học sinh phổ thông (> 6 tuổi) sang màn hình `Kết quả học tập / Học bạ số`.

---

## 5. Non-Functional Requirements & Compliance

- **NFR-001 (Bảo vệ dữ liệu cá nhân - Nghị định 13/2023/NĐ-CP)**: Toàn bộ ảnh và video minh chứng trẻ em phải được mã hóa lưu trữ, sinh Signed URL có thời hạn tối đa 60 phút, không lập chỉ mục tìm kiếm công cộng.
- **NFR-002 (Hiệu năng phản hồi)**: Tính toán tháng tuổi, điểm số 5 trục Radar và render SVG hoàn tất dưới 200ms trên thiết bị di động.
- **NFR-003 (Sư phạm phi phán xét)**: Nghiêm cấm dùng từ ngữ bệnh lý, kỳ thị hoặc tạo áp lực tâm lý cho phụ huynh và trẻ nhỏ.
- **NFR-004 (Độ tin cậy giao diện)**: Tương thích hoàn toàn với khung điện thoại di động 390×844 trong `web/app/page.tsx`.

---

## 6. Acceptance Criteria

- [x] AC-001: Biểu đồ Radar phát triển hiển thị chính xác 5 đỉnh tương ứng 5 lĩnh vực chuẩn theo Thông tư 51/2020/TT-BGDĐT.
- [x] AC-002: Thẩm mỹ (Tạo hình & Âm nhạc) có danh mục mốc riêng biệt và lọc được trên thanh tab.
- [x] AC-003: Không xuất hiện bất kỳ nhãn thi đua "Xuất sắc" hoặc "Kém" nào trên giao diện tổng kết.
- [x] AC-004: Học sinh 5-6 tuổi (Lớp Lá) hiển thị mốc tham chiếu Bộ chuẩn trẻ 5 tuổi (Thông tư 23/2010).
- [x] AC-005: Form tải minh chứng yêu cầu phụ huynh tích chọn đồng thuận bảo vệ dữ liệu trẻ em theo Nghị định 13/2023 trước khi gửi.
- [x] AC-006: Mọi cảnh báo trễ mốc đều có dòng miễn trừ trách nhiệm y tế và hướng dẫn liên hệ chuyên gia y tế.
- [x] AC-007: Tapping "Đổi" chuyển mượt mà giữa các con em trong gia đình mà không gây lỗi rò rỉ dữ liệu.
