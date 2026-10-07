# Essential OS — architecture

**Status:** Vision + research · **Date:** 2026-10-07

The system is best understood as five interacting layers, from the kernel to
the way a person interacts with the machine.

---

## The five layers

### 1. Foundation

Kernel, firmware, drivers, init, filesystem, power management. Chosen, not
written. The goal is hardware compatibility that is boring and predictable —
especially for the eventual SLATE hardware.

### 2. System services

Networking, audio, graphics, display server, security, packaging and updates.
Again chosen from proven components, then configured and constrained to behave
as one system rather than a collection of unrelated daemons.

### 3. Desktop infrastructure

The shell, window management, session management, settings, notifications and
the app-presentation model. This is where assembly starts to become design:
which apps exist, what they are called, how they are themed, and how they feel
like one environment.

### 4. Experience

The visual language, typography, motion, keyboard model and the app family. This
is the layer the user actually lives in, and it is where most of the project's
own design work belongs.

### 5. Intelligence

Ida `<∫>`, reaching the system only through structured capabilities. Ida is a
layer *of* Essential OS, not an application running on top of it — which is what
makes it a system-level agent rather than a chatbot in a window.

```text
┌─────────────────────────────────────────────┐
│ 5  Experience          our UX · app family  │
├─────────────────────────────────────────────┤
│ 4  Desktop infra       shell · session · WM │
├─────────────────────────────────────────────┤
│ 3  System services     net · audio · gfx    │
├─────────────────────────────────────────────┤
│ 2  Foundation          kernel · drivers     │
├─────────────────────────────────────────────┤
│ 5  Intelligence        Ida <∫>  (cross-cut) │
└─────────────────────────────────────────────┘
```

## The desktop-base question

Two viable paths exist, and the choice is not yet made:

- **KDE Plasma** — the current machine (Plasma 6.7.5) and the Essential Desktop
  assembly. Rich, configurable, strong Wayland story, mature shell.
- **GNOME** — Ida's original target (Fedora 44 / GNOME 50), with Ida's existing
  GNOME integration work already done.

The criteria that will settle it include: Ida's integration cost on each base;
how much of the desired shell behaviour is configurable versus code; the
energy/power story; the app-presentation model; and long-term maintainability
for one person. Until then, **both are documented**, and ADR
[0009](../decisions/0009-desktop-base-open.md) holds the decision open.

## Relationship to Ida

Essential OS does not depend on Ida to function. Ida is a layer that, when
present, makes the system easier to operate. The dependency runs the other way:
Ida depends on the system exposing **structured capabilities**. The richer and
more consistent that capability surface is, the more Ida can do — safely.

## Status

| Layer | Status |
|---|---|
| Foundation | Chosen implicitly (Fedora base) · **Prototype** |
| System services | Configured · **Prototype** |
| Desktop infrastructure | Assembled on Plasma · **Prototype** |
| Experience | Designed and applied · **Prototype** |
| Intelligence | Ida Core · **Implemented** (see [`../ida/`](../ida/README.md)) |

There is no installer, no image and no distribution. **Essential OS is a vision
and a research project with a real desktop assembly, not a shipping OS.**
