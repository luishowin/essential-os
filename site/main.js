// Essential OS — site behaviour.
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
