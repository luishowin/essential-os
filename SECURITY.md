# Security policy

## Scope

This repository publishes the Essential OS website, its Sprite Worker, and the
written engineering record. Security reports are welcome for:

- the site at <https://luishowin.github.io/essential-os/> and its assets;
- the Sprite proxy Worker and its handling of messages and the API key;
- anything in this repository that could expose a visitor, a contributor or a
  credential.

Ida Core (`luishowin/ida`) and Sam (`luishowin/sam`) have their own repositories.
Report issues there if they are specific to those projects. Both are early-stage
and provide no security warranty.

## Reporting a vulnerability

**Do not open a public issue and do not post exploit details.**

Use GitHub's private vulnerability reporting form:

<https://github.com/luishowin/essential-os/security/advisories/new>

If that form is not available, open an issue titled
`Private security contact request` with **no technical detail**, and wait for a
private channel. Do not describe the vulnerability, the affected URL or the
steps to reproduce it in that issue.

A useful report includes:

- what is affected and where;
- what an attacker could do, and what they would need;
- the smallest reproduction you can give;
- whether you want to be credited;
- any disclosure deadline you are working to.

Never include real API keys, personal data, or another person's information.
If a secret is exposed, say which service and revoke it first.

## What to expect

This is a one-person project with no security team, no bug bounty and no
service-level agreement. Reports are read on a best-effort basis. Acknowledgement
may take days or weeks. Confirmed issues are fixed in the open when a fix is
ready, unless publishing would put users at risk first.

Please give reasonable time to fix an issue before public disclosure. Credit is
given if you want it.
