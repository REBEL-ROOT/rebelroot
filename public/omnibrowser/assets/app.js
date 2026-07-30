/* ==========================================================================
   Omni Browser — Living Intelligence Script
   GSAP ScrollTrigger + Lenis Smooth Scroll + AI Typewriter Auto-Writing + GitHub Star Fetcher
   ========================================================================== */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. Initialize Lenis Smooth Scroll (if available and motion allowed)
     ------------------------------------------------------------------------ */
  if (typeof Lenis !== 'undefined' && !reducedMotion) {
    var lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* ------------------------------------------------------------------------
     2. GitHub Star Counter Fetcher
     ------------------------------------------------------------------------ */
  var starElements = document.querySelectorAll('[data-stars]');
  if (starElements.length) {
    fetch('https://api.github.com/repos/REBEL-ROOT/omni-browser')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && typeof data.stargazers_count === 'number') {
          var count = data.stargazers_count > 999 
            ? (data.stargazers_count / 1000).toFixed(1) + 'k' 
            : data.stargazers_count.toString();
          starElements.forEach(function (el) {
            el.textContent = count;
          });
        }
      })
      .catch(function () {
        starElements.forEach(function (el) { el.textContent = '100+'; });
      });
  }

  /* ------------------------------------------------------------------------
     3. Solid Nav on Scroll
     ------------------------------------------------------------------------ */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.classList.add('solid');
      } else {
        nav.classList.remove('solid');
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     4. Hero 3D Card Tilt Effect (Disabled on touch & reduced motion)
     ------------------------------------------------------------------------ */
  var heroPhone = document.querySelector('.hero__phone-wrap');
  if (heroPhone && !reducedMotion && window.innerWidth > 768) {
    window.addEventListener('mousemove', function (e) {
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;

      heroPhone.style.transform = 'rotateY(' + (dx * 10) + 'deg) rotateX(' + (-dy * 8) + 'deg)';
    });
  }

  /* ------------------------------------------------------------------------
     5. AI Typewriter Auto-Writing Animation Engine
     ------------------------------------------------------------------------ */
  var currentChapterIdx = -1;
  var typewriterTimer = null;

  function runAITypewriter(descElement) {
    if (!descElement) return;
    var fullText = descElement.getAttribute('data-full-text') || descElement.textContent;
    if (!fullText) return;

    if (typewriterTimer) clearInterval(typewriterTimer);
    descElement.innerHTML = '';
    
    var charIdx = 0;
    var cursorSpan = document.createElement('span');
    cursorSpan.className = 'ai-cursor';
    cursorSpan.textContent = '▌';
    descElement.appendChild(cursorSpan);

    typewriterTimer = setInterval(function () {
      if (charIdx < fullText.length) {
        descElement.textContent = fullText.substring(0, charIdx + 1);
        descElement.appendChild(cursorSpan);
        charIdx++;
      } else {
        clearInterval(typewriterTimer);
      }
    }, 12);
  }

  /* ------------------------------------------------------------------------
     6. GSAP ScrollTrigger — Story Mode with Auto-Writing AI Descriptions
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

            if (activeIdx !== currentChapterIdx) {
              currentChapterIdx = activeIdx;

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
                  var descEl = cpy.querySelector('.story__desc');
                  runAITypewriter(descEl);
                } else {
                  cpy.classList.remove('active');
                }
              });
            }
          }
        }
      });
    }
  } else {
    // Fallback for no GSAP or reduced motion: show chapter 0 by default
    var defaultScreen = document.querySelector('.story-screen[data-chapter="0"]');
    var defaultCopy = document.querySelector('.story-copy[data-copy="0"]');
    if (defaultScreen) defaultScreen.classList.add('active');
    if (defaultCopy) {
      defaultCopy.classList.add('active');
      var descEl = defaultCopy.querySelector('.story__desc');
      runAITypewriter(descEl);
    }
  }

  /* ------------------------------------------------------------------------
     7. FAQ Accordion Toggle
     ------------------------------------------------------------------------ */
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq__q');
    var ans = item.querySelector('.faq__a');

    if (btn && ans) {
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(function (other) {
          other.classList.remove('open');
          var otherAns = other.querySelector('.faq__a');
          if (otherAns) otherAns.style.maxHeight = '0';
          var otherBtn = other.querySelector('.faq__q');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Open clicked if was closed
        if (!isOpen) {
          item.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ------------------------------------------------------------------------
     8. Feature Cards Entrance (IntersectionObserver)
     ------------------------------------------------------------------------ */
  var revealCards = document.querySelectorAll('.feat-card, .showcase-card, .qt-card');
  if (revealCards.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealCards.forEach(function (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out)';
      observer.observe(card);
    });
  }

})();
