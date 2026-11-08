# ESSENTIAL OS

**A personal computing system I'm building toward 2030.**

> **EXPLORATION. CREATION. PLAY.**

**Project site:** <https://luishowin.github.io/essential-os/>

Essential OS is not an AI app and not a Linux distribution written from
scratch. It is a long-term personal computing platform: a coherent operating
system **assembled from proven open-source components**, with its own UX,
orchestration and system-level software layered on top.

Two separate systems provide its intelligence. **Sam** is the native,
deterministic search and retrieval service: it answers questions about the
computer itself. **Ida** is the personal assistant: it understands requests,
acts through approved tools, converses, reasons and decides where computation
belongs. They are peers, not one assistant with two names.

This repository is the **canonical engineering and design record** for the
project. It holds the vision, the decisions, the roadmap, the brand and the
public site. The code lives in dedicated repositories, linked below.

---

## The three layers

```text
        SLATE
          ↓
     Essential OS
      ├── Sam   (search and retrieval)
      └── Ida   (personal assistant)
```

| Layer | What it is | State |
|---|---|---|
| **SLATE** | The eventual hardware: an extremely light, thin, modular ultrabook (999 g, ≤13″, Framework-style modularity). *Simple at rest, powerful on demand.* | **Speculative**, a hardware concept, not a product |
| **Essential OS** | A Linux-based operating system assembled from excellent existing components (kernel, drivers, desktop, networking, audio, graphics, packaging, security), with our own UX and system services on top. | **Vision + research**, with a real desktop assembly in progress |
| **Sam** | The native search and retrieval service. A deterministic, non-generative engine over a dense registry of domains, intents, retrieval rules and predefined handlers. It knows the computer and its permitted local information, not the outside world. | **Specified only**, design stage |
| **Ida** | The personal assistant. Voice-first and local-first: understands intent, resolves context, uses approved tools, executes native actions, converses and escalates complex work to local or cloud models. Uses Sam for local lookup. | **Prototype → early architecture**, Core is real and released |

The relationship should feel like parts of one universe:

```text
ESSENTIAL OS
  ├── Sam
  └── Ida

SLATE
```

Sam and Ida are independent systems with independent roadmaps. Sam is not a tier
of Ida, and Ida is not a conversational wrapper around Sam. See
[ADR 0010](docs/decisions/0010-sam-separate-os-search-service.md).

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
- **Seventeen single-file UI prototypes**: fifteen applications, a desktop shell
  and a SLATE keyboard study. They are browser mockups, not shipped software.
  → [`prototypes/`](prototypes/) and the
  [build tracker](docs/status.md)

### Being explored

- **Sam**, the native search and retrieval engine: specified in
  `Essential_OS_Sam_and_Ida_Specification_v1.1` and established as an
  independent project, with no implementation yet. → [`luishowin/sam`](https://github.com/luishowin/sam)
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

## How this repository is organised

- **This repository** is the canonical engineering and design record.
- **`luishowin/ida`** owns Ida's implementation and detailed specification.
- **`luishowin/sam`** owns Sam's architecture, registry design and roadmap.
- **The design tool** owns visual exploration; decisions and token values are
  recorded here.
- **GitHub Issues** own work that needs doing.
- **Local notes** are temporary; triage them into the record or delete them.

Upstream repositories, working copies and backups are mirrors. Before editing or
restoring one, fetch the GitHub repository and compare. The same rule is written
on the MX500 drive's `readme.txt`.

## Repository map

The consolidated product and technical statement is
[`docs/essential-os-specification.md`](docs/essential-os-specification.md)
(v0.2). It describes the whole system in one place; the documents below hold the
reasoning, the layer detail and the open questions.

The authoritative Sam/Ida architecture is
[`docs/specifications/Essential_OS_Sam_and_Ida_Specification_v1.1.pdf`](docs/specifications/Essential_OS_Sam_and_Ida_Specification_v1.1.pdf)
(3 November 2026). It supersedes the v1.0 tiered assistant specification.

```text
docs/          the record: vision, architecture, decisions, research
  essential-os-specification.md  the product and technical specification (v0.2)
  specifications/  authoritative standalone specifications
  ida/           the personal assistant (narrative; detail lives in the ida repo)
  essential-os/  the operating system layer
  slate/         the hardware layer
  decisions/     architecture decision records (ADRs)
  migrations/    dated records of architectural changes
  research/      the project log, history, prior art and source library
  planning/      roadmap, first-release scope, quality gates and working process
  brand/         the visual language and wordmark
status.md      what has actually been built, with status and links
prototypes/    hosted single-file application, desktop and hardware mockups
skills/        the Essential OS app skill for Claude
contract/      language-neutral interface schemas and conformance fixtures
site/          the one-page project site
src/           why there is no implementation here
```

**Implementation repositories:**

- Ida: <https://github.com/luishowin/ida> (Rust: `ida-core`, `ida-linux`,
  `ida`, `ida-voice`)
- Sam: <https://github.com/luishowin/sam> (documentation-led; no implementation yet)
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
