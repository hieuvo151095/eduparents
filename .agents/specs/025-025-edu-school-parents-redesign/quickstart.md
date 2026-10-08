# Quickstart Validation: ECO School Parents Application Redesign

> Feature ID: `025-025-edu-school-parents-redesign`

## Local Preconditions

- Required services: HTTP Server / Static Dev Server
- Required environment variables: None (uses client local mock state engine)
- Required commands: `npx http-server . -p 8080`, `npx playwright test`

## Validation Path

1. Run:
   ```bash
   npx http-server . -p 8080
   ```
2. Confirm:
   ```text
   Application available at http://localhost:8080 with 15 feature entry points grid and student bottom sheet drawer.
   ```

## Expected Artifacts

- Files, logs, screenshots, or documents that should exist after validation:
  - `/index.css` with CSS design tokens
  - `/src/components/FeatureGrid.js`
  - `/src/components/StudentPickerModal.js`
  - `/tests/e2e/redesign.spec.js`
- Docs or ledger notes that must be updated before declaring completion:
  - `verification.md` evidence log
  - Root `agents.md` session log

## POC Rehearsal

- Smallest end-to-end path to demonstrate: Complete 15-module grid navigation + student selection drawer + 4-step Báo vắng leave request flow.
- Evidence to capture during rehearsal: Playwright screenshot of student drawer and submitted absence request with status `Chờ duyệt`.
- Criteria to stop and revise docs before broader execution: Any failure in spec validation or harness preflight checks.

## Rollback Check

- Git reset to baseline commit tag before code execution slice.
