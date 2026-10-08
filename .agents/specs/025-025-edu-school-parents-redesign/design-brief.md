# Design Brief: ECO Design System Enforcement

> **Feature Scope**: Global Design System Compliance for EDU School Parents & ECO Me  
> **Workspace Target**: `/Users/hieuvo/Desktop/Finviet/EDU School_Parents`  
> **Active Design System Contract**: `.agents/design-systems/eco/DESIGN.md`  
> **Reference Directory**: `ECO Design System/`  

---

## 1. Discovery Fields

### `business_goal`
Establish, enforce, and govern absolute compliance across all subsequent and existing application features with the official ECO Design System 1.0 (Consumer) extracted from Figma (`2qyslm7pi9Cg6pdGLen5As`). Eliminate visual design drift, ad-hoc hex styling, non-standard component geometries, and unlocalized strings, ensuring a coherent, enterprise-grade brand experience for Vietnamese parents, students, and educators.

### `primary_user`
Vietnamese parents managing student academic records, paying tuition fees, monitoring school attendance, tracking student spending, and interacting with school homework assignments through mobile devices; and secondarily students and school administrative operators.

### `primary_flow`
1. Discovery & Selection: Any new or modified feature brief automatically binds to the `eco` design system contract (`.agents/design-systems/eco/DESIGN.md`).
2. Token Ingestion: Screens and components directly reference official CSS tokens defined in `ECO Design System/tokens/` (`colors.css`, `typography.css`, `spacing.css`, `shape.css`).
3. Component Assembly: Interfaces compose approved primitives from `ECO Design System/components/` (Button, ButtonBar, Chip, TextField, PinInput, NavigationBar, BottomNavigation, Sheet, Toast, Modal, Avatar).
4. Adherence Validation: Automated validation gates verify token compliance, no arbitrary hex codes, correct 1.5 line-height ratio, Vietnamese copy conventions, and passing Playwright E2E tests.

### `constraints`
- **Zero Ad-Hoc Styling**: All colors must use designated tokens (`--color-alias-brand`, `--color-primary-yellow*`, `--color-primary-blue*`, `--color-global-gray*`). Arbitrary hex colors like `#ff0000` or random box-shadows are forbidden.
- **Vietnamese Language Requirement**: All visible labels, notifications, prompts, and modal titles must be native Vietnamese in sentence case. English is strictly reserved for code and technical documentation.
- **Flat Surface Philosophy**: No full-bleed photo cards or heavy 10px+ blurred drop shadows on static list rows; components rely on clean 1px inset box-shadow outlines (`inset 0 0 0 1px var(--color-alias-outline)`).
- **Proportional Geometry**: Radii strictly constrained to 4px, 8px, 16px, 20px, 30px (pill), or 9999px. Spacing constrained to 4, 8, 12, 16, 20, 24, 32, 48, 64px.

### `approval_criteria`
1. Dedicated design system contract `.agents/design-systems/eco/DESIGN.md` exists and is ratified in `.agents/memory/constitution.md` (Article XIII).
2. `index.css` seamlessly imports and exposes official `ECO Design System/tokens/` without regressions.
3. `design-context.md` binds `active_design_system: eco` and documents allowed tokens, components, and layout patterns.
4. Validation scripts (`validate_design_readiness.py`, `validate_design_system_selection.py`, `validate_design_outputs.py`, `run_required_docs_gates.py`) pass with exit code 0.
5. Playwright E2E tests continue to execute with 100% pass rate.
