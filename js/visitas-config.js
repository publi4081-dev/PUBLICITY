/* ============================================================
   PUBLICITY · CONTADOR DE VISITAS
   - espacio: nombre único de tu contador. Cámbialo por algo propio
     (ej. "publicity-co-2026") para que nadie más lo comparta.
   - modo "api": cuenta visitas reales de todos los visitantes
     (servicio gratuito counterapi.dev, sin cookies ni datos personales).
   - modo "local": solo para probar; cuenta únicamente en ese navegador.
   - activo:false  -> oculta todo el contador.
   ============================================================ */
window.VISITAS = {
  activo: true,
  modo: "api",
  api: "https://api.counterapi.dev/v1",
  espacio: "publicity-web-CAMBIAME",
  inicio: 0,          /* número desde el que quieres arrancar (suma a lo contado) */
  refresco: 40        /* segundos entre actualizaciones en vivo */
};
