# Feature Specification: Child BMI Tracking and Hoc Sinh Screen

> Feature ID: `026-child-bmi-tracking-and-hoc-sinh-screen`
> Created: `2026-09-07`
> Status: Draft
> Source Prompt: Design a feature to view the BMI of the child. Upon clicking the student card in ECO School Phụ huynh, lead to Hoc sinh screen based on ECO Me Legacy/Hoc sinh.PNG. The View BMI section is below the entry point section and above Hoạt động gần đây. Inputs: height (cm), weight (kg). View current BMI and result (Thiếu cân, Bình thường, Thừa cân, Béo phì) and history of latest 6 BMI numbers.

## 1. Purpose

Provide parents with a dedicated student management detail screen (`Học sinh` screen based on `ECO Me Legacy/Hoc sinh.PNG`) accessed upon clicking a student card in `ECO School Phụ huynh`. The screen consolidates student credentials, card balance, 8 utility shortcuts, an embedded **View BMI** health monitoring section (calculating BMI from height in cm and weight in kg, mapping to Asian WHO categories, and rendering a 6-checkup history log), recent student activities, and card top-up CTA.

## 2. User Stories

- [x] As a Parent, I need to click my child's card in ECO School Phụ huynh to navigate to their dedicated Học sinh screen with full profile credentials and quick utility actions.
- [x] As a Parent, I need to clearly view my child's calculated BMI index, classification status (Thiếu cân, Bình thường, Thừa cân, Béo phì), and visual health gauge so that I can track their physical development.
- [x] As a Parent, I need to review the history of the latest 6 BMI evaluations with growth deltas to identify trends over time.
- [x] As a Parent with multiple children, I need an in-place "Đổi" switcher to effortlessly compare BMI and academic data between siblings without returning to previous screens.
- [x] As an internal operator, I need strict adherence to Asian WHO classification cutoffs and legacy screen layout so that health insights remain reliable and user navigation remains intuitive.

## 3. Functional Requirements

- `FR-001`: The system MUST route clicking any student card under "Danh sách học sinh" in `ECO School Phụ huynh` directly to the `Học sinh` detail view (`currentView: 'student_detail'`).
- `FR-002`: The system MUST render the student profile header showing avatar, student full name, student ID, class, school, and an in-place `"👥 Đổi"` button.
- `FR-003`: The system MUST render the white card container with card points balance (`Số dư thẻ`), 8 utility shortcuts in a 4x2 grid, and pagination indicator pills.
- `FR-004`: The system MUST embed the View BMI section positioned strictly below the 8-entry-point card and strictly above the `"Hoạt động gần đây"` section.
- `FR-005`: The system MUST calculate BMI using formula $\text{BMI} = \text{weight (kg)} / (\text{height (cm)} / 100)^2$, rounded to 1 decimal place.
- `FR-006`: The system MUST categorize the calculated BMI into 4 discrete Asian WHO tiers:
  - Dưới 18.5: **Thiếu cân** (Blue `#3B82F6`)
  - Từ 18.5 - 22.9: **Bình thường** (Green `#10B981`)
  - Từ 23.0 - 24.9: **Thừa cân** (Orange `#F59E0B`)
  - 25.0 trở lên: **Béo phì** (Red `#EF4444`)
- `FR-007`: The system MUST render a chronological history timeline containing the latest 6 BMI measurement records with dates, heights, weights, BMI values, status badges, and growth deltas.
- `FR-008`: The system MUST render the `"Hoạt động gần đây"` section displaying itemized chronological school/account activity logs.
- `FR-009`: The system MUST render the bottom CTA button `"Nạp điểm vào thẻ"` linking to card top-up.
- `FR-010`: The system MUST recalculate student profile, balance, and BMI values in-place when switching students via `"👥 Đổi"`.

## 4. Non-Functional Requirements

- `NFR-001`: Performance: Instant sub-50ms reactive state update when recalculating BMI or switching students.
- `NFR-002`: Design System Compliance: 100% compliant with ECO Design System 1.0 (Consumer) tokens, typography, and mobile frame simulator.
- `NFR-003`: Accessibility: Touch target sizes >= 44x44px for navigation buttons; WCAG AA contrast compliance for all 4 status badges.
- `NFR-004`: Maintainability: Pure Vanilla JS component architecture with zero external runtime dependencies.
- `NFR-005`: Quality and Verification: 100% verified with automated Playwright end-to-end tests.

