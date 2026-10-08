---
id: sync-20261005-175500-child-development-entry-point
type: development-sync
parent_epic: E-002-child-development-milestones
status: active
owner_skill: marcus-ai-orchestrator
source_trace:
  - web/components/parents/home-screen.tsx
  - web/components/parents/student-screen.tsx
  - web/components/parents/development/index.tsx
  - web/app/page.tsx
verification:
  - web/components/parents/development/index.tsx
---

# Development Doc Sync: Child Development Entry Point & Kindergarten Screen

## Source Changes

- `web/components/parents/home-screen.tsx`
  - Reason: Added `development` icon to `PAGE2` (feature carousel Slide 2) and restricted student picker to preschool students via `isMamNonStudent`.
  - Impacted behavior: Parents tapping "Tiến trình phát triển" in the home slide can select only kindergarten students (Vy, Lam), excluding K12 students (Khoa).
- `web/components/parents/student-screen.tsx`
  - Reason: Added `onOpenDevelopment` prop and rendered a compact "Tiến trình phát triển" card below HealthCard for kindergarten students.
  - Impacted behavior: Parents can navigate directly into child development from the student cockpit.
- `web/components/parents/development/index.tsx`
  - Reason: Created main container component for early childhood development milestones.
  - Impacted behavior: Renders the 5-domain radar, age band filters, milestone cards, and Decree 13 consent drawer.
- `web/lib/development-data.ts`
  - Reason: Created mock milestone data for Vy and Lam, 5 statutory domains, polar geometry calculation, and teacher evaluation report.
  - Impacted behavior: Provides typed data contracts and coordinate math for 5-axis SVG radar.
- `web/app/page.tsx`
  - Reason: Added `'development'` to `Screen` type and rendered `ChildDevelopmentScreen`.
  - Impacted behavior: Enables seamless topbar back navigation and state transitions.

## Docs Before Code

- Pre-code docs read: `docs/prd.md`, `.agents/specs/027-child-development-milestones-kindergarten/execution-brief.md`, `reference/DOCUMENT-BA.md`.
- Pre-code docs updated: `docs/prd.md`, `docs/tasks.md`, `docs/knowledge.md`.
- Relationship map reviewed: Confirmed that `F-002-001` depends on `M-002-001` and renders inside `P-002-001`.
- Related features checked: Verified that sibling switching works reactively between Vy (Lớp Lá) and Lam (Lớp Mầm).

## Documentation Updates

### Legacy Planning Docs

- `docs/prd.md`: updated because child development entry point and screens are now integrated in code.
- `docs/tasks.md`: updated because Task T-002-001-001 is now implemented and verified.
- `docs/knowledge.md`: retained without changes because statutory knowledge base already covers Circulars 51, 52, and 23.
- `docs/decisions.md`: retained without changes because architectural decisions ADR-004, ADR-005, and ADR-006 already govern this implementation.
- `docs/memory.md`: retained without changes because system constraints and early childhood boundaries remain stable.
- `docs/planning/flows.md`: retained without changes because observation and consent flow was fully modeled.
- `docs/planning/screens.md`: updated because ChildDevelopmentScreen is now live in the web application.
- `docs/planning/diagrams.md`: retained without changes because pentagonal geometry and state diagrams are current.

### Development Ledger Docs

- Epic notes: Created `docs/development/E-002-child-development-milestones/epic.md` documenting Jira Story, Priority, and Acceptance Criteria.
- Issue notes: Created `docs/development/E-002-child-development-milestones/issues.md` documenting risks and closed defects.
- Feature notes: Created `docs/development/E-002-child-development-milestones/features/F-002-001-child-development-milestones.md` detailing user value, acceptance criteria, and edge cases.
- Module notes: Created `docs/development/E-002-child-development-milestones/modules/M-002-001-child-development-milestones.md` explaining 5-axis geometry and coordinate math.
- Page notes: Created `docs/development/E-002-child-development-milestones/pages/P-002-001-child-development-milestones.md` detailing state machine and mobile viewport layout.
- Task notes: Created `docs/development/E-002-child-development-milestones/tasks/T-002-001-001-child-development-milestones.md` recording write scope, tests, and handoff.

## Targeted Patch Policy

- [x] Appended missing facts instead of replacing whole documents.
- [x] Changed existing statements only where implementation behavior actually changed.
- [x] Preserved prior decisions and added superseding notes when needed.
- [x] Recorded docs intentionally left unchanged with a reason.

## Commentary, Evidence & Risk

- Decision: Implemented the entry point in Home Slide 2 (`PAGE2`) and restricted candidate selection strictly to kindergarten students using `MOCK_STUDENTS.filter(isMamNonStudent)` because K12 students (such as Khoa in Lớp 10A1) have separate high school academic gradebooks.
- Impact: Parents of preschool students can immediately discover and track holistic child growth across all 5 statutory domains (Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Xã hội, Thẩm mỹ) without confusion from older sibling interfaces.
- Evidence: Verified fresh execution of `npx tsc --noEmit` (0 errors) and `pnpm build` (production build compiled successfully in 962ms).
- Risk: Potential residual risk regarding large video uploads (> 30s) is safely mitigated by restricting client uploads to 3 images or short clips with explicit Decree 13/2023 parental consent confirmation.
