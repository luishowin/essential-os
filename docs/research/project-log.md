# Project log

Dated entries. Newest last. Past entries are not edited; corrections are new
entries.

---

## 2026-10-07 — The record begins

**What.** This repository is created as the canonical engineering and design
record for the project. It documents three connected layers — **SLATE →
Essential OS → Ida `<∫>`** — and establishes the conventions that keep the
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
