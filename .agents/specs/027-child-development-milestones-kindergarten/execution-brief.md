# Execution Brief: Feature Specification: Child Development Milestones - Kindergarten

> Feature ID: `027-child-development-milestones-kindergarten`
> Task Shape: `frontend-behavior`
> Generated From: `spec.md`, `plan.md`, `tasks.md`, `verification.md`, `quickstart.md`, `agent-routing.md`

## 1. Operator Intent Snapshot

## 1. Purpose

Kindergarten parents in Vietnam currently lack a statutory, transparent tool to monitor their child's holistic early childhood development according to national educational standards. Existing solutions frequently suffer from two severe non-compliance failures: they either omit the mandatory fifth domain (Phát triển Thẩm mỹ - Aesthetic Development) required by Thông tư 51/2020/TT-BGDĐT, or they impose illegal competitive ranking badges ("Xuất sắc", "Kém") that violate Điều 22 of the Early Childhood Education Charter (Thông tư 52/2020/TT-BGDĐT).

This feature establishes a legally compliant, supportive early childhood development dashboard for kindergarten parents. It delivers a 5-axis pentagonal radar visualizing milestone progress across Physical, Cognitive, Language, Social-Emotional, and Aesthetic domains, provides age-appropriate developmental observation submission with a strict privacy consent gate under Nghị định 13/2023/NĐ-CP, and offers gentle non-diagnostic home activity guidance for delayed milestones.


## 2. Required Behavior

## 3. Functional Requirements

- `FR-001`: The system MUST render a 5-axis pentagonal radar chart visualizing progress across the 5 statutory domains of Thông tư 51/2020/TT-BGDĐT: Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Kỹ năng xã hội, and Thẩm mỹ.
- `FR-002`: The system MUST categorize developmental milestones by age bands (Nhà trẻ 3-36 tháng, Mầm 36-48 tháng, Chồi 48-60 tháng, Lá 60-72 tháng) with filter tabs, and tag 5-year-old milestones with Circular 23/2010/TT-BGDĐT standard indicators.
- `FR-003`: The system MUST provide a home observation submission modal allowing parents to record achievement dates, notes, and media, preceded by an explicit statutory consent gate under Nghị định 13/2023/NĐ-CP and Luật Trẻ em 2016.
- `FR-004`: The system MUST display official periodic evaluation reports from homeroom teachers with read receipt confirmation, showing comprehensive qualitative feedback on all 5 domains.
- `FR-005`: The system MUST detect developmental milestones lagging over 60 days past target age, displaying a soft alert (`#FFF7ED`) with home play activities and a mandatory medical diagnostic disclaimer.
- `FR-006`: The system MUST support sibling context switching via `StudentPickerSheet` and automatically route children over 72 months (such as high schooler Trần Đăng Khoa) to academic transcript views.


## 5. Acceptance Criteria

- `AC-001`: Given a kindergarten student profile, when the development screen loads, then the radar chart renders exactly 5 equidistant vertices representing Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Xã hội, and Thẩm mỹ.
- `AC-002`: Given the milestone catalog screen, when filtering by domain tabs, then selecting "Thẩm mỹ" displays art and music milestones with appropriate statutory indicators.
- `AC-003`: Given any developmental summary view, then no competitive achievement ranking or grading labels ("Xuất sắc", "Kém") appear anywhere in the interface.
- `AC-004`: Given a 5-6 year old student (Lớp Lá), when inspecting milestone details, then the system displays the applicable Thông tư 23/2010 standard number and indicator code.
- `AC-005`: Given the home observation submission flow, when a parent attempts to upload photos without confirming the Decree 13/2023 consent checkbox, then submission is blocked with an informative validation notice.
- `AC-006`: Given a milestone that is unachieved and 60 days past the child's age band, when the parent views the card, then an amber notice displays with 1-3 home play activities and an explicit medical referral disclaimer.
- `AC-007`: Given the child selector control, when switching between Phan Khánh Vy (Lớp Lá) and Võ Phạm Hiểu Lam (Lớp Mầm), then the milestone roster, radar chart, and age bands update instantaneously.


## 3. Scope Boundaries

## 7. Constraints

