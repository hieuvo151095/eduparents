# Quickstart Validation: Child Development Milestones - Kindergarten

> Feature ID: `027-child-development-milestones-kindergarten`

## Local Preconditions

- Required services: Next.js dev server running on port 3100 (`http://localhost:3100`).
- Required environment variables: Standard local development environment (`NODE_ENV=development`).
- Required commands: Python 3.10+ with standard library, Node.js 18+, pnpm 9+.

## Validation Path

1. Run spec-driven planning validation:
   ```bash
   python3 .agents/scripts/validate_specs.py --feature .agents/specs/027-child-development-milestones-kindergarten
   ```
2. Confirm:
   ```text
   SPEC VALIDATION PASSED: 1 feature(s)
   ```
3. Run global planning docs gates:
   ```bash
   python3 .agents/scripts/run_required_docs_gates.py --root . --mode planning
   ```
4. Confirm:
   ```text
   REQUIRED DOCS GATES PASSED
   ```

## Expected Artifacts

- Files and documents created:
  - `.agents/specs/027-child-development-milestones-kindergarten/contracts/child-development-types.ts`
  - `docs/prd.md`, `docs/tasks.md`, `docs/knowledge.md`, `docs/decisions.md`, `docs/memory.md`
  - `docs/planning/flows.md`, `docs/planning/screens.md`, `docs/planning/diagrams.md`
  - `docs/research/sources.jsonl`, `docs/research/evidence.jsonl`, `docs/research/claims.jsonl`, `docs/research/contradictions.md`
- Documentation ledger notes updated before declaring completion:
  - Session log in `AGENTS.md`.

## POC Rehearsal

- Smallest end-to-end path to demonstrate:
  1. Open browser to `http://localhost:3100`.
  2. Select Phan Khánh Vy (Lớp Lá, 72 tháng) -> Verify 5-axis pentagonal radar renders with 5 domains including Thẩm mỹ.
  3. Filter by "Thẩm mỹ" tab -> Confirm art and music milestones displayed.
  4. Select Võ Phạm Hiểu Lam (Lớp Mầm, 46 tháng) -> Observe milestone roster filtered to 36-48 month band.
  5. Open "Ghi nhận mốc tại nhà" modal -> Verify Decree 13/2023 parental consent checkbox is required before submission.
- Evidence to capture during rehearsal: Screenshots of 5-axis radar chart, consent gate modal, and milestone delay card.
- Criteria to stop and revise docs before broader execution: Coordinate distortion on SVG radar or failure of consent gate to block submission.

## Rollback Check

- Revert any frontend modifications to `web/components/parents/` by checkout.
- The planning specifications and contracts in `.agents/specs/027-child-development-milestones-kindergarten/` are modular and decoupled from production build assets.
