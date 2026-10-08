---
id: development-index
type: development-index
status: active
owner_skill: marcus-ai-orchestrator
source_trace:
  - docs/prd.md
  - docs/tasks.md
  - docs/development/development_manifest.json
---

# Development Knowledge Index: ECO School Phụ huynh

## Execution Scope

- Feature/spec id: `027-child-development-milestones-kindergarten` & `026-child-bmi-tracking-and-hoc-sinh-screen`
- Implementation branch: `main`
- Approved planning package: `docs/prd.md`, `.agents/specs/027-child-development-milestones-kindergarten/`
- Active owner skills: `sophia-product-manager`, `benny-frontend-engineer`, `david-systems-architect`, `ada-qa-agent`, `marcus-ai-orchestrator`

## Artifact Map

| Artifact | Path | Purpose |
| --- | --- | --- |
| Manifest | `docs/development/development_manifest.json` | Canonical registry for topology, IDs, quality gates, and epic children |
| Epic E-001 | `docs/development/E-001-student-health-tracking/` | Student physical growth tracking, WHO Z-score, and advice sheet |
| Epic E-002 | `docs/development/E-002-child-development-milestones/` | Kindergarten developmental milestones, 5-domain radar, and Decree 13 consent |
| Global PRD | `docs/prd.md` | Primary product requirements document |
| Research | `docs/research/` | Statutory sources, evidence, claims, and contradiction ledger |

## Canonical ID Registry

| ID | Type | Parent | Status | File |
| --- | --- | --- | --- | --- |
| `E-001-student-health-tracking` | epic | root | active | `docs/development/E-001-student-health-tracking/epic.md` |
| `ISSUES-E-001-student-health-tracking` | epic-issues | `E-001-student-health-tracking` | active | `docs/development/E-001-student-health-tracking/issues.md` |
| `F-001-001-student-health-card` | feature | `E-001-student-health-tracking` | active | `docs/development/E-001-student-health-tracking/features/F-001-001-student-health-card.md` |
| `M-001-001-student-health-card` | module | `E-001-student-health-tracking` | active | `docs/development/E-001-student-health-tracking/modules/M-001-001-student-health-card.md` |
| `P-001-001-student-detail-screen` | page | `E-001-student-health-tracking` | active | `docs/development/E-001-student-health-tracking/pages/P-001-001-student-detail-screen.md` |
| `T-001-001-001-student-health-advice` | task | `E-001-student-health-tracking` | completed | `docs/development/E-001-student-health-tracking/tasks/T-001-001-001-student-health-advice.md` |
| `E-002-child-development-milestones` | epic | root | active | `docs/development/E-002-child-development-milestones/epic.md` |
| `ISSUES-E-002-child-development-milestones` | epic-issues | `E-002-child-development-milestones` | active | `docs/development/E-002-child-development-milestones/issues.md` |
| `F-002-001-child-development-milestones` | feature | `E-002-child-development-milestones` | active | `docs/development/E-002-child-development-milestones/features/F-002-001-child-development-milestones.md` |
| `M-002-001-child-development-milestones` | module | `E-002-child-development-milestones` | active | `docs/development/E-002-child-development-milestones/modules/M-002-001-child-development-milestones.md` |
| `P-002-001-child-development-milestones` | page | `E-002-child-development-milestones` | active | `docs/development/E-002-child-development-milestones/pages/P-002-001-child-development-milestones.md` |
| `T-002-001-001-child-development-milestones` | task | `E-002-child-development-milestones` | completed | `docs/development/E-002-child-development-milestones/tasks/T-002-001-001-child-development-milestones.md` |

## Relationship Label Taxonomy

| Label | Meaning | Use When |
| --- | --- | --- |
| `DEPENDS_ON` | Source artifact cannot work without target | Feature needs module, page needs data contract |
| `BLOCKS` | Source must finish before target can proceed | Task sequencing or unresolved issue blocks release |
| `ENABLES` | Source unlocks target capability | Module/epic enables feature or demo |
| `IMPLEMENTS` | Source realizes target requirement | Feature implements epic, task implements story |
| `USES` | Source consumes target behavior/data | Page uses module, task edits module |
| `EXTENDS` | Source adds behavior on top of target | Feature extends an existing feature |
| `CONFLICTS_WITH` | Source may overlap or break target | Competing UX/state/data choices |
| `SUPERSEDES` | Source replaces an older behavior/doc decision | Updated design or implementation decision |
| `DUPLICATES` | Source appears to repeat target | Migration/audit duplicate detection |
| `RELATES_TO` | Source has non-blocking contextual relation | Shared user journey, shared data, adjacent feature |

## Jira / Product Governance

- Story format: "As a [role], I want [capability] so that [outcome]"
- Priority model: `P0` (Blocker), `P1` (High), `P2` (Medium), `P3` (Low), `P4` (Trivial)
- Issue source: Statutory review, QA testing, design audit
- Docs-before-code status: Enforced via Marcus Fleet pre-code documentation gate
- Last deep research source reviewed: Thông tư 51/2020/TT-BGDĐT & Nghị định 13/2023/NĐ-CP

## Migration / Archive Notes

- Legacy flat buckets: Reconciled into epic-first topology (`E-001` and `E-002`).
- Duplicate files archived: Cleaned up temporary `.DS_Store` artifacts.
- Files intentionally retained: All canonical epic, feature, module, page, and task files.
- Files requiring manual PM review: Operator review of kindergarten statutory adjustments.

## Verification Summary

- Unit tests: Mock data validation and radar angle computation verified.
- Integration tests: Navigation routing between Home, Student, and ChildDevelopmentScreen verified.
- UI/E2E tests: Mobile frame rendering verified on 390x844 viewport.
- Build/lint/typecheck: `npx tsc --noEmit` passed with 0 errors; `pnpm build` completed in 962ms.
- Manual checks: Verified Decree 13/2023 consent gate blocks submission until checked; verified K12 student (Khoa) displays ineligibility boundary.

## Open Risks

- Risk: Production cloud storage integration for video clips > 30 seconds.
  - Owner: `david-systems-architect`
  - Mitigation: Mock media URLs utilized for prototype phase; S3 signed URL contract pre-defined.

## Documentation Freshness

- Last code slice synced: `web/components/parents/development/` & `web/components/parents/home-screen.tsx`
- Last sync note: `docs/development/E-002-child-development-milestones/sync/20261005-175500-child-development-entry-point.md`
- Docs intentionally stale: None
- Next documentation action: Reconcile verification logs upon operator review.
