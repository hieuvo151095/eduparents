# Agent Routing: Child BMI Tracking and Hoc Sinh Screen

> Feature ID: `026-child-bmi-tracking-and-hoc-sinh-screen`

## Routing Contract

Every workstream needs one primary owner. Supporting agents may review, but they must not change files outside their assigned write scope without updating this file.

| Workstream | Primary Skill | Supporting Skills | Write Scope | Output |
| --- | --- | --- | --- | --- |
| Product specification | `sophia-product-manager` | `aurora-plan-challenger` | `spec.md` | Accepted requirements |
| Architecture plan | `david-systems-architect` | `alan-tech-lead` | `plan.md`, `contracts/`, `data-model.md` | Technical plan |
| Implementation | `benny-frontend-engineer` | `aris-designer` | `src/views/`, `src/components/`, `src/utils/`, `src/data/`, `index.css` | Code changes |
| Verification | `ada-qa-agent` | `qa-simulator`, `eve-qa-approver` | `verification.md`, `tests/` | Evidence |

## Handoff Rules

- A producing agent writes evidence of what changed.
- A reviewing agent records findings without rewriting unrelated work.
- A task with failed verification returns to the owning agent once, then escalates after three repeated failures.

## Review Topology

| Review Stage | Primary Reviewer | Input Artifact | Output Artifact |
| --- | --- | --- | --- |
| Spec challenge | `aurora-plan-challenger` | `spec.md` | updated `spec.md` or findings |
| Plan challenge | `alan-tech-lead` | `plan.md` | updated `plan.md` or findings |
| Verification sign-off | `ada-qa-agent` | `verification.md` | evidence-backed recommendation |

## Escalation Rules

- Escalate when documentation prerequisites are missing or misleading.
- Escalate when verification fails repeatedly without new evidence.
- Escalate when write scope conflicts with another agent's ownership.
