# 0006. Intent, Plan and Action are separate concepts

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

It is tempting to treat a request as a single thing: the user wants X, so do X.
But a request has three distinct layers, and collapsing them makes multi-step
work, verification and permissions much harder later.

## Decision

Keep three concepts separate:

```text
Intent   → what does the user want?
Plan     → what steps are necessary?
Action   → what actually happens?
```

```text
Natural language → Intent → Plan → Actions
```

The model may translate and plan. It does not execute.

## Reasoning

- A single request can need several actions; conflating intent with action makes
  that impossible to express.
- Verification attaches to actions, not to intents.
- Permissions attach to actions, so separating them lets a plan be reviewed
  before anything runs.
- Multi-step is not the same as "agent". A two-step plan is not autonomy.

## Alternatives

- **Intent = action.** Simplest; blocks multi-step work and clean verification.
- **Skip planning, let the model chain actions at runtime.** Rejected: that is
  an autonomous agent, which is Max territory and needs the boundaries to exist
  first.

## Consequences

- A bounded planner exists early (1–5 validated steps, sequential, no
  replanning; the plan grants no authority, every step still passes policy).
- Data passing between steps and replanning are explicitly deferred to Max.
- The interface contract defines `Intent` separately from `Capability` and from
  `ExecutionResult`.
