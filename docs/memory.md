---
id: MEMORY-EDU-PARENTS
title: Cross-Session Continuity & Architectural Memory — ECO School Phụ huynh
status: active
owner_skill: marcus-ai-orchestrator
source_trace:
  - agents.md
  - HANDOFF.md
  - docs/research/contradictions.md
verification:
  - agents.md
---

# Cross-Session Continuity & Architectural Memory: ECO School Phụ huynh

## 1. Project Context and State

The project was consolidated into `/Users/hieuvo/Desktop/Finviet/EDU School_Parents` on 2026-10-05, moving all code and git history from the former repository at `/Users/hieuvo/eduparents`. The active application runs in the `web/` subfolder on Next.js 16 (React 19, TypeScript 5.7). The Git branch `main` includes recent commits `9dfd9ed` ("Gợi ý cho ba mẹ" health advice feature) and `c6e9ae0` (Claude Code BA workflow toolkit). Reconciled Epic E-001 (Student Health Tracking & Z-score) is fully documented in `docs/development/E-001-student-health-tracking/`.

## 2. In-Memory Constraints and Legal Architecture Invariants

- Navigation state is owned by a single React state hook tracking the active Screen string identifier in `web/app/page.tsx`. No client-side browser history router or URL query manipulation is used.
- All student data is mock-driven via `MOCK_STUDENTS` in `web/lib/mock-data.ts`. Mutating operations occur in-memory without a remote database connection.
- Port 3100 is the designated local preview port (`http://localhost:3100`).
- Hand-crafted CSS in `web/app/globals.css` governs visual tokens; Tailwind utility classes are intentionally not utilized in markup.
- For early childhood development features (Epic E-002), the system strictly follows Vietnamese educational law:
  - 5 developmental domains under Circular 51/2020/TT-BGDĐT (Physical, Cognitive, Language, Social-Emotional, Aesthetic).
  - 5-axis pentagonal SVG radar chart geometry.
  - Zero competitive ranking badges under Circular 52/2020/TT-BGDĐT.
  - Mandatory parental consent gate under Decree 13/2023/ND-CP.
  - High school students (such as `khoa`) are routed away from kindergarten milestone trackers to academic gradebooks.
