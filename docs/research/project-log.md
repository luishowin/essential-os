# Project log

Dated entries. Newest last. Past entries are not edited; corrections are new
entries.

---

## 2026-10-07 · The record begins

**What.** This repository is created as the canonical engineering and design
record for the project. It documents three connected layers (**SLATE →
Essential OS → Ida**) and establishes the conventions that keep the
record honest: ADRs, status labels, and a project log.

**Why now.** The pieces of the project have been developed separately (an Ida
application, a desktop assembly, experiments, notes and conversations). Without
a single record, the reasoning behind them lives in chat history and cannot be
reconstructed later. This repository exists so that six months or three years
from now it is still possible to understand what was being built, why, what
changed, and what remains uncertain.

**What was found while assembling it.**

- Ida is not a stub. It is a mature Rust workspace with released versions,
  a strict trust architecture, a capability registry, ephemeral context, a
  bounded planner, a local action model and verification. The design brief's
  "initial scaffold" already exists, and better than a scaffold.
- An **Essential Desktop** assembly already exists: a Fedora + KDE Plasma
  environment with a defined shell, visual language, energy policy and
  interaction model.
- The machine has moved from **GNOME to KDE Plasma** (Plasma 6.7.5), which makes
  the desktop base for Essential OS a live question rather than a settled one.
- Several names in the design brief do not match the real registry
  (`apps.open` → `app.launch`, `system.reboot` → `session.restart`, no
  `system.disk_usage`, no `calculator` action). The record follows reality and
  lists the divergence as an open question.

**What it changes.** The umbrella repository does not duplicate Ida's
implementation or its detailed spec. It documents the platform and the
narrative, owns the brand and the language-neutral interface contract, and links
to the implementation repositories so there is exactly one owner for every fact.

**Open.** The desktop base; whether diagnostic commands become structured
capabilities; and the partial-input interaction paradigm.

---

## 2026-10-16 · Branding simplified

**What.** Integrals removed everywhere. `ESSENTIAL` is spelled `ss`, Ida is
just `Ida`. Wordmark set in Geo (Google Fonts) at 21% tracking
(`letter-spacing: 0.21em`). EOS block-letter icon added as
`docs/brand/eos-icon.svg` and `site/eos-icon.svg`, wired as site favicon and
header mark. Past records updated in place per explicit direction, against the
usual append-only convention.

**Why.** The integral substitution was clever but costly: hard to type, hard to
search, easy to break across fonts and encodings. Plain spelling plus one
typeface plus one icon carries the identity with less machinery. Same logic as
the platform: do more with less.

---

## 2026-10-31 · Pacific UI recorded as the predecessor; GitHub made canonical

**What.** Pacific UI is documented as the GNOME-based predecessor of Essential
OS in [`pacific-ui.md`](pacific-ui.md). Only a condensed note is kept: its
principles and their failure tests, the hard constraints (especially
reversibility and no unprompted AI), the durability tiers, the token pipeline,
the panel/Pacific Control model, and the drift and release checks. The original
`DESIGN.md`, `ASSETS.md`, `README.md` and Phase 0 code remain archived on MX500
and are not copied here.

The technical documents from the internal planning kit of 2026-10-27 are merged
into [`docs/planning/`](../planning/README.md), the reference list into
[`library.md`](library.md), the design-system workflow into
[`docs/brand/README.md`](../brand/README.md), the architecture plan into
[`docs/architecture.md`](../architecture.md), and the decision template into
[`docs/decisions/README.md`](../decisions/README.md). The budget, risk register
and weekly log stay local because they contain personal financial and
operational detail.

The two documents that existed only on the internal disk, the spec brief and the
Product Vision Extension PDF, are now committed.

**Why.** GitHub should be the complete canonical record. Any local or MX500 copy
must be compared against it before being edited or trusted. The same rule is now
written in the MX500 drive's `readme.txt`.

**What it changes.** Pacific UI is lineage, not current direction: the desktop
base remains open under [ADR 0009](../decisions/0009-desktop-base-open.md), and
the current assembly is Plasma-based. Planning material has one home instead of
several. The record no longer depends on a desktop folder surviving.

