# COLLECT QA — lead-magnet MVP + Seat (SU-SIB-1)

**TAIL / COLLECT** · SettleUp suite sibling · funnel toward SettleUp Collections (Level-4).

Cited checklist gap report for debt-collection **validation notice** drafts, framed against public Reg&nbsp;F sources (12&nbsp;CFR&nbsp;1006.34 / Model Form&nbsp;B-1). **Not legal advice. Not a compliant-letter product.**

Pain = **outbound validation-notice / itemization hygiene**. Not the SettleUp inbound dispute-letter refuse-gate.

## SU-SIB-1 — Seat productization

Monthly **Seat** desk at [`/seat/`](https://nathanplatteruser.github.io/collect-qa-magnet/seat/) (GitHub Pages path). Paper/ink blotter matching this magnet. HITL on exceptions. Loud **REFUSE** / GAP when facts are missing (refuse-over-hallucinate).

| SKU | Path | Checkout |
|-----|------|----------|
| Pack **$29** | Magnet funnel | mailto `settleupcollections@polsia.app` |
| Seat **$249/mo** | Suite module (band was $199–399; feature $249) | mailto inquiry — sibling Stripe **HOLD** |
| SettleUp Pilot **$499** | Handoff / add-to-cart aisle | live [Pilot Payment Link](https://buy.stripe.com/dRm00j0GG53F8dVfO17Vm03) |

**Sibling Stripe HOLD.** No COLLECT pack or Seat Payment Link. Every paid CTA closes on Pilot Stripe.

### Soft ROI (labeled assumption only — not a kill claim)

- Seat ROT: 6h × $65/hr = $390 desk time vs $249/mo → about **1.6×**
- A **3×** claim only if about **12h/month** are actually saved

### MVP Eng tickets

- **CQ-01** upload — paste or `.txt` (PDF refused; we do not parse binaries)
- **CQ-02** checklist UI — cited Reg F gaps
- **CQ-03** HITL exception tray + print/PDF export
- **CQ-04** CTAs — pack mailto / seat mailto / Pilot Stripe

### Out of MVP

AMS write-back · auto-send · CFPB-approved claims · magnet/Seat Stripe

## Run locally

No build step. From this folder:

```bash
python3 -m http.server 8765
# open http://127.0.0.1:8765/
# Seat desk: http://127.0.0.1:8765/seat/
```

## Pages

| File | Role |
|------|------|
| `index.html` | Landing — magnet hero, rails, Seat module, SKUs |
| `app.html` | Pack tool — paste / upload / sample → watermarked gap checklist |
| `seat/index.html` | Monthly Seat desk — queue, blotter, HITL, PDF |
| `styles.css` | Paper/ink editorial (LotBeacon / Both Sides family) |
| `checklist.js` | Shared Reg F heuristic + refuse verdict |
| `app.js` / `seat.js` | Pack vs Seat shells |
| `sample.js` | Synthetic letters (intentional gaps; no real PII) |

## Cite rails

- Checklist labels cite **12 CFR 1006.34** and **Appendix B Model Form B-1** via eCFR URLs
- Do **not** invent effective dates — confirm current text on [eCFR part 1006](https://www.ecfr.gov/current/title-12/chapter-X/part-1006)
- Output = gap spotting with source labels, not a compliance determination

## Hard rails

- Not legal advice / not attorney–client
- Not “CFPB-approved” or “compliant letter”
- Not an AMS replacement (no write-back)
- Not auto-send / no consumer mail
- Not the SettleUp dispute-letter gate
- Sibling Stripe HOLD (Pilot link is the only live Stripe)

## Publish

Live magnet: https://nathanplatteruser.github.io/collect-qa-magnet/

Seat: https://nathanplatteruser.github.io/collect-qa-magnet/seat/
