# Feature Specification: ECO School Parents Application Redesign

> Feature ID: `025-025-edu-school-parents-redesign`  
> Created: `2026-08-26`  
> Status: Draft  
> Source Prompt: Redesign ECO School Parents Application based on ECO Me Legacy screens and Redesign Flow specifications  

## 1. Purpose

The purpose of this feature is to completely redesign and modernize the ECO School Parents mobile web application (`ECO School Phụ huynh`). The current legacy interface features fragmented navigation across two paginated entry point grids, lack of fluid student context switching, and outdated visual components. This redesign provides parents with a single, elegant, glassmorphic interface to seamlessly switch between linked children, view academic and attendance records, submit absence requests, top up student card balances, and track school activities.

## 2. User Stories

- [x] As a Parent, I need an entry point from the ECO Me super-app homepage into the ECO School module so that I can access all school operations from one platform.
- [x] As a Parent with multiple children, I need a bottom sheet drawer `Picking a student` and a header `"Đổi"` button so that I can switch active student profiles inside any feature without losing my current screen context.
- [x] As an internal operator, I need a clear 4-step execution state machine for absence requests and card top-ups so that execution remains observable, safe, and governable.
- [x] As a Parent, I need to review weekly "Phiếu bé ngoan" certificates, class Top 3 leaderboards, achievement summaries, locked annual totals, and a weekly calendar matrix to monitor and encourage my child's positive behavior.

## 3. Functional Requirements

- `FR-001`: The system MUST provide access to 16 feature entry points arranged in a 2-page horizontal swipe grid (Page 1: 8 icons; Page 2: 8 icons including Phiếu bé ngoan).
- `FR-002`: The system MUST open the `Picking a student` bottom sheet drawer whenever an unselected feature icon is clicked or when the parent taps `"Đổi"` in any feature header.
- `FR-003`: The system MUST update only the student header details and feature content when a new student is selected via `"Đổi"`, keeping the current screen context active.
- `FR-004`: The system MUST provide a 4-step Báo vắng leave request flow (List view -> Form submission with reason and date range -> Success modal -> List update with status `Chờ duyệt`).
- `FR-005`: The system MUST provide a 4-step Nạp điểm card top-up flow (Amount selection chips -> Transaction confirmation -> 6-digit PIN auth modal -> Digital receipt with push toast).
- `FR-006`: The system MUST provide the Phiếu bé ngoan screen displaying weekly teacher evaluations (Awarded state with rosette seal & criteria vs. Unawarded state with pedagogical advice), Top 3 class leaderboard podium, achievement medal counters (Rank 1, 2, 3 counts), locked annual total (strictly no academic year switching), and general weekly calendar matrix.

## 4. Non-Functional Requirements

- `NFR-001`: Performance: Sub-100ms response time for student switching and tab toggling.
- `NFR-002`: Security: Simulate 6-digit PIN code authentication for financial card top-up transactions.
- `NFR-003`: Observability: Console event log stream for student context changes and transaction receipts.
- `NFR-004`: Maintainability: Clean Vanilla JS component architecture with zero external framework bloat.
- `NFR-005`: Documentation and traceability: 100% mapping to legacy reference screens and `Redesign Flow.docx`.

## 5. Acceptance Criteria

- `AC-001`: Given the parent is on the ECO School homepage, when they swipe left on the feature grid, then Page 2 containing 8 extended entry points including "Phiếu bé ngoan" is displayed.
- `AC-002`: Given the parent is viewing Báo vắng for Trần Đăng Khoa, when they tap `"Đổi"` and select Phan Khánh Vy, then only the student header and leave records update for Phan Khánh Vy without navigating away.
- `AC-003`: Given the parent fills the absence request form, when they submit with valid dates and reason, then a success modal appears and a new item with status `Chờ duyệt` is added to the history list.
- `AC-004`: Given the parent selects a 50,000đ top-up preset, when they enter the correct 6-digit PIN, then a success receipt is rendered with transaction ID and push notification toast.
- `AC-005`: Given the parent selects "Phiếu bé ngoan" from Slide 2, when the view renders, then the active week's certificate status, Top 3 leaderboard, cumulative podium counts (e.g. 2 Nhất, 3 Nhì, 0 Ba), locked annual count, and calendar matrix are displayed with strict restriction to the active academic year (no year switcher).

## 6. Clarifications

### Superpowers V34: Question Back Protocol

All primary design decisions have been resolved based on authoritative legacy PNG screenshots, `Redesign Flow.docx`, and operator instructions.

### Clarification Ledger

| Question | Why It Matters | Answer or Accepted Risk | Status |
| --- | --- | --- | --- |
| How should multi-child student switching behave inside feature screens? | Prevents disruptive full-page reloads and loss of context. | Update header and content dynamically in-place upon selecting student from drawer. | Resolved |
| What payment methods are supported for card top-up? | Defines payment confirmation options. | Ví ECO balance and linked bank accounts (Techcombank). | Resolved |
| Should parents be able to switch academic years in Phiếu Bé Ngoan? | Defines UI data filtering scope. | Strictly locked to active academic year (2025-2026); no year switching allowed per operator mandate. | Resolved |

- [x] All blocking requirements clarified against `Redesign Flow.docx` and operator specifications.


## 7. Constraints

- Constitution articles that apply: Article I (Specification Source of Truth), Article IV (Test-First Verification), Article IX (Execution Readiness).
- Existing files or modules in scope: `ECO Me Legacy/` PNG files and `Redesign Flow.docx`.
- Files or modules out of scope: Backend production API database servers (simulated via reactive client store).
- Compatibility requirements: Mobile viewport standard (375px - 430px) responsive web layout.
- Documentation prerequisites already reviewed: PRD, screens inventory, flow diagrams, C4 models.
- Rollback or containment expectations: Local git commit baseline before code execution.

Out of scope:
- Production payment gateway network integration.

## 8. Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Swipe gesture conflict on desktop browsers | Low | Provide visible dot pagination indicators and left/right click arrows on non-touch viewports |
| Student card lock status (`Thẻ tạm khoá`) | Medium | Disable top-up CTA and render clear alert badge when locked card is selected |

## 9. Traceability

| Requirement | Plan Section | Tasks | Verification |
| --- | --- | --- | --- |
| `FR-001` | Section 3.1 | `TSK-002` | `AC-001` |
| `FR-002` | Section 3.2 | `TSK-003` | `AC-002` |
| `FR-003` | Section 3.2 | `TSK-003` | `AC-002` |
| `FR-004` | Section 3.3 | `TSK-004` | `AC-003` |
| `FR-005` | Section 3.4 | `TSK-005` | `AC-004` |

## 10. Review Loop

| Round | Reviewer | Focus | Exit Criteria | Status |
| --- | --- | --- | --- | --- |
| `R1` | `aurora-plan-challenger` | Scope challenge | Unclear scope removed, risks surfaced | Approved |
| `R2` | `sophia-product-manager` | Requirement quality | Acceptance criteria complete | Approved |
| `R3` | `marcus-ai-orchestrator` | Go/no-go to planning | Spec package stable for planning | Approved |
