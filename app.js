(function () {
  "use strict";

  var ECFR_34 =
    "https://www.ecfr.gov/current/title-12/part-1006/section-1006.34";
  var ECFR_B =
    "https://www.ecfr.gov/current/title-12/appendix-Appendix%20B%20to%20Part%201006";
  var ECFR_18 =
    "https://www.ecfr.gov/current/title-12/part-1006/section-1006.18";

  /**
   * Checklist items framed from 12 CFR 1006.34(c) validation information
   * and Model Form B-1 safe-harbor framing (Appendix B). Heuristic only.
   * Cite labels point at eCFR generally — do not invent effective dates.
   */
  var CHECKS = [
    {
      id: "mini_miranda",
      title: "Debt-collector communication disclosure (mini-Miranda)",
      cite: "12 CFR 1006.34(c)(1) → 1006.18(e)",
      href: ECFR_18,
      patterns: [
        /attempt to collect a debt/i,
        /information obtained will be used for that purpose/i,
        /this is a communication from a debt collector/i,
      ],
      strength: "any",
    },
    {
      id: "collector_name_address",
      title: "Debt collector name + mailing address for disputes / original-creditor requests",
      cite: "12 CFR 1006.34(c)(2)(i)",
      href: ECFR_34,
      patterns: [
        /mailing address/i,
        /P\.?\s*O\.?\s*Box/i,
        /\d{1,5}\s+[A-Za-z].+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Way|Suite|Ste)\b/i,
        /(Suite|Ste\.?|Floor|Fl\.?)\s*\d+/i,
      ],
      requireAlso: [/recovery|collect|partners|group|llc|inc|agency|services/i],
      strength: "addressish",
    },
    {
      id: "consumer_name_address",
      title: "Consumer name and mailing address",
      cite: "12 CFR 1006.34(c)(2)(ii)",
      href: ECFR_34,
      patterns: [
        /\d{1,5}\s+[A-Za-z].+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Way)\b/i,
      ],
      strength: "any",
    },
    {
      id: "creditor_itemization_date",
      title: "Creditor name as of itemization date (consumer financial product/service debts)",
      cite: "12 CFR 1006.34(c)(2)(iii)",
      href: ECFR_34,
      patterns: [
        /creditor.*(as of|on the itemization)/i,
        /itemization date.*creditor/i,
        /name of the creditor to whom the debt was owed/i,
      ],
      strength: "any",
      weakPatterns: [/original creditor/i, /current creditor/i],
    },
    {
      id: "account_number",
      title: "Account number (or truncated) associated with the debt on the itemization date",
      cite: "12 CFR 1006.34(c)(2)(iv)",
      href: ECFR_34,
      patterns: [
        /account\s*(number|#|no\.?)[:\s]/i,
        /acct\.?\s*(#|no\.?)?[:\s]*[\dX*]{4,}/i,
        /\bXXXX[- ]?\d{4}\b/,
      ],
      strength: "any",
    },
    {
      id: "current_creditor",
      title: "Name of creditor to whom the debt currently is owed",
      cite: "12 CFR 1006.34(c)(2)(v)",
      href: ECFR_34,
      patterns: [
        /current creditor/i,
        /creditor to whom the debt currently/i,
        /debt is currently owed/i,
      ],
      strength: "any",
      weakPatterns: [/current creditor is/i],
    },
    {
      id: "itemization_date",
      title: "Itemization date",
      cite: "12 CFR 1006.34(c)(2)(vi) · (b)(3)",
      href: ECFR_34,
      patterns: [
        /itemization date/i,
        /as of\s+(the\s+)?(last statement|charge[- ]?off|last payment|transaction|judgment)\s+date/i,
        /charge[- ]?off date/i,
        /last statement date/i,
      ],
      strength: "any",
    },
    {
      id: "amount_on_itemization",
      title: "Amount of the debt on the itemization date",
      cite: "12 CFR 1006.34(c)(2)(vii)",
      href: ECFR_34,
      patterns: [
        /amount.*(itemization date|as of)/i,
        /on the itemization date[:\s]*\$?\s*[\d,]+/i,
      ],
      strength: "any",
    },
    {
      id: "itemization_table",
      title: "Itemization since itemization date (interest, fees, payments, credits)",
      cite: "12 CFR 1006.34(c)(2)(viii) · Model Form B-1 table framing",
      href: ECFR_B,
      patterns: [
        /interest/i,
        /fees?/i,
        /payments?/i,
        /credits?/i,
      ],
      strength: "itemization_bundle",
    },
    {
      id: "current_amount",
      title: "Current amount of the debt",
      cite: "12 CFR 1006.34(c)(2)(ix)",
      href: ECFR_34,
      patterns: [
        /current amount/i,
        /amount (now )?due/i,
        /balance due/i,
        /total (amount )?owed/i,
        /\$\s*[\d,]+\.\d{2}/,
      ],
      strength: "any",
    },
    {
      id: "dispute_rights",
      title: "Validation-period dispute / cease-collection statements with end date",
      cite: "12 CFR 1006.34(c)(3)(i)–(iii)",
      href: ECFR_34,
      patterns: [
        /validation period/i,
        /on or before/i,
        /dispute/i,
        /cease collection/i,
        /assume that the debt is valid/i,
        /verification of the debt/i,
      ],
      strength: "dispute_bundle",
    },
    {
      id: "cfpb_url",
      title: "CFPB debt-collection consumer-protection URL (when applicable)",
      cite: "12 CFR 1006.34(c)(3)(iv)",
      href: ECFR_34,
      patterns: [
        /cfpb\.gov\/debt-collection/i,
        /consumerfinance\.gov\/debt-collection/i,
        /www\.cfpb\.gov/i,
      ],
      strength: "any",
    },
    {
      id: "tearoff",
      title: "Consumer-response prompts (“How do you want to respond?” / dispute checkboxes)",
      cite: "12 CFR 1006.34(c)(4) · Model Form B-1 tear-off framing",
      href: ECFR_B,
      patterns: [
        /how do you want to respond/i,
        /check all that apply/i,
        /i want to dispute the debt/i,
        /this is not my debt/i,
        /the amount is wrong/i,
        /send me the name and address of the original creditor/i,
      ],
      strength: "tearoff_bundle",
    },
  ];

  var noticeEl = document.getElementById("notice");
  var reportEl = document.getElementById("report");
  var btnRun = document.getElementById("btn-run");
  var btnSample = document.getElementById("btn-sample");
  var btnClear = document.getElementById("btn-clear");

  function normalize(text) {
    return (text || "").replace(/\r\n/g, "\n");
  }

  function countMatches(text, patterns) {
    var n = 0;
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i].test(text)) n++;
    }
    return n;
  }

  function evaluate(check, text) {
    var hits = countMatches(text, check.patterns);
    var status = "missing";
    var note = "Not clearly detected in pasted text.";

    if (check.strength === "any") {
      if (hits >= 1) {
        status = "found";
        note = "Signal detected for this checklist row.";
      } else if (check.weakPatterns && countMatches(text, check.weakPatterns) >= 1) {
        status = "weak";
        note = "Partial / weak signal only — review against cite.";
      }
    } else if (check.strength === "addressish") {
      if (hits >= 1) {
        status = "weak";
        note = "Address-like text found; confirm collector mailing address for disputes is explicit.";
      }
      // Sample intentionally weak on street for collector HQ
    } else if (check.strength === "itemization_bundle") {
      if (hits >= 3) {
        status = "found";
        note = "Multiple itemization categories mentioned.";
      } else if (hits >= 1) {
        status = "weak";
        note = "Only partial interest/fees/payments/credits language — Model Form B-1 uses a full table.";
      }
    } else if (check.strength === "dispute_bundle") {
      if (hits >= 3) {
        status = "found";
        note = "Several validation-period protection phrases detected.";
      } else if (hits >= 1) {
        status = "weak";
        note = "Dispute mentioned, but full (c)(3) end-date / cease / assume-valid framing not clearly present.";
      }
    } else if (check.strength === "tearoff_bundle") {
      if (hits >= 2) {
        status = "found";
        note = "Consumer-response prompt language detected.";
      } else if (hits >= 1) {
        status = "weak";
        note = "Incomplete tear-off / response prompt set vs Model Form B-1 framing.";
      }
    }

    // Special: current creditor — sample has "current creditor is" which is weakPatterns path via main
    if (check.id === "current_creditor" && /current creditor is/i.test(text) && status === "missing") {
      status = "weak";
      note = "Mentions current creditor; confirm exact (c)(2)(v) labeling.";
    }
    if (check.id === "current_creditor" && /current creditor is/i.test(text)) {
      status = status === "missing" ? "weak" : status;
      if (status === "weak") note = "Mentions current creditor; confirm exact (c)(2)(v) labeling.";
      if (/current creditor is/i.test(text) && hits === 0) {
        status = "found";
        note = "Current-creditor naming detected.";
      }
    }

    return { status: status, note: note, hits: hits };
  }

  function render(results, meta) {
    var gaps = 0;
    var weak = 0;
    var ok = 0;
    results.forEach(function (r) {
      if (r.status === "missing") gaps++;
      else if (r.status === "weak") weak++;
      else ok++;
    });

    var html = "";
    html += '<div class="watermark" aria-hidden="true"><span>DEMO · SAMPLE</span></div>';
    html += '<div class="report-body">';
    html += '<div class="report-head">';
    html += "<div><strong>Gap checklist report</strong>";
    html += '<div class="report-meta">Watermarked demo · heuristic · not legal advice</div></div>';
    html += '<div class="report-meta">' + meta + "</div>";
    html += "</div>";
    html += '<div class="score-row">';
    html += '<span class="chip gap">' + gaps + " gaps</span>";
    html += '<span class="chip warn">' + weak + " weak</span>";
    html += '<span class="chip ok">' + ok + " found</span>";
    html += "</div>";
    html += '<ul class="check-list">';
    results.forEach(function (r) {
      var label =
        r.status === "missing" ? "Gap" : r.status === "weak" ? "Weak" : "Found";
      var cls =
        r.status === "missing" ? "missing" : r.status === "weak" ? "weak" : "found";
      html += "<li>";
      html += '<div class="check-status ' + cls + '">' + label + "</div>";
      html += "<div><strong>" + r.title + "</strong></div>";
      html += '<div class="small muted">' + r.note + "</div>";
      html +=
        '<div class="check-cite"><a href="' +
        r.href +
        '" target="_blank" rel="noopener">' +
        r.cite +
        "</a> · eCFR (confirm current text)</div>";
      html += "</li>";
    });
    html += "</ul>";
    html += '<div class="unlock-cta">';
    html += '<div class="eyebrow" style="margin:0 0 0.35rem">Unlock clean pack</div>';
    html += '<div class="amount">$19–49</div>';
    html +=
      '<p class="small muted" style="margin:0.4rem 0 0.85rem">Stranger checkout path: mailto settle tonight. Stripe Payment Link placeholder until keys exist. Kill: no checkout by day 7 → freeze magnet.</p>';
    html +=
      '<div class="btn-row" style="margin:0">';
    html +=
      '<a class="btn" href="mailto:settleupcollections@polsia.app?subject=COLLECT%20QA%20pack%20%28%2419%E2%80%9349%29&body=I%20ran%20the%20demo%20checklist%20and%20want%20a%20paid%20pack%20report.">Checkout via email</a>';
    html +=
      '<a class="btn btn-ghost" href="https://buy.stripe.com/test_collect_qa_pack" title="Placeholder — not live">Stripe placeholder</a>';
    html += "</div></div>";
    html += "</div>";

    reportEl.className = "report demo-mode";
    reportEl.innerHTML = html;
  }

  function run() {
    var text = normalize(noticeEl.value);
    if (!text.trim()) {
      reportEl.className = "report empty demo-mode";
      reportEl.innerHTML = "<span>Paste notice text or load the sample first.</span>";
      return;
    }
    var results = CHECKS.map(function (c) {
      var ev = evaluate(c, text);
      return {
        id: c.id,
        title: c.title,
        cite: c.cite,
        href: c.href,
        status: ev.status,
        note: ev.note,
      };
    });
    var when = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "medium",
      timeStyle: "short",
    });
    render(results, when + " CT · client-side only");
  }

  function loadSample() {
    noticeEl.value = window.COLLECT_QA_SAMPLE || "";
    run();
  }

  btnRun.addEventListener("click", run);
  btnSample.addEventListener("click", loadSample);
  btnClear.addEventListener("click", function () {
    noticeEl.value = "";
    reportEl.className = "report empty demo-mode";
    reportEl.innerHTML = "<span>Run the checklist to see cited gaps.</span>";
  });

  var params = new URLSearchParams(window.location.search);
  if (params.get("sample") === "1") {
    loadSample();
  }
})();
