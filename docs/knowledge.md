---
id: KNOWLEDGE-EDU-PARENTS
title: Domain & Architecture Knowledge Base — ECO School Phụ huynh
status: active
owner_skill: alan-tech-lead
source_trace:
  - docs/prd.md
  - docs/research/sources.jsonl
  - docs/research/evidence.jsonl
verification:
  - web/components/parents/
---

# Domain & Architecture Knowledge Base: ECO School Phụ huynh

## 1. Statutory Preschool Development Standards in Vietnam

Physical, intellectual, and psychological monitoring of kindergarten children in Vietnam is strictly governed by legal frameworks established by the Ministry of Education and Training (Bộ GD&ĐT), the Ministry of Health (Bộ Y tế), and the National Assembly:

### 1.1 Thông tư số 51/2020/TT-BGDĐT: The 5 Statutory Developmental Domains
Under Circular 51/2020/TT-BGDĐT amending the National Early Childhood Education Curriculum, child development tracking must encompass **5 comprehensive domains**:
1. **Phát triển Thể chất (Physical Development)**: Gross motor coordination (chạy, nhảy, bắt bóng, giữ thăng bằng), fine motor agility (cầm kéo, cài cúc áo, xé dán), healthy nutritional intake, and personal hygiene autonomy.
2. **Phát triển Nhận thức (Cognitive Development)**: Scientific curiosity, elementary mathematical concepts (counting, shapes, spatial comparison, sorting), and social exploration.
3. **Phát triển Ngôn ngữ (Language & Communication)**: Auditory comprehension, vocabulary acquisition, articulate conversational expression, phonological awareness, and initial familiarity with reading and writing.
4. **Phát triển Tình cảm và Kỹ năng xã hội (Social-Emotional Development)**: Self-identity awareness, emotional regulation, collaborative play, empathy, sharing, and compliance with classroom and family rules.
5. **Phát triển Thẩm mỹ (Aesthetic Development)**: Aesthetic sensitivity to nature and the arts, imaginative self-expression through musical participation (singing, rhythmic dance) and visual creation (drawing, modeling, sculpting, paper folding).

### 1.2 Thông tư số 23/2010/TT-BGDĐT: 5-Year-Old Developmental Standards
Preschoolers aged 5 to 6 years (Lớp Lá / Mẫu giáo lớn, such as student Phan Khánh Vy) are benchmarked against the 28 standards and 120 indicators in Circular 23/2010/TT-BGDĐT to ensure holistic readiness for Grade 1 primary transition.

### 1.3 Child-Centered Evaluation Principle (Thông tư 52/2020/TT-BGDĐT)
Article 22 of the Kindergarten Charter explicitly mandates that early childhood evaluation is strictly formative and child-centered. Ranking children against one another, publishing comparative scoreboards, or labeling students as "Xuất sắc" or "Kém" is illegal in Vietnamese preschools. Assessments celebrate individual progress and guide collaborative home-school enrichment.

### 1.4 Protection of Children's Personal Data (Nghị định 13/2023/NĐ-CP & Luật Trẻ em 2016)
Under Decree 13/2023/ND-CP Article 19, children's milestone evaluations, photos, and video recordings constitute sensitive personal data. The system must enforce:
- Explicit parental consent prior to uploading evidence.
- Restricting storage access to authorized guardians and teachers only.
- Unconditional parental right to withdraw consent and request data deletion.

## 2. Technical Invariants & "Never Do" List

- **Never create a 4-axis radar for preschool**: Always use a 5-axis pentagon radar to reflect all statutory domains including Thẩm mỹ.
- **Never display competitive ranking or letter grades**: Use developmental status labels (`Đạt yêu cầu độ tuổi`, `Đang trên đà phát triển`, `Cần tăng cường rèn luyện`).
- **Never emit diagnostic psychiatric/medical labels**: Never use words like "tự kỷ", "chậm phát triển trí tuệ", or "khuyết tật" in automated tips.
- **Never allow future dates**: `achievedDate` must always be $\leq \text{Current Date}$.
- **Never leak sibling data**: All view state and milestone caches must refresh completely when switching between children via `StudentPickerSheet`.
