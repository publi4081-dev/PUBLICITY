/* Contador de visitas: píldora con odómetro, en vivo, sin cookies */
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
  requestAnimationFrame(function () { box.classList.add("in"); });

  /* ---------- fuente de datos ---------- */
  var KEY = "total", base = +C.inicio || 0, offline = C.modo === "local";
  var seen = false; try { seen = sessionStorage.getItem("pub_vz") === "1"; } catch (e) {}

  function remote(up) {
    var ac = window.AbortController ? new AbortController() : null, tm = ac && setTimeout(function () { ac.abort(); }, 6000);
    return fetch(C.api + "/" + encodeURIComponent(C.espacio) + "/" + KEY + (up ? "/up" : "/"), { cache: "no-store", signal: ac ? ac.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) { clearTimeout(tm); return +j.count || 0; });
  }
  function local(up) {
    var k = "pub_vz_" + KEY, n = 0;
    try { n = +localStorage.getItem(k) || 0; if (up) { n++; localStorage.setItem(k, n); } } catch (e) { n = up ? 1 : 0; }
    return Promise.resolve(n);
  }
  function read(up) {
    if (offline) return local(up);
    return remote(up).catch(function () { offline = true; mark(); return local(up); });
  }
  function mark() {
    box.classList.toggle("off", offline && C.modo !== "local");
    box.title = offline && C.modo !== "local" ? "Modo prueba: sin conexión al servicio, contando solo en este navegador" : "Visitas a esta página";
  }
  mark();

  read(!seen).then(function (n) {
    try { sessionStorage.setItem("pub_vz", "1"); } catch (e) {}
    mark(); setTimeout(function () { odo.set(n + base); }, 500);
  });

  /* ---------- en vivo: gira cuando entra alguien más ---------- */
  setInterval(function () {
    if (document.hidden) return;
    read(false).then(function (n) {
      var t = n + base, d = odo.get();
      if (t > d) {
        odo.set(t, true);
        plus.textContent = "+" + (t - d); plus.classList.remove("go"); void plus.offsetWidth; plus.classList.add("go");
      }
    });
  }, Math.max(15, +C.refresco || 40) * 1000);
})();
