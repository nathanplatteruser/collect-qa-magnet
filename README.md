# COLLECT QA — lead-magnet MVP (static)

**TAIL / COLLECT** · Sassy Tail overnight probe · funnel toward SettleUp Collections (Level-4).

Cited checklist gap report for debt-collection **validation notice** drafts, framed against public Reg&nbsp;F sources (12&nbsp;CFR&nbsp;1006.34 / Model Form&nbsp;B-1). **Not legal advice. Not a compliant-letter product.**

## Local path

```
/workspace/sassy-tail-overnight/collect-qa/
```

## Run locally

No build step. From this folder:

```bash
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

Or open `index.html` / `app.html` directly in a browser.

## Pages

| File | Role |
|------|------|
| `index.html` | Landing — pitch, rails, sample CTA, $19–49 checkout path |
| `app.html` | Tool — paste / sample → watermarked gap checklist |
| `styles.css` | Paper/ink editorial (LotBeacon / Both Sides family) |
| `app.js` | Heuristic checklist vs Reg F framing |
| `sample.js` | Synthetic letter (intentional gaps; no real PII) |

## Checkout path (stranger)

- **Working tonight:** mailto `settleupcollections@polsia.app` (pack $19–49)
- **Stripe prep:** placeholder `https://buy.stripe.com/test_collect_qa_pack` — replace with live Payment Link when keys exist (no live Stripe keys in repo)
- **Kill:** no stranger checkout by day 7 → freeze magnet

## Cite rails

- Checklist labels cite **12 CFR 1006.34** and **Appendix B Model Form B-1** via eCFR URLs
- Do **not** invent effective dates — confirm current text on [eCFR part 1006](https://www.ecfr.gov/current/title-12/chapter-X/part-1006)
- Output = gap spotting with source labels, not a compliance determination

## Hard rails

- Not legal advice / not attorney–client
- Not “CFPB-approved” or “compliant letter”
- No autodial / skip-trace
- No SettleUp rebuild / no sending consumer mail
- No LLC/domain theater in this magnet

## Publish to GitHub Pages

If `gh` is auth’d as `nathanplatteruser`:

```bash
cd /workspace/sassy-tail-overnight/collect-qa
gh repo create collect-qa-magnet --public --source=. --remote=origin --push \
  --description "COLLECT QA lead magnet — Reg F checklist sample (not legal advice)"
gh api repos/nathanplatteruser/collect-qa-magnet/pages -X POST \
  -f build_type=legacy \
  -f source[branch]=main \
  -f 'source[path]=/'
```

Live URL (after Pages builds):

```
https://nathanplatteruser.github.io/collect-qa-magnet/
```

Manual fallback:

```bash
git init
git add .
git commit -m "COLLECT QA magnet MVP — sample + mailto checkout"
gh repo create collect-qa-magnet --public --source=. --remote=origin --push
# then enable Pages: Settings → Pages → Deploy from branch main / root
```

## Denver / CoS note

Denver narrative = SettleUp Level-4 + this one magnet. Do not start SERVICE/TITLE demos until COLLECT sample + checkout path is filed.
