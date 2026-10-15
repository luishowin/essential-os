# The ESSENTIAL OS wordmark

**Status:** Design · **Date:** 2026-10-16 (revised: integrals removed)

---

## The mark

```text
ESSENTIAL OS
```

Plain spelling. No substitutions. `ss` is just `ss`.

Ida is plain as well:

```text
Ida
```

No angle brackets, no integral. Just `Ida`.

## Treatment

| Property | Value |
|---|---|
| Typeface | [Geo](https://fonts.google.com/specimen/Geo) (Google Fonts, OFL), uppercase |
| Tracking | 21% (`letter-spacing: 0.21em`), even across the whole word |
| Weight | Regular 400 (Geo ships a single weight) |
| Colour | `currentColor`, so it works on dark and light without a second asset |
| Case | Always uppercase for `ESSENTIAL OS`; `Ida` is capital-I + lowercase-da |

## Why it works

- One typeface, one tracking, no special glyph. It reads as calm and technical.
- 21% tracking gives it air without breaking the word apart.
- Geo's geometric construction carries the identity, so no contrasting serif is needed.
- ESSENTIAL OS, Ida, and SLATE all share the same typographic sensibility. SLATE stays plain uppercase in the same treatment.

## The relationship of the marks

```text
ESSENTIAL OS   the system
Ida            the intelligence
SLATE          the hardware
```

No integral family. The three names tie together through shared type and tracking, not shared symbols.

## Files

- [`essential-os-wordmark.svg`](essential-os-wordmark.svg), the canonical wordmark asset (Geo, 21% tracking).
- [`eos-icon.svg`](eos-icon.svg), the EOS icon: block E-O-S letterforms, `currentColor` fill.

## Rules

- Do not add gradients, shadows, glows or outlines to the wordmark or icon.
- Do not substitute glyphs into the word (`ss` stays `ss`).
- Do not letterspace unevenly; tracking is 0.21em everywhere.
- Do not recolour parts of the word differently by default.
- Do not reintroduce integral / bracket marks.
- The icon may be used alone (favicon, app icon, boot mark) or alongside the wordmark. When alongside, keep clear space equal to the cap height.
