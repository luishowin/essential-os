# The E∬ENTIAL OS wordmark

**Status:** Design · **Date:** 2026-10-07

---

## The mark

```text
E ∬ E N T I A L   O S
```

The double integral `∬` (U+222C) replaces the two *s* characters in "Essential".

## Treatment

| Property | Value |
|---|---|
| Surrounding type | Thin, Inter-like grotesque; uppercase |
| Tracking | Generous and even (wide `letter-spacing`) |
| Rhythm | Restrained, almost monospaced |
| The `∬` | A contrasting **serif**, set larger, optically aligned to the cap height |
| Weight | Light / regular, never bold |
| Colour | `currentColor`, so it works on dark and light without a second asset |
| Case | Always uppercase |

## Why it works

- The integral is the anchor: it reads as mathematical and technical without
  decoration.
- The contrast between a thin grotesque and a serif integral gives the mark a
  single point of focus rather than an even texture.
- Wide tracking makes it feel considered and calm, the opposite of a startup
  logo that shouts.

## The relationship to the other marks

```text
E∬ENTIAL OS     double integral, the system
<∫> Ida         single integral, the intelligence
SLATE           plain uppercase, the hardware
```

The integral family ties the software layers together. SLATE stays plain,
because it is the physical object.

## Files

- [`essential-os-wordmark.svg`](essential-os-wordmark.svg), the canonical asset.

## Rules

- Do not add gradients, shadows, glows or outlines to the wordmark.
- Do not set the `∬` in the same typeface as the surrounding letters.
- Do not letter-space the `∬` away from the word; it is part of the word.
- Do not recolour the `∬` differently from the rest by default. The contrast is
  in the *typeface*, not the colour.
- The `<∫>` mark may be animated subtly (e.g. a slow pulse), but never
  distractingly.
