---
id: TASKS-EDU-PARENTS
title: Development Tasks & Delivery Plan — ECO School Phụ huynh
status: active
owner_skill: noah-agile-product-owner
source_trace:
  - docs/prd.md
  - docs/research/claims.jsonl
verification:
  - web/package.json
---

# Development Tasks & Delivery Plan: ECO School Phụ huynh

## 1. Active Delivery Epics

- `E-001-student-health-tracking`: Student Health & Asian WHO Z-Score Physical Growth Monitoring Card (`web/components/parents/student-screen.tsx`). Status: Verified and committed (`9dfd9ed`).
- `E-002-child-development-milestones`: Early Childhood Milestone Progress Tracking & 5-Axis Development Radar adhering strictly to Thông tư 51/2020/TT-BGDĐT, Thông tư 23/2010/TT-BGDĐT, and Decree 13/2023/ND-CP. Status: Active Planning.
- `E-003-finance-invoices`: Tuition fee itemization, bill provider selection, and payment status checks.
- `E-004-finance-card-topup`: 4-step card balance top-up flow with preset amount chips and simulated PIN.
- `E-005-operations-absence`: Attendance records and 4-step student absence request flow.
- `E-006-academics-homework`: Assignment review, detail inspect, and coursework submission flow.
- `E-007-academics-results`: Academic scores and preschool evaluation rubrics.
- `E-008-student-profile-linkage`: Student profile inspector, multi-child switcher sheet, and new code linking.
- `E-009-parent-dashboard-navigation`: Simulated iPhone frame chrome, 2-page feature grid, and screen routing.

## 2. Executable Task Breakdown for Epic E-002 (Child Development Milestones)

| Task ID | Task Title | Owner Skill | Write Scope | Dependencies | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `T-002-001-001` | Author 5-Domain Milestone Catalog & Schema | `alan-tech-lead` | `web/lib/mock-data.ts` | None | `npx tsc --noEmit` asserting 5 domains |
| `T-002-001-002` [P] | Implement 5-Axis Pentagon Radar Component | `benny-frontend-engineer` | `web/components/parents/development/radar-chart.tsx` | `T-002-001-001` | Visual snapshot & SVG geometry verification |
| `T-002-001-003` [P] | Build Milestone List & Category Filter Tabs | `benny-frontend-engineer` | `web/components/parents/development/milestone-list.tsx` | `T-002-001-001` | Tab filtering assertion across 5 domains |
| `T-002-001-004` | Implement Home Observation Sheet & Consent Gate | `benny-frontend-engineer` | `web/components/parents/development/observation-sheet.tsx` | `T-002-001-003` | Decree 13/2023 consent checkbox check |
| `T-002-001-005` | Build Non-Diagnostic Lag Alert & Home Tips | `sophia-product-manager` | `web/components/parents/development/guidance-sheet.tsx` | `T-002-001-003` | Medical disclaimer string verification |
| `T-002-001-006` | Wire Screen to Student Detail & Export Summary | `benny-frontend-engineer` | `web/components/parents/student-screen.tsx`, `web/app/page.tsx` | `T-002-001-002`, `T-002-001-004` | In-place switcher & dev server 200 OK |

## 3. Quality Assurance and Verification Mandate

Every task implementation must undergo static type verification (`npx tsc --noEmit`), production bundle compilation (`pnpm build`), and browser simulation across preschool personas `vy` (Lớp Lá) and `lam` (Lớp Mầm) to confirm age-appropriate domain milestones.
