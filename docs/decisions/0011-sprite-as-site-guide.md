# 0011 — Sprite is the site guide, with a Worker-held brain

**Status:** Accepted
**Date:** 2026-11-14

## Context

The public site is the project's main explanation of what Essential OS is, what
is real and how someone can help. It is a static one-page document, rebuilt by
GitHub Pages from [`site/`](../../site/), with no framework, no build step and no
backend.

Two gaps appeared as the site matured. A visitor arriving at a long chapter page
had no quick way to ask where something is or whether a feature exists. And the
project had no public route for money, compute, hardware or feedback, even
though those were the routes it actually needed. The planning record already
required one public intake route, no public security reports and no commercial
support promises, but none of it was reachable from the site.

Sprite is an existing MIT-licensed widget in
[`luishowin/sprite`](https://github.com/luishowin/sprite): one CSS file, one
JavaScript file, an SVG face with expressions, and a chat panel. Its content was
written for beben.design. Loading it unchanged would have answered Essential OS
visitors as a Nairobi design studio, and its link allowlist rejected GitHub and
this site's own Pages host.

## Decision

1. **Vendor Sprite into this repository** at `site/sprite/sprite.js` and
   `site/sprite/sprite.css`, copied unmodified from upstream commit `716538b`.
   Site-specific values live in `site/sprite-config.js`; behaviour changes go
   upstream first, then are copied down. The page also sets a fail-closed
   config inline, so a missing config file cannot reintroduce Beben copy.
2. **Use the full chat widget, not the face alone**, with a dedicated Cloudflare
   Worker at
   `https://essential-os-sprite.howin329.workers.dev`. The Worker holds
   `FIREWORKS_API_KEY` as a secret, locks CORS to `https://luishowin.github.io`
   and local preview ports, caps history, message size and output tokens, and
   returns no upstream error detail.
3. **Never ship Beben copy.** `offline: false` disables the upstream dialogue
   set; when the Worker is unreachable the widget says it cannot reach its brain
   and points at the chapters, with no invented answers. Upstream gained
   `offline`, `offlineText`, `greeting`, `chips`, `pillTexts` and `linkHosts`
   for this.
4. **Keep the facts outside the Worker.** `site/sprite.md` is the only source
   for specifics about status, repositories and support routes. The Worker
   fetches it at runtime and caches it for five minutes. The baked-in prompt
   holds only stable rules.
5. **State the status vocabulary.** Sprite must use Implemented, Prototype,
   Planned, Research, Open question and Direction with the same meaning as the
   site, and must not upgrade a mockup into shipped software.
6. **Publish support as routes, not promises.** GitHub Sponsors is the only
   money route; compute, hardware, testing, critique, documentation, translation
   and triage are listed as real offers. Sponsorship does not buy priority,
   influence, a contract or a reply. Requests, suggestions and bugs use GitHub
   Issue Forms; security reports use a private advisory, never a public issue.
7. **Add `SECURITY.md`, `.github/FUNDING.yml` and issue templates**, and record
   the support chapter as chapter 011 in the site navigation.
8. **Store no visitor data server-side.** Chat history lives in
   `sessionStorage`. The Worker keeps no conversation store; Fireworks receives
   the messages needed to produce a reply.

## Reasoning

- **Reuse over invention.** Sprite already solves the character, motion,
  accessibility and panel UX. Writing a second chat shell would duplicate that
  work and drift visually.
- **The key must never reach the browser.** A static site cannot hold a provider
  key. One small proxy is the minimum honest architecture.
- **A wrong answer is worse than "I don't know".** This project's credibility
  rests on labelled claims. A guide that invents a release date or a feature
  would undermine the record.
- **The support routes already existed as policy.** Publishing them makes the
  policy testable and gives people a real way to contribute without inventing
  infrastructure.
- **Static and dependency-free fits the site.** Two vendored files and one
  config file keep the build a file copy and keep GitHub Pages sufficient.

## Alternatives

- **Face only, no chat.** Rejected for now: the face is decorative without a
  job, and the chat is the useful part. It remains viable if the Worker becomes
  a cost or abuse problem.
- **The Beben Worker or prompt.** Rejected: wrong site, wrong CORS, wrong facts.
- **A hosted third-party chatbot.** Rejected: another vendor, more tracking, no
  control over the status vocabulary, and a key or plan outside the project's
  ownership.
- **Issues without templates.** Rejected: the minimum bug fields would be
  forgotten, and hardware offers would arrive as unusable prose.
- **Email as the only route.** Rejected: there is no project address, and a
  public issue queue leaves an answer for the next person.
- **No money section until the project is further along.** Rejected: Sponsors is
  live, the inference bill is real, and the page can state the boundary
  honestly.

## Consequences

- Sprite is a vendored dependency. Updating it means copying two files, updating
  the commit hash in `site/sprite/README.md` and testing the widget.
- The Worker is a public, key-bearing endpoint. It needs a Fireworks spend alert
  and, if abuse appears, a per-IP limiter or a custom domain with WAF rate
  limiting. Cloudflare's free plan alone does not provide zone rate limiting on
  `workers.dev`.
- The CORS origin is `https://luishowin.github.io`, which covers every Pages
  project under that account, not only `/essential-os`.
- `site/sprite.md` can drift from the site. The Worker's five-minute cache means
  a correction is not instant, and the file must be edited whenever a status
  claim changes.
- Private vulnerability reporting must stay enabled for the published advisory
  link to work. If it is disabled, the site's fallback instruction is the only
  honest route.
- The launcher is fixed bottom-right and the chapter pill is fixed
  bottom-centre, so the launcher is lifted above the pill below 920 px. The open
  panel remains anchored to the viewport.
- No analytics were added. There is no way to know how many people use Sprite
  beyond Cloudflare and Fireworks request counts.
- The project now has public support and feedback routes that must be read. The
  site says, in plain words, that this is best effort with no SLA.

## Revisit when

- Fireworks spend or Worker traffic grows faster than the project can fund.
- Private vulnerability reporting is unavailable or the advisory route changes.
- The site gains a second page or a different host, making the single-chapter
  navigation and the CORS origin insufficient.
- Sprite's upstream gains a documented release process; the vendored copy should
  then follow tags rather than commits.
