/* Datos del sitio: cada imagen aparece una sola vez. Para agregar productos, añade una línea a CAT con la ruta de su foto en img/catalogo/ */
const SV=[{"n": "Diseño gráfico e identidad", "d": "Logotipos, imagen corporativa y piezas de marca.", "i": "img/servicios/01-diseno-grafico-e-identidad.webp"}, {"n": "Agencia publicitaria", "d": "Estrategia, campañas y creatividad para tu negocio.", "i": "img/servicios/02-agencia-publicitaria.webp"}, {"n": "Pendones y gran formato", "d": "Pendones, bastidores, rompetráficos, tropezones y lonas.", "i": "img/servicios/03-pendones-y-gran-formato.webp"}, {"n": "Stand modular", "d": "Diseño libre y fabricación de stands para ferias.", "i": "img/servicios/04-stand-modular.webp"}, {"n": "Vinilos decorativos", "d": "Impresión, corte y microperforado para espacios.", "i": "img/servicios/05-vinilos-decorativos.webp"}, {"n": "Avisos publicitarios", "d": "Acrílicos, cajas de luz y avisos interiores y exteriores.", "i": "img/servicios/06-avisos-publicitarios.webp"}, {"n": "Papelería y litografía", "d": "Tarjetas, membretes, volantes, catálogos y libretas.", "i": "img/servicios/07-papeleria-y-litografia.webp"}, {"n": "Marcación personalizada", "d": "Sublimación, tampografía, screen y bordados.", "i": "img/servicios/08-marcacion-personalizada.webp"}, {"n": "Señalización de espacios", "d": "Evacuación, seguridad, placas y rotulación.", "i": "img/servicios/09-senalizacion-de-espacios.webp"}];
const WK=[{"n": "Línea de pendones", "c": "Gran formato", "i": "img/trabajos/01-linea-de-pendones.webp", "r": 0.5559}, {"n": "Letras 3D con retroiluminación", "c": "Avisos", "i": "img/trabajos/02-letras-3d-con-retroiluminacion.webp", "r": 0.2956}, {"n": "Pendón con trípode", "c": "Gran formato", "i": "img/trabajos/03-pendon-con-tripode.webp", "r": 2.5937}, {"n": "Bolsa y caja personalizadas", "c": "Empaques", "i": "img/trabajos/04-bolsa-y-caja-personalizadas.webp", "r": 0.9324}, {"n": "Empaque corporativo Líderes que inspiran", "c": "Empaques", "i": "img/trabajos/05-empaque-corporativo-lideres-que-inspiran.webp", "r": 1.2941}, {"n": "Dotación estampada", "c": "Marcación", "i": "img/trabajos/06-dotacion-estampada.webp", "r": 1.0721}, {"n": "Tropezones y marcos para fotos", "c": "Piezas personalizadas", "i": "img/trabajos/07-tropezones-y-marcos-para-fotos.webp", "r": 1.1647}, {"n": "Mobiliario de exhibición", "c": "Diseño y fabricación", "i": "img/trabajos/08-mobiliario-de-exhibicion.webp", "r": 0.6000}, {"n": "Figuras y props para eventos", "c": "Eventos", "i": "img/trabajos/09-figuras-y-props-para-eventos.webp", "r": 1.2132}, {"n": "Pendón Chusma Squad", "c": "Gran formato", "i": "img/trabajos/10-pendon-chusma-squad.webp", "r": 2.3810}, {"n": "Piezas en madera personalizadas", "c": "Marcación", "i": "img/trabajos/11-piezas-en-madera-personalizadas.webp", "r": 0.6250}, {"n": "Mugs personalizados", "c": "Marcación", "i": "img/trabajos/12-mugs-personalizados.webp", "r": 1.1634}, {"n": "Stand para ferias", "c": "Stand modular", "i": "img/trabajos/13-stand-para-ferias.webp", "r": 1.2667}, {"n": "Aviso luminoso Quartina Gourmet", "c": "Avisos", "i": "img/trabajos/14-aviso-luminoso-quartina-gourmet.webp", "r": 0.4129}, {"n": "Pilares forrados en vinilo", "c": "Vinilos", "i": "img/trabajos/15-pilares-forrados-en-vinilo.webp", "r": 2.0679}, {"n": "Pared de vinilos con disco", "c": "Vinilos", "i": "img/trabajos/16-pared-de-vinilos-con-disco.webp", "r": 0.5621}, {"n": "Rincón temático con aviso", "c": "Decoración", "i": "img/trabajos/17-rincon-tematico-con-aviso.webp", "r": 2.0679}, {"n": "Arte para mural", "c": "Diseño gráfico", "i": "img/trabajos/18-arte-para-mural.webp", "r": 0.6250}, {"n": "Escritorios de oficina", "c": "Mobiliario", "i": "img/trabajos/19-escritorios-de-oficina.webp", "r": 0.4050}, {"n": "Salón de bar con vinilos", "c": "Vinilos", "i": "img/trabajos/20-salon-de-bar-con-vinilos.webp", "r": 0.9864}, {"n": "Mural impreso para bar", "c": "Vinilos", "i": "img/trabajos/21-mural-impreso-para-bar.webp", "r": 0.4050}, {"n": "Ambientación de bar", "c": "Vinilos", "i": "img/trabajos/22-ambientacion-de-bar.webp", "r": 0.7500}, {"n": "Instalación de vinilo en pared", "c": "Vinilos", "i": "img/trabajos/23-instalacion-de-vinilo-en-pared.webp", "r": 2.1444}, {"n": "Mural corrido", "c": "Vinilos", "i": "img/trabajos/24-mural-corrido.webp", "r": 0.4050}, {"n": "Arte musical para mural", "c": "Diseño gráfico", "i": "img/trabajos/25-arte-musical-para-mural.webp", "r": 0.6250}, {"n": "Cuaderno corporativo con logo", "c": "Papelería", "i": "img/trabajos/26-cuaderno-corporativo-con-logo.webp", "r": 1.3056}];
const CAT=[
{
"n": "Botilito con mosquetón",
"c": "Mugs y termos",
"i": [
"img/catalogo/botilito-ingeurbe.webp"
],
"ph": 1
},
{
"n": "Mug color interno",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-ingeurbe.webp"
],
"ph": 1
},
{
"n": "Carpetas",
"c": "Papelería corporativa",
"i": [
"img/catalogo/carpetas-discipulado.webp"
],
"ph": 1
},
{
"n": "Libreta, esferos y estuche",
"c": "Papelería corporativa",
"i": [
"img/catalogo/libreta-camino-lider.webp"
],
"ph": 1
},
{
"n": "Cuaderno argollado corporativo",
"c": "Papelería corporativa",
"i": [
"img/catalogo/cuaderno-argollado-corporativo.webp"
],
"ph": 1
},
{
"n": "Esferos metálicos",
"c": "Papelería corporativa",
"i": [
"img/catalogo/esferos-metalicos.webp"
],
"ph": 1
},
{
"n": "Llavero metálico Burano",
"c": "Llaveros",
"i": [
"img/catalogo/llavero-burano-1.webp",
"img/catalogo/llavero-burano-2.webp"
],
"ph": 1
},
{
"n": "Llavero casa",
"c": "Llaveros",
"i": [
"img/catalogo/llavero-casa.webp"
],
"ph": 1
},
{
"n": "Camiones a escala personalizados",
"c": "Regalos corporativos",
"i": [
"img/catalogo/camiones-escala-1.webp",
"img/catalogo/camiones-escala-2.webp"
],
"ph": 1
},
{
"n": "Casco miniatura",
"c": "Regalos corporativos",
"i": [
"img/catalogo/casco-somos-id.webp"
],
"ph": 1
},
{
"n": "Rompecabezas personalizado",
"c": "Regalos corporativos",
"i": [
"img/catalogo/rompecabezas-compensar.webp"
],
"ph": 1
},
{
"n": "Cinta portacarnet",
"c": "Accesorios",
"i": [
"img/catalogo/cinta-portacarnet.webp"
],
"ph": 1
},
{
"n": "Polo con parches reflectivos",
"c": "Textil y bolsas",
"i": [
"img/catalogo/polo-frente.webp",
"img/catalogo/polo-espalda.webp"
],
"ph": 1
},
{
"n": "Bolsas ecológicas",
"c": "Textil y bolsas",
"i": [
"img/catalogo/bolsas-somos-id.webp"
],
"ph": 1
},
{
"n": "Paraguas plegable con logo",
"c": "Textil y bolsas",
"i": [
"img/catalogo/paraguas-plegable.webp"
],
"ph": 1
},
{
"n": "Ruta de evacuación fotoluminiscente",
"c": "Señalización y acrílicos",
"i": [
"img/catalogo/ruta-evacuacion.webp"
],
"ph": 1
},
{
"n": "Urna acrílica con logo",
"c": "Señalización y acrílicos",
"i": [
"img/catalogo/urna-acrilica.webp"
],
"ph": 1
},
{
"n": "Tablero Semáforo de la Convivencia",
"c": "Señalización y acrílicos",
"i": [
"img/catalogo/tablero-semaforo.webp"
],
"ph": 1
},
{
"n": "Trofeo en acrílico y madera",
"c": "Premios y reconocimientos",
"i": [
"img/catalogo/trofeo-masterchef.webp"
],
"ph": 1
},
{
"n": "Medallas personalizadas",
"c": "Premios y reconocimientos",
"i": [
"img/catalogo/medallas-masterchef.webp"
],
"ph": 1
},
{
"n": "Carcasa para celular vertical",
"c": "Carcasas",
"i": [
"img/catalogo/carcasa-para-iphone-4-4s.webp"
],
"ph": 0
},
{
"n": "Paraguas",
"c": "Accesorios",
"i": [
"img/catalogo/paraguas.webp"
],
"ph": 0
},
{
"n": "Carcasa para celular ancha",
"c": "Carcasas",
"i": [
"img/catalogo/carcasa-para-blackberry-8520.webp"
],
"ph": 0
},
{
"n": "Carcasa para celular alargada",
"c": "Carcasas",
"i": [
"img/catalogo/carcasa-para-iphone-5.webp"
],
"ph": 0
},
{
"n": "Canguro",
"c": "Accesorios",
"i": [
"img/catalogo/canguro.webp"
],
"ph": 0
},
{
"n": "Maleta",
"c": "Accesorios",
"i": [
"img/catalogo/maleta.webp"
],
"ph": 0
},
{
"n": "Forro para portátil 14.1\"",
"c": "Accesorios",
"i": [
"img/catalogo/forro-para-portatil-14-1.webp"
],
"ph": 0
},
{
"n": "Cerámica de 20x25",
"c": "Piedras y cerámicas",
"i": [
"img/catalogo/ceramica-de-20x25.webp"
],
"ph": 0
},
{
"n": "Mug para carro",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-para-carro.webp"
],
"ph": 0
},
{
"n": "Termo blanco 350 ml",
"c": "Mugs y termos",
"i": [
"img/catalogo/termo-blanco-350-ml.webp"
],
"ph": 0
},
{
"n": "Mug blanco 11 oz",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-blanco-11-oz.webp"
],
"ph": 0
},
{
"n": "Espejo corazón",
"c": "Accesorios",
"i": [
"img/catalogo/espejo-corazon.webp"
],
"ph": 0
},
{
"n": "Espejo giratorio",
"c": "Accesorios",
"i": [
"img/catalogo/espejo-giratorio.webp"
],
"ph": 0
},
{
"n": "Espejo cuadrado",
"c": "Accesorios",
"i": [
"img/catalogo/espejo-cuadrado.webp"
],
"ph": 0
},
{
"n": "Caramañola 400 ml",
"c": "Mugs y termos",
"i": [
"img/catalogo/caramanola-400-ml.webp"
],
"ph": 0
},
{
"n": "Carcasa para celular clásica",
"c": "Carcasas",
"i": [
"img/catalogo/carcasa-para-blackberry-9900.webp"
],
"ph": 0
},
{
"n": "Cerámica de 15.2x15.2",
"c": "Piedras y cerámicas",
"i": [
"img/catalogo/ceramica-de-15-2x15-2.webp"
],
"ph": 0
},
{
"n": "Cerámica de 20x20",
"c": "Piedras y cerámicas",
"i": [
"img/catalogo/ceramica-de-20x20.webp"
],
"ph": 0
},
{
"n": "Mug mágico",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-magico.webp"
],
"ph": 0
},
{
"n": "Mug metalizado",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-metalizado.webp"
],
"ph": 0
},
{
"n": "Mug café 6 oz",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-cafe-6-oz.webp"
],
"ph": 0
},
{
"n": "Mug color interno con cuchara",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-color-interno-con-cuchara.webp"
],
"ph": 0
},
{
"n": "Mug fluorescente",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-fluorescente.webp"
],
"ph": 0
},
{
"n": "Mug color interno, borde y oreja",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-color-interno-borde-y-oreja.webp"
],
"ph": 0
},
{
"n": "Mug plato y cuchara",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-plato-y-cuchara.webp"
],
"ph": 0
},
{
"n": "Mug recuadro",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-recuadro.webp"
],
"ph": 0
},
{
"n": "Mug pareja",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-pareja.webp"
],
"ph": 0
},
{
"n": "Mug delgado con borde",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-delgado-con-borde.webp"
],
"ph": 0
},
{
"n": "Mug delgado 7 oz",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-delgado-7-oz.webp"
],
"ph": 0
},
{
"n": "Mug oreja larga 7 oz",
"c": "Mugs y termos",
"i": [
"img/catalogo/mug-oreja-larga-7-oz.webp"
],
"ph": 0
},
{
"n": "Pad mouse 3 mm, 20.2 cm",
"c": "Pad mouse y portavasos",
"i": [
"img/catalogo/pad-mouse-3-mm-20-2-cm.webp"
],
"ph": 0
},
{
"n": "Pad mouse 23x19 cm (3 y 5 mm)",
"c": "Pad mouse y portavasos",
"i": [
"img/catalogo/pad-mouse-23x19-cm-3-y-5-mm.webp"
],
"ph": 0
},
{
"n": "Pad mouse corazón",
"c": "Pad mouse y portavasos",
"i": [
"img/catalogo/pad-mouse-corazon.webp"
],
"ph": 0
},
{
"n": "Portavaso redondo 10 cm",
"c": "Pad mouse y portavasos",
"i": [
"img/catalogo/portavaso-redondo-10-cm.webp"
],
"ph": 0
},
{
"n": "Pad mouse 5 mm, 20.2 cm",
"c": "Pad mouse y portavasos",
"i": [
"img/catalogo/pad-mouse-5-mm-20-2-cm.webp"
],
"ph": 0
},
{
"n": "Piedra cuadrada 20x20",
"c": "Piedras y cerámicas",
"i": [
"img/catalogo/piedra-cuadrada-20x20.webp"
],
"ph": 0
},
{
"n": "Piedra rectangular 20x15",
"c": "Piedras y cerámicas",
"i": [
"img/catalogo/piedra-rectangular-20x15.webp"
],
"ph": 0
},
{
"n": "Piedra relieve 20x20",
"c": "Piedras y cerámicas",
"i": [
"img/catalogo/piedra-relieve-20x20.webp"
],
"ph": 0
},
{
"n": "Piedra con marco 12x17",
"c": "Piedras y cerámicas",
"i": [
"img/catalogo/piedra-con-marco-12x17.webp"
],
"ph": 0
},
{
"n": "Piedra curva 20x20",
"c": "Piedras y cerámicas",
"i": [
"img/catalogo/piedra-curva-20x20.webp"
],
"ph": 0
},
{
"n": "Piedra arco 14x15",
"c": "Piedras y cerámicas",
"i": [
"img/catalogo/piedra-arco-14x15.webp"
],
"ph": 0
},
{
"n": "Marco tríptico 20x30",
"c": "Marcos y cristal",
"i": [
"img/catalogo/marco-triptico-20x30.webp"
],
"ph": 0
},
{
"n": "Marco tríptico 10x15",
"c": "Marcos y cristal",
"i": [
"img/catalogo/marco-triptico-10x15.webp"
],
"ph": 0
},
{
"n": "Marco cristal 30x16",
"c": "Marcos y cristal",
"i": [
"img/catalogo/marco-cristal-30x16.webp"
],
"ph": 0
},
{
"n": "Cristal rectangular",
"c": "Marcos y cristal",
"i": [
"img/catalogo/cristal-rectangular.webp"
],
"ph": 0
},
{
"n": "Marco en cerámica",
"c": "Marcos y cristal",
"i": [
"img/catalogo/marco-en-ceramica.webp"
],
"ph": 0
},
{
"n": "Marco vidrio espejo con borde",
"c": "Marcos y cristal",
"i": [
"img/catalogo/marco-vidrio-espejo-con-borde.webp"
],
"ph": 0
}
];
