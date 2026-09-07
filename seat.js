(function () {
  "use strict";

  var engine = window.COLLECT_QA;
  var desk = window.COLLECT_QA_DESK || [];
  var noticeEl = document.getElementById("notice");
  var reportEl = document.getElementById("report");
  var queueEl = document.getElementById("queue");
  var fileEl = document.getElementById("notice-file");
  var hitlEl = document.getElementById("hitl");
  var btnRun = document.getElementById("btn-run");
  var btnClear = document.getElementById("btn-clear");
  var btnPrint = document.getElementById("btn-print");
  var btnBreakEmpty = document.getElementById("btn-break-empty");
  var btnBreakPdf = document.getElementById("btn-break-pdf");
  var docketEl = document.getElementById("docket-label");

  var PILOT = "https://buy.stripe.com/dRm00j0GG53F8dVfO17Vm03";
  var PACK_MAIL =
    "mailto:nathanplatter@gmail.com?subject=COLLECT%20QA%20pack%20%2429&body=I%20want%20a%20COLLECT%20QA%20pack%20(%2429).%0A%0ANot%20legal%20advice%20requested.";
  var SEAT_MAIL =
    "mailto:nathanplatter@gmail.com?subject=COLLECT%20QA%20Seat%20%24249%2Fmo&body=I%20want%20to%20attach%20COLLECT%20QA%20Seat%20(%24249%2Fmo%20validation%20hygiene%20module)%20to%20SettleUp%20Pilot.%0A%0ACompany%3A%20%0AContact%3A%20";

  var activeId = "";
  var lastResults = [];
  var held = {};

  function normalize(text) {
    return (text || "").replace(/\r\n/g, "\n");
  }

  function setDocket(label) {
    if (docketEl) docketEl.textContent = label || "Paste / upload";
  }

  function renderQueue() {
    if (!queueEl) return;
    var html = "";
    desk.forEach(function (item) {
      var pressed = item.id === activeId ? "true" : "false";
      html +=
        '<button type="button" class="queue-slip" data-id="' +
        item.id +
        '" aria-pressed="' +
        pressed +
        '">';
      html += '<span class="queue-docket">' + item.docket + "</span>";
      html += "<strong>" + item.label + "</strong>";
      html += '<span class="small muted">' + item.hint + "</span>";
      html += "</button>";
    });
    html +=
      '<button type="button" class="queue-slip" data-id="custom" aria-pressed="' +
      (activeId === "custom" ? "true" : "false") +
      '">';
    html += '<span class="queue-docket">CUSTOM</span>';
    html += "<strong>Paste or upload your draft</strong>";
    html += '<span class="small muted">Text only. PDF is refused — we do not parse binaries.</span>';
    html += "</button>";
    queueEl.innerHTML = html;
  }

  function exceptions(results) {
    return (results || []).filter(function (r) {
      return r.status !== "found";
    });
  }

  function renderHitl(results, verdict) {
    if (!hitlEl) return;
    var rows = exceptions(results);
    var html = "";
    if (!results.length && !verdict) {
      hitlEl.innerHTML =
        '<p class="small muted" style="margin:0">No exceptions yet. Run a slip — missing facts become a human hold, not an invented fill.</p>';
      return;
    }
    if (verdict) {
      html +=
        '<div class="hitl-verdict kind-' +
        verdict.kind +
        '"><strong>' +
        verdict.stamp +
        "</strong> · " +
        verdict.why +
        "</div>";
    }
    if (!rows.length) {
      html += '<p class="small muted">No open exceptions on this slip. Human still owns send risk.</p>';
      hitlEl.innerHTML = html;
      return;
    }
    html += "<ol class=\"hitl-list\">";
    rows.forEach(function (r) {
      var checked = held[r.id] ? " checked" : "";
      html += "<li>";
      html +=
        '<label class="hitl-row"><input type="checkbox" data-hold="' +
        r.id +
        '"' +
        checked +
        " />";
      html +=
        "<span><strong>" +
        (r.status === "missing" ? "GAP" : "WEAK") +
        " · " +
        r.title +
        "</strong>";
      html +=
        '<span class="small muted" style="display:block">' +
        r.note +
        ' · <a href="' +
        r.href +
        '" target="_blank" rel="noopener">' +
        r.cite +
        "</a></span></span></label>";
      html += "</li>";
    });
    html += "</ol>";
    html +=
      '<p class="small muted" style="margin:0.75rem 0 0">Check = noted by a human. No AMS write-back. No auto-send.</p>';
    hitlEl.innerHTML = html;
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

  function aisleHtml() {
    return (
      '<div class="cta-aisle no-print">' +
      '<div class="eyebrow" style="margin:0 0 0.35rem">CQ-04 · add-on module · Pilot aisle</div>' +
      "<p class=\"small muted\" style=\"margin:0 0 0.75rem\">Primary: add this hygiene module to SettleUp Pilot. Seat inquiry is optional. Pack $29 is mailto (magnet Stripe HOLD).</p>" +
      '<div class="btn-row" style="margin:0">' +
      '<a class="btn" href="' +
      PILOT +
      '" target="_blank" rel="noopener noreferrer">Add to Pilot aisle · $499</a>' +
      '<a class="btn btn-ghost" href="' +
      SEAT_MAIL +
      '">Seat $249/mo (mailto)</a>' +
      '<a class="btn btn-ghost" href="' +
      PACK_MAIL +
      '">Pack $29 (mailto)</a>' +
      "</div></div>"
    );
  }

  function renderReport(results, verdict, meta) {
    lastResults = results;
    var sc = engine ? engine.score(results) : { gaps: 0, weak: 0, ok: 0 };
    var html = "";
    html += '<div class="report-body">';
    html += '<div class="report-head">';
    html += "<div><strong>Seat blotter · itemization / validation hygiene</strong>";
    html +=
      '<div class="report-meta">Heuristic · not legal advice · attaches to Pilot refuse-gate</div></div>';
    html += '<div class="report-meta">' + meta + "</div>";
    html += "</div>";
    if (verdict) {
      html +=
        '<div class="refuse-stamp kind-' +
        verdict.kind +
        '" role="status"><span>' +
        verdict.stamp +
        "</span><p>" +
        verdict.why +
        "</p></div>";
    }
    if (results.length) {
      html += '<div class="score-row">';
      html += '<span class="chip gap">' + sc.gaps + " gaps</span>";
      html += '<span class="chip warn">' + sc.weak + " weak</span>";
      html += '<span class="chip ok">' + sc.ok + " found</span>";
      html += "</div>";
      html += renderRows(results);
    }
    html += aisleHtml();
    html += "</div>";
    reportEl.className = "report seat-report";
    reportEl.innerHTML = html;
    renderHitl(results, verdict);
  }

  function refuseOnly(message) {
    lastResults = [];
    renderReport(
      [],
      { kind: "refuse", stamp: "REFUSE", why: message },
      "client-side · no invented facts"
    );
  }

  function run() {
    if (!engine) {
      refuseOnly("Checklist engine failed to load. Refresh and try again.");
      return;
    }
    var text = normalize(noticeEl.value);
    if (!text.trim()) {
      refuseOnly("DP-02 · empty paste refused. Load a queue slip, paste, or upload .txt — we will not invent a blotter. The desk held. That is resilience, not a crash.");
      return;
    }
    var results = engine.runChecks(text);
    var v = engine.verdict(text, results);
    var when = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "medium",
      timeStyle: "short",
    });
    renderReport(results, v, when + " CT · client-side only");
  }

  function loadItem(id) {
    activeId = id;
    held = {};
    renderQueue();
    if (id === "custom") {
      noticeEl.value = "";
      setDocket("Paste / upload");
      refuseOnly("Custom slip is empty. Paste or upload a .txt draft. PDF is refused.");
      noticeEl.focus();
      return;
    }
    var item = null;
    for (var i = 0; i < desk.length; i++) {
      if (desk[i].id === id) item = desk[i];
    }
    if (!item) return;
    noticeEl.value = item.text;
    setDocket(item.docket + " · " + item.label);
    run();
  }

  function readUpload(file) {
    if (!file) return;
    var name = file.name || "";
    var type = file.type || "";
    activeId = "custom";
    setDocket("Upload · " + name);
    renderQueue();
    if (/\.pdf$/i.test(name) || type === "application/pdf") {
      noticeEl.value = "";
      refuseOnly("DP-02 · PDF refused. Not parsed in this MVP (CQ-01). Paste text or upload .txt — refuse over hallucinate. The desk held. That is resilience, not a crash.");
      return;
    }
    var okType = /^text\//.test(type) || type === "";
    var okName = /\.(txt|text|md|html|htm|csv)$/i.test(name);
    if (!okType && !okName) {
      noticeEl.value = "";
      refuseOnly("This file type is not read here. Upload a .txt notice draft, or paste the text.");
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      noticeEl.value = String(reader.result || "");
      run();
    };
    reader.onerror = function () {
      refuseOnly("Could not read that file. Paste the notice text instead.");
    };
    reader.readAsText(file);
  }

  renderQueue();
  if (queueEl) {
    queueEl.addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-id]");
      if (!btn) return;
      loadItem(btn.getAttribute("data-id"));
    });
  }
  if (hitlEl) {
    hitlEl.addEventListener("change", function (ev) {
      var box = ev.target;
      if (!box || !box.getAttribute("data-hold")) return;
      held[box.getAttribute("data-hold")] = box.checked;
    });
  }
  btnRun.addEventListener("click", function () {
    if (activeId !== "custom" && activeId) {
      /* keep docket */
    } else {
      activeId = "custom";
      renderQueue();
      setDocket("Paste / upload");
    }
    run();
  });
  btnClear.addEventListener("click", function () {
    noticeEl.value = "";
    if (fileEl) fileEl.value = "";
    activeId = "";
    lastResults = [];
    held = {};
    setDocket("Paste / upload");
    renderQueue();
    reportEl.className = "report empty seat-report";
    reportEl.innerHTML = "<span>Load a queue slip or paste a draft. Missing facts print as REFUSE / GAP — not as filled-in copy.</span>";
    renderHitl([], null);
  });
  if (fileEl) {
    fileEl.addEventListener("change", function () {
      readUpload(fileEl.files && fileEl.files[0]);
    });
  }
  if (btnPrint) {
    btnPrint.addEventListener("click", function () {
      window.print();
    });
  }

  function showBlotter() {
    var blotter = document.getElementById("report");
    if (blotter && blotter.scrollIntoView) {
      blotter.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function breakEmpty() {
    noticeEl.value = "";
    if (fileEl) fileEl.value = "";
    activeId = "custom";
    held = {};
    setDocket("DP-02 · empty paste");
    renderQueue();
    run();
    showBlotter();
  }

  function breakPdf() {
    noticeEl.value = "";
    if (fileEl) fileEl.value = "";
    activeId = "custom";
    held = {};
    setDocket("DP-02 · break.pdf");
    renderQueue();
    refuseOnly(
      "DP-02 · PDF refused. Not parsed in this MVP (CQ-01). Paste text or upload .txt — refuse over hallucinate. The desk held. That is resilience, not a crash."
    );
    showBlotter();
  }

  if (btnBreakEmpty) btnBreakEmpty.addEventListener("click", breakEmpty);
  if (btnBreakPdf) btnBreakPdf.addEventListener("click", breakPdf);

  var params = new URLSearchParams(window.location.search);
  var slip = params.get("slip") || params.get("sample");
  var brk = params.get("break");
  if (brk === "empty") breakEmpty();
  else if (brk === "pdf") breakPdf();
  else if (slip === "1" || slip === "gappy") loadItem("gappy");
  else if (slip === "thin") loadItem("thin");
  else if (slip === "itemization") loadItem("itemization");
})();
