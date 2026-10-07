# The Interaction Runtime

**Status:** Architecture · **Date:** 2026-10-07

An early version of this project called the central component an *Intent
Router*. That name is now too small.

At this point it is an **Interaction Runtime**: a component that contains
intent interpretation, context resolution, planning, permissions, execution and
verification. "Router" becomes one small subsystem inside it.

---

## Why the name matters

A router takes an input and sends it to one destination. That is only the first
tenth of what Ida has to do:

- a request may need no routing at all (a deterministic command);
- a request may need context resolved before it means anything (*"open it"*);
- a request may become several actions;
- an action may need permission and confirmation;
- an action may need verifying afterwards;
- the result may need a response shaped for the input that produced it.

Calling that a router understates it and invites the wrong design — a single
dispatch table rather than a stateful runtime.

## The runtime in one picture

```text
            ┌───────────────────────────────────────────┐
            │            INTERACTION RUNTIME            │
            │                                           │
UserRequest │  Intent Engine                            │
   ────────►│      │                                    │
            │      ▼                                    │
            │  Context Engine                           │
            │      │                                    │
            │      ▼                                    │
            │  Planner ──────┐                          │
            │      │         │                          │
            │      ▼         │                          │
            │  Permission ◄──┘                          │
            │      │                                    │
            │      ▼                                    │
            │  Action Runtime ──► OS / apps / network    │
            │      │                                    │
            │      ▼                                    │
            │  Verification                             │
            │      │                                    │
            │      ▼                                    │
            │  Response Engine ─────────────────────────► result
            └───────────────────────────────────────────┘
```

## Two modes, one runtime

Ida presents two interaction modes, but they are not two architectures:

- **Action mode** — fast, terse, deterministic. *Open Photos.* *Done.* No
  unnecessary conversation, no giant chat history, no *"Sure! I'd be happy to
  help you open Photos!"*
- **Assistant mode** — natural language, reasoning, multi-step tasks, and a
  conversational surface when one is warranted.

Both enter through the same runtime. A single keyboard shortcut summons Ida;
Ida determines what kind of interaction is required.

## The one rule that shapes the runtime

The runtime exists to make this true:

> The intelligence proposes; the runtime decides.

Nothing a model produces is trusted. Model output only ever becomes an `Intent`
through registry validation, and every intent still passes the permission layer
on its own. A plan grants no authority; it only bounds a sequence.

## Status

**Implemented (Core).** The real Ida already routes through these stages:
`Request → Engine::resolve → Registry::validate → policy::decide →
executor → result`, with a bounded planner and capability-specific verification.
The full multi-step, data-passing, replanning loop is **Max's**, not this
release's, and is **Planned**.
