/* ==========================================================================
   Omni Browser Docs — Layout Engine
   Dependency-free. Builds header/sidebar/TOC, search, theme, code blocks,
   scrollspy, pager, feedback and all interactions from a single NAV config.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     0. Base path detection (works over http and file://)
     ------------------------------------------------------------------------ */
  var scriptEl =
    document.currentScript ||
    (function () {
      var s = document.querySelectorAll('script[src*="assets/app.js"]');
      return s[s.length - 1];
    })();
  var src = scriptEl ? scriptEl.getAttribute('src') : 'assets/app.js';
  var idx = src.indexOf('assets/app.js');
  var BASE = idx > 0 ? src.slice(0, idx) : '';

  var SITE_URL = 'https://www.rebelroot.xyz/docs/';
  var REPO = 'https://github.com/REBEL-ROOT/omni-browser';
  var EDIT_REPO = 'https://github.com/ParasxAgarwal/rebelroot/edit/main/public/docs/';

  /* ------------------------------------------------------------------------
     1. Navigation config (single source of truth)
     ------------------------------------------------------------------------ */
  var NAV = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', path: 'getting-started/introduction', desc: 'What Omni Browser is, why it exists, and what makes it different.', kw: 'why omni about overview privacy geckoview open source' },
        { title: 'Installation', path: 'getting-started/installation', desc: 'Download and install Omni Browser from APK, F-Droid or GitHub Releases.', kw: 'install apk download fdroid github requirements android sdk' },
        { title: 'First Launch', path: 'getting-started/first-launch', desc: 'Language selection, onboarding and setting yourself up.', kw: 'first launch onboarding language default browser setup' },
        { title: 'Quick Start', path: 'getting-started/quick-start', desc: 'Your first five minutes: tabs, search, the fire button and quick tools.', kw: 'first run onboarding tabs search basics tutorial' },
        { title: 'Common Workflows', path: 'getting-started/common-workflows', desc: 'How to do the everyday things: save a page, grab a video, translate.', kw: 'workflows save download translate scan copy tasks' },
        { title: 'Switching Browsers', path: 'getting-started/migration', desc: 'Moving from Chrome, Firefox or Brave: what carries over and what\u2019s different.', kw: 'migration switch chrome firefox brave import bookmarks' },
        { title: 'Keyboard Shortcuts', path: 'getting-started/keyboard-shortcuts', desc: 'Every shortcut, the command palette and external keyboard support.', kw: 'shortcuts keys command palette hotkeys keyboard' },
        { title: 'Troubleshooting', path: 'getting-started/troubleshooting', desc: 'Fix crashes, playback issues, extension conflicts and more.', kw: 'troubleshooting fix crash issues debug problems' }
      ]
    },
    {
      title: 'Tabs & Workspace',
      items: [
        { title: 'Tab Management', path: 'tabs/tab-management', desc: 'Create, switch, close and restore tabs; the strip and visual switcher.', kw: 'tabs strip switcher close restore session' },
        { title: 'Smart Tab Groups', path: 'tabs/tab-groups', desc: 'Auto-group tabs by domain into Social, Shopping, Video, News, Dev, Work.', kw: 'tab groups smart grouping categories organize' },
        { title: 'Private Tabs', path: 'tabs/private-tabs', desc: 'Incognito in a genuinely isolated GeckoView private context.', kw: 'private incognito isolation cookies history' },
        { title: 'Desktop Mode', path: 'tabs/desktop-mode', desc: 'Load full desktop versions of sites with a desktop user-agent.', kw: 'desktop mode user agent zoom force' },
        { title: 'Find in Page', path: 'tabs/find-in-page', desc: 'Search for text within the current page with match highlighting.', kw: 'find search page text match' }
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        { title: 'Overview', path: 'privacy/overview', desc: 'The full privacy stack: blocking, isolation, transport, storage, session control.', kw: 'privacy overview stack layers zero data', badge: 'Core' },
        { title: 'Ad & Tracker Blocking', path: 'privacy/ad-blocking', desc: 'Domain lists, cosmetic filtering, popup blocking and filter providers.', kw: 'adblock tracker blocking easylist adguard popup', badge: 'Core' },
        { title: 'Fire Button', path: 'privacy/fire-button', desc: 'Burn tabs, cookies, cache and history in one tap.', kw: 'fire button burn session clear panic' },
        { title: 'Encrypted Vault', path: 'privacy/private-vault', desc: 'Biometric-protected AES-256 storage for pages, images and notes.', kw: 'vault encrypted biometric sqlcipher aes private' },
        { title: 'Tor', path: 'privacy/tor', desc: 'Route traffic through Tor: bootstrap, bridges, Snowflake, .onion.', kw: 'tor onion bridges snowflake anonymity' },
        { title: 'WireGuard VPN', path: 'privacy/vpn', desc: 'Run a WireGuard tunnel: import a config and encrypt your traffic.', kw: 'vpn wireguard tunnel encrypt config' },
        { title: 'Site Permissions', path: 'privacy/site-permissions', desc: 'Control camera, mic, location and notifications per site.', kw: 'permissions camera microphone location notifications' },
        { title: 'Passwords', path: 'privacy/passwords', desc: 'Local, Keystore-encrypted password storage and autofill.', kw: 'passwords autofill keystore credentials login' },
        { title: 'HTTPS-Only', path: 'privacy/https-only', desc: 'HTTPS enforcement and refusing cleartext traffic.', kw: 'https cleartext encryption upgrade' }
      ]
    },
    {
      title: 'Media',
      items: [
        { title: 'Media Hub', path: 'media/overview', desc: 'The media stack: sniffing, native playback, downloads, audio extraction.', kw: 'media hub overview video audio', badge: 'Core' },
        { title: 'Stream Sniffer', path: 'media/stream-sniffer', desc: 'Dual-path detection of HLS, DASH and MSE streams.', kw: 'stream sniffer hls dash mse detect grabber', badge: 'Core' },
        { title: 'Video Player', path: 'media/video-player', desc: 'ExoPlayer playback with PiP, gestures, speed and background audio.', kw: 'video player exoplayer pip gestures background speed' },
        { title: 'Audio Extraction', path: 'media/audio-extraction', desc: 'Pull the soundtrack out of any video with on-demand FFmpeg.', kw: 'audio extraction ffmpeg mp3 convert' },
        { title: 'Downloads Manager', path: 'media/downloads', desc: 'Queue, pause and resume; save to the vault; manage your library.', kw: 'downloads manager queue resume vault library' },
        { title: 'Batch Media & Manga', path: 'media/batch-manga', desc: 'Batch-download images and chapters with PDF export.', kw: 'batch manga images gallery pdf reader' }
      ]
    },
    {
      title: 'Quick Tools',
      items: [
        { title: 'Overview', path: 'tools/overview', desc: 'The toolbox: 14+ native tools, one swipe away, reorderable.', kw: 'quick tools toolbox panel overview' },
        { title: 'Command Palette', path: 'power/command-palette', desc: 'Fuzzy-search every action, tab and setting from one prompt.', kw: 'command palette fuzzy search actions launcher' },
        { title: 'QR Scanner & Generator', path: 'tools/qr', desc: 'Scan and generate QR codes with the pure-FOSS ZXing engine.', kw: 'qr scanner generator zxing barcode scan' },
        { title: 'Translator', path: 'tools/translator', desc: 'Translate pages and selected text across many languages.', kw: 'translator translation languages' },
        { title: 'Save as PDF', path: 'tools/pdf', desc: 'Export any page as a clean, ad-stripped PDF.', kw: 'pdf export print save page' },
        { title: 'Developer Console', path: 'tools/dev-console', desc: 'A live JavaScript REPL for the current page.', kw: 'developer console javascript repl devtools inspect' },
        { title: 'Dev Notes', path: 'tools/dev-notes', desc: 'An offline, filterable, searchable scratchpad.', kw: 'notes scratchpad notepad voice memo' },
        { title: 'Site Styles & Editor', path: 'tools/site-styles', desc: 'Per-site font, spacing, dark mode \u2014 and make pages editable.', kw: 'site style font dark reader contenteditable editor' },
        { title: 'Speak Aloud', path: 'tools/read-aloud', desc: 'Have selected text read out loud via system TTS.', kw: 'speak aloud tts text to speech read' },
        { title: 'Web Apps', path: 'tools/web-apps', desc: 'Pin websites to your home screen as app-like shortcuts.', kw: 'web apps home screen shortcut pin pwa' }
      ]
    },
    {
      title: 'Extensions',
      items: [
        { title: 'Overview', path: 'extensions/overview', desc: 'Real Firefox WebExtension (.xpi) support, powered by Gecko.', kw: 'extensions addons xpi webextension mozilla', badge: 'Core' },
        { title: 'Bundled Extensions', path: 'extensions/bundled', desc: 'Media Grabber, AI Blocker and Universal Copy.', kw: 'bundled media grabber ai blocker universal copy' },
        { title: 'Installing Add-ons', path: 'extensions/install', desc: 'Step-by-step install from addons.mozilla.org.', kw: 'install addons amo firefox marketplace' }
      ]
    },
    {
      title: 'AI',
      items: [
        { title: 'AI Blocker', path: 'ai/ai-blocker', desc: 'Hide AI overviews on Google, Bing, DuckDuckGo and more.', kw: 'ai blocker artificial intelligence overview search' }
      ]
    },
    {
      title: 'Home & Search',
      items: [
        { title: 'Home Screen', path: 'home/home-screen', desc: 'Search bar, quick-access shortcuts and the Discover feed.', kw: 'home screen shortcuts start page' },
        { title: 'Search Engines', path: 'home/search-engines', desc: 'Google, DuckDuckGo, Brave, Bing, Yandex, Ecosia, Startpage + custom.', kw: 'search engines google duckduckgo brave default' },
        { title: 'Discover Feed', path: 'home/discover', desc: 'A news stream of Trending, World, Tech and Sports.', kw: 'discover news feed trending google news' }
      ]
    },
    {
      title: 'Customization',
      items: [
        { title: 'Themes & Appearance', path: 'customization/themes', desc: 'Light, dark and AMOLED; accents, dynamic color and UI scale.', kw: 'themes appearance dark amoled accent dynamic color' },
        { title: 'Wallpapers', path: 'customization/wallpapers', desc: 'Give the home screen some personality.', kw: 'wallpapers background home screen' },
        { title: 'Toolbar & Layout', path: 'customization/toolbar', desc: 'Address bar position, bottom nav and one-handed layout.', kw: 'toolbar layout address bar bottom one-handed' },
        { title: 'Accessibility', path: 'customization/accessibility', desc: 'UI scaling, readable pages, speak aloud and system integration.', kw: 'accessibility scaling font screen reader talkback' }
      ]
    },
    {
      title: 'Developer',
      items: [
        { title: 'Architecture', path: 'developer/architecture', desc: 'MVVM, unidirectional data flow and the layer map of the app.', kw: 'architecture mvvm data flow layers viewmodel design', badge: 'Dev' },
        { title: 'Code Structure', path: 'developer/code-structure', desc: 'A tour of the com.rebelroot.omni package tree and key files.', kw: 'code structure package files folders organization source' },
        { title: 'GeckoView Engine', path: 'developer/geckoview', desc: 'How GeckoRuntime and GeckoSession power the browser, and interop.', kw: 'geckoview gecko runtime session engine mozilla firefox interop', badge: 'Dev' },
        { title: 'Build System', path: 'developer/build-system', desc: 'Gradle Kotlin DSL, ABI flavors, R8, signing and CI releases.', kw: 'build gradle flavors r8 signing ci release apk kotlin' },
        { title: 'Modules & Packages', path: 'developer/modules', desc: 'Feature packages: adblock, extensions, media, privacy, tools, locker.', kw: 'modules packages components feature modules' }
      ]
    },
    {
      title: 'API Reference',
      items: [
        { title: 'Browser Engine', path: 'api/browser-engine', desc: 'Runtime, session and navigation APIs exposed by the engine layer.', kw: 'api browser engine runtime session navigation' },
        { title: 'Download API', path: 'api/download-api', desc: 'Programmatic downloads, the stream engine and vault persistence.', kw: 'api download stream engine vault' },
        { title: 'Media API', path: 'api/media-api', desc: 'Interceptor, sniffer messaging and the player service.', kw: 'api media interceptor sniffer player service' },
        { title: 'AI API', path: 'api/ai-api', desc: 'The AI Blocker content scripts and messaging surface.', kw: 'api ai blocker messaging content script' },
        { title: 'Settings API', path: 'api/settings-api', desc: 'DataStore-backed preferences and theme state holder.', kw: 'api settings datastore preferences theme state' },
        { title: 'Extension API', path: 'api/extension-api', desc: 'Installing, enabling and messaging WebExtensions.', kw: 'api extension webextension install enable messaging' }
      ]
    },
    {
      title: 'Resources',
      items: [
        { title: 'FAQ', path: 'resources/faq', desc: 'Answers to the most common questions about Omni Browser.', kw: 'faq questions answers common help' },
        { title: 'Changelog', path: 'resources/changelog', desc: 'Release history from v1.0.0 to the latest build.', kw: 'changelog releases history versions' },
        { title: 'Contributing', path: 'resources/contributing', desc: 'Set up the dev environment, code style and how to send PRs.', kw: 'contributing development setup pull request code style' },
        { title: 'Security', path: 'resources/security', desc: 'Supported versions and how to responsibly disclose vulnerabilities.', kw: 'security vulnerability disclosure policy encryption' },
        { title: 'License', path: 'resources/license', desc: 'GPLv3 licensing and the RebelRoot trademark policy.', kw: 'license gplv3 trademark legal open source' }
      ]
    }
  ];

  var FLAT = [];
  NAV.forEach(function (section) {
    section.items.forEach(function (item) {
      FLAT.push({ section: section.title, title: item.title, path: item.path, desc: item.desc, kw: item.kw || '' });
    });
  });

  /* ------------------------------------------------------------------------
     2. Icons
     ------------------------------------------------------------------------ */
  var I = {
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><path d="M12 3v18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    thumbUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11M2 13a2 2 0 0 1 2-2h3v11H4a2 2 0 0 1-2-2Z"/><path d="M7 10l4-8a2 2 0 0 1 3 2l-1 6h6a2 2 0 0 1 2 2.3l-1.3 7A2 2 0 0 1 18 21H7"/></svg>',
    thumbDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V3M22 11a2 2 0 0 1-2 2h-3V2h3a2 2 0 0 1 2 2Z"/><path d="M17 14l-4 8a2 2 0 0 1-3-2l1-6H5a2 2 0 0 1-2-2.3l1.3-7A2 2 0 0 1 6 3h11"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1Z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>'
  };

  /* ------------------------------------------------------------------------
     3. Utilities
     ------------------------------------------------------------------------ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function slugify(s) {
    return s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
  }
  function link(path) { return BASE + path + '.html'; }
  function toast(msg) {
    var t = $('#omni-toast');
    if (!t) return;
    t.innerHTML = I.check + '<span>' + msg + '</span>';
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  function copyText(text, msg) {
    function done() { toast(msg || 'Copied to clipboard'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      var ta = el('textarea', { value: text });
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  /* ------------------------------------------------------------------------
     4. Theme
     ------------------------------------------------------------------------ */
  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem('omni-docs-theme'); } catch (e) {}
    var theme = stored || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-theme-toggle]');
      if (!btn) return;
      var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('omni-docs-theme', next); } catch (err) {}
      updateThemeIcon();
    });
    updateThemeIcon();
  }
  function updateThemeIcon() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    $$('[data-theme-toggle]').forEach(function (b) {
      b.innerHTML = isLight ? I.moon : I.sun;
      b.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    });
  }

  /* ------------------------------------------------------------------------
     5. Header
     ------------------------------------------------------------------------ */
  function renderHeader() {
    var isMac = /Mac|iP/.test(navigator.platform);
    var mod = isMac ? '⌘' : 'Ctrl';
    var header = el('header', { class: 'site-header', html:
      '<a class="logo" href="' + BASE + 'index.html" aria-label="Omni Browser docs home">' +
        '<span class="logo__mark">' + I.globe + '</span>' +
        '<span class="logo__name">Omni Browser<small>Documentation</small></span>' +
      '</a>' +
      '<span class="logo__divider"></span>' +
      '<div class="header-search">' +
        '<button class="search-trigger" data-search-open aria-label="Search documentation">' +
          I.search + '<span class="search-trigger__label">Search the docs…</span>' +
          '<kbd>' + mod + ' K</kbd>' +
        '</button>' +
      '</div>' +
      '<div class="header-actions">' +
        '<select class="version-select" data-version aria-label="Documentation version">' +
          '<option>v1.2.6</option><option>v1.1.x</option><option>v1.0.x</option>' +
        '</select>' +
        '<a class="header-link" href="' + REPO + '" target="_blank" rel="noopener" data-stars-wrap>' +
          I.github + '<span>Star</span><span class="stars" data-stars>—</span>' +
        '</a>' +
        '<button class="icon-btn" data-theme-toggle></button>' +
        '<button class="icon-btn hamburger" data-sidebar-toggle aria-label="Toggle navigation">' + I.menu + '</button>' +
      '</div>'
    });
    document.body.prepend(header);
    fetchStars();
  }

  function fetchStars() {
    var nodes = $$('[data-stars]');
    if (!nodes.length) return;
    fetch('https://api.github.com/repos/REBEL-ROOT/omni-browser')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && typeof d.stargazers_count === 'number') {
          var txt = d.stargazers_count >= 1000
            ? (d.stargazers_count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
            : String(d.stargazers_count);
          nodes.forEach(function (n) { n.textContent = txt; });
        } else {
          nodes.forEach(function (n) { n.textContent = '★'; });
        }
      })
      .catch(function () { nodes.forEach(function (n) { n.textContent = '★'; }); });
  }

  /* ------------------------------------------------------------------------
     6. Sidebar
     ------------------------------------------------------------------------ */
  function renderSidebar(activePath) {
    var aside = el('aside', { class: 'sidebar', id: 'sidebar', 'aria-label': 'Documentation navigation' });
    var filter = el('div', { class: 'sidebar__filter', html: I.search +
      '<input type="search" placeholder="Filter…" aria-label="Filter navigation" data-sidebar-filter>' });
    aside.appendChild(filter);

    NAV.forEach(function (section) {
      var group = el('div', { class: 'sidebar__group' });
      var heading = el('button', { class: 'sidebar__heading', 'aria-expanded': 'true', html:
        '<span>' + section.title + '</span><span class="chev">' + I.chev + '</span>' });
      var list = el('ul', { class: 'sidebar__links' });
      section.items.forEach(function (item) {
        var a = el('a', { class: 'sidebar__link', href: link(item.path), 'data-title': item.title.toLowerCase() });
        a.innerHTML = '<span>' + item.title + '</span>' + (item.badge ? '<span class="badge badge--muted">' + item.badge + '</span>' : '');
        if (item.path === activePath) a.classList.add('active');
        var li = el('li'); li.appendChild(a); list.appendChild(li);
      });
      heading.addEventListener('click', function () {
        group.classList.toggle('collapsed');
        heading.setAttribute('aria-expanded', String(!group.classList.contains('collapsed')));
      });
      group.appendChild(heading);
      group.appendChild(list);
      aside.appendChild(group);
    });

    // Filter
    aside.addEventListener('input', function (e) {
      if (!e.target.matches('[data-sidebar-filter]')) return;
      var q = e.target.value.trim().toLowerCase();
      $$('.sidebar__link', aside).forEach(function (a) {
        var match = !q || a.getAttribute('data-title').indexOf(q) !== -1;
        a.classList.toggle('hidden', !match);
      });
      $$('.sidebar__group', aside).forEach(function (g) {
        var any = $$('.sidebar__link:not(.hidden)', g).length > 0;
        g.style.display = any ? '' : 'none';
        if (q && any) g.classList.remove('collapsed');
      });
    });

    return aside;
  }

  /* ------------------------------------------------------------------------
     7. Breadcrumbs
     ------------------------------------------------------------------------ */
  function renderBreadcrumbs(active) {
    if (!active) return null;
    var nav = el('nav', { class: 'breadcrumbs', 'aria-label': 'Breadcrumb' });
    nav.innerHTML =
      '<a href="' + BASE + 'index.html">Docs</a><span class="sep">/</span>' +
      '<span>' + active.section + '</span><span class="sep">/</span>' +
      '<span class="current">' + active.title + '</span>';
    return nav;
  }

  /* ------------------------------------------------------------------------
     8. Page meta (reading time, updated, actions)
     ------------------------------------------------------------------------ */
  function renderPageMeta(content, active) {
    var prose = $('.prose', content);
    var words = prose ? prose.textContent.trim().split(/\s+/).length : 0;
    var mins = Math.max(1, Math.round(words / 200));
    var updated = content.getAttribute('data-updated') || '';
    var editUrl = EDIT_REPO + (active ? active.path : '') + '.html';

    var meta = el('div', { class: 'page-meta' });
    meta.innerHTML =
      '<span class="page-meta__item">' + I.clock + mins + ' min read</span>' +
      (updated ? '<span class="page-meta__item">' + I.cal + 'Updated ' + updated + '</span>' : '') +
      '<span class="page-meta__item">' + I.doc + words.toLocaleString() + ' words</span>' +
      '<span class="page-meta__actions">' +
        '<button data-copy-link title="Copy link">' + I.link + 'Copy link</button>' +
        '<button data-share title="Share">' + I.share + 'Share</button>' +
        '<button data-print title="Print">' + I.print + 'Print</button>' +
      '</span>';

    meta.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.hasAttribute('data-copy-link')) copyText(location.href, 'Link copied');
      else if (b.hasAttribute('data-print')) window.print();
      else if (b.hasAttribute('data-share')) {
        if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(function () {});
        else copyText(location.href, 'Link copied');
      }
    });
    return meta;
  }

  /* ------------------------------------------------------------------------
     9. Table of contents + scrollspy
     ------------------------------------------------------------------------ */
  function renderToc(content) {
    var heads = $$('h2, h3', content).filter(function (h) { return !h.closest('.code-block'); });
    if (heads.length < 2) return null;
    var toc = el('aside', { class: 'toc', 'aria-label': 'On this page' });
    var list = el('ul', { class: 'toc__list' });
    heads.forEach(function (h) {
      if (!h.id) h.id = slugify(h.textContent);
      var li = el('li');
      var a = el('a', { class: 'toc__link depth-' + h.tagName.charAt(1), href: '#' + h.id, 'data-toc-link': h.id });
      a.textContent = h.textContent.replace(/#$/, '').trim();
      li.appendChild(a); list.appendChild(li);
    });
    toc.innerHTML = '<div class="toc__title">On this page</div>';
    toc.appendChild(list);
    var top = el('a', { class: 'toc__top', href: '#top', html: I.up + 'Back to top' });
    toc.appendChild(top);
    initScrollspy(heads);
    return toc;
  }

  function initScrollspy(heads) {
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    $$('[data-toc-link]').forEach(function (a) { links[a.getAttribute('data-toc-link')] = a; });
    var current = null;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (current) current.classList.remove('active');
          current = links[en.target.id];
          if (current) current.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
    heads.forEach(function (h) { obs.observe(h); });
  }

  /* ------------------------------------------------------------------------
     10. Heading anchors
     ------------------------------------------------------------------------ */
  function addHeadingAnchors(content) {
    $$('h2, h3, h4', content).forEach(function (h) {
      if (h.closest('.code-block') || h.querySelector('.heading-anchor')) return;
      if (!h.id) h.id = slugify(h.textContent);
      var a = el('a', { class: 'heading-anchor', href: '#' + h.id, 'aria-label': 'Link to this section' }, '#');
      a.addEventListener('click', function (e) {
        e.preventDefault();
        history.replaceState(null, '', '#' + h.id);
        h.scrollIntoView({ behavior: 'smooth' });
        copyText(location.href, 'Section link copied');
      });
      h.appendChild(a);
    });
  }

  /* ------------------------------------------------------------------------
     11. Pager (prev / next)
     ------------------------------------------------------------------------ */
  function renderPager(activePath) {
    var i = FLAT.findIndex(function (x) { return x.path === activePath; });
    if (i === -1) return null;
    var prev = FLAT[i - 1], next = FLAT[i + 1];
    var pager = el('nav', { class: 'pager', 'aria-label': 'Pagination' });
    pager.innerHTML =
      (prev
        ? '<a class="pager__item" href="' + link(prev.path) + '"><span class="pager__label">' + I.left + 'Previous</span><span class="pager__title">' + prev.title + '</span></a>'
        : '<span class="pager__item empty"></span>') +
      (next
        ? '<a class="pager__item pager__item--next" href="' + link(next.path) + '"><span class="pager__label">Next' + I.right + '</span><span class="pager__title">' + next.title + '</span></a>'
        : '<span class="pager__item empty"></span>');
    return pager;
  }

  /* ------------------------------------------------------------------------
     12. Feedback widget
     ------------------------------------------------------------------------ */
  function renderFeedback(activePath) {
    var key = 'omni-fb-' + activePath;
    var stored = null;
    try { stored = localStorage.getItem(key); } catch (e) {}
    var fb = el('div', { class: 'feedback' });
    fb.innerHTML =
      '<span class="feedback__text">Was this page helpful?</span>' +
      '<span class="feedback__btns">' +
        '<button class="feedback__btn" data-fb="yes">' + I.thumbUp + 'Yes</button>' +
        '<button class="feedback__btn" data-fb="no">' + I.thumbDown + 'No</button>' +
      '</span>' +
      '<a class="feedback__edit" href="' + EDIT_REPO + activePath + '.html" target="_blank" rel="noopener">' + I.edit + 'Edit this page</a>';
    if (stored) showThanks();
    fb.addEventListener('click', function (e) {
      var b = e.target.closest('[data-fb]');
      if (!b) return;
      try { localStorage.setItem(key, b.getAttribute('data-fb')); } catch (err) {}
      showThanks();
    });
    function showThanks() {
      var btns = $('.feedback__btns', fb);
      if (btns) btns.outerHTML = '<span class="feedback__thanks">' + I.check + ' Thanks for the feedback!</span>';
    }
    return fb;
  }

  /* ------------------------------------------------------------------------
     13. Syntax highlighting
     ------------------------------------------------------------------------ */
  var RULES = {
    kotlin: [
      ['com', /\/\/[^\n]*|\/\*[\s\S]*?\*\/|\/\*[^\n]*/],
      ['str', /"""[\s\S]*?"""|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/],
      ['kw', /\b(?:val|var|fun|class|object|interface|private|public|internal|protected|override|suspend|return|if|else|when|for|while|do|in|is|as|import|package|companion|data|sealed|enum|lateinit|by|lazy|null|true|false|this|super|try|catch|finally|throw|typealias|inline|reified|out|annotation|constructor|init|get|set|field|abstract|open|final|const|operator|infix|tailrec|vararg|it)\b/],
      ['type', /\b[A-Z][A-Za-z0-9_]*\b/],
      ['num', /\b(?:0x[0-9a-fA-F]+|\d+(?:\.\d+)?[fFL]?)\b/],
      ['fn', /\b[a-z_][A-Za-z0-9_]*(?=\s*\()/]
    ],
    java: [
      ['com', /\/\/[^\n]*|\/\*[\s\S]*?\*\/|\/\*[^\n]*/],
      ['str', /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/],
      ['kw', /\b(?:public|private|protected|class|interface|extends|implements|static|final|void|int|long|boolean|new|return|if|else|for|while|try|catch|finally|throw|throws|import|package|this|super|null|true|false|abstract|synchronized)\b/],
      ['type', /\b[A-Z][A-Za-z0-9_]*\b/],
      ['num', /\b\d+(?:\.\d+)?[fFL]?\b/],
      ['fn', /\b[a-z_][A-Za-z0-9_]*(?=\s*\()/]
    ],
    bash: [
      ['com', /#[^\n]*/],
      ['str', /"(?:\\.|[^"\\])*"|'[^']*'/],
      ['kw', /\b(?:sudo|apt|apt-get|brew|npm|yarn|pnpm|git|cd|ls|mkdir|rm|cp|mv|echo|export|curl|wget|chmod|grep|cat|source|alias|if|then|fi|for|do|done|while|set|exit|return)\b/],
      ['fn', /-{1,2}[a-zA-Z][\w-]*/],
      ['num', /\b\d+\b/]
    ],
    json: [
      ['fn', /"(?:\\.|[^"\\])*"(?=\s*:)/],
      ['str', /"(?:\\.|[^"\\])*"/],
      ['kw', /\b(?:true|false|null)\b/],
      ['num', /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/]
    ],
    xml: [
      ['com', /<!--[\s\S]*?-->/],
      ['str', /"[^"]*"|'[^']*'/],
      ['kw', /<\/?[a-zA-Z][\w:.-]*|\/?>|<\?[\s\S]*?\?>/],
      ['type', /\b[a-zA-Z-]+(?==)/]
    ],
    yaml: [
      ['com', /#[^\n]*/],
      ['fn', /^[ \t]*-?[ \t]*[a-zA-Z_][\w.-]*(?=\s*:)/],
      ['str', /"[^"]*"|'[^']*'/],
      ['kw', /\b(?:true|false|null|yes|no)\b/],
      ['num', /\b\d+(?:\.\d+)?\b/]
    ],
    groovy: [
      ['com', /\/\/[^\n]*|\/\*[\s\S]*?\*\/|\/\*[^\n]*/],
      ['str', /"""[\s\S]*?"""|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/],
      ['kw', /\b(?:plugins|id|version|implementation|api|compileOnly|runtimeOnly|testImplementation|dependencies|android|defaultConfig|buildTypes|productFlavors|namespace|kotlin|def|return|if|else|for|while|true|false|null|new|class|import|ext)\b/],
      ['type', /\b[A-Z][A-Za-z0-9_]*\b/],
      ['num', /\b\d+(?:\.\d+)?\b/],
      ['fn', /\b[a-z_][A-Za-z0-9_]*(?=\s*[\({])/]
    ],
    generic: [
      ['com', /\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/|\/\*[^\n]*/],
      ['str', /"(?:\\.|[^"\\])*"|'[^']*'|`[^`]*`/],
      ['kw', /\b(?:true|false|null|if|else|for|while|return|function|class|import|export|from|const|let|var|new|def|end)\b/],
      ['num', /\b\d+(?:\.\d+)?\b/]
    ]
  };

  function highlightLine(line, rules) {
    var combined = new RegExp(rules.map(function (r) { return '(' + r[1].source + ')'; }).join('|'), 'g');
    var out = '', last = 0, m;
    while ((m = combined.exec(line)) !== null) {
      out += escapeHtml(line.slice(last, m.index));
      var cls = '';
      for (var i = 0; i < rules.length; i++) { if (m[i + 1] !== undefined) { cls = rules[i][0]; break; } }
      out += cls ? '<span class="tok-' + cls + '">' + escapeHtml(m[0]) + '</span>' : escapeHtml(m[0]);
      last = m.index + m[0].length;
      if (m[0].length === 0) combined.lastIndex++;
    }
    out += escapeHtml(line.slice(last));
    return out || '&nbsp;';
  }

  function parseHighlights(str) {
    var set = {};
    if (!str) return set;
    str.split(',').forEach(function (part) {
      part = part.trim();
      if (/^\d+$/.test(part)) set[parseInt(part, 10)] = true;
      else {
        var r = part.split('-');
        if (r.length === 2) {
          var a = parseInt(r[0], 10), b = parseInt(r[1], 10);
          for (var n = a; n <= b; n++) set[n] = true;
        }
      }
    });
    return set;
  }

  function enhanceCodeBlocks(root) {
    $$('pre', root).forEach(function (pre) {
      if (pre.closest('.code-block')) return;
      var code = pre.querySelector('code');
      if (!code) return;
      var langClass = (code.className.match(/language-([\w-]+)/) || [])[1] || 'generic';
      var lang = langClass.toLowerCase();
      var rules = RULES[lang] || RULES.generic;
      var file = code.getAttribute('data-file') || '';
      var highlights = parseHighlights(code.getAttribute('data-highlight'));
      var raw = code.textContent.replace(/\n$/, '');
      var lines = raw.split('\n');

      var block = el('div', { class: 'code-block' });
      var header = el('div', { class: 'code-block__header', html:
        '<span class="code-block__dots"><span></span><span></span><span></span></span>' +
        (file ? '<span class="code-block__file">' + escapeHtml(file) + '</span>' : '') +
        '<span class="code-block__lang">' + escapeHtml(lang) + '</span>' +
        '<button class="code-block__copy" aria-label="Copy code">' + I.copy + '<span>Copy</span></button>'
      });
      var body = el('div', { class: 'code-block__body' });
      var pre2 = el('pre');
      lines.forEach(function (ln, i) {
        var span = el('span', { class: 'code-line' + (highlights[i + 1] ? ' highlight' : '') });
        span.innerHTML = highlightLine(ln, rules);
        pre2.appendChild(span);
      });
      body.appendChild(pre2);
      block.appendChild(header);
      block.appendChild(body);
      pre.parentNode.replaceChild(block, pre);

      $('.code-block__copy', block).addEventListener('click', function () {
        var btn = this;
        copyText(raw, 'Code copied');
        btn.classList.add('copied');
        btn.innerHTML = I.check + '<span>Copied</span>';
        setTimeout(function () { btn.classList.remove('copied'); btn.innerHTML = I.copy + '<span>Copy</span>'; }, 1800);
      });
    });
  }

  /* ------------------------------------------------------------------------
     14. Tabs & accordions
     ------------------------------------------------------------------------ */
  function initTabs(root) {
    $$('.tabs', root).forEach(function (tabs) {
      var tabButtons = $$('[role="tab"]', tabs);
      var panels = $$('[role="tabpanel"]', tabs);
      tabButtons.forEach(function (btn, i) {
        btn.addEventListener('click', function () {
          tabButtons.forEach(function (b) { b.setAttribute('aria-selected', 'false'); b.tabIndex = -1; });
          panels.forEach(function (p) { p.hidden = true; });
          btn.setAttribute('aria-selected', 'true'); btn.tabIndex = 0;
          var panel = panels[i]; if (panel) panel.hidden = false;
        });
      });
    });
  }
  function initAccordions(root) {
    $$('.accordion-item', root).forEach(function (item) {
      var trig = $('.accordion-trigger', item);
      var panel = $('.accordion-panel', item);
      if (!trig || !panel) return;
      trig.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
        trig.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ------------------------------------------------------------------------
     15. Search
     ------------------------------------------------------------------------ */
  var searchOverlay = null, searchActive = -1, searchResults = [];

  function buildSearch() {
    var isMac = /Mac|iP/.test(navigator.platform);
    searchOverlay = el('div', { class: 'search-overlay', html:
      '<div class="search-modal" role="dialog" aria-modal="true" aria-label="Search documentation">' +
        '<div class="search-modal__input-wrap">' + I.search +
          '<input type="search" placeholder="Search pages, features, APIs…" aria-label="Search" data-search-input autocomplete="off">' +
          '<kbd class="search-modal__esc">Esc</kbd>' +
        '</div>' +
        '<div class="search-results" data-search-results></div>' +
        '<div class="search-modal__footer">' +
          '<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>' +
          '<span><kbd>↵</kbd> open</span>' +
          '<span><kbd>' + (isMac ? '⌘' : 'Ctrl') + 'K</kbd> toggle</span>' +
        '</div>' +
      '</div>'
    });
    document.body.appendChild(searchOverlay);

    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) closeSearch();
      var r = e.target.closest('.search-result');
      if (r) go(r.getAttribute('data-path'));
    });
    var input = $('[data-search-input]', searchOverlay);
    input.addEventListener('input', function () { runSearch(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); if (searchResults[searchActive]) go(searchResults[searchActive].path); }
    });
  }

  function fuzzy(query, text) {
    query = query.toLowerCase(); text = text.toLowerCase();
    if (!query) return 1;
    var idx = text.indexOf(query);
    if (idx !== -1) return 1000 - idx + (text.startsWith(query) ? 500 : 0);
    var qi = 0, score = 0, last = -2;
    for (var ti = 0; ti < text.length && qi < query.length; ti++) {
      if (text[ti] === query[qi]) { score += (ti === last + 1) ? 8 : 1; last = ti; qi++; }
    }
    return qi === query.length ? score : -1;
  }

  function runSearch(q) {
    var res = $('[data-search-results]', searchOverlay);
    q = q.trim();
    if (!q) { res.innerHTML = defaultResults(); bindResults(res); return; }
    var scored = FLAT.map(function (item) {
      var s = Math.max(
        fuzzy(q, item.title) * 2,
        fuzzy(q, item.kw),
        fuzzy(q, item.desc) * 0.5,
        fuzzy(q, item.section) * 0.3
      );
      return { item: item, score: s };
    }).filter(function (x) { return x.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 12);
    searchResults = scored.map(function (x) { return x.item; });
    if (!scored.length) {
      res.innerHTML = '<div class="search-empty">No results for “' + escapeHtml(q) + '”.<br>Try “privacy”, “geckoview” or “downloads”.</div>';
      searchActive = -1; return;
    }
    var html = '', lastSection = null;
    scored.forEach(function (x, i) {
      if (x.item.section !== lastSection) {
        html += '<div class="search-results__group">' + x.item.section + '</div>';
        lastSection = x.item.section;
      }
      html += '<div class="search-result' + (i === 0 ? ' active' : '') + '" data-path="' + x.item.path + '">' +
        '<span class="search-result__icon">' + I.doc + '</span>' +
        '<span class="search-result__body">' +
          '<span class="search-result__title">' + highlightMatch(x.item.title, q) + '</span>' +
          '<span class="search-result__desc">' + escapeHtml(x.item.desc) + '</span>' +
        '</span><span class="search-result__enter">' + I.right + '</span></div>';
    });
    res.innerHTML = html;
    searchActive = 0;
    bindResults(res);
  }

  function highlightMatch(title, q) {
    var i = title.toLowerCase().indexOf(q.toLowerCase());
    if (i === -1) return escapeHtml(title);
    return escapeHtml(title.slice(0, i)) + '<mark>' + escapeHtml(title.slice(i, i + q.length)) + '</mark>' + escapeHtml(title.slice(i + q.length));
  }

  function defaultResults() {
    var popular = ['features/privacy', 'features/media-hub', 'developer/architecture', 'getting-started/quick-start', 'features/extensions'];
    var html = '<div class="search-results__group">Popular</div>';
    popular.forEach(function (p) {
      var item = FLAT.find(function (x) { return x.path === p; });
      if (!item) return;
      html += '<div class="search-result" data-path="' + item.path + '">' +
        '<span class="search-result__icon">' + I.doc + '</span>' +
        '<span class="search-result__body"><span class="search-result__title">' + item.title + '</span>' +
        '<span class="search-result__desc">' + escapeHtml(item.desc) + '</span></span><span class="search-result__enter">' + I.right + '</span></div>';
    });
    return html;
  }

  function bindResults(res) {
    searchResults = $$('.search-result', res).map(function (r) {
      return FLAT.find(function (x) { return x.path === r.getAttribute('data-path'); });
    }).filter(Boolean);
    searchActive = searchResults.length ? 0 : -1;
  }

  function moveActive(dir) {
    var items = $$('.search-result', searchOverlay);
    if (!items.length) return;
    items.forEach(function (i) { i.classList.remove('active'); });
    searchActive = (searchActive + dir + items.length) % items.length;
    items[searchActive].classList.add('active');
    items[searchActive].scrollIntoView({ block: 'nearest' });
  }

  function go(path) { closeSearch(); window.location.href = link(path); }

  function openSearch() {
    if (!searchOverlay) buildSearch();
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var input = $('[data-search-input]', searchOverlay);
    input.value = '';
    runSearch('');
    setTimeout(function () { input.focus(); }, 60);
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function initSearchTriggers() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-search-open]')) openSearch();
    });
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchOverlay && searchOverlay.classList.contains('open') ? closeSearch() : openSearch();
      } else if (e.key === 'Escape') {
        closeSearch();
        document.body.classList.remove('sidebar-open');
      } else if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) {
        e.preventDefault(); openSearch();
      }
    });
  }

  /* ------------------------------------------------------------------------
     16. Reading progress + back to top
     ------------------------------------------------------------------------ */
  function initProgress() {
    var bar = $('.reading-progress__bar');
    var toTop = $('.to-top');
    function onScroll() {
      var h = document.documentElement;
      var scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar) bar.style.width = (scrolled * 100) + '%';
      if (toTop) toTop.classList.toggle('visible', h.scrollTop > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ------------------------------------------------------------------------
     17. Mobile sidebar + bottom nav
     ------------------------------------------------------------------------ */
  function initMobile() {
    var backdrop = el('div', { class: 'sidebar-backdrop', 'data-sidebar-toggle': '' });
    document.body.appendChild(backdrop);

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-sidebar-toggle]')) {
        document.body.classList.toggle('sidebar-open');
      }
    });

    var nav = el('nav', { class: 'mobile-nav', 'aria-label': 'Quick navigation', html:
      '<button data-sidebar-toggle>' + I.menu + '<span>Menu</span></button>' +
      '<button data-search-open>' + I.search + '<span>Search</span></button>' +
      '<a href="' + BASE + 'index.html">' + I.home + '<span>Home</span></a>' +
      '<a href="' + REPO + '" target="_blank" rel="noopener">' + I.github + '<span>GitHub</span></a>'
    });
    document.body.appendChild(nav);
  }

  /* ------------------------------------------------------------------------
     18. Scroll reveal
     ------------------------------------------------------------------------ */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length || !('IntersectionObserver' in window)) { items.forEach(function (i) { i.classList.add('in'); }); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    items.forEach(function (i) { obs.observe(i); });
  }

  /* ------------------------------------------------------------------------
     19. Version selector
     ------------------------------------------------------------------------ */
  function initVersion() {
    document.addEventListener('change', function (e) {
      if (!e.target.matches('[data-version]')) return;
      var v = e.target.value;
      if (v === 'v1.2.6') toast('You’re on the latest version');
      else toast('Showing archive: ' + v + ' (latest is v1.2.6)');
    });
  }

  /* ------------------------------------------------------------------------
     20. Boot
     ------------------------------------------------------------------------ */
  function boot() {
    // Global chrome
    var ambient = el('div', { class: 'bg-ambient' });
    document.body.prepend(ambient);
    var progress = el('div', { class: 'reading-progress', html: '<div class="reading-progress__bar"></div>' });
    document.body.prepend(progress);
    var skip = el('a', { class: 'skip-link', href: '#content' }, 'Skip to content');
    document.body.prepend(skip);
    var toastEl = el('div', { class: 'toast', id: 'omni-toast' });
    document.body.appendChild(toastEl);
    var toTop = el('button', { class: 'to-top', 'aria-label': 'Back to top', html: I.up });
    document.body.appendChild(toTop);

    initTheme();
    renderHeader();
    initSearchTriggers();
    initProgress();
    initMobile();
    initVersion();
    initReveal();

    var content = $('#content');
    var isLanding = document.body.getAttribute('data-layout') === 'landing';

    if (content && !isLanding) {
      var activePath = content.getAttribute('data-nav');
      var active = FLAT.find(function (x) { return x.path === activePath; });

      // Build the 3-column layout around the existing content
      var layout = el('div', { class: 'docs-layout' });
      var sidebar = renderSidebar(activePath);
      var toc = renderToc(content);

      content.parentNode.insertBefore(layout, content);
      layout.appendChild(sidebar);
      layout.appendChild(content);
      if (toc) layout.appendChild(toc);

      // Wrap content and inject page chrome
      var inner = el('div', { class: 'content__inner' });
      while (content.firstChild) inner.appendChild(content.firstChild);
      content.appendChild(inner);

      var crumbs = renderBreadcrumbs(active);
      if (crumbs) inner.insertBefore(crumbs, inner.firstChild);

      var meta = renderPageMeta(content, active);
      var h1 = $('h1', inner);
      if (meta) {
        var anchor = h1;
        // Place the meta row after the lead paragraph when one follows the H1
        if (h1 && h1.nextElementSibling && h1.nextElementSibling.classList.contains('lead')) {
          anchor = h1.nextElementSibling;
        }
        if (anchor && anchor.parentNode === inner) inner.insertBefore(meta, anchor.nextSibling);
        else inner.insertBefore(meta, inner.firstChild);
      }

      addHeadingAnchors(inner);
      enhanceCodeBlocks(inner);
      initTabs(inner);
      initAccordions(inner);

      inner.appendChild(renderPager(activePath) || el('div'));
      if (activePath) inner.appendChild(renderFeedback(activePath));
    } else if (content && isLanding) {
      enhanceCodeBlocks(content);
      initTabs(content);
      initAccordions(content);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