- Constitution articles that apply: Strict architectural boundaries, mobile viewport fidelity (390x844), zero mock data leakage across student IDs.
- Existing files or modules in scope: `web/components/parents/`, `docs/`, `web/lib/`, `web/app/page.tsx`.
- Files or modules out of scope: High school gradebooks, tuition payment gateways, backend microservice deployment scripts.
- Compatibility requirements: Next.js 16 App Router, React 19, TypeScript 5.7, Tailwind CSS / plain CSS tokens.
- Documentation prerequisites already reviewed: `docs/prd.md`, `docs/knowledge.md`, `docs/decisions.md`, `docs/research/claims.jsonl`.
- Rollback or containment expectations: Feature isolated within a modular component toggle; rollback restores previous student summary card without data loss.

Out of scope:
- Clinical diagnostic evaluations or psychiatric developmental screening instruments.
- Primary and secondary school numerical academic grade calculations.
- Live video streaming or peer-to-peer child photo sharing between parents.


## 4. Active Work Slice

## 1. Technical Summary

This technical plan translates the statutory requirements of Thông tư 51/2020/TT-BGDĐT, Thông tư 52/2020/TT-BGDĐT, Thông tư 23/2010/TT-BGDĐT, and Nghị định 13/2023/NĐ-CP into the mobile web application architecture for `ECO School Phụ huynh`. The implementation introduces a modular frontend component `ChildDevelopmentScreen` hosted within Next.js 16 and React 19, structured around a 5-axis pentagonal SVG radar visualization, an age-banded milestone filter ledger, a privacy-gated home observation submission drawer, and a non-diagnostic pedagogical advisory system.

The module interfaces cleanly with existing parent personas (`vy`, `lam`, `khoa`) in `web/components/parents/`, enforcing age boundaries where children older than 72 months automatically transition to secondary academic transcript screens.


## 6. Agent Routing

Ownership and workflow handoffs are detailed in `agent-routing.md`.

| Workstream | Primary Agent | Output | Verification |
| --- | --- | --- | --- |
| Statutory Specification | `sophia-product-manager` | `spec.md`, legal requirements | Spec validation gate |
| Architecture & Contracts | `david-systems-architect` | `plan.md`, `contracts/`, `data-model.md` | Architecture review & type check |
| Quality Assurance | `ada-qa-agent` | `verification.md`, test cases | Verification gate pass |
| Orchestration | `marcus-ai-orchestrator` | `tasks.md`, memory update | Task and ledger reconciliation |

Execution monitoring:
- Blocking gates before implementation: Spec validation pass, docs substance pass, research validation pass.
- Evidence checkpoints during implementation: TypeScript compilation, SVG geometry calculation test, consent gate unit test.
- Escalation condition after repeated failure: Return to architect if radar math or legal constraints fail verification.


## Tasks

- [ ] `T001` Owner: `sophia-product-manager` Write Scope: `spec.md`, `research.md`.
      Verification: validate_specs.py passes with zero placeholder warnings and all 5 statutory domains confirmed.
      Docs: `spec.md`, `research.md`, `verification.md`.
      Sync: update traceability matrix in PRD when statutory boundaries are finalized.
- [ ] `T002` Owner: `david-systems-architect` Write Scope: `plan.md`, `data-model.md`, `contracts/child-development-types.ts`, `quickstart.md`.
      Verification: TypeScript contract compilation passes and Mermaid state transition diagram validates cleanly.
      Docs: `plan.md`, `data-model.md`, `quickstart.md`.
      Sync: align data contracts across parent portal and teacher review workflows.
- [ ] `T003` Owner: `benny-frontend-engineer` Write Scope: `web/components/parents/child-development-screen.tsx`, `web/components/parents/development-radar-card.tsx`.
      Verification: 5-axis SVG radar renders accurately for kindergarten personas Phan Khánh Vy and Võ Phạm Hiểu Lam.
      Docs: `docs/planning/screens.md`, `verification.md`.
      Sync: connect development tab navigation in `web/app/page.tsx`.
- [ ] `T004` Owner: `benny-frontend-engineer` Write Scope: `web/components/parents/milestone-submission-drawer.tsx`, `web/components/parents/lag-alert-card.tsx`.
      Verification: Decree 13/2023 parental consent gate blocks submission without affirmative checkbox; lag alerts display non-diagnostic disclaimer.
      Docs: `docs/planning/flows.md`, `verification.md`.
      Sync: integrate submission handler with local parent evidence state.
