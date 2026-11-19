/* Contador de visitas: píldora con odómetro, en vivo. Cuenta UNA vez por dispositivo/navegador (marca permanente en localStorage). */
(function () {
  var C = window.VISITAS || {}, box = document.getElementById("vz");
  if (!box) return;
  if (C.activo === false) { box.hidden = true; return; }
  var host = box.querySelector(".vz-od"), plus = box.querySelector(".vz-plus");
  var rmo = matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---------- odómetro ---------- */
  function Odo(el, min) {
    var cols = [], len = 0, cur = 0;
    function build(n) {
      el.innerHTML = ""; cols = []; len = n;
      for (var i = 0; i < n; i++) {
        if (i && (n - i) % 3 === 0) { var s = document.createElement("span"); s.className = "vz-sep"; el.appendChild(s); }
        var d = document.createElement("span"), st = document.createElement("span"), h = "";
        d.className = "vz-d z"; st.className = "vz-s"; st.style.setProperty("--i", n - 1 - i);
        for (var k = 0; k < 10; k++) h += "<b>" + k + "</b>";
        st.innerHTML = h; d.appendChild(st); el.appendChild(d); cols.push({ d: d, s: st, v: 0 });
      }
    }
    return {
      get: function () { return cur; },
      set: function (n, flash) {
        var str = String(Math.max(0, Math.floor(n)));
        while (str.length < min) str = "0" + str;
        if (str.length !== len) build(str.length);
        var lead = true;
        for (var i = 0; i < cols.length; i++) {
          var v = +str[i], c = cols[i];
          if (v) lead = false;
          c.d.classList.toggle("z", lead && i < cols.length - 1);
          if (c.v !== v) {
            c.s.style.setProperty("--v", v);
            if (flash && !rmo) { c.d.classList.remove("flash"); void c.d.offsetWidth; c.d.classList.add("flash"); }
            c.v = v;
          }
        }
        el.setAttribute("role", "img"); el.setAttribute("aria-label", n.toLocaleString("es-CO") + " visitas"); cur = n;
      }
    };
  }
  var odo = Odo(host, 3); odo.set(0);

  /* ---------- fuente de datos ---------- */
  var NS = String(C.espacio || ""), KEY = String(C.clave || "visitas"),
      API = String(C.api || "https://abacus.jasoncameron.dev").replace(/\/+$/, ""),
      LOCAL = C.modo === "local", base = +C.inicio || 0, LAST = "pub_vz_last";

  /* ---------- una visita por dispositivo ----------
     DEV: marca PERMANENTE de este navegador ("ya fui contado"). Vive en localStorage, así que
          sirve para todas las pestañas y ventanas y sobrevive aunque cierres el navegador.
     NO:  solo para el dueño. Abre la web con ?nocontar=1 y este navegador nunca suma
          (?nocontar=0 lo deshace). Sigue viendo el total.
     memo: respaldo si el navegador no deja guardar nada (al menos una vez por carga). */
  var DEV = "pub_vz_dev", NO = "pub_vz_no", memo = false;
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function store(k, v) {
    try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); return true; } catch (e) { return false; }
  }
  var q = /[?&]nocontar=([^&#]*)/.exec(location.search);
  if (q) { store(NO, q[1] === "0" ? null : "1"); }
  if (load(NO) === "1") console.info("[visitas] Este navegador no suma visitas (nocontar). Para quitarlo abre la web con ?nocontar=0");
  function contado() {
    if (memo || load(NO) === "1" || load(DEV)) return true;
    try { return sessionStorage.getItem(DEV) === "1"; } catch (e) { return false; }
  }
  function marcar() {
    memo = true;
    if (!store(DEV, "1")) { try { sessionStorage.setItem(DEV, "1"); } catch (e) {} }
  }
  /* candado entre pestañas: si abres dos ventanas a la vez, solo una cuenta */
  function enFila(fn) {
    var L = navigator.locks, ran = false;
    function una() { ran = true; return fn(); }
    if (!L || !L.request) return una();
    return L.request("pub_vz_lock", una).catch(function (e) { if (ran) throw e; return una(); });
  }

  var shown = false,      /* ya hay un número en pantalla */
      fresh = false,      /* el número en pantalla es el último guardado y aún no lo confirma el servicio */
      degraded = false;   /* sin conexión: se muestra el último valor conocido */
  if (!LOCAL && (!NS || /CAMBIAME/i.test(NS))) console.warn("[visitas] Cambia \"espacio\" en js/visitas-config.js por un nombre propio.");

  /* hit = suma una visita y devuelve el total; get = solo lee el total */
  function remote(up) {
    var ac = window.AbortController ? new AbortController() : null, tm = ac && setTimeout(function () { ac.abort(); }, 4000);
    return fetch(API + "/" + (up ? "hit" : "get") + "/" + encodeURIComponent(NS) + "/" + encodeURIComponent(KEY), { cache: "no-store", priority: "high", signal: ac ? ac.signal : undefined })
      .then(function (r) {
        if (r.status === 404 && !up) return { value: 0 };   /* el contador aún no existe */
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (j) {
        clearTimeout(tm);
        var v = Math.floor(+(j && (j.value != null ? j.value : j.count)));
        if (!isFinite(v) || v < 0) throw new Error("respuesta inválida");
        return v;
      }, function (e) { clearTimeout(tm); throw e; });
  }
  function local(up) {
    var k = "pub_vz_" + KEY, n = 0;
    try { n = +localStorage.getItem(k) || 0; if (up) { n++; localStorage.setItem(k, n); } } catch (e) { n = up ? 1 : 0; }
    return Promise.resolve(n);
  }
  function read(up) { return LOCAL ? local(up) : remote(up); }

  function mark() {
    var off = degraded && !LOCAL;
    box.classList.toggle("off", off);
    box.title = off ? "Sin conexión con el servicio de conteo: se muestra el último valor conocido" : "Visitas a esta página";
  }
  function reveal() {
    if (!box.hidden && box.classList.contains("in")) return;
    box.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("in"); }); });
  }

  /* llegó un número real del servicio */
  function ok(n) {
    if (!LOCAL) { try { localStorage.setItem(LAST, String(n)); } catch (e) {} }
    degraded = false; mark();
    var t = n + base;
    if (!shown) {                                  /* primer dato: la píldora ya estaba visible en "cargando" */
      var tarde = box.hidden;                      /* se había ocultado por un fallo anterior */
      var demora = tarde ? 250 : (mq.matches ? 300 : 0);
      shown = true; box.classList.remove("ld"); reveal(); peek();
      if (demora) setTimeout(function () { odo.set(t); }, demora); else odo.set(t);
      return;
    }
    var d = odo.get();
    if (fresh) { fresh = false; if (t !== d) odo.set(t); return; }   /* ajuste silencioso tras mostrar el último valor guardado */
    if (t > d) {                                   /* gira cuando entra alguien más */
      odo.set(t, true); peek();
      plus.textContent = "+" + (t - d); plus.classList.remove("go"); void plus.offsetWidth; plus.classList.add("go");
    }
  }
  /* el servicio no respondió: nunca se muestra un número inventado */
  function fail() {
    degraded = true; mark();
    if (shown) return;                             /* hay un último valor guardado en pantalla: se queda */
    box.classList.remove("ld", "in"); box.hidden = true;   /* sin dato y sin valor guardado: se oculta */
  }

  /* ---------- móvil / tablet: la barra NO se queda fija tapando texto ----------
     Aparece al cargar la web y cuando entra una visita nueva, se va hacia la izquierda y
     vuelve a aparecer al llegar al pie de la página (sube con él, así no tapa nada).
     Segundos visibles: "movilSegundos" en visitas-config.js (opcional, por defecto 5). */
  var mq = matchMedia("(max-width:900px)"), foot = document.querySelector("footer"),
      PEEK = Math.max(2, +C.movilSegundos || 5) * 1000, raf = 0, peekT = 0;
  function peek() {
    if (!mq.matches) return;
    box.classList.add("peek"); clearTimeout(peekT);
    peekT = setTimeout(function () { box.classList.remove("peek"); }, PEEK);
  }
  function lift() {
    raf = 0;
    var l = foot && mq.matches ? Math.max(0, Math.round(innerHeight - foot.getBoundingClientRect().top)) : 0;
    box.style.setProperty("--vz-lift", l + "px");                  /* queda justo encima del pie */
    box.classList.toggle("atend", l >= (box.classList.contains("atend") ? 40 : 60));   /* llegó abajo */
  }
  function ask() { if (!raf) raf = requestAnimationFrame(lift); }
  addEventListener("scroll", ask, { passive: true }); addEventListener("resize", ask); addEventListener("load", ask); lift();
  box.addEventListener("click", function () { if (mq.matches) { clearTimeout(peekT); box.classList.remove("peek"); } });   /* tocarla la guarda */

  /* arranque: la píldora aparece YA, sin esperar a la red.
     Con el último total guardado si existe; si no, en estado "cargando" (casillas vacías). */
  var last = 0;
  if (!LOCAL) { try { last = +localStorage.getItem(LAST) || 0; } catch (e) {} }
  if (last > 0) { shown = fresh = true; setTimeout(peek, 150); setTimeout(function () { if (!odo.get()) odo.set(last + base); }, mq.matches ? 450 : 150); }   /* si el servidor ya respondió, no se pisa */
  else box.classList.add("ld");
  reveal();
  function tick() {
    enFila(function () {
      if (contado()) return read(false);           /* este dispositivo ya cuenta: solo lee el total */
      return read(true).then(function (n) {        /* primera vez: suma 1 y lo recuerda para siempre */
        marcar();
        return n;
      });                                          /* si falla, no se marca y se reintenta en el próximo ciclo */
    }).then(ok, fail);
  }
  tick();
  setInterval(function () { if (!document.hidden) tick(); }, Math.max(15, +C.refresco || 40) * 1000);
})();
