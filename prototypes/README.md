# Prototypes

**Status:** Index · **Date:** 2026-10-07

Where experiments live. This directory holds **notes and pointers**, not code:
the real prototypes have their own homes and histories, and copying them here
would create drift.

---

## Existing prototypes

| Prototype | What it is | Where |
|---|---|---|
| **Ida** | The intelligent system layer. A Rust workspace (`ida-core`, `ida-linux`, `ida`, `ida-voice`). | [`luishowin/ida`](https://github.com/luishowin/ida) |
| **Essential Desktop** | A Fedora + KDE Plasma assembly: shell, app presentation, visual language, energy policy, interaction model. | `Labs/essential-desktop` (private working tree) |
| **jev-routing-test** | An early TypeScript intent-router experiment. | `Labs/jev-routing-test` |
| **essential-watch** | A custom watch emulation; separate from this platform, but part of the same design language. | [`luishowin/essential-watch`](https://github.com/luishowin/essential-watch) |

## How this directory should be used

Add an entry when an experiment is worth remembering. Each entry should say:

- what question it was trying to answer;
- what was built, and how far it got;
- what was learned;
- where it lives now, and whether it is alive or archived.

Do not move working code into this repository. Link to it.

## Archived ideas

When an experiment is abandoned, keep its entry and mark it **Archived**, with
the reason. A record of what failed is as valuable as a record of what worked.
