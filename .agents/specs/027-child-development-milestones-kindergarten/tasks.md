# Task Breakdown: Child Development Milestones - Kindergarten

> Feature ID: `027-child-development-milestones-kindergarten`
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
  1. write or identify the failing test or verification criteria,
  2. execute the verification procedure and confirm the baseline,
  3. implement the minimal code changes,
  4. run the passing verification and record evidence.
- Review tasks must run in this order: spec compliance, then code quality.
- If a task cannot satisfy automated TDD, record the explicit exception and accepted risk.

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

## Parallel Groups

- Group A: `T001`, `T002` (Product specification, statutory research, and data contract authoring).
- Group B: `T003`, `T004` (Frontend radar rendering, milestone listing, and privacy-gated submission drawer).

## Execution Monitoring

- Required pre-code gates: `validate_specs.py` passes, `validate_planning_research.py` passes, `run_required_docs_gates.py` passes.
- Mid-slice checkpoints: Verify pentagonal geometry math ($72^\circ$ radial steps) before wiring live data; test Decree 13 checkbox validation before media upload.
- Circuit breaker after repeated failure: Halt implementation if radial coordinate distortion exceeds 1px or if consent gate allows bypass.
- Human escalation trigger: Escalate to operator if new circular regulations contradict the 5-domain structure.

## Review Loop Tasks

- `R1`: Spec compliance review task: Verify Thông tư 51/2020 5 domains, Thông tư 52/2020 non-ranking labels, and Nghị định 13/2023 consent gate.
- `R2`: Code quality review task: Verify TypeScript 5.7 strict mode, zero `any` types, and Next.js 16 App Router bundle efficiency.
- `R3`: Verification readiness review task: Verify mobile layout rendering (390x844), lag alert styling, and sibling switching responsiveness.
- `R4`: Post-evidence reconcile task: Synchronize documentation manifests, update session log, and finalize release recommendation.

## Completion Checklist

- [x] `spec.md` accepted
- [x] `plan.md` accepted
- [x] `contracts/` complete with `child-development-types.ts`
- [x] `tasks.md` complete
- [ ] `verification.md` contains evidence
- [ ] Root `agents.md` updated
- [ ] TrustGraph write attempted