- [ ] `T005` Owner: `ada-qa-agent` Write Scope: `verification.md`, `docs/development/`.
      Verification: run required docs gates, mobile viewport checks (390x844), and age redirection assertions.
      Docs: `verification.md`, `docs/development/sync_manifest.json`.
      Sync: record completion evidence and release recommendation in verification ledger.


## 4.1 Dynamic Execution Signals

### Changed Files

- `web/app/page.tsx`
- `web/components/parents/home-screen.tsx`
- `web/components/parents/student-screen.tsx`
- `web/components/parents/development/index.tsx`
- `web/lib/development-data.ts`

### Failing Evidence

- No failing evidence was provided for this brief rebuild.

## Execution Monitoring

- Required pre-code gates: `validate_specs.py` passes, `validate_planning_research.py` passes, `run_required_docs_gates.py` passes.
- Mid-slice checkpoints: Verify pentagonal geometry math ($72^\circ$ radial steps) before wiring live data; test Decree 13 checkbox validation before media upload.
- Circuit breaker after repeated failure: Halt implementation if radial coordinate distortion exceeds 1px or if consent gate allows bypass.
- Human escalation trigger: Escalate to operator if new circular regulations contradict the 5-domain structure.


## 5. Development Ledger Context

Read these development-ledger notes before source edits for the active slice:

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/epic.md`
  - Title: Epic: Student Health Tracking & BMI/Z-Score Card
  - PM Notes: - PM-visible status: Fully implemented and verified in Next.js with clean compilation. - Demo narrative: Parent opens the app, taps Phan Khánh Vy (Z-score 0.4, Normal), inspects the green band, taps "Gợi ý cho ba mẹ", and reads the stable trajectory with balanced nutrition advice. The parent then taps "Đổi", selects Trần Đăng Khoa (Z-score 2.3, Overweight), and observes the orange badge, increased trend line (+0.2), and physical activity suggestions. - Acceptance impact: Unlocks physical development tracking across all three mock student personas.
  - Issues: | Issue ID | Source | Priority | Status | Owner | Evidence | Resolution | | --- | --- | --- | --- | --- | --- | --- | | `ISSUE-HEALTH-001` | Code review | P1 | Closed | `benny-frontend-engineer` | `student-screen.tsx` line 151 | Handled single-record edge cases where delta trend computation lacks prior checkup |

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/features/F-001-001-student-health-card.md`
  - Title: Feature: Student Health Card & Advice Sheet
  - PM Notes: - PM-visible status: Production-ready in `web/components/parents/student-screen.tsx`. - Demo narrative: Showcase Lý Tường Lam (`lam`, underweight, blue badge, stable trend) versus Trần Đăng Khoa (`khoa`, overweight, orange badge, increasing trend line). - Acceptance impact: Fully closes the student physical health tracking epic.
  - Code Scope: - Component file: `web/components/parents/student-screen.tsx` (implements `HealthCard`, `ZScoreAdviceSheet`, `HealthHistorySheet`, `zScorePercent`, `zScoreBand`, `zScoreTrendLine`). - Style sheet: `web/app/globals.css` (defines `.zscore-advice-row`, `.zscore-advice-list`, `.zscore-advice-note`, `.health-frame`, `.bmi-track`, `.bmi-marker`). - Data contract: `web/lib/mock-data.ts` (exports `HealthRecord`, `Student`, and `MOCK_STUDENTS`).
  - Verification: - Command: `cd web && npx tsc --noEmit` - Result: 0 errors, type safety verified across all student types. - Command: `cd web && pnpm build`

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/issues.md`
  - Title: Epic Issues & Risk Register: Student Health Tracking

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/modules/M-001-001-student-health-card.md`
  - Title: Module: Student Health Card & Advice Subsystem
  - Code Scope: - Source implementation: `web/components/parents/student-screen.tsx` - Relevant functions:   - `HealthCard({ heightCm, weightKg, zScore, onInfoClick, onAdviceClick })`
  - Verification: - Automated: `cd web && npx tsc --noEmit` validates all prop types and return types. - Static Build: `cd web && pnpm build` completes with 0 errors. - Visual: Verified responsive rendering within 390px mobile frame.

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/pages/P-001-001-student-detail-screen.md`
  - Title: Page: Student Detail Screen (Học Sinh)
  - PM Notes: - PM-visible status: Active and rendered at `http://localhost:3100`. - Demo narrative: From home dashboard, tap any student card to enter this page. Test switching students using the `"Đổi"` button to observe instant re-rendering of all physical metrics and card balances. - Acceptance impact: Unlocks full student detail visibility.
  - Verification: - Automated: `npx tsc --noEmit` validates `StudentScreen` props and screen enum union. - Static Build: `pnpm build` generates static HTML prerender for `/`. - Runtime: Dev server verified serving `200 OK` on `http://localhost:3100`.

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/sync/20261005-154739-doc-reconcile-student-health.md`
  - Title: Development Doc Sync: Doc Reconcile Student Health
  - Verification: - Command: `cd web && npx tsc --noEmit && pnpm build` - Result: 0 errors; successful static production build. - Residual documentation risk: None; all development ledger docs match codebase reality.

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/tasks/T-001-001-001-student-health-advice.md`
  - Title: Task: Implement Parent Advice Sheet on Health Card
  - Write Scope: - Files modified:   - `web/components/parents/student-screen.tsx` (added `Z_SCORE_ADVICE`, `zScoreTrendLine`, `ZScoreAdviceSheet`, and `showZScoreAdvice` state)   - `web/app/globals.css` (added `.zscore-advice-row`, `.zscore-advice-list`, `.zscore-advice-note`)
  - Verification: - Command: `cd web && npx tsc --noEmit` - Result: 0 errors. - Command: `cd web && pnpm build`
  - Handoff: Task is fully completed, verified, and committed to `main` under commit `9dfd9ed`. Ready for integration with downstream features.

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/epic.md`
  - Title: Epic: Child Development Milestones (Mầm Non)
  - PM Notes: - PM-visible status: Implemented and fully integrated into the Next.js parent application with clean TypeScript compilation. - Demo narrative: Parent slides to Page 2 of the Home feature grid, taps "Tiến trình phát triển", and selects Phan Khánh Vy (Lớp Lá, 72 tháng). The app displays the 5-domain radar chart (Physical 100%, Cognitive 50%, Language 100%, Social 100%, Aesthetic 100%), overall status "Đạt yêu cầu độ tuổi (90%)", and Circular 23 indicators. Tapping "Đổi" switches to Võ Phạm Hiểu Lam (Lớp Mầm, 46 tháng), revealing the button-fastening lag alert with 3 home play suggestions and non-diagnostic disclaimer. Tapping "Ghi nhận mốc tại nhà" opens the submission drawer where the submission button is protected by the Decree 13/2023 consent checkbox. - Acceptance impact: Fully closes the developmental tracking gap for preschool families.
  - Issues: | Issue ID | Source | Priority | Status | Owner | Evidence | Resolution | | --- | --- | --- | --- | --- | --- | --- | | `ISSUE-DEV-001` | Statutory Review | P1 | Closed | `sophia-product-manager` | `docs/research/contradictions.md` | 4-domain model was illegal; upgraded to 5-axis pentagonal radar per TT 51/2020 |

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/features/F-002-001-child-development-milestones.md`
  - Title: Feature: Child Development Milestones & Entry Point
  - PM Notes: - PM-visible status: Fully implemented in Next.js 16 and React 19. - Demo narrative: Parent slides to Page 2 of the Home feature grid, taps "Tiến trình phát triển", and selects Phan Khánh Vy (Lớp Lá, 72 tháng). The app displays the 5-domain radar chart (Physical 100%, Cognitive 50%, Language 100%, Social 100%, Aesthetic 100%), overall status "Đạt yêu cầu độ tuổi (90%)", and Circular 23 indicators. Tapping "Đổi" switches to Võ Phạm Hiểu Lam (Lớp Mầm, 46 tháng), revealing the button-fastening lag alert with 3 home play suggestions and non-diagnostic disclaimer. Tapping "Ghi nhận mốc tại nhà" opens the submission drawer where the submission button is protected by the Decree 13/2023 consent checkbox. - Acceptance impact: Unlocks full early childhood tracking suite for kindergarten parents.
  - Code Scope: - `web/components/parents/home-screen.tsx`: Added `development` entry point to `PAGE2` and filtered picker to preschool students. - `web/components/parents/student-screen.tsx`: Added developmental radar summary card under HealthCard for kindergarten students. - `web/components/parents/development/`: Created `index.tsx`, `radar-card.tsx`, `milestone-card.tsx`, `observation-sheet.tsx`, `teacher-report-sheet.tsx`.
  - Verification: - Command: `npx tsc --noEmit` -> 0 errors. - Command: `pnpm build` -> production build successful in 962ms. - Verified Home screen Slide 2 entry point `{ id: 'development', icon: '◈', label: 'Tiến trình phát triển' }`.

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/issues.md`
  - Title: Epic Issues & Risk Register: Child Development Milestones

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/modules/M-002-001-child-development-milestones.md`
  - Title: Module: Child Development Components & Geometry
  - Code Scope: - `web/components/parents/development/index.tsx`: Main screen orchestrator. - `web/components/parents/development/radar-card.tsx`: Pentagonal SVG radar engine. - `web/components/parents/development/milestone-card.tsx`: Milestone presentation card.
  - Verification: - Command: `npx tsc --noEmit` -> 0 errors. - Command: `pnpm build` -> production build succeeded in 962ms. - Verified Home screen Slide 2 entry point `{ id: 'development', icon: '◈', label: 'Tiến trình phát triển' }`.

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/pages/P-002-001-child-development-milestones.md`
  - Title: Page: Child Development Screen Surface
  - PM Notes: - PM-visible status: Fully functional on `http://localhost:3100`. - Demo narrative: Parent opens Home, swipes to Page 2, taps "Tiến trình phát triển", chooses Vy or Lam, inspects the 5-domain radar, taps "Thẩm mỹ" filter tab to view art milestones, and tests the home observation drawer. - Acceptance impact: Provides mobile-first parent UX for early childhood developmental tracking.
  - Verification: - Command: `npx tsc --noEmit` -> 0 errors. - Command: `pnpm build` -> production build succeeded in 962ms. - Verified Home screen Slide 2 entry point `{ id: 'development', icon: '◈', label: 'Tiến trình phát triển' }`.

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/sync/20261005-175500-child-development-entry-point.md`
  - Title: Development Doc Sync: Child Development Entry Point & Kindergarten Screen

- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/tasks/T-002-001-001-child-development-milestones.md`
  - Title: Task: Implement Development Entry Point and Kindergarten Screen
  - Write Scope: - `web/components/parents/home-screen.tsx` - `web/components/parents/student-screen.tsx` - `web/components/parents/development/*`
  - Verification: - Command: `npx tsc --noEmit` -> 0 errors. - Command: `pnpm build` -> production build succeeded in 962ms. - Verified Home screen Slide 2 entry point `{ id: 'development', icon: '◈', label: 'Tiến trình phát triển' }`.
  - Handoff: - Producing skill: `benny-frontend-engineer` - Reviewing skill: `ada-qa-agent` - Verification evidence: Next.js build passes cleanly; local dev server active on port 3100.

