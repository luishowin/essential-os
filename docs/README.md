# Documentation guide

**Status:** Living record · **Updated:** 2026-11-26

## Which source governs what?

| Source | Authority |
|---|---|
| [Product and technical specification](essential-os-specification.md), v0.3 | Current consolidated product requirements and maturity milestones |
| [Product Vision Extension](Essential%20OS%20%E2%80%94%20Product%20Vision%20Extension.pdf) | Source for ready-to-use, Store, toolkit, media, accessibility and customization requirements; incorporated in v0.3 |
| [Sam/Ida specification v1.1](specifications/Essential_OS_Sam_and_Ida_Specification_v1.1.pdf) and [ADR 0010](decisions/0010-sam-separate-os-search-service.md) | Sam/Ida separation and trust boundary; supersede the older tiered-assistant framing |
| [Accepted ADRs](decisions/README.md) | Decisions and rationale; supersede through a new ADR rather than rewriting history |
| [First-preview scope](planning/mvp-scope.md) | Initial release cut line, not the full ecosystem |
| [Delivery roadmap](planning/roadmap.md) | Engineering and validation gates; its phase numbers differ from product milestones |
| [Build tracker](status.md) | Browser interface studies and their limitations |
| [Ida](https://github.com/luishowin/ida) and [Sam](https://github.com/luishowin/sam) repositories | Detailed implementation, releases, tests and current component status |
| Research, migration records and older proposals | Dated evidence and history; not competing current requirements |

The project README, layer narratives and public site summarize the record.
When they disagree with a governing source, reconcile the summary and record
the change. A newer timestamp alone does not turn a proposal into an accepted
decision or a mockup into an implementation.

## Reconciliation on 26 November 2026

Issue [#1](https://github.com/luishowin/essential-os/issues/1) requested current
canonical docs. The v0.3 revision incorporates the Product Vision Extension,
makes source precedence explicit, connects product milestones to delivery
gates, and fixes inconsistent layer numbering and prototype metadata.

Fedora is the current foundation; RPM/DNF and a reversible desktop session are
the planned development path. The canonical desktop/compositor, final toolkit,
release image/update model, hardware minimums and default application selection
still require evidence and formal decisions. Product targets remain targets.
Sam/Ida v1.1 remains a separate architecture version, not the version number
of the whole OS specification.
