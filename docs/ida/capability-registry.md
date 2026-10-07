# The Capability Registry

**Status:** Architecture + Implemented · **Date:** 2026-10-07

The capability registry is the most important piece of code in Ida. It is the
bridge between natural language and the operating system, and it is what stops
the intelligence from needing arbitrary power.

---

## The idea

Instead of teaching a model every possible system command, Ida knows **what
capabilities exist**. A capability describes an operation the system is willing
to perform, with a contract the runtime can validate.

```text
Capability
 ├── id
 ├── description
 ├── input schema
 ├── output schema
 ├── permission
 ├── confirmation policy
 ├── context requirements
 └── executor
```

The model sees capabilities, not implementation details. That is much easier to
validate, test and secure than handing a model a terminal.

## Example

```json
{
  "id": "app.launch",
  "description": "Open an installed application.",
  "input": { "app_id": "string" },
  "permission": "low_risk",
  "confirmation": "never",
  "executor": "os"
}
```

```json
{
  "id": "search.files",
  "description": "Search files accessible to the user.",
  "input": { "query": "string", "location": "string?" },
  "permission": "read",
  "confirmation": "never",
  "executor": "os"
}
```

```json
{
  "id": "session.restart",
  "description": "Restart the computer.",
  "input": {},
  "permission": "low_risk",
  "confirmation": "never",
  "executor": "os"
}
```

The machine-readable form of this contract lives in
[`contract/schemas/capability.schema.json`](../../contract/schemas/capability.schema.json),
with conformance fixtures in [`contract/fixtures/`](../../contract/fixtures/).

## What the registry does at runtime

```text
model output / typed text
        ↓
structured Intent { action, args, source, confidence }
        ↓
Registry::validate   ← schema + argument types; unknown ids rejected
        ↓
Validated (private fields; cannot be forged)
        ↓
policy::decide(level, origin, permission, confirmation, ambiguous)
        ↓
Approved | Pending | Denied
        ↓
executor (the only code that touches the OS)
```

Validation and permission are separate. Validation answers *"is this a
well-formed request for a capability that exists?"* Permission answers *"is this
allowed, for this user, from this origin, right now?"*

## The registry is also retrieval

A model should never be handed the whole catalogue of capabilities: that
inflates the prompt and invites hallucinated ids. Instead the registry exposes a
deterministic pre-filter over the capabilities relevant to a request (a small
set, not the whole list). The model selects from that set; unknown or invented
ids fail validation and are dropped.

**Measured honestly:** the small local action model used in Core holds JSON
shape and exact ids it has seen, but does **not** map paraphrase to capability
ids reliably. Validation absorbs that, and a wrong proposal never runs. This is
recorded so future model work starts with eyes open.

## Naming note

The design brief used names such as `apps.open` and `system.reboot`. The real
registry uses `app.launch` and `session.restart`. The contract fixtures follow
the real registry and record the divergence; whether to add an explicit
`system.disk_usage` capability (rather than letting it fall to the terminal) is
an **open question**. See
[`research/README.md`](../research/README.md#open-questions).

## MCP

**MCP is not the fundamental architecture.** Ida's own capability model is the
primary abstraction. MCP may eventually be an interoperability layer through
which external tools are *projected* into the registry, but the registry remains
ours and remains the thing that decides.

## Status

**Implemented.** In the real Ida the capability type is `ActionSpec` and the
registry validates into an unforgeable `Validated` value. The registry is
extended in place; there is no parallel capability layer.
