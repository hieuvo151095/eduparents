# Task Breakdown: ECO School Parents Application Redesign

> Feature ID: `025-025-edu-school-parents-redesign`  
> Plan: `plan.md`  

## Task Rules

- `[P]` means parallel-safe with disjoint write scope.
- Every task needs one owner and one verification method.
- Do not mark a task complete until `verification.md` has evidence.
- Every task must name the documentation artifact it updates before or alongside code.
- Every implementation task must declare what would block or fail it.

## Superpowers V34 Task Discipline

- Implementation tasks must be bite-sized and include exact file paths.
- Behavior-changing tasks must name the RED-GREEN-REFACTOR path:
  1. write or identify the failing test,
  2. run it and record the expected failure,
  3. implement the minimal fix,
  4. run the passing verification.
- Bugfix tasks must record root cause evidence before any fix.
- Review tasks must run in this order: spec compliance, then code quality.
- If a task cannot satisfy TDD, record the explicit exception and accepted risk.

## Tasks

- [ ] `T001` Owner: `aris-designer` Write Scope: `/index.css`. Verification: Inspection of CSS design tokens and responsive scales. Docs: `/docs/knowledge.md`. Sync: Aligned with legacy brand palette.
- [ ] `T002` Owner: `benny-frontend-engineer` Write Scope: `/src/components/HomeHeader.js`, `/src/components/FeatureGrid.js`. Verification: Test 15 entry points grid pagination across 2 pages. Docs: `/docs/planning/screens.md`. Sync: Grid navigation aligned with spec.
- [ ] `T003` Owner: `benny-frontend-engineer` Write Scope: `/src/components/StudentPickerModal.js`, `/src/context/StudentContext.js`. Verification: Test bottom sheet drawer opening and `"Đổi"` header button context switching. Docs: `/docs/planning/flows.md`. Sync: Reactive student context updates.
- [ ] `T004` Owner: `benny-frontend-engineer` Write Scope: `/src/views/AbsenceListView.js`, `/src/views/AbsenceFormView.js`, `/src/components/SuccessModal.js`. Verification: Test 4-step Báo vắng leave request flow. Docs: `/docs/prd.md`. Sync: Absence request lifecycle.
- [ ] `T005` Owner: `benny-frontend-engineer` Write Scope: `/src/views/TopUpFormView.js`, `/src/views/TopUpConfirmView.js`, `/src/components/PinModal.js`, `/src/views/TopUpSuccessView.js`. Verification: Test 4-step card top-up financial flow with PIN auth. Docs: `/docs/prd.md`. Sync: Card top-up transaction lifecycle.
- [ ] `T006` Owner: `ada-qa-agent` Write Scope: `/tests/e2e/redesign.spec.js`. Verification: Playwright automated test assertions passing. Docs: `/docs/tasks.md`. Sync: Zero regression test pass.

## Parallel Groups

- Group A: `T001` (CSS Design System), `T002` (Grid Navigation Component).
- Group B: `T004` (Báo Vắng Module), `T005` (Nạp Điểm Module).

## Execution Monitoring

- Required pre-code gates: Spec validation exit code 0.
- Mid-slice checkpoints: Playwright component test pass.
- Circuit breaker after repeated failure: Halt and request operator arbitration.
- Human escalation trigger: Scope or design boundary conflict.

## Review Loop Tasks

- `R1`: Spec compliance review task: Verify 100% mapping to `Redesign Flow.docx` and 22 reference PNG screenshots.
- `R2`: Code quality review task: Audit CSS BEM conventions, accessibility attributes, and zero framework bloat.
- `R3`: Verification readiness review task: Run Playwright test suite and check evidence log in `verification.md`.
- `R4`: Post-evidence reconcile task: Update root `agents.md` session log.

## Completion Checklist

- [x] `spec.md` accepted
- [x] `plan.md` accepted
- [x] `contracts/` complete or explicitly not applicable
- [x] `tasks.md` complete
- [ ] `verification.md` contains evidence
- [x] Root `agents.md` updated
- [ ] TrustGraph write attempted
