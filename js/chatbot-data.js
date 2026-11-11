/* ============================================================
   PUBLICITY · BASE DE CONOCIMIENTO DEL CHATBOT
   Todo lo que el asistente sabe está en este archivo. Para cambiar
   una respuesta, edita el texto de "a". Para que entienda más
   formas de preguntar, agrega palabras a "kw".

   FORMATO DE CADA TEMA
   id     nombre interno (único)
   chip   texto corto del botón sugerido
   kw     palabras o frases que activan el tema. Un * al inicio = pesa más.
   a      respuesta. Párrafos separados por línea en blanco.
          "- " al inicio de línea = viñeta. **negrita**. [texto](enlace)
   next   ids de temas sugeridos al final de la respuesta
   act    botones de acción: {t:"Texto", wa:"mensaje"}  abre WhatsApp con ese mensaje
                             {t:"Texto", go:"#seccion"} lleva a una parte de la página
                             {t:"Texto", href:"mailto:..."} abre un enlace
   Las categorías y productos del catálogo se leen solos de js/data.js:
   si agregas un producto allá, el asistente ya lo conoce.
   ============================================================ */
window.CB_DATA = {
  wa: "573185023227",
  waTxt: "+57 318 5023227",
  mail: "publi.citypublicidad@hotmail.com",
  ig: "https://www.instagram.com/publi.citypublicidad",
  igUser: "@publi.citypublicidad",
  waDefault: "Hola PUBLICITY, quiero cotizar un proyecto.",

  /* botones del menú principal (ids de temas) */
  menu: ["servicios", "catalogo", "personalizador", "cotizar", "garantia", "contacto"],

  /* palabras extra para reconocer cada categoría del catálogo */
  catAlias: {
    "Mugs y termos": ["taza", "vaso", "botilito", "termo", "tomatodo", "caramanola", "pocillo"],
    "Papelería corporativa": ["libreta", "esfero", "cuaderno", "carpeta", "agenda", "boligrafo", "lapicero", "papeleria"],
    "Llaveros": ["llavero"],
    "Regalos corporativos": ["regalo", "detalle", "obsequio", "souvenir", "promocional", "merchandising", "pop"],
    "Accesorios": ["paraguas", "sombrilla", "maleta", "canguro", "espejo", "portacarnet", "carnet", "carne", "cinta", "portatil", "lanyard"],
    "Textil y bolsas": ["camiseta", "polo", "bolsa", "ropa", "dotacion", "gorra", "uniforme", "textil"],
    "Señalización y acrílicos": ["urna", "acrilico", "evacuacion", "semaforo", "senalizacion"],
    "Premios y reconocimientos": ["trofeo", "medalla", "premio", "reconocimiento", "placa"],
    "Carcasas": ["celular", "funda", "case", "telefono", "carcasa"],
    "Piedras y cerámicas": ["piedra", "ceramica", "azulejo", "ceramicas"],
    "Pad mouse y portavasos": ["pad", "mouse", "portavaso", "posavasos", "mousepad"],
    "Marcos y cristal": ["marco", "cristal", "portarretrato", "retrato", "vidrio"]
  },

  topics: [

    /* ───────────── QUIÉNES SOMOS ───────────── */
    {
      id: "quienes", chip: "¿Quiénes son?",
      kw: ["*quienes son", "*quien es publicity", "*que es publicity", "*que hacen", "a que se dedican", "nosotros", "empresa", "sobre ustedes", "publicity", "publi city", "acerca", "presentacion", "slogan"],
      a: `**PUBLICITY** (publi·city) reúne **publicidad, diseño, impresión y multimedia en un solo lugar**. Pasamos de la pantalla a la realidad: diseñamos tu marca y la hacemos visible, tangible e inolvidable, desde el logo hasta el pendón, el aviso luminoso, el empaque o el producto personalizado.

Han confiado en nosotros marcas como Corewoman, C.I. Textil, Fedesarrollo, El Malpensante y Prevención.`,
      next: ["servicios", "trabajos", "cotizar"]
    },

    /* ───────────── SERVICIOS ───────────── */
    {
      id: "servicios", chip: "Servicios",
      kw: ["*servicios", "*que ofrecen", "*que ofrece", "*que venden", "*que hacen", "que manejan", "todo lo que hacen", "ofrecen", "lista de servicios", "portafolio de servicios", "productos y servicios"],
      a: `Estos son nuestros **9 servicios**:

- **Diseño gráfico e identidad:** logotipos, imagen corporativa y piezas de marca.
- **Agencia publicitaria:** estrategia, campañas y creatividad.
- **Pendones y gran formato:** pendones, bastidores, rompetráficos, tropezones y lonas.
- **Stand modular:** diseño libre y fabricación de stands para ferias.
- **Vinilos decorativos:** impresión, corte y microperforado para espacios.
- **Avisos publicitarios:** acrílicos, cajas de luz y avisos interiores y exteriores.
- **Papelería y litografía:** tarjetas, membretes, volantes, catálogos y libretas.
- **Marcación personalizada:** sublimación, tampografía, screen y bordados.
- **Señalización de espacios:** evacuación, seguridad, placas y rotulación.

Además tenemos un **catálogo de productos personalizados** y un **personalizador 3D**. Dime cuál te interesa y te cuento más.`,
      next: ["diseno", "gran-formato", "vinilos", "avisos"],
      act: [{ t: "Ver servicios en la web", go: "#servicios" }]
    },
    {
      id: "diseno", chip: "Diseño e identidad",
      kw: ["*logo", "*logotipo", "*identidad", "*imagen corporativa", "*branding", "*diseno grafico", "marca", "manual de marca", "piezas de marca", "disenar", "disenador", "creacion de logo", "crear logo", "rebranding"],
      a: `**Diseño gráfico e identidad:** creamos logotipos, imagen corporativa y piezas de marca para que tu negocio se vea coherente en todo: papelería, redes, empaques, avisos y más.

Trabajamos por etapas: primero entendemos tu negocio (brief), luego te presentamos propuestas creativas (concepto), desarrollamos las piezas y ajustes (diseño) y por último producimos. Lo que apruebas por escrito es lo que fabricamos.

Si aún no tienes logo, cuéntanos tu idea y empezamos desde cero.`,
      next: ["proceso", "agencia", "cotizar"],
      act: [{ t: "Cotizar diseño", wa: "Hola PUBLICITY, quiero cotizar diseño gráfico e identidad (logo / imagen corporativa)." }]
    },
    {
      id: "agencia", chip: "Agencia publicitaria",
      kw: ["*agencia", "*campana", "*campanas", "*estrategia", "*creatividad", "publicidad", "marketing", "pauta", "comunicacion", "anuncios", "promocion", "posicionamiento"],
      a: `**Agencia publicitaria:** te ayudamos con estrategia, campañas y creatividad para tu negocio. La idea es que tu mensaje no solo se vea bien, sino que llegue a las personas correctas.

En el formulario de contacto también puedes pedir apoyo en **redes y contenido**, **multimedia y motion** y **web**. Cuéntanos qué quieres lograr y te respondemos con una propuesta.`,
      next: ["multimedia", "diseno", "cotizar"],
      act: [{ t: "Hablar de mi campaña", wa: "Hola PUBLICITY, quiero cotizar una campaña / estrategia publicitaria." }]
    },
    {
      id: "multimedia", chip: "Multimedia, redes y web",
      kw: ["*multimedia", "*motion", "*video", "*animacion", "*redes sociales", "*redes", "*contenido", "*pagina web", "*web", "*sitio web", "audiovisual", "reels", "community", "instagram contenido", "fotografia", "pagina"],
      a: `En el formulario de contacto puedes elegir estos servicios digitales: **multimedia y motion**, **redes y contenido** y **web**. Nuestra propuesta es unir lo digital con lo físico: pasamos de la pantalla a la realidad.

Cuéntanos qué necesitas (tipo de pieza, para qué red o plataforma, fecha) y te respondemos con una propuesta. Los detalles y alcances los definimos en la cotización.`,
      next: ["agencia", "cotizar", "contacto"],
      act: [{ t: "Cotizar multimedia / web", wa: "Hola PUBLICITY, quiero cotizar un servicio de multimedia / redes / web." }]
    },
    {
      id: "gran-formato", chip: "Pendones y gran formato",
      kw: ["*pendon", "*pendones", "*gran formato", "*lona", "*lonas", "*bastidor", "*bastidores", "*rompetrafico", "*rompetraficos", "*tropezon", "*tropezones", "*roll up", "*rollup", "valla", "banner", "backing", "tripode", "pop up", "impresion grande"],
      a: `**Pendones y gran formato:** hacemos pendones, bastidores, rompetráficos, tropezones y lonas.

En nuestros trabajos puedes ver una línea de pendones, un pendón con trípode y pendones para eventos. En el personalizador 3D también hay un pendón roll-up para que veas cómo quedaría tu diseño.

Para cotizar necesitamos: tipo de pieza, medidas, cantidad y tu arte o logo (si no lo tienes, lo diseñamos).`,
      next: ["personalizador", "cotizar", "trabajos"],
      act: [{ t: "Cotizar pendones", wa: "Hola PUBLICITY, quiero cotizar pendones / gran formato." }, { t: "Ver trabajos", go: "#trabajos" }]
    },
    {
      id: "stand", chip: "Stand modular",
      kw: ["*stand", "*stands", "*feria", "*ferias", "*modular", "exhibicion", "exposicion", "evento", "muebles de exhibicion", "mobiliario", "stand modular", "expositor"],
      a: `**Stand modular:** diseño libre y fabricación de stands para ferias. Diseñamos el espacio de acuerdo con tu marca y lo fabricamos.

También hacemos **mobiliario de exhibición**, **figuras y props para eventos** y **escritorios de oficina** (míralos en la sección Trabajos).

Para cotizar cuéntanos: la feria o evento, el tamaño del espacio, la fecha y qué quieres exhibir.`,
      next: ["trabajos", "cotizar", "tiempos"],
      act: [{ t: "Cotizar un stand", wa: "Hola PUBLICITY, quiero cotizar un stand modular para una feria." }, { t: "Ver trabajos", go: "#trabajos" }]
    },
    {
      id: "vinilos", chip: "Vinilos decorativos",
      kw: ["*vinilo", "*vinilos", "*microperforado", "*decorativo", "*decorativos", "mural", "murales", "pared", "paredes", "forrado", "pilares", "ambientacion", "decoracion", "vidrio esmerilado", "ventanas", "calcomania", "sticker", "adhesivo"],
      a: `**Vinilos decorativos:** impresión, corte y microperforado para espacios. Hacemos desde murales y paredes completas hasta pilares forrados y ambientación de bares y locales.

Puedes ver ejemplos en Trabajos: pilares forrados en vinilo, pared de vinilos, salón de bar, mural impreso e instalación de vinilo en pared.

Si necesitas que lo instalemos, indícalo al cotizar: la cotización dice si incluye instalación.`,
      next: ["trabajos", "instalacion", "cotizar"],
      act: [{ t: "Cotizar vinilos", wa: "Hola PUBLICITY, quiero cotizar vinilos decorativos." }, { t: "Ver trabajos", go: "#trabajos" }]
    },
    {
      id: "avisos", chip: "Avisos y cajas de luz",
      kw: ["*aviso", "*avisos", "*caja de luz", "*cajas de luz", "*acrilico", "*acrilicos", "*letras 3d", "*luminoso", "*luminosos", "*retroiluminacion", "*retroiluminado", "fachada", "letrero", "letreros", "rotulo", "exterior", "interior", "neon", "led"],
      a: `**Avisos publicitarios:** fabricamos acrílicos, cajas de luz y avisos para interior y exterior, incluidas letras 3D con retroiluminación y avisos luminosos.

Mira ejemplos en Trabajos: letras 3D con retroiluminación y aviso luminoso Quartina Gourmet. Para cotizar dinos el texto o logo, las medidas aproximadas, si es para interior o exterior y la ciudad donde se instalaría.`,
      next: ["trabajos", "instalacion", "cotizar"],
      act: [{ t: "Cotizar un aviso", wa: "Hola PUBLICITY, quiero cotizar un aviso publicitario." }, { t: "Ver trabajos", go: "#trabajos" }]
    },
    {
      id: "papeleria", chip: "Papelería y litografía",
      kw: ["*litografia", "*tarjetas de presentacion", "*tarjeta", "*tarjetas", "*membrete", "*membretes", "*volante", "*volantes", "*catalogos", "*folleto", "*folletos", "*impresion", "*imprimir", "papeleria", "libreta", "libretas", "afiche", "plegable", "brochure", "sobre", "sobres", "cuaderno", "empaque", "empaques", "caja", "bolsa personalizada"],
      a: `**Papelería y litografía:** tarjetas, membretes, volantes, catálogos y libretas. También hacemos **empaques corporativos** (bolsas y cajas personalizadas) y **cuadernos corporativos con logo**.

Para cotizar indícanos qué pieza necesitas, cantidad, medidas y si ya tienes el diseño.`,
      next: ["diseno", "catalogo", "cotizar"],
      act: [{ t: "Cotizar papelería", wa: "Hola PUBLICITY, quiero cotizar papelería / litografía." }]
    },
    {
      id: "marcacion", chip: "Marcación personalizada",
      kw: ["*marcacion", "*sublimacion", "*tampografia", "*screen", "*serigrafia", "*bordado", "*bordados", "*estampado", "*estampada", "*estampados", "estampar", "dotacion", "uniformes", "camisetas", "grabado", "personalizar", "personalizacion", "logo en", "marcar"],
      a: `**Marcación personalizada:** trabajamos con **sublimación, tampografía, screen y bordados** para poner tu logo o diseño en productos como mugs, textiles, piezas en madera y dotación.

Ejemplos en Trabajos: dotación estampada, mugs personalizados y piezas en madera personalizadas. La técnica más adecuada depende del producto y del diseño; te la recomendamos al cotizar.`,
      next: ["catalogo", "personalizador", "cotizar"],
      act: [{ t: "Cotizar marcación", wa: "Hola PUBLICITY, quiero cotizar marcación personalizada (sublimación / screen / bordado)." }]
    },
    {
      id: "senalizacion", chip: "Señalización",
      kw: ["*senalizacion", "*senaletica", "*evacuacion", "*ruta de evacuacion", "*fotoluminiscente", "*rotulacion", "seguridad", "placas", "placa", "emergencia", "sst", "señales", "oficina", "advertencia", "prohibido"],
      a: `**Señalización de espacios:** hacemos señalización de evacuación y seguridad, placas y rotulación. En el catálogo tienes la **ruta de evacuación fotoluminiscente**, la **urna acrílica con logo** y el **tablero Semáforo de la Convivencia**.

Cuéntanos el espacio (oficina, bodega, local, colegio…) y qué señales necesitas, y te cotizamos.`,
      next: ["catalogo", "cotizar", "instalacion"],
      act: [{ t: "Cotizar señalización", wa: "Hola PUBLICITY, quiero cotizar señalización de espacios." }]
    },

    /* ───────────── TRABAJOS / PORTAFOLIO ───────────── */
    {
      id: "trabajos", chip: "Trabajos realizados",
      kw: ["*trabajos", "*portafolio", "*proyectos", "*ejemplos", "*clientes", "*referencias", "*han hecho", "*han trabajado", "trabajos realizados", "galeria", "fotos", "muestras de trabajo", "experiencia", "casos", "quienes confian"],
      a: `En la sección **Trabajos** hay más de 25 proyectos reales: pendones, letras 3D con retroiluminación, empaques corporativos, dotación estampada, mobiliario de exhibición, figuras y props para eventos, stands para ferias, murales y vinilos, avisos luminosos, escritorios de oficina y cuadernos corporativos, entre otros.

Han confiado en nosotros **Corewoman, C.I. Textil, Fedesarrollo, El Malpensante y Prevención**.

Toca cualquier trabajo de la página y cotiza algo parecido por WhatsApp.`,
      next: ["servicios", "catalogo", "cotizar"],
      act: [{ t: "Ver trabajos", go: "#trabajos" }, { t: "Quiero algo parecido", wa: "Hola PUBLICITY, vi sus trabajos y quiero cotizar algo parecido." }]
    },

    /* ───────────── CATÁLOGO (la lista por categorías se genera sola) ───────────── */
    {
      id: "catalogo", chip: "Catálogo",
      kw: ["*catalogo", "*productos", "*producto", "*que productos", "promocionales", "articulos", "merchandising", "regalos", "souvenirs", "que tienen", "que venden", "categorias", "lista de productos"],
      dyn: "catalogo",
      a: "",
      next: ["personalizador", "cotizar", "precios"],
      act: [{ t: "Abrir el catálogo", go: "#catalogo" }]
    },

    /* ───────────── PERSONALIZADOR 3D ───────────── */
    {
      id: "personalizador", chip: "Personalizador 3D",
      kw: ["*personalizador", "*3d", "*disenar mi producto", "*disenar producto", "*ver como queda", "*como queda", "*simulador", "*mockup", "*probar diseno", "visualizar", "subir logo", "subir imagen", "editor", "disenador", "previsualizar", "girar", "personaliza"],
      a: `El **Personalizador 3D** (sección *Personaliza*) te deja ver tu producto con tu diseño antes de pedirlo:

- **Elige el producto** en el panel de la izquierda, por categorías, y su color.
- **Elige la cara** que quieres personalizar (frente, espalda, lateral, etc., según el producto).
- **Sube tu logo o imagen**, o **añade texto**: cambia fuente (Moderna, Ancha, Clásica o Manuscrita), color, tamaño y giro; puedes centrar, duplicar, eliminar, deshacer y rehacer.
- **Míralo desde todos los ángulos:** arrastra para girar, rueda o pellizco para zoom, botones de giro de 90°, Auto 360° y Restablecer.
- Cuando te guste, pulsa **«Enviar por WhatsApp»**.

Es una herramienta de visualización aproximada: el color final puede variar un poco respecto a la pantalla.`,
      next: ["personalizador-enviar", "personalizador-productos", "personalizador-ayuda"],
      act: [{ t: "Ir al personalizador", go: "#personaliza" }]
    },
    {
      id: "personalizador-enviar", chip: "¿Cómo envío mi diseño?",
      kw: ["*enviar diseno", "*enviar por whatsapp", "*mandar diseno", "*enviar mi diseno", "*como envio", "*guardar diseno", "descargar diseno", "imagen del diseno", "compartir diseno", "enviar imagen", "mandar imagen"],
      a: `Sin formularios: al pulsar **«Enviar por WhatsApp»** el personalizador genera una **imagen JPG con 4 vistas** de tu diseño.

- **En el celular:** se abre el menú de compartir; elige WhatsApp y envíala a nuestro número (+57 318 5023227).
- **En el computador:** la imagen se descarga y se copia al portapapeles, y se abre WhatsApp Web con nuestro chat: solo pega con **Ctrl+V**.

Esa imagen es una **solicitud de cotización**, no un diseño aprobado. Antes de producir te compartimos, cuando corresponda, un arte o prueba para tu aprobación.`,
      next: ["cotizar", "aprobacion", "personalizador-ayuda"],
      act: [{ t: "Ir al personalizador", go: "#personaliza" }]
    },
    {
      id: "personalizador-productos", chip: "Productos del 3D",
      kw: ["*productos del personalizador", "*que puedo personalizar", "*que productos se pueden", "que se puede personalizar", "productos 3d", "cuales productos", "opciones de productos", "que puedo disenar"],
      a: `En el Personalizador 3D hay decenas de productos agrupados por categoría:

- **Esferos y escritura:** esferos plásticos, metálicos y ecológicos, lápiz, resaltador, sets con estuche.
- **Agendas y libretas:** agenda, libreta, cuaderno argollado, carpeta y menús (varios tamaños).
- **Botilitos y termos:** botilitos plásticos, de vidrio, ecológicos, ecovidrio, con mosquetón, termos.
- **Mugs y vasos:** mug blanco, mágico, de color interno, térmico, prensa coffee, vasos y mugs viajeros.
- **Hogar y vajilla:** vasos, pocillos, platos, cubiertos con estuche, alcancía, tazas.
- **Llaveros:** bambú, cromo, sublimación, MDF, de notas, hueso, cojín, entre otros.
- **Textil y bolsas:** camiseta, gorra, bolsa ecológica, morral, canguro.
- **Sombrillas, identificación** (cinta portacarnet, carné), **juguetes** (carro), **gran formato** (pendón roll-up) y **cajas y empaques** (caja libro).`,
      next: ["personalizador", "catalogo", "cotizar"],
      act: [{ t: "Ir al personalizador", go: "#personaliza" }]
    },
    {
      id: "personalizador-ayuda", chip: "No me carga el 3D",
      kw: ["*no carga", "*no funciona", "*no me carga", "*no abre", "*error", "*falla", "*se traba", "*no deja", "problema personalizador", "no puedo subir", "no me deja", "lento", "pantalla en blanco", "webgl", "internet"],
      a: `Si el personalizador no carga o se ve en blanco, prueba esto:

- Verifica tu conexión a internet: el motor 3D se descarga al abrir la página.
- Recarga la página y espera unos segundos.
- Usa un navegador actualizado (Chrome, Edge, Safari o Firefox) y, si puedes, desactiva el ahorro de datos.
- Para subir un logo usa una imagen (JPG, PNG, etc.).

Si sigue fallando, no pierdes nada: escríbenos por WhatsApp con tu logo y el producto que quieres, y lo armamos por ti.`,
      next: ["contacto", "personalizador", "cotizar"],
      act: [{ t: "Pedir ayuda por WhatsApp", wa: "Hola PUBLICITY, el personalizador 3D no me funciona. Quiero cotizar un producto con mi logo." }]
    },

    /* ───────────── COTIZAR / PROCESO / PRECIOS ───────────── */
    {
      id: "cotizar", chip: "¿Cómo cotizo?",
      kw: ["*cotizar", "*cotizacion", "*cotizaciones", "*pedir cotizacion", "*hacer un pedido", "*como pido", "*como compro", "*quiero comprar", "*comprar", "*pedido", "*pedidos", "*ordenar", "*encargar", "presupuesto", "propuesta", "como solicito", "solicitar", "contratar", "pedir"],
      a: `Cotizar es fácil y **no te obliga a nada**. Tienes 4 caminos:

- **WhatsApp** (el más rápido): +57 318 5023227.
- **Formulario de contacto** (sección Contacto): nombre, correo, servicio y proyecto; llega a publi.citypublicidad@hotmail.com.
- **Catálogo:** en cada producto pulsa «Cotizar por WhatsApp».
- **Personalizador 3D:** diseña tu producto y envíalo con un clic.

Para darte un valor exacto, cuéntanos: **qué necesitas, cantidad, medidas (si aplica), fecha en que lo necesitas y tu logo o diseño**.

Te enviamos una cotización con descripción del trabajo, cantidades, medidas, materiales, valor, forma de pago, tiempos y vigencia. El contrato se perfecciona cuando la aceptas por escrito (WhatsApp o correo sirven) y, si se indica, pagas el anticipo.`,
      next: ["precios", "tiempos", "proceso", "contacto"],
      act: [{ t: "Cotizar por WhatsApp", wa: "Hola PUBLICITY, quiero cotizar un proyecto." }, { t: "Ir al formulario", go: "#contacto" }]
    },
    {
      id: "proceso", chip: "Cómo trabajan",
      kw: ["*proceso", "*como trabajan", "*etapas", "*pasos", "*brief", "*metodologia", "como funciona", "como es el proceso", "flujo de trabajo", "fases", "que sigue"],
      a: `Trabajamos en **4 etapas**, con entregas definidas en cada una:

- **01 Brief:** escuchamos tu negocio, tu público y lo que necesitas lograr.
- **02 Concepto:** propuestas creativas y ruta visual para elegir juntos.
- **03 Diseño:** desarrollo de piezas, ajustes y artes finales listos para producción.
- **04 Producción:** impresión, instalación o publicación, con control de calidad.`,
      next: ["cotizar", "aprobacion", "tiempos"],
      act: [{ t: "Ver el proceso", go: "#proceso" }]
    },
    {
      id: "precios", chip: "Precios",
      kw: ["*precio", "*precios", "*cuanto cuesta", "*cuanto vale", "*cuanto cobran", "*cuanto sale", "*valor", "*tarifa", "*tarifas", "*costo", "*costos", "*cuanto", "barato", "economico", "lista de precios", "cuanto es", "a como", "presupuesto"],
      a: `En la web **no publicamos precios fijos**, porque casi todo se fabrica a tu medida: el valor depende del producto, la cantidad, las medidas, los materiales y la técnica de personalización.

El precio lo recibes en la **cotización**, en **pesos colombianos**, y ahí se indica si incluye impuestos, envío o instalación. Cada cotización tiene una **vigencia**; si vence, el valor puede cambiar.

Escríbenos con lo que necesitas y te respondemos con un valor.`,
      next: ["cotizar", "pagos", "tiempos"],
      act: [{ t: "Pedir precio por WhatsApp", wa: "Hola PUBLICITY, quiero saber el precio de: " }]
    },
    {
      id: "pagos", chip: "Pagos y factura",
      kw: ["*pago", "*pagos", "*pagar", "*anticipo", "*abono", "*factura", "*facturan", "*facturacion", "*transferencia", "*medios de pago", "*formas de pago", "forma de pago", "tarjeta", "pse", "efectivo", "nequi", "daviplata", "credito", "iva", "impuestos", "cuotas", "cuenta bancaria", "consignacion"],
      a: `**Cómo se paga:** la forma de pago se define en tu cotización (por ejemplo, transferencia). Si se pacta **anticipo**, la producción empieza cuando se confirma el pago.

Emitimos **factura o documento equivalente** conforme a la ley.

Importante: el sitio web **no es una tienda en línea**: no procesa pagos ni guarda datos de tarjetas. Todo se cotiza y se contrata por WhatsApp, correo u otro canal acordado.

Para saber qué medios de pago puedes usar en tu caso, escríbenos y te lo confirmamos.`,
      next: ["cotizar", "tiempos", "devoluciones"],
      act: [{ t: "Preguntar por medios de pago", wa: "Hola PUBLICITY, quiero confirmar los medios de pago disponibles." }]
    },
    {
      id: "tiempos", chip: "Tiempos de entrega",
      kw: ["*tiempo de entrega", "*tiempos de entrega", "*cuanto demoran", "*cuanto se demora", "*cuanto tardan", "*cuanto tarda", "*plazo", "*plazos", "*demora", "*entrega", "*entregan", "*cuando llega", "urgente", "para cuando", "fecha de entrega", "rapido", "express", "cuantos dias", "dias habiles"],
      a: `Los **tiempos de entrega son estimados** y se indican en tu cotización. Empiezan a contar cuando están **aprobados el arte** y **recibido el anticipo** (si se pactó).

Pueden variar por causas ajenas a nosotros (proveedores, transporte, fuerza mayor) o por demoras en las aprobaciones o en el material que debes enviar. Si algo cambia, te avisamos.

Si tienes una fecha límite (un evento, una feria, un lanzamiento), dínosla al cotizar para decirte si es posible.`,
      next: ["cotizar", "aprobacion", "instalacion"],
      act: [{ t: "Consultar una fecha", wa: "Hola PUBLICITY, necesito un trabajo para la fecha: " }]
    },
    {
      id: "instalacion", chip: "Instalación y envíos",
      kw: ["*instalacion", "*instalan", "*instalar", "*envio", "*envios", "*enviar", "*domicilio", "*despacho", "*entregan en", "*llegan a", "transportadora", "a otra ciudad", "fuera de", "cobertura", "ciudad", "nacional", "bogota", "medellin", "cali"],
      a: `**Instalación:** hacemos instalaciones de nuestros trabajos (por ejemplo vinilos, avisos y stands). La cotización indica si el valor incluye instalación. Para instalar, debes garantizar el acceso al sitio y las condiciones acordadas. Si la falla es de una instalación hecha por nosotros, aplica la garantía.

**Envíos:** la cotización también indica si incluye envío. En la web no publicamos las ciudades de cobertura ni las tarifas; dinos en qué ciudad estás y te confirmamos.`,
      next: ["tiempos", "garantia", "cotizar"],
      act: [{ t: "Preguntar por mi ciudad", wa: "Hola PUBLICITY, quiero saber si pueden instalar / enviar a la ciudad: " }]
    },

    /* ───────────── ARTES, ARCHIVOS, COLORES ───────────── */
    {
      id: "archivos", chip: "Logo y archivos",
      kw: ["*mi logo", "*tengo logo", "*no tengo logo", "*archivo", "*archivos", "*formato", "*formatos", "*resolucion", "*vector", "*vectorial", "*pdf", "*ai", "*png", "*jpg", "*que envio", "*que necesito enviar", "*cual es el arte", "arte final", "calidad de imagen", "imagen borrosa", "pixelada", "illustrator", "corel", "photoshop"],
      a: `Envíanos tu logo o diseño por WhatsApp o correo, **en la mejor calidad que tengas** (idealmente el archivo original). La **resolución, el tamaño y la calidad del material** que aportas condicionan el resultado de impresión: si no es suficiente, te lo advertimos antes de producir; la decisión de continuar es tuya.

¿No tienes logo o está en mal estado? Con el servicio de **diseño gráfico e identidad** lo creamos o lo rehacemos.

Al enviarnos contenido (logos, imágenes, textos, fotos), declaras que eres titular de los derechos o tienes autorización para usarlo.`,
      next: ["diseno", "aprobacion", "derechos"],
      act: [{ t: "Enviar mi logo por WhatsApp", wa: "Hola PUBLICITY, te envío mi logo para cotizar un trabajo." }]
    },
    {
      id: "aprobacion", chip: "Aprobación del arte",
      kw: ["*aprobar", "*aprobacion", "*aprobado", "*prueba de arte", "*prueba", "*revisar arte", "*correcciones", "*cambios en el diseno", "*ajustes", "ortografia", "errores", "medidas finales", "antes de imprimir", "me muestran antes", "boceto"],
      a: `Antes de producir, revisa y **aprueba por escrito** el arte, las medidas y los textos: **lo aprobado es lo que fabricamos**. Cuando corresponda, te compartimos una prueba o arte para tu aprobación.

Ten en cuenta que los errores que ya estaban en un arte aprobado (ortografía, datos, resolución del material que aportaste) no se consideran defecto de fabricación. Cualquier cambio posterior de medidas, cantidades, artes o materiales puede modificar el precio y los tiempos, y se acuerda por escrito.`,
      next: ["garantia", "tiempos", "proceso"]
    },
    {
      id: "colores", chip: "Colores en pantalla vs impreso",
      kw: ["*color", "*colores", "*tono", "*cmyk", "*rgb", "*pantone", "*diferente al de la pantalla", "se ve diferente", "color exacto", "igual a la pantalla", "calibracion", "tonalidad", "variacion de color"],
      a: `El color en pantalla (RGB) y en impresión (CMYK) **no es idéntico**. Por eso el personalizador 3D y las imágenes de la web son **referenciales**: el color, la textura y las proporciones del producto final pueden diferir según tu pantalla, el material y la técnica.

Las variaciones menores de color o tono entre la pantalla y la impresión, dentro de las tolerancias normales de la industria, no se consideran defecto. Si el color es crítico para tu marca, pídenos una prueba antes de producir.`,
      next: ["aprobacion", "garantia", "personalizador"]
    },

    /* ───────────── GARANTÍA / DEVOLUCIONES / LEGAL ───────────── */
    {
      id: "garantia", chip: "Garantía",
      kw: ["*garantia", "*defecto", "*defectuoso", "*dañado", "*danado", "*mal hecho", "*llego mal", "*llego danado", "*no corresponde", "*salio mal", "*error de fabricacion", "*reclamo", "*reclamos", "*queja", "*quejas", "*devolver", "no me gusto", "problema con mi pedido", "falla", "se despego", "impresion corrida"],
      a: `Respondemos por la **calidad, idoneidad, seguridad y buen estado** de lo que entregamos. Hay garantía cuando el trabajo:

- Presenta **defectos de fabricación, impresión o acabado** (por ejemplo, impresión corrida, cortes mal hechos, materiales defectuosos o un vinilo bien instalado que se despega de forma anormal).
- **No corresponde a lo cotizado o aprobado** (medidas, cantidades, materiales, textos).
- Tiene **fallas en una instalación hecha por nosotros**.

No cubre: mal uso, golpes, humedad o intemperie fuera de lo recomendado, desgaste normal, manipulación o instalación por terceros, ni variaciones menores de color entre pantalla e impresión.

Si procede, la solución es **reparación o corrección sin costo, reposición o devolución del dinero**, y los costos de transporte y reinstalación por un defecto nuestro corren por nuestra cuenta.`,
      next: ["reclamo", "devoluciones", "cancelacion"],
      act: [{ t: "Hacer un reclamo", wa: "Hola PUBLICITY, quiero hacer un reclamo de garantía. Mi pedido / cotización es: " }, { t: "Leer la política", href: "devoluciones.html" }]
    },
    {
      id: "reclamo", chip: "¿Cómo hago un reclamo?",
      kw: ["*como reclamo", "*como hago un reclamo", "*hacer un reclamo", "*poner un reclamo", "*reportar un problema", "*reportar", "*sic", "*superintendencia", "no estoy conforme", "inconforme", "inconformidad", "mala atencion", "denuncia"],
      a: `Para hacer un reclamo:

- Escríbenos por **WhatsApp (+57 318 5023227)** o a **publi.citypublicidad@hotmail.com**.
- Cuéntanos qué pasó e incluye: **tu nombre, número de factura o cotización, fecha de entrega y fotos o videos claros** del problema.
- Revisamos el caso (podemos pedirte más información o visitar el sitio) y te respondemos con una solución. Si no procede, te explicamos el motivo por escrito.

Te recomendamos reportar el problema **dentro de los 5 días hábiles siguientes a la entrega**: es una recomendación para revisarlo más rápido y **no reduce tu garantía legal**.

Si no estás conforme con nuestra respuesta, puedes acudir a la Superintendencia de Industria y Comercio (SIC). Antes, escríbenos.`,
      next: ["garantia", "devoluciones", "contacto"],
      act: [{ t: "Reportar por WhatsApp", wa: "Hola PUBLICITY, quiero reportar un problema con mi pedido. Cotización/factura: " }]
    },
    {
      id: "devoluciones", chip: "Devoluciones y cambios",
      kw: ["*devolucion", "*devoluciones", "*cambio", "*cambios", "*retracto", "*retractarme", "*arrepentirme", "*reembolso", "*devuelven el dinero", "*me devuelven", "cambiar", "cambio de opinion", "no lo quiero", "politica de devolucion", "devolver producto"],
      a: `Depende de si el producto es **personalizado** o no:

- **Productos o servicios personalizados** (con tu logo, texto, medidas o diseño): por ley **no aplica retracto ni cambio por gusto** (cambio de opinión, color, medida o diseño). Sí aplica la **garantía** si hay defectos o no cumple lo aprobado.
- **Productos estándar sin personalizar** comprados a distancia: tienes **retracto de 5 días hábiles** desde la entrega. Avísanos por escrito, devuelve el producto sin uso y con su empaque (el transporte de la devolución lo asumes tú) y te devolvemos el dinero en máximo 30 días calendario.
- **Cambios por gusto en productos estándar:** no son obligatorios, pero los evaluamos como cortesía si está sin uso, en su empaque y según existencias.

Por eso es clave revisar y aprobar el arte antes de producir.`,
      next: ["garantia", "cancelacion", "reclamo"],
      act: [{ t: "Leer la política completa", href: "devoluciones.html" }]
    },
    {
      id: "cancelacion", chip: "Cancelar un pedido",
      kw: ["*cancelar", "*cancelacion", "*anular", "*ya no lo quiero", "*desistir", "*me arrepenti", "cancelar pedido", "cancelar cotizacion", "reversar", "no voy a continuar", "parar produccion"],
      a: `Puedes **cancelar un pedido antes de que inicie la producción** (es decir, antes de que el diseño esté aprobado y el material comprado o cortado). Te devolvemos lo pagado, **descontando los costos ya incurridos y documentados** (por ejemplo, horas de diseño, material adquirido o proceso iniciado).

Una vez iniciada la producción de un trabajo personalizado **no es posible cancelarlo ni devolverlo**, salvo garantía.`,
      next: ["devoluciones", "garantia", "contacto"],
      act: [{ t: "Cancelar por WhatsApp", wa: "Hola PUBLICITY, quiero consultar la cancelación de mi pedido. Cotización: " }]
    },
    {
      id: "reversion", chip: "Reversión de pago",
      kw: ["*reversion", "*reversar pago", "*reversion de pago", "*cobro no autorizado", "*fraude", "*fraudulento", "pago no reconocido", "me cobraron", "cobro doble", "no me llego el producto", "pse", "tarjeta"],
      a: `Si pagaste con tarjeta, PSE u otro medio electrónico y la compra fue **fraudulenta o no solicitada**, **no recibiste el producto**, o recibiste uno **defectuoso o distinto al pedido**, puedes pedir la **reversión del pago**.

Debes presentar el reclamo **dentro de los 5 días hábiles** siguientes a conocer la operación irregular o a la fecha en que debiste recibir el producto o lo recibiste, **tanto ante nosotros como ante el emisor de tu medio de pago**.`,
      next: ["reclamo", "garantia", "contacto"],
      act: [{ t: "Escribirnos", wa: "Hola PUBLICITY, quiero consultar una reversión de pago." }]
    },
    {
      id: "derechos", chip: "Derechos del diseño",
      kw: ["*derechos del logo", "*derechos del diseno", "*derechos", "*derechos de autor", "*propiedad intelectual", "*de quien es el diseno", "*de quien es el logo", "*cesion", "*cesion de derechos", "*quien es el dueno", "copyright", "marca registrada", "portafolio", "pueden publicar", "publicar mi trabajo", "confidencialidad", "uso de mi logo", "logo de terceros"],
      a: `**Diseños que creamos para ti:** salvo pacto distinto en la cotización o el contrato, los derechos patrimoniales de los diseños originales se **ceden a tu favor una vez pagado el valor total del trabajo**, para el uso acordado. Conservamos los derechos morales y el derecho a mostrar el trabajo en nuestro portafolio y redes, salvo que pactemos confidencialidad.

**Lo que tú nos entregas** (logos, imágenes, textos, marcas): debes ser titular o tener autorización, y no puede infringir derechos de terceros ni ser ilícito, engañoso, difamatorio, discriminatorio o sexualmente explícito. Podemos rechazar un trabajo si el contenido incumple esto.

Los logos de clientes que aparecen en el sitio pertenecen a sus titulares; si eres titular y quieres que retiremos alguno, escríbenos.`,
      next: ["archivos", "privacidad", "contacto"]
    },
    {
      id: "privacidad", chip: "Datos personales",
      kw: ["*privacidad", "*datos personales", "*habeas data", "*tratamiento de datos", "*mis datos", "*proteccion de datos", "*ley 1581", "*politica de privacidad", "*borrar mis datos", "*eliminar mis datos", "*supresion", "autorizacion", "que hacen con mis datos", "venden mis datos", "seguridad de datos", "datos sensibles", "actualizar mis datos"],
      a: `Tratamos tus datos según la **Ley 1581 de 2012** (habeas data). Resumen:

- **Qué recogemos:** solo lo necesario: en el formulario, nombre, correo, servicio de interés y mensaje; en WhatsApp, tu número, nombre de perfil, mensajes y archivos que nos envíes; y los datos que entregues para cotizar y facturar.
- **Para qué:** responder consultas, cotizar, diseñar, producir, entregar, facturar, dar garantía y cumplir obligaciones legales. Información comercial solo si lo autorizas.
- **No vendemos tus datos** ni los usamos para otros fines sin pedirte nueva autorización. No solicitamos datos sensibles.
- **Tus derechos:** conocer, actualizar, rectificar, pedir prueba de la autorización, revocarla o pedir la supresión, y presentar quejas ante la SIC.
- **Cómo ejercerlos:** escribe a publi.citypublicidad@hotmail.com o al WhatsApp +57 318 5023227. Consultas: respuesta en 10 días hábiles. Reclamos: 15 días hábiles.

**Sobre este asistente:** funciona en tu navegador; lo que escribes aquí no se envía a ningún servidor ni se guarda. Solo si pulsas un botón de WhatsApp se abre un chat con nosotros.`,
      next: ["cookies", "derechos", "contacto"],
      act: [{ t: "Leer la política", href: "privacidad.html" }]
    },
    {
      id: "cookies", chip: "Cookies",
      kw: ["*cookies", "*cookie", "*analytics", "*google analytics", "*pixel", "*pixel de meta", "*rastreo", "*seguimiento", "*configurar cookies", "aviso de cookies", "rechazar cookies", "aceptar cookies", "publicidad personalizada", "facebook pixel"],
      a: `Usamos tres tipos de cookies:

- **Necesarias:** recuerdan tu elección sobre cookies y tu modo claro u oscuro. No requieren consentimiento.
- **Analíticas (Google Analytics 4):** estadísticas de uso del sitio. Solo si las aceptas.
- **Marketing (Píxel de Meta):** mide acciones tras ver nuestros anuncios en Facebook e Instagram. Solo si lo aceptas.

Hasta que decidas, solo funcionan las necesarias. **Rechazar es tan fácil como aceptar.** Tu elección se recuerda 12 meses y puedes cambiarla cuando quieras con **«Configurar cookies»** en el pie de página.`,
      next: ["privacidad", "terminos", "contacto"],
      act: [{ t: "Leer la política", href: "cookies.html" }]
    },
    {
      id: "terminos", chip: "Términos y condiciones",
      kw: ["*terminos", "*condiciones", "*terminos y condiciones", "*es una tienda", "*tienda en linea", "*tienda virtual", "*compra en linea", "*carrito", "reglas", "politicas", "legal", "informacion legal", "uso del sitio", "responsabilidad"],
      a: `Lo esencial de los **Términos y Condiciones**:

- El sitio es **informativo y comercial**: muestra servicios, trabajos y catálogo. **No es una tienda en línea** y no procesa pagos.
- Tu solicitud por el sitio o WhatsApp es una **petición de cotización** y no obliga a ninguna de las partes. El contrato se perfecciona cuando aceptas la cotización por escrito.
- Las fotos, mockups y renders son **referenciales**; si hay diferencia, prevalece la cotización aprobada por escrito.
- Los **precios** son los de la cotización vigente, en pesos colombianos.
- Los **tiempos** son estimados y empiezan con arte aprobado y anticipo recibido.

Te recomendamos leer el documento completo.`,
      next: ["cotizar", "garantia", "privacidad"],
      act: [{ t: "Leer los términos", href: "terminos.html" }]
    },

    /* ───────────── CONTACTO ───────────── */
    {
      id: "contacto", chip: "Contacto",
      kw: ["*contacto", "*contactar", "*telefono", "*numero", "*whatsapp", "*correo", "*email", "*mail", "*instagram", "*redes de ustedes", "*como los contacto", "*como me comunico", "llamar", "celular", "comunicarme", "escribirles", "hablar con alguien", "atencion", "asesor"],
      a: `Puedes escribirnos por:

- **WhatsApp:** +57 318 5023227 (el canal más rápido).
- **Correo:** publi.citypublicidad@hotmail.com
- **Instagram:** @publi.citypublicidad
- **Formulario** en la sección Contacto de esta página (marca la casilla de autorización de datos antes de enviar).

Si el formulario falla, te ofrece enviar tu mensaje ya escrito por WhatsApp.`,
      next: ["cotizar", "ubicacion", "servicios"],
      act: [{ t: "Escribir por WhatsApp", wa: "Hola PUBLICITY, quiero cotizar un proyecto." }, { t: "Instagram", href: "https://www.instagram.com/publi.citypublicidad" }, { t: "Enviar correo", href: "mailto:publi.citypublicidad@hotmail.com" }]
    },
    {
      id: "humano", chip: "Hablar con una persona",
      kw: ["*persona", "*humano", "*asesor", "*asesora", "*agente", "*alguien real", "*hablar con alguien", "*quiero hablar", "*comunicarme con", "*comuniquenme", "*atencion al cliente", "*servicio al cliente", "no me sirve", "no entiendo", "no me ayudas"],
      a: `Claro. Para hablar con el equipo de PUBLICITY, escríbenos por **WhatsApp al +57 318 5023227** o a **publi.citypublicidad@hotmail.com**. Ellos te atienden con tu caso concreto.`,
      next: ["cotizar", "contacto"],
      act: [{ t: "Hablar por WhatsApp", wa: "Hola PUBLICITY, quiero hablar con un asesor." }]
    },
    {
      id: "ubicacion", chip: "Ubicación y horarios",
      kw: ["*ubicacion", "*direccion", "*donde estan", "*donde quedan", "*donde queda", "*horario", "*horarios", "*a que hora", "*atienden", "*abren", "*cierran", "*local", "*sede", "*oficina", "*taller", "visitarlos", "ir a la tienda", "punto de venta", "sabados", "domingos", "festivos"],
      a: `En la página **no publicamos una dirección ni un horario de atención**, así que prefiero no inventarlos. Para saber dónde estamos, si puedes visitarnos o en qué horario te atendemos, escríbenos por WhatsApp (+57 318 5023227) y te lo confirmamos.`,
      next: ["contacto", "instalacion", "cotizar"],
      act: [{ t: "Preguntar por WhatsApp", wa: "Hola PUBLICITY, quiero saber la ubicación y el horario de atención." }]
    },
    {
      id: "sin-dato", chip: "Mínimos y descuentos",
      kw: ["*minimo", "*minimos", "*cantidad minima", "*pedido minimo", "*por mayor", "*al por mayor", "*mayorista", "*descuento", "*descuentos", "*promocion", "*oferta", "*muestra", "*muestras", "*stock", "*disponibilidad", "*existencias", "*unidades", "*cuantas unidades", "desde cuantas", "una sola unidad", "una unidad", "personalizado unico", "volumen", "cantidades grandes", "empresas"],
      a: `Las **cantidades mínimas, descuentos por volumen, muestras y disponibilidad** dependen de cada producto y de cada pedido, y no están publicados en la web. Los productos del catálogo pueden variar en disponibilidad, referencias, medidas y acabados según proveedores y existencias.

Dinos qué producto quieres y cuántas unidades, y el equipo te confirma las condiciones en la cotización.`,
      next: ["cotizar", "precios", "catalogo"],
      act: [{ t: "Preguntar por WhatsApp", wa: "Hola PUBLICITY, quiero saber mínimos / descuentos para: " }]
    },
    {
      id: "sitio", chip: "Sobre esta página",
      kw: ["*modo oscuro", "*modo claro", "*tema oscuro", "*oscuro", "*claro", "*sol y luna", "*contador de visitas", "*visitas", "como funciona la pagina", "como navegar", "secciones", "menu de la pagina", "en que parte", "donde encuentro", "como uso la pagina"],
      a: `Esta página tiene 6 secciones, en el menú superior:

- **Servicios** · lo que hacemos.
- **Trabajos** · proyectos reales (toca uno para cotizar algo parecido).
- **Catálogo** · productos personalizables, con filtro por categoría.
- **Personaliza** · el personalizador 3D.
- **Proceso** · cómo trabajamos.
- **Contacto** · WhatsApp, correo y formulario.

El botón de **sol/luna** cambia entre modo claro y oscuro. Abajo a la izquierda hay un contador de visitas, y en el pie de página están las políticas legales.`,
      next: ["servicios", "catalogo", "personalizador"]
    }
  ]
};
