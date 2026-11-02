# Brand

**Status:** Design · **Date:** 2026-10-16 (revised: integrals removed)

The visual language of the project. It is intentionally restrained: typography,
whitespace and precision, not gradients and glow.

---

## The marks

```text
ESSENTIAL OS      the operating system
Sam               the search and retrieval service
Ida               the personal assistant
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

## Design system and design-tool workflow

**Status:** Planned · **Date:** 2026-10-27

Figma (or whichever design tool is current) is the visual authoring space. This
repository holds the canonical design principles, token names and values,
component semantics and implementation-facing notes. Where feasible, token data
lives in text files and generates CSS/theme outputs rather than being maintained
by hand in several places.

Suggested repository structure:

```text
design/
  tokens/
    colors.json
    typography.json
    spacing.json
    radii.json
    motion.json
  icons/
    source/
    export/
  themes/
    gtk-3/
    gtk-4/
    qt/
    web/
  screenshots/
  compatibility-matrix.md
```

Do not check in fonts, icons or other assets unless the licence permits
redistribution. Record the source and licence for every third-party asset.

### Visual principles to preserve

- Quiet, intentional surfaces; avoid red-on-black as a default interaction
  language.
- A faded light-blue accent is the initial direction; confirm contrast and state
  distinctions with tests.
- Consistent shape, spacing, focus, hover, pressed, disabled, selected, loading,
  empty and error states.
- Motion communicates cause and result; all non-essential animation respects
  reduced-motion preferences.
- Do not use blur or transparency where it hurts readability, battery,
  performance or accessibility.
- Typography stays readable under fractional scaling and larger text settings.

### Component rules

Each component specification should state:

- Purpose and when to use it.
- Variants and semantic state names.
- Dimensions, spacing, typography, colour tokens and icon rules.
- Keyboard behaviour and visible focus.
- Accessibility name / role and contrast expectations.
- Loading, empty, error and disabled behaviour where relevant.
- Responsive / scaling behaviour.
- Design-tool component link and implementation status.
- Known differences when rendered by GTK, Qt, web or custom UI.

### Icon-system plan

Do not start by making hundreds of icons. First define a grid, optical
alignment, stroke/fill policy, corner language, metaphors, light/dark behaviour,
small-size legibility and export formats. Create a small pilot set: app
launcher, settings, files, network, battery, storage, security, notifications,
system overview, close/back/search and three representative app icons.

An icon composer may be useful later if it reduces repeated effort. Treat it as
a separate product/tool proposal with a cost-benefit test: does generating and
maintaining the tool take less time than designing, exporting and checking the
icons it replaces? The same rule applies to theme composers and other
generators.

### First-party application strategy

Use one shared component library wherever practical. A reasonable experiment is
Rust + GTK 4 for first-party native apps, then separately validate GTK 3,
libadwaita, Qt, Electron and Flatpak behaviour. Do not assume toolkit theming
can override an app that draws its own interface. Use supported desktop
settings/portals and packaged theme extensions where applicable; do not weaken
Flatpak sandboxing merely to force a theme.

### Design workflow

1. Sketch the task flow before styling the page.
2. Define components and tokens before duplicating screens.
3. Prototype primary, empty, failure and recovery states.
4. Test with a user who did not help design it.
5. Implement one representative slice, then compare screenshots against the
   design source.
6. Record accepted deviations; do not silently drift from tokens.
7. Mark a design "implemented" only after the real app has been visually and
   functionally checked.
