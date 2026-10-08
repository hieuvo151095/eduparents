# Feature Specification: Child Development Milestones - Kindergarten

> Feature ID: `027-child-development-milestones-kindergarten`
> Created: `2026-10-05`
> Status: Draft
> Source Prompt: Adjust PRD for Tien trinh phat trien cua tre to adhere strictly to Vietnamese law for kindergarten students (Thong tu 51/2020/TT-BGDDT, 5 developmental domains, Non-ranking assessment, Decree 13/2023/ND-CP)

## 1. Purpose

Kindergarten parents in Vietnam currently lack a statutory, transparent tool to monitor their child's holistic early childhood development according to national educational standards. Existing solutions frequently suffer from two severe non-compliance failures: they either omit the mandatory fifth domain (Phát triển Thẩm mỹ - Aesthetic Development) required by Thông tư 51/2020/TT-BGDĐT, or they impose illegal competitive ranking badges ("Xuất sắc", "Kém") that violate Điều 22 of the Early Childhood Education Charter (Thông tư 52/2020/TT-BGDĐT).

This feature establishes a legally compliant, supportive early childhood development dashboard for kindergarten parents. It delivers a 5-axis pentagonal radar visualizing milestone progress across Physical, Cognitive, Language, Social-Emotional, and Aesthetic domains, provides age-appropriate developmental observation submission with a strict privacy consent gate under Nghị định 13/2023/NĐ-CP, and offers gentle non-diagnostic home activity guidance for delayed milestones.

## 2. User Stories

- [ ] As a preschool parent (such as the parent of Phan Khánh Vy in Lớp Lá), I need to view my child's progress across all 5 statutory developmental domains on a balanced radar chart so that I understand her readiness for Grade 1 without unfair competitive rankings.
- [ ] As a preschool parent (such as the parent of Võ Phạm Hiểu Lam in Lớp Mầm), I need to submit home observations with photo evidence through a verified privacy consent gate so that teachers can acknowledge milestones achieved at home.
- [ ] As a preschool parent whose child shows a developmental milestone lag, I need gentle non-clinical home play suggestions and clear medical referral disclaimers so that I can support my child without unnecessary anxiety.
- [ ] As an internal operator, I need audit logs and strict Decree 13/2023 consent records so that execution remains observable, governable, and compliant with Vietnamese child privacy law.

## 3. Functional Requirements

- `FR-001`: The system MUST render a 5-axis pentagonal radar chart visualizing progress across the 5 statutory domains of Thông tư 51/2020/TT-BGDĐT: Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Kỹ năng xã hội, and Thẩm mỹ.
- `FR-002`: The system MUST categorize developmental milestones by age bands (Nhà trẻ 3-36 tháng, Mầm 36-48 tháng, Chồi 48-60 tháng, Lá 60-72 tháng) with filter tabs, and tag 5-year-old milestones with Circular 23/2010/TT-BGDĐT standard indicators.
- `FR-003`: The system MUST provide a home observation submission modal allowing parents to record achievement dates, notes, and media, preceded by an explicit statutory consent gate under Nghị định 13/2023/NĐ-CP and Luật Trẻ em 2016.
- `FR-004`: The system MUST display official periodic evaluation reports from homeroom teachers with read receipt confirmation, showing comprehensive qualitative feedback on all 5 domains.
- `FR-005`: The system MUST detect developmental milestones lagging over 60 days past target age, displaying a soft alert (`#FFF7ED`) with home play activities and a mandatory medical diagnostic disclaimer.
- `FR-006`: The system MUST support sibling context switching via `StudentPickerSheet` and automatically route children over 72 months (such as high schooler Trần Đăng Khoa) to academic transcript views.

## 4. Non-Functional Requirements

- `NFR-001`: Security & Privacy: Image and video assets must be stored in secure child-isolated storage, served via short-lived signed URLs (maximum 60-minute validity), and strictly protected according to Nghị định 13/2023/NĐ-CP.
- `NFR-002`: Performance: 5-axis SVG radar calculation, age normalization, and milestone state filtering must complete within 200ms on standard mobile viewports (390x844).
- `NFR-003`: Pedagogical Tone: All user-facing copy must maintain a supportive, non-judgmental, non-diagnostic posture, avoiding clinical pathology terms.
- `NFR-004`: Maintainability: Milestone catalog and statutory domain metadata must be isolated in typed contract schemas to facilitate annual MOET curriculum updates.
- `NFR-005`: Documentation and traceability: Every statutory requirement must trace directly to circular clauses in `docs/knowledge.md` and `docs/research/claims.jsonl`.

## 5. Acceptance Criteria

