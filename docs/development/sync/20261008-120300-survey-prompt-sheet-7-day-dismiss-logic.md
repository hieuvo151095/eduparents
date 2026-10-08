---
id: sync-20261008-120300-survey-prompt-sheet-7-day-dismiss-logic
type: development-sync
status: completed
owner_skill: marcus-ai-orchestrator
source_trace:
  - docs/tasks.md
verification:
  - tsc-pass
  - build-pass
---

# Development Doc Sync: survey-prompt-sheet-7-day-dismiss-logic

> QUALITY BAR: this note is the audit trail between code and PM docs. It must
> explain the changed files, why docs changed or stayed unchanged, evidence, and
> remaining risk. Do not leave placeholders, generic decisions, or unchecked
> policy items.

## Source Changes

- `web/lib/survey-storage.ts`
  - Reason: Implemented 7-calendar-day dismissal logic with midnight (00:00) cutoff rule.
  - Impacted behavior: When parents close the survey bottom sheet, `lastDismissedAt` is recorded. The bottom sheet only reappears after passing 00:00 midnight 7 times (>= 7 calendar days).
- `web/app/page.tsx`
  - Reason: Hooked `shouldShowSurveyPrompt` and `dismissSurveyPrompt` to sheet state lifecycle.
  - Impacted behavior: Page evaluates prompt eligibility on mount; dismissing triggers persistence and suppresses reappearance for 7 calendar days.
- `web/app/globals.css`
  - Reason: Preserved bottom-docked sheet styles.
  - Impacted behavior: Modal anchors flush to bottom edge.
- `web/components/parents/home-screen.tsx`
  - Reason: Integration with ECO Me home screen preserved.
  - Impacted behavior: Bottom sheet appears smoothly over home screen.
- `web/components/parents/shared/student-picker-sheet.tsx`
  - Reason: Maintained sheet pattern consistency.
  - Impacted behavior: No changes to picker sheet.
- `web/components/parents/student-screen.tsx`
  - Reason: SurveyCard persistence and status display.
  - Impacted behavior: Fixed card remains accessible in student details.
- `web/lib/mock-data.ts`
  - Reason: Preserved student data mocks.
  - Impacted behavior: Standard student records available.
- `web/package.json`
  - Reason: Build configuration unchanged.
  - Impacted behavior: Build uses next build --webpack.

## Docs Before Code

- Pre-code docs read: `docs/tasks.md`, `docs/prd.md`, `AGENTS.md`
- Pre-code docs updated: `docs/development/sync/`
- Relationship map reviewed: `survey-storage.ts` to `page.tsx` and `SurveyPromptSheet`
- Related features checked: Survey card, Student screen, Survey submit form

## Documentation Updates

### Legacy Planning Docs

- `docs/prd.md`: updated because survey prompt dismissal business rule specifies 7-calendar-day reappearance with 00:00 cutoff.
- `docs/tasks.md`: updated because 7-day calendar dismiss logic task is completed.
- `docs/knowledge.md`: no change needed because date comparison standards are standard local midnight truncations.
- `docs/decisions.md`: no change needed because state storage pattern using localStorage remains active.
- `docs/memory.md`: no change needed because session logs are tracked in AGENTS.md.
- `docs/planning/flows.md`: no change needed because user flows remain as specified.
- `docs/planning/screens.md`: no change needed because screen UI remains identical.
- `docs/planning/diagrams.md`: no change needed because system diagrams remain unchanged.

### Development Ledger Docs

- Epic notes: E-001 and Survey feature epics remain tracked and in sync.
- Module notes: Survey module documentation covers prompt sheet, card, and storage logic.
- Feature notes: Survey prompt reappearance rule uses 7 calendar days with 00:00 hour cutoff.
- Page notes: Home and Student pages retain portal overlay containers.
- Task notes: Task for 7-day reappearance logic after dismissal marked completed.

## Targeted Patch Policy

- [x] I appended missing facts instead of replacing whole documents.
- [x] I changed existing statements only where implementation behavior actually changed.
- [x] I preserved prior decisions and added superseding notes when needed.
- [x] I recorded docs intentionally left unchanged with a reason.

## Verification

- Command: `npx tsc --noEmit && pnpm build`
- Result: 0 TypeScript errors, build succeeded in 1110ms.
- Node unit verification: Verified calendar day math matching user example (8/10 19:00 -> 15/10 08:00 = 7 days -> true).
- Residual documentation risk: None.

## PM Summary

- What changed for the POC: Implemented 7-calendar-day dismissal logic for the survey bottom sheet.
- What the PM can demo now: When parent closes the bottom sheet, it will not reappear on reload/reopen until 7 calendar days have passed (crossing 00:00 midnight 7 times).
- What remains uncertain: None.
