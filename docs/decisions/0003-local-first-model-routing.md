# 0003. Local-first, not local-only

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

Two extremes are common and both are wrong for this project: "everything local"
(which caps capability and ignores when a remote model is genuinely better), and
"everything goes to a vendor's servers" (which sacrifices privacy, ownership and
offline operation).

## Decision

Ida runs locally whenever the local system can handle the task appropriately,
and may pass work outward when a task requires substantially larger reasoning,
current web information, a genuinely better specialised service, or hardware the
local machine cannot reasonably provide.

The interface is provider-agnostic:

```text
understand(request, context, capabilities) → intents
```

Sensitive data preferentially remains local. When work is passed outward, only
the minimum necessary context is shared.

## Reasoning

- The real question is **"where does this computation belong?"**, not "local or
  cloud?"
- A provider-agnostic boundary means the stable layer is Ida's own architecture,
  not any model. This has already proven necessary: a provider changed twice
  because of external plan constraints, and the architecture absorbed it.
- Minimising shared context is a stronger privacy guarantee than a blanket
  "local" claim, because it holds even when work *does* go out.

## Alternatives

- **Local-only.** Rejected: caps reasoning and current information; the local
  action model is not yet reliable for paraphrase.
- **Cloud-default.** Rejected: loses privacy, offline operation and ownership.
- **Hard-code one provider.** Rejected: brittle, and against the ownership goal.

## Consequences

- A model router is a first-class component (see
  [0004](0004-capability-registry-as-primary-abstraction.md) for the capability
  side).
- The pipeline that decides *what* to send outward must be explicit:
  understand locally → extract required context → redact/transform → pass only
  what is necessary.
- The computing-fabric idea (laptop, home server, external compute) becomes the
  long-term expression of this decision.
