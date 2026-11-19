/* ============================================================
   PUBLICITY · CONTADOR DE VISITAS
   - espacio: nombre único de tu contador (ya viene uno propio).
     Si lo cambias, el contador vuelve a empezar desde cero.
   - clave:   nombre del contador dentro del espacio.
   - modo "api":   cuenta visitas reales de todos los visitantes
                   (servicio gratuito Abacus, sin cookies ni datos
                   personales; sin registro ni claves).
   - modo "local": solo para probar; cuenta únicamente en ese navegador.
   - inicio:  número desde el que quieres arrancar (se suma a lo contado).
   - activo:false -> oculta todo el contador.

   UNA VISITA POR DISPOSITIVO: cada navegador se cuenta una sola vez (deja una marca
   permanente en localStorage), aunque abra la web en varias pestañas o ventanas, o vuelva
   otro día. Un dispositivo nuevo suma 1 y ve el total acumulado real del servicio.
   Límite: otro navegador del mismo equipo, o una ventana de incógnito, cuenta como nuevo.
   MODO DUEÑO: abre la web con ?nocontar=1 y ese navegador no suma nunca (sigue viendo el
   total). Para deshacerlo: ?nocontar=0.

   OJO: el servicio anterior (counterapi.dev v1) cerró el 7 de agosto
   de 2026, por eso el contador dejó de funcionar. Su versión nueva (v2)
   exige una clave secreta, y una clave dentro de una web pública puede
   ser copiada por cualquiera, así que no se usa aquí.
   ============================================================ */
window.VISITAS = {
  activo: true,
  modo: "api",
  api: "https://abacus.jasoncameron.dev",
  espacio: "publicity-citypublicidad-k7q2x",
  clave: "visitas",
  inicio: 0,
  refresco: 40        /* segundos entre actualizaciones en vivo */
};
