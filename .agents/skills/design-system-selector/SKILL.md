---
name: design-system-selector
description: Bind feature briefs to appropriate active domain design systems (company, erp-enterprise, ops-monitoring, executive-insight).
---

# Design System Selector Skill (`design-system-selector`)

## Objective
Analyze domain and feature type to bind the feature to the correct `DESIGN.md` contract. Generates `design-context.md`.

## Selection Rules
* ECO Consumer / EDU School Parents features (All app features in this workspace) → `eco` (`.agents/design-systems/eco/DESIGN.md`, based on `ECO Design System/`)
* Complex business/forms/tables → `erp-enterprise`
* Telemetry/alerts/monitoring → `ops-monitoring`
* Executive summaries/KPI readouts → `executive-insight`
* Default workspace design system → `eco`

## Emitted Artifacts
* `design-context.md`
