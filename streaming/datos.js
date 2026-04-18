// ============================================================
// CHARLY STREAM v2.0 — CONFIGURACIÓN Y BASE DE DATOS
// ============================================================

const CONFIG = {
  nombre: "CHARLY STREAM",
  slogan: "Anime & Doramas en Español",
  whatsapp: "59165657865",
  precio_mensual: "5 Bs",
  dias_prueba: 7,
  version: "2.0.0",
  tiktok: "https://www.tiktok.com/@abel_ofi",
  // API Keys
  tmdb_key: "2dca580c2a14b55200e784d157207b4d", // clave pública demo TMDB
  // Endpoints
  jikan: "https://api.jikan.moe/v4",
  tmdb: "https://api.themoviedb.org/3",
  tmdb_img: "https://image.tmdb.org/t/p/w500",
  tmdb_img_lg: "https://image.tmdb.org/t/p/original",
  // Consumet (streaming links reales M3U8)
  consumet: "https://consumet-api.vercel.app",
  // CORS proxy para requests bloqueados
  cors_proxy: "https://corsproxy.io/?",
};

// ── CÓDIGOS DE ACCESO ──────────────────────────────────────
const CODIGOS_ACCESO = [
  // PRUEBA GRATIS 7 DÍAS
  { codigo: "CHARLY001", dias: 7,     tipo: "prueba"  },
  { codigo: "CHARLY002", dias: 7,     tipo: "prueba"  },
  { codigo: "CHARLY003", dias: 7,     tipo: "prueba"  },
  { codigo: "CHARLY004", dias: 7,     tipo: "prueba"  },
  { codigo: "CHARLY005", dias: 7,     tipo: "prueba"  },
  { codigo: "AMIGO001",  dias: 7,     tipo: "prueba"  },
  { codigo: "AMIGO002",  dias: 7,     tipo: "prueba"  },
  { codigo: "AMIGO003",  dias: 7,     tipo: "prueba"  },
  { codigo: "PRUEBA001", dias: 7,     tipo: "prueba"  },
  { codigo: "GRATIS01",  dias: 7,     tipo: "prueba"  },
  { codigo: "GRATIS02",  dias: 7,     tipo: "prueba"  },
  { codigo: "BOLIVIA01", dias: 7,     tipo: "prueba"  },
  { codigo: "STREAM001", dias: 7,     tipo: "prueba"  },
  // VIP 30 DÍAS — 5 Bs
  { codigo: "VIP2026-A", dias: 30,    tipo: "premium" },
  { codigo: "VIP2026-B", dias: 30,    tipo: "premium" },
  { codigo: "VIP2026-C", dias: 30,    tipo: "premium" },
  { codigo: "VIP2026-D", dias: 30,    tipo: "premium" },
  { codigo: "VIP2026-E", dias: 30,    tipo: "premium" },
  { codigo: "VIP2026-F", dias: 30,    tipo: "premium" },
  { codigo: "VIP2026-G", dias: 30,    tipo: "premium" },
  { codigo: "VIP2026-H", dias: 30,    tipo: "premium" },
  { codigo: "VIP2026-I", dias: 30,    tipo: "premium" },
  { codigo: "VIP2026-J", dias: 30,    tipo: "premium" },
  // ADMIN
  { codigo: "CHARLY_ADMIN_2026", dias: 36500, tipo: "admin" },
];

