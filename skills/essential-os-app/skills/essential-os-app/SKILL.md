---
name: "essential-os-app"
description: "a skill to design and build html app mockups in the essential os style"
---

# Essential OS app pattern

Use this when Luis asks for a new app "in the same style" as the Editor and Music apps, or for any UI experiment for his custom Linux desktop environment. Output is ONE static `.html` file (CSS and JS inline, no build step for the user, no external deps, works from `file://` and GitHub Pages).

## 1. Confirm intent in one line, then build

Luis plans before building, so state the architecture in 3-5 lines (layout, menus, what is real vs mockup) and start. Ask a question only if the app's purpose is unclear. Keep humour quick, tell it like it is, metric units, USD.

## 2. File structure

Build from parts and concatenate with a tiny `build.py`, so edits stay surgical and nothing gets truncated: `1-head.html` (tokens, base, shell, bar, pill, menus) | `2-css.html` (content views, sheet, `@container` tiers, closes `</style></head>`) | `3-body.html` (SVG sprite + DOM) | `4-a.js` helpers/storage | `5-b.js` data + engine | `6-c.js` views + sheet | `7-d.js` menus + events | `8-win.js` window manager. Output = head + css + body + `<script>(() => {'use strict'; ...all js... })();</script>`. Edit with small Python replace scripts that `assert s.count(old) == 1`. Write big blocks in pieces; never one giant call.

## 3. The shell (always include)

- Fake desktop: `.desktop` (fixed, 32 px grid wallpaper, leaves a 44 px taskbar) > `.window` (absolute, radius 12) > `.app` with `container: app / inline-size`.
- Eight `.rz` resize handles, min size 360x300, default `min(1100, desk-48) x min(700, desk-48)` centred. Dragging a maximized window un-maximizes under the pointer. 4 px move threshold so clicks still work. Double-click the drag zone to maximize.
- Taskbar: app chip (show/hide, minimize keeps audio/state alive), live HUD (`w x h, x, y`), presets Min / Compact (640x440) / Default / Fill.
- Persist window rect in localStorage with try/catch, namespaced `appname.key`.
- Full screen = maximize + hide taskbar (`body.fs`). Esc/F11 leaves, restoring the previous maximized state.
- Mini mode (when the app has a compact form): fixed-height window (112 px), restore the previous rect on exit.

## 4. Responsiveness rules (learned the hard way)

- Everything keys off WINDOW width: `@container app (max-width: Npx)`. Never `@media` for layout (only `prefers-color-scheme` / `prefers-reduced-motion`).
- `:root { }` inside `@container` never matches. Set custom properties on a real element (`.scroll { --pad: 18px }`).
- Standard tiers: <=980 drop low-value columns; <=700 hide secondary pill buttons; <=560 menus fold into one hamburger; <=520 tighter padding, hide volume; <=420 hide prev. Anything hidden MUST stay reachable from a menu.
- Verify at Min, Compact, Default and Fill with bounding boxes (no overlaps, children inside parent, controls not colliding), not just screenshots.

## 5. Chrome layout: one continuous canvas

- Content scrolls under a transparent top bar (40 px) and a bottom pill; use `.topfade` / `.botfade` gradients of `var(--bg)` so nothing hard-edges. Scroll padding = bar heights + gutter.
- Top bar: menus left, window controls right, empty middle is the drag handle (`closest('.top') && !closest('button,input')`). Wheel over the bar forwards to the scroller.
- Pill: `position:absolute; bottom:14px; left:0; right:0; margin:0 auto; width:min(100% - 28px, 820px)`; 3-column grid `auto | minmax(0,1fr) | auto`; glass = `var(--glass)` + `backdrop-filter: blur(28px) saturate(1.8)` + soft shadow; radius 24; height 50.
- Anything anchored to a bottom pill opens UPWARD: popovers (`bottom: calc(100% + 14px)`, keyframe that slides up), menus (`{up:true, center:true}`), toast sits at `bottom: pill-h + 30px`, side sheet bottom clears the pill.
- Tokens on `:root` with a dark override on `html[data-theme=dark]` (light / dark / match-system). Accent `#fa2d48`, font stack starts Inter then system-ui. Icons: one inline SVG `<symbol>` sprite, `currentColor`.

## 6. Menu engine (reuse verbatim in spirit)

`openMenu(anchor | {x,y}, items, {up, center, right, gap})`. Items: `{label, kbd, checked, disabled, header, sub:[...], run}` or `'-'`.

- `position: fixed` appended to `body`; set `maxHeight` from available room so tall menus scroll; clamp into the viewport; flip upward when asked.
- Submenus: hover with an 80 ms delay or click; a hovered plain item closes deeper menus; opens to the right, flips left if no room. Keep a `menus[]` stack and `closeMenu(depth)`.
- Menubar: hover-to-switch while one is open, click toggles, `aria-haspopup`/`aria-expanded`, mousedown-outside closes (exclude `[aria-haspopup]` so toggle works), arrow keys move/open/close, Esc closes.
- Standard menus: Media/File (open, sources, playlists/recent, clear, close), Playback/Edit-equivalent (real controls first, then mockups), View (views, panels, mini, full screen, appearance). Tabs/documents apps adapt: File / Edit / View.
- Mockups: make them toggle and persist, and toast "... (preview only)". Do real the cheap ones (autoplay, sleep timer). Say plainly in the reply which items are real vs UI-only.

## 7. Gotchas that already cost time

- NUL (`\u0000`) inside `data-*` attributes is rewritten by the HTML parser. Use a printable separator.
- Class-name collisions: a new `.sw` toggle restyled the `.rz.sw` resize handle. Namespace new classes and grep before adding.
- `offsetParent` is null for `position:fixed` elements. Don't use it to detect visibility of those; use computed style.
- Routing `<audio>` through Web Audio (`createMediaElementSource`) breaks `setSinkId` output switching. Keep EQ/mono/normalisation as UI previews unless the audio graph is the plan.
- MP4 tags: the `meta` box is a full box, skip its 4 version bytes only when listing its children.
- Mobile/desktop dev: wrap every storage access in try/catch and make the app work without it.
- Fixed-position menus must be appended to `body` (the `.app` container-type would otherwise contain them).

## 8. Test before delivering (headless Playwright, `python3 -I`)

1. Generate fixtures (ffmpeg sine tones with tags and covers for media apps).
2. Launch Chromium with `--no-sandbox --autoplay-policy=no-user-gesture-required`; collect `console` errors and `pageerror`.
3. Assert geometry (pill centred offset 0, bottom gap 14, menus above/below anchors, sheet clears the pill), click through every menu, submenus, keyboard nav, presets, mini, full screen + Esc, reload persistence, light and dark.
4. `node --check` the extracted script; screenshot at deviceScaleFactor 1 and read the key shots.
5. Deliver with SendUserFile, one-line summary, list real vs mockup, name one sensible next step.

## 9. Reply style

Short, technical-UX framing (why a decision serves the user), forward-thinking suggestions (what a real DE/PipeWire/MPRIS integration would do later), no recap of steps.