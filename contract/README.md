# The contract

**Status:** Implemented (contract) · **Date:** 2026-10-07

The language-neutral definition of the platform's interfaces. This is the one
piece of code the `essential-os` repository owns, and it exists so that the
capability model is defined **once**, independently of any implementation.

---

## Why it exists

Ida's implementation is in Rust ([`luishowin/ida`](https://github.com/luishowin/ida)).
This repository must not duplicate that implementation, but the *contract* (what
an Intent, a Capability and an ExecutionResult are) belongs to the platform,
not to one language.

So the contract lives here, as JSON Schema plus conformance fixtures, and any
implementation is expected to satisfy it with its own tests.

## Contents

```text
contract/
├── schemas/
│   ├── intent.schema.json            what the user wants (inert data)
│   ├── capability.schema.json        an operation the system will perform
│   └── execution-result.schema.json  the structured outcome
├── fixtures/
│   ├── capabilities.json             the canonical registry subset
│   ├── intents.json                  positive resolutions
│   └── security.json                 negative / refusal cases
├── test.mjs                          zero-dependency validator
└── README.md
```

## Run the validator

```sh
node --test contract/test.mjs
```

No dependencies, no build step. It checks that the schemas are well formed, that
every capability satisfies the capability schema, that every positive fixture
resolves to a real capability and satisfies the intent schema, and that every
security fixture is refused. It also asserts that `shell.run` can never be
auto-approved and that no unrestricted `run_shell` capability exists.

## The three shapes

### Intent: inert

```json
{ "action": "app.launch", "args": { "app_id": "firefox.desktop" },
  "source": "user", "confidence": 1 }
```

An intent grants no authority and performs no action. It becomes actionable only
after registry validation and a permission decision.

### Capability: the contract

```json
{ "id": "app.launch", "description": "Open an installed application.",
  "input": { "app_id": "string" }, "permission": "low_risk",
  "confirmation": "never", "executor": "os" }
```

Permission (`read` … `privileged`) and confirmation (`never` … `always`) are
**separate axes**. `executor` names where the side effect happens, and only the
runtime chooses it.

### ExecutionResult: the truth

```json
{ "status": "success",
  "entities": [{ "id": "app:firefox", "type": "application", "name": "Firefox" }],
  "output": "Opened Firefox." }
```

`success` means the executor accepted and performed the action, **not** that
the intended end state was observed. See
[`../docs/ida/execution-and-verification.md`](../docs/ida/execution-and-verification.md).

## Source values

| Contract value | Meaning |
|---|---|
| `automatic` | produced as the user types, or a model's own unpicked proposal |
| `user` | the user pressed Enter or clicked |
| `model` | a model proposal that has not been picked |
| `voice` | a speech transcript |

A `voice` or `model` origin is never approved outright below full autonomy. This
is the contract's expression of *"the intelligence proposes; the runtime
decides."*

## How an implementation consumes it

The implementation keeps its own registry and tests, and adds a test that loads
these fixtures and asserts its resolver produces the expected resolutions and
refusals. That keeps exactly one contract and one implementation, with no drift.
