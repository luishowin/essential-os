# Ida `<∫>`

**The intelligent system layer of Essential OS.**

**Status:** Prototype → early architecture · **Date:** 2026-10-07

---

## What Ida is

Ida begins as a tiny launcher/search interface and evolves into a
system-level agent. It is not a chatbot, and it is not "an LLM that can run
shell commands." The interesting part is the operating-system intent system
underneath; models are replaceable components sitting above it.

The shape of the mark reflects the idea: the angle brackets make it feel like a
contained agent or executable construct, while the integral suggests
accumulation, composition and continuous processing.

```text
<∫>
```

The defining philosophy, in one line:

> **Intent → OS → AI → Native Action.**
>
> *Not* user → LLM → 47 tools → hope nothing explodes.

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
| [roadmap.md](roadmap.md) | Core / Pro / Max tiers, the 2026–2030 trajectory, version history |
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
| `ida-linux` | The OS adapter: apps, file search, launching, system actions, the executor, the network door, the voice door, Ollama. |
| `ida` | The binary: the panel (GTK4/libadwaita) and the headless CLI. |
| `ida-voice` | The speech helper, alive only while listening. |

**Status: Implemented** (released `v0.0.1`–`v0.0.3`; `0.0.4`/`0.0.6` in
progress).
