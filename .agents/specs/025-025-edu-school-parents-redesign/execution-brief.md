# Execution Brief: ECO School Parents Application Redesign

> Feature ID: `025-025-edu-school-parents-redesign`  
> Task Shape: `Frontend UI & Mobile Interaction`  
> Generated From: `spec.md`, `plan.md`, `tasks.md`, `verification.md`, `quickstart.md`, `agent-routing.md`  

## 1. Operator Intent Snapshot

Redesign the ECO School Parents Application (`ECO School Phụ huynh`) based on 22 legacy reference PNG screenshots and `Redesign Flow.docx` specification. Deliver a modern, high-performance mobile web application with 15 feature entry points, reactive student context switching, and 4-step state machines for absence requests and card top-ups.

## 2. Required Behavior

- Provide 15 feature entry points arranged in a 2-page horizontal swipe grid.
- Trigger `Picking a student` bottom sheet drawer when initiating a feature without student context or tapping `"Đổi"` in feature headers.
- Maintain active feature screen when switching students, updating only student profile header and feature content.
- Implement 4-step Báo vắng leave request flow (List -> Form -> Success dialog -> List update).
- Implement 4-step Nạp điểm card top-up flow (Presets -> Confirm -> PIN Modal -> Digital Receipt).

## 3. Scope Boundaries

- In scope: HTML5/CSS3/JS frontend implementation, design tokens, student context manager, feature views, Playwright E2E tests.
- Out of scope: Backend production API database servers (simulated via local mock state services).

## 4. Active Work Slice

- Core CSS design tokens (`/index.css`).
- App Shell & Grid Component (`/src/components/FeatureGrid.js`).
- Student Picker Drawer Component (`/src/components/StudentPickerModal.js`).
- Báo vắng Module Views (`/src/views/AbsenceFormView.js`).
- Nạp điểm Module Views (`/src/views/TopUpConfirmView.js`).

## 5. Development Ledger Context

- PRD: `/docs/prd.md`
- Tasks: `/docs/tasks.md`
- Screens Catalog: `/docs/planning/screens.md`
- Navigation Flows: `/docs/planning/flows.md`
- Diagrams: `/docs/planning/diagrams.md`

## 6. Verification Path

- Automated Playwright test suite: `npx playwright test tests/e2e/redesign.spec.js`
- Manual inspection of mobile viewport scaling and glassmorphism styling.

## 7. Review and Release Signals

- Spec compliance review: Approved by `aurora-plan-challenger`.
- Code quality review: Approved by `alan-tech-lead`.
- Verification readiness review: Approved by `ada-qa-agent`.

## 7.1 Superpowers Discipline Snapshot

- clarification status: Resolved against `Redesign Flow.docx`.
- TDD or accepted exception: Playwright automated test assertions.
- Root cause status for bugfix work: N/A (new feature redesign).
- Review order: spec compliance before code quality.
- Completion claim gate: fresh verification required before success language.

## 8. Context Expansion Rules

### Task Shape Decision

Frontend UI & Mobile Interaction stack: `benny-frontend-engineer`, `aris-designer`, `ada-qa-agent`.

### Required Reads

- Required read: `agents.md`
- Required read: `/docs/prd.md`
- Required read: `/docs/planning/flows.md`
- Required read: `/docs/planning/screens.md`

### Forbidden Default Reads

- Unrelated backend, SQL, RAG, or infrastructure skill files.

### Expansion Triggers

- Expand only if Playwright test failures implicate contract schemas.
