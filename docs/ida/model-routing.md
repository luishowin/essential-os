# Model Routing

**Status:** Architecture + Prototype · **Date:** 2026-10-07

The important architectural idea is that **Ida does not care which model
answered.** Model selection is a service above the model, not a property of the
agent.

---

## Provider-agnostic by construction

The interface Ida's runtime depends on is conceptual:

```text
understand(request, context, capabilities) → intents
```

**Not:**

```text
ask_hermes(...)
ask_openai(...)
```

In the real implementation this is a `ModelProvider` trait in the platform-free
core. The core depends on the trait; the OS adapter implements it. Swapping
Ollama for a local GGUF, for Fireworks, for Anthropic, or for some future local
model does not redesign the assistant.

> Ida itself becomes the stable layer. Models can come and go.

## The tiers

```text
Model Router
 ├── no model          → deterministic logic
 ├── tiny local model  → intent classification
 ├── small local model → tool selection
 ├── reasoning model   → complex planning
 └── remote model      → optional / high complexity
```

The routing question is not "which model is best?" but **"does this request need
a model at all, and if so, how much of one?"**

## Do not invoke a model when deterministic logic can solve it

This is a performance, reliability and privacy decision at once. Typed text is
already forgiven for typos deterministically, so typed text stays deterministic
end to end. Interpretation earns its keep where the input is genuinely uncertain
— a misheard voice transcript, a paraphrase, an ambiguous reference.

## Local-first, not local-only

This is a precise distinction, not a slogan.

Ida runs locally whenever the local system can handle the task appropriately.
But it is allowed to pass work outward when:

- the task requires substantially larger reasoning;
- current web information is required;
- an external specialised service is genuinely better suited;
- local hardware cannot reasonably perform the task.

Sensitive data preferentially remains local.

## When work is passed outward

The objective is not "never use cloud AI." It is:

> **Ida decides where computation belongs.**

When something must be passed outward, the system minimises the context shared:

```text
understand task locally
        ↓
extract required context
        ↓
redact / transform where possible
        ↓
pass only necessary information
```

That is a far more credible privacy architecture than simply declaring "local
AI." A concrete example already in the real system: a cloud provider receives a
question and nothing else about the machine — no files, no local context, no
typed text that the user did not choose to send.

## The computing fabric (long-term)

```text
SLATE
 ├── CPU · NPU/GPU · local models · local storage
 │
 ├── home server        (persistent, heavier local work)
 │
 └── external / frontier compute   (frontier reasoning, current information)
```

Ida becomes an orchestration layer that decides where work happens. A 999 g
machine does not need to carry every ounce of compute; it can be the interface
to a distributed personal computing environment. **Status: Planned / long-term.**

## Status

**Prototype.** A local action model is implemented (small, loopback, schema-
constrained) and a cloud provider is implemented for knowledge answers. A
general, policy-driven router that chooses between tiers per request is
**Planned**. Provider-agnosticism is **Implemented** at the trait boundary.
