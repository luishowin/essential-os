# Prior art

**Status:** Research · **Date:** 2026-10-07

Systems worth learning from. This is **inspiration and analysis, not critique**.
The point is to understand an architectural direction that is genuinely
interesting, and to take from it what fits this project.

---

## The shift this project responds to

Platform companies have begun moving from "an assistant that calls an LLM" to
"an operating system with a system-level agent." The important distinction:

> The model does not directly control the device. It reasons about a request,
> retrieves relevant context, selects system/app tools, and the operating system
> executes those tools.

That is the same architectural direction as Ida, arrived at independently. It is
worth studying carefully, while noting that only the interfaces are public, and
the internals (planner topology, prompts, routing policy, ranking) are inferred.

## Apple's Siri (2026)

The most useful public example. Roughly:

```text
User ── voice/text ──► frontend
                          │  understand request
                          ▼
                    System Orchestrator
                    ┌────────┼────────┐
                    ▼        ▼        ▼
              Personal     App      World
              Context     Toolbox   Knowledge
                    └────────┼────────┘
                             ▼
                    Foundation Model
                    (on-device / private cloud)
                             ▼
                        final response
```

Lessons worth taking:

- **Several models, not one.** Easy/latency-sensitive work goes to a small
  on-device model; harder reasoning may go to a larger, privacy-preserving
  server-side model. Ida's model router is the same idea.
- **Structured entities, not strings.** Messages, calendar events, photos and
  contacts are represented as structured objects the system can understand,
  and indexed semantically rather than by substring. This is Ida's entity
  system.
- **A toolbox, not arbitrary access.** Apps expose *actions* as typed intents;
  the model selects tools, and the system validates and executes them. This is
  Ida's capability registry, and it is the single most important thing to get
  right.
- **Standard schemas over bespoke phrases.** Declaring operations structurally
  lets the model handle natural language, instead of developers enumerating
  every phrasing. This is why Ida's capability contract is explicit.
- **On-screen awareness as context.** Associating visible UI with underlying
  entities, rather than screenshotting and guessing.
- **Cross-app operation handled by the OS.** A single request can chain actions
  across several apps, with the system coordinating.
- **Privacy as architecture.** On-device processing where possible; a
  privacy-preserving remote path where not; personal data kept under system
  control.
- **The agent loop.** Understand goal → retrieve context → reason → select tool
  → execute → feed result back → repeat or answer.

And the conclusion this project draws from all of it:

> The LLM is no longer the most interesting part. The interesting part is the
> layer around it: semantic indexing, structured entities, structured tools,
> context, orchestration, permissions and secure execution.

## What this project takes, and what it rejects

**Takes:** the orchestrator, the capability/tool model, structured entities,
semantic retrieval, the local/remote split, privacy as architecture, and the
agent loop.

**Rejects:** the closed, un-inspectable implementation; the assumption that the
vendor's cloud is the default; and the idea that a user cannot own the layer
around the model.

**Keeps its own:** the capability registry is Ida's own abstraction, not an
adapter to a vendor's. MCP, if it arrives, is an interoperability layer, not the
foundation.

## Other references

- **Local inference stacks** (Ollama, llama.cpp): the practical path to small
  local models on ordinary hardware.
- **Small instruction and action models**: enough to classify intent and select
  a tool; not enough (yet) to map paraphrase reliably, which validation must
  absorb.
- **Embedding models**: a lightweight semantic retrieval layer, without turning
  Ida into a chatbot with a vector database stapled on.