// ── IDs de ANIME en Jikan/MyAnimeList ─────────────────────
// Estos son los animes populares con audio en español
const ANIME_IDS_JIKAN = [
  { mal_id: 20,    titulo_es: "Naruto",                        audio: "Español Latino",    gogo_id: "naruto" },
  { mal_id: 1735,  titulo_es: "Naruto Shippuden",              audio: "Español Latino",    gogo_id: "naruto-shippuden" },
  { mal_id: 507,   titulo_es: "Dragon Ball Z",                  audio: "Español Latino",    gogo_id: "dragon-ball-z" },
  { mal_id: 30694, titulo_es: "Dragon Ball Super",              audio: "Español Latino",    gogo_id: "dragon-ball-super" },
  { mal_id: 47778, titulo_es: "Demon Slayer: Arc Final",        audio: "Español Latino",    gogo_id: "kimetsu-no-yaiba-mugen-ressha-hen" },
  { mal_id: 269,   titulo_es: "Bleach",                         audio: "Español Latino",    gogo_id: "bleach" },
  { mal_id: 21,    titulo_es: "One Piece",                      audio: "Español Latino",    gogo_id: "one-piece" },
  { mal_id: 16498, titulo_es: "Attack on Titan",                audio: "Español Latino",    gogo_id: "shingeki-no-kyojin" },
  { mal_id: 40748, titulo_es: "Jujutsu Kaisen",                 audio: "Español Latino",    gogo_id: "jujutsu-kaisen" },
  { mal_id: 38000, titulo_es: "Sword Art Online: Alicization",  audio: "Español Latino",    gogo_id: "sword-art-online-alicization" },
  { mal_id: 38524, titulo_es: "Vinland Saga",                   audio: "Subtítulos Español", gogo_id: "vinland-saga" },
  { mal_id: 52991, titulo_es: "Oshi no Ko",                     audio: "Subtítulos Español", gogo_id: "oshi-no-ko" },
  { mal_id: 44511, titulo_es: "Chainsaw Man",                   audio: "Español Latino",    gogo_id: "chainsaw-man" },
  { mal_id: 41467, titulo_es: "Tokyo Revengers",                audio: "Español Latino",    gogo_id: "tokyo-revengers" },
  { mal_id: 43608, titulo_es: "Blue Lock",                      audio: "Subtítulos Español", gogo_id: "blue-lock" },
];

// ── IDs de DORAMAS en TMDB ─────────────────────────────────
const DORAMAS_TMDB_IDS = [
  { tmdb_id: 92685,  titulo_es: "Love Between Fairy and Devil"  },
  { tmdb_id: 111874, titulo_es: "Till the End of the Moon"       },
  { tmdb_id: 60574,  titulo_es: "Nirvana in Fire"                },
  { tmdb_id: 107688, titulo_es: "The Longest Promise"            },
  { tmdb_id: 117445, titulo_es: "Hidden Love"                    },
  { tmdb_id: 125928, titulo_es: "Ancient Love Poetry"            },
  { tmdb_id: 95396,  titulo_es: "The Story of Ming Lan"          },
  { tmdb_id: 96677,  titulo_es: "Ashes of Love"                  },
];

// ── PELÍCULAS TMDB IDs ─────────────────────────────────────
const PELICULAS_TMDB_IDS = [
  { tmdb_id: 372058,  titulo_es: "Your Name (Kimi no Na Wa)"  },
  { tmdb_id: 129,     titulo_es: "Spirited Away"               },
  { tmdb_id: 315162,  titulo_es: "Demon Slayer: Mugen Train"   },
  { tmdb_id: 502356,  titulo_es: "Dragon Ball Super: Broly"    },
  { tmdb_id: 128,     titulo_es: "El Viaje de Chihiro"         },
  { tmdb_id: 378064,  titulo_es: "A Silent Voice"              },
  { tmdb_id: 431692,  titulo_es: "Rurouni Kenshin"             },
  { tmdb_id: 213121,  titulo_es: "Dragon Ball Z: Battle of Gods"},
];

