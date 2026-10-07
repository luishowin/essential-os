# 0002. Ida is an interaction runtime, not merely a router

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

An early version of the design called the central component an "Intent Router":
text in, one destination out. But a real request may need no routing at all, may
need context resolved before it means anything, may become several actions, may
need permission and confirmation, may need verifying afterwards, and may need a
response shaped for the input that produced it.

## Decision

Ida's central component is an **Interaction Runtime** containing intent
interpretation, context resolution, planning, permissions, execution and
verification. "Router" is one small subsystem inside it.

## Reasoning

- Calling it a router invites the wrong design: a single dispatch table rather
  than a stateful runtime.
- The runtime is where the trust rule is enforced, and where the execution state
  machine lives.
- Naming shapes architecture; a small name would have capped the design.

## Alternatives

- **Keep "Intent Router" and add stages around it.** Rejected: the name would
  keep pulling the design back toward a dispatcher.
- **Split into separate services (resolver, planner, executor).** Rejected for
  now: one runtime with clear internal stages is easier to reason about and
  keep correct for one person.

## Consequences

- The runtime owns a linear pipeline with explicit states and explicit failure
  states.
- Model calls are isolated to one stage (translation/planning), never execution.
- The `Router` concept survives as a component, not the whole.
