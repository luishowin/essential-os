# Build tracker

**Status:** Living record · **Date:** 2026-11-09

A visual and tabular record of what has actually been built so far. Everything
listed here is a **single-file HTML mockup**: it runs in a browser, it looks and
behaves like the intended product, and it is not shipped software.

Published version: <https://luishowin.github.io/essential-os/#010-built>

## Status legend

| Label | Meaning |
|---|---|
| **Prototype** | A working interface study. Interaction is real in the browser; data and system integration are mocked. |
| **Iteration** | An earlier direction kept for comparison. Not the current recommendation. |
| **Tooling** | Supporting material that helps produce or review the work. |

## Summary

| Area | Count |
|---|---|
| Application mockups | 15 |
| Desktop shell studies | 1 current, 2 iterations |
| Hardware studies | 1 |
| Kept iterations | 9 |
| Claude skills | 1 |

## Application mockups

| Prototype | What it demonstrates | Status | Date | File |
|---|---|---|---|---|
| **Calculator** | Quiet utility, keyboard-first entry, compact window | Prototype | 2026-11-08 | [`apps/calculator/`](../prototypes/apps/calculator/) |
| **Calendar** | Month and day views, event sheets, restrained toolbar | Prototype | 2026-11-07 | [`apps/calendar/`](../prototypes/apps/calendar/) |
| **Clock** | World clock, timers, desktop-widget treatment | Prototype | 2026-11-07 | [`apps/clock/`](../prototypes/apps/clock/) |
| **Color Picker** | Palette, sliders, live preview | Prototype | 2026-11-09 | [`apps/color-picker/`](../prototypes/apps/color-picker/) |
| **Docs** | Document editor, menu bar, bottom command pill | Prototype | 2026-11-02 | [`apps/docs/`](../prototypes/apps/docs/) |
| **Files** | Browser, sidebar, list and grid views | Prototype | 2026-11-07 | [`apps/files/`](../prototypes/apps/files/) |
| **Fonts** | Type specimen browsing and font management | Prototype | 2026-11-07 | [`apps/fonts/`](../prototypes/apps/fonts/) |
| **Glyphs** | Character and glyph inspection | Prototype | 2026-11-07 | [`apps/glyphs/`](../prototypes/apps/glyphs/) |
| **IDE** | Code editor shell for the platform | Prototype | 2026-11-08 | [`apps/ide/`](../prototypes/apps/ide/) |
| **Notes** | The Quiet Editor writing surface | Prototype | 2026-11-02 | [`apps/notes/`](../prototypes/apps/notes/) |
| **Photos** | Library, albums, full-window viewer | Prototype | 2026-11-08 | [`apps/photos/`](../prototypes/apps/photos/) |
| **Settings** | Settings navigation and panels | Prototype | 2026-11-08 | [`apps/settings/`](../prototypes/apps/settings/) |
| **Sheets** | Spreadsheet grid, formula bar, sheets | Prototype | 2026-11-02 | [`apps/sheets/`](../prototypes/apps/sheets/) |
| **Software** | Application store and update surface | Prototype | 2026-11-08 | [`apps/software/`](../prototypes/apps/software/) |
| **Task Manager** | Processes, resource graphs, per-app detail | Prototype | 2026-11-08 | [`apps/task-manager/`](../prototypes/apps/task-manager/) |

## Desktop and hardware studies

| Prototype | What it demonstrates | Status | Date | File |
|---|---|---|---|---|
| **Desktop shell** | Window chrome, taskbar, presets, drag, resize, maximize and full screen | Prototype | 2026-11-03 | [`desktop/`](../prototypes/desktop/) |
| **Keyboard** | SLATE laptop keyboard layout study | Prototype | 2026-11-02 | [`hardware/keyboard/`](../prototypes/hardware/keyboard/) |

## Iteration history

| Prototype | Iterations kept |
|---|---|
| Clock | 1st, 2nd, 3rd |
| Desktop shell | 1st, 2nd |
| Notes | 1st |
| Photos | 1st |
| Sheets | 1st |
| Software | Earlier build |

## Tooling

| Item | What it is | Status | File |
|---|---|---|---|
| **Essential OS app skill for Claude** | A Claude plugin that encodes the app pattern: single-file output, shared tokens, container-based responsiveness, menu engine and a test checklist | Tooling | [`skills/essential-os-app/`](../skills/essential-os-app/) |

## What this proves

- A consistent visual language can be carried across fifteen different
  application types without a component framework or build step.
- The shell and app pattern works from a small window to a filled desktop.
- A written skill plus a capable model can produce repeatable results in this
  style.

## What this does not mean

- These are **not** implemented applications. Data, files, media, system
  integration and persistence beyond local storage are mocked or absent.
- The desktop shell is an HTML study, not the Fedora/Plasma assembly.
- A polished mockup does not establish accessibility, performance, security or
  packaging quality.

## Tooling note

The 2026-11 prototype sprint used **Claude Sonnet 5.5 at medium effort** with
the included **Essential OS app skill for Claude**. The results were very good
and consistent: applications shared the same tokens, window behaviour,
responsive tiers and command surfaces, and each delivery included a test pass.
That is an observation about prototype production, not a claim that model output
can be accepted without review.
