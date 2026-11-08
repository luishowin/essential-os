# Prototypes

**Status:** Index and hosted mockups · **Date:** 2026-11-09

Where the interface experiments live. The single-file HTML mockups in this
directory are part of the record: they are the current visual evidence for how
Essential OS applications should look, feel and respond. They are **mockups, not
shipped software**.

Each mockup is one self-contained `.html` file: CSS and JavaScript inline, no
build step, no external dependencies. Open the file directly in a browser.

The status of every prototype is tracked in
[`docs/status.md`](../docs/status.md) and on the
[project site](https://luishowin.github.io/essential-os/#010-built).

---

## Hosted mockups

| Prototype | What it explores | Where |
|---|---|---|
| **Calculator** | A quiet utility with keyboard-first entry and a compact window. | [`apps/calculator/`](apps/calculator/) |
| **Calendar** | Month and day views, event sheets and a restrained toolbar. | [`apps/calendar/`](apps/calendar/) |
| **Clock** | World clock, timers and the desktop-widget treatment. | [`apps/clock/`](apps/clock/) |
| **Color Picker** | Palette, sliders and live preview in a small window. | [`apps/color-picker/`](apps/color-picker/) |
| **Docs** | A document editor with a menu bar and a bottom command pill. | [`apps/docs/`](apps/docs/) |
| **Files** | Browser, sidebar and list/grid views. | [`apps/files/`](apps/files/) |
| **Fonts** | Type specimen browsing and font management. | [`apps/fonts/`](apps/fonts/) |
| **Glyphs** | Character and glyph inspection. | [`apps/glyphs/`](apps/glyphs/) |
| **IDE** | A code editor shell for the platform. | [`apps/ide/`](apps/ide/) |
| **Notes** | The Quiet Editor writing surface. | [`apps/notes/`](apps/notes/) |
| **Photos** | Library, albums and a full-window viewer. | [`apps/photos/`](apps/photos/) |
| **Settings** | System settings navigation and panels. | [`apps/settings/`](apps/settings/) |
| **Sheets** | A spreadsheet grid with formula bar and sheets. | [`apps/sheets/`](apps/sheets/) |
| **Software** | The application store and update surface. | [`apps/software/`](apps/software/) |
| **Task Manager** | Processes, resource graphs and per-app detail. | [`apps/task-manager/`](apps/task-manager/) |
| **Desktop shell** | Window chrome, taskbar, presets, drag and resize behaviour. | [`desktop/`](desktop/) |
| **Keyboard** | The SLATE laptop keyboard layout study. | [`hardware/keyboard/`](hardware/keyboard/) |

Iterations worth keeping are under `iterations/` inside each prototype. The
file at the prototype root is the current direction.

---

## Other prototypes

| Prototype | What it is | Where |
|---|---|---|
| **Ida** | The intelligent system layer. A Rust workspace (`ida-core`, `ida-linux`, `ida`, `ida-voice`). | [`luishowin/ida`](https://github.com/luishowin/ida) |
| **Essential Desktop** | The Fedora + KDE Plasma assembly: shell, app presentation, visual language, energy policy, interaction model. | `Labs/essential-desktop` (private working tree); the HTML shell study lives in [`desktop/`](desktop/) |
| **jev-routing-test** | An early TypeScript intent-router experiment. | `Labs/jev-routing-test` |
| **essential-watch** | A custom watch emulation; separate from this platform, but part of the same design language. | [`luishowin/essential-watch`](https://github.com/luishowin/essential-watch) |

## How this directory should be used

Add an entry when an experiment is worth remembering. Each entry should say:

- what question it was trying to answer;
- what was built, and how far it got;
- what was learned;
- where it lives now, and whether it is alive or archived.

Keep mockups as single self-contained files so they stay reviewable and
publishable. Do not turn this directory into a build system.

## Archived ideas

When an experiment is abandoned, keep its entry and mark it **Archived**, with
the reason. A record of what failed is as valuable as a record of what worked.
