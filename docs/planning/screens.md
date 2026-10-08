---
id: SCREENS-EDU-PARENTS
title: Screen Inventory & UI Surface Catalog — ECO School Phụ huynh
status: active
owner_skill: maya-ui-ux-designer
source_trace:
  - reference/screens.md
  - web/app/page.tsx
  - docs/prd.md
verification:
  - web/components/parents/
---

# Screen Inventory & UI Surface Catalog: ECO School Phụ huynh

## 1. Top-Level Surface Catalog

The parent application renders inside a fixed 390×844 simulated iPhone shell (`web/app/page.tsx`), orchestrating distinct screen views via React state:

- **EcoMeHomeScreen (`web/components/parents/home/eco-me-home-screen.tsx`)**: The primary super-app landing screen (Image 1) with user greeting, banner, 4 quick actions, balance toggles, 8 services grid (7 educational features + "Xem thêm"), horizontal student card carousel, telecom preview, and fixed 5-tab bottom navigation bar.
- **ServicesListScreen (`web/components/parents/services/services-list-screen.tsx`)**: The comprehensive services catalog (Image 2) displaying recent services, all 16 ECO Phụ huynh educational features under "Dịch vụ giáo dục" with student picker routing, and telecommunication services.
- **HomeScreen (`web/components/parents/home-screen.tsx`)**: The legacy parent dashboard retained for compatibility.
- **StudentScreen (`web/components/parents/student-screen.tsx`)**: Child-specific cockpit detailing card balances, shortcut grid, the Asian WHO Z-score health gauge, parent advice bottom sheet, and itemized school activities.
- **ChildDevelopmentScreen (`web/components/parents/development/index.tsx`)**: The early childhood developmental milestone surveillance cockpit featuring:
  - Header with student switcher (`Đổi`) and real-time age in months display.
  - **Pentagon Development Radar Card**: 5-axis SVG chart (Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Xã hội, Thẩm mỹ) with individual axis percentage scores and non-ranking progress badge.
  - **Filter Tabs**: Horizontal scrolling tab bar (`[Tất cả]`, `[Thể chất]`, `[Nhận thức]`, `[Ngôn ngữ]`, `[Tình cảm - Xã hội]`, `[Thẩm mỹ]`).
  - **Milestone Cards List**: Structured cards showing milestone icon, title, age bracket, state badge (`Đã đạt`, `Chờ duyệt`, `Cần rèn luyện`, `Chậm tiến độ`), and teacher verification stamps.
  - **Home Observation Drawer**: 85% height bottom sheet with milestone picker, date picker, notes textarea, image/video uploader, and Decree 13/2023 parental consent checkbox.
  - **Lag Alert & Guidance Drawer**: Amber-tinted bottom sheet displaying 3 home interaction games and medical disclaimer.
  - **Periodic Evaluation Sheet**: Formative semester progress report issued by the homeroom teacher with read receipt confirmation.
- **StudentProfileScreen (`web/components/parents/profile/index.tsx`)**: Detailed read-only credential sheet covering date of birth, student code, class, school, and parent/guardian contact cards.
- **PhieuBeNgoanApp (`web/components/parents/phieu-be-ngoan/index.tsx`)**: Weekly behavior recognition portal.
- **FeeApp (`web/components/parents/fee/index.tsx`)**: Tuition invoice lookup and bill payment flow.
- **TopupApp (`web/components/parents/topup/index.tsx`)**: 4-step card balance replenishment interface.
- **AbsenceApp (`web/components/parents/absence/index.tsx`)**: Attendance records and leave request form.
- **HomeworkApp (`web/components/parents/homework/index.tsx`)**: Homework assignment lists and submission.
- **ResultsApp (`web/components/parents/results/index.tsx`)**: Academic report cards and term evaluations.
