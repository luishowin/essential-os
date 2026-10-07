# 0007 — Ephemeral context before persistent memory

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

"Memory" is often the first thing an assistant project builds, usually as a
vector database of everything the user has ever said. It is also the least
useful thing to build first, and the hardest to keep honest.

There are two different problems hiding under the word:

- **ephemeral context** — what is happening right now (current app, selection,
  recent results, the previous turn);
- **persistent memory** — long-lived preferences and facts.

## Decision

Build ephemeral context first. It is memory-only, bounded, never written to
disk, never logged, and it dies with the conversation. Persistent memory is
deferred until ephemeral context and entity resolution are genuinely useful.

## Reasoning

- Resolving *"it"* to an entity is what makes multi-step work possible, and it
  needs no profile, no embeddings and no disk.
- Ephemeral context is vastly more useful, sooner, than a bot remembering a
  colour preference.
- Deferring persistent memory makes it better-informed later: it will know what
  context resolution actually needed.
- Context is sensitive. Keeping it memory-only is a strong, simple privacy
  guarantee.

## Alternatives

- **Build a memory database now.** Rejected: premature, and it would guess at a
  schema before the entity model is settled.
- **Store context on disk for continuity.** Rejected: the privacy cost is not
  worth the convenience for the current stage.

## Consequences

- Context is a small memory-only structure with bounded recents and a capped,
  redacted clipboard hint.
- Context is cleared with the conversation, not on hide (clearing on hide would
  wipe it right after every launch).
- Embeddings and persistent memory are **Planned**, not built.
- The interface contract includes context and entities but not a memory store.
