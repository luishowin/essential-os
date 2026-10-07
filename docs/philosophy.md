# Philosophy

> **EXPLORATION. CREATION. PLAY.**

**Status:** Vision · **Date:** 2026-10-07

---

## The three modes

A personal computer should be organised around what a person actually does with
it, not around the categories software vendors impose.

- **Exploration** — research, learning, browsing, experimentation, discovery.
- **Creation** — design, code, writing, building, editing, making things.
- **Play** — games, media, tinkering, experimentation for its own sake.

"Work" was considered as a fourth category and rejected. It is narrower than
exploration, and it carries an assumption about who the machine is for. The
three modes above describe a life with a computer more honestly.

## Build what you can own

The frustration that motivates this project is real, and it is worth stating
plainly rather than dressing up:

- expensive proprietary software and subscription dependency;
- vendor lock-in;
- opaque AI systems that cannot be inspected;
- cloud dependence;
- software that increasingly assumes access to personal data.

The response is **not** to build everything from scratch, and it is **not** to
design around resentment. Resentment produces a project shaped by its opponent.
The durable principle is:

> **Build what can be owned.**

You do not need to beat a proprietary photo editor at its own game. You need to
be capable of building the tool you actually need. If 70% of what you need can
be assembled from open components and your own software, the economics of your
computing life change.

## Use existing technology intelligently

Writing a kernel, a graphics stack, an audio server and a package manager from
scratch would consume the entire project and produce something worse than what
already exists. Linux gives decades of accumulated engineering. Effort belongs
where differentiation actually exists: the UX, the orchestration, and the
intelligence layer.

## Keep the architecture understandable

A system you cannot understand is a system you do not own. This is why:

- the intelligence never touches the operating system directly;
- capabilities are explicit and inspectable;
- decisions are written down;
- complexity is added a layer at a time, and never before the current layer
  works.

## Let AI accelerate the builder

AI is used heavily to build this project. That is a tool, not a substitute for
judgement. Documentation is part of the engineering system precisely because the
builder and the assistant share the same record.

## Preview aggressively, commit conservatively

A design principle that will run through Ida and through the whole interface:
the system may speculate visually as fast as the user can type, but destructive
or irreversible actions must never execute merely because a partial phrase
resembles an intent.

## Local-first, not local-only

The intelligence should run locally whenever the local system is capable. It may
pass work outward when a task genuinely needs larger reasoning, current
information, or a specialised service. The objective is not "never use cloud
AI." The objective is:

> **Ida decides where computation belongs.**

Sensitive data preferentially stays local, and when something is passed outward,
only the minimum necessary context is shared. See
[`ida/model-routing.md`](ida/model-routing.md).