- `AC-001`: Given a kindergarten student profile, when the development screen loads, then the radar chart renders exactly 5 equidistant vertices representing Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Xã hội, and Thẩm mỹ.
- `AC-002`: Given the milestone catalog screen, when filtering by domain tabs, then selecting "Thẩm mỹ" displays art and music milestones with appropriate statutory indicators.
- `AC-003`: Given any developmental summary view, then no competitive achievement ranking or grading labels ("Xuất sắc", "Kém") appear anywhere in the interface.
- `AC-004`: Given a 5-6 year old student (Lớp Lá), when inspecting milestone details, then the system displays the applicable Thông tư 23/2010 standard number and indicator code.
- `AC-005`: Given the home observation submission flow, when a parent attempts to upload photos without confirming the Decree 13/2023 consent checkbox, then submission is blocked with an informative validation notice.
- `AC-006`: Given a milestone that is unachieved and 60 days past the child's age band, when the parent views the card, then an amber notice displays with 1-3 home play activities and an explicit medical referral disclaimer.
- `AC-007`: Given the child selector control, when switching between Phan Khánh Vy (Lớp Lá) and Võ Phạm Hiểu Lam (Lớp Mầm), then the milestone roster, radar chart, and age bands update instantaneously.

## 6. Clarifications

All baseline statutory questions have been reconciled against official Vietnamese education legal instruments.

### Superpowers V34: Question Back Protocol

Before planning, ask back when any answer can change scope, user behavior, security posture, data ownership, rollback, verification, or cost. Each question must name the decision it protects.

### Clarification Ledger

| Question | Why It Matters | Answer or Accepted Risk | Status |
| --- | --- | --- | --- |
| Should the radar chart use 4 or 5 domains? | Compliance with Thông tư 51/2020/TT-BGDĐT mandates 5 domains including Thẩm mỹ. | Answered: System implements mandatory 5-axis pentagon geometry ($72^\circ$ radial spacing). | Resolved |
| Are achievement rankings permitted on the summary card? | Non-compliance with Thông tư 52/2020/TT-BGDĐT Điều 22 introduces legal liability for preschools. | Answered: All competitive rankings prohibited; replaced with progress completion bands. | Resolved |
| What legal gate is required before parents upload child photos? | Nghị định 13/2023/NĐ-CP Điều 19 mandates verifiable parental consent for child personal data processing. | Answered: Modal includes mandatory consent affirmation checkbox with revocation link. | Resolved |

## 7. Constraints

- Constitution articles that apply: Strict architectural boundaries, mobile viewport fidelity (390x844), zero mock data leakage across student IDs.
- Existing files or modules in scope: `web/components/parents/`, `docs/`, `web/lib/`, `web/app/page.tsx`.
- Files or modules out of scope: High school gradebooks, tuition payment gateways, backend microservice deployment scripts.
- Compatibility requirements: Next.js 16 App Router, React 19, TypeScript 5.7, Tailwind CSS / plain CSS tokens.
- Documentation prerequisites already reviewed: `docs/prd.md`, `docs/knowledge.md`, `docs/decisions.md`, `docs/research/claims.jsonl`.
- Rollback or containment expectations: Feature isolated within a modular component toggle; rollback restores previous student summary card without data loss.

Out of scope:
- Clinical diagnostic evaluations or psychiatric developmental screening instruments.
- Primary and secondary school numerical academic grade calculations.
- Live video streaming or peer-to-peer child photo sharing between parents.

## 8. Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Parent misinterprets milestone delay as clinical diagnosis | High | Prominently display soft amber styling and non-diagnostic medical disclaimer on every lag card. |
| Inadvertent privacy violation under Decree 13/2023 | High | Require affirmative checkbox prior to photo upload and provide immediate consent revocation controls. |
| Secondary student selected on kindergarten feature | Medium | Detect student age and automatically redirect to high school academic transcript. |

## 9. Traceability

| Requirement | Plan Section | Tasks | Verification |
| --- | --- | --- | --- |
| `FR-001` | Section 3.2 Target State, Section 5 Data Model | `T001`, `T002` | Automated SVG vertex check & Visual inspection |
| `FR-002` | Section 4 Contracts, Section 5 Data Model | `T002`, `T003` | Tab filter verification & Circular 23 tag audit |
| `FR-003` | Section 4 Contracts, Section 7 Security | `T002`, `T004` | Consent gate modal validation test |
| `FR-004` | Section 3.2 Target State | `T003`, `T004` | Teacher evaluation card render check |
| `FR-005` | Section 3.2 Target State | `T002`, `T004` | 60-day lag trigger & disclaimer verification |
| `FR-006` | Section 3.1 Architecture | `T003`, `T004` | Sibling switcher test & high-school redirect check |

## 10. Review Loop

Document the review rounds that must happen before implementation is allowed to proceed.

| Round | Reviewer | Focus | Exit Criteria | Status |
| --- | --- | --- | --- | --- |
| `R1` | `aurora-plan-challenger` | Statutory scope challenge | Confirmed 5 domains, non-ranking assessment, Decree 13 consent | Completed |
| `R2` | `sophia-product-manager` | Requirement quality | All 6 FRs, 5 NFRs, and 7 ACs fully articulated | Completed |
| `R3` | `marcus-ai-orchestrator` | Go/no-go to technical planning | Spec package stable and fully aligned with Vietnam legal baseline | Approved |