## 6. Verification Path

## Verification Plan

| Requirement | Method | Command or Procedure | Expected Result |
| --- | --- | --- | --- |
| `FR-001` | Script & Visual inspection | `python3 .agents/scripts/validate_specs.py --feature .agents/specs/027-child-development-milestones-kindergarten` | 5-axis pentagonal radar specification verified with 0 errors |
| `FR-002` | Static analysis & Schema audit | `grep -E "Thẩm mỹ|aesthetic" .agents/specs/027-child-development-milestones-kindergarten/contracts/child-development-types.ts` | Mandatory 5th domain Thẩm mỹ present in contracts |
| `FR-003` | Schema & Form verification | `grep -i "consentConfirmed" .agents/specs/027-child-development-milestones-kindergarten/contracts/child-development-types.ts` | Consent gate field defined in observation contract |
| `FR-004` | Contract inspection | `grep -i "TeacherPeriodicReport" .agents/specs/027-child-development-milestones-kindergarten/contracts/child-development-types.ts` | Teacher periodic report contract defined |
| `FR-005` | Rule validation | Check milestone delay calculation logic and medical disclaimer presence in `plan.md` | Non-diagnostic warning and pediatric referral disclaimer present |
| `FR-006` | Boundary audit | Verify age boundary logic (age > 72 months redirects to secondary school view) | Sibling switcher routes preschool vs high school appropriately |


