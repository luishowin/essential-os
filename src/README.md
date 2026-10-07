# src

**Status:** Explanation · **Date:** 2026-10-07

## There is no implementation here, on purpose.

The design brief for this repository asked for a minimal Ida scaffold — stubs
and interfaces for Input, Intent Engine, Context Engine, Capability Registry,
Planner, Permission Engine, Action Runtime, Verification, Response Engine and
Model Router.

**That scaffold already exists, and it is not a scaffold.** Ida is a mature Rust
workspace that implements those boundaries with real types, a strict trust path
and tests. Re-implementing them here would duplicate working code and drift from
it immediately.

So this repository owns the **contract**, not the implementation:

```text
src/        →  this explanation
contract/   →  the language-neutral interface definitions + conformance tests
```

## Where the implementation lives

| Boundary | Real module (Rust) |
|---|---|
| Input | `ida-core/src/request.rs`, the panel/CLI entry points |
| Intent Engine | `ida-core/src/{engine,grammar,intent}.rs` |
| Context Engine | `ida-core/src/context.rs`, `entity.rs` |
| Capability Registry | `ida-core/src/action.rs` |
| Planner | `ida-core/src/planner.rs` |
| Permission Engine | `ida-core/src/policy.rs` |
| Action Runtime | `ida-linux/src/executor.rs` |
| Verification | capability-specific, at the executor boundary |
| Response Engine | `ida/src/panel.rs`, `ida-core/src/answer.rs` |
| Model Router | `ida-core/src/provider.rs`, `ida-linux/src/ollama.rs`, `answers.rs` |

Repository: <https://github.com/luishowin/ida>

## The rule

> One owner for every fact.

The interface **contract** is owned here. The **implementation** and its
detailed specification are owned by the Ida repository. This repository explains
and links; it does not copy.
