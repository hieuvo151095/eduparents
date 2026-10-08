# Execution Brief: Child BMI Tracking and Hoc Sinh Screen

> Feature ID: `026-child-bmi-tracking-and-hoc-sinh-screen`
> Task Shape: `Frontend behavior & UI feature`
> Generated From: `spec.md`, `plan.md`, `tasks.md`, `verification.md`, `quickstart.md`, `agent-routing.md`

## 1. Operator Intent Snapshot

Design and implement the dedicated `Học sinh` screen based on `ECO Me Legacy/Hoc sinh.PNG` triggered by clicking any student card in `ECO School Phụ huynh`. Embed a `View BMI` section below the entry points card and above `Hoạt động gần đây` section, calculating BMI from height (cm) and weight (kg) with Asian WHO cutoffs (<18.5 Thiếu cân, 18.5-22.9 Bình thường, 23.0-24.9 Thừa cân, >=25.0 Béo phì) and rendering the 6 latest BMI historical checkup records.

## 2. Required Behavior

- Clicking student card in "Danh sách học sinh" navigates to `currentView: 'student_detail'`.
- Top header has back arrow returning to ECO School and screen title "Học sinh".
- Profile header displays avatar, name, student code, class, school, and interactive "👥 Đổi" button.
- White card container renders card balance ("Số dư thẻ") and 8 utility buttons in a 4x2 grid with pagination pills.
- View BMI section renders large BMI index, Asian health status pill, height/weight chips, spectrum gauge bar, and 6-record chronological history timeline.
- "Hoạt động gần đây" renders below View BMI section.
- Bottom CTA "Nạp điểm vào thẻ" links to top-up.

## 3. Scope Boundaries

- In scope: `src/views/HocSinhDetailView.js`, `src/components/StudentBmiSection.js`, `src/utils/bmiCalculator.js`, `src/data/studentBmiMockData.js`, `src/app.js`, `src/views/EcoSchoolHomepageView.js`, `index.css`, `tests/e2e/redesign.spec.js`.
- Out of scope: Backend database or IoT Bluetooth smart scale integrations.

## 4. Active Work Slice

- Component scaffolding for `HocSinhDetailView.js` and `StudentBmiSection.js`.
- Mathematical calculation utility and Asian WHO categorization in `bmiCalculator.js`.
- Router integration in `src/app.js`.
- Automated Playwright end-to-end tests in `tests/e2e/redesign.spec.js`.

## 5. Development Ledger Context

- Epic: `E-001-edu-school-parents-redesign`
- Feature spec: `026-child-bmi-tracking-and-hoc-sinh-screen`
- PRD reference: `docs/prd.md#3.10`

## 6. Verification Path

- Playwright test suite `npx playwright test`.
- Visual layout inspection against `ECO Me Legacy/Hoc sinh.PNG`.

## 7. Review and Release Signals

- Reviewer: `ada-qa-agent` and `sophia-product-manager`.
- Release signal: 100% passing tests and valid Asian BMI classification across all students.

## 7.1 Superpowers Discipline Snapshot

- clarification status: All clarified and resolved.
- TDD or accepted exception: TDD via Playwright end-to-end assertions.
- Root cause status for bugfix work: Not a bugfix; new feature specification.
- Review order: spec compliance before code quality.
- Completion claim gate: fresh verification required before success language.

## 8. Context Expansion Rules

- Load only `src/app.js`, `src/views/EcoSchoolHomepageView.js`, and new BMI components.
- Do not load unrelated legacy views.

### Task Shape Decision

Frontend behavior and UI component expansion.

### Required Reads

- `spec.md`
- `plan.md`
- `docs/prd.md#3.10`

### Forbidden Default Reads

- Legacy Báo vắng or Nạp điểm sub-views that do not interact with student detail view.

### Expansion Triggers

- Discrepancies in student context store or navigation router.
