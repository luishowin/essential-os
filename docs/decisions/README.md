# Decisions

Architecture Decision Records (ADRs) for the Essential OS project.

**Status:** Living record · **Date:** 2026-10-07

---

## Why this directory exists

Every important architectural decision is recorded here, so that the reasoning
behind the project does not live only in chat history. Six months or three years
from now, the question *"why is it like this?"* should have a written answer.

## Convention

- One decision per file, named `NNNN-short-title.md`.
- Numbers are never reused.
- **Past entries are not edited.** A decision is superseded by a new entry, and
  the old one is marked `Superseded by NNNN`.
- Each entry contains exactly these sections:

```text
Status
Date
Context
Decision
Reasoning
Alternatives
Consequences
```

## Status values

| Status | Meaning |
|---|---|
| **Proposed** | Written down, not yet adopted |
| **Accepted** | Adopted |
| **Superseded** | Replaced by a later decision (link it) |
| **Deprecated** | No longer relevant, not replaced |
| **Open** | Deliberately undecided, with the condition that will settle it |

## Index

| ADR | Decision | Status |
|---|---|---|
| [0001](0001-project-scope.md) | Project scope: a platform, not an application | Accepted |
| [0002](0002-ida-runtime-vs-router.md) | Ida is an interaction runtime, not merely a router | Accepted |
| [0003](0003-local-first-model-routing.md) | Local-first, not local-only | Accepted |
| [0004](0004-capability-registry-as-primary-abstraction.md) | The capability registry is the primary abstraction | Accepted |
| [0005](0005-no-unrestricted-shell.md) | No unrestricted shell execution for the intelligence | Accepted |
| [0006](0006-intent-plan-action-separation.md) | Intent, Plan and Action are separate concepts | Accepted |
| [0007](0007-ephemeral-context-before-persistent-memory.md) | Ephemeral context before persistent memory | Accepted |
| [0008](0008-llm-is-translator-not-executor.md) | The LLM is a translator and planner, not the executor | Accepted |
| [0009](0009-desktop-base-open.md) | The desktop base is an open question | Open |

## Decision template

Use one entry for each decision that is costly to reverse. Do not record every
small preference; record choices that affect architecture, maintenance, product
scope, compatibility, privacy, security, licensing or public promises.

The repository convention is one file per decision (`NNNN-short-title.md`) with
the sections listed above. For a working note or a decision not yet numbered,
this fuller template is useful:

```text
### ADR-000 — [Decision title]
- Date: YYYY-MM-DD
- Status: Proposed / Accepted / Superseded
- Decision owner:
- Context: what problem or constraint requires a decision?
- Decision drivers: what matters most (reliability, polish, effort,
  accessibility, compatibility, privacy, performance)?
- Options considered: include "reuse existing capability" and "defer" where
  credible.
- Evidence: tests, measurements, sources, prototype links, relevant issue.
- Decision: what will be done and what will not be done.
- Consequences: trade-offs, dependencies, maintenance costs, migration path.
- Revisit when: an observable trigger, not "later."
```

## Initial decision queue

These were identified in the planning record and should be settled with
evidence. Several map onto existing ADRs; the rest are still open.

| Topic | Status |
|---|---|
| Fedora image / update model: conventional package image vs image-based atomic | Open |
| Desktop session architecture: shell on existing foundation vs separate session vs custom compositor | Partly covered by [0009](0009-desktop-base-open.md) |
| First-party toolkit and component library | Open |
| Application delivery and theme distribution (RPM, Flatpak, host themes) | Open |
| User data, logs and privacy | Open |
| Release support policy | Open |
| Licensing and assets | Open |
| Website and public project communications | Open |

Record a decision when evidence exists. Do not fill the queue with preferences
dressed as conclusions.
