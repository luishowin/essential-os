# 0009. The desktop base is an open question

- **Status:** Open
- **Date:** 2026-10-07

## Context

Essential OS is assembled on Linux, and its desktop layer must sit on a concrete
base. Two viable paths exist:

- **KDE Plasma**: the current machine (Plasma 6.7.5) and the Essential Desktop
  assembly. Rich, configurable, strong Wayland story, mature shell.
- **GNOME**: Ida's original target (Fedora 44 / GNOME 50), with Ida's existing
  GNOME integration work already done.

The machine has recently moved from GNOME to Plasma, which makes this a live
question rather than a settled one. Ida is currently being ported to Plasma
(Phase 0 probes complete).

## Decision

**Deliberately undecided.** Both bases are documented. The choice will be
settled by an explicit later ADR.

The condition that will settle it: a comparison against the criteria below,
recorded as a new ADR that supersedes this one.

## Reasoning

- Choosing now would be guessing, and the cost of guessing wrong is a large
  amount of integration work.
- The project's stable layer is Ida's capability and policy system, not the
  shell, so this choice does not block Ida's architecture.
- Recording it as open prevents the false impression that it is settled.

## Criteria that will settle it

- Ida's integration cost on each base (shortcuts, placement, system actions,
  portals, secrets).
- How much of the desired shell behaviour is configuration versus code.
- The energy / power-management story for a "simple at rest" machine.
- The application-presentation model (naming, theming, app family).
- Long-term maintainability for one person.
- The path to the eventual SLATE hardware.

## Alternatives

- **Plasma now.** Attractive: it is the current machine and assembly.
- **GNOME now.** Attractive: Ida's existing integration is GNOME-based.
- **Stay open.** Chosen, for now.

## Consequences

- `essential-os` docs describe the desktop layer in base-neutral terms, with a
  note where the bases differ.
- Ida's port to Plasma continues as an experiment, not a commitment.
- The interface contract is deliberately shell-independent, so it survives
  either choice.