## Execution Gates

- Pre-implementation gates passed: Statutory research complete (11 sources, 16 evidence quotes, 10 claims, 3 contradictions resolved).
- Plan/contract readiness confirmed: TypeScript contracts compiled, data models documented, and Mermaid diagrams verified.
- Documentation targets created or reconciled: Global PRD (`docs/prd.md`), knowledge bank (`docs/knowledge.md`), flows (`docs/planning/flows.md`), screens (`docs/planning/screens.md`), diagrams (`docs/planning/diagrams.md`).
- Required human approvals: Operator review of statutory 5-domain PRD adjustments.

### Evidence-before-claim Gate

NO COMPLETION CLAIMS are allowed until the exact command or manual procedure was run fresh, the output was inspected, and the result was recorded below.


## Local Preconditions

- Required services: Next.js dev server running on port 3100 (`http://localhost:3100`).
- Required environment variables: Standard local development environment (`NODE_ENV=development`).
- Required commands: Python 3.10+ with standard library, Node.js 18+, pnpm 9+.


## Validation Path

1. Run spec-driven planning validation:
   ```bash
   python3 .agents/scripts/validate_specs.py --feature .agents/specs/027-child-development-milestones-kindergarten
   ```
2. Confirm:
   ```text
   SPEC VALIDATION PASSED: 1 feature(s)
   ```
