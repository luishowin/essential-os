# Memory

**Status:** Architecture + Prototype · **Date:** 2026-10-07

Two very different problems are often confused under the word "memory." Ida
keeps them apart, and builds the useful one first.

---

## Two kinds

### Ephemeral context

For the current interaction and a short window around it:

- current application and window;
- current selection;
- recent results and recent actions;
- the previous turn;
- recently created objects.

This is **memory only**. It is never written anywhere, never logged, and it dies
with the conversation.

### Persistent memory

Long-lived user preferences and facts:

```text
preferred browser = Firefox
work directory    = ~/Projects
Grandma           = contact X
PhotoDesk repo    = ~/Projects/PhotoDesk
```

Persistent memory is a different problem with a different risk profile. It is
**Planned**, not built.

## The rule

> **Do not build persistent memory before ephemeral context and entity
> resolution are useful.**

Ephemeral context is vastly more useful than a bot remembering that you once
said you liked blue buttons. It is also where the architecture proves itself:
resolving *"it"* to an entity is what makes multi-step work possible, and it
needs no profile, no embeddings and no disk.

## Where embeddings might fit (later)

A lightweight semantic layer could underpin remembering preferences, locating
previous information, and understanding references without stuffing an enormous
conversation history into the model:

```text
user says something
      ↓
embedding
      ↓
retrieve relevant context
      ↓
intent / reasoning
      ↓
action
```

This is **Hypothesis / Planned**. The purpose is *not* to turn Ida into a
chatbot with a vector database stapled on. Embeddings have been explored, but no
persistent memory system is built, deliberately.

## Why the delay is a feature

Every year of delay makes the eventual memory system better-informed: it will
know what context resolution actually needed, what the entity model actually
looks like, and what a good retrieval query even is. Building it now would be
guessing.

## Status

**Prototype.** Ephemeral context, entities and bounded recents are implemented
in Core, memory-only. Persistent memory and semantic retrieval are **Planned**.
