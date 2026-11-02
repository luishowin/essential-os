# Migration record: Sam and Ida separation

**Date:** 2026-11-03
**Decision:** [ADR 0010](../decisions/0010-sam-separate-os-search-service.md)
**Scope:** Essential OS project record, Ida repository, Sam project
**Status:** Documentation complete; no implementation changed

---

## Why

Earlier material treated operating-system search, command interpretation and
personal assistance as one assistant architecture. The architecture now
separates two systems:

- **Sam** — native, deterministic, non-generative search and retrieval over the
  local computer.
- **Ida** — voice-first, local-first personal assistant with Tier 0, Tier 1 and
  Tier 2, a privacy gate, an executor and Hermes.

The authoritative reference is *Essential OS: Sam & Ida — Local Search and
Personal Assistant Specification, Version 1.1* (3 November 2026).

## What changed in this repository

| File | Change |
|---|---|
| `README.md` | Two-system framing; Sam row and link; search removed from Ida's planned scope; implementation repository list updated |
| `docs/architecture.md` | Stack diagram includes Sam; separate Sam and Ida sections; ADR 0010 in the principles table |
| `docs/essential-os/architecture.md` | Intelligence layer split; boundary ownership table; Sam status row |
| `docs/essential-os/components.md` | Separate "assistant runtime" and "OS search and retrieval" rows; shared-catalogue note |
| `docs/essential-os/README.md` | Substrate/intelligence wording reconciled |
| `docs/essential-os-specification.md` | §4.5 defines both systems; §8 rewritten around Sam, Ida and the boundary; package list, phase deliverable, open decisions and status table reconciled |
| `docs/vision.md` | Replaced the unnamed "action assistant" with the Sam boundary; stack diagram updated |
| `docs/slate/README.md`, `docs/slate/vision.md` | Layer diagram and hardware rationale include Sam alongside Ida |
| `docs/brand/README.md`, `docs/brand/wordmark.md` | Name relationships now list Sam and Ida separately |
| `docs/research/pacific-ui.md` | Lineage note corrected |
| `docs/ida/README.md` | Ida defined as assistant; "bundled assistant" section replaced by the Sam boundary |
| `docs/ida/architecture.md` | Lookup branch routes to Sam or an Ida action; Sam-is-adjacent note |
| `docs/ida/capability-registry.md` | `search.files` scoped as an action-level capability |
| `docs/ida/interaction-runtime.md` | "Sam is not a stage" section |
| `docs/ida/roadmap.md` | Core/Pro/Max reconciled with Tier 0/1/2; Sam roadmap linked |
| `docs/research/README.md` | Indexing and Sam-interface questions reassigned |
| `docs/research/project-log.md` | Dated entry appended |
| `docs/decisions/0010-sam-separate-os-search-service.md` | New ADR |
| `docs/decisions/README.md` | ADR index updated |
| `CHANGELOG.md` | Entry added |
| `docs/migrations/README.md`, this file | New migration record |
| `docs/specifications/Essential_OS_Sam_and_Ida_Specification_v1.1.pdf` | Authoritative architecture reference committed to the record |

## What changed in the Ida repository

| File | Change |
|---|---|
| `README.md` | "Ida and Sam" boundary section; search ownership clarified in the roadmap narrative |
| `PROJECT_STATE.md` | Assistant identity clarified; Sam row added; superseded-spec notice |
| `CLAUDE.md` | Sam boundary rules for future work |
| `docs/ARCHITECTURE.md` | F38 added to the frozen register; "Where Sam sits" section |
| `docs/DECISIONS.md` | Dated 2026-11-03 entry appended |
| `docs/SUPERSEDED.md` | New archive notice |
| `Ida Tiered Local Assistant Spec.md` (root and `docs/`) | Superseded banner; body preserved verbatim |

## What did not change

- Ida's personality, voice, identity and interests.
- Ida's trust rule, executor, policy model, privacy gate and model routing.
- Ida's Rust source, configuration, packaging and tests.
- Any existing implementation behaviour. No code moved between repositories.
- The v1.0 tiered specification bodies, apart from a superseded banner.
- Historical research, spikes, benchmarks and planning documents.
- Unrelated untracked work in either repository.

## Sam project

Sam was established as a separate, documentation-led repository:
<https://github.com/luishowin/sam>.

It contains the README, architecture, registry design, retrieval design,
performance targets, Ida integration contract, security and privacy notes,
roadmap, contribution rules, placeholder directories and an MIT licence. It
contains no runtime code and makes no measured performance claim.

## Validation performed

- Searched both repositories and the external backup for Sam material; none
  existed before this migration.
- Confirmed the authoritative v1.1 specification is present and readable.
- Checked that no current document describes Sam as an Ida tier or as an LLM.
- Checked that Sam documents claim no reasoning, generation or personal memory.
- Checked that Tier 0 / Tier 1 / Tier 2 and Hermes remain in Ida's architecture.
- Checked that the Sam repository contains no secrets, credentials, local paths or
  personal data before publication.
- Ran the Essential OS contract validator.
- Resolved relative links in changed documents.

## Not done

- No commits or pushes to the Essential OS or Ida repositories beyond this
  migration record itself.
- No Sam implementation, registry entries or benchmarks.
- No change to the external backup drive beyond refreshing the mirrors.
- No Ida code change.

## Remaining work

1. Specify the typed local API and IPC mechanism.
2. Define catalogue ownership and invalidation.
3. Begin Phase S0: domain inventory and resource baseline.
4. Keep the two repositories' boundary statements in sync as Sam is implemented.
