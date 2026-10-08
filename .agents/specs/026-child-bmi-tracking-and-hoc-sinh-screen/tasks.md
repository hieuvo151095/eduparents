# Task Breakdown: Child BMI Tracking and Hoc Sinh Screen

> Feature ID: `026-child-bmi-tracking-and-hoc-sinh-screen`
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

- [ ] `T001` Owner: `sophia-product-manager` Write Scope: `spec.md`.
      Verification: no unresolved clarification markers unless explicitly
      accepted. Docs: `spec.md`, `verification.md`. Sync: n/a before code.
- [ ] `T002` Owner: `david-systems-architect` Write Scope: `plan.md`,
      `data-model.md`, `contracts/`, `quickstart.md`. Verification:
      constitution gates pass and interface boundaries are documented. Docs:
      `plan.md`, `data-model.md`, `quickstart.md`. Sync: update traceability if
      planning scope changes.
- [ ] `T003` Owner: `marcus-ai-orchestrator` Write Scope: `agent-routing.md`,
      `tasks.md`. Verification: every workstream has one owner, one write scope,
      one artifact, and one escalation path. Docs: `agent-routing.md`,
      `tasks.md`. Sync: update task matrix when write scopes or ordering change.
- [ ] `T004` Owner: `benny-frontend-engineer` Write Scope: `src/utils/bmiCalculator.js`,
      `src/data/studentBmiMockData.js`. Verification: node unit test verifying formula
      and Asian WHO cutoffs for 6 students. Docs: `plan.md`, `verification.md`.
- [ ] `T005` Owner: `benny-frontend-engineer` Write Scope: `src/views/HocSinhDetailView.js`,
      `src/components/StudentBmiSection.js`, `index.css`. Verification: view renders
      layout matching `Hoc sinh.PNG` with View BMI below entry points. Docs: `screens.md`.
- [ ] `T006` Owner: `benny-frontend-engineer` Write Scope: `src/app.js`,
      `src/views/EcoSchoolHomepageView.js`. Verification: clicking student card routes
      to student_detail view, back button returns to school_home. Docs: `flows.md`.
- [ ] `T007` Owner: `ada-qa-agent` Write Scope: `tests/e2e/redesign.spec.js`,
      `verification.md`. Verification: Playwright test suite passes 100% with no regressions.
      Docs: `verification.md`.

## Parallel Groups

- Group A: `T004` (BMI calculation logic and mock data).
- Group B: `T005` (View template and CSS styling).

## Execution Monitoring

- Required pre-code gates: `validate_specs.py`, `validate_planning_research.py`, and `validate_docs_substance.py` pass.
- Mid-slice checkpoints: Verify BMI calculation against boundary numbers (18.4, 18.5, 22.9, 23.0, 24.9, 25.0).
- Circuit breaker after repeated failure: Halt execution after 3 failed test iterations and review data contract.
- Human escalation trigger: Escalate if layout dimensions conflict with mobile device simulator constraints.

## Review Loop Tasks

- `R1`: Spec compliance review task: Verify layout matches `Hoc sinh.PNG` and section placement.
- `R2`: Code quality review task: Ensure zero console errors and clean Vanilla JS modularity.
- `R3`: Verification readiness review task: Ensure all Playwright tests pass cleanly.
- `R4`: Post-evidence reconcile task: Update development docs and verification log.

## Completion Checklist

- [x] `spec.md` accepted
- [x] `plan.md` accepted
- [x] `contracts/` complete or explicitly not applicable
- [x] `tasks.md` complete
- [ ] `verification.md` contains evidence
- [ ] Root `agents.md` updated
- [ ] TrustGraph write attempted
