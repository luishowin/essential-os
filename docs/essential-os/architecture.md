# Essential OS: architecture

**Status:** Vision + research · **Date:** 2026-10-07

The system is best understood as five interacting layers, from the kernel to
the way a person interacts with the machine.

---

## The five layers

### 1. Foundation

Kernel, firmware, drivers, init, filesystem, power management. Chosen, not
written. The goal is hardware compatibility that is boring and predictable,
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

Two separate systems, not one assistant:

- **Sam** is the native search and retrieval service. It answers questions about
  the computer itself — files, applications, settings, hardware, devices,
  networking, processes and local documentation — from a versioned registry and
  predefined read-only handlers. It is deterministic and non-generative, with no
  language model, no reasoning and no personal memory.
- **Ida** is the personal assistant. It understands natural-language requests,
  resolves context, selects capabilities, executes approved native actions,
  verifies results, converses and escalates complex work. It may call Sam for
  local computer knowledge.

Both reach the system only through structured capabilities. Ida is a layer *of*
Essential OS, not an application running on top of it; Sam is a peer OS service
that either the global search experience or Ida can call.

```text
┌─────────────────────────────────────────────────────┐
│ 5  Experience          our UX · app family          │
├─────────────────────────────────────────────────────┤
│ 4  Desktop infra       shell · session · WM         │
├─────────────────────────────────────────────────────┤
│ 3  System services     net · audio · gfx            │
├─────────────────────────────────────────────────────┤
│ 2  Foundation          kernel · drivers             │
├─────────────────────────────────────────────────────┤
│ 5  Intelligence        Sam (search) · Ida (assistant│
│                        cross-cutting)               │
└─────────────────────────────────────────────────────┘
```

## The intelligence layer

Sam and Ida are independent products with independent roadmaps and evaluation
criteria.

| Question or task | Owner |
|---|---|
| Find a file, application, setting, local document or device | Sam retrieves; Ida may request the same lookup |
| Read live system state (RAM, disk, battery, network) | Sam, from approved sources |
| Open a found file, launch an app, navigate to a setting | Sam may propose a constrained action; the caller performs it |
| Change a setting, set volume, create a timer, move files, power off | Ida interprets and authorises; its executor performs it |
| Explain, write, plan, research or reason | Ida Tier 2, or the caller's chosen external handler |
| Multi-step agent work | Hermes, under Ida |

Sam never chooses or invokes a web search, local model or cloud model. It returns
a typed handoff and the calling layer decides. Sam must work without Ida; Ida
must work without Sam. They may share read-only OS data services, but their
registries and responsibilities stay separate.

**Status:** Sam is specified only and has no implementation. Ida Core is
implemented and released.

## The desktop-base question

Two viable paths exist, and the choice is not yet made:

- **KDE Plasma**: the current machine (Plasma 6.7.5) and the Essential Desktop
  assembly. Rich, configurable, strong Wayland story, mature shell.
- **GNOME**: Ida's original target (Fedora 44 / GNOME 50), with Ida's existing
  GNOME integration work already done.

The criteria that will settle it include: Ida's integration cost on each base;
how much of the desired shell behaviour is configurable versus code; the
energy/power story; the app-presentation model; and long-term maintainability
for one person. Until then, **both are documented**, and ADR
[0009](../decisions/0009-desktop-base-open.md) holds the decision open.

## Relationship to Ida and Sam

Essential OS does not depend on Ida to function. Ida is a layer that, when
present, makes the system easier to operate. The dependency runs the other way:
Ida depends on the system exposing **structured capabilities**. The richer and
more consistent that capability surface is, the more Ida can do, safely.

Sam is the native search service and is expected to be part of Essential OS
itself, usable from the global search experience without Ida installed. The same
rule applies: Sam reads only through approved, read-only data services and never
holds an execution path.

## Status

| Layer | Status |
|---|---|
| Foundation | Chosen implicitly (Fedora base) · **Prototype** |
| System services | Configured · **Prototype** |
| Desktop infrastructure | Assembled on Plasma · **Prototype** |
| Experience | Designed and applied · **Prototype** |
| Intelligence — Ida | Ida Core · **Implemented** (see [`../ida/`](../ida/README.md)) |
| Intelligence — Sam | Architecture specified · **Design stage**, no implementation (see [`luishowin/sam`](https://github.com/luishowin/sam)) |

There is no installer, no image and no distribution. **Essential OS is a vision
and a research project with a real desktop assembly, not a shipping OS.**
