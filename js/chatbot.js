/* ============================================================
   PUBLICITY · CHATBOT (motor)
   Funciona 100% en el navegador, sin servidor ni claves. No guarda
   ni envía lo que escribe la persona. Los textos viven en
   js/chatbot-data.js; las categorías y productos se leen de data.js.
   ============================================================ */
(function () {
  "use strict";
  var D = window.CB_DATA;
  if (!D) return;

  var rm = window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches;
  var fine = window.matchMedia && matchMedia("(pointer:fine)").matches;

  /* ---------- utilidades de texto ---------- */
  function norm(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }
  var STOP = {}; ("de la el los las un una unos unas y o a en que es por para con me mi tu su se lo al del quiero necesito saber informacion info puedo pueden podrian favor porfavor hola buenas buenos dias tardes noches como cual cuales hay tienen tiene ustedes usted quisiera quisiera estoy esta este esto eso ese ver sobre mas muy si no ya le les nos mis tus sus ser son fue ha han he hacer hacen hago").split(" ").forEach(function (w) { STOP[w] = 1; });
  function toks(s) { return norm(s).split(" ").filter(function (w) { return w && !STOP[w]; }); }
  function stem(w) { return w.length > 3 ? w.replace(/s$/, "") : w; }
  function lev1(a, b) { /* ¿distancia de edición <= 1? */
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    var i = 0, j = 0, d = 0;
    while (i < la && j < lb) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++d > 1) return false;
      if (la > lb) i++; else if (lb > la) j++; else { i++; j++; }
    }
    return d + (la - i) + (lb - j) <= 1;
  }
  function tmatch(a, b) { /* a y b ya normalizados y con stem */
    if (a === b) return true;
    var m = Math.min(a.length, b.length);
    if (m < 4) return false;
    var cp = 0; while (cp < m && a[cp] === b[cp]) cp++;
    if (cp >= Math.max(4, m - 1) && Math.abs(a.length - b.length) <= 3) return true;
    return m >= 5 && lev1(a, b);
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* mini formato: **negrita**, *cursiva*, [texto](enlace), "- " viñetas, párrafos */
  function fmt(s) {
    var blocks = String(s).split(/\n\s*\n/), out = "";
    blocks.forEach(function (b) {
      var lines = b.split("\n"), isList = lines.every(function (l) { return /^- /.test(l); });
      function inline(t) {
        t = esc(t);
        t = t.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:|#|[a-z0-9_.\-\/]+\.html)[^)\s]*)\)/gi, function (m, a, u) {
          var ext = /^https?:/.test(u);
          return '<a href="' + u + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + a + "</a>";
        });
        t = t.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/\*([^*\s][^*]*)\*/g, "<em>$1</em>");
        return t;
      }
      if (isList) out += "<ul>" + lines.map(function (l) { return "<li>" + inline(l.slice(2)) + "</li>"; }).join("") + "</ul>";
      else out += "<p>" + lines.map(inline).join("<br>") + "</p>";
    });
    return out;
  }

  /* ---------- construir temas (estáticos + catálogo + trabajos) ---------- */
  var T = {}, TL = [];
  D.topics.forEach(function (t) { T[t.id] = t; TL.push(t); });

  var CATL = (typeof CAT !== "undefined" && Array.isArray(CAT)) ? CAT : [];
  var WKL = (typeof WK !== "undefined" && Array.isArray(WK)) ? WK : [];

  (function buildCatalog() {
    var cats = {}, order = [];
    CATL.forEach(function (p) { if (!cats[p.c]) { cats[p.c] = []; order.push(p.c); } cats[p.c].push(p.n); });
    var cap = T.catalogo;
    if (cap && CATL.length) {
      cap.a = "Nuestro **catálogo** tiene más de " + (Math.floor(CATL.length / 5) * 5) + " productos personalizables, en estas categorías:\n\n" +
        order.map(function (c) { return "- **" + c + "** (" + cats[c].length + ")"; }).join("\n") +
        "\n\nElige un producto y escríbenos por WhatsApp: lo personalizamos con tu diseño o tu marca. En la página puedes filtrar por categoría, deslizar para ver más fotos y tocar una para ampliarla.\n\nDime una categoría o un producto (por ejemplo, «mugs» o «llaveros») y te cuento qué tenemos.";
      cap.next = order.slice(0, 4).map(function (c) { return "cat-" + slug(c); });
    }
    order.forEach(function (c) {
      var al = (D.catAlias && D.catAlias[c]) || [];
      var words = toks(c).map(function (w) { return "*" + w; });
      var id = "cat-" + slug(c);
      var t = {
        id: id, chip: c, cat: c,
        kw: ["*" + norm(c)].concat(words, al),
        a: "En **" + c + "** tenemos: " + cats[c].join(", ") + ".\n\nTodo se personaliza con tu logo, diseño o texto. En el catálogo de la página toca «Cotizar por WhatsApp» en el producto que te guste. El valor depende de la cantidad y la personalización: te lo damos en la cotización.",
        next: ["cotizar", "personalizador", "precios"],
        act: [{ t: "Cotizar " + c.toLowerCase(), wa: "Hola PUBLICITY, quiero cotizar productos de la categoría: " + c }, { t: "Ver el catálogo", go: "#catalogo" }]
      };
      T[id] = t; TL.push(t);
    });
  })();
  function slug(s) { return norm(s).replace(/\s+/g, "-"); }

  /* índices para buscar un producto o trabajo por nombre */
  function buildIndex(list, kind) {
    var df = {}, items = list.map(function (p) {
      var tk = toks(p.n).map(stem);
      tk.forEach(function (w, i) { if (tk.indexOf(w) === i) df[w] = (df[w] || 0) + 1; });
      return { p: p, tk: tk, kind: kind };
    });
    return { items: items, df: df };
  }
  var IX = [buildIndex(CATL, "cat"), buildIndex(WKL, "wk")];

  function findItem(qt) {
    var best = null;
    IX.forEach(function (ix) {
      ix.items.forEach(function (it) {
        var m = 0, idf = 0, distinct = false;
        it.tk.forEach(function (w) {
          var hit = qt.some(function (q) { return tmatch(q, w); });
          if (hit) { m++; idf += 1 / (ix.df[w] || 1); if ((ix.df[w] || 1) === 1 && w.length >= 6) distinct = true; }
        });
        if (idf >= 1 && (m >= Math.ceil(it.tk.length * 0.6) || distinct)) {
          var sc = idf + m / it.tk.length;
          if (!best || sc > best.sc) best = { it: it, sc: sc };
        }
      });
    });
    return best && best.it;
  }

  /* ---------- puntuar temas ---------- */
  function scoreTopics(q) {
    var qn = " " + norm(q) + " ", qt = toks(q).map(stem), res = [];
    TL.forEach(function (t) {
      var sc = 0;
      t.kw.forEach(function (k) {
        var strong = k.charAt(0) === "*", raw = strong ? k.slice(1) : k, kn = norm(raw);
        if (!kn) return;
        var kt = kn.split(" ").filter(function (w) { return w && !STOP[w]; }).map(stem);
        if (!kt.length) return;
        var w = (strong ? 2 : 1);
        if (kt.length > 1) {
          if (qn.indexOf(" " + kn + " ") > -1) sc += w * 3;
          else if (kt.every(function (x) { return qt.some(function (y) { return tmatch(y, x); }); })) sc += w * 2;
        } else {
          if (qt.some(function (y) { return tmatch(y, kt[0]); })) sc += w * 1.5 + (qn.indexOf(" " + kn + " ") > -1 ? 0.5 : 0);
        }
      });
      if (sc > 0) res.push({ t: t, sc: sc });
    });
    res.sort(function (a, b) { return b.sc - a.sc; });
    return res;
  }

  /* ---------- interfaz ---------- */
  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
  var LOGO = "img/logo/logo-publicity.webp";
  function waLink(msg) { return "https://wa.me/" + D.wa + "?text=" + encodeURIComponent(msg || D.waDefault); }

  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "cb"; btn.setAttribute("aria-label", "Abrir el asistente de PUBLICITY");
  btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "cbp"); btn.setAttribute("data-cursor", "Asistente");
  btn.innerHTML = '<img src="' + LOGO + '" alt="" width="62" height="62" decoding="async"><span class="cb-dot" aria-hidden="true">1</span>';

  var tip = document.createElement("div");
  tip.className = "cb-tip"; tip.textContent = "¿Tienes dudas? Pregúntame por servicios, catálogo o cotizaciones.";

  var panel = document.createElement("div");
  panel.id = "cbp"; panel.className = "cbp"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Asistente de PUBLICITY");
  panel.innerHTML =
    '<div class="cbh"><img src="' + LOGO + '" alt="Logotipo PUBLICITY" width="44" height="44"><div><b>publi·city</b><small>Asistente virtual</small></div>' +
    '<button type="button" class="cbx" aria-label="Cerrar el asistente">×</button></div>' +
    '<div class="cbm" role="log" aria-live="polite" aria-relevant="additions"></div>' +
    '<form class="cbi" autocomplete="off"><input type="text" name="q" maxlength="200" placeholder="Escribe tu pregunta…" aria-label="Escribe tu pregunta" enterkeyhint="send">' +
    '<button type="submit" class="cbs" aria-label="Enviar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form>' +
    '<p class="cbf">Asistente automático. Precios y cotizaciones: te atiende el equipo por <a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a>.</p>';

  document.body.appendChild(btn); document.body.appendChild(tip); document.body.appendChild(panel);

  var msgs = panel.querySelector(".cbm"), form = panel.querySelector(".cbi"), input = form.querySelector("input");
  var opened = false, started = false, lastFocus = null, busy = false, misses = 0;

  function scrollEnd(el, long) {
    var go = function () {
      if (long && el) msgs.scrollTop = Math.max(0, el.offsetTop - 12);
      else msgs.scrollTop = msgs.scrollHeight;
    };
    go(); if (!rm) requestAnimationFrame(go);
  }
  function bubble(html, who) {
    var d = document.createElement("div");
    d.className = "cbb " + who; d.innerHTML = html; msgs.appendChild(d); return d;
  }
  function chips(ids, extraFirst) {
    var wrap = document.createElement("div"); wrap.className = "cbqs";
    var list = (extraFirst || []).concat(ids || []).filter(function (id, i, a) { return T[id] && a.indexOf(id) === i; }).slice(0, 5);
    list.forEach(function (id) {
      var b = document.createElement("button"); b.type = "button"; b.className = "cbq"; b.textContent = T[id].chip; b.dataset.t = id; wrap.appendChild(b);
    });
    if (!list.length) return null;
    var m = document.createElement("button"); m.type = "button"; m.className = "cbq"; m.textContent = "Menú"; m.dataset.menu = "1"; wrap.appendChild(m);
    msgs.appendChild(wrap); return wrap;
  }
  function actions(list) {
    if (!list || !list.length) return;
    var wrap = document.createElement("div"); wrap.className = "cbac";
    list.forEach(function (a) {
      var el;
      if (a.go) { el = document.createElement("button"); el.type = "button"; el.dataset.go = a.go; }
      else {
        el = document.createElement("a");
        el.href = a.wa !== undefined ? waLink(a.wa) : a.href;
        if (/^https?:/.test(el.href)) { el.target = "_blank"; el.rel = "noopener"; }
      }
      el.className = "cba" + (a.wa !== undefined ? " wa" : "");
      el.innerHTML = (a.wa !== undefined ? WA_SVG : "") + "<span>" + esc(a.t) + "</span>";
      wrap.appendChild(el);
    });
    msgs.appendChild(wrap);
  }
  function clearInteractive() {
    msgs.querySelectorAll(".cbqs,.cbac").forEach(function (n) { n.parentNode && n.parentNode.removeChild(n); });
  }

  function reply(html, o) {
    o = o || {};
    busy = true; clearInteractive();
    var ty = document.createElement("div"); ty.className = "cbty"; ty.setAttribute("aria-hidden", "true"); ty.innerHTML = "<i></i><i></i><i></i>";
    msgs.appendChild(ty); scrollEnd();
    var wait = rm ? 0 : Math.min(900, 380 + html.length * 0.35);
    setTimeout(function () {
      if (ty.parentNode) ty.parentNode.removeChild(ty);
      var b = bubble(html, "bot");
      actions(o.act); chips(o.next, o.first);
      scrollEnd(b, b.offsetHeight > msgs.clientHeight * 0.6);
      busy = false;
      if (o.done) o.done();
    }, wait);
  }

  function answerTopic(t, extra) {
    var first = extra ? [extra] : [];
    reply(fmt(t.a), { act: t.act, next: t.next, first: first });
  }
  function answerItem(it) {
    var p = it.p, isCat = it.kind === "cat";
    if (isCat) {
      var cid = "cat-" + slug(p.c);
      reply(fmt("**" + p.n + "** está en nuestro catálogo (categoría: " + p.c + "). Lo personalizamos con tu logo, diseño o texto.\n\nEl valor depende de la cantidad y la personalización: te lo damos en la cotización por WhatsApp."),
        { act: [{ t: "Cotizar este producto", wa: "Hola PUBLICITY, quiero cotizar: " + p.n }, { t: "Ver el catálogo", go: "#catalogo" }], next: ["precios", "cotizar"], first: T[cid] ? [cid] : [] });
    } else {
      reply(fmt("**" + p.n + "** es un trabajo real de nuestro portafolio (" + p.c + "). Puedes verlo en la sección Trabajos.\n\n¿Quieres algo parecido? Cuéntanos tu idea y te cotizamos."),
        { act: [{ t: "Cotizar algo parecido", wa: "Hola PUBLICITY, vi el trabajo «" + p.n + "» y quiero cotizar algo parecido." }, { t: "Ver trabajos", go: "#trabajos" }], next: ["servicios", "cotizar", "trabajos"] });
    }
  }
  function fallback(q, cands) {
    misses++;
    var txt = "No encontré una respuesta exacta a eso en la información de la página. Para no inventarte un dato, lo mejor es que lo consultes directo con el equipo: te responden por WhatsApp.";
    if (cands.length) txt += "\n\n¿Quizás buscas alguno de estos temas?";
    reply(fmt(txt), {
      act: [{ t: "Preguntar por WhatsApp", wa: "Hola PUBLICITY, tengo una pregunta: " + q }],
      next: cands.map(function (c) { return c.t.id; }).concat(["servicios", "cotizar", "contacto"])
    });
  }

  function menu() {
    reply(fmt("¿Sobre qué quieres saber? Elige una opción o escribe tu pregunta."), { next: D.menu });
  }

  function ask(text, fromChip, topicId) {
    text = String(text || "").trim().slice(0, 200);
    if (!text || busy) return;
    clearInteractive();
    bubble(esc(text), "me");
    scrollEnd();

    if (topicId && T[topicId]) { misses = 0; return answerTopic(T[topicId]); }
    var n = norm(text);

    if (/^(hola|holi|buenas|buenos dias|buen dia|buenas tardes|buenas noches|hey|saludos|que tal|ola)\b/.test(n) && n.split(" ").length <= 4)
      return reply(fmt("¡Hola! Soy el asistente de **PUBLICITY**. Puedo contarte sobre servicios, catálogo, personalizador 3D, cotizaciones, garantías y más. ¿Qué quieres saber?"), { next: D.menu });
    if (/^(gracias|muchas gracias|mil gracias|ok gracias|listo gracias|perfecto gracias|genial gracias|vale gracias)/.test(n))
      return reply(fmt("¡Con gusto! Si quieres avanzar con tu proyecto, el equipo te atiende por WhatsApp."), { act: [{ t: "Escribir por WhatsApp", wa: D.waDefault }], next: ["cotizar", "servicios"] });
    if (/^(chao|adios|hasta luego|nos vemos|bye)\b/.test(n))
      return reply(fmt("¡Hasta pronto! Aquí estaré si te surge otra duda."), { next: ["cotizar", "contacto"] });
    if (/^(menu|inicio|opciones|ayuda|help)$/.test(n)) return menu();

    var qt = toks(text).map(stem);
    var ranked = scoreTopics(text), top = ranked[0], item = qt.length && (qt.length > 1 || qt[0].length >= 6) ? findItem(qt) : null;

    /* un producto o trabajo específico gana sobre un tema general */
    if (item && (!top || top.sc < 9 || (item.kind === "cat" && qt.length >= 2))) { misses = 0; return answerItem(item); }

    if (top && top.sc >= 2) {
      misses = 0;
      var second = ranked[1], extra = null;
      if (second && second.sc >= top.sc * 0.8 && second.sc >= 2 && second.t.id !== top.t.id) extra = second.t.id;
      return answerTopic(top.t, extra);
    }
    fallback(text, ranked.slice(0, 3));
  }

  /* ---------- eventos ---------- */
  function open() {
    if (opened) return;
    opened = true; lastFocus = document.activeElement;
    panel.classList.add("open"); btn.classList.add("open"); btn.setAttribute("aria-expanded", "true");
    tip.classList.remove("on");
    var dot = btn.querySelector(".cb-dot"); if (dot) dot.style.display = "none";
    if (!started) {
      started = true;
      reply(fmt("¡Hola! Soy el asistente de **PUBLICITY**: publicidad, diseño, impresión y multimedia en un solo lugar.\n\nPuedo contarte sobre nuestros servicios, el catálogo, el personalizador 3D, cómo cotizar, garantías y más. ¿Qué quieres saber?"), { next: D.menu });
    }
    if (fine) setTimeout(function () { input.focus(); }, 350);
  }
  function close() {
    if (!opened) return;
    opened = false; panel.classList.remove("open"); btn.classList.remove("open"); btn.setAttribute("aria-expanded", "false");
    try { (lastFocus && lastFocus.focus ? lastFocus : btn).focus(); } catch (e) {}
  }
  btn.addEventListener("click", open);
  tip.addEventListener("click", open);
  panel.querySelector(".cbx").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && opened) close(); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value; input.value = "";
    ask(v);
  });
  msgs.addEventListener("click", function (e) {
    var c = e.target.closest(".cbq");
    if (c) {
      if (c.dataset.menu) { bubble("Menú", "me"); return menu(); }
      return ask(c.textContent, true, c.dataset.t);
    }
    var g = e.target.closest("[data-go]");
    if (g) {
      var el = document.querySelector(g.dataset.go);
      if (window.innerWidth <= 560) close();
      if (el) el.scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "start" });
    }
  });

  /* globo de invitación (una vez por carga, solo si no abrió el chat) */
  setTimeout(function () { if (!opened) { tip.classList.add("on"); setTimeout(function () { tip.classList.remove("on"); }, 9000); } }, 6000);

  /* API mínima por si quieres abrirlo desde otro botón: PublicityChat.open() */
  window.PublicityChat = { open: open, close: close, ask: function (t) { open(); setTimeout(function () { ask(t); }, 400); } };
})();
