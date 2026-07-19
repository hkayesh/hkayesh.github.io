/* Editorial landing — hero canvas, scroll reveals, timeline progress.
   Vanilla JS, no dependencies. Honors prefers-reduced-motion. */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     1. Hero canvas — drifting data points over a faint grid
     ---------------------------------------------------------------------- */
  var canvas = document.getElementById("hero-canvas");

  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var points = [];
    var width = 0;
    var height = 0;
    var rafId = null;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var ACCENT = "77, 163, 255";
    var COUNT_BASE = 11000; // pixels of area per point

    function resize() {
      var rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * DPR);
      canvas.height = Math.round(height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seed();
      if (reduceMotion) drawFrame(); // single static frame
    }

    function seed() {
      var count = Math.max(18, Math.min(70, Math.floor((width * height) / COUNT_BASE)));
      points = [];
      for (var i = 0; i < count; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: 1 + Math.random() * 1.4
        });
      }
    }

    function drawGrid() {
      var step = 56;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var x = 0.5; x < width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (var y = 0.5; y < height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      var i, j, p, q, dx, dy, dist;
      var LINK = 130;

      // links
      for (i = 0; i < points.length; i++) {
        p = points[i];
        for (j = i + 1; j < points.length; j++) {
          q = points[j];
          dx = p.x - q.x;
          dy = p.y - q.y;
          dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK) {
            ctx.strokeStyle = "rgba(" + ACCENT + ", " + (0.14 * (1 - dist / LINK)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // points
      for (i = 0; i < points.length; i++) {
        p = points[i];
        ctx.fillStyle = "rgba(" + ACCENT + ", 0.55)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function tick() {
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }
      drawFrame();
      rafId = window.requestAnimationFrame(tick);
    }

    function start() {
      if (reduceMotion || rafId !== null) return;
      rafId = window.requestAnimationFrame(tick);
    }

    function stop() {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    resize();
    start();

    var resizeTimer;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    });

    // Save battery when the hero tab is hidden
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });
  }

  if (reduceMotion) return; // everything below is motion — skip it

  /* ----------------------------------------------------------------------
     2. Reveal on scroll
     ---------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ----------------------------------------------------------------------
     3. Timeline progress — fill the line as roles scroll into view
     ---------------------------------------------------------------------- */
  var timeline = document.getElementById("timeline");
  var progress = document.getElementById("timeline-progress");

  if (timeline && progress) {
    var ticking = false;

    var updateProgress = function () {
      ticking = false;
      var rect = timeline.getBoundingClientRect();
      var anchor = window.innerHeight * 0.62; // fill up to this viewport line
      var filled = anchor - rect.top;
      var ratio = rect.height > 0 ? filled / rect.height : 1;
      ratio = Math.max(0, Math.min(1, ratio));
      progress.style.transform = "scaleY(" + ratio.toFixed(4) + ")";
    };

    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* ----------------------------------------------------------------------
     4. Hero avatar → masthead transition
        When the hero photo scrolls under the sticky masthead, the avatar
        animates into the nav and the title shrinks. Reverses on scroll-up.
     ---------------------------------------------------------------------- */
  var masthead = document.querySelector(".masthead");
  var heroAvatar = document.querySelector(".hero__avatar");

  if (masthead && heroAvatar && !reduceMotion) {
    var stuck = false;

    var update = function () {
      var mastheadBottom = masthead.getBoundingClientRect().bottom;
      var avatarBottom = heroAvatar.getBoundingClientRect().bottom;
      var shouldStick = avatarBottom < mastheadBottom + 4;

      if (shouldStick !== stuck) {
        stuck = shouldStick;
        masthead.classList.toggle("is-stuck", stuck);
      }
    };

    var onMastheadScroll = function () {
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onMastheadScroll, { passive: true });
    window.addEventListener("resize", onMastheadScroll);
  } else if (masthead && reduceMotion) {
    // Reduced motion: show the masthead avatar immediately
    masthead.classList.add("is-stuck");
  }
})();
