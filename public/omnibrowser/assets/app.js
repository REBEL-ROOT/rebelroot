/* ==========================================================================
   Omni Browser — "Living Intelligence" Motion & Story Engine
   ========================================================================== */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ------------------------------------------------------------------------
     1. Lenis Smooth Scroll
     ------------------------------------------------------------------------ */
  var lenis = null;
  if (!reducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      touchMultiplier: 1.5
    });

    lenis.on('scroll', function () {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* ------------------------------------------------------------------------
     2. Nav Scroll State
     ------------------------------------------------------------------------ */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('solid', window.scrollY > 60);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     3. GitHub Stargazers Counter
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
      })
      .catch(function () {});
  }

  /* ------------------------------------------------------------------------
     4. Cursor Tilt on Hero Phone Mockup
     ------------------------------------------------------------------------ */
  var heroPhone = document.querySelector('.hero__phone-wrap[data-tilt]');
  if (heroPhone && !isTouch && !reducedMotion) {
    document.addEventListener('pointermove', function (e) {
      var rect = heroPhone.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;

      heroPhone.style.transform = 'rotateY(' + (dx * 10) + 'deg) rotateX(' + (-dy * 8) + 'deg)';
    });
  }

  /* ------------------------------------------------------------------------
     5. GSAP ScrollTrigger — Pinned 5-Chapter Story
     ------------------------------------------------------------------------ */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !reducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    var storyPin = document.querySelector('.story__pin');
    var screens = document.querySelectorAll('.story-screen');
    var copies = document.querySelectorAll('.story-copy');

    if (storyPin && screens.length && copies.length) {
      var chapterCount = screens.length;

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.story',
          start: 'top top',
          end: '+=' + (chapterCount * 100) + '%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: function (self) {
            var progress = self.progress;
            var activeIdx = Math.min(chapterCount - 1, Math.floor(progress * chapterCount));

            screens.forEach(function (scr, idx) {
              if (idx === activeIdx) {
                scr.classList.add('active');
              } else {
                scr.classList.remove('active');
              }
            });

            copies.forEach(function (cpy, idx) {
              if (idx === activeIdx) {
                cpy.classList.add('active');
              } else {
                cpy.classList.remove('active');
              }
            });
          }
        }
      });
    }
  } else {
    // Fallback for no GSAP or reduced motion: show chapter 0 by default
    var defaultScreen = document.querySelector('.story-screen[data-chapter="0"]');
    var defaultCopy = document.querySelector('.story-copy[data-copy="0"]');
    if (defaultScreen) defaultScreen.classList.add('active');
    if (defaultCopy) defaultCopy.classList.add('active');
  }

  /* ------------------------------------------------------------------------
     6. FAQ Accordion Logic
     ------------------------------------------------------------------------ */
  var faqQuestions = document.querySelectorAll('.faq__q');
  faqQuestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var panel = item.querySelector('.faq__a');
      var isOpen = item.classList.contains('open');

      // Close other accordion items
      document.querySelectorAll('.faq__item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          var otherBtn = other.querySelector('.faq__q');
          var otherPanel = other.querySelector('.faq__a');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = '0';
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------------------------------------
     7. Feature Cards Entrance (IntersectionObserver)
     ------------------------------------------------------------------------ */
  var featCards = document.querySelectorAll('.feat-card');
  if (featCards.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    featCards.forEach(function (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out)';
      observer.observe(card);
    });
  }

})();