**Open.** Which parts of Pacific UI's token and drift model to adopt, and when.
That is a design decision, not a restoration task.

---

## 2026-10-31 · The specification becomes a product and technical statement

**What.** The specification moves to v0.2, is retitled *Product & Technical
Specification*, and is renamed from `docs/essential-os-spec-brief.md` to
[`docs/essential-os-specification.md`](../essential-os-specification.md). It is
now linked from the repository map and from the operating-system layer page.
Nothing else linked to the old path, so the rename breaks no pointer.

v0.2 restates the system in five layers and adds commitments the brief did not
carry: Fedora as the base with RPM/DNF; a `sudo dnf install essential-os`
development path that coexists with GNOME and KDE sessions; eleven proposed
package groups; Btrfs as a candidate default with snapshots and rollback; a
curated application ecosystem including office, utilities, games and a
photographic wallpaper collection; configuration restore in about a minute; an
offline-capable install image at roughly 3.0 GB preferred and 5.00 GB maximum,
installing in under five minutes; and five development milestones from desktop
session to public preview.

**The assistant question is now explicit.** Essential OS may ship a small,
local, replaceable action assistant. It is not Ida. The specification says so,
[`vision.md`](../vision.md) says so, and [`ida/README.md`](../ida/README.md)
says so from Ida's side: the operating system must remain fully useful without
Ida, and Ida's identity, memory and roadmap are not the system's.

**Sources kept.** The v0.2 text drops the reference list. The citations it
carried (ArtCraft, RAWmakase, Quickshell, Smithay, Fedora lifecycle, Ubuntu
release cycle, bootc, Wayland architecture) are recorded in
[`library.md`](library.md), so the claims stay traceable without re-opening the
specification.

**What it changes.** The specification is now the strongest public statement of
what the product is and what it is aiming at. Where it is more specific than the
rest of the record, it is a target, not a measurement. Two tensions are recorded
rather than hidden: the specification names Fedora as the base while
[`architecture.md`](../architecture.md) still holds base-distribution and
atomic-versus-conventional delivery open; and the "approximately 20%" desktop-UI
figure in §16 is an owner estimate, not a measured result.

**Open.** Whether the base-distribution question becomes an ADR that confirms
Fedora, and when each of the ten open architectural decisions in §15 is settled.

## 2026-11-03 · Sam becomes a separate search service

**What.** The architecture splits into two products. **Sam** is Essential OS's
native, deterministic search and retrieval service: a dense registry of domains,
intents, phrasings and handlers over local indexes and OS interfaces, with no
generative model, no reasoning and no personal memory. **Ida** remains the
personal assistant: voice-first, local-first, Tier 0 / Tier 1 / Tier 2, with a
privacy gate, a policy-enforcing executor and Hermes for multi-step work.

The decision is recorded as [ADR 0010](../decisions/0010-sam-separate-os-search-service.md).
Sam now has its own repository, <https://github.com/luishowin/sam>, which is
documentation-led. There is no Sam implementation yet.

**Why.** Search and assistance have different runtime requirements, trust
boundaries and evaluation criteria. Local search needs determinism, coverage,
sub-10 ms retrieval and a 4 GB memory target; it does not need a language model.
Assistance needs interpretation, context, conversation and escalation. Treating
them as one system made the search path heavier than necessary and made Ida
responsible for a registry she should not own.

**What changed in the record.** The umbrella README, architecture, Essential OS
layer, components table, product specification, Ida narrative, interaction
runtime, capability registry, roadmap and research questions now describe Sam and
Ida separately. The product specification's section 8 is rewritten around the
boundary: Sam is the native search component; Ida is the assistant; ownership is
decided by function; the caller owns escalation. A new migration record lives in
[`docs/migrations/2026-11-03-sam-ida-separation.md`](../migrations/2026-11-03-sam-ida-separation.md).

**What did not change.** Ida's personality, voice, trust rule, executor,
privacy gate and existing implementation. No code moved between repositories and
no Ida capability was removed. Ida's action-level file lookup remains valid for
command workflows.

**Open.** Sam's licence, IPC mechanism, API versioning, catalogue ownership,
default-enabled domains, choice of embedding encoder and minimum reference
hardware. See the Sam roadmap.
