# COLLECT QA. Lead-magnet MVP + Seat module (SU-SIB-1)

**TAIL / COLLECT** · SettleUp suite **add-on module** · attaches to SettleUp Pilot (Level-4).

Cited checklist gap report for debt-collection **validation notice** drafts, framed against public Reg&nbsp;F sources (12&nbsp;CFR&nbsp;1006.34 / Model Form&nbsp;B-1). **Not legal advice. Not a compliant-letter product.**

**48h Denver framing:** siblings are SettleUp suite modules. Book intro first; optional standalone second. Convergence over purity.

Pain = **outbound validation-notice / itemization hygiene**, attached to the Pilot refuse-gate. Seat does not replace Pilot.

## SU-SIB-1. Seat as Pilot add-on

**Seat** desk at [`/seat/`](https://nathanplatteruser.github.io/collect-qa-magnet/seat/) (GitHub Pages path). Paper/ink blotter matching this magnet. HITL on exceptions. Loud **REFUSE** / GAP when facts are missing (refuse-over-hallucinate).

The Seat **surface is the module-attach story**. Primary CTA is **Book intro**. Seat mailto is optional inquiry. Magnet Stripe **HOLD**.

| Path | Role | Next step |
|-----|------|----------|
| Book intro | The ask | [calendly.com/nathanplatter](https://calendly.com/nathanplatter) |
| Email Nathan | Same intro path by mail | mailto `nathanplatter@gmail.com` |
| Free sample | Watermarked demo | `/app.html` |

**P0 PRICE LOCK (Nathan 2026-09-10).** No pack dollars. No Pilot dollars. No Soft ROI that implies what Nathan charges. Public ask is Book intro / Calendly / mailto only. No `buy.stripe.com` CTAs. No invented prices. Magnet Stripe stays **HOLD**.

### Soft ROI

- Off the public magnet. Do not publish a return story that implies what Nathan charges.
- Do not invent replacement prices to fill the hole.

### MVP Eng tickets

- **CQ-01** upload: paste or `.txt` (PDF refused; we do not parse binaries)
- **CQ-02** checklist UI: cited Reg F gaps
- **CQ-03** HITL exception tray + print/PDF export
- **CQ-04** CTAs: Book intro (Calendly) / mailto Nathan / free sample. Magnet Stripe HOLD.

### Demo Playbook (Nathan lock) `/seat/`

- **DP-01 Compare.** Honest table: spreadsheet checklists / AMS letter tools / ACA training vs COLLECT Seat module. Not peacock. Not a separate brand.
- **DP-02 Break it.** Empty paste and PDF upload are supposed to **REFUSE**. That is resilience, not a crash. Buttons on the Seat desk exercise the live path.
- **DP-03 Status Board fan-out.** **On merge to `main` / Pages hot, ping the Status Board** (Nathan lock). Fan-out: SU-SIB-1 Seat module live at `/seat/`. This README is the reminder; the page is not the board. Do the ping at merge. Do not skip it.

### Out of MVP

AMS write-back · auto-send · CFPB-approved claims · magnet/Seat Stripe · presenting Seat as a competing product

## Run locally

No build step. From this folder:

```bash
python3 -m http.server 8765
# open http://127.0.0.1:8765/
# Seat module desk: http://127.0.0.1:8765/seat/
```

## Pages

| File | Role |
|------|------|
| `index.html` | Landing: magnet hero, rails, Seat attach story, Book intro |
| `app.html` | Sample tool: paste / upload / sample to watermarked gap checklist |
| `seat/index.html` | Module desk: queue, blotter, HITL, PDF, Book intro |
| `styles.css` | Paper/ink editorial (LotBeacon / Both Sides family) |
| `checklist.js` | Shared Reg F heuristic + refuse verdict |
| `app.js` / `seat.js` | Sample vs Seat shells |
| `sample.js` | Synthetic letters (intentional gaps; no real PII) |

## Cite rails

- Checklist labels cite **12 CFR 1006.34** and **Appendix B Model Form B-1** via eCFR URLs
- Do **not** invent effective dates. Confirm current text on [eCFR part 1006](https://www.ecfr.gov/current/title-12/chapter-X/part-1006)
- Output = gap spotting with source labels, not a compliance determination

## Hard rails

- Not legal advice / not attorney–client
- Not “CFPB-approved” or “compliant letter”
- Not an AMS replacement (no write-back)
- Not auto-send / no consumer mail
- Seat **attaches** to the Pilot refuse-gate. It does not replace it.
- Magnet Stripe HOLD. Book intro / Calendly / mailto only.

## Publish

Live magnet: https://nathanplatteruser.github.io/collect-qa-magnet/

Seat module: https://nathanplatteruser.github.io/collect-qa-magnet/seat/

### Status Board fan-out (DP-03)

On merge (Pages hot): ping Status Board. SU-SIB-1 COLLECT QA Seat module live. Book intro. Magnet Stripe HOLD. Nathan lock. Do not treat a Pages deploy as complete until that fan-out happens.