// ── CONTENIDO ESPECIAL (no en APIs externas) ───────────────
const ESPECIAL_DATA = {
  dormir: [
    {
      id: "sleep001",
      titulo: "Lluvia Suave para Dormir — 8 Horas",
      tipo: "dormir",
      generos: ["Relajación", "ASMR", "Dormir"],
      audio: "Sonido Ambiental",
      año: 2024,
      estado: "Disponible",
      rating: 9.8,
      sinopsis: "Sonidos naturales de lluvia suave y constante para ayudarte a conciliar el sueño profundo. 8 horas continuas sin interrupciones.",
      poster: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1280&h=500&fit=crop&q=80",
      servidores: [
        { nombre: "YT — Lluvia 8h", url: "https://www.youtube.com/embed/mPZkdNFkNps?autoplay=1", tipo: "iframe" },
        { nombre: "YT — Lluvia+Truenos", url: "https://www.youtube.com/embed/q76bMs-NwRk?autoplay=1", tipo: "iframe" },
      ]
    },
    {
      id: "sleep002",
      titulo: "Bosque Tranquilo — Sonidos Nocturnos",
      tipo: "dormir",
      generos: ["Naturaleza", "Relajación", "Dormir"],
      audio: "Sonido Ambiental",
      año: 2024,
      estado: "Disponible",
      rating: 9.5,
      sinopsis: "Sumérgete en los sonidos de un bosque nocturno. Grillos, viento entre los árboles y agua corriente para tu descanso total.",
      poster: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1280&h=500&fit=crop&q=80",
      servidores: [
        { nombre: "YT — Bosque Nocturno", url: "https://www.youtube.com/embed/xNN7iTA57jM?autoplay=1", tipo: "iframe" },
        { nombre: "YT — Lluvia Bosque", url: "https://www.youtube.com/embed/eKFTSSKCzWA?autoplay=1", tipo: "iframe" },
      ]
    },
    {
      id: "sleep003",
      titulo: "Música Relajante para Dormir Profundo",
      tipo: "dormir",
      generos: ["Música", "Relajación", "Meditación"],
      audio: "Instrumental",
      año: 2024,
      estado: "Disponible",
      rating: 9.6,
      sinopsis: "Música suave con frecuencias binaurales diseñadas para inducir el sueño profundo y el descanso reparador.",
      poster: "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?w=1280&h=500&fit=crop&q=80",
      servidores: [
        { nombre: "YT — Delta Waves", url: "https://www.youtube.com/embed/lE6RYpe9IT0?autoplay=1", tipo: "iframe" },
        { nombre: "YT — Piano Suave", url: "https://www.youtube.com/embed/1ZYbU82GVz4?autoplay=1", tipo: "iframe" },
      ]
    },
    {
      id: "sleep004",
      titulo: "Olas del Mar para Dormir — Playa Infinita",
      tipo: "dormir",
      generos: ["Naturaleza", "ASMR", "Relajación"],
      audio: "Sonido Ambiental",
      año: 2024,
      estado: "Disponible",
      rating: 9.7,
      sinopsis: "El suave vaivén de las olas del océano para llevarte a un sueño profundo y tranquilo. Ideal para reducir el estrés.",
      poster: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1280&h=500&fit=crop&q=80",
      servidores: [
        { nombre: "YT — Olas Mar", url: "https://www.youtube.com/embed/bn9F19Hi1Lk?autoplay=1", tipo: "iframe" },
        { nombre: "YT — Playa Tropical", url: "https://www.youtube.com/embed/V1bFr2SWP1I?autoplay=1", tipo: "iframe" },
      ]
    },
  ],
  superacion: [
    {
      id: "sup001",
      titulo: "Nunca Te Rindas — Discurso que Cambia Vidas",
      tipo: "superacion",
      generos: ["Motivación", "Superación Personal"],
      audio: "Español Latino",
      año: 2024,
      estado: "Disponible",
      rating: 10.0,
      sinopsis: "El discurso motivacional que ha cambiado millones de vidas. Cuando todo parece perdido, recuerda: los campeones no se rinden.",
      poster: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1280&h=500&fit=crop&q=80",
      servidores: [
        { nombre: "YT — Motivación", url: "https://www.youtube.com/embed/tbnzAVRZ9Xc?autoplay=1", tipo: "iframe" },
        { nombre: "YT — Discurso Épico", url: "https://www.youtube.com/embed/V80-gPkpH6M?autoplay=1", tipo: "iframe" },
      ]
    },
    {
      id: "sup002",
      titulo: "El Secreto de los Exitosos — Mentalidad Ganadora",
      tipo: "superacion",
      generos: ["Éxito", "Mentalidad", "Motivación"],
      audio: "Español Latino",
      año: 2024,
      estado: "Disponible",
      rating: 9.8,
      sinopsis: "Descubre los hábitos y la mentalidad de las personas más exitosas del mundo. Tu vida cambia cuando cambia tu mentalidad.",
      poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1280&h=500&fit=crop&q=80",
      servidores: [
        { nombre: "YT — Mentalidad", url: "https://www.youtube.com/embed/lCFMD-SRaMQ?autoplay=1", tipo: "iframe" },
        { nombre: "YT — Hábitos Éxito", url: "https://www.youtube.com/embed/9_R4YSVlECM?autoplay=1", tipo: "iframe" },
      ]
    },
    {
      id: "sup003",
      titulo: "Levántate — Mensaje para los Días Difíciles",
      tipo: "superacion",
      generos: ["Motivación", "Aliento", "Superación"],
      audio: "Español Latino",
      año: 2024,
      estado: "Disponible",
      rating: 9.9,
      sinopsis: "Para esos días donde todo se siente pesado. Este mensaje es para ti: eres más fuerte de lo que crees. Levántate y sigue.",
      poster: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1280&h=500&fit=crop&q=80",
      servidores: [
        { nombre: "YT — Levántate", url: "https://www.youtube.com/embed/7sxpKhIbr0E?autoplay=1", tipo: "iframe" },
        { nombre: "YT — Eres Fuerte", url: "https://www.youtube.com/embed/Wv7b0VJzFiQ?autoplay=1", tipo: "iframe" },
      ]
    },
    {
      id: "sup004",
      titulo: "Frases de Kobe Bryant — La Mentalidad Mamba",
      tipo: "superacion",
      generos: ["Motivación", "Deportes", "Éxito"],
      audio: "Español Latino",
      año: 2024,
      estado: "Disponible",
      rating: 10.0,
      sinopsis: "Las frases más poderosas de Kobe Bryant que te harán ver la vida diferente. La Mentalidad Mamba: sin excusas, solo resultados.",
      poster: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1280&h=500&fit=crop&q=80",
      servidores: [
        { nombre: "YT — Mamba Mentality", url: "https://www.youtube.com/embed/VSceuiPBpxY?autoplay=1", tipo: "iframe" },
        { nombre: "YT — Frases Kobe", url: "https://www.youtube.com/embed/zHMlmLYjf8o?autoplay=1", tipo: "iframe" },
      ]
    },
    {
      id: "sup005",
      titulo: "Tu Dolor Tiene un Propósito — Historia de Resiliencia",
      tipo: "superacion",
      generos: ["Resiliencia", "Esperanza", "Motivación"],
      audio: "Español Latino",
      año: 2024,
      estado: "Disponible",
      rating: 9.7,
      sinopsis: "Una historia de superación real que demostrará que todo lo que has vivido tiene un propósito mayor. Tu historia no ha terminado.",
      poster: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1280&h=500&fit=crop&q=80",
      servidores: [
        { nombre: "YT — Resiliencia", url: "https://www.youtube.com/embed/NKEhdsnKKHs?autoplay=1", tipo: "iframe" },
        { nombre: "YT — Tu Propósito", url: "https://www.youtube.com/embed/v3G_gFb7i5E?autoplay=1", tipo: "iframe" },
      ]
    },
  ],
};

