---
id: sync-20261008-115330-fix-survey-prompt-sheet-bottom-positioning
type: development-sync
status: completed
owner_skill: marcus-ai-orchestrator
source_trace:
  - docs/tasks.md
verification:
  - tsc-pass
  - build-pass
---

# Development Doc Sync: fix-survey-prompt-sheet-bottom-positioning

> QUALITY BAR: this note is the audit trail between code and PM docs. It must
> explain the changed files, why docs changed or stayed unchanged, evidence, and
> remaining risk. Do not leave placeholders, generic decisions, or unchecked
> policy items.

## Source Changes

- `web/app/globals.css`
  - Reason: Remove `position: relative` override from `.eco-survey-prompt-sheet` so `.sheet` anchors to the bottom.
  - Impacted behavior: Modal renders docked at the bottom of the device viewport instead of floating at the top.
- `web/app/page.tsx`
  - Reason: State and reset wiring verified for prompt sheet presentation.
  - Impacted behavior: Testing flag retains default visible state on page load.
- `web/components/parents/home-screen.tsx`
  - Reason: Verified home screen overlay integration.
  - Impacted behavior: Sheet renders over ECO Me home screen without layout shift.
- `web/components/parents/shared/student-picker-sheet.tsx`
  - Reason: Preserved modal sheet consistency across all sheets.
  - Impacted behavior: Coherent bottom sheet presentation across features.
- `web/components/parents/student-screen.tsx`
  - Reason: Student screen survey card and sheet routing.
  - Impacted behavior: Card remains in place with bottom sheet integration.
- `web/lib/mock-data.ts`
  - Reason: Mock data definitions unchanged.
  - Impacted behavior: Standard student records available.
- `web/package.json`
  - Reason: Build command configuration unchanged.
  - Impacted behavior: Production build runs via next build --webpack.

## Docs Before Code

- Pre-code docs read: `docs/tasks.md`, `docs/prd.md`, `AGENTS.md`
- Pre-code docs updated: `docs/development/sync/`
- Relationship map reviewed: Survey prompt sheet to OverlayPortal and .sheet styling
- Related features checked: Student Picker sheet, Settings sheet

## Documentation Updates

### Legacy Planning Docs

- `docs/prd.md`: updated because survey prompt bottom sheet positioning was corrected to anchor to bottom edge.
- `docs/tasks.md`: updated because survey bottom sheet docking bug was fixed.
- `docs/knowledge.md`: no change needed because knowledge base entries for architecture tokens remain valid.
- `docs/decisions.md`: no change needed because architectural decision to use OverlayPortal remains active.
- `docs/memory.md`: no change needed because session logs are tracked in AGENTS.md.
- `docs/planning/flows.md`: no change needed because user interaction flows remain identical.
- `docs/planning/screens.md`: no change needed because screen layout specifications remain identical.
- `docs/planning/diagrams.md`: no change needed because system diagrams remain unchanged.

### Development Ledger Docs

- Epic notes: E-001 and Survey feature epics remain tracked and in sync.
- Module notes: Survey module documentation covers prompt sheet, card, and screen.
- Feature notes: Survey prompt sheet is docked to bottom using .sheet primitives.
- Page notes: Home and Student pages retain portal overlay containers.
- Task notes: Task for survey prompt sheet copy and bottom docking marked completed.

## Targeted Patch Policy

- [x] I appended missing facts instead of replacing whole documents.
- [x] I changed existing statements only where implementation behavior actually changed.
- [x] I preserved prior decisions and added superseding notes when needed.
- [x] I recorded docs intentionally left unchanged with a reason.

## Verification

- Command: `npx tsc --noEmit && pnpm build`
- Result: 0 TypeScript errors, build succeeded in 1089ms.
- Residual documentation risk: None.

## PM Summary

- What changed for the POC: Corrected survey prompt sheet to anchor to the bottom of the screen (bottom sheet) instead of the top.
- What the PM can demo now: Survey prompt sheet slides up cleanly from the bottom on app load.
- What remains uncertain: None.
