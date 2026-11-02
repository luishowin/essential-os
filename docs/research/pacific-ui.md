# Pacific UI: the predecessor

**Status:** Historical note · **Date:** 2026-10-31

Pacific UI was the design and configuration layer that came before Essential
OS. It is kept here as a condensed record of what it got right and what it was
superseded by. The original documents and Phase 0 code are not part of this
repository; they live in the MX500 archive.

## Provenance

| | |
|---|---|
| **Started** | 1 August 2026 |
| **Target** | Fedora Workstation 44 · GNOME Shell 50 · Wayland only |
| **Reference machine** | HP ProBook 635 Aero G8 (AMD, 13.3″, integrated graphics) |
| **Shape** | An opinionated configuration and design layer over stock Fedora, not a distribution or a fork |
| **Originals** | `MX500/Labs/Pacific UI/`: `DESIGN.md`, `ASSETS.md`, `README.md` |

Pacific UI predates the Essential OS repository by about two months. The
Essential OS record begins on 2026-10-07. The project later moved from GNOME to
KDE Plasma, which is why Pacific UI is lineage rather than current direction.

## What was worth keeping

### Principles with failure tests

Pacific UI stated each principle together with the condition that makes it
fail. Adjectives without a failing test were treated as decoration.

| Principle | What it meant |
|---|---|
| **Calm** | The desktop at rest should not compete for attention. |
| **Consistent** | The same action looks and behaves the same everywhere. |
| **Efficient** | Common tasks stay fast; nothing is added that slows the core. |
| **Durable** | Configuration and design survive upgrades. |
| **Reversible** | Every change has a written path back. |

### Hard constraints

The design encoded constraints rather than preferences. The important ones:

- **C1:** No root, no `dnf`, nothing outside `$HOME`.
- **C2:** Every change is reversible, and the reversal is tested before the
  feature is kept.
- **C3:** Reproduce a clean machine with one command in under an hour.
- **C4:** No unprompted AI. Intelligence appears when summoned, not as ambient
  surveillance or unsolicited suggestion.
- **C5:** Respect reduced motion and accessibility settings.
- **C6:** Prefer upstream mechanisms over custom replacements.

C2 and C4 carried directly into Essential OS and Ida: the intelligence proposes,
the system disposes, and every action has a reversal path.

### Durability tiers

Instead of a blanket promise that "nothing breaks," Pacific UI classified
components:

- **Tier A:** must survive a Fedora upgrade untouched.
- **Tier B:** may need a small, documented migration.
- **Tier C:** expected to be rewritten; kept isolated.

This is a more honest maintenance model than claiming universal stability, and
it remains useful for the Essential desktop layer.

### Token pipeline

Design tokens were to live as text (`color.*`, `space.*`, `radius.*`,
`motion.*`, `type.*`), generated into theme outputs rather than maintained by
hand in several places. The repository was to hold canonical token names and
semantics; the design tool held visual exploration. That split is retained in
the planning docs.

### The panel and Pacific Control

The interaction model had two surfaces:

- A summoned panel for search, launch and quick actions.
- **Pacific Control**, a small set of five sections for the settings a person
  actually changes, rather than a deep settings tree.

The panel idea became Ida's command surface. The "small control surface, deep
settings only when needed" idea carried into the Essential OS first-release
scope.

### Drift detection and release checks

Pacific UI treated configuration drift as a first-class failure: compare the
live machine against the repository, report differences, and make restoration
boring. Its release checklist required the reversal paths to be written and
tested before feature work. Both ideas survive in
[quality-and-release.md](../planning/quality-and-release.md).

## What was superseded

- **GNOME as the desktop base.** The project moved to KDE Plasma. The desktop
  base remains an open question in
  [ADR 0009](../decisions/0009-desktop-base-open.md), but Pacific UI's
  GNOME-specific shell work is not the current path.
- **Pacific UI as the product name and direction.** Essential OS is the
  operating-system layer; Sam is the search and retrieval service and Ida is the
  personal assistant. Pacific UI is none of them.
- **Phase 0 code.** One GNOME Shell panel section, `install.sh` and a
  development shell. It was GNOME-specific and never committed. It is archived,
  not imported.
- **The August visual direction.** The palette and typography questions were
  left open in Pacific UI; the Essential OS brand record now carries the visual
  language.

## Why only a note

The originals are long, tied to a desktop environment the project no longer
targets, and contain superseded specifics. Copying them into the canonical repo
would suggest they are current. A condensed note preserves the reasoning without
preserving the dead ends.

## Where the originals live

```text
MX500/Labs/Pacific UI/
├── DESIGN.md     323 lines, principles, constraints, tiers, tokens, panel model
├── ASSETS.md     246 lines, colour, fonts, cursors, icons, build order
└── README.md     141 lines, install and reversal instructions
```

They are historical archive, not canonical. If a detail is needed, read it
there and record any decision that follows in this repository.