3. Run global planning docs gates:
   ```bash
   python3 .agents/scripts/run_required_docs_gates.py --root . --mode planning
   ```
4. Confirm:
   ```text
   REQUIRED DOCS GATES PASSED
   ```


## POC Rehearsal

- Smallest end-to-end path to demonstrate:
  1. Open browser to `http://localhost:3100`.
  2. Select Phan Khánh Vy (Lớp Lá, 72 tháng) -> Verify 5-axis pentagonal radar renders with 5 domains including Thẩm mỹ.
  3. Filter by "Thẩm mỹ" tab -> Confirm art and music milestones displayed.
  4. Select Võ Phạm Hiểu Lam (Lớp Mầm, 46 tháng) -> Observe milestone roster filtered to 36-48 month band.
  5. Open "Ghi nhận mốc tại nhà" modal -> Verify Decree 13/2023 parental consent checkbox is required before submission.
- Evidence to capture during rehearsal: Screenshots of 5-axis radar chart, consent gate modal, and milestone delay card.
- Criteria to stop and revise docs before broader execution: Coordinate distortion on SVG radar or failure of consent gate to block submission.


## 7. Review and Release Signals

## 10. Review Loop

Document the review rounds that must happen before implementation is allowed to proceed.

| Round | Reviewer | Focus | Exit Criteria | Status |
| --- | --- | --- | --- | --- |
| `R1` | `aurora-plan-challenger` | Statutory scope challenge | Confirmed 5 domains, non-ranking assessment, Decree 13 consent | Completed |
| `R2` | `sophia-product-manager` | Requirement quality | All 6 FRs, 5 NFRs, and 7 ACs fully articulated | Completed |
| `R3` | `marcus-ai-orchestrator` | Go/no-go to technical planning | Spec package stable and fully aligned with Vietnam legal baseline | Approved |


## Review Loop Tasks

- `R1`: Spec compliance review task: Verify Thông tư 51/2020 5 domains, Thông tư 52/2020 non-ranking labels, and Nghị định 13/2023 consent gate.
- `R2`: Code quality review task: Verify TypeScript 5.7 strict mode, zero `any` types, and Next.js 16 App Router bundle efficiency.
- `R3`: Verification readiness review task: Verify mobile layout rendering (390x844), lag alert styling, and sibling switching responsiveness.
- `R4`: Post-evidence reconcile task: Synchronize documentation manifests, update session log, and finalize release recommendation.


## Review Rounds

