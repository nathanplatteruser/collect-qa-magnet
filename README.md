# COLLECT QA — lead-magnet MVP + Seat module (SU-SIB-1)

**TAIL / COLLECT** · SettleUp suite **add-on module** · attaches to SettleUp Pilot (Level-4).

Cited checklist gap report for debt-collection **validation notice** drafts, framed against public Reg&nbsp;F sources (12&nbsp;CFR&nbsp;1006.34 / Model Form&nbsp;B-1). **Not legal advice. Not a compliant-letter product.**

**48h Denver framing:** siblings are SettleUp suite modules (add-to-cart) first; optional standalone second. Convergence over purity.

Pain = **outbound validation-notice / itemization hygiene**, attached to the Pilot refuse-gate. Seat does not replace Pilot.

## SU-SIB-1 — Seat as Pilot add-on

Monthly **Seat** desk at [`/seat/`](https://nathanplatteruser.github.io/collect-qa-magnet/seat/) (GitHub Pages path). Paper/ink blotter matching this magnet. HITL on exceptions. Loud **REFUSE** / GAP when facts are missing (refuse-over-hallucinate).

The Seat **surface is the module-attach story**. Primary CTA is add-to-cart on the Pilot aisle. Seat mailto is optional inquiry. Pack magnet stays the $29 funnel.

| SKU | Role | Checkout |
|-----|------|----------|
| Pack **$29** | Magnet funnel | mailto `settleupcollections@polsia.app` — magnet Stripe **HOLD** |
| Seat **$249/mo** | Optional add-on module (band was $199–399) | mailto inquiry — not a competing product |
| SettleUp Pilot **$499** | Primary aisle / add-to-cart | live [Pilot Payment Link](https://buy.stripe.com/dRm00j0GG53F8dVfO17Vm03) |

**Magnet Stripe HOLD** on the $29 pack. No COLLECT pack or Seat Payment Link. Live Stripe is Pilot only.

### Soft ROI (pricing block only — labeled assumption, not a kill claim)

- Seat ROT: 6h × $65/hr = $390 desk time vs $249/mo → about **1.6×**
- A **3×** claim only if about **12h/month** are actually saved
- Do not put ROI multipliers in the magnet hero or Seat lede

### MVP Eng tickets

- **CQ-01** upload — paste or `.txt` (PDF refused; we do not parse binaries)
- **CQ-02** checklist UI — cited Reg F gaps
- **CQ-03** HITL exception tray + print/PDF export
- **CQ-04** CTAs — pack mailto / seat module inquiry / Pilot Stripe (primary)

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
| `index.html` | Landing — magnet hero, rails, Seat attach story, SKUs |
| `app.html` | Pack tool — paste / upload / sample → watermarked gap checklist |
| `seat/index.html` | Module desk — queue, blotter, HITL, PDF, Pilot add-to-cart |
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
- Seat **attaches** to the Pilot refuse-gate — does not replace it
- Magnet Stripe HOLD on pack (Pilot link is the only live Stripe)

## Publish

Live magnet: https://nathanplatteruser.github.io/collect-qa-magnet/

Seat module: https://nathanplatteruser.github.io/collect-qa-magnet/seat/