// ── TIKTOK TRENDING ───────────────────────────────────────
// Contenido viral en TikTok con etiqueta especial
const TIKTOK_TRENDING = [
  {
    id: "tt001", titulo: "Solo Leveling",
    tipo: "anime", gogo_id: "solo-leveling-2024",
    tiktok_tag: "#SoloLeveling", views: "2.1B",
    poster: "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
    banner: "https://image.tmdb.org/t/p/original/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
    sinopsis: "Sung Jin-Woo, el cazador más débil, gana poderes ilimitados y se convierte en el más poderoso. El anime del momento en TikTok.",
    rating: 9.2, año: 2024, estado: "En Emisión", audio: "Subtítulos Español",
    generos: ["Acción","Fantasía","Shounen"], episodios: [],
    servidores: []
  },
  {
    id: "tt002", titulo: "Jujutsu Kaisen — Shibuya",
    tipo: "anime", gogo_id: "jujutsu-kaisen-2nd-season",
    tiktok_tag: "#JJK", views: "5.3B",
    poster: "https://image.tmdb.org/t/p/w500/mMnvBDm3tZzDGrEJ8fKSHmWpxhK.jpg",
    banner: "https://image.tmdb.org/t/p/original/mMnvBDm3tZzDGrEJ8fKSHmWpxhK.jpg",
    sinopsis: "El arco más oscuro de JJK. La batalla de Shibuya que sacudió TikTok con millones de reacciones.",
    rating: 9.5, año: 2023, estado: "Completo", audio: "Español Latino",
    generos: ["Acción","Sobrenatural","Horror"], episodios: [],
    servidores: []
  },
  {
    id: "tt003", titulo: "Demon Slayer — Arco Final",
    tipo: "anime", gogo_id: "kimetsu-no-yaiba-hashira-geiko-hen",
    tiktok_tag: "#DemonSlayer", views: "8.7B",
    poster: "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    banner: "https://image.tmdb.org/t/p/original/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    sinopsis: "El entrenamiento de los Pilares. El arco más épico de Demon Slayer que arrasó en todas las redes sociales.",
    rating: 9.4, año: 2024, estado: "En Emisión", audio: "Español Latino",
    generos: ["Acción","Aventura","Shounen"], episodios: [],
    servidores: []
  },
  {
    id: "tt004", titulo: "Crash Landing on You",
    tipo: "dorama", tmdb_id: 94796,
    tiktok_tag: "#CLOY", views: "12.4B",
    poster: "https://image.tmdb.org/t/p/w500/kTfcDFRFJxFrHGYoOJFaSDyQfqV.jpg",
    banner: "https://image.tmdb.org/t/p/original/kTfcDFRFJxFrHGYoOJFaSDyQfqV.jpg",
    sinopsis: "Una heredera surcoreana aterriza accidentalmente en Corea del Norte y se enamora de un oficial del ejército. El dorama más viral de la historia.",
    rating: 9.1, año: 2019, estado: "Completo", audio: "Subtítulos Español",
    generos: ["Romance","Drama","Acción"], episodios: [],
    servidores: [
      { nombre: "YT — Resumen Ep1", url: "https://www.youtube.com/embed/9KjyCWzLX2k?autoplay=1", tipo: "iframe" }
    ]
  },
  {
    id: "tt005", titulo: "Business Proposal",
    tipo: "dorama", tmdb_id: 119774,
    tiktok_tag: "#BusinessProposal", views: "6.2B",
    poster: "https://image.tmdb.org/t/p/w500/5Kh2FkSHCFkZjEu4vXsK5KJfzFo.jpg",
    banner: "https://image.tmdb.org/t/p/original/5Kh2FkSHCFkZjEu4vXsK5KJfzFo.jpg",
    sinopsis: "Una mujer asiste a una cita a ciegas para rechazar a un candidato... y descubre que es su jefe. El dorama más divertido de TikTok.",
    rating: 8.9, año: 2022, estado: "Completo", audio: "Subtítulos Español",
    generos: ["Comedia","Romance","Drama"], episodios: [],
    servidores: [
      { nombre: "YT — Resumen Ep1", url: "https://www.youtube.com/embed/KqOJkPFb-2A?autoplay=1", tipo: "iframe" }
    ]
  },
  {
    id: "tt006", titulo: "Extraordinary Attorney Woo",
    tipo: "dorama", tmdb_id: 121095,
    tiktok_tag: "#AttorneyWoo", views: "9.1B",
    poster: "https://image.tmdb.org/t/p/w500/gKRphPJFqcFw0yOItSqIDYs7LDT.jpg",
    banner: "https://image.tmdb.org/t/p/original/gKRphPJFqcFw0yOItSqIDYs7LDT.jpg",
    sinopsis: "Una brillante abogada con autismo navega su carrera y el amor. La historia más emotiva que inundó TikTok con lágrimas y risas.",
    rating: 9.0, año: 2022, estado: "Completo", audio: "Subtítulos Español",
    generos: ["Drama","Legal","Romance"], episodios: [],
    servidores: [
      { nombre: "YT — Resumen Ep1", url: "https://www.youtube.com/embed/o3d8HJK7LNQ?autoplay=1", tipo: "iframe" }
    ]
  },
];

// ── ADMIN / TRACKING CONFIG ───────────────────────────────
const ADMIN_CONFIG = {
  // countapi.xyz — contador de visitas gratuito
  countapi_ns: "charlystream-bo",
  countapi_key: "visits-v2",
  // Stats visibles solo para admin
  totalCodigos: CODIGOS_ACCESO.length,
  codigosPrueba: CODIGOS_ACCESO.filter(c => c.tipo === "prueba").length,
  codigosPremium: CODIGOS_ACCESO.filter(c => c.tipo === "premium").length,
};
