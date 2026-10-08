# Research Notes: Child Development Milestones - Kindergarten

> Feature ID: `027-child-development-milestones-kindergarten`
> Source Documents: `docs/research/sources.jsonl`, `docs/research/evidence.jsonl`, `docs/research/claims.jsonl`, `docs/research/contradictions.md`

## Research Questions

1. Which Vietnamese Ministry of Education and Training (MOET) circulars govern kindergarten development assessment?
2. What are the mandatory developmental domains under Vietnamese law for early childhood education?
3. How does Vietnamese law regulate ranking, grading, and comparative evaluation in preschools?
4. What privacy, consent, and media storage regulations apply to Vietnamese children under 6 years old?
5. How should physical growth and anthropometric status be tracked alongside developmental milestones?

## Authoritative Legal Sources & Standards

- **Thông tư 51/2020/TT-BGDĐT** (sửa đổi Thông tư 28/2016/TT-BGDĐT & Thông tư 17/2009/TT-BGDĐT): Quy định Chương trình Giáo dục mầm non quốc gia với 5 lĩnh vực phát triển bắt buộc (Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Kỹ năng xã hội, Thẩm mỹ).
- **Thông tư 52/2020/TT-BGDĐT** (Điều lệ trường mầm non, Điều 22): Quy định đánh giá trẻ nhằm theo dõi sự tiến bộ, nghiêm cấm xếp loại, so sánh thành tích giữa các trẻ.
- **Thông tư 23/2010/TT-BGDĐT**: Ban hành Bộ chuẩn phát triển trẻ em 5 tuổi (28 chuẩn, 120 chỉ số) áp dụng cho lớp mẫu giáo lớn (5-6 tuổi / Lớp Lá).
- **Nghị định 13/2023/NĐ-CP** (Điều 19) & **Luật Trẻ em 2016** (Điều 21, 54): Bảo vệ dữ liệu cá nhân của trẻ em, bắt buộc có sự đồng ý minh bạch của cha mẹ / người giám hộ trước khi tải lên và lưu trữ hình ảnh, video của trẻ.
- **Quyết định 3777/QĐ-BYT** (Bộ Y tế): Hướng dẫn đánh giá tình trạng dinh dưỡng trẻ em bằng chỉ số Z-score (WHO Anthro).

## Findings

| Topic | Finding | Source | Decision Impact |
| --- | --- | --- | --- |
| 5 Developmental Domains | Vietnam mandates 5 domains: Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Kỹ năng xã hội, Thẩm mỹ (Âm nhạc & Tạo hình). 4-domain models violate TT 51/2020. | TT 51/2020/TT-BGDĐT | ADR-004: Upgrade Radar from 4-axis to pentagonal 5-axis ($72^\circ$ radial spacing). |
| Non-ranking Assessment | Evaluative ranking ("Xuất sắc", "Kém") is illegal in preschools. Only developmental milestone progress may be displayed. | TT 52/2020/TT-BGDĐT Art. 22 | ADR-005: Use neutral status badges: `Đạt yêu cầu độ tuổi`, `Đang trên đà phát triển`, `Cần tăng cường rèn luyện`. |
| 5-Year-Old Standards | Children aged 5-6 (Lớp Lá) require tagging aligned with 28 standards / 120 indicators for primary school readiness. | TT 23/2010/TT-BGDĐT | Tag milestones for 60-72 month children with MOET Standard reference IDs. |
| Parental Consent Gate | Collecting child photos/videos requires explicit parental consent and revocation mechanisms. | NĐ 13/2023/NĐ-CP Art. 19 | ADR-006: Add explicit consent checkbox before home observation evidence submission. |
| Non-diagnostic Pedagogical Advice | Milestone lag alerts must not use clinical diagnostic language; must include medical disclaimer. | Circular 51 & Medical Ethics | Use soft warning `#FFF7ED` and mandate pediatric/psychological referral disclaimer. |
| Age Demarcation | Early childhood education terminates at 72 months (6 years). High-schoolers use transcript screens. | Luật Giáo dục 2019 Art. 23 | Redirect persona `khoa` to academic transcript and gradebook screen. |

## Decisions Ready for Plan

1. Implement pentagonal SVG radar chart with 5 vertices for Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Kỹ năng xã hội, and Thẩm mỹ.
2. Structure milestones into age bands (36-48 months for Lớp Mầm, 48-60 months for Lớp Chồi, 60-72 months for Lớp Lá).
3. Include explicit parental consent gate modal adhering to Decree 13/2023 prior to media upload.
4. Route older children (> 6 years) away from kindergarten milestones to academic report cards.
