# 0005. No unrestricted shell execution for the intelligence

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

The shortest path to a "capable" agent is to give it one tool:

```text
run_shell(command: string)
```

It is also the fastest way to build `rm -rf /` with a cute launcher UI. A
language model that can run arbitrary commands cannot be validated, cannot be
given a meaningful permission model, and cannot be made safe by prompt wording.

## Decision

The intelligence never receives unrestricted shell access, and
`run_shell(command)` is **not** the generic mechanism for Ida.

Terminal access exists as **one controlled capability among many**, with a
validated command, a risk level (`safe` / `caution` / `dangerous`), and a
confirmation policy. Common tasks should resolve to structured capabilities
rather than raw commands.

## Reasoning

- Validation, permissions and confirmation only mean something if the operation
  set is bounded and typed.
- The intelligence proposes; the runtime decides. A shell bypasses that.
- A spoken shell command is a guess about what was said; it must never run
  without a real confirmation.

## Alternatives

- **Shell as the universal tool.** Rejected outright.
- **No terminal access at all.** Rejected: a terminal is genuinely useful, and
  a typed shell gesture is a deliberate, visible user act. The answer is a
  controlled capability, not a wall.
- **Sandbox a shell.** Insufficient on its own: a sandbox does not give a
  meaningful permission model over the *intent*.

## Consequences

- Shell access is a capability with risk levels and validation.
- Diagnostic commands (e.g. disk usage) should become structured capabilities
  over time; whether they must is an open question.
- Every future model-driven feature must route through the registry and policy
  layer; there is no side door.
- A negative conformance fixture exists to prove arbitrary language does not
  become unrestricted execution.
