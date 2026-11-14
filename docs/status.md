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
| Application mockups | 23 |
| Desktop shell studies | 1 current, 2 iterations |
| Hardware and UI studies | 2 |
| Kept iterations | 11 |
| Claude skills | 1 |

## Application mockups

| Prototype | What it demonstrates | Status | Date | File |
|---|---|---|---|---|
| **Beam** | File transfer between nearby devices, send and receive queue | Prototype | 2026-11-13 | [`apps/beam/`](../prototypes/apps/beam/) |
| **Calculator** | Quiet utility, keyboard-first entry, compact window | Prototype | 2026-11-08 | [`apps/calculator/`](../prototypes/apps/calculator/) |
| **Calendar** | Month and day views, event sheets, restrained toolbar | Prototype | 2026-11-07 | [`apps/calendar/`](../prototypes/apps/calendar/) |
| **Camera** | Photo and video capture, gallery, ring light and exposure controls | Prototype | 2026-11-13 | [`apps/camera/`](../prototypes/apps/camera/) |
| **Clock** | World clock, timers, desktop-widget treatment | Prototype | 2026-11-07 | [`apps/clock/`](../prototypes/apps/clock/) |
| **Color Picker** | Palette, sliders, live preview | Prototype | 2026-11-09 | [`apps/color-picker/`](../prototypes/apps/color-picker/) |
| **Docs** | Document editor, menu bar, bottom command pill | Prototype | 2026-11-02 | [`apps/docs/`](../prototypes/apps/docs/) |
| **Files** | Browser, sidebar, list and grid views | Prototype | 2026-11-07 | [`apps/files/`](../prototypes/apps/files/) |
| **Fonts** | Type specimen browsing and font management | Prototype | 2026-11-07 | [`apps/fonts/`](../prototypes/apps/fonts/) |
| **Glyphs** | Character and glyph inspection | Prototype | 2026-11-07 | [`apps/glyphs/`](../prototypes/apps/glyphs/) |
| **Health** | Pulse: today, training, trends and profile views | Prototype | 2026-11-13 | [`apps/health/`](../prototypes/apps/health/) |
| **Help** | In-system help, status legend and a catalogue of the mockups | Prototype | 2026-11-13 | [`apps/help/`](../prototypes/apps/help/) |
| **IDE** | Code editor shell for the platform | Prototype | 2026-11-08 | [`apps/ide/`](../prototypes/apps/ide/) |
| **Maps** | Meridian: map browsing, layers, places and live coordinates. Basemap tiles load from CARTO over the network | Prototype | 2026-11-13 | [`apps/maps/`](../prototypes/apps/maps/) |
| **Notes** | Writing surface with note list, formatting bar and zoom | Prototype | 2026-11-13 | [`apps/notes/`](../prototypes/apps/notes/) |
| **Photos** | Library, albums, full-window viewer | Prototype | 2026-11-08 | [`apps/photos/`](../prototypes/apps/photos/) |
| **Settings** | Settings navigation and panels | Prototype | 2026-11-08 | [`apps/settings/`](../prototypes/apps/settings/) |
| **Sheets** | Spreadsheet grid, formula bar, sheets | Prototype | 2026-11-02 | [`apps/sheets/`](../prototypes/apps/sheets/) |
| **Software** | Application store and update surface | Prototype | 2026-11-08 | [`apps/software/`](../prototypes/apps/software/) |
| **Sound Recorder** | Single-file recording, live level and a recordings list | Prototype | 2026-11-13 | [`apps/sound-recorder/`](../prototypes/apps/sound-recorder/) |
| **Task Manager** | Processes, resource graphs, per-app detail | Prototype | 2026-11-08 | [`apps/task-manager/`](../prototypes/apps/task-manager/) |
| **TV** | Essential TV: library, live channels and a channel studio | Prototype | 2026-11-13 | [`apps/tv/`](../prototypes/apps/tv/) |
| **Weather** | Current conditions, hourly and daily forecast | Prototype | 2026-11-13 | [`apps/weather/`](../prototypes/apps/weather/) |

## Desktop and hardware studies

| Prototype | What it demonstrates | Status | Date | File |
|---|---|---|---|---|
| **Desktop shell** | Window chrome, taskbar, presets, drag, resize, maximize and full screen | Prototype | 2026-11-03 | [`desktop/`](../prototypes/desktop/) |
| **Keyboard** | SLATE laptop keyboard layout study | Prototype | 2026-11-02 | [`hardware/keyboard/`](../prototypes/hardware/keyboard/) |
| **Battery glyphs** | Battery states in context, from empty to charging | Prototype | 2026-11-13 | [`hardware/battery-glyphs/`](../prototypes/hardware/battery-glyphs/) |

## Iteration history

| Prototype | Iterations kept |
|---|---|
| Clock | 1st, 2nd, 3rd |
| Desktop shell | 1st, 2nd |
| Maps | 1st |
| Notes | 1st, 2nd |
| Photos | 1st |
| Sheets | 1st |
| Software | Earlier build |

## Tooling

| Item | What it is | Status | File |
|---|---|---|---|
| **Essential OS app skill for Claude** | A Claude plugin that encodes the app pattern: single-file output, shared tokens, container-based responsiveness, menu engine and a test checklist | Tooling | [`skills/essential-os-app/`](../skills/essential-os-app/) |

## What this proves

- A consistent visual language can be carried across twenty-three different
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
