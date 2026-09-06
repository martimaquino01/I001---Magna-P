/* ═══════════════════════════════════════════════════════════════
   MAGNA PROPERTIES — interações
   Sem dependências. Tudo em transform/opacity, tudo em rAF.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine    = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp   = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp    = function (a, b, t) { return a + (b - a) * t; };

  /* ── 1. Ano ───────────────────────────────────────────────── */
  var yr = $('#year'); if (yr) yr.textContent = String(new Date().getFullYear());

  /* ── 2. Vídeo: escolhe a fonte pelo tamanho do ecrã ───────── */
  (function video() {
    var v = $('#heroVideo'); if (!v) return;
    var wide = window.innerWidth >= 900 && !(navigator.connection && navigator.connection.saveData);
    v.src = v.getAttribute(wide ? 'data-src-lg' : 'data-src-sm');
    v.load();
    var play = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    v.addEventListener('loadeddata', play, { once: true });
    play();
  })();

  /* ── 3. Ticker: duplica o conjunto para o loop ser contínuo ─ */
  (function ticker() {
    var row = $('#tickerRow'); if (!row) return;
    row.appendChild(row.firstElementChild.cloneNode(true));
  })();

  /* ── 4. Preloader ─────────────────────────────────────────── */
  (function loader() {
    var el = $('#loader'), num = $('#loaderCount'), bar = $('#loaderBar');
    if (!el) { document.body.classList.add('is-ready'); return; }

    // comprimento real de cada traço do monograma → desenho exacto
    $$('.mk', el).forEach(function (p) {
      try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (e) {}
    });

    var done = false;
    var finish = function () {
      if (done) return; done = true;
      num.textContent = '100'; bar.style.width = '100%';
      setTimeout(function () {
        el.classList.add('is-done');
        document.body.classList.add('is-ready');
        setTimeout(function () { el.remove(); }, 1300);
      }, reduced ? 60 : 220);
    };

    if (reduced) { finish(); return; }

    // MIN dá tempo ao monograma para se desenhar; MAX impede que uma rede
    // lenta prenda a página atrás do preloader.
    var MIN = 1500, MAX = 3400;
    var pct = 0, t0 = performance.now(), loaded = false;

    // Gatilho: DOM + fontes. Não esperamos pelo `load` da janela porque esse
    // fica preso ao download do vídeo do hero e atrasava a saída ~2s.
    var dom = new Promise(function (res) {
      if (document.readyState !== 'loading') res();
      else document.addEventListener('DOMContentLoaded', res, { once: true });
    });
    var fonts = (document.fonts && document.fonts.ready) || Promise.resolve();
    Promise.all([dom, fonts]).then(function () { loaded = true; }, function () { loaded = true; });

    (function tick() {
      var e = performance.now() - t0;
      var pace = Math.min(94, (e / MIN) * 94);
      var target = (loaded && e >= MIN * 0.55) ? 100 : pace;
      pct = Math.min(target, pct + Math.max(0.9, (target - pct) * 0.14));
      num.textContent = String(Math.floor(pct));
      bar.style.width = pct.toFixed(1) + '%';
      if ((pct >= 99.5 && e >= MIN) || e >= MAX) finish();
      else requestAnimationFrame(tick);
    })();
  })();

  /* ── 5. Split de palavras para os títulos ─────────────────── */
  function split(node, counter) {
    var kids = Array.prototype.slice.call(node.childNodes);
    kids.forEach(function (n) {
      if (n.nodeType === 3) {
        var parts = n.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          var outer = document.createElement('span'); outer.className = 'w';
          var inner = document.createElement('span'); inner.className = 'w-i';
          inner.textContent = p;
          inner.style.setProperty('--wd', (counter.i++ * 42) + 'ms');
          outer.appendChild(inner); frag.appendChild(outer);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) {
        split(n, counter);
      }
    });
  }
  if (!reduced) $$('[data-split]').forEach(function (el) { split(el, { i: 0 }); });

  /* ── 6. Reveals ao scroll ─────────────────────────────────── */
  (function reveals() {
    var items = $$('[data-reveal], [data-split], [data-line]');
    items.forEach(function (el) {
      var d = el.getAttribute('data-delay');
      if (d) el.style.setProperty('--d', d + 'ms');
    });
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ── 7. Contadores ────────────────────────────────────────── */
  (function counters() {
    var nodes = $$('[data-count]');
    if (!nodes.length) return;

    var fmt = function (v, dec, pre, suf) {
      var s = dec ? v.toFixed(dec).replace('.', ',') : String(Math.round(v));
      return pre + s + suf;
    };
    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var pre = el.getAttribute('data-prefix') || '';
      var suf = el.getAttribute('data-suffix') || '';
      if (reduced) { el.textContent = fmt(target, dec, pre, suf); return; }
      var t0 = performance.now(), dur = 1700;
      (function step(now) {
        var p = clamp((now - t0) / dur, 0, 1);
        var e = 1 - Math.pow(1 - p, 4);                 // easeOutQuart
        el.textContent = fmt(target * e, dec, pre, suf);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmt(target, dec, pre, suf);
      })(performance.now());
    };

    if (!('IntersectionObserver' in window)) { nodes.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        run(e.target); io.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    nodes.forEach(function (el) { io.observe(el); });
  })();

  /* ── 8. Cursor ────────────────────────────────────────────── */
  (function cursor() {
    if (!fine || reduced) return;
    var c = $('#cursor'); if (!c) return;
    document.documentElement.classList.add('has-cursor');
    var dot = $('.cursor__dot', c), ring = $('.cursor__ring', c);
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

    var live = false;
    addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!live) { live = true; rx = mx; ry = my; c.classList.add('is-live'); }
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%) rotate(45deg)';
    }, { passive: true });
    addEventListener('mousedown', function () { c.classList.add('is-down'); });
    addEventListener('mouseup',   function () { c.classList.remove('is-down'); });
    addEventListener('mouseleave', function () { c.classList.remove('is-live'); });
    addEventListener('mouseenter', function () { if (live) c.classList.add('is-live'); });

    (function loop() {
      rx = lerp(rx, mx, 0.16); ry = lerp(ry, my, 0.16);
      ring.style.transform = 'translate(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px) translate(-50%,-50%) rotate(45deg)';
      requestAnimationFrame(loop);
    })();

    var hot = 'a, button, label, input, textarea, [data-magnetic]';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(hot)) c.classList.add('is-hot');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(hot)) c.classList.remove('is-hot');
    });
  })();

  /* ── 9. Botões magnéticos ─────────────────────────────────── */
  (function magnetic() {
    if (!fine || reduced) return;
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.22;
        var y = (e.clientY - r.top - r.height / 2) * 0.34;
        el.style.transition = 'transform .18s cubic-bezier(.16,1,.3,1)';
        el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transition = 'transform .55s cubic-bezier(.16,1,.3,1)';
        el.style.transform = '';
      });
    });
  })();

  /* ── 10. Nav: encolher, esconder, secção activa ───────────── */
  (function nav() {
    var nav = $('#nav'), last = 0;
    var links = $$('.nav__links a');
    var secs = links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);

    var onScroll = function () {
      var y = window.scrollY || 0;
      nav.classList.toggle('is-stuck', y > 30);
      if (!nav.classList.contains('is-open')) {
        nav.classList.toggle('is-hidden', y > 420 && y > last + 4);
      }
      last = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window && secs.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var a = links[secs.indexOf(e.target)];
          if (a) a.classList.toggle('is-active', e.isIntersecting);
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      secs.forEach(function (s) { io.observe(s); });
    }
  })();

  /* ── 11. Menu mobile ──────────────────────────────────────── */
  (function menu() {
    var btn = $('#burger'), panel = $('#menu'), nav = $('#nav');
    if (!btn || !panel) return;
    var open = false;
    var set = function (state) {
      open = state;
      btn.classList.toggle('is-on', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
      if (open) {
        panel.hidden = false;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { panel.classList.add('is-open'); });
        });
      }
      else {
        panel.classList.remove('is-open');
        setTimeout(function () { if (!open) panel.hidden = true; }, 800);
      }
    };
    btn.addEventListener('click', function () { set(!open); });
    $$('a', panel).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) set(false); });
  })();

  /* ── 12. Parallax do hero + barra do horizonte + band ─────── */
  (function parallax() {
    var vid   = $('#heroVideo');
    var body  = $('.hero__body');
    var fill  = $('#horizonFill');
    var sky   = $('.band__sky');
    var ticking = false;

    var frame = function () {
      ticking = false;
      var y = window.scrollY || 0;
      var vh = innerHeight;

      var doc = document.documentElement.scrollHeight - vh;
      if (fill) fill.style.height = (doc > 0 ? clamp(y / doc, 0, 1) * 100 : 0).toFixed(2) + '%';

      if (!reduced) {
        if (vid && y < vh * 1.2) {
          var p = clamp(y / vh, 0, 1);
          vid.style.transform = 'scale(' + (1.14 - p * 0.09).toFixed(4) + ') translate3d(0,' + (p * 11).toFixed(2) + '%,0)';
        }
        if (body && y < vh) {
          body.style.transform = 'translate3d(0,' + (y * 0.16).toFixed(1) + 'px,0)';
          body.style.opacity = String(clamp(1 - y / (vh * 0.72), 0, 1));
        }
        if (sky) {
          var r = sky.parentElement.getBoundingClientRect();
          if (r.bottom > 0 && r.top < vh) {
            var q = (vh - r.top) / (vh + r.height);   // 0 → 1 ao atravessar
            sky.style.transform = 'translate3d(0,' + ((q - 0.5) * -14).toFixed(2) + '%,0)';
          }
        }
      }
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    frame();
  })();

  /* ── 13. Âncoras com offset da nav ────────────────────────── */
  (function anchors() {
    var nav = $('#nav');
    $$('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      a.addEventListener('click', function (e) {
        var t = document.querySelector(id); if (!t) return;
        e.preventDefault();
        var off = (nav ? nav.offsetHeight : 0) + 8;
        var top = t.getBoundingClientRect().top + window.scrollY - off;
        window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
        history.replaceState(null, '', id);
      });
    });
  })();

  /* ── 14. CTAs que pré-seleccionam o perfil no formulário ──── */
  $$('[data-form]').forEach(function (a) {
    a.addEventListener('click', function () {
      var v = a.getAttribute('data-form');
      var r = document.querySelector('.seg input[value="' + v + '"]');
      if (r) { r.checked = true; }
      setTimeout(function () { var n = $('#nome'); if (n && fine) n.focus({ preventScroll: true }); }, 900);
    });
  });

  /* ── 15. Formulário → WhatsApp ────────────────────────────── */
  (function form() {
    var f = $('#form'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = $('#nome'), ct = $('#contactoField');
      var bad = false;
      [nome, ct].forEach(function (i) {
        var empty = !i.value.trim();
        i.classList.toggle('is-bad', empty);
        if (empty && !bad) { i.focus(); bad = true; }
      });
      if (bad) return;

      var perfil = (f.querySelector('input[name=perfil]:checked') || {}).value === 'investidor'
        ? 'Investidor' : 'Proprietário';
      var zona = $('#zona').value.trim();
      var msg  = $('#msg').value.trim();

      var text = [
        'Olá Magna Properties,',
        '',
        'Nome: ' + nome.value.trim(),
        'Contacto: ' + ct.value.trim(),
        'Perfil: ' + perfil,
        zona ? 'Zona: ' + zona : null,
        msg ? '' : null,
        msg || null
      ].filter(function (l) { return l !== null; }).join('\n');

      window.open('https://wa.me/351935904830?text=' + encodeURIComponent(text), '_blank', 'noopener');

      var note = $('.form__sent', f);
      if (!note) {
        note = document.createElement('p');
        note.className = 'form__sent';
        f.appendChild(note);
      }
      note.textContent = 'Mensagem preparada no WhatsApp. Se não abriu, escreva-nos para +351 935 904 830.';
    });

    $$('input, textarea', f).forEach(function (i) {
      i.addEventListener('input', function () { i.classList.remove('is-bad'); });
    });
  })();

})();
