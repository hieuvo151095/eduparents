# Quickstart Validation: Child BMI Tracking and Hoc Sinh Screen

> Feature ID: `026-child-bmi-tracking-and-hoc-sinh-screen`

## Local Preconditions

- Required services: Local HTTP server (`python3 -m http.server 8080`)
- Required environment variables: Standard local node and python environment
- Required commands: `npx playwright test`, `python3 .agents/scripts/validate_specs.py --feature .agents/specs/026-child-bmi-tracking-and-hoc-sinh-screen`

## Validation Path

1. Run:
   ```bash
   npx playwright test
   ```
2. Confirm:
   ```text
   All tests pass including new tests for Hoc Sinh screen and View BMI section.
   ```

## Expected Artifacts

- Files created:
  - `src/views/HocSinhDetailView.js`
  - `src/components/StudentBmiSection.js`
  - `src/utils/bmiCalculator.js`
  - `src/data/studentBmiMockData.js`
- Files modified:
  - `src/app.js`
  - `src/views/EcoSchoolHomepageView.js`
  - `index.css`
  - `tests/e2e/redesign.spec.js`

## POC Rehearsal

- Smallest end-to-end path to demonstrate:
  1. Open app at `http://localhost:8080`.
  2. Click "ECO Phụ huynh" to navigate to ECO School.
  3. Click Lý Tường Lam's card in "Danh sách học sinh".
  4. Verify transition to "Học sinh" screen with profile info, 8 utility buttons, card balance, and View BMI section.
  5. Check BMI score (17.5) and status pill ("Thiếu cân" in blue).
  6. Inspect 6-checkup history timeline.
  7. Tap "👥 Đổi" to switch to Phan Khánh Vy and verify in-place recalculation.
- Criteria to stop and revise docs before broader execution:
  - Any formula discrepancy with Asian WHO cutoffs or layout shift outside mobile simulator frame.

## Rollback Check

- Revert router addition in `src/app.js` and student card click handler in `src/views/EcoSchoolHomepageView.js`.
