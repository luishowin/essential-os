# The Interaction Principle

> ## Actualise intents as fast as you can type.

**Status:** Architecture (future requirement) · **Date:** 2026-10-07

This is Ida's defining interaction idea, and it is not yet implemented. It is
documented here because it is a core requirement that shapes the architecture,
not a nice-to-have.

---

## The paradigm shift

Most assistants work like this:

```text
Type entire command
      ↓
Press Enter
      ↓
AI thinks
      ↓
AI responds
```

Ida should work like this:

```text
enable dark mo...
      ↓
   Dark mode ON
```

```text
increase vol...
      ↓
   volume control appears / begins adjustment
```

```text
enable do not...
      ↓
   DND ON
```

```text
send a text t...
      ↓
   small composer appears, recipient resolved
```

Ida is continuously interpreting the **partial** intent. The user does not
finish the sentence and then wait; the system actualises the intent as it
becomes unambiguous.

## Progressive actualisation

Executing every interpretation the instant it appears would be reckless. The
model is progressive:

```text
keystrokes
      ↓
partial intent recognition
      ↓
candidate action
      ↓
confidence / ambiguity check
      ↓
safe speculative UI
      ↓
commit action
```

While typing *"increase vol…"*, Ida can already infer:

```text
Intent: ADJUST_VOLUME
Parameter: unknown
```

and surface the volume control. But while typing *"delete pro…"*, it must
absolutely **not** begin deleting anything merely because the partial phrase
resembles a destructive action.

## Preview aggressively. Commit conservatively.

This is the safety principle that makes the paradigm usable.

> Ida may speculate visually while the user is typing, but destructive or
> irreversible actions must not execute merely because a partial phrase
> resembles an intent.

Speculation is cheap and reversible when it is only UI. Commitment is neither.
The architecture already supports the distinction: the origin of a request
matters, and as-you-type requests are the least trusted origin.

## Why this belongs in the architecture, not the UI layer

Partial-input actualisation is not a widget. It requires:

- a deterministic intent engine fast enough to run on every keystroke;
- a capability registry that can say what is *safe* to preview;
- a permission model where origin distinguishes speculation from commitment;
- an interaction runtime that treats a partial intent as a first-class state.

That is why it is documented here, before it is built. The next milestone after
Core's stabilisation should treat it as a prototype target.

## Status

**Architecture / future prototype target.** Not implemented. The pieces it
depends on (a fast deterministic engine, the capability registry, the origin-
aware permission model) are **Implemented**, which is what makes the idea
feasible rather than aspirational.
