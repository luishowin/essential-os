# Success measures

**Status:** Planned · **Date:** 2026-10-27

Metrics are hypotheses and internal release gates, not advertising claims.
Establish a baseline before optimising. Do not collect telemetry by default
simply to make the metrics easy to measure.

## Product and usability

| Measure | Initial target | How to measure | Guardrail |
|---|---|---|---|
| Core task completion | 4 of 5 testers complete each core task without coaching | Moderated usability session | Record task failures and hesitation, not only pass/fail |
| First-session comprehension | At least 4 of 5 testers can explain how to launch an app, open settings and find help | Ask them to demonstrate | No leading prompts |
| Visual consistency | All first-party screens use approved tokens/components or document an exception | UI review checklist | Do not demand fake uniformity from third-party apps |
| Accessibility baseline | Keyboard-only pass for all core flows; text scaling and reduced-motion checks documented | Manual checklist + available tooling | Fix blockers before public beta |
| Application compatibility | Representative test matrix for GTK, Qt, Electron and Flatpak apps completed | Manual test matrix | Document gaps rather than hide them |

## Technical and quality

| Measure | Initial target before public preview | How to measure |
|---|---|---|
| Clean VM build/install/boot | 10 consecutive successful trials before calling the process repeatable | Run and log clean VM tests |
| Core-session stability | 2-hour smoke test with no Essential-induced session crash | Repeat test; preserve logs |
| Data-loss defects | Zero known open critical/high-severity defects that can destroy user data | Issue severity triage |
| Update/recovery | Every supported update-failure and rollback path tested on VM before claiming support | Record expected and actual results |
| Startup and responsiveness | Define a target on one named reference device, then measure median across 5 cold boots | Controlled benchmark, same conditions |
| Battery | Baseline against the same hardware/OS workload; claim improvement only when repeated measurements support it | Same brightness, workload, radios and power profile |
| Build reproducibility | Another clean checkout can follow the build notes without undocumented steps | Test from a fresh environment |

The numeric thresholds are starting release gates. Review them after the first
technical proof, when what is realistic is understood.

## Project sustainability

- AI/tool spend stays within the approved monthly cap; any overrun is explicitly
  approved by the project owner.
- No more than two items are in progress at once.
- Each week ends with a buildable state or a documented blocker, not just a long
  list of generated code.
- Every release has an owner, changelog, known-issues list and rollback/recovery
  instructions appropriate to its maturity.
- Support and triage take a bounded amount of time; if support consumes all
  build time, reduce the supported hardware/user cohort.

## Avoid vanity metrics

Website visits, social followers, downloads, lines of code, generated icon count
and prompt count do not by themselves prove the product works. Track downloads
only when paired with useful outcomes such as installation success feedback, task
completion or actionable bug reports.
