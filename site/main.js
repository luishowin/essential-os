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
    }
    function close(focusBtn) {
      if (!nav.classList.contains("is-open")) return;
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
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
