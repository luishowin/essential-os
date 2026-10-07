# E∬ENTIAL OS

**A personal computing system I'm building toward 2030.**

> **EXPLORATION. CREATION. PLAY.**

**Project site:** <https://luishowin.github.io/essential-os/>

Essential OS is not an AI app and not a Linux distribution written from
scratch. It is a long-term personal computing platform: a coherent operating
system **assembled from proven open-source components**, with its own UX,
orchestration and system-level software layered on top, and an intelligent
system layer, **Ida `<∫>`**, that decides where computation belongs.

This repository is the **canonical engineering and design record** for the
project. It holds the vision, the decisions, the roadmap, the brand and the
public site. The code lives in dedicated repositories, linked below.

---

## The three layers

```text
        SLATE
          ↓
     Essential OS
          ↓
      Ida  <∫>
```

| Layer | What it is | State |
|---|---|---|
| **SLATE** | The eventual hardware: an extremely light, thin, modular ultrabook (999 g, ≤13″, Framework-style modularity). *Simple at rest, powerful on demand.* | **Speculative**, a hardware concept, not a product |
| **Essential OS** | A Linux-based operating system assembled from excellent existing components (kernel, drivers, desktop, networking, audio, graphics, packaging, security), with our own UX and system services on top. | **Vision + research**, with a real desktop assembly in progress |
| **Ida `<∫>`** | The intelligent system layer: a launcher that becomes an operating-system agent. Understands intent, resolves context, selects capabilities, executes native actions, verifies results, and routes work between local and external intelligence. | **Prototype → early architecture**, Core is real and released |

The relationship should feel like parts of one universe:

```text
E∬ENTIAL OS

<∫> Ida

SLATE
```

The double integral `∬` replaces the two *s* characters in "Essential".

---

## What this actually is

The long-term goal is a **personal computing platform**, not merely an AI
application. The defining philosophy is:

**Build what can be owned.**
Use existing technology intelligently.
Keep the architecture understandable.
Let AI accelerate the builder, not replace the builder.

The project was inspired partly by watching modern platform companies move
toward **system-level** AI: an orchestrator that reasons over a request,
retrieves context, selects structured OS/app actions, and lets the operating
system execute them, rather than putting a chatbot inside an application.

The question underneath it:

> What happens when the computer itself becomes the interface to intelligence?

The response is not "build everything from scratch." The response is to build
what can reasonably be owned, and to assemble the rest from components that
are already excellent.

---

## Honest status

This section is deliberately blunt. Nothing here is presented as finished
unless it is.

### Exists now

- **Ida Core**, a keyboard-first *find / launch / ask* panel for Linux, written
  in Rust. It is a real, released application with three tagged releases
  (`v0.0.1`, `v0.0.2`, `v0.0.3`) and a fourth line in progress.
  → [`luishowin/ida`](https://github.com/luishowin/ida)
- A strict trust architecture: intelligence emits inert `Intent` values; only a
  policy layer mints approval; only an executor touches the OS. Enforced in
  types and by tests, not by convention.
- A capability registry, an ephemeral context engine, a bounded planner, a
  local action model (Ollama + FunctionGemma), and verification, implemented
  as the `0.0.6` foundation.
- **Essential Desktop**, a real Fedora + KDE Plasma assembly: shell, app
  presentation, visual language, energy policy and interaction model.
  → `Labs/essential-desktop` (private working tree)

### Being explored

- Local AI infrastructure: small action models, embeddings and semantic
  retrieval, model quantisation, and the split between local and external
  inference.
- The desktop base for Essential OS (GNOME vs KDE Plasma), currently an open
  question, recorded as an ADR.
- How a launcher becomes an interaction runtime, and how partial input can be
  actualised safely as it is typed.

### Planned

- Ida Pro and Ida Max tiers: memory, context, integrations, multi-step
  planning, goals and verification.
- A semantic index and structured entity layer over personal information.
- A provider-agnostic model router that decides where computation belongs.

### Speculative

- **SLATE**, the 999 g modular ultrabook.
- The personal **computing fabric**: a laptop, a home server and external
  compute, with Ida deciding where work happens.
- Distributed workloads and a personal semantic OS layer.

If a thing is speculative, it says so. If a thing is documented but not built,
it says so. See the status legend in
[`docs/research/README.md`](docs/research/README.md).

---

## Repository map

```text
docs/          the record: vision, architecture, decisions, research
  ida/           the intelligent layer (narrative; detail lives in the ida repo)
  essential-os/  the operating system layer
  slate/         the hardware layer
  decisions/     architecture decision records (ADRs)
  research/      the project log, history and prior art
  brand/         the visual language and wordmark
contract/      language-neutral interface schemas and conformance fixtures
site/          the one-page project site
prototypes/    where experiments live (links to the real ones)
src/           why there is no implementation here
```

**Implementation repositories:**

- Ida: <https://github.com/luishowin/ida> (Rust: `ida-core`, `ida-linux`,
  `ida`, `ida-voice`)
- Essential Desktop: the Fedora/Plasma assembly (working tree, private)
- Early intent-router experiments: `Labs/jev-routing-test` (TypeScript)

---

## Documentation principles

Every important architectural decision is recorded in
[`docs/decisions/`](docs/decisions/README.md) as an ADR with **Context,
Decision, Reasoning, Alternatives, Consequences, Status and Date**.

Every claim carries one of five labels:

**Implemented** · **Prototype** · **Planned** · **Hypothesis** · **Open question**

Speculation is never presented as fact. Past decisions are not edited; they are
superseded by new entries. The point of this repository is that six months or
three years from now, it is still possible to understand what we were trying to
build, why, what we believed, what changed, what failed, and what should happen
next.

---

## Licence

MIT. See [`LICENSE`](LICENSE). Components assembled into the platform keep
their own licences.
