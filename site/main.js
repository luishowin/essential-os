// Essential OS, site behaviour.
// Small, dependency-free. Theme, year, and one restrained interaction demo.

(function () {
  "use strict";

  // ── Theme ──────────────────────────────────────────────────────────
  var root = document.documentElement;
  var toggle = document.getElementById("theme");
  var label = toggle && toggle.querySelector("[data-theme-label]");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (label) label.textContent = theme === "dark" ? "Light" : "Dark";
  }

  var stored = null;
  try { stored = localStorage.getItem("essential-theme"); } catch (e) { /* ignore */ }

  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    applyTheme("light");
  } else {
    applyTheme("dark");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("essential-theme", next); } catch (e) { /* ignore */ }
    });
  }

  // ── Year ───────────────────────────────────────────────────────────
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // ── Chapter pill ───────────────────────────────────────────────────
  // Bottom pill expands upward; minimises on item select, outside click,
  // or Escape. Pill label tracks the current chapter. No-JS falls back
  // to the noscript static list.
  (function () {
    document.documentElement.classList.add("js");
    var nav = document.getElementById("chapters");
    if (!nav) return;
    var btn = nav.querySelector(".chapters__toggle");
    var curNum = nav.querySelector("[data-current-num]");
    var curLabel = nav.querySelector("[data-current-label]");
    var links = Array.prototype.slice.call(
      nav.querySelectorAll("a[href^='#']")
    );
    if (!btn || !links.length) return;

    function open() {
      nav.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
    }
    function close(focusBtn) {
      if (!nav.classList.contains("is-open")) return;
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      if (focusBtn) btn.focus();
    }
    function toggle() {
      if (nav.classList.contains("is-open")) close(false);
      else open();
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggle();
    });
    links.forEach(function (a) {
      a.addEventListener("click", function () { close(false); });
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) close(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close(true);
    });

    // ── Active chapter + pill label ──────────────────────────────
    var byId = {};
    links.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var sections = Object.keys(byId)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;
    function setCurrent(id) {
      links.forEach(function (a) { a.removeAttribute("aria-current"); });
      var a = byId[id];
      if (!a) return;
      a.setAttribute("aria-current", "true");
      var num = a.querySelector(".ch__num");
      var lab = a.querySelector(".ch__label");
      if (num && curNum) curNum.textContent = num.textContent;
      if (lab && curLabel) curLabel.textContent = lab.textContent;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    sections.forEach(function (s) { obs.observe(s); });
  })();

  // ── The partial-input demo ─────────────────────────────────────────
  // "Actualise intents as fast as you can type." A design target, not a
  // claim about shipped behaviour. Speculation is shown; nothing commits.
  var typed = document.getElementById("demo-typed");
  var result = document.getElementById("demo-result");
  if (!typed || !result) return;

  var EXAMPLES = [
    { input: "enable dark mo", output: "Dark mode ON" },
    { input: "increase vol", output: "volume control" },
    { input: "enable do not", output: "DND ON" },
    { input: "send a text t", output: "composer appears · recipient resolved" }
  ];

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    typed.textContent = EXAMPLES[0].input + "…";
    result.textContent = "\u2192 " + EXAMPLES[0].output;
    return;
  }

  var index = 0;

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function type(text) {
    return new Promise(function (resolve) {
      var i = 0;
      (function step() {
        if (i <= text.length) {
          typed.textContent = text.slice(0, i);
          i += 1;
          setTimeout(step, 55 + Math.random() * 55);
        } else {
          typed.textContent = text + "\u2026";
          resolve();
        }
      })();
    });
  }

  function cycle() {
    var ex = EXAMPLES[index % EXAMPLES.length];
    index += 1;
    typed.textContent = "";
    result.style.opacity = "0";
    result.textContent = "";
    type(ex.input)
      .then(function () { return wait(420); })
      .then(function () {
        result.textContent = "\u2192 " + ex.output;
        result.style.opacity = "1";
        return wait(1900);
      })
      .then(function () {
        result.style.opacity = "0";
        return wait(450);
      })
      .then(function () {
        setTimeout(cycle, 350);
      });
  }

  // Start only when the demo is on screen.
  if ("IntersectionObserver" in window) {
    var seen = false;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !seen) {
          seen = true;
          obs.disconnect();
          cycle();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(document.getElementById("demo"));
  } else {
    cycle();
  }
})();

