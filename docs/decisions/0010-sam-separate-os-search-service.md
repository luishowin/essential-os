# 0010 — Sam is a separate OS search service, not an Ida tier

**Status:** Accepted
**Date:** 2026-11-03

## Context

Ida began as a launcher and search surface and grew into a proposed personal
assistant with Tier 0 (deterministic commands), Tier 1 (a small action model)
and Tier 2 (advanced intelligence). Because search was Ida's first job, earlier
material treated operating-system search, command interpretation and personal
assistance as one architecture.

That conflates two different products. Search over the local computer needs
coverage, retrieval accuracy, determinism, low latency and bounded memory. It
does not need reasoning, generation, conversation or a language model. Personal
assistance needs interpretation, context, action policy, conversation and
escalation. Bundling them makes the search path heavier than necessary and makes
Ida responsible for a registry it should not own.

## Decision

Essential OS has two separate intelligent systems:

- **Sam** is the native search and retrieval service. It is deterministic and
  non-generative, knows only the computer and its permitted local information,
  keeps no conversational memory, and returns structured results or a typed
  handoff. It owns the search registry, local retrieval, ranking, response
  templates and operational cache.
- **Ida** is the personal assistant. It keeps Tier 0, Tier 1 and Tier 2, its
  privacy gate, its policy-enforcing executor and Hermes for multi-step work. It
  owns the action registry, conversation and escalation.

The rules:

1. Sam is not a tier of Ida, an Ida backend, or a renamed Ida subsystem.
2. Ida may call Sam through a typed local interface for local information.
3. Sam never calls Ida, Hermes or any model, and never chooses or invokes a web
   search, local model or cloud model.
4. The calling layer owns escalation. Sam returns `out_of_domain`,
   `no_confident_match`, `unsupported_operation` or `source_unavailable`.
5. Ida's executor remains the single policy choke point for state-changing
   actions. Sam proposes constrained result actions at most.
6. The two systems keep separate registries. They may share read-only OS data
   services where that avoids duplicate indexes.
7. Essential OS must work without either system, and each must work without the
   other.
8. Sam and Ida have independent evaluation criteria and roadmaps.

This decision is documentation-level. No implementation moved: Sam has no code
yet, and no Ida functionality was removed. Ida's current action-level file
lookup remains valid for command workflows.

## Reasoning

- **Different runtime requirements.** Sam can meet a sub-10 ms lexical path and a
  4 GB memory target only by excluding model inference and conversation state.
- **Different trust boundaries.** Sam is read-only with no network egress. Ida
  has an executor and a Tier 2 gateway with network access. Keeping them separate
  keeps the security story simple.
- **Different evaluation.** Sam is judged on retrieval accuracy, out-of-domain
  handling and confident-wrong dispatches. Ida is judged on intent accuracy,
  action safety, escalation quality and privacy compliance.
- **Honest product framing.** A deterministic search engine that feels fast and
  broad is a credible product. Calling it an assistant would invite expectations
  it cannot meet.
- **Build-time intelligence, runtime simplicity.** A dense registry can be
  authored with a capable model during development without shipping that model.

## Alternatives

- **Keep search inside Ida as Tier 0/1.** Rejected: it makes the search path
  depend on Ida's process, policy and release cycle, and blocks standalone OS
  search.
- **Make Sam a fourth Ida tier.** Rejected: Sam has no model, no reasoning and no
  conversation, so it does not belong on the tier axis. It is a peer service.
- **One shared registry for search and actions.** Rejected: search intents and
  action intents have different permissions, schemas, evaluation and ownership.
  Shared indexes are allowed; shared registries are not.
- **Use an LLM for search with a deterministic fallback.** Rejected: it violates
  the latency, memory, privacy and determinism goals, and it makes behaviour
  non-reproducible.

## Consequences

- Essential OS documentation must describe Sam and Ida separately and link both.
- Ida documentation must not claim ownership of the OS search architecture.
- Sam needs its own repository, registry format, evaluation set and roadmap.
- A typed interface must be designed before integration work begins.
- Shared catalogues need one owner, one versioned interface and one invalidation
  mechanism.
- Sam's licensing, IPC mechanism and default-enabled domains remain open.
- Existing Ida behaviour is unchanged; only the described boundary moved.
