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
- `docs/research/`: the project log, Ida's real history, prior art, the
  Pacific UI lineage note, and the reference library.
- `docs/planning/`: roadmap, first-release scope, success measures, project
  tracking, quality gates, website/support, AI workflow, first 30 days and the
  seed backlog.
- `docs/brand/`: the ESSENTIAL OS wordmark, the Ida name, and the SLATE
  relationship, with a real SVG wordmark and EOS icon.
- `contract/`: language-neutral JSON Schemas for Intent, Capability and
  ExecutionResult, plus conformance fixtures and a zero-dependency validator.
- `site/`: the one-page project site.
- `prototypes/` and `src/`: pointers explaining where the real work lives.

### Changed

- The repository is declared the canonical record. Upstream repositories,
  working copies and backups are mirrors to compare against it.
- Pacific UI is recorded as the condensed GNOME predecessor in
  `docs/research/pacific-ui.md`; its originals stay archived on MX500.
- Branding simplified: integrals removed everywhere (`ss` is `ss`, Ida is `Ida`); wordmark set in Geo at 21% tracking; EOS block-letter icon added as `docs/brand/eos-icon.svg` and `site/eos-icon.svg` and used as site favicon / header.
- Replaced em-dashes throughout with commas and colons, for a plainer
  typographic style.
- The one-page site is deployed to GitHub Pages at
  <https://luishowin.github.io/essential-os/>.
