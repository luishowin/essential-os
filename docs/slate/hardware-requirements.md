# SLATE — hardware requirements

**Status:** Speculative · **Date:** 2026-10-07

These are **concept targets**, not a specification for a product that exists.
They exist to force honest engineering and to give the software a north star.

---

## Primary targets

| Target | Value | Rationale |
|---|---|---|
| Mass | **≤ 999 g** | A hard constraint that eliminates the lazy answer |
| Display | **≤ 13 inches** | Portable first; a small machine that is genuinely usable |
| Thickness | Thin and light | Carry-everywhere |
| Architecture | **Framework-style modular** | Repair and upgrade; longevity |
| Idle behaviour | Efficient at rest | Quiet, cool, long battery |
| Burst behaviour | High performance on demand | Compile, render, model, play |
| Repairability | User-serviceable | The hardware expression of ownership |

## The tensions (honest)

Every target fights another. These are the real trade-offs, not marketing:

| Tension | Why it is hard |
|---|---|
| 999 g vs cooling | Burst performance needs thermal mass and airflow; both cost grams |
| ≤13″ vs usability | Small chassis, small battery, small keyboard travel |
| Thin vs battery | Battery capacity is volume; thin removes it |
| Modular vs thin/light | Connectors, slots and fasteners add thickness and mass |
| Burst vs idle efficiency | The same silicon must be good at both ends |
| Repairability vs cost | Fewer parts and glue are cheaper to make |

The design principle that resolves most of these is **simple at rest, powerful
on demand**: do not try to be powerful all the time. Burst within thermal limits
and return to quiet.

## Development baseline (today)

The machine the software is actually being built and measured on is an ordinary
laptop — around a **Ryzen 5 5600U** class APU. That matters more than the SLATE
concept right now: the software must be excellent on ordinary hardware, not
merely on hardware that does not exist yet.

If Ida runs well on a 5600U, it will run well on SLATE. If it needs a
data-centre GPU to open an application, the architecture is wrong.

## Software requirements this places on the hardware

The eventual hardware should expose, or make reachable:

- an **NPU or GPU** usable for local models;
- enough **memory** for a small action model plus the system;
- **storage** that can hold local models and a personal index;
- **thermals** that allow sustained bursts without throttling to uselessness;
- **sensors and hooks** that let Ida know the machine's state honestly.

## Status

**Speculative.** No prototype, no parts list, no supplier. This document exists
so that when the hardware work begins, the constraints and their tensions are
already written down.
