(function () {
  "use strict";

  var engine = window.COLLECT_QA;
  var noticeEl = document.getElementById("notice");
  var reportEl = document.getElementById("report");
  var btnRun = document.getElementById("btn-run");
  var btnSample = document.getElementById("btn-sample");
  var btnClear = document.getElementById("btn-clear");
  var fileEl = document.getElementById("notice-file");

  var PACK_MAIL =
    "mailto:nathanplatter@gmail.com?subject=COLLECT%20QA%20pack%20%2429&body=I%20ran%20the%20demo%20checklist%20and%20want%20a%20paid%20pack%20report%20(%2429).%0A%0ANot%20legal%20advice%20requested.";
  var SEAT_MAIL =
    "mailto:nathanplatter@gmail.com?subject=COLLECT%20QA%20seat%20%24249%2Fmo&body=I%20want%20the%20COLLECT%20QA%20seat%20at%20%24249%2Fmo.%0A%0ACompany%3A%20%0AContact%3A%20%0A%0ANot%20legal%20advice%20requested.%20Human%20owns%20Send.";

  function normalize(text) {
    return (text || "").replace(/\r\n/g, "\n");
  }

  function aisleHtml() {
    var html = "";
    html += '<div class="cta-aisle">';
    html += '<div class="eyebrow" style="margin:0 0 0.35rem">CQ-04 · sample pack · COLLECT QA seat</div>';
    html += '<div class="amount">COLLECT QA seat $249/mo</div>';
    html +=
      '<p class="small muted" style="margin:0.4rem 0 0.85rem">The $29 pack is the sample (mailto · Stripe <strong>HOLD</strong>). The ask is the COLLECT QA seat. Not legal advice. Human owns Send.</p>';
    html += '<div class="btn-row" style="margin:0">';
    html += '<a class="btn" href="' + SEAT_MAIL + '">COLLECT QA seat · $249/mo</a>';
    html += '<a class="btn btn-ghost" href="' + PACK_MAIL + '">Pack $29 sample</a>';
    html += "</div></div>";
    return html;
  }

  function renderRows(results) {
    var html = '<ul class="check-list">';
    results.forEach(function (r) {
      var label = r.status === "missing" ? "Gap" : r.status === "weak" ? "Weak" : "Found";
      var cls = r.status === "missing" ? "missing" : r.status === "weak" ? "weak" : "found";
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
    return html;
  }

  function render(results, meta, verdict) {
    var sc = engine.score(results);
    var html = "";
    html += '<div class="watermark" aria-hidden="true"><span>DEMO · SAMPLE</span></div>';
    html += '<div class="report-body">';
    html += '<div class="report-head">';
    html += "<div><strong>Gap checklist report</strong>";
    html += '<div class="report-meta">Watermarked demo · heuristic · not legal advice</div></div>';
    html += '<div class="report-meta">' + meta + "</div>";
    html += "</div>";
    if (verdict && verdict.kind === "refuse") {
      html +=
        '<div class="refuse-stamp" role="status"><span>' +
        verdict.stamp +
        "</span><p>" +
        verdict.why +
        "</p></div>";
    }
    html += '<div class="score-row">';
    html += '<span class="chip gap">' + sc.gaps + " gaps</span>";
    html += '<span class="chip warn">' + sc.weak + " weak</span>";
    html += '<span class="chip ok">' + sc.ok + " found</span>";
    html += "</div>";
    html += renderRows(results);
    html +=
      '<div class="toolbar no-print" style="margin-top:1rem"><button type="button" class="btn btn-ghost" id="btn-print">Export PDF</button></div>';
    html += aisleHtml();
    html += "</div>";

    reportEl.className = "report demo-mode";
    reportEl.innerHTML = html;
    var printBtn = document.getElementById("btn-print");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        window.print();
      });
    }
  }

  function refuseEmpty(message) {
    reportEl.className = "report demo-mode";
    reportEl.innerHTML =
      '<div class="report-body"><div class="refuse-stamp" role="status"><span>REFUSE</span><p>' +
      message +
      "</p></div>" +
      aisleHtml() +
      "</div>";
  }

  function run() {
    if (!engine) {
      refuseEmpty("Checklist engine failed to load. Refresh and try again.");
      return;
    }
    var text = normalize(noticeEl.value);
    if (!text.trim()) {
      refuseEmpty("No notice text. Paste, upload a .txt, or load the sample — we will not invent a report.");
      return;
    }
    var results = engine.runChecks(text);
    var v = engine.verdict(text, results);
    var when = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "medium",
      timeStyle: "short",
    });
    render(results, when + " CT · client-side only", v);
  }

  function loadSample() {
    noticeEl.value = window.COLLECT_QA_SAMPLE || "";
    run();
  }

  function readUpload(file) {
    if (!file) return;
    var name = file.name || "";
    var type = file.type || "";
    if (/\.pdf$/i.test(name) || type === "application/pdf") {
      noticeEl.value = "";
      refuseEmpty(
        "PDF is not parsed in this MVP (CQ-01). Paste text or upload .txt — refuse over hallucinate."
      );
      return;
    }
    var okType = /^text\//.test(type) || type === "";
    var okName = /\.(txt|text|md|html|htm|csv)$/i.test(name);
    if (!okType && !okName) {
      noticeEl.value = "";
      refuseEmpty("This file type is not read here. Upload a .txt notice draft, or paste the text.");
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      noticeEl.value = String(reader.result || "");
      run();
    };
    reader.onerror = function () {
      refuseEmpty("Could not read that file. Paste the notice text instead.");
    };
    reader.readAsText(file);
  }

  btnRun.addEventListener("click", run);
  btnSample.addEventListener("click", loadSample);
  btnClear.addEventListener("click", function () {
    noticeEl.value = "";
    if (fileEl) fileEl.value = "";
    reportEl.className = "report empty demo-mode";
    reportEl.innerHTML = "<span>Run the checklist to see cited gaps.</span>";
  });
  if (fileEl) {
    fileEl.addEventListener("change", function () {
      readUpload(fileEl.files && fileEl.files[0]);
    });
  }

  var params = new URLSearchParams(window.location.search);
  if (params.get("sample") === "1") {
    loadSample();
  }
})();
