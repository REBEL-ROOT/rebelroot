/* ==========================================================================
   Omni Browser — "Living Intelligence" Motion Engine
   ARCHITECTURE:
   - Lenis: smooth scroll (gated off under prefers-reduced-motion)
   - GSAP + ScrollTrigger: pinned 5-chapter morph, hero parallax, final zoom
   - Canvas aurora: rAF loop with 3 colour blobs, paused on tab hidden
   - Cursor tilt: pointermove on hero phone (disabled on touch + reduced-motion)
   - IntersectionObserver: feature card stagger reveals
   - FAQ accordion: click-to-expand with max-height transition
   - Nav: solidify on scroll past 80px
   - Stars: fetch from GitHub API on mount
   ========================================================================== */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ------------------------------------------------------------------------
     1. Lenis smooth scroll
     ------------------------------------------------------------------------ */
  var lenis = null;
  if (!reducedMotion && typeof Lenis !== 'undefined' && typeof ResizeObserver !== 'undefined') {
    lenis = new Lenis({ duration: 1.2, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    lenis.on('scroll', function () { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update(); });
    (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(0);
  }

  /* ------------------------------------------------------------------------
     2. Nav solidify
     ------------------------------------------------------------------------ */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('solid', window.scrollY > 80);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     3. GitHub stars
     ------------------------------------------------------------------------ */
  var starNodes = document.querySelectorAll('[data-stars]');
  if (starNodes.length) {
    fetch('https://api.github.com/repos/REBEL-ROOT/omni-browser')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && typeof d.stargazers_count === 'number') {
          var txt = d.stargazers_count >= 1000
            ? (d.stargazers_count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
            : String(d.stargazers_count);
          starNodes.forEach(function (n) { n.textContent = txt; });
        }
      }).catch(function () {});
  }

  /* ------------------------------------------------------------------------
     4. Aurora canvas
     ------------------------------------------------------------------------ */
  var canvas = document.querySelector('.aurora-canvas');
  // Acquire the 2D context up front and fold it into the guard. We must NOT
  // use an early `return` when the context is missing (e.g. jsdom, or a
  // browser/extension that blocks canvas) — that would abort the entire IIFE
  // and silently disable the scroll story, reveals and FAQ accordion below.
  var ctx = canvas ? canvas.getContext('2d') : null;
  if (canvas && ctx && !reducedMotion) {
    var blobs = [
      { x: 0.3, y: 0.3, r: 0.4, color: [59, 130, 246], vx: 0.0003, vy: 0.0002 },
      { x: 0.7, y: 0.5, r: 0.35, color: [139, 92, 246], vx: -0.0002, vy: 0.0003 },
      { x: 0.5, y: 0.8, r: 0.3, color: [52, 211, 153], vx: 0.0002, vy: -0.0002 }
    ];
    var running = true;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawAurora() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach(function (b) {
        b.x += b.vx; b.y += b.vy;
        if (b.x < 0 || b.x > 1) b.vx *= -1;
        if (b.y < 0 || b.y > 1) b.vy *= -1;
        var grd = ctx.createRadialGradient(
          b.x * canvas.width, b.y * canvas.height, 0,
          b.x * canvas.width, b.y * canvas.height, b.r * Math.max(canvas.width, canvas.height)
        );
        grd.addColorStop(0, 'rgba(' + b.color.join(',') + ',0.12)');
        grd.addColorStop(1, 'rgba(' + b.color.join(',') + ',0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      requestAnimationFrame(drawAurora);
    }
    drawAurora();

    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) drawAurora();
    });
  }

  /* ------------------------------------------------------------------------
     5. Cursor tilt on hero phone
     ------------------------------------------------------------------------ */
  var tiltEl = document.querySelector('[data-tilt]');
  if (tiltEl && !isTouch && !reducedMotion) {
    document.addEventListener('pointermove', function (e) {
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;
      tiltEl.style.transform = 'perspective(800px) rotateY(' + (dx * 8) + 'deg) rotateX(' + (-dy * 6) + 'deg)';
    });
  }

  /* ------------------------------------------------------------------------
     6. GSAP ScrollTrigger — pinned story
     ------------------------------------------------------------------------ */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !reducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    var screens = document.querySelectorAll('.screen-layer');
    var copies = document.querySelectorAll('.copy-layer');
    var pinEl = document.querySelector('.story__pin');

    if (pinEl && screens.length && copies.length) {
      var chapters = screens.length;

      // Set initial state: first screen + copy visible
      gsap.set(screens[0], { opacity: 1 });
      gsap.set(copies[0], { opacity: 1 });

      // Create a timeline for the pinned section
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.story',
          start: 'top top',
          end: '+=' + (chapters * 100) + '%',
          pin: pinEl,
          scrub: 1,
          anticipatePin: 1
        }
      });

      for (var i = 1; i < chapters; i++) {
        (function (idx) {
          // Fade out previous screen + copy
          tl.to(screens[idx - 1], { opacity: 0, scale: 0.95, duration: 0.5, ease: 'power2.inOut' }, idx - 1)
            .to(copies[idx - 1], { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' }, idx - 1)
            // Fade in next screen + copy
            .to(screens[idx], { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.inOut' }, idx - 0.5)
            .to(copies[idx], { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, idx - 0.5);
        })(i);
      }

      // Initialize hidden states for screens/copies 1+
      for (var j = 1; j < chapters; j++) {
        gsap.set(screens[j], { opacity: 0, scale: 1.05 });
        gsap.set(copies[j], { opacity: 0, y: 30 });
      }
    }

    /* Hero parallax */
    var heroPhone = document.querySelector('.hero .phone');
    if (heroPhone) {
      gsap.to(heroPhone, {
        y: -80,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    /* Final zoom-out glow */
    var finalGlow = document.querySelector('.final__glow');
    if (finalGlow) {
      gsap.from(finalGlow, {
        scale: 0.5, opacity: 0,
        scrollTrigger: { trigger: '.final', start: 'top 80%', end: 'top 30%', scrub: true }
      });
    }
  }

  /* ------------------------------------------------------------------------
     7. Feature card reveals (IntersectionObserver)
     ------------------------------------------------------------------------ */
  var featCards = document.querySelectorAll('.feat-card');
  if (featCards.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (en.isIntersecting) {
          setTimeout(function () { en.target.classList.add('in'); }, i * 80);
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    featCards.forEach(function (c) { obs.observe(c); });
  } else {
    featCards.forEach(function (c) { c.classList.add('in'); });
  }

  /* ------------------------------------------------------------------------
     8. FAQ accordion
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var panel = item.querySelector('.faq__a');
      var isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0';
    });
  });

  /* ------------------------------------------------------------------------
     9. Scroll-reveal for sections (generic)
     ------------------------------------------------------------------------ */
  if ('IntersectionObserver' in window && !reducedMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0)';
          revealObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.features__head, .compare__title, .roadmap__title, .faq__title, .proof, .final h2').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
      revealObs.observe(el);
    });
  }

})();
