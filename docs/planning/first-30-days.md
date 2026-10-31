# First 30 days — execution plan

**Status:** Planned · **Date:** 2026-10-27

The target is a functioning project system and evidence-backed technical
direction, not a complete desktop.

## Week 1 — Put the project in order

- [ ] Create the Git repository and docs structure.
- [ ] Inventory design pages, desktop notes, website and existing code; link them
  rather than duplicating everything.
- [ ] Finalise product brief, audience hypothesis and first-use promise.
- [ ] Write first-release non-goals.
- [ ] Create issue/project board and labels.
- [ ] Set the monthly AI/tool cap and begin the usage log.

**Exit:** There is one source of truth and a visibly prioritised next action.

## Week 2 — Reduce product and design uncertainty

- [ ] Choose 3–5 core tasks for the first preview.
- [ ] Define the reference VM and initial hardware target.
- [ ] Audit the existing design file; group work into design tokens, core flows,
  shell, settings, utilities and website.
- [ ] Define a token naming scheme and icon pilot set.
- [ ] Run at least two informal usability tests on the current prototype;
  schedule more if feasible.

**Exit:** The key flow, design-system gaps and highest-value UX problems are
written down.

## Week 3 — Run technical spikes

- [ ] Test a clean Fedora-based VM image build.
- [ ] Prototype one shell interaction on the candidate desktop foundation.
- [ ] Build one small Rust + GTK 4 test app with shared tokens.
- [ ] Read battery / storage information via intended system APIs and document
  what is available.
- [ ] Test one Qt or Flatpak app for theme behaviour.

**Exit:** Working prototypes or documented failure evidence exist, not just a
set of opinions.

## Week 4 — Choose and ship the next slice

- [ ] Write ADRs for base image, shell architecture, toolkit and theme
  integration.
- [ ] Choose one architecture for the next phase and list its known limitations.
- [ ] Build a small end-to-end proof in the VM: launch session, open an app, open
  a system menu, show a live utility value.
- [ ] Update roadmap, risks and cost record.
- [ ] Publish or update the simple static project landing page with honest status
  and source links.

**Exit:** A repeatable proof exists and the next 6–8 weeks of work are clear.

## Scope warning

If the week fills up, drop the website polish and additional icons first. Do not
drop source control, test setup, architectural proof or cost control.
