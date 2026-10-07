# Execution and Verification

**Status:** Architecture + Prototype · **Date:** 2026-10-07

The runtime moves through explicit states rather than having the model "do
stuff." Explicit states make failures first-class and make the UX
understandable.

---

## The execution state machine

```text
RECEIVED
   ↓
UNDERSTANDING
   ↓
RESOLVING
   ↓
PLANNING
   ↓
AWAITING_CONFIRMATION
   ↓
EXECUTING
   ↓
VERIFYING
   ↓
COMPLETED
```

Failure states are explicit, not exceptions:

```text
FAILED       the action ran and did not succeed
BLOCKED      policy refused it
AMBIGUOUS    the request could not be resolved to one meaning
CANCELLED    the user stopped it
```

`AMBIGUOUS` is a feature. *"Delete those screenshots"* should be able to say
internally:

```text
AMBIGUOUS
Reference = "those screenshots"
Candidates = 37
```

rather than blindly doing something stupid.

## Verification is part of execution

Do not have Ida assume an action succeeded because a command returned something
plausible.

```text
Plan
  ↓
Execute
  ↓
Verify
```

Examples:

| Action | Verification |
|---|---|
| Move file A → folder B | file exists in B **and** is absent from A |
| Open an app | a process/window exists |
| Reveal a file | the `file://` target exists before touching the bus |
| Reboot | none is possible; report that the request was dispatched |

Verification must also be **honest about its edge.** A Wayland client cannot
confirm that a window was mapped or an app was focused. The system reports
"launched", not "focused". Over-claiming success is worse than reporting the
truthful limit.

**Status: Prototype.** Capability-specific verification is implemented where
practical (existence checks before side effects, clean failures from the
adapter). Post-effect confirmation that needs compositor hooks is **Planned**.

## Structured execution results

Execution returns a structured result, not a string:

```text
ExecutionResult
 ├── status     Success | Failed | Blocked | Cancelled | Unknown
 ├── entities   the objects the action touched or produced
 ├── output     human-readable detail
 ├── error      cause, if any
 └── metadata
```

`Success` means *the OS handler accepted the action*, launched, opened,
switched, told. It does not mean the intended end state was observed. Keeping
that distinction explicit is what prevents "LLM vibes determine whether it
worked."

## Why this matters before the agent tiers

Establishing the state machine and verification **now** is what makes Ida Max
possible later. An agent that cannot tell whether its own actions succeeded is
not an agent; it is a source of confident mistakes.

## Status

**Prototype.** `ExecutionResult` and the states exist in Core; the bounded
planner executes 1–5 validated steps sequentially and stops at the first
refusal, denial or failure. No observation between steps, no replanning; that
loop is Max's.
