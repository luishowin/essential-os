# Ida

**The personal assistant of Essential OS.**

**Status:** Prototype → early architecture · **Date:** 2026-10-07

---

## What Ida is

Ida is a voice-first, local-first personal AI assistant. She understands
natural-language requests, controls the operating system through approved
tools, holds conversations, reasons through problems, writes and explains,
handles complex and multi-step tasks, interprets context and delegates work to
more capable local or cloud models when needed.

She is not a chatbot wrapper around a shell, and she is not "an LLM that can run
commands." The interesting part is the operating-system intent system
underneath; models are replaceable components sitting above it.

The name is plain: Ida, no mark, no brackets.

The defining philosophy, in one line:

> **Intent → OS → AI → Native Action.**
>
> *Not* user → LLM → 47 tools → hope nothing explodes.

Historically Ida began as a tiny launcher and search interface. That surface
still exists as her command panel, but ownership of operating-system search has
moved to **Sam** (see below). Ida's purpose is broader: she is the assistant, not
the search engine.

## Ida and Sam are separate

Essential OS has two intelligent systems with different jobs:

- **Sam** is the native search and retrieval service. It is deterministic and
  non-generative, knows only the computer and its permitted local information,
  keeps no memory, and returns structured results or a typed handoff.
- **Ida** is the personal assistant described on this page.

Sam is not a tier of Ida, an Ida backend or a renamed Ida subsystem. Ida may call
Sam through a typed interface when she needs local information; Sam never calls
Ida, Hermes or a model. Ida keeps her own action registry, privacy gate,
executor and personality.

The operating system works without Ida, and Ida does not depend on Sam to
function. A file lookup that is part of an Ida command workflow may remain an
Ida action; broad OS search belongs to Sam. Ownership is decided by function,
not by keyword.

→ Sam: <https://github.com/luishowin/sam>
→ Decision: [ADR 0010](../decisions/0010-sam-separate-os-search-service.md)

## The trust rule

Ida's intelligence **never controls the operating system directly.** Parsers,
providers and (later) models emit inert `Intent` values. Only the policy layer
can mint an approval, and only the executor, which accepts nothing else,
performs a side effect.

This is the one trust path that every future capability must go through, so it
exists before any model-driven intent does. In the real implementation it is
enforced by types with private fields, not by convention, and the platform-free
core is checked by a test that fails if it reaches the OS.

See [security-and-permissions.md](security-and-permissions.md) and ADR
[0005](../decisions/0005-no-unrestricted-shell.md).

## Documentation map

| Document | What it covers |
|---|---|
| [roadmap.md](roadmap.md) | Product tiers, processing tiers, the 2026–2030 trajectory, version history |
| [architecture.md](architecture.md) | The pipeline: Input → Intent → Context → Plan → Action → Verify → Response |
| [interaction-runtime.md](interaction-runtime.md) | Why Ida is a runtime, not merely a router |
| [capability-registry.md](capability-registry.md) | Capabilities: the bridge between language and the OS |
| [context-and-entities.md](context-and-entities.md) | Ephemeral context, references and structured entities |
| [model-routing.md](model-routing.md) | Provider-agnostic routing; local-first, not local-only |
| [security-and-permissions.md](security-and-permissions.md) | Permissions, confirmation policy, guardrails |
| [execution-and-verification.md](execution-and-verification.md) | The execution state machine and verification |
| [memory.md](memory.md) | Ephemeral context now; persistent memory later |
| [interaction-principle.md](interaction-principle.md) | *Actualise intents as fast as you can type* |

## Source of truth

This directory is the **narrative** of Ida: what it is for and how it is shaped.
The **implementation specification** lives in the Ida repository: the frozen
and provisional register, the capability table, the measured budgets, and the
dated decision log.

> <https://github.com/luishowin/ida>: `docs/ARCHITECTURE.md`,
> `docs/DECISIONS.md`, `docs/SPIKE-*.md`

Those documents are the authority on implementation detail. This directory does
not copy them; it explains them, at the level of the whole platform, so the two
cannot drift apart.

## Implementation at a glance

The real Ida is a Rust workspace with four crates:

| Crate | Role |
|---|---|
| `ida-core` | Intents, capability registry, policy, grammar, calculator, units, ranking, engine, context, planner, request/entity/result, model-provider trait. **Platform-free.** |
| `ida-linux` | The OS adapter: apps, action-level file lookup, launching, system actions, the executor, the network door, the voice door, Ollama. |
| `ida` | The binary: the panel (GTK4/libadwaita) and the headless CLI. |
| `ida-voice` | The speech helper, alive only while listening. |

These crates contain no Sam registry and no Sam runtime. Ida's file lookup is an
action-level capability used inside command workflows; broad OS search is Sam's
responsibility.

**Status: Implemented** (released `v0.0.1`–`v0.0.3`; `0.0.4`/`0.0.6` in
progress).
