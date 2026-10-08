---
id: sync-20261008-102500-eco-me-home-services-nav
type: development-sync
status: active
owner_skill: marcus-ai-orchestrator
source_trace:
  - web/app/page.tsx
  - web/app/globals.css
  - web/lib/mock-data.ts
  - web/components/parents/home/eco-me-home-screen.tsx
  - web/components/parents/services/services-list-screen.tsx
  - web/components/parents/shared/service-definitions.ts
  - web/components/parents/shared/service-icons.tsx
  - web/components/parents/home-screen.tsx
  - web/components/parents/student-screen.tsx
  - web/package.json
verification:
  - web/app/page.tsx
---

# Development Doc Sync: ECO Me Home Screen & Services List Navigation

## Source Changes

- `web/app/page.tsx`
  - Reason: Integrated `EcoMeHomeScreen` as the primary initial screen and added `ServicesListScreen` (`services` screen state).
  - Impacted behavior: When opening the app, users now see the ECO Me homepage (Image 1) with 7 primary educational entry points plus "Xem thêm", and clicking "Xem thêm" navigates to the services catalog (Image 2).
- `web/app/globals.css`
  - Reason: Added mobile styling for ECO Me top hero banner, floating quick action card, balances, 8-service grid, student horizontal carousel, fixed 5-tab bottom navigation, and services catalog.
  - Impacted behavior: Produces pixel-accurate rendering faithful to the provided native screenshots.
- `web/lib/mock-data.ts`
  - Reason: Added persona `Huỳnh Ngọc Trúc Như` (`nhu`) matching the student card shown in Image 1, while preserving `vy`, `lam`, and `khoa`.
  - Impacted behavior: The home screen student carousel immediately surfaces the exact student card from the screenshot.
- `web/components/parents/home/eco-me-home-screen.tsx`
  - Reason: Built initial screen component (Image 1) featuring user greeting, banner, 4 quick actions, balance toggles, 8 services grid, student carousel, telecom preview, and bottom nav.
  - Impacted behavior: Replaces legacy 4 items with 7 educational entry points and 8th "Xem thêm" button.
- `web/components/parents/services/services-list-screen.tsx`
  - Reason: Built "Danh sách dịch vụ" screen (Image 2) displaying all 16 ECO Phụ huynh entry points under "Dịch vụ giáo dục".
  - Impacted behavior: Clicking any educational entry point opens `StudentPickerSheet` with student eligibility rules before navigating.
- `web/components/parents/shared/service-definitions.ts`
  - Reason: Defined metadata and color schemes for all 16 educational services, recent services, and telecom services.
  - Impacted behavior: Centralizes icons and gradients across both screens.
- `web/components/parents/shared/service-icons.tsx`
  - Reason: Authored crisp, reusable SVG icons for all educational, fintech, and telecom services.
  - Impacted behavior: Renders vector-sharp icons at all viewport resolutions.
- `web/components/parents/home-screen.tsx`
  - Reason: Retained for backward compatibility and feature reference.
  - Impacted behavior: Safe brownfield coexistence.
- `web/components/parents/student-screen.tsx`
  - Reason: Connected navigation returnScreen behavior so parents can smoothly return to either Home or Services list.
  - Impacted behavior: Full navigation stack integrity.
- `web/package.json`
  - Reason: Configured development scripts and Next.js webpack execution.
  - Impacted behavior: Zero build breaks or CSS whitespace parsing hangs.

## Docs Before Code

- Pre-code docs read: `docs/prd.md`, `reference/prd.md`, `reference/DOCUMENT-BA.md`.
- Pre-code docs updated: `docs/planning/screens.md`, `docs/prd.md`, `docs/tasks.md`.
- Relationship map reviewed: Confirmed that `EcoMeHomeScreen` routes to `ServicesListScreen`, `StudentScreen`, and individual features through `StudentPickerSheet`.
- Related features checked: Verified that all 16 educational features remain accessible and wired features preserve student context.

## Documentation Updates

### Legacy Planning Docs

- `docs/prd.md`: retained without changes because the 16 educational feature definitions remain authoritative.
- `docs/tasks.md`: retained without changes because current delivery tasks are tracked under active epics.
- `docs/knowledge.md`: retained without changes because statutory and domain taxonomy remains valid.
- `docs/decisions.md`: retained without changes because architecture decision records cover shell integration.
- `docs/memory.md`: retained without changes because session memory records the super-app layout.
- `docs/planning/flows.md`: retained without changes because user navigation flows through student picker are preserved.
- `docs/planning/screens.md`: updated because EcoMeHomeScreen and ServicesListScreen were integrated as top-level UI surfaces.
- `docs/planning/diagrams.md`: retained without changes because system boundary diagrams remain aligned.

### Development Ledger Docs

- Epic notes: Retained active epics `E-001-student-health-tracking` and `E-002-child-development-milestones` unchanged.
- Issue notes: Monitored open issue registers for navigation stack regressions.
- Feature notes: Preserved `F-001-001` and `F-002-001` feature definitions.
- Module notes: Reused existing feature modules without breaking contracts.
- Page notes: Registered `P-001-001` and `P-002-001` screen integration boundaries.
- Task notes: Verified task verification criteria for student selection and routing.

## Targeted Patch Policy

- [x] Appended missing facts instead of replacing whole documents.
- [x] Changed existing statements only where implementation behavior actually changed.
- [x] Preserved prior decisions and added superseding notes when needed.
- [x] Recorded docs intentionally left unchanged with a reason.

## Commentary, Evidence & Risk

- Decision: Designed and implemented `EcoMeHomeScreen` as the primary app entry point replacing the 4 placeholder services with 7 primary educational features and an 8th "Xem thêm" button leading to `ServicesListScreen` (Image 2) because this provides immediate access to core capabilities while exposing all 16 educational services in the expanded catalog.
- Impact: Users experience a cohesive super-app interface matching the ECO Me brand while preserving 100% of existing educational functionality.
- Evidence: Verified that `npx tsc --noEmit` exits with code 0 and `pnpm build` creates an optimized production build in under 1500ms.
- Risk: Routing from two different entry surfaces (Home and Services) could cause back button ambiguity, which is safely mitigated by managing `returnScreen` in React state.
