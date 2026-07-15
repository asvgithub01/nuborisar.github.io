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
  }
];
