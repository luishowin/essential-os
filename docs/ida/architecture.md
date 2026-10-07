# Ida: architecture

**Status:** Architecture + Implemented (Core) · **Date:** 2026-10-07

The pipeline below is the shape Ida has been built toward since the beginning.
It is deliberately linear and explicit. Each stage has one job, and the model
appears in only one place.

---

## The pipeline

```text
USER
 │  keyboard · voice
 ▼
┌─────────────────┐
│ Input Processor │   speech-to-text · normalise
└────────┬────────┘
         │  UserRequest { text, source, timestamp, context }
         ▼
┌─────────────────┐
│  Intent Engine  │   deterministic first · local model last
└────────┬────────┘
         │  structured Intent
         ▼
┌─────────────────┐
│ Context Engine  │   resolve references and arguments
└────────┬────────┘
         │  resolved arguments
         ▼
┌─────────────────┐
│    Planner      │   1-step or N-step
└────────┬────────┘
         │  capability calls
         ▼
┌─────────────────┐
│ Action Runtime  │   permissions · validation · execution
└────────┬────────┘
         │  results / events
         ▼
┌─────────────────┐
│    Verify       │   did it actually happen?
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Response Engine │   visual · spoken · both
└────────┬────────┘
         ▼
       USER
```

The model is a **translator and a planner**. It is not the executor. That gives
Ida a clean boundary, and it is what keeps the architecture from collapsing into
"an LLM with a shell."

## Input

Keyboard now, voice later, and both converge on one value, so that voice does
not create a second assistant:

```text
keyboard ─┐
          ├──► UserRequest { text, source, timestamp, context }
voice ────┘        ▲
   │               │
   └── STT ────────┘
```

A spoken *"Hey Ida, open PhotoDesk"* and a typed *"open photodesk"* are
effectively identical downstream. The response is likewise one object that can
be shown, spoken, or both.

**Status:** keyboard Implemented; voice Prototype (transcribes locally, lands in
the entry as typed text).

## Intent Engine: do not invoke an LLM when deterministic logic can solve it

The engine is a hierarchy, tried in order:

```text
REQUEST
 │
 ├── obvious deterministic command? ──► deterministic handler
 │
 ├── obvious search? ────────────────► search
 │
 ├── obvious calculation? ───────────► calculator
 │
 ├── known capability? ──────────────► capability resolver
 │
 └── ambiguous / natural language? ──► local model
```

The point is that `firefox`, `2.4 GB in MB` and `reboot` never touch a model,
while *"find the screenshots I took yesterday and open the newest one"* does.
That buys speed, reliability and a far smaller model requirement.

**Status:** deterministic layers Implemented and tested; the local-model
fallback is Implemented but wired to the voice path first (see
[model-routing.md](model-routing.md)).

## Intent → Plan → Action are three different things

This separation becomes valuable later, so it is established now.

- **Intent**: *what does the user want?* `open_file`
- **Plan**: *what steps are necessary?* search → filter → sort → select → open
- **Action**: *what actually happens?* `files.search(...)`, `desktop.open(...)`

```text
Natural language
      ↓
    Intent
      ↓
     Plan
      ↓
   Actions
```

A request like *"open Firefox and put it beside Ptyxis"* is a two-action plan. A
request like *"find the PDF I generated five minutes ago and open it"* is
multi-step but does **not** need a heavyweight autonomous agent. Do not conflate
"multi-step" with "agent."

**Status:** Intent Implemented; bounded planning Implemented (1–5 validated
steps, sequential, no replanning; that data-passing loop is Max's).

## The core boundary

In the real implementation the boundary is compiler-enforced:

- `ida-core` is platform-free: it never uses `std::fs`, `std::process` or
  `std::net`, and a test fails if a dependency outside its allowlist appears.
- It reaches host facts (where Downloads is, what time it is) through a
  read-only `Host` trait implemented by the OS adapter.
- `Validated`, `Approved` and `Pending` have private fields and no public
  constructors; a compile-fail doctest shows outside code cannot build one.
- The adapter's side-effect functions are crate-private; its public surface is
  the executor plus read-only queries.

That is what makes "the intelligence never controls the OS" a fact rather than
an aspiration.

## Where to go deeper

The implementation spec is in [`luishowin/ida`](https://github.com/luishowin/ida)
`docs/ARCHITECTURE.md`: the frozen register, the capability table and the
measured budgets. This document describes the same pipeline at the level
of the platform.
