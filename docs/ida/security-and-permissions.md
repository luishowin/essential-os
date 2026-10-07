# Security and Permissions

**Status:** Architecture + Implemented · **Date:** 2026-10-07

This is where the project is deliberately strict. The single most dangerous
possible design is:

```text
run_shell(command: string)
```

as the generic mechanism for an agent. Ida does not have it, and will not.

---

## The rule

The intelligence never controls the operating system directly. Parsers,
providers and models emit inert `Intent` values. Only the policy layer can mint
an approval, and only the executor — which accepts nothing else — performs a
side effect.

```text
Natural language
      ↓
Intent
      ↓
Schema validation        ← is this a real, well-formed capability request?
      ↓
Permission / risk check  ← is it allowed, from this origin, right now?
      ↓
Confirmation if required
      ↓
Native executor          ← the only code that touches the OS
```

## Terminal access is one capability, not the mechanism

Terminal access exists, but as a distinct capability with a policy layer:

```text
terminal.run
 ├── risk: safe | caution | dangerous
 └── validated before execution
```

So *"show my disk usage"* should resolve to a structured capability rather than
a raw `df -h`, and a future *"install ffmpeg"* should resolve to
`packages.install` rather than handing over a blank terminal.

In the real system, a typed shell gesture is a run-dialog gesture and runs
visibly; a *model-proposed* shell command confirms. A shell command can never be
auto-approved as the user types, and a spoken shell command never runs without a
real confirmation.

## Permission and confirmation are separate axes

Permission is *what an action may do to the machine*; confirmation is *whether
it asks first*.

```text
Permission     Read · LowRisk · Execute · Destructive · Privileged
Confirmation   Never · WhenAmbiguous · Always
```

A capability holds one of each. The policy layer decides by combining the
permission, the confirmation policy, the **origin** of the request, and an
**ambiguity** flag.

Origins:

- **Automatic** — as the user types, or a model's own unpicked proposal;
- **UserSelected** — the user pressed Enter or clicked;
- **Spoken** — a transcript.

Two invariants follow:

1. **Ambiguity only ever adds confirmation. It never removes permission.**
   The model proposes; the runtime decides.
2. **A spoken intent is never approved outright** below full autonomy. What was
   heard is a guess about what was said, so the "yes" must come from somewhere
   else.

## A worked example

```text
"open firefox"        → app.launch        low risk · never confirms
"restart the computer"→ session.restart   low risk · the OS dialog confirms
"delete those files"  → files.delete      destructive · always confirms
"delete everything in my home directory"
                      → high-risk / refusal path · never auto-executed
```

The last line is the one that matters. Ambiguous destructive phrasing must
produce `AMBIGUOUS` or `BLOCKED`, not action. It is covered by a conformance
fixture in [`contract/fixtures/security.json`](../../contract/fixtures/security.json).

## Doors

Two OS resources are treated as doors with exactly one key each, opened only for
an approved capability and only while it is needed:

- **The network** — one module opens connections, and it is shut by default.
  Plain HTTP is loopback only. Outbound redirects are checked hop by hop.
- **The microphone** — one module opens it, for one session at a time. Audio
  never reaches disk and never leaves the machine.

Speech itself runs in a helper process that exists only while listening, so the
main process never maps the engine or a model.

## Logging

Failures are logged with their cause but **never with what the user typed or
said, and never with an intent's arguments**. A failure record may name the
action id and a cause code; it may name a host and an HTTP status; it may not
name a question, a file path, or a transcript.

## Status

**Implemented.** The trust path exists in types with private fields, and the
platform-free core is checked by a test that fails if it reaches the OS.
