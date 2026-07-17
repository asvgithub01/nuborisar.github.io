window.APP_CATALOG = [
  {
    id: "caminator",
    name: "Caminator",
    category: "mapas",
    categoryLabel: "Mapas y navegación",
    icon: "assets/icons/caminator.svg",
    accent: "#a9f06b",
    description: "Planifica rutas a pie por caminos rurales, graba recorridos y lleva tus mapas al modo offline.",
    longDescription: "Una herramienta de campo para descubrir caminos rurales sobre OpenStreetMap. Permite elegir origen y destino, calcular recorridos, importar GPX y guardar mapas para zonas sin cobertura.",
    features: ["Rutas rurales con Dijkstra", "Importación y grabación GPX", "Mapas OSM y modo offline", "Distancia y perfil de elevación"],
    minAndroid: "Android 8.0+",
    packageName: "com.caminator.app",
    screenshots: [
      { src: "assets/screenshots/caminator-01.png", alt: "Mapa principal de Caminator" },
      { src: "assets/screenshots/caminator-02.png", alt: "Planificador de rutas de Caminator" },
      { src: "assets/screenshots/caminator-03.png", alt: "Menú de herramientas de Caminator" }
    ],
    versions: [
      {
        version: "0.1.0",
        code: 1,
        date: "9 jul 2026",
        isoDate: "2026-07-09",
        size: "33,7 MB",
        channel: "Debug",
        apk: "apks/caminator/caminator-0.1.0-debug.apk",
        sha256: "E942DD2ADB6E09E951AE6A6F2858E415581A43C2AD492340CBD2C789228401B6",
        changes: [
          "Planificación de rutas entre dos puntos sobre caminos rurales.",
          "Capas OpenStreetMap, descarga de mapa offline y limpieza de caché.",
          "Importación de tracks GPX, grabación de recorridos y waypoints.",
          "Información de distancia, desnivel y perfil de elevación."
        ]
      }
    ]
  },
  {
    id: "calendario-series",
    name: "Calendario Series",
    category: "entretenimiento",
    categoryLabel: "Entretenimiento",
    icon: "assets/icons/calendario-series.svg",
    accent: "#ff8ad8",
    description: "Consulta próximos estrenos de series y películas en tus plataformas de streaming.",
    longDescription: "Un calendario visual de estrenos que reúne Prime Video, Netflix, HBO Max, Disney+ y Filmin. Su interfaz de cristal adapta el fondo y el color a cada plataforma.",
    features: ["Agenda real con TVMaze", "Filtros por plataforma", "Fichas visuales de estrenos", "Interfaz glassmorphism"],
    minAndroid: "Android 7.0+",
    packageName: "com.asv.calendarioseries.debug",
    screenshots: [
      { src: "assets/screenshots/calendario-01.png", alt: "Estrenos de Prime Video en Calendario Series" },
      { src: "assets/screenshots/calendario-02.png", alt: "Estrenos de Netflix en Calendario Series" },
      { src: "assets/screenshots/calendario-03.png", alt: "Estrenos de HBO Max en Calendario Series" }
    ],
    versions: [
      {
        version: "1.0.0-debug",
        code: 1,
        date: "8 jul 2026",
        isoDate: "2026-07-08",
        size: "20,0 MB",
        channel: "Debug",
        apk: "apks/calendario-series/calendario-series-1.0.0-debug.apk",
        sha256: "DD3CF5CAAEB598B7BD4F8A663C94D1161A7185FDA4A8350AEBAC87A8E7E5711D",
        changes: [
          "Calendario conectado a la agenda pública de TVMaze.",
          "Filtros para Prime Video, Netflix, HBO Max, Disney+ y Filmin.",
          "Nueva interfaz glassmorphism con fondos dinámicos por estreno.",
          "Mejor detección de Filmin, gestos y espacio para la barra de navegación."
        ]
      }
    ]
  },
  {
    id: "bbfeed",
    name: "BabyBiteLog",
    category: "salud",
    categoryLabel: "Familia y salud",
    icon: "assets/icons/bbfeed.svg",
    accent: "#c8ff72",
    description: "Registra la introducción de alimentos del bebé y sigue cada prueba desde el primer bocado.",
    longDescription: "Un diario local y sencillo para acompañar la alimentación complementaria. Reúne un catálogo de más de cien alimentos, permite marcar cada exposición y conservar fecha y notas sin depender de una cuenta.",
    features: ["Catálogo de 103 alimentos", "Seguimiento por exposiciones", "Notas y fecha de cada prueba", "Datos locales y privados"],
    minAndroid: "Android 8.0+",
    packageName: "com.bbfeed.app",
    screenshots: [
      { src: "assets/screenshots/bbfeed-01.png", alt: "Catálogo de alimentos de BabyBiteLog" },
      { src: "assets/screenshots/bbfeed-02.png", alt: "Registro de una exposición a huevo en BabyBiteLog" }
    ],
    versions: [
      {
        version: "0.1.0",
        code: 1,
        date: "5 jun 2026",
        isoDate: "2026-06-05",
        size: "1,4 MB",
        channel: "Release",
        apk: "apks/bbfeed/babybitelog-0.1.0-release.apk",
        sha256: "6F64F0EDFFD9C80F9789ED04DA093D8A1B252D236C3E87A29DEF0DF60602F25B",
        changes: [
          "Rediseño completo de la interfaz y nuevo icono de aplicación.",
          "Catálogo internacionalizado de 103 alimentos por categorías.",
          "Estados rápidos para registrar primera, segunda y tercera exposición.",
          "Filtros, notas y fechas guardados de forma local con DataStore."
        ]
      }
    ]
  },
  {
    id: "ludus-doctore",
    name: "Ludus Doctore",
    category: "deporte",
    categoryLabel: "Deporte y entrenamiento",
    icon: "assets/icons/ludus-doctore.svg",
    accent: "#d8c9ff",
    description: "Entrena con rutinas guiadas, intervalos de preparación y un historial de tus sesiones.",
    longDescription: "Un entrenador de bolsillo para ejecutar ejercicios cronometrados. Cada rutina combina tiempo de preparación y trabajo, ofrece controles directos y conserva el historial para revisar la constancia.",
    features: ["Ejercicios cronometrados", "Preparación y cuenta atrás", "Historial de sesiones", "Recordatorios persistentes"],
    minAndroid: "Android 8.0+",
    packageName: "com.ludus.doctore",
    screenshots: [
      { src: "assets/screenshots/ludus-doctore-02.png", alt: "Lista de ejercicios cronometrados de Ludus Doctore" }
    ],
    versions: [
      {
        version: "1.0",
        code: 1,
        date: "29 jun 2026",
        isoDate: "2026-06-29",
        size: "61,6 MB",
        channel: "Debug",
        apk: "apks/ludus-doctore/ludus-doctore-1.0-debug.apk",
        sha256: "F936248E3E18B18340C1ABE590587903319CCC83876E93894D8138B74E081638",
        changes: [
          "Ejercicios interactivos con temporizador y fase de preparación.",
          "Navegación inferior para ejercicios, historial y ajustes.",
          "Servicio en primer plano y arranque de recordatorios tras reiniciar.",
          "Correcciones de estabilidad en navegación, alarmas y arranque."
        ]
      }
    ]
  },
  {
    id: "mochilalist",
    name: "BasePack",
    category: "outdoor",
    categoryLabel: "Outdoor",
    icon: "assets/icons/mochilalist.svg",
    accent: "#9fe870",
    description: "Prepara mochilas por actividad, controla el peso y reutiliza tu biblioteca de material.",
    longDescription: "Planifica una carga completa para montaña, vivac o trekking. Crea perfiles, organiza el equipo por secciones, visualiza el peso total y reutiliza material guardado incluso cuando estás sin cobertura.",
    features: ["Mochilas y perfiles", "Peso total por secciones", "Biblioteca de material", "Modo offline y sincronización"],
    minAndroid: "Android 8.0+",
    packageName: "com.basepack.mochilalist",
    screenshots: [
      { src: "assets/screenshots/mochilalist-01.png", alt: "Pantalla de mochilas de BasePack" }
    ],
    versions: [
      {
        version: "1.0.0",
        code: 1,
        date: "17 jul 2026",
        isoDate: "2026-07-17",
        size: "43,5 MB",
        channel: "Debug",
        apk: "apks/mochilalist/basepack-1.0.0-debug.apk",
        sha256: "E80F6C152840AA35EDCE272BD46C93EE0997C79B8E996096200D6A5B23759D5A",
        changes: [
          "Nuevo visualizador de carga con peso y recuento de objetos.",
          "Secciones anidadas para refugio, descanso, cocina y alimentación.",
          "Biblioteca reutilizable con fotos persistentes del material.",
          "Inicio de sesión y base para sincronización multiusuario con Firestore."
        ]
      }
    ]
  },
  {
    id: "mtgcollection",
    name: "MTG Collection",
    category: "entretenimiento",
    categoryLabel: "Entretenimiento",
    icon: "assets/icons/mtgcollection.svg",
    accent: "#ffe56d",
    description: "Descubre las cartas más recientes de Magic y filtra rápidamente por idioma.",
    longDescription: "Un catálogo ligero para consultar las últimas cartas publicadas de Magic: The Gathering. Muestra ilustración, coste, tipo, texto, rareza, colección y fecha con filtros para cartas en inglés y español.",
    features: ["Cartas recientes vía API", "Filtros EN y ES", "Datos de edición y rareza", "Actualización manual del catálogo"],
    minAndroid: "Android 8.0+",
    packageName: "com.mtgcollection",
    screenshots: [
      { src: "assets/screenshots/mtgcollection-02.png", alt: "Últimas cartas en MTG Collection" },
      { src: "assets/screenshots/mtgcollection-03.png", alt: "Filtro de cartas en español de MTG Collection" }
    ],
    versions: [
      {
        version: "1.0",
        code: 1,
        date: "9 jun 2026",
        isoDate: "2026-06-09",
        size: "19,0 MB",
        channel: "Debug",
        apk: "apks/mtgcollection/mtg-collection-1.0-debug.apk",
        sha256: "0AAF0365515123F4BB1E1AEE051D98C3F8009F2DACCD48D69B8D7CD3F54C2BB3",
        changes: [
          "Catálogo de las últimas cartas conectado a una API pública de Magic.",
          "Filtros rápidos para todas las cartas, inglés y español.",
          "Fichas con coste de maná, tipo, texto, rareza, set y fecha.",
          "Actualización manual y estados de carga y error."
        ]
      }
    ]
  },
  {
    id: "shadow",
    name: "Shadow Streets",
    category: "mapas",
    categoryLabel: "Mapas y navegación",
    icon: "assets/icons/shadow.svg",
    accent: "#cab8ff",
    description: "Estima qué calles cercanas tienen sombra y prepara paseos más frescos sobre el mapa.",
    longDescription: "ShadeWalk combina la posición del sol con datos abiertos de calles para estimar los tramos en sombra. Permite situarte por GPS, ajustar el radio de análisis y preparar un paseo sombreado por tiempo o distancia.",
    features: ["Estimación de sombra urbana", "Calles de OpenStreetMap", "Posición solar en tiempo real", "Paseos por duración o distancia"],
    minAndroid: "Android 8.0+",
    packageName: "com.mrtdk.shadowwalk",
    screenshots: [
      { src: "assets/screenshots/shadow-02.png", alt: "Mapa y controles de ShadeWalk" },
      { src: "assets/screenshots/shadow-03.png", alt: "Diagnóstico de GPS y datos de ShadeWalk" }
    ],
    versions: [
      {
        version: "0.1.0",
        code: 1,
        date: "10 jun 2026",
        isoDate: "2026-06-10",
        size: "21,0 MB",
        channel: "Debug",
        apk: "apks/shadow/shadow-streets-0.1.0-debug.apk",
        sha256: "45CBDBDBF0DFBEF6196DBE087E47916670B4CB9E5CA0FFF4D63F37E5BA97280C",
        changes: [
          "Primer MVP de paseo sombreado con mapa interactivo.",
          "Estimación por orientación de la calle, azimut y altura solar.",
          "Consulta de vías cercanas con OpenStreetMap Overpass.",
          "Controles de GPS, radio de análisis y caché de datos."
        ]
      }
    ]
  },
  {
    id: "asvvault",
    name: "AsvVault",
    category: "utilidades",
    categoryLabel: "Seguridad",
    icon: "assets/icons/asvvault.svg",
    accent: "#67e8c8",
    description: "Guarda credenciales en una bóveda local cifrada y protégelas con PIN y biometría.",
    longDescription: "Un gestor de contraseñas privado con cifrado local. Organiza servicios, usuarios, contraseñas y URLs; facilita la copia de credenciales y protege el acceso y las acciones sensibles mediante autenticación.",
    features: ["Bóveda cifrada con AES-GCM", "PIN y autenticación biométrica", "Autocompletado de URL y favicon", "Exportación e importación de copia"],
    minAndroid: "Android 8.0+",
    packageName: "com.asv.asvvault",
    screenshots: [
      { src: "assets/screenshots/asvvault-01.png", alt: "Creación de PIN seguro en AsvVault" },
      { src: "assets/screenshots/asvvault-02.png", alt: "Confirmación del PIN en AsvVault" }
    ],
    versions: [
      {
        version: "1.0",
        code: 1,
        date: "11 may 2026",
        isoDate: "2026-05-11",
        size: "20,5 MB",
        channel: "Debug · ADB",
        apk: "apks/asvvault/asvvault-1.0-debug.apk",
        sha256: "4900EFCE7E99A3CB60EE782BF2AAC7FCCE97B8700E2E70A0DD23FC08E65EADC4",
        changes: [
          "Nuevo diseño SecurePass con autenticación en dos pasos.",
          "Autocompletado de URLs y favicon para identificar servicios.",
          "Exportación e importación de copias de la bóveda.",
          "Migración de PIN y confirmación autenticada al borrar entradas."
        ]
      }
    ]
  },
  {
    id: "ludusclimb",
    name: "LuDusClimb",
    category: "outdoor",
    categoryLabel: "Escalada y outdoor",
    icon: "assets/icons/ludusclimb.svg",
    accent: "#99dfff",
    description: "Explora zonas de escalada, sectores y bloques con información y material multimedia.",
    longDescription: "Una guía de escalada y búlder organizada por zonas, sectores y problemas. Centraliza croquis, imágenes, vídeos y comentarios, con acceso mediante cuenta para acompañarte tanto en el rocódromo como en roca.",
    features: ["Zonas, sectores y bloques", "Galerías de fotos y vídeos", "Comentarios de la comunidad", "Acceso con cuenta de Google"],
    minAndroid: "Android 6.0+",
    packageName: "com.asv.lexionboulder",
    screenshots: [
      { src: "assets/screenshots/ludusclimb-01.png", alt: "Acceso con Google a LuDusClimb" }
    ],
    versions: [
      {
        version: "1.0.0",
        code: 1,
        date: "1 jul 2023",
        isoDate: "2023-07-01",
        size: "68,5 MB",
        channel: "Release",
        apk: "apks/ludusclimb/ludusclimb-1.0.0.apk",
        sha256: "BD126E0EB91C208FC7BE5F3E2D29CD5C3ABA098EF72D93EE2BE0E576A1CE58EE",
        changes: [
          "Guía de escalada estructurada en zonas, sectores y bloques.",
          "Fichas con imágenes, vídeos y comentarios asociados.",
          "Descarga de contenido multimedia para consultar las zonas.",
          "Inicio de sesión mediante cuenta de Google."
        ]
      }
    ]
  },
  {
    id: "pantry",
    name: "Despensia",
    category: "utilidades",
    categoryLabel: "Hogar",
    icon: "assets/icons/pantry.svg",
    accent: "#b8f3db",
    description: "Digitaliza tu despensa, controla cantidades y caducidades y registra compras desde tickets.",
    longDescription: "Una despensa inteligente para saber qué tienes en casa. Escanea códigos de barras, reconoce caducidades, organiza cantidades y precios y permite convertir las líneas de un ticket en productos del inventario.",
    features: ["Escáner de códigos de barras", "OCR de fechas de caducidad", "Inventario, cantidades y precios", "Tickets y sincronización"],
    minAndroid: "Android 8.0+",
    packageName: "com.pantry.mvp",
    screenshots: [
      { src: "assets/screenshots/pantry-01.png", alt: "Panel principal de Despensia" },
      { src: "assets/screenshots/pantry-02.png", alt: "Inventario de Mi despensa en Despensia" }
    ],
    versions: [
      {
        version: "0.1.53",
        code: 53,
        date: "9 may 2026",
        isoDate: "2026-05-09",
        size: "88,7 MB",
        channel: "Debug",
        apk: "apks/pantry/despensia-0.1.53-debug.apk",
        sha256: "E90C02EBD751DD1A57E4C4495237ABB2A4B244B0AD927FDE719F0378786C05A5",
        changes: [
          "Inventario doméstico con cantidades, precios y caducidades.",
          "Escaneo global accesible desde un botón flotante.",
          "Mapeo automático de líneas de tickets a productos de la despensa.",
          "Histórico de precios conservado al actualizar las compras."
        ]
      }
    ]
  },
  {
    id: "tindeq",
    name: "LuDusDyno",
    category: "deporte",
    categoryLabel: "Escalada y entrenamiento",
    icon: "assets/icons/tindeq.svg",
    accent: "#8ed8ff",
    description: "Conecta un dinamómetro Bluetooth y convierte la fuerza de agarre en entrenamientos medibles.",
    longDescription: "Una herramienta de entrenamiento para escalada compatible con sensores Tindeq y WH-C06. Mide la fuerza máxima, crea sesiones por mano y configura series, repeticiones, porcentajes y descansos.",
    features: ["Conexión Bluetooth al dinamómetro", "Medición de fuerza máxima", "Rutinas por mano", "Series, repeticiones y descansos"],
    minAndroid: "Android 5.0+",
    packageName: "com.asv.tindeqreader",
    screenshots: [
      { src: "assets/screenshots/tindeq-01.png", alt: "Editor de ejercicios de LuDusDyno" },
      { src: "assets/screenshots/tindeq-02.png", alt: "Entrenamiento de fuerza máxima por mano en LuDusDyno" }
    ],
    versions: [
      {
        version: "1.0.0",
        code: 1,
        date: "16 mar 2026",
        isoDate: "2026-03-16",
        size: "76,6 MB",
        channel: "Debug",
        apk: "apks/tindeq/ludusdyno-1.0.0-debug.apk",
        sha256: "D8CABFB95A5AEEBB1F3407B81A6926E584186B15A92AAB8D7FEE71573986B198",
        changes: [
          "Conexión Bluetooth con dinamómetros Tindeq y WH-C06.",
          "Pruebas de fuerza máxima separadas por mano.",
          "Editor de ejercicios por porcentaje, series y repeticiones.",
          "Temporizadores de trabajo y descanso para cada sesión."
        ]
      }
    ]
  }
];
