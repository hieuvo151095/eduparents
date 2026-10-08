---
id: FLOWS-EDU-PARENTS
title: User Interaction & Screen Navigation Flows — ECO School Phụ huynh
status: active
owner_skill: maya-ui-ux-designer
source_trace:
  - reference/flows.md
  - web/app/page.tsx
  - docs/prd.md
verification:
  - web/app/page.tsx
---

# User Interaction & Screen Navigation Flows: ECO School Phụ huynh

## 1. Flow Overview

Navigation throughout ECO School Phụ huynh maintains clear student context across features. For early childhood students, the application provides specialized developmental surveillance flows linking parent observations with teacher evaluations.

## 2. Core Execution Flows

### Flow 1: 5-Domain Development Radar Exploration Flow
1. Parent opens the app and navigates to the student cockpit (`StudentScreen`).
2. Tapping the `"Tiến trình phát triển"` card loads the 5-axis pentagonal Development Radar chart.
3. The chart displays completion percentages across Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Xã hội, and Thẩm mỹ.
4. Tapping any vertex on the pentagon smoothly scrolls the page and filters the milestone checklist to the selected domain.
5. Tapping any milestone card opens an explanatory drawer illustrating the skill in daily situations.

### Flow 2: Home Observation Submission with Decree 13/2023 Consent Gate
1. Parent observes their child achieving a new skill at home and taps `"+ Ghi nhận mốc mới"`.
2. A bottom sheet form displays the list of uncompleted milestones for the child's age group.
3. Parent selects the milestone, records the date achieved (`<= today`), and enters descriptive notes.
4. **Consent Gate**: If uploading photo or video evidence for the first time, a modal renders the statutory privacy agreement under Decree 13/2023/ND-CP.
5. Parent checks the consent checkbox and taps `"Xác nhận & Gửi cô giáo"`.
6. The milestone transitions to `Chờ duyệt` (Awaiting Teacher Review) with a gold badge, and a notification is dispatched to the teacher app.

### Flow 3: Early Lag Alert & Home Enrichment Flow
1. If a milestone remains unachieved 60 days past the child's age limit, the system highlights the card with a warm amber warning badge.
2. Parent taps `"💡 Gợi ý trò chơi cùng con"`.
3. An advisory sheet renders 3 simple, non-clinical play activities designed to nurture the skill naturally at home.
4. The sheet emphasizes a medical disclaimer and advises consulting pediatrician specialists if parental concerns persist.

### Flow 4: Consent Revocation & Media Deletion Flow
1. From any submitted home observation record, parent taps `"Quản lý quyền riêng tư & minh chứng"`.
2. Parent selects `"Thu hồi đồng thuận & Xóa tệp"`.
3. The system removes media references from storage and resets the record to text-only observation.
