# Agent Routing: ECO School Parents Application Redesign

> Feature ID: `025-025-edu-school-parents-redesign`

## Routing Contract

Every workstream needs one primary owner. Supporting agents may review, but they must not change files outside their assigned write scope without updating this file.

| Workstream | Primary Skill | Supporting Skills | Write Scope | Output |
| --- | --- | --- | --- | --- |
| Product specification | `sophia-product-manager` | `aurora-plan-challenger` | `spec.md` | Accepted requirements |
| Architecture plan | `david-systems-architect` | `alan-tech-lead` | `plan.md`, `contracts/`, `data-model.md` | Technical plan |
| Design System Tokens | `aris-designer` | `benny-frontend-engineer` | `/index.css` | CSS Design System |
| Feature Grid & Navigation | `benny-frontend-engineer` | `maya-ui-ux-designer` | `/src/components/FeatureGrid.js` | Grid Navigation |
| Student Context Drawer | `benny-frontend-engineer` | `aris-designer` | `/src/components/StudentPickerModal.js` | Student Picker Drawer |
| Báo Vắng & Top-up Modules | `benny-frontend-engineer` | `bella-frontend-animator` | `/src/views/` | 4-step Module Views |
| Verification | `ada-qa-agent` | `qa-simulator`, `eve-qa-approver` | `verification.md`, `/tests/` | Playwright Test Suite |

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
