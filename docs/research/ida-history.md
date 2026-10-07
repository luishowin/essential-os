# Ida — history

**Status:** Record · **Date:** 2026-10-07

The real, dated history of Ida, reconstructed from the project's own decision
log. This is the record the design brief asked for, corrected against what
actually happened.

> The implementation's own dated log is the authority:
> [`luishowin/ida`](https://github.com/luishowin/ida) `docs/DECISIONS.md`.

---

## The intended progression

```text
Ida 0.0.x     search / calculator / quick links / apps / terminal / weather /
              system actions
Ida 0.0.45    significant UI/UX milestone
Ida 0.0.5     intended non-AI stabilisation milestone
Ida 0.0.6     intended beginning of Ida Core architecture
Ida Core/Go   small local assistant
Ida Pro       stronger reasoning
Ida Max       deeper reasoning, memory, automation and agent behaviour
```

**These version concepts may change.** They did. The project favours reality
over preserving old plans.

## What actually happened

| Date | Milestone | What it was |
|---|---|---|
| 2026-09-16 | **Ida starts** | Stack decided: Rust + GTK4 + libadwaita. Super+Space. App ID `io.github.luishowin.Ida`. Spikes A and B: the panel is a fixed frame with the cairo renderer; file search via a hand-written TinySPARQL binding. |
| 2026-09-16/17 | **Step 4–9, v0.0.1** | The core providers, the OS adapter, the headless CLI, the panel, the RPM, and Luis's by-hand pass. *Find. Launch. Ask.* Tagged `v0.0.1`. |
| 2026-09-17/18 | **v0.0.2** | The onyx pill and results card, the orb, Ida's first-person error voice, redacted journal records. A GNOME Shell blur extension was built and **never drew**; removed in 0.0.3. |
| 2026-09-17/18 | **v0.0.3** | Answers. AI mode (off by default), the answer card, weather, HTTP through libcurl, memory budgeted as PSS, and a provider that answers (Fireworks). The provider was changed twice after plan refusals. |
| 2026-09-18 | **v0.0.4 starts** | Voice. whisper.cpp built from source into a helper process; the microphone becomes a door; a spoken intent is never approved outright. |
| 2026-09-28/29 | **v0.0.45 / v0.0.46** | The real UI/UX milestones: joined frame, black fills, the AI mark, follow-up pills, inline thinking orb, `/help`, click-to-copy, a new logo. |
| 2026-09-29 | **0.0.6 foundation** | The real architectural milestone, implemented across slices A–F: Request, Entity, Context, ExecutionResult, the `ModelProvider` trait, the extended capability registry with retrieval, the replaced permission table, the local Ollama action model, ephemeral context with pronoun resolution, the bounded planner, and capability-specific verification. |
| 2026-09-29/30 | **Voice and KDE** | Voice wired to the CLI and the panel; local inference serves voice first; Spike KDE (Phase 0) begins the port to Plasma 6.7.5. |
| 2026-09-30 | **Stop** | The 0.0.6 work is complete as specified and **deliberately unreleased**, pending a by-hand pass. |

## Where it stands

- **Released:** `v0.0.1`, `v0.0.2`, `v0.0.3`.
- **In progress:** branch `0.0.4`, workspace version `0.0.46`, with the whole
  `0.0.6` foundation implemented and uncommitted.
- **Open register items:** two (the model hook's first caller, and the listen
  key/mic pill).

## What diverged from the plan, and why it was recorded

- **"Non-AI stabilisation" did not happen.** Answers arrived in `0.0.3`, before
  the planned `0.0.5` stabilisation, because the UI and provider work was ready
  first.
- **"Ida Core / Go" did not happen.** The existing Rust workspace *is* Ida Core.
  Rewriting it in Go would have thrown away working, tested code.
- **The provider changed twice.** A cloud provider's plan refused every model
  (`403 MODEL_NOT_IN_PLAN`), which is recorded as a reason the architecture must
  stay provider-agnostic.
- **A blur feature was built and abandoned** rather than fixed, because it never
  drew on the target shell.
- **The desktop base changed** from GNOME to Plasma, which is now an open
  question for Essential OS.

## The lesson the history encodes

The architecture survived every one of those changes because the **stable layer
is Ida's own capability and policy system**, not any particular model, provider,
or shell. Models can come and go. The interesting part is underneath them.
