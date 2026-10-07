# Ida — roadmap

**Status:** Planned + Implemented · **Date:** 2026-10-07

Ida is a family of tiers of one executable, unlocked by module rather than
shipped as three products. The underlying architecture stays the same; the
model changes. The operating-system capability layer does not become a mess when
a larger model arrives.

---

## The tiers

| Tier | Motto | Does | Autonomy |
|---|---|---|---|
| **Core** | *Find. Launch. Ask.* | Apps, files, projects, settings, calculations, conversions, quick system commands. | None: it acts only on what the user picks. |
| **Pro** | *Understand. Act. Automate.* | Memory, context, app integrations, MCP, multi-step actions. | Acts after approval. |
| **Max** | *Plan. Execute. Delegate.* | Goals, planning, agents, verification. | Acts on objectives. |

The intended progression of the *interaction*, not just the tier:

```text
Today (Core)          Next (Pro)                Eventually (Max)
─────────────         ──────────────────        ────────────────────
User                  User                      User
 ↓                     ↓                         ↓
keyword / search      natural language          objective
 ↓                     ↓                         ↓
action                intent                    planner
                       ↓                         ↓
                      context resolution        context
                       ↓                         ↓
                      plan                      capabilities
                       ↓                         ↓
                      actions                   agent execution
                       ↓                         ↓
                      verification              verification
                                                 ↓
                                               objective completed
```

The middle column is the useful target for the next milestone: *"I can say what
I want in normal language, Ida figures out which capability I mean, resolves
references from context, asks for confirmation when necessary, executes the
action, and tells me what happened."*

## The 2026–2030 trajectory

```text
2026   Foundation
       Ida architecture, capability system, local AI research,
       Essential OS research, this record

2027–28  Agent
       natural language, real-time intent, voice, context,
       memory, real system control

2028–29  Computing fabric
       model routing, personal servers, distributed workloads

2030   SLATE
       hardware + Essential OS + Ida
```

**This is an intended trajectory, not a promise.** The project favours reality
over preserving old plans; when a plan changes, the change is recorded.

## Version concepts

The version concepts below describe the *intended* progression. They may change.

```text
Ida 0.0.x
  search / calculator / quick links / apps / terminal / weather /
  system actions

Ida 0.0.45
  significant UI/UX milestone

Ida 0.0.5
  intended non-AI stabilisation milestone

Ida 0.0.6
  intended beginning of the Ida Core architecture

Ida Core / Go
  small local assistant

Ida Pro
  stronger reasoning

Ida Max
  deeper reasoning, memory, automation and agent behaviour
```

### What actually happened

The concepts above were the plan. Reality diverged, and the divergence is
recorded rather than hidden. See
[`../research/ida-history.md`](../research/ida-history.md) for the dated record.
In summary:

- **`0.0.1`–`0.0.3` shipped**, adding the panel, answers and a cloud provider
  (Fireworks) earlier than the "non-AI stabilisation" plan suggested.
- **`0.0.45`/`0.0.46`** became the real UI/UX and behaviour milestones.
- **`0.0.6`** became the real architectural milestone: the capability registry,
  ephemeral context, the bounded planner, a local action model and verification
  — all implemented, and deliberately **unreleased** until a by-hand pass
  proves it.
- The "Ida Core / **Go**" idea did not survive contact with the existing Rust
  codebase; the Rust workspace *is* Ida Core.
- **Pro** and **Max** remain concepts.

## Roadmap discipline

Each significant step is: explain the problem, document the solution, identify
risks, implement, test, document what actually happened, update the status.
Nothing is claimed as done until it has been tested on the machine it was built
for.