| Round | Reviewer | Finding Summary | Required Changes | Disposition |
| --- | --- | --- | --- | --- |
| `R1` | `aurora-plan-challenger` | Scope challenge verified 5 statutory domains and non-ranking status | None, all statutory circulars incorporated | Passed |
| `R2` | `sophia-product-manager` | Requirement quality verified with clear acceptance criteria | None, ACs match all 6 FRs | Passed |
| `R3` | `ada-qa-agent` | Verification plan covers all legal and architectural boundaries | None, procedures fully defined | Passed |
| `R4` | `benny-frontend-engineer` | Implementation of 5-domain radar, Decree 13 consent gate, and slide entry point | Verified clean mobile layout and zero compile errors | Passed |


## Release Recommendation

- Recommendation: `GO`
- Basis for recommendation: All statutory requirements, frontend components, Slide 2 entry point, kindergarten student filtering, Decree 13/2023 parental consent gate, and production builds have passed with fresh verifiable evidence.
- Required follow-up before wider rollout: Operator smoke-test on running dev server `http://localhost:3100`.


## 7.1 Superpowers Discipline Snapshot

- clarification status: read `spec.md#6. Clarifications` before planning or widening scope.
- TDD or accepted exception: behavior-changing tasks must name RED-GREEN-REFACTOR or an explicit accepted exception.
- Root cause status for bugfix work: reproduce and identify cause before mutation.
- Review order: spec compliance before code quality.
- Completion claim gate: fresh verification required before success language.

## 8. Context Expansion Rules

### Task Shape Decision

- Selected task shape: `frontend-behavior`
- Why this shape: Read page, feature, hook, and browser-interaction artifacts first.

### Required Reads

- Required read: `agents.md`
- Required read: `.agents/memory/constitution.md`
- Required read: `.agents/specs/027-child-development-milestones-kindergarten/execution-brief.md`
- Required read: `.agents/specs/027-child-development-milestones-kindergarten/spec.md` only if the brief or failing evidence says deeper requirement context is needed.
- Required read: `.agents/specs/027-child-development-milestones-kindergarten/plan.md`, `tasks.md`, `verification.md`, `quickstart.md`, and `agent-routing.md` only when the current write scope or failing evidence requires the deeper artifact.
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/epic.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/features/F-001-001-student-health-card.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/issues.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/modules/M-001-001-student-health-card.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/pages/P-001-001-student-detail-screen.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/sync/20261005-154739-doc-reconcile-student-health.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-001-student-health-tracking/tasks/T-001-001-001-student-health-advice.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/epic.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/features/F-002-001-child-development-milestones.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/issues.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/modules/M-002-001-child-development-milestones.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/pages/P-002-001-child-development-milestones.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/sync/20261005-175500-child-development-entry-point.md`
- Required read: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents/docs/development/E-002-child-development-milestones/tasks/T-002-001-001-child-development-milestones.md`
- Required read: start with the changed files listed under `## 4.1 Dynamic Execution Signals` before widening to adjacent artifacts.

### Forbidden Default Reads

- Forbidden by default: schema and migration files
- Forbidden by default: analytics stacks
- Forbidden by default: cloud orchestration
- Forbidden by default: unrelated persistence layers

### Expansion Triggers

- Read page, feature, hook, and browser-interaction artifacts first.
- Do not widen into data-contract or infrastructure context without failing evidence.
- Load frontend, technical lead, and QA skills unless the spec explicitly says otherwise.
- Read the `docs/development/` notes listed in this brief before widening beyond the current work slice.
- If the required epic/feature/module/page/task note is missing, stop and reconcile the development ledger instead of improvising from code alone.

## Review Topology

| Review Stage | Primary Reviewer | Input Artifact | Output Artifact |
| --- | --- | --- | --- |
| Spec challenge | `aurora-plan-challenger` | `spec.md` | Validated statutory scope without competitive ranking |
| Architecture challenge | `alan-tech-lead` | `plan.md`, `contracts/` | Verified 5-axis SVG radar math & Decree 13 consent model |
| Verification sign-off | `ada-qa-agent` | `verification.md` | Evidence-backed release recommendation |


## Escalation Rules

- Escalate when documentation prerequisites are missing or misleading.
- Escalate when verification fails repeatedly without new evidence.
- Escalate when write scope conflicts with another agent's ownership.
- Escalate immediately if any regulatory conflict arises between MOET preschool circulars and Ministry of Health anthropometric standards.
