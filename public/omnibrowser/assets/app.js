/* ==========================================================================
   Omni Browser — High-Performance Native & Mobile Compatibility Script
   GSAP ScrollTrigger + Mobile Drawer + AI Typewriter + Robust Fallbacks
   ========================================================================== */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. Mobile Navigation Menu Toggle Drawer
     ------------------------------------------------------------------------ */
  try {
    var navToggle = document.querySelector('.nav__toggle');
    var navDrawer = document.querySelector('.nav__mobile-drawer');
    var navDrawerLinks = document.querySelectorAll('.nav__mobile-drawer a');

    if (navToggle && navDrawer) {
      navToggle.addEventListener('click', function () {
        var isOpen = navDrawer.classList.contains('active');
        if (isOpen) {
          navDrawer.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        } else {
          navDrawer.classList.add('active');
          navToggle.setAttribute('aria-expanded', 'true');
          document.body.style.overflow = 'hidden';
        }
      });

      navDrawerLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          navDrawer.classList.remove('active');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  } catch (e) {
    console.warn('Nav drawer error:', e);
  }

  /* ------------------------------------------------------------------------
     2. GitHub Star Counter Fetcher
     ------------------------------------------------------------------------ */
  try {
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
  } catch (e) {
    console.warn('Star fetch error:', e);
  }

  /* ------------------------------------------------------------------------
     3. Solid Nav on Scroll
     ------------------------------------------------------------------------ */
  try {
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
  } catch (e) {
    console.warn('Nav scroll error:', e);
  }

  /* ------------------------------------------------------------------------
     4. Hero 3D Card Tilt Effect (Disabled on touch & desktop < 1024px)
     ------------------------------------------------------------------------ */
  try {
    var heroPhone = document.querySelector('.hero__phone-wrap');
    if (heroPhone && !reducedMotion && window.innerWidth >= 1024) {
      window.addEventListener('mousemove', function (e) {
        var cx = window.innerWidth / 2;
        var cy = window.innerHeight / 2;
        var dx = (e.clientX - cx) / cx;
        var dy = (e.clientY - cy) / cy;

        heroPhone.style.transform = 'rotateY(' + (dx * 10) + 'deg) rotateX(' + (-dy * 8) + 'deg)';
      }, { passive: true });
    }
  } catch (e) {
    console.warn('3D Tilt error:', e);
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
    }, 10);
  }

  /* ------------------------------------------------------------------------
     6. GSAP ScrollTrigger — Pinned Desktop Story (>= 1024px)
     ------------------------------------------------------------------------ */
  try {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !reducedMotion && window.innerWidth >= 1024) {
      gsap.registerPlugin(ScrollTrigger);

      var storyPin = document.querySelector('.story__pin');
      var screens = document.querySelectorAll('.story-screen');
      var copies = document.querySelectorAll('.story-copy');

      if (storyPin && screens.length && copies.length) {
        var chapterCount = screens.length;

        gsap.timeline({
          scrollTrigger: {
            trigger: '.story',
            start: 'top top',
            end: '+=' + (chapterCount * 80) + '%',
            pin: true,
            scrub: 0.1,
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
    }
  } catch (e) {
    console.warn('GSAP ScrollTrigger error:', e);
  }

  /* ------------------------------------------------------------------------
     7. FAQ Accordion Toggle
     ------------------------------------------------------------------------ */
  try {
    var faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(function (item) {
      var btn = item.querySelector('.faq__q');
      var ans = item.querySelector('.faq__a');

      if (btn && ans) {
        btn.addEventListener('click', function () {
          var isOpen = item.classList.contains('open');

          faqItems.forEach(function (other) {
            other.classList.remove('open');
            var otherAns = other.querySelector('.faq__a');
            if (otherAns) otherAns.style.maxHeight = '0';
            var otherBtn = other.querySelector('.faq__q');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          });

          if (!isOpen) {
            item.classList.add('open');
            ans.style.maxHeight = ans.scrollHeight + 'px';
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  } catch (e) {
    console.warn('FAQ accordion error:', e);
  }

  /* ------------------------------------------------------------------------
     8. Feature Cards Entrance (Desktop Only — Instant Render on Mobile)
     ------------------------------------------------------------------------ */
  try {
    var revealCards = document.querySelectorAll('.feat-card, .showcase-card, .qt-card, .story-mobile__card');
    if (revealCards.length) {
      var isMobileView = window.innerWidth < 1024 || ('ontouchstart' in window);
      
      if (!isMobileView && 'IntersectionObserver' in window && !reducedMotion) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05 });

        revealCards.forEach(function (card) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out)';
          observer.observe(card);
        });
      } else {
        // Instant render for mobile and fallback environments
        revealCards.forEach(function (card) {
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
      }
    }
  } catch (e) {
    console.warn('Card observer error:', e);
  }

})();
