/* PUBLICITY · Consentimiento de cookies (Ley 1581 de 2012)
   + Google Analytics 4 y Píxel de Meta, que SOLO se cargan si la persona acepta.
   Los IDs se configuran en js/legal-config.js */
(function () {
  "use strict";
  var L = window.LEGAL || {};
  var KEY = "pub_consent_v1", VER = 1, TTL = 365 * 864e5;
  var GA = /^G-[A-Z0-9]{6,12}$/.test(L.GA4_ID || "") && !/^G-X+$/i.test(L.GA4_ID) ? L.GA4_ID : "";
  var PX = /^\d{10,20}$/.test(L.META_PIXEL_ID || "") ? L.META_PIXEL_ID : "";
  var state = null, gaOn = false, pxOn = false, pxRevoked = false, memo = null;

  /* ---------- Google Consent Mode v2: todo denegado por defecto ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    analytics_storage: "denied", wait_for_update: 500
  });

  /* ---------- almacenamiento de la elección ---------- */
  function read() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.v === VER && Date.now() - s.t < TTL) return s;
    } catch (e) {}
    return memo && Date.now() - memo.t < TTL ? memo : null;
  }
  function save(a, m) {
    var s = { v: VER, t: Date.now(), a: !!a, m: !!m };
    memo = s;
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    return s;
  }

  /* ---------- borrar cookies de terceros al retirar el consentimiento ---------- */
  function delCookies(tests) {
    var h = location.hostname.split("."), ds = [""];
    for (var i = 0; i < h.length - 1; i++) ds.push("." + h.slice(i).join("."));
    document.cookie.split(";").forEach(function (c) {
      var n = c.split("=")[0].trim();
      if (tests.some(function (t) { return t.test(n); })) {
        ds.forEach(function (d) {
          document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/" + (d ? ";domain=" + d : "");
        });
      }
    });
  }

  /* ---------- Google Analytics 4 ---------- */
  function loadGA() {
    if (!GA || gaOn) return;
    gaOn = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA);
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA, { allow_google_signals: false, allow_ad_personalization_signals: false });
  }

  /* ---------- Píxel de Meta ---------- */
  function loadPX() {
    if (!PX) return;
    if (pxOn) { if (pxRevoked && window.fbq) { window.fbq("consent", "grant"); pxRevoked = false; } return; }
    pxOn = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", PX);
    window.fbq("track", "PageView");
  }

  /* ---------- aplicar la elección ---------- */
  function apply(s) {
    var a = s.a, m = s.m;
    gtag("consent", "update", {
      analytics_storage: a ? "granted" : "denied",
      ad_storage: m ? "granted" : "denied",
      ad_user_data: m ? "granted" : "denied",
      ad_personalization: m ? "granted" : "denied"
    });
    if (GA) window["ga-disable-" + GA] = !a;
    if (a) loadGA(); else delCookies([/^_ga$/, /^_ga_/, /^_gid$/, /^_gat/]);
    if (m) loadPX();
    else {
      if (pxOn && window.fbq && !pxRevoked) { window.fbq("consent", "revoke"); pxRevoked = true; }
      delCookies([/^_fbp$/, /^_fbc$/]);
    }
  }

  /* ---------- eventos de conversión (solo si hay consentimiento) ---------- */
  function ev(gaName, fbName, params) {
    var s = state || read();
    if (!s) return;
    try {
      if (s.a && GA && gaOn) window.gtag("event", gaName, params || {});
      if (s.m && PX && pxOn && window.fbq) window.fbq("track", fbName, params || {});
    } catch (e) {}
  }

  /* ---------- estilos ---------- */
  var css = [
    ".ck,.ck *,.ckm,.ckm *{box-sizing:border-box;cursor:auto!important}",
    ".ck button,.ck a,.ckm button,.ckm a,.ckm label{cursor:pointer!important}",
    ".ck{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:2000;width:min(580px,calc(100vw - 32px));padding:22px 22px 18px;border-radius:22px;background:var(--card,var(--bg2,#17191c));color:var(--ink,#e9ecef);border:1px solid var(--line,rgba(233,236,239,.16));box-shadow:0 24px 70px rgba(0,0,0,.45);font:400 15px/1.5 Jost,system-ui,sans-serif;animation:ckin .5s cubic-bezier(.22,1,.36,1)}",
    "@keyframes ckin{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}",
    "@media(prefers-reduced-motion:reduce){.ck{animation:none}}",
    ".ck[hidden],.ckm[hidden]{display:none}",
    ".ck h2,.ckm h2{margin:0 0 6px;font:800 18px/1.2 Jost,system-ui,sans-serif;letter-spacing:-.02em;color:inherit}",
    ".ck p{margin:0 0 14px;color:var(--mut,#979ea8)}.ck a,.ckm a{color:var(--c,#00b4ee);text-decoration:underline;text-underline-offset:2px}",
    ".ck-b{display:flex;gap:8px;flex-wrap:wrap;align-items:center}",
    ".ck-p,.ck-s{min-height:44px;padding:0 20px;border-radius:999px;font:600 15px Jost,system-ui,sans-serif;border:1.5px solid var(--ink,#e9ecef);background:var(--ink,#e9ecef);color:var(--bg,#0b0c0e);transition:transform .2s}",
    ".ck-p:hover,.ck-s:hover{transform:translateY(-1px)}",
    ".ck-l{min-height:44px;padding:0 10px;margin-left:auto;background:none;border:0;color:var(--ink,#e9ecef);font:500 15px Jost,system-ui,sans-serif;text-decoration:underline;text-underline-offset:3px}",
    ".ck button:focus-visible,.ckm button:focus-visible,.ckm input:focus-visible+i,.ck a:focus-visible,.ckm a:focus-visible{outline:2px solid var(--c,#00b4ee);outline-offset:2px}",
    ".ckm{position:fixed;inset:0;z-index:2100;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.6);font:400 15px/1.5 Jost,system-ui,sans-serif}",
    ".ckm>div{width:min(560px,100%);max-height:calc(100vh - 32px);overflow:auto;padding:26px;border-radius:24px;background:var(--bg,#0b0c0e);color:var(--ink,#e9ecef);border:1px solid var(--line,rgba(233,236,239,.16))}",
    ".ckm .ck-r{display:flex;gap:16px;align-items:flex-start;justify-content:space-between;padding:16px 0;border-top:1px solid var(--line,rgba(233,236,239,.16))}",
    ".ckm .ck-r b{display:block;font-weight:600;margin-bottom:2px}.ckm .ck-r span{color:var(--mut,#979ea8);font-size:14px;display:block}",
    ".ckm .ck-d{margin:0 0 10px;color:var(--mut,#979ea8)}",
    ".ck-sw{position:relative;flex:none;width:52px;height:30px;display:block;margin-top:2px}",
    ".ck-sw input{position:absolute;inset:0;width:100%;height:100%;opacity:0;margin:0}",
    ".ck-sw i{pointer-events:none;position:absolute;inset:0;border-radius:999px;background:rgba(150,158,168,.45);transition:background .25s}",
    ".ck-sw i:after{content:'';position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:transform .25s}",
    ".ck-sw input:checked+i{background:linear-gradient(100deg,#00b4ee,#7a4bff,#ec0e8f)}.ck-sw input:checked+i:after{transform:translateX(22px)}",
    ".ck-sw input:disabled+i{opacity:.55}",
    ".ckm .ck-b{margin-top:14px}",
    "#cf .ck-au{display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.4;color:#fff}",
    "#cf .ck-au input{appearance:auto;-webkit-appearance:checkbox;width:20px;height:20px;min-height:0;flex:none;margin:1px 0 0;padding:0;border:0;accent-color:#fff}",
    "#cf .ck-au a{color:#fff;text-decoration:underline}",
    "footer .lgl{flex-basis:100%;display:flex;flex-wrap:wrap;gap:6px 22px;padding-top:18px;border-top:1px solid var(--line,rgba(233,236,239,.16));font-size:14px}",
    "footer .lgl a,footer .lgl button{color:var(--mut,#979ea8);background:none;border:0;padding:6px 0;font:inherit;text-decoration:none;transition:color .2s}",
    "footer .lgl a:hover,footer .lgl button:hover{color:var(--ink,#e9ecef)}footer .lgl button{text-decoration:underline;text-underline-offset:3px}"
  ].join("\n");

  /* ---------- interfaz ---------- */
  var bar, modal, lastFocus;
  function mk(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html) e.innerHTML = html;
    return e;
  }
  function decide(a, m) {
    state = save(a, m);
    apply(state);
    closeAll();
  }
  function closeAll() {
    if (bar) bar.hidden = true;
    if (modal) modal.hidden = true;
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
  }
  function build() {
    var st = mk("style", {}); st.textContent = css; document.head.appendChild(st);

    bar = mk("div", { "class": "ck", role: "dialog", "aria-labelledby": "ck-t", "aria-describedby": "ck-x", hidden: "" },
      '<h2 id="ck-t">Tu privacidad, tu decisión</h2>' +
      '<p id="ck-x">Usamos cookies necesarias para que el sitio funcione. Solo si lo permites, también usamos Google Analytics (estadísticas de uso) y el Píxel de Meta (medición de publicidad). ' +
      'Más información en la <a href="cookies.html">Política de cookies</a> y la <a href="privacidad.html">Política de privacidad</a>.</p>' +
      '<div class="ck-b"><button type="button" class="ck-s" data-a="no">Rechazar</button>' +
      '<button type="button" class="ck-p" data-a="all">Aceptar todas</button>' +
      '<button type="button" class="ck-l" data-a="cfg">Configurar</button></div>');

    modal = mk("div", { "class": "ckm", role: "dialog", "aria-modal": "true", "aria-labelledby": "ckm-t", hidden: "" },
      '<div><h2 id="ckm-t">Preferencias de cookies</h2>' +
      '<p class="ck-d">Elige qué permites. Puedes cambiar tu decisión cuando quieras desde «Configurar cookies» al final de la página.</p>' +
      '<div class="ck-r"><div><b>Necesarias</b><span>Recuerdan tu elección de cookies y tus ajustes de visualización. Son indispensables y no se pueden desactivar.</span></div>' +
      '<label class="ck-sw"><input type="checkbox" checked disabled aria-label="Cookies necesarias, siempre activas"><i></i></label></div>' +
      '<div class="ck-r"><div><b>Analíticas · Google Analytics</b><span>Nos dicen cuántas personas visitan el sitio y qué secciones usan, para mejorarlo. Proveedor: Google.</span></div>' +
      '<label class="ck-sw"><input type="checkbox" id="ck-a" aria-label="Cookies analíticas"><i></i></label></div>' +
      '<div class="ck-r"><div><b>Marketing · Píxel de Meta</b><span>Miden la efectividad de nuestros anuncios en Facebook e Instagram y permiten mostrarte publicidad más relevante. Proveedor: Meta.</span></div>' +
      '<label class="ck-sw"><input type="checkbox" id="ck-m" aria-label="Cookies de marketing"><i></i></label></div>' +
      '<div class="ck-b"><button type="button" class="ck-p" data-a="save">Guardar preferencias</button>' +
      '<button type="button" class="ck-s" data-a="all">Aceptar todas</button>' +
      '<button type="button" class="ck-s" data-a="no">Rechazar</button></div></div>');

    document.body.appendChild(bar);
    document.body.appendChild(modal);

    function act(e) {
      var b = e.target.closest("[data-a]");
      if (!b) return;
      var a = b.getAttribute("data-a");
      if (a === "all") decide(true, true);
      else if (a === "no") decide(false, false);
      else if (a === "save") decide(modal.querySelector("#ck-a").checked, modal.querySelector("#ck-m").checked);
      else if (a === "cfg") openPrefs();
    }
    bar.addEventListener("click", act);
    modal.addEventListener("click", function (e) { if (e.target === modal && state) closeAll(); else act(e); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal && !modal.hidden && state) closeAll();
    });
  }
  function openPrefs() {
    if (!modal) return;
    lastFocus = document.activeElement;
    var s = state || read() || { a: false, m: false };
    modal.querySelector("#ck-a").checked = !!s.a;
    modal.querySelector("#ck-m").checked = !!s.m;
    modal.hidden = false;
    var f = modal.querySelector("[data-a='save']");
    if (f) f.focus();
  }

  /* ---------- seguimiento de conversiones ---------- */
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-ck-open]");
    if (o) { e.preventDefault(); openPrefs(); return; }
    var w = e.target.closest("a[href*='wa.me']");
    if (w) ev("click_whatsapp", "Contact", { link_url: "wa.me" });
    if (e.target.closest("#s3-go")) ev("personalizador_enviar", "Lead", { method: "personalizador_3d" });
  }, true);
  document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "cf") ev("generate_lead", "Lead", { method: "formulario" });
  }, true);

  /* ---------- arranque ---------- */
  function init() {
    build();
    state = read();
    if (state) apply(state);
    else setTimeout(function () { if (!read()) bar.hidden = false; }, 700);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.PubConsent = { open: openPrefs, get: function () { return state; }, event: ev };
})();
