# Try OpenCoordinator in 10 minutes

Pre-release (`v0.1.0-alpha`). No npm publish yet — local clone only.

## Prerequisites

- Node.js 18+
- ~5 minutes for `npm ci` on first run

## 1 — Install

```bash
git clone https://github.com/alpallovy/ayeixa-open-coordinator.git
cd ayeixa-open-coordinator
npm ci
```

## 2 — Run the quick example

```bash
npm run quicktry
```

## 3 — Expected output (success)

```text
--- OpenCoordinator quicktry ---
Input: Add Jest unit tests for the auth module
Parsed taskType: TEST
Risk level: HIGH
Requires approval: true
Execution stages: [["core"],["verify"]]
```

Try a custom phrase:

```bash
npm run quicktry -- "Fix null pointer crash in parser"
```

## 4 — Verify tests (optional)

```bash
npm test
```

## If something fails

[New issue](https://github.com/alpallovy/ayeixa-open-coordinator/issues/new) with Node version, command, and error output.

## Share feedback

Post concrete results on [Discussions #5](https://github.com/alpallovy/ayeixa-open-coordinator/discussions/5):

- Task phrases you tried
- Whether intent/risk/stages matched your expectations
- Integration blockers

## Case study (optional)

Hub: [Discussion #6](https://github.com/alpallovy/ayeixa-open-coordinator/discussions/6) — explicit **NAMED**, **ANONYMOUS**, or **NO_CASE_STUDY** only.

## Commercial questions (after evaluation only)

See [POST_USAGE_COMMERCIAL_QUESTIONS.md](./docs/POST_USAGE_COMMERCIAL_QUESTIONS.md) — answer in your feedback comment only if you ran the quicktry.