## 5. Acceptance Criteria

- `AC-001`: Given parent is in ECO School, when clicking student card for Lý Tường Lam, then the app navigates to Học sinh screen with Lý Tường Lam's profile.
- `AC-002`: Given the Học sinh screen is rendered, then the View BMI section is located below the 8 utility entry points and above Hoạt động gần đây.
- `AC-003`: Given height 135 cm and weight 32 kg, when BMI calculates to 17.5, then the screen renders BMI 17.5 with status badge "Thiếu cân" in blue.
- `AC-004`: Given height 140 cm and weight 38 kg, when BMI calculates to 19.4, then the screen renders BMI 19.4 with status badge "Bình thường" in green.
- `AC-005`: Given height 142 cm and weight 48 kg, when BMI calculates to 23.8, then the screen renders BMI 23.8 with status badge "Thừa cân" in orange.
- `AC-006`: Given height 140 cm and weight 52 kg, when BMI calculates to 26.5, then the screen renders BMI 26.5 with status badge "Béo phì" in red.
- `AC-007`: Given the View BMI section, then exactly the latest 6 historical BMI measurements are listed chronologically with dates, heights, weights, and status badges.
- `AC-008`: Given parent taps "👥 Đổi", then the active student switches between siblings and updates BMI score and history in-place without page reload.
- `AC-009`: Given parent clicks back button in top bar, then the view returns cleanly to ECO School Phụ huynh.

## 6. Clarifications

### Superpowers V34: Question Back Protocol

All primary design decisions have been resolved based on authoritative legacy PNG `Hoc sinh.PNG`, Asian WHO health standards, and operator specifications.

### Clarification Ledger

| Question | Why It Matters | Answer or Accepted Risk | Status |
| --- | --- | --- | --- |
| What triggers navigation to the Hoc Sinh screen? | Defines entry flow and user routing. | Clicking any student card under "Danh sách học sinh" in ECO School Phụ huynh. | Resolved |
| Where is the View BMI section located? | Governs visual layout hierarchy. | Positioned strictly below the 8 entry points card and above "Hoạt động gần đây". | Resolved |
| Which BMI cut-off standards are applied? | Ensures accurate medical categorization. | Asian WHO thresholds: <18.5 Thiếu cân, 18.5-22.9 Bình thường, 23.0-24.9 Thừa cân, >=25.0 Béo phì. | Resolved |
| How many historical BMI measurements are shown? | Sets historical data buffer limit. | Exactly the latest 6 historical records. | Resolved |

- [x] All blocking requirements clarified against `Hoc sinh.PNG` and operator specifications.

## 7. Constraints

- Existing files in scope: `src/app.js`, `src/views/EcoSchoolHomepageView.js`, `src/views/HocSinhDetailView.js`, `src/components/StudentBmiSection.js`, `src/data/studentBmiMockData.js`, `src/utils/bmiCalculator.js`, `index.css`, `tests/e2e/redesign.spec.js`.
- Out of scope: Live IoT smart scale integration or manual user data entry form (mocked via structured dataset per child).

## 8. Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Sibling data mismatch | Medium | Key BMI history by student ID and re-evaluate upon in-place student change. |
| Inaccurate rounding | Low | Use standard JavaScript `Number.toFixed(1)` after numeric floating-point division. |

## 9. Traceability

| Requirement | Plan Section | Tasks | Verification |
| --- | --- | --- | --- |
| `FR-001` | Section 3.1 | `TSK-014` | Playwright student card click test |
| `FR-004` | Section 3.2 | `TSK-016` | Playwright layout positioning test |
| `FR-005` | Section 3.3 | `TSK-015` | Unit and E2E BMI calculation test |
| `FR-006` | Section 3.3 | `TSK-015` | 4-tier Asian classification test |
| `FR-007` | Section 3.4 | `TSK-016` | 6-period historical record test |
| `FR-010` | Section 3.5 | `TSK-014` | In-place sibling toggle test |

## 10. Review Loop

| Round | Reviewer | Focus | Exit Criteria | Status |
| --- | --- | --- | --- | --- |
| `R1` | `aurora-plan-challenger` | Scope challenge | Unclear scope removed, risks surfaced | Completed |
| `R2` | `sophia-product-manager` | Requirement quality | Acceptance criteria complete and testable | Completed |
| `R3` | `marcus-ai-orchestrator` | Go/no-go to planning | Spec package stable for planning and execution | Approved |
