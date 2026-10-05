# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a **pixel-mockup rebuild of a parent-facing school mobile app** ("ECO School Phụ huynh") inside a simulated iPhone frame (`web/app/page.tsx`). It mirrors a sibling project called **eduteachers** and an original vanilla JS prototype at the root (`index.html`, `scripts/app.js`, `styles/main.css`). The Next.js app under `web/` is the active codebase; the vanilla prototype and `reference/` (PNG mockups, `prd.md`, `screens.md`, `flows.md`) are reference specs.

There is no backend, database, or authentication — everything runs client-side and renders inside a simulated 390×844 mobile frame.

## Commands

```bash
cd web
pnpm install
pnpm dev      # start dev server on port 3100 (next dev --webpack -p 3100)
pnpm build    # production build (next build)
npx tsc --noEmit # typecheck
```

Package manager is **pnpm** (`web/pnpm-lock.yaml`, `web/pnpm-workspace.yaml`).

## Architecture

### Navigation Model
`web/app/page.tsx` owns the top-level screen state union (`Screen = 'home' | 'student' | 'profile' | 'fee' | 'topup' | 'absence' | 'results' | 'homework' | 'phieu-be-ngoan' | 'link-student' | 'help'`). Navigation is handled via `useState<Screen>` switches; each feature component receives callbacks like `onBack` and `onNavigate`.

### Directory Layout (`web/`)
- `app/page.tsx` — Top-level screen switch and iPhone frame chrome.
- `app/globals.css` — All styling (plain CSS with custom design tokens, no active Tailwind utility classes).
- `components/parents/`:
  - `home-screen.tsx` — Main dashboard: 2-page icon grid + linked student cards.
  - `student-screen.tsx` — "Học sinh" detail: Asian WHO BMI-for-age Z-score card, "Gợi ý cho ba mẹ" advice sheet, and recent activity.
  - `profile/` — "Hồ sơ học sinh" (read-only child profile).
  - `phieu-be-ngoan/` — "Phiếu bé ngoan" (behavior card, weekly calendar, Top 3 leaderboard).
  - `fee/` — "Đóng học phí" (invoice review and payment).
  - `topup/` — "Nạp điểm vào thẻ" (card balance top-up flow).
  - `absence/` — "Báo vắng" (attendance tracking and leave request).
  - `homework/` — "Bài tập" (homework assignment list).
  - `results/` — "Kết quả học tập" (academic scores).
  - `link-student/` — "Liên kết học sinh" (student code linkage).
  - `help/` — In-app guide and FAQ.
  - `shared/` — TopBar, StudentPickerSheet, OverlayPortal, Dialog, sheets.
- `lib/mock-data.ts` — Single source of truth for mock student data (`MOCK_STUDENTS`: `vy`, `khoa`, `lam`).
