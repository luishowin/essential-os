# Architecture (umbrella)

**Status:** Vision + architecture · **Date:** 2026-10-07

This document describes how the three layers connect. It is deliberately
high-level. Detail lives in the layer documents:

- Ida → [`ida/architecture.md`](ida/architecture.md) (and the implementation
  spec in [`luishowin/ida`](https://github.com/luishowin/ida))
- Essential OS → [`essential-os/architecture.md`](essential-os/architecture.md)
- SLATE → [`slate/hardware-requirements.md`](slate/hardware-requirements.md)

---

## The stack

```text
┌──────────────────────────────────────────────────────────┐
│  USER                                                    │
│  keyboard · voice · screen selection                     │
└───────────────────────────┬──────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│  Ida  <∫>        the intelligence layer                  │
│  understand → resolve context → plan → capabilities →    │
│  execute native actions → verify                         │
│  local-first · provider-agnostic · preview-first         │
└───────────────────────────┬──────────────────────────────┘
                            ↓  structured capabilities only
┌──────────────────────────────────────────────────────────┐
│  Essential OS      the substrate                         │
│  Linux kernel · drivers · desktop · networking · audio · │
│  graphics · packaging · security · our UX & services     │
└───────────────────────────┬──────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│  SLATE             the hardware                          │
│  999 g · ≤13″ · modular · simple at rest, powerful on    │
│  demand                                                  │
└──────────────────────────────────────────────────────────┘
```

The arrows are one-way on purpose. Ida issues **structured capabilities**;
Essential OS decides what is permitted and executes. The intelligence never
holds an unrestricted handle on the machine. That boundary is the single most
important structural idea in the project, and it is the reason the layers can
grow independently.

## The three layers

### SLATE — the hardware

An eventual, extremely light, thin and modular ultrabook. The design idea is
**simple at rest, powerful on demand**: normally a quiet, efficient laptop with
the thermal and compute headroom to become serious when a workload requires it.
Ida is not merely software shipped with SLATE; Ida is the thing that helps the
user exploit the hardware. **Status: speculative.**

### Essential OS — the substrate

A coherent operating system **assembled from excellent existing components**
rather than written from scratch. Kernel, drivers, utilities, desktop
infrastructure, networking, audio, graphics, package management and security
come from the open-source ecosystem. Differentiation lives in the UX,
orchestration and system services layered on top. **Status: vision + research,
with a real desktop assembly in progress.**

### Ida `<∫>` — the intelligence

The system-level agent. It begins as a tiny launcher/search interface and
evolves into a layer that understands natural-language intent, resolves context
and entities, selects capabilities, executes native OS and app actions, verifies
results, and knows when to use local intelligence versus passing a task outward.
**Status: prototype → early architecture; Core is real and released.**

## The computing fabric (long-term)

Ida is not "the AI inside the laptop." It is part of a personal computing
fabric, and it may eventually decide *where* work happens:

```text
SLATE
 ├── CPU
 ├── NPU / GPU
 ├── local models
 └── local storage
       │
       ├── home server
       │
       └── external / frontier compute
```

Ida becomes an orchestration layer capable of routing work to the right place:
local models for latency-sensitive and private work, a home server for
persistent and heavier local workloads, and external services for frontier
reasoning or current information. This is **long-term architecture, not current
implementation.**

## Cross-cutting principles

These hold across all three layers and are recorded as ADRs:

| Principle | ADR |
|---|---|
| The intelligence never controls the OS directly | [0005](decisions/0005-no-unrestricted-shell.md) |
| The LLM is a translator and planner, not the executor | [0008](decisions/0008-llm-is-translator-not-executor.md) |
| Intent, Plan and Action are separate concepts | [0006](decisions/0006-intent-plan-action-separation.md) |
| The capability registry is the primary abstraction | [0004](decisions/0004-capability-registry-as-primary-abstraction.md) |
| Local-first, not local-only | [0003](decisions/0003-local-first-model-routing.md) |
| Ephemeral context before persistent memory | [0007](decisions/0007-ephemeral-context-before-persistent-memory.md) |
| Ida is a runtime, not merely a router | [0002](decisions/0002-ida-runtime-vs-router.md) |
| The desktop base is an open question | [0009](decisions/0009-desktop-base-open.md) |

## What is decided, and what is not

The project keeps a clear line between what is settled and what is open. The
current open questions are listed in
[`research/README.md`](research/README.md#open-questions) and are revisited
rather than quietly forgotten.
