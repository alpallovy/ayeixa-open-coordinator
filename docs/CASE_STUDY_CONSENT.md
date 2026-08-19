# Case study consent record (template)

**Version:** 1.0  
**Effective:** 2026-08-19

Use this only after you have **actually tried** an AYEIXA OSS project and posted **concrete feedback** (see [`CASE_STUDY_PUBLIC_FLOW.md`](./CASE_STUDY_PUBLIC_FLOW.md)).

Post the completed block as a **public GitHub comment** on the repo Discussion or issue where your feedback appears. That comment URL becomes the permission record.

---

## Consent block (copy, fill, and post)

```
CASE STUDY CONSENT — AYEIXA OSS

Project evaluated: [repo name + URL]
What I tried: [1–3 sentences — concrete workflow]
Feedback location: [URL to your issue/comment/PR]

ATTRIBUTION CHOICE (select exactly one):
[ ] NAMED — I permit publication with attribution to my GitHub handle: @________
[ ] ANONYMOUS — I permit publication without naming my public handle
[ ] NO_CASE_STUDY — Do not use my experience in any case study (feedback only)

I confirm:
- I am not the project Founder or an AYEIXA-controlled account
- I actually used or meaningfully evaluated the project (not star-only)
- I give explicit permission for case-study use as selected above
- I may withdraw permission by commenting again on the same thread

Date (UTC): YYYY-MM-DD
```

---

## Named vs anonymous

| Choice | Published case study may include |
|--------|----------------------------------|
| **Named** | GitHub handle, optional display name, quoted feedback with link |
| **Anonymous** | Workflow description and outcomes only — **no** public handle |
| **No case study** | Feedback may be used for product improvement only — **not** published as a case study |

You must mark **exactly one** checkbox. Blank, both checked, or multiple checked = **NO_CASE_STUDY** (no publication consent).

---

## Withdrawal

Comment on the same thread:

```
CASE STUDY CONSENT WITHDRAWN — [date UTC]
```

Withdrawal removes future publication permission; already-published material is handled per your request in that comment.

---

## Not consent

The following do **not** count as case-study permission:

- Starring a repository
- “Looks interesting” / “I might try it”
- Founder-authored invitation posts
- Implied consent from opening an issue without the block above

---

## Adjudication

`CASE_STUDY_PARTICIPANTS` increments only when maintainers verify all of:

1. Independent human (not Founder/bot)
2. Real usage / evaluation evidence
3. Concrete feedback on record
4. Valid consent block with explicit attribution choice

Ledger: `data/case-study/participant-ledger.json` (machine-readable; counts stay 0 until qualified).
