# Brand

**Status:** Design · **Date:** 2026-10-16 (revised: integrals removed)

The visual language of the project. It is intentionally restrained: typography,
whitespace and precision, not gradients and glow.

---

## The marks

```text
ESSENTIAL OS      the operating system
Ida               the intelligence layer
SLATE             the hardware
```

These should feel like parts of the same universe: same typographic
sensibility, same restraint.

## The anchor

Plain type. No integral substitution:

**ESSENTIAL OS**

Ida is just **Ida**. No brackets, no symbol.

The identity is carried by the Geo typeface at 21% tracking, plus the EOS
block-letter icon.

## Contents

| Document | What it covers |
|---|---|
| [wordmark.md](wordmark.md) | The wordmark, typography and treatment rules |
| [essential-os-wordmark.svg](essential-os-wordmark.svg) | The wordmark as a real, usable SVG (Geo, 21% tracking) |
| [eos-icon.svg](eos-icon.svg) | The EOS icon as a real, usable SVG (`currentColor`) |

## The rules in brief

- **Typography first.** The identity is carried by type, not imagery.
- **Geo** for the wordmark, uppercase, with even **21% tracking** (`0.21em`).
- **EOS icon** in `currentColor` for favicon / app / boot uses.
- **Restrained rhythm**: understated, technical, elegant.
- **No** generic "AI startup" aesthetics: no excessive gradients, no glowing
  circuitry, no robot imagery, no generic futuristic nonsense.
- **Dark and light capable.** The marks are set in `currentColor`.

## Where it appears

- The one-page site (`site/`) uses the language directly, loading Geo from Google Fonts.
- The wordmark SVG is the canonical asset; applications may recolour it but not
  restyle the letterforms.
- The EOS icon is the canonical icon; see `site/eos-icon.svg` for the web copy.
