# Planning

**Status:** Living plan · **Date:** 2026-10-31

The working plan for Essential OS: how the project advances, what the first
release contains, how success is judged, and how work is tracked. These
documents came from the internal planning kit of 2026-10-27; the technical
material is merged here so GitHub remains the single canonical record.

The plan is a hypothesis, not a promise. Advance by evidence and exit
criteria, not by calendar pressure.

## Contents

| Document | What it covers |
|---|---|
| [roadmap.md](roadmap.md) | Phased roadmap and exit gates |
| [mvp-scope.md](mvp-scope.md) | First-release scope, non-goals and cut-line rule |
| [success-metrics.md](success-metrics.md) | Product, quality and sustainability measures |
| [project-tracking.md](project-tracking.md) | Board, labels, definitions of ready and done, weekly cadence |
| [quality-and-release.md](quality-and-release.md) | Test levels and release gate checklist |
| [release-and-support-policy.md](release-and-support-policy.md) | Release channels, versioning, LTS support and end of life |
| [website-and-support.md](website-and-support.md) | Public site, support boundary and triage |
| [ai-workflow.md](ai-workflow.md) | AI-assisted development rules and verification |
| [agent-workflow.md](agent-workflow.md) | Roles, permissions, handoffs and evidence for automated agents |
| [first-30-days.md](first-30-days.md) | The first month of execution |
| [initial-backlog.csv](initial-backlog.csv) | Seed tasks for GitHub Issues |

## Source-of-truth rule

- **Git repository** (this one): product decisions, requirements, technical
  architecture, test plans, release notes and canonical tokens where practical.
- **Ida repository:** Ida's implementation and detailed specification.
- **Design tool**: visual exploration, components, flows and visual QA.
  Record the file or page link and its status; do not make it the only copy of a
  decision.
- **GitHub Issues / Projects:** work that needs doing, priority, state and
  verification.
- **Website:** the public project story, download instructions, known issues
  and support paths.
- **Local notes:** temporary capture only. Triage them weekly into one of the
  sources above or delete them.

Do not maintain the same task list in several places. That creates competing
truths.

## Held locally, not published

Three documents from the original kit stay on the internal disk because they
contain personal financial and operational detail:

- `07-budget.md`
- `08-risk-register.md`
- `15-weekly-log.md`

They are working documents, not part of the public record. The rest of the kit
is archived at `MX500/Labs/_superseded/essential-os-project-kit-2026-10-27/`.
