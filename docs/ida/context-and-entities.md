# Context and Entities

**Status:** Architecture + Prototype · **Date:** 2026-10-07

Context is the part that will eventually make Ida feel fundamentally different
from a chatbot. A chatbot has a conversation. Ida has a situation: what is on
screen, what was just picked, what *"it"* refers to.

---

## Entities

Instead of passing arbitrary strings around, Ida represents useful objects as
structured **entities**:

```text
Entity
 ├── id
 ├── type
 ├── name
 ├── source
 ├── metadata
 └── capabilities
```

```text
id:   file:9f83…
type: document
name: invoice-june.pdf
source: filesystem

id:   app:firefox
type: application
name: Firefox

id:   window:abc123
type: window
application: Ptyxis
```

Now actions accept entities, not strings:

```text
open(file:9f83)
move(file:9f83, folder:photodesk)
attach(file:9f83, message:…)
```

This is far more robust than passing `"~/Downloads/foo.pdf"` through the system.
Existing dedupe keys (`app:<id>`, `uri:<uri>`) become entity ids, so an entity
is a stable identity rather than a formatted string.

## References

Short-lived conversation context lets pronouns resolve without repeating work:

```text
USER  Find the latest PhotoDesk screenshot.
IDA   Found screenshot_12.png.
USER  Open it.
```

The second request does not need another search. Ida has:

```text
"it" → screenshot_12.png
```

The resolver turns references (*it, that, the PDF, the one I just opened, that
folder, my latest screenshot, John*) into concrete entity ids. In Core this is
deliberately narrow: *"open that/it/this"* and *"show it"* only. Phrases naming
actions Core does not have (window management, file moves) stay honest misses
rather than guesses.

## Ephemeral context

The current interaction's context is a small, memory-only structure:

```json
{
  "active_application": "Ptyxis",
  "active_window": "Ptyxis",
  "selected_file": null,
  "clipboard": "…",
  "current_directory": "/home/luishowin/Projects",
  "recent_entities": [],
  "recent_actions": [],
  "current_time": "2026-10-07T13:29:00+03:00"
}
```

Rules that matter:

- **Memory only.** Never written to disk, never logged. Its debug rendering
  names types and counts, never content.
- **Bounded.** A small cap on recent entities and actions, and a capped,
  redacted clipboard hint.
- **Cleared with the conversation**, not on hide; clearing on hide would wipe
  context immediately after every launch.
- **Honest about absence.** Active app/window and current directory may be
  `None` when the platform cannot tell us. Inventing them would be worse than
  missing them.

## Structured results, not paragraphs

Capabilities return structured results so the next stage can operate on them:

```json
{
  "success": true,
  "entities": [
    { "id": "file:a81", "type": "file", "name": "PhotoDesk-v0.0.2.png",
      "path": "/home/luis/Pictures/…" }
  ]
}
```

The chain is then `tool → structured result → planner → next tool`, rather than
`tool → paragraph → model tries to understand paragraph`. That is the difference
between a robust system and a fragile one.

## Status

**Prototype.** Entities, ephemeral context and pronoun resolution are
implemented in Core, memory-only. Semantic indexing and on-screen entity
awareness (associating visible UI with underlying entities) are **Planned**.
See also [memory.md](memory.md).
