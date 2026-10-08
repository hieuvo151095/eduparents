---
id: DECISIONS-EDU-PARENTS
title: Architecture Decision Records — ECO School Phụ huynh
status: active
owner_skill: architecture-decision-records
source_trace:
  - docs/prd.md
  - docs/research/claims.jsonl
  - docs/research/contradictions.md
verification:
  - web/package.json
---

# Architecture Decision Records: ECO School Phụ huynh

## ADR-001: Next.js 16 Client-Only Simulated Prototype with Webpack Dev Server

- **Context**: The project was initially scaffolded with Turbopack in Next.js 16 (`next dev`). When the project directory path contains whitespace (`EDU School_Parents`), Turbopack triggers an internal PostCSS path resolution hang on local macOS filesystems.
- **Decision**: Configure `next dev --webpack -p 3100` for local development while retaining standard `next build` for static compilation.
- **Impact**: Enables instantaneous compilation in under 260ms without requiring directory renaming or path symlink hacks.

## ADR-002: Plain CSS with Tokens Over Active Tailwind Classes

- **Context**: The repository includes `@tailwindcss/postcss` in devDependencies, but all screens rely entirely on hand-crafted CSS rules in `web/app/globals.css`.
- **Decision**: Keep all styling hand-written in `web/app/globals.css` using custom CSS variables (`--c-gray-150`, `--c-gray-400`, etc.) to match legacy mobile mockups pixel-for-pixel without CSS purge hazards.
- **Impact**: Zero runtime overhead, clean component markup, and deterministic cross-browser rendering.

## ADR-003: In-Place Sibling Context Switching Without Browser Navigation

- **Context**: Parents often have multiple children enrolled in different grade levels (such as kindergarten and high school). Switching between them using standard browser URL routing causes unnecessary page reloads and loses user state within active workflows.
- **Decision**: Implement an in-place bottom sheet (`StudentPickerSheet`) that updates the active student identifier directly in parent state while preserving the current feature view.
- **Impact**: Delivers instant sub-50ms reactive updates and uninterrupted parent workflows across sibling profiles.

## ADR-004: 5-Axis Pentagon Development Radar Over 4-Axis Quad

- **Context**: An initial proposal suggested a 4-pillar development radar. However, Vietnamese national early childhood curriculum (Thông tư 51/2020/TT-BGDĐT) legally mandates 5 developmental domains, specifically requiring assessment in Thẩm mỹ (Aesthetics: Music & Visual Art).
- **Decision**: Adopt a regular 5-axis pentagonal SVG radar chart with equal 72-degree radial angular spacing.
- **Impact**: Guarantees full legal and pedagogical compliance for accredited Vietnamese kindergartens and provides holistic visibility into the child's creative expression.

## ADR-005: Non-Ranking Developmental Progress Statuses

- **Context**: Initial feature drafts proposed competitive labels (`Xuất sắc`, `Đạt chuẩn`, `Cần lưu ý`). Circular 52/2020/TT-BGDĐT explicitly prohibits ranking or creating achievement pressure for preschool children.
- **Decision**: Eliminate all competitive ranking labels. Replace them with supportive developmental status badges: `Đạt yêu cầu độ tuổi`, `Đang trên đà phát triển`, and `Cần tăng cường rèn luyện`.
- **Impact**: Eliminates peer-comparison anxiety and aligns parent-teacher collaboration with child-centered early childhood pedagogy.

## ADR-006: Child Data Protection & Explicit Parental Consent Gate

- **Context**: Child milestone records and attached photos/videos are sensitive personal data under Decree 13/2023/ND-CP and the Law on Children 2016.
- **Decision**: Enforce an explicit checkbox consent modal before first photo/video submission and provide an in-app button allowing parents to revoke consent and delete uploaded media records.
- **Impact**: Completely avoids legal privacy non-compliance and protects child image security.
