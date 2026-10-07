# 0001. Project scope: a platform, not an application

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

The project began as a small personal assistant ("Ida"), a launcher that could
search, calculate, launch apps and run quick system commands. Over time it
became clear that the interesting idea was larger than an assistant application:
a *personal computing platform* made of three connected layers: hardware
(SLATE), operating system (Essential OS) and intelligence (Ida).

The risk of staying an "application" is that the architecture is shaped around
one app's needs, and cannot grow into a system.

## Decision

The project is scoped as a **platform**, with three layers developed together:

```text
SLATE → Essential OS → Ida <∫>
```

The repository `essential-os` is the canonical engineering and design record.
Implementation lives in dedicated repositories (notably `luishowin/ida`) and is
linked, not duplicated.

## Reasoning

- The layers make each other more valuable: an OS with a system-level
  intelligence layer, and an intelligence layer that can act on the OS safely.
- A platform scope forces the right boundaries early (structured capabilities,
  a trust path, an entity model) rather than retrofitting them onto an app.
- A written, canonical record is what makes a multi-year project coherent.

## Alternatives

- **Stay an application.** Simpler now; architecturally a dead end for the
  stated goal.
- **Build everything in one monorepo immediately.** Rejected for now: it would
  disrupt a working implementation and its release flow for no immediate gain.
  Remains possible later if it becomes the right move.
- **Start the OS from scratch.** Rejected: decades of proven engineering already
  exist; effort belongs where differentiation is.

## Consequences

- The project is explicitly long-term (toward 2030), and not one feature.
- This repository is documentation-first; it does not own implementation code.
- A language-neutral interface contract is owned here so the platform has one
  canonical definition of Intent, Capability and ExecutionResult.
- Scope must be defended: not every interesting idea belongs in the platform.
