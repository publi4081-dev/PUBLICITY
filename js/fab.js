/* ============================================================
   PUBLICITY · BOTÓN ÚNICO DE CONTACTO (js/fab.js + css/fab.css)
   Reúne el Asistente (chatbot), Instagram y WhatsApp en un solo botón.
   Al pulsarlo se despliegan y eliges el que quieras. Se cierra solo al
   elegir una opción, al tocar fuera o con Escape.
   Va DESPUÉS de js/chatbot.js (necesita que el botón del asistente ya exista).
   Los 3 botones originales siguen siendo los mismos elementos: aquí solo
   se agrupan, así que sus enlaces y el chatbot funcionan igual que antes.
   ============================================================ */
(function () {
  "use strict";
  var items = [".cb", ".wa", ".ig"].map(function (s) { return document.querySelector(s); }).filter(Boolean);
  if (!items.length) return;

  var root = document.documentElement, panel = document.getElementById("cbp");

  /* ---------- contenedor + botón principal ---------- */
  var box = document.createElement("div");
  box.className = "fab-box"; box.setAttribute("role", "group"); box.setAttribute("aria-label", "Contacto y redes");

  var fab = document.createElement("button");
  fab.type = "button"; fab.className = "fab"; fab.setAttribute("data-cursor", "Contacto");
  fab.setAttribute("aria-expanded", "false");
  fab.innerHTML =
    '<img class="fab-i fab-logo" src="img/logo/logo-publicity.webp" alt="" width="62" height="62" decoding="async" aria-hidden="true">' +
    '<svg class="fab-i fab-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
    '<span class="fab-dot" aria-hidden="true">1</span>';

  box.appendChild(fab);
  items.forEach(function (n) { box.appendChild(n); });   /* mismos elementos, solo se mueven al contenedor */
  document.body.appendChild(box);
  root.classList.add("fab-on");

  /* ---------- abrir / cerrar ---------- */
  var isOpen = false;
  function setOpen(v, giveFocus) {
    if (v === isOpen) return;
    isOpen = v;
    root.classList.toggle("fab-open", v); fab.classList.toggle("on", v);
    fab.setAttribute("aria-expanded", v ? "true" : "false");
    fab.setAttribute("aria-label", v ? "Cerrar las opciones de contacto" : "Abrir las opciones de contacto: asistente, Instagram y WhatsApp");
    if (!v && giveFocus) fab.focus();
  }
  fab.setAttribute("aria-label", "Abrir las opciones de contacto: asistente, Instagram y WhatsApp");

  fab.addEventListener("click", function (e) {
    setOpen(!isOpen);
    if (isOpen && e.detail === 0) items[0].focus();   /* con teclado, pasa directo a la primera opción */
  });
  box.addEventListener("click", function (e) {
    if (e.target.closest(".wa,.ig,.cb")) setTimeout(function () { setOpen(false); }, 150);   /* eligió: se recoge */
  });
  document.addEventListener("pointerdown", function (e) {
    if (isOpen && !box.contains(e.target)) setOpen(false);                                    /* tocó fuera */
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) setOpen(false, true);
  });

  /* ---------- sincronía con el chat ----------
     Cuando el panel del chat se abre, todo se esconde (el chat ocupa ese rincón);
     al cerrarlo, vuelve el botón principal. La insignia «1» se apaga al abrir el chat. */
  var chatWas = false, dot = fab.querySelector(".fab-dot");
  function sync() {
    var on = !!(panel && panel.classList.contains("open"));
    if (on === chatWas) return;
    chatWas = on;
    root.classList.toggle("fab-chat", on);
    if (on) { setOpen(false); if (dot) dot.hidden = true; }
    else setTimeout(function () {
      var a = document.activeElement;
      if (!a || a === document.body) { try { fab.focus({ preventScroll: true }); } catch (e) {} }
    }, 60);
  }
  if (panel && window.MutationObserver) new MutationObserver(sync).observe(panel, { attributes: true, attributeFilter: ["class"] });
  sync();

  /* ---------- cursor personalizado del sitio (solo computador) ---------- */
  var ring = document.querySelector(".ring");
  if (ring && ring.firstChild) {
    fab.addEventListener("mouseenter", function () { ring.classList.add("big"); ring.firstChild.textContent = "Contacto"; });
    fab.addEventListener("mouseleave", function () { ring.classList.remove("big"); });
  }
})();
