# Research and the project log

**Status:** Living record · **Date:** 2026-10-07

This directory is the lightweight project journal. It records what was learned,
what changed, and what remains uncertain — so that the project can be understood
later without reading chat history.

---

## The status legend

Every technical claim in this repository carries one of five labels. Use them
consistently.

| Label | Meaning |
|---|---|
| **Implemented** | Exists, runs, and has been tested. |
| **Prototype** | Exists and works in part; not finished or not proven. |
| **Planned** | Decided as a direction; not built. |
| **Hypothesis** | A belief that has not been tested. |
| **Open question** | Genuinely undecided; recorded so it is not forgotten. |

Do not present a **Planned** or **Hypothesis** item as **Implemented**. If a
thing is speculative, say so.

## Contents

| Document | What it holds |
|---|---|
| [project-log.md](project-log.md) | Dated entries: what happened, what was learned |
| [ida-history.md](ida-history.md) | The real, dated history of Ida |
| [prior-art.md](prior-art.md) | Systems worth learning from |

## Open questions

These are the questions the project is deliberately holding open. They are
revisited rather than quietly forgotten. Each should eventually become an ADR
with a decision, or a documented reason to stay open.

1. **Desktop base** — KDE Plasma or GNOME for Essential OS? Ida is being ported
   from GNOME to Plasma. See ADR [0009](../decisions/0009-desktop-base-open.md).
2. **`system.disk_usage` vs `shell.run`** — should common diagnostic commands
   become structured capabilities, or stay behind the controlled terminal
   capability? The design brief assumed a `system.disk_usage` capability; the
   real registry does not have one.
3. **Partial-input actualisation** — how can intents be actualised as the user
   types without ever committing a destructive action on a partial phrase? See
   [interaction-principle.md](../ida/interaction-principle.md).
4. **Local model quality** — a small local action model holds JSON shape but
   does not map paraphrase to capability ids reliably. How much interpretation
   can move local, and what stays remote?
5. **Semantic indexing of personal information** — what should be indexed, how,
   and with what privacy boundary? Not before ephemeral context works.
6. **Persistent memory** — what is worth remembering, in what form, and how is
   it kept honest and inspectable?
7. **Where computation belongs** — the policy by which Ida chooses local,
   home-server or external execution.
8. **Cross-application actions** — reliable multi-app flows on Linux, given
   compositor and sandbox constraints.
9. **MCP's place** — an interoperability layer that projects external tools into
   the capability registry, never the fundamental architecture.
10. **Maintainability** — keeping the system understandable by one person as it
    grows.
11. **SLATE feasibility** — whether the 999 g / ≤13″ / modular targets can be
    met together, and by what route.

## How to add an entry

Append to [project-log.md](project-log.md) with a date, what happened, what was
learned, and what it changes. Do not edit past entries; supersede them. When a
question above is settled, add an ADR and link it here.
