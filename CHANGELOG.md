# Changelog

All notable changes to the **Essential OS project record** are documented here.

This file tracks the umbrella repository: the vision, decisions, docs, brand
and site. It does **not** track Ida's software releases, which live in
[`luishowin/ida`](https://github.com/luishowin/ida) and are recorded in its own
`docs/DECISIONS.md`.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

### Added

- The repository itself: vision, philosophy and umbrella architecture.
- `docs/ida/`: the intelligent-layer narrative: roadmap, interaction runtime,
  capability registry, context and entities, model routing, security and
  permissions, execution and verification, memory, and the defining interaction
  principle.
- `docs/essential-os/`: the operating-system layer: architecture, components
  and design principles.
- `docs/slate/`: the hardware layer: vision and requirements.
- `docs/decisions/`: the ADR convention and the first nine decisions.
- `docs/research/`: the project log, Ida's real history, and prior art.
- `docs/brand/`: the E∬ENTIAL OS wordmark, the `<∫>` Ida mark, and the SLATE
  relationship, with a real SVG wordmark.
- `contract/`: language-neutral JSON Schemas for Intent, Capability and
  ExecutionResult, plus conformance fixtures and a zero-dependency validator.
- `site/`: the one-page project site.
- `prototypes/` and `src/`: pointers explaining where the real work lives.

### Changed

- Replaced em-dashes throughout with commas and colons, for a plainer
  typographic style.
- The one-page site is deployed to GitHub Pages at
  <https://luishowin.github.io/essential-os/>.