// ── The stack: small simulated panels ────────────────────────────────
// Illustrative only. Nothing here talks to a real system.
(function () {
  "use strict";
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function line(k, v, cls) {
    return '<div class="row-l"><span class="k">' + esc(k) + '</span><span class="' + (cls || "") + '">' + v + "</span></div>";
  }
  function bind(stage, attr, render) {
    var out = stage.querySelector(".stage__out");
    var chips = Array.prototype.slice.call(stage.querySelectorAll(".chip"));
    function pick(val) {
      chips.forEach(function (c) {
        var on = c.getAttribute(attr) === val;
        if (c.hasAttribute("aria-selected")) c.setAttribute("aria-selected", String(on));
        else c.setAttribute("aria-pressed", String(on));
      });
      out.innerHTML = render(val, out, function (v) { pick(v); });
      wire(out);
    }
    function wire(scope) {
      var btn = scope.querySelector("[data-commit]");
      if (btn) btn.addEventListener("click", function () {
        scope.querySelector("[data-state]").innerHTML = "committed (simulated)";
        btn.remove();
      });
    }
    chips.forEach(function (c) { c.addEventListener("click", function () { pick(c.getAttribute(attr)); }); });
    pick(chips[0].getAttribute(attr));
  }

  var sam = document.querySelector('[data-stage="sam"]');
  if (sam) bind(sam, "data-q", function (q) {
    var d = {
      mem:  line("answer", "Firefox 1.9 GB, Files 410 MB, Ida 96 MB") + line("source", "/proc/meminfo · process table", "dimline") + line("fresh", "2 s ago", "dimline"),
      wifi: line("answer", "Connected · home-5G · −52 dBm") + line("source", "NetworkManager", "dimline") + line("fresh", "1 s ago", "dimline"),
      file: line("answer", "~/Documents/Taxes/tax-2026.pdf") + line("source", "local file index", "dimline") + line("fresh", "indexed 6 min ago", "dimline"),
      poem: line("answer", "Outside this computer's domain. Handing off.") + line("source", "none: not guessed", "dimline") + line("to", "Ida, if present", "dimline")
    };
    return d[q];
  });

  var trust = document.querySelector('[data-stage="trust"]');
  if (trust) bind(trust, "data-a", function (a) {
    if (a === "read") return line("intent", "list today's events") + line("level", "read", "ok") + line("preview", "3 events") + hr() + line("result", "runs immediately", "ok");
    if (a === "modify") return line("intent", "move standup to 10:00") + line("level", "modify", "ok") + line("preview", "09:00 → 10:00") + hr() + line("state", '<span data-state>waiting for confirm</span>') + '<button class="stage__act" type="button" data-commit>Confirm</button>';
    return line("intent", "delete all notes") + line("level", "destructive", "ok") + line("preview", "412 notes affected") + hr() + line("state", '<span data-state>blocked: needs stronger authorisation</span>', "dimline") + line("note", "a partial phrase never executes this", "dimline");
    function hr() { return "<hr />"; }
  });

  var doors = document.querySelector('[data-stage="doors"]');
  if (doors) bind(doors, "data-d", function (d) {
    if (d === "human") return line("Today", "") + line("09:00", "Standup") + line("12:30", "Lunch with Amara") + line("15:00", "Design review");
    return line("request", "GET calendar/v1/events?day=today") + line("scope", "calendar.read · granted", "ok") + line("returns", "3 events, no pixels scraped") + line("write", "calendar.write · needs approval", "dimline");
  });

  var rec = document.querySelector('[data-stage="recover"]');
  if (rec) {
    var out = rec.querySelector(".stage__out");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function idle() {
      out.innerHTML = line("state", "healthy", "ok") + line("config", "essential.conf · rev 41", "dimline") +
        '<button class="stage__act stage__act--ghost" type="button" id="brk">Break something</button>';
      out.querySelector("#brk").addEventListener("click", broken);
    }
    function broken() {
      out.innerHTML = line("state", "desktop will not start") + line("cause", "an experiment removed the compositor", "dimline") +
        '<button class="stage__act" type="button" id="rb">Rebuild from config</button>';
      out.querySelector("#rb").addEventListener("click", rebuild);
    }
    function rebuild() {
      var steps = ["read essential.conf rev 41", "resolve pinned package sources", "reinstall 612 packages", "restore settings", "verify"];
      var i = 0; out.innerHTML = "";
      (function next() {
        if (i < steps.length) {
          out.insertAdjacentHTML("beforeend", line("✓", steps[i], "dimline")); i += 1;
          setTimeout(next, reduce ? 0 : 420);
        } else {
          out.insertAdjacentHTML("beforeend", line("state", "healthy again", "ok") + line("reminder", "documents and photos come from backups", "dimline") +
            '<button class="stage__act stage__act--ghost" type="button" id="rs">Reset</button>');
          out.querySelector("#rs").addEventListener("click", idle);
        }
      })();
    }
    idle();
  }
})();
