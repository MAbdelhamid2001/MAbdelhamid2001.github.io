/* ==========================================================================
   Portfolio runtime
   Renders every section from data.js, then wires up the interactions.
   ========================================================================== */
(function () {
  "use strict";

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- icons */
  const ICONS = {
    code:     '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',
    brain:    '<path d="M9.5 3A2.5 2.5 0 0 0 7 5.5 2.5 2.5 0 0 0 4.5 8v1A2.5 2.5 0 0 0 4 13.5 2.5 2.5 0 0 0 6.5 18 2.5 2.5 0 0 0 9 21h.5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM14.5 3A2.5 2.5 0 0 1 17 5.5 2.5 2.5 0 0 1 19.5 8v1a2.5 2.5 0 0 1 .5 4.5A2.5 2.5 0 0 1 17.5 18 2.5 2.5 0 0 1 15 21h-.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>',
    chart:    '<path d="M3 3v16a2 2 0 0 0 2 2h16M7 15l4-5 3 3 5-6"/>',
    server:   '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
    cloud:    '<path d="M17.5 19a4.5 4.5 0 0 0 .4-9A6.5 6.5 0 0 0 5.2 11 4 4 0 0 0 6 19z"/>',
    database: '<ellipse cx="12" cy="5.5" rx="8" ry="3.2"/><path d="M4 5.5v13c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-13M4 12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2"/>',
    /* per-category cover glyphs */
    cv:  '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3.2"/>',
    nlp: '<path d="M21 12a8 8 0 1 1-3.1-6.3"/><path d="M7.5 10h9M7.5 14h5"/>',
    dsp: '<path d="M2 12h3l2.5-7 3.5 14 3-10.5L17 15l2-3h3"/>',
    ds:  '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="7" y="11" width="3" height="7" rx="1"/><rect x="13" y="6" width="3" height="12" rx="1"/>',
    eng: '<path d="M14.7 6.3a4 4 0 0 1-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5z"/>',
    github: '<path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/>',
    live:   '<path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    paper:  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    check:  '<path d="M20 6L9 17l-5-5"/>',
    arrow:  '<path d="M7 17L17 7m0 0H8m9 0v9"/>',
  };

  const stroke = (name, fill) =>
    '<svg viewBox="0 0 24 24" fill="' + (fill ? "currentColor" : "none") +
    '" stroke="' + (fill ? "none" : "currentColor") +
    '" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + "</svg>";

  const tagList = (items) =>
    '<ul class="tags">' + items.map((t) => '<li class="tag">' + t + "</li>").join("") + "</ul>";

  /* ------------------------------------------------------------ rendering */

  function renderStats() {
    const host = $("#stats");
    if (!host) return;
    host.innerHTML = PROFILE.stats
      .map((s) =>
        '<li><span class="stat-value" data-count="' + s.value + '" data-suffix="' + s.suffix + '">0' +
        s.suffix + '</span><span class="stat-label">' + s.label + "</span></li>")
      .join("");
  }

  function renderEducation() {
    const host = $("#education");
    if (!host) return;
    host.innerHTML =
      "<h3>Education</h3>" +
      '<p class="edu-degree">' + EDUCATION.degree + "</p>" +
      '<p class="edu-school">' + EDUCATION.school + "</p>" +
      '<p class="edu-meta">' + EDUCATION.period + " &middot; " + EDUCATION.place +
        " &middot; GPA <b>" + EDUCATION.gpa + "</b></p>" +
      tagList(EDUCATION.coursework);
  }

  function renderTimeline() {
    const host = $("#timeline");
    if (!host) return;
    host.innerHTML = EXPERIENCE.map((job, i) =>
      '<li class="tl-item reveal' + (job.current ? " is-current" : "") + '" data-delay="' + i * 90 + '">' +
        '<article class="tl-card">' +
          '<div class="tl-top">' +
            '<h3 class="tl-role">' + job.role + "</h3>" +
            (job.current ? '<span class="tl-now">Current</span>' : "") +
          "</div>" +
          '<p class="tl-org">' + job.org + "</p>" +
          '<p class="tl-meta">' + job.period + " &middot; " + job.place + "</p>" +
          '<ul class="tl-points">' + job.points.map((p) => "<li>" + p + "</li>").join("") + "</ul>" +
          tagList(job.stack) +
        "</article>" +
      "</li>").join("");
  }

  function linkMarkup(l) {
    const icon = l.kind === "live" ? "live" : l.kind === "paper" ? "paper" : "github";
    const filled = icon === "github";
    return '<a class="flink ' + (l.kind === "live" ? "live" : "") + '" href="' + l.url +
      '" target="_blank" rel="noopener">' + stroke(icon, filled) + l.label + "</a>";
  }

  function featuredMarkup(p, i) {
    const cat = CATEGORIES[p.category];
    return '<article class="fcard reveal" data-cat="' + p.category + '" data-delay="' + (i % 2) * 80 +
        '" style="--h:' + cat.hue + '">' +
        '<div class="fcover">' +
          '<div class="fcover-glyph">' + stroke(p.category) + "</div>" +
          '<span class="fcover-year">' + p.year + "</span>" +
          '<span class="fcover-cat">' + cat.label + "</span>" +
        "</div>" +
        '<div class="fbody">' +
          (p.badge ? '<span class="fbadge">' + p.badge + "</span>" : "") +
          "<h3>" + p.title + "</h3>" +
          '<p class="fblurb">' + p.blurb + "</p>" +
          (p.highlights
            ? '<ul class="fhighlights">' + p.highlights.map((h) => "<li>" + h + "</li>").join("") + "</ul>"
            : "") +
          (p.metrics
            ? '<div class="fmetrics">' + p.metrics.map((m) =>
                '<div class="fmetric"><b>' + m.value + "</b><span>" + m.label + "</span></div>").join("") + "</div>"
            : "") +
          '<div class="fstack">' + tagList(p.stack) + "</div>" +
          '<div class="flinks">' + p.links.map(linkMarkup).join("") + "</div>" +
        "</div>" +
      "</article>";
  }

  function moreMarkup(p, i) {
    const cat = CATEGORIES[p.category];
    return '<article class="mcard reveal" data-cat="' + p.category + '" data-delay="' + (i % 3) * 70 +
        '" style="--h:' + cat.hue + '">' +
        '<div class="mcard-top">' +
          '<span class="mcard-icon">' + stroke(p.category) + "</span>" +
          '<span class="mcard-year">' + p.year + "</span>" +
        "</div>" +
        "<h4>" + p.title + "</h4>" +
        "<p>" + p.blurb + "</p>" +
        tagList(p.stack) +
        '<a class="mcard-link" href="' + p.links[0].url + '" target="_blank" rel="noopener">' +
          "View source" + stroke("arrow") +
        "</a>" +
      "</article>";
  }

  function renderProjects() {
    const featured = PROJECTS.filter((p) => p.featured);
    const rest = PROJECTS.filter((p) => !p.featured);

    const fHost = $("#featured");
    const mHost = $("#moreGrid");
    if (fHost) fHost.innerHTML = featured.map(featuredMarkup).join("");
    if (mHost) mHost.innerHTML = rest.map(moreMarkup).join("");

    /* Filter chips, counted from the data */
    const host = $("#filters");
    if (!host) return;

    const counts = {};
    PROJECTS.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });

    const chips = ['<button class="filter" role="tab" aria-selected="true" data-filter="all">All work' +
      '<span class="count">' + PROJECTS.length + "</span></button>"];

    Object.keys(CATEGORIES).forEach((key) => {
      if (!counts[key]) return;
      chips.push('<button class="filter" role="tab" aria-selected="false" data-filter="' + key + '">' +
        CATEGORIES[key].label + '<span class="count">' + counts[key] + "</span></button>");
    });
    host.innerHTML = chips.join("");
  }

  function renderSkills() {
    const host = $("#skillsGrid");
    if (host) {
      host.innerHTML = SKILLS.map((s, i) =>
        '<article class="skill-card reveal" data-delay="' + (i % 3) * 80 + '">' +
          '<div class="skill-head"><span class="skill-ico">' + stroke(s.icon) + "</span>" +
          "<h3>" + s.group + "</h3></div>" +
          tagList(s.items) +
        "</article>").join("");
    }

    const track = $("#marquee");
    if (track) {
      const all = SKILLS.reduce((acc, s) => acc.concat(s.items), []);
      const row = all.map((t) => "<span>" + t + "</span>").join("");
      track.innerHTML = row + row; /* duplicated for a seamless loop */
    }
  }

  function renderResearch() {
    const pubs = $("#pubs");
    if (pubs) {
      pubs.innerHTML = PUBLICATIONS.map((p) =>
        '<article class="pub-card">' +
          '<span class="pub-tag">' + stroke("paper") + "Peer-reviewed &middot; " + p.year + "</span>" +
          "<h3>" + p.title + "</h3>" +
          '<p class="pub-venue">' + p.venue + "</p>" +
          '<p class="pub-note">' + p.note + "</p>" +
          '<div class="flinks">' + p.links.map(linkMarkup).join("") + "</div>" +
        "</article>").join("");
    }

    const certs = $("#certs");
    if (certs) {
      certs.innerHTML = CERTIFICATIONS.map((c) =>
        "<li>" + stroke("check") +
          '<div><span class="cert-name">' + c.name + "</span>" +
          '<span class="cert-issuer">' + c.issuer + "</span></div></li>").join("");
    }
  }

  /* --------------------------------------------------------- interactions */

  function initTheme() {
    const btn = $("#themeToggle");
    const saved = (function () {
      try { return localStorage.getItem("theme"); } catch (e) { return null; }
    })();

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const start = saved || (prefersLight ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", start);

    if (!btn) return;
    btn.addEventListener("click", function () {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next === "dark" ? "#070b16" : "#f6f7fb");
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
    });
  }

  function initNav() {
    const nav = $("#nav");
    const btn = $("#menuBtn");
    const links = $("#navLinks");

    if (btn && links) {
      btn.addEventListener("click", function () {
        const open = links.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          links.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }

    const bar = $("#progressBar");
    const anchors = $$(".nav-links a");
    const sections = anchors
      .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
      .filter(Boolean);

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        const y = window.scrollY;
        if (nav) nav.classList.toggle("stuck", y > 24);

        if (bar) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
        }

        /* Highlight the section occupying the upper third of the viewport. */
        const line = y + window.innerHeight * 0.32;
        let current = null;
        sections.forEach(function (sec) {
          if (sec.offsetTop <= line) current = sec.id;
        });
        anchors.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + current);
        });

        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty("--d", (entry.target.dataset.delay || 0) + "ms");
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    items.forEach((el) => io.observe(el));
  }

  function initTyped() {
    const el = $("#typed");
    if (!el) return;
    const roles = PROFILE.roles;

    if (reduceMotion) { el.textContent = roles[0].replace("&amp;", "&"); return; }

    let r = 0, c = 0, deleting = false;
    (function tick() {
      const word = roles[r].replace("&amp;", "&");
      el.textContent = word.slice(0, c);

      if (!deleting && c < word.length) { c++; setTimeout(tick, 62); }
      else if (!deleting)               { deleting = true; setTimeout(tick, 1900); }
      else if (c > 0)                   { c--; setTimeout(tick, 28); }
      else { deleting = false; r = (r + 1) % roles.length; setTimeout(tick, 320); }
    })();
  }

  function initCounters() {
    const nums = $$(".stat-value");
    if (!nums.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach((n) => { n.textContent = n.dataset.count + n.dataset.suffix; });
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const dur = 1300;

        (function step(now) {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(step);
        })(start);

        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    nums.forEach((n) => io.observe(n));
  }

  function initFilters() {
    const host = $("#filters");
    if (!host) return;
    const empty = $("#gridEmpty");
    const moreHead = $(".more-head");

    host.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter");
      if (!btn) return;

      const key = btn.dataset.filter;
      $$(".filter", host).forEach((b) => b.setAttribute("aria-selected", String(b === btn)));

      let visible = 0;
      $$("[data-cat]").forEach(function (card) {
        const show = key === "all" || card.dataset.cat === key;
        card.classList.toggle("is-hidden", !show);
        if (show) visible++;
      });

      /* Hide the "more" divider when that half of the list is empty. */
      const moreVisible = $$("#moreGrid [data-cat]:not(.is-hidden)").length;
      if (moreHead) moreHead.classList.toggle("is-hidden", moreVisible === 0);
      if (empty) empty.hidden = visible !== 0;
    });
  }

  /* Pointer-following glow on the compact project cards. */
  function initCardGlow() {
    if (reduceMotion || window.matchMedia("(hover: none)").matches) return;
    document.addEventListener("pointermove", function (e) {
      const card = e.target.closest(".mcard");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* Subtle 3D tilt on the hero portrait. */
  function initTilt() {
    const el = $("#tilt");
    if (!el || reduceMotion || window.matchMedia("(hover: none)").matches) return;

    const hero = el.closest(".hero-visual");
    hero.addEventListener("pointermove", function (e) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        "perspective(900px) rotateY(" + (x * 13).toFixed(2) + "deg) rotateX(" + (-y * 13).toFixed(2) + "deg)";
    }, { passive: true });

    hero.addEventListener("pointerleave", function () { el.style.transform = ""; });
  }

  /* Animated neural-network canvas behind the page. */
  function initNeural() {
    const canvas = $("#neural");
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext && canvas.getContext("2d");
    if (!ctx) return; /* canvas unsupported or disabled - the gradients still carry the background */

    let w, h, nodes = [], raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.min(Math.round((w * h) / 22000), 90);
      nodes = Array.from({ length: count }, function () {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          r: Math.random() * 1.6 + 0.7,
        };
      });
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const light = document.documentElement.getAttribute("data-theme") === "light";
      const rgb = light ? "20, 40, 90" : "150, 200, 255";

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + rgb + ", " + (light ? 0.34 : 0.5) + ")";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x, dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 19000) continue;
          const alpha = (1 - d2 / 19000) * (light ? 0.13 : 0.2);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = "rgba(" + rgb + ", " + alpha + ")";
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    frame();

    let t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(resize, 180);
    });

    /* Stop burning frames when the tab is hidden. */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(frame);
    });
  }

  /* Contact form.
     Posts straight to Web3Forms, which relays the message to PROFILE.email.
     The visitor never leaves the page and no mail client is involved.

     >>> Paste your own access key in CONTACT_ACCESS_KEY (assets/js/data.js).
         Get one free in ~30 seconds at https://web3forms.com - enter your
         email address, and the key arrives in your inbox. <<< */
  function initForm() {
    const form = $("#contactForm");
    if (!form) return;

    const note = $("#formNote");
    const btn = $("#cf-submit");
    const honeypot = form.querySelector('[name="botcheck"]');
    /* Note: .map($) would hand the array index to $ as its `root` argument. */
    const fields = ["#cf-name", "#cf-email", "#cf-subject", "#cf-msg"]
      .map(function (sel) { return $(sel); })
      .filter(Boolean);

    function say(text, kind) {
      note.textContent = text;
      note.classList.toggle("err", kind === "err");
      note.classList.toggle("ok", kind === "ok");
    }

    /* Clear a field's error state as soon as the visitor fixes it. */
    fields.forEach(function (input) {
      input.addEventListener("input", function () {
        if (input.value.trim() !== "" && input.checkValidity()) {
          input.parentElement.classList.remove("invalid");
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let firstBad = null;
      fields.forEach(function (input) {
        const valid = input.value.trim() !== "" && input.checkValidity();
        input.parentElement.classList.toggle("invalid", !valid);
        if (!valid && !firstBad) firstBad = input;
      });

      if (firstBad) {
        say("Please fill in every field with a valid value.", "err");
        firstBad.focus();
        return;
      }

      if (!CONTACT_ACCESS_KEY || CONTACT_ACCESS_KEY.indexOf("PASTE_YOUR") === 0) {
        say("The form isn't connected yet - please email " + PROFILE.email + " directly.", "err");
        return;
      }

      const payload = {
        access_key: CONTACT_ACCESS_KEY,
        name: $("#cf-name").value.trim(),
        email: $("#cf-email").value.trim(),
        subject: $("#cf-subject").value.trim(),
        message: $("#cf-msg").value.trim(),
        botcheck: !!(honeypot && honeypot.checked),
        from_name: "Portfolio contact form",
        replyto: $("#cf-email").value.trim(), /* so Reply goes to the sender */
      };

      btn.disabled = true;
      form.classList.add("sending");
      say("Sending...", null);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) { return res.json().catch(function () { return {}; }); })
        .then(function (data) {
          if (data && data.success) {
            form.reset();
            say("Thanks - your message is on its way. I'll reply within a day.", "ok");
          } else {
            say((data && data.message) || "Something went wrong. Please email " +
                PROFILE.email + " instead.", "err");
          }
        })
        .catch(function () {
          say("Network error. Please email " + PROFILE.email + " instead.", "err");
        })
        .then(function () {
          btn.disabled = false;
          form.classList.remove("sending");
        });
    });
  }

  /* -------------------------------------------------------------- startup */

  /* Each step is isolated: a failure in one enhancement must not take the
     rest of the page down with it. */
  function run(label, fn) {
    try { fn(); }
    catch (err) { if (window.console) console.error("[portfolio] " + label + " failed:", err); }
  }

  function init() {
    run("theme",      initTheme);
    run("stats",      renderStats);
    run("education",  renderEducation);
    run("timeline",   renderTimeline);
    run("projects",   renderProjects);
    run("skills",     renderSkills);
    run("research",   renderResearch);

    run("nav",        initNav);
    run("reveal",     initReveal);
    run("typed",      initTyped);
    run("counters",   initCounters);
    run("filters",    initFilters);
    run("card-glow",  initCardGlow);
    run("tilt",       initTilt);
    run("neural",     initNeural);
    run("form",       initForm);

    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
