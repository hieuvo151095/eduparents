# Research Contradictions & Statutory Reconciliation Ledger

This ledger records conflicts between initial feature draft assumptions and authoritative Vietnamese legal and educational standards, along with binding reconciliation decisions.

## Contradiction 1: 4-Domain Quad Model vs. Statutory 5-Domain Preschool Curriculum

- **Conflicting Sources**: Initial draft PRD (`BA-DOC-E002-CHILD-DEVELOPMENT`) vs. Thông tư 51/2020/TT-BGDĐT (Chương trình Giáo dục mầm non quốc gia).
- **Conflict Summary**: The draft PRD proposed a 4-pillar model (Thể chất & Vận động, Nhận thức, Ngôn ngữ, Cảm xúc - Xã hội) using a 4-axis radar chart. In contrast, Thông tư 51/2020/TT-BGDĐT explicitly mandates **5 lĩnh vực phát triển** (5 developmental domains): Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Kỹ năng xã hội, and **Thẩm mỹ (Aesthetic)**.
- **Practical Impact**: If implemented as 4 domains, the application would omit music and visual arts (tạo hình, âm nhạc), making it ineligible for official adoption in Vietnamese kindergartens and misrepresenting official report cards.
- **Decision & Reconciliation**: Adopt the statutory **5-Domain Model** and upgrade the Development Radar chart from a 4-axis quad to a **5-axis pentagon (Ngũ giác la bàn phát triển)**.
- **Owner Skill**: `sophia-product-manager`

## Contradiction 2: Competitive Ranking Badges vs. Non-Ranking Child-Centered Pedagogy

- **Conflicting Sources**: Initial draft PRD vs. Thông tư 52/2020/TT-BGDĐT (Điều lệ trường mầm non Điều 22) and Thông tư 51/2020/TT-BGDĐT.
- **Conflict Summary**: The draft proposed achievement badges `Xuất sắc (>= 90%)`, `Đạt chuẩn (70% - 89%)`, and `Cần lưu ý (< 70%)`. Vietnamese law strictly forbids ranking, grading, or competitive achievement pressure among preschool children.
- **Practical Impact**: Ranking young children creates anxiety for parents, promotes harmful peer comparisons, and violates kindergarten educational regulations.
- **Decision & Reconciliation**: Remove all competitive labels (`Xuất sắc`, `Kém`). Replace with developmental milestone completion states: `Đạt yêu cầu độ tuổi` (Age-appropriate completion), `Đang trên đà phát triển` (In progress), and `Cần tăng cường rèn luyện` (Needs additional enrichment).
- **Owner Skill**: `ada-qa-agent`

## Contradiction 3: Extended Age Scope (6-10 years) vs. Early Childhood Boundary

- **Conflicting Sources**: Initial draft PRD vs. Thông tư 27/2020/TT-BGDĐT (Quy định đánh giá học sinh tiểu học) and Thông tư 51/2020/TT-BGDĐT.
- **Conflict Summary**: The draft proposed applying month-by-month milestone tracking up to 10 years old. In Vietnam, kindergarten ends at 72 months (6 years old). Elementary school students are evaluated on subject competencies, learning qualities, and periodic tests under Circular 27/2020, not preschool developmental milestones.
- **Practical Impact**: Applying toddler/preschool milestone checklists to grade-schoolers (like 10th-grader Trần Đăng Khoa) would produce meaningless data.
- **Decision & Reconciliation**: Strictly bound the milestone radar feature to Kindergarten (Nhà trẻ 3-36 tháng và Mẫu giáo 3-6 tuổi: Lớp Mầm, Chồi, Lá). Older students are automatically routed to `Học bạ số & Kết quả học tập` (Epic E-007).
- **Owner Skill**: `david-systems-architect`
