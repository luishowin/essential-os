# 0004 — The capability registry is the primary abstraction

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

An agent can be built in two broad ways. Either it is given a set of low-level
tools (often a shell) and trusted to compose them, or it is given a registry of
explicit, typed operations the system is willing to perform.

The first is flexible and dangerous. The second is constrained and safe, and it
is what lets a small model be useful without giving it power.

## Decision

Ida's **capability registry** is the primary abstraction. Every operation the
system can perform is a capability with:

```text
id · description · input schema · output schema · permission ·
confirmation policy · context requirements · executor
```

Models select capabilities; they never see implementation details. A model's
output becomes an `Intent` only through registry validation, and unknown or
invented ids are rejected.

## Reasoning

- The registry is the bridge between natural language and the OS, and the place
  where validation lives.
- It makes the system testable: every capability has a contract.
- It keeps the model replaceable: a bigger model does not change the capability
  layer.
- It bounds what a model can do, which is what makes handing an OS to a small
  model acceptable.

## Alternatives

- **Expose a shell as the generic tool.** Rejected (see
  [0005](0005-no-unrestricted-shell.md)).
- **Adopt MCP as the fundamental architecture.** Rejected: MCP is a transport
  and interface ecosystem, not a capability model. Ida's registry is its own;
  MCP may later *project* external tools into it.
- **A parallel capability layer alongside existing code.** Rejected: extend the
  existing registry in place so there is one source of truth.

## Consequences

- The registry is also a retrieval surface: a request receives a small relevant
  subset of capabilities, never the whole catalogue.
- The interface contract (schemas + fixtures) is owned by this repository so the
  capability model is defined once.
- Adding a capability is a deliberate act with a contract and a permission, not
  an incidental one.
