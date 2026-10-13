// Cosmic starfield — two fixed layers of drifting, twinkling stars
// rendered behind all content. Purely decorative (aria-hidden).
// Styling lives in main.css (.starfield).
(function () {
  "use strict";
  if (window.__cosmicStarfield) return;
  window.__cosmicStarfield = true;

  function starCount() {
    // ~1 star per 12000 px², clamped so phones and 4K screens stay sane
    var area = window.innerWidth * window.innerHeight;
    return Math.max(40, Math.min(Math.round(area / 12000), 220));
  }

  function makeLayer(className, count) {
    var layer = document.createElement("div");
    layer.className = className;
    for (var i = 0; i < count; i++) {
      var star = document.createElement("div");
      star.className = "star" + (Math.random() < 0.15 ? " big" : "");
      star.style.left = (Math.random() * 100).toFixed(2) + "%";
      star.style.top = (Math.random() * 100).toFixed(2) + "%";
      // negative delay = start mid-animation so stars never blink in sync
      star.style.animationDelay = (-Math.random() * 4).toFixed(2) + "s";
      star.style.animationDuration = (3.5 + Math.random() * 4).toFixed(2) + "s";
      layer.appendChild(star);
    }
    return layer;
  }

  function init() {
    // reuse the static container from the HTML if present, otherwise create it
    var field = document.querySelector(".starfield");
    if (!field) {
      field = document.createElement("div");
      field.className = "starfield";
      field.setAttribute("aria-hidden", "true");
      document.body.appendChild(field);
    }
    if (field.querySelector(".stars-a")) return; // already populated
    var count = starCount();
    field.appendChild(makeLayer("stars-a", Math.ceil(count * 0.6)));
    field.appendChild(makeLayer("stars-b", Math.floor(count * 0.4)));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
