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
const ANIME_IDS_JIKAN = [
  { mal_id: 20,    titulo_es: "Naruto",                             audio: "Español Latino",     gogo_id: "naruto" },
  { mal_id: 1735,  titulo_es: "Naruto Shippuden",                   audio: "Español Latino",     gogo_id: "naruto-shippuden" },
  { mal_id: 507,   titulo_es: "Dragon Ball Z",                      audio: "Español Latino",     gogo_id: "dragon-ball-z" },
  { mal_id: 30694, titulo_es: "Dragon Ball Super",                  audio: "Español Latino",     gogo_id: "dragon-ball-super" },
  { mal_id: 47778, titulo_es: "Demon Slayer: Arco del Tren",        audio: "Español Latino",     gogo_id: "kimetsu-no-yaiba-mugen-ressha-hen" },
  { mal_id: 269,   titulo_es: "Bleach",                             audio: "Español Latino",     gogo_id: "bleach" },
  { mal_id: 21,    titulo_es: "One Piece",                          audio: "Español Latino",     gogo_id: "one-piece" },
  { mal_id: 16498, titulo_es: "Attack on Titan",                    audio: "Español Latino",     gogo_id: "shingeki-no-kyojin" },
  { mal_id: 40748, titulo_es: "Jujutsu Kaisen",                     audio: "Español Latino",     gogo_id: "jujutsu-kaisen" },
  { mal_id: 38000, titulo_es: "Sword Art Online: Alicization",      audio: "Español Latino",     gogo_id: "sword-art-online-alicization" },
  { mal_id: 38524, titulo_es: "Vinland Saga",                       audio: "Subtítulos Español", gogo_id: "vinland-saga" },
  { mal_id: 52991, titulo_es: "Oshi no Ko",                         audio: "Subtítulos Español", gogo_id: "oshi-no-ko" },
  { mal_id: 44511, titulo_es: "Chainsaw Man",                       audio: "Español Latino",     gogo_id: "chainsaw-man" },
  { mal_id: 41467, titulo_es: "Tokyo Revengers",                    audio: "Español Latino",     gogo_id: "tokyo-revengers" },
  { mal_id: 43608, titulo_es: "Blue Lock",                          audio: "Subtítulos Español", gogo_id: "blue-lock" },
  { mal_id: 5114,  titulo_es: "Fullmetal Alchemist Brotherhood",    audio: "Español Latino",     gogo_id: "fullmetal-alchemist-brotherhood" },
  { mal_id: 31964, titulo_es: "My Hero Academia",                   audio: "Español Latino",     gogo_id: "boku-no-hero-academia" },
  { mal_id: 11061, titulo_es: "Hunter x Hunter (2011)",             audio: "Español Latino",     gogo_id: "hunter-x-hunter-2011" },
  { mal_id: 235,   titulo_es: "Detective Conan",                    audio: "Español Latino",     gogo_id: "detective-conan" },
  { mal_id: 2904,  titulo_es: "Code Geass",                         audio: "Español Latino",     gogo_id: "code-geass-hangyaku-no-lelouch" },
  { mal_id: 11757, titulo_es: "Sword Art Online",                   audio: "Español Latino",     gogo_id: "sword-art-online" },
  { mal_id: 22319, titulo_es: "Tokyo Ghoul",                        audio: "Español Latino",     gogo_id: "tokyo-ghoul" },
  { mal_id: 33486, titulo_es: "Black Clover",                       audio: "Español Latino",     gogo_id: "black-clover" },
  { mal_id: 54492, titulo_es: "Frieren: Más allá del fin",          audio: "Subtítulos Español", gogo_id: "sousou-no-frieren" },
  { mal_id: 55701, titulo_es: "Dandadan",                           audio: "Subtítulos Español", gogo_id: "dandadan" },
  { mal_id: 48583, titulo_es: "Mushoku Tensei",                     audio: "Subtítulos Español", gogo_id: "mushoku-tensei-isekai-ittara-honki-dasu" },
  { mal_id: 42422, titulo_es: "The Rising of the Shield Hero",      audio: "Español Latino",     gogo_id: "tate-no-yuusha-no-nariagari" },
  { mal_id: 48080, titulo_es: "Jujutsu Kaisen 0",                   audio: "Español Latino",     gogo_id: "jujutsu-kaisen-0" },
  { mal_id: 39535, titulo_es: "Overlord",                           audio: "Español Latino",     gogo_id: "overlord" },
  { mal_id: 37521, titulo_es: "Goblin Slayer",                      audio: "Español Latino",     gogo_id: "goblin-slayer" },
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

// ── DEPORTES EN VIVO (Fútbol / Mundial 2026) ──────────────
const DEPORTES_DATA = [
  { id:"dep001", titulo:"⚽ Mundial 2026 — Clasificatorias CONMEBOL", tipo:"deporte", subtipo:"futbol",
    generos:["Fútbol","Mundial","CONMEBOL"], audio:"Español Latino", año:2026, estado:"En Vivo", rating:10.0,
    sinopsis:"Las eliminatorias sudamericanas para el Mundial 2026 en USA, Canadá y México. Bolivia y toda CONMEBOL en vivo.",
    poster:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=600&fit=crop&q=80",
    banner:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1280&h=500&fit=crop&q=80",
    episodios:[], servidores:[
      {nombre:"FIFA TV",url:"https://www.youtube.com/embed/videoseries?list=PLet-WBgbT9AaSfMpfJEVxNKzPJJMc3qy6&autoplay=1",tipo:"iframe"},
      {nombre:"CONMEBOL",url:"https://www.youtube.com/embed/videoseries?list=PLet-WBgbT9AA3pFKNNj__BRUqjvvM5hCR&autoplay=1",tipo:"iframe"}
    ]},
  { id:"dep002", titulo:"🏆 UEFA Champions League 2025-26", tipo:"deporte", subtipo:"futbol",
    generos:["Fútbol","Champions","Europa"], audio:"Español Latino", año:2026, estado:"En Emisión", rating:9.8,
    sinopsis:"Real Madrid, Barcelona, Liverpool y más. Los mejores goles y resúmenes de la Champions League.",
    poster:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop&q=80",
    banner:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1280&h=500&fit=crop&q=80",
    episodios:[], servidores:[
      {nombre:"UEFA Highlights",url:"https://www.youtube.com/embed/videoseries?list=PL7_YADPlNnkbQpSfKB5MRMgLAIIyUBVrS&autoplay=1",tipo:"iframe"}
    ]},
  { id:"dep003", titulo:"🇧🇴 Liga Profesional Bolivia 2026", tipo:"deporte", subtipo:"futbol",
    generos:["Fútbol","Bolivia","Local"], audio:"Español Latino", año:2026, estado:"En Emisión", rating:9.0,
    sinopsis:"The Strongest, Bolívar, Oriente Petrolero. El fútbol boliviano en su máxima expresión.",
    poster:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=600&fit=crop&q=80",
    banner:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1280&h=500&fit=crop&q=80",
    episodios:[], servidores:[
      {nombre:"Deportes BO",url:"https://www.youtube.com/embed/live_stream?channel=UCXmUaFoRMf0OD3-9PnTCE1w&autoplay=1",tipo:"iframe"}
    ]},
  { id:"dep004", titulo:"⚡ Copa Libertadores 2026", tipo:"deporte", subtipo:"futbol",
    generos:["Fútbol","Libertadores","CONMEBOL"], audio:"Español Latino", año:2026, estado:"En Emisión", rating:9.5,
    sinopsis:"El torneo más importante de América del Sur. Equipos históricos compiten por la gloria continental.",
    poster:"https://images.unsplash.com/photo-1551958219-acbc68bab90e?w=400&h=600&fit=crop&q=80",
    banner:"https://images.unsplash.com/photo-1551958219-acbc68bab90e?w=1280&h=500&fit=crop&q=80",
    episodios:[], servidores:[
      {nombre:"Libertadores TV",url:"https://www.youtube.com/embed/videoseries?list=PLC4I5FqsGHb0VjhZVjFkT0tnelOWiRraN&autoplay=1",tipo:"iframe"}
    ]},
  { id:"dep005", titulo:"⭐ Premier League — Goles 2025-26", tipo:"deporte", subtipo:"futbol",
    generos:["Fútbol","Premier","Inglaterra"], audio:"Español Latino", año:2026, estado:"En Emisión", rating:9.3,
    sinopsis:"Manchester City, Arsenal, Liverpool. Los mejores momentos de la liga más emocionante del mundo.",
    poster:"https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=600&fit=crop&q=80",
    banner:"https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1280&h=500&fit=crop&q=80",
    episodios:[], servidores:[
      {nombre:"PL Highlights",url:"https://www.youtube.com/embed/videoseries?list=PL4SZgQl2BxW7f9IXqMNfsPo6Tyi_jqOJv&autoplay=1",tipo:"iframe"}
    ]},
  { id:"dep006", titulo:"🇦🇷 Superliga Argentina 2026", tipo:"deporte", subtipo:"futbol",
    generos:["Fútbol","Argentina","River vs Boca"], audio:"Español Latino", año:2026, estado:"En Emisión", rating:9.1,
    sinopsis:"River vs Boca, el Superclásico y toda la pasión del fútbol argentino. El mejor del continente.",
    poster:"https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=600&fit=crop&q=80",
    banner:"https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1280&h=500&fit=crop&q=80",
    episodios:[], servidores:[
      {nombre:"TyC Sports",url:"https://www.youtube.com/embed/videoseries?list=PLPIfMjz58KLrLEZ66jl_4YBjhO5hOkBNI&autoplay=1",tipo:"iframe"}
    ]},
];

// ── PLAYLIST DE MÚSICA LATINA ─────────────────────────────
const MUSICA_PLAYLIST = [
  {id:"mus001",titulo:"Gasolina",artista:"Daddy Yankee",generos:["Reggaeton"],año:2004,duracion:"3:18",yt_id:"G7OotGQvDro",poster:"https://i.ytimg.com/vi/G7OotGQvDro/hqdefault.jpg"},
  {id:"mus002",titulo:"Despacito",artista:"Luis Fonsi ft. Daddy Yankee",generos:["Pop Latino"],año:2017,duracion:"3:48",yt_id:"ktvTqknDobU",poster:"https://i.ytimg.com/vi/ktvTqknDobU/hqdefault.jpg"},
  {id:"mus003",titulo:"Mi Gente",artista:"J Balvin & Willy William",generos:["Reggaeton"],año:2017,duracion:"3:13",yt_id:"wnJ6LuUFpMo",poster:"https://i.ytimg.com/vi/wnJ6LuUFpMo/hqdefault.jpg"},
  {id:"mus004",titulo:"Tusa",artista:"Karol G & Nicki Minaj",generos:["Reggaeton"],año:2019,duracion:"3:22",yt_id:"yNu3DobzGLk",poster:"https://i.ytimg.com/vi/yNu3DobzGLk/hqdefault.jpg"},
  {id:"mus005",titulo:"Dakiti",artista:"Bad Bunny & Jhay Cortez",generos:["Trap Latino"],año:2020,duracion:"3:40",yt_id:"KpZcjN8uEP0",poster:"https://i.ytimg.com/vi/KpZcjN8uEP0/hqdefault.jpg"},
  {id:"mus006",titulo:"Pepas",artista:"Farruko",generos:["Reggaeton"],año:2021,duracion:"3:30",yt_id:"Ks2SDzxuniE",poster:"https://i.ytimg.com/vi/Ks2SDzxuniE/hqdefault.jpg"},
  {id:"mus007",titulo:"Hawái",artista:"Maluma",generos:["Pop Latino"],año:2020,duracion:"3:43",yt_id:"pF27z24kLqY",poster:"https://i.ytimg.com/vi/pF27z24kLqY/hqdefault.jpg"},
  {id:"mus008",titulo:"Con Calma",artista:"Daddy Yankee & Snow",generos:["Reggaeton"],año:2019,duracion:"3:11",yt_id:"F-7naSADCiA",poster:"https://i.ytimg.com/vi/F-7naSADCiA/hqdefault.jpg"},
  {id:"mus009",titulo:"Bichota",artista:"Karol G",generos:["Reggaeton"],año:2020,duracion:"3:04",yt_id:"nXMQGEJRdNk",poster:"https://i.ytimg.com/vi/nXMQGEJRdNk/hqdefault.jpg"},
  {id:"mus010",titulo:"El Efecto",artista:"Rauw Alejandro",generos:["R&B Latino"],año:2022,duracion:"4:14",yt_id:"ExcNcdTGT0A",poster:"https://i.ytimg.com/vi/ExcNcdTGT0A/hqdefault.jpg"},
  // Más música — Bachata / Salsa / Cumbia / Pop
  {id:"mus011",titulo:"Propuesta Indecente",artista:"Romeo Santos",generos:["Bachata"],año:2013,duracion:"4:16",yt_id:"t60Archiving_MISSING",poster:"https://i.ytimg.com/vi/2PsoBNi1LpA/hqdefault.jpg",yt_id:"2PsoBNi1LpA"},
  {id:"mus012",titulo:"Vivir Mi Vida",artista:"Marc Anthony",generos:["Salsa"],año:2013,duracion:"4:05",yt_id:"YXnjy5YlDwk",poster:"https://i.ytimg.com/vi/YXnjy5YlDwk/hqdefault.jpg"},
  {id:"mus013",titulo:"La Bicicleta",artista:"Carlos Vives & Shakira",generos:["Vallenato"],año:2016,duracion:"3:24",yt_id:"kQ4PZDKaGAA",poster:"https://i.ytimg.com/vi/kQ4PZDKaGAA/hqdefault.jpg"},
  {id:"mus014",titulo:"Chantaje",artista:"Shakira ft. Maluma",generos:["Pop Latino"],año:2016,duracion:"3:23",yt_id:"Uh2TaHZDSM0",poster:"https://i.ytimg.com/vi/Uh2TaHZDSM0/hqdefault.jpg"},
  {id:"mus015",titulo:"Obsesión",artista:"Aventura",generos:["Bachata"],año:2002,duracion:"3:58",yt_id:"_o_B7NCYMKM",poster:"https://i.ytimg.com/vi/_o_B7NCYMKM/hqdefault.jpg"},
  {id:"mus016",titulo:"La Mordidita",artista:"Ricky Martin",generos:["Pop Latino"],año:2015,duracion:"3:16",yt_id:"_P3bFSW8cPY",poster:"https://i.ytimg.com/vi/_P3bFSW8cPY/hqdefault.jpg"},
  {id:"mus017",titulo:"Te Boté",artista:"Nio García, Casper, Darell",generos:["Reggaeton"],año:2018,duracion:"4:11",yt_id:"dQFMRLxVvbU",poster:"https://i.ytimg.com/vi/dQFMRLxVvbU/hqdefault.jpg"},
  {id:"mus018",titulo:"Mayores",artista:"Becky G ft. Bad Bunny",generos:["Reggaeton"],año:2017,duracion:"3:32",yt_id:"9sIBCsGBgxo",poster:"https://i.ytimg.com/vi/9sIBCsGBgxo/hqdefault.jpg"},
  {id:"mus019",titulo:"Si Tu Novio Te Deja Sola",artista:"J Balvin & Bad Bunny",generos:["Reggaeton"],año:2019,duracion:"3:03",yt_id:"8-X2N0Y2-l4",poster:"https://i.ytimg.com/vi/8-X2N0Y2-l4/hqdefault.jpg"},
  {id:"mus020",titulo:"Quevedo: Bzrp Music Sessions #52",artista:"Bizarrap & Quevedo",generos:["Latin Pop"],año:2022,duracion:"3:19",yt_id:"tXhlRMgYbds",poster:"https://i.ytimg.com/vi/tXhlRMgYbds/hqdefault.jpg"},
];

// ── TELENOVELAS / FOTONOVELAS ─────────────────────────────
const TELENOVELAS_DATA = [
  { id:"tele001", titulo:"Betty la Fea", tipo:"telenovela",
    generos:["Comedia","Romance","Drama"], audio:"Español Latino", año:1999, estado:"Completo", rating:9.3,
    sinopsis:"Betty, una joven poco agraciada pero muy inteligente, trabaja en una empresa de moda y se enamora de su jefe. La telenovela más vista de la historia.",
    poster:"https://image.tmdb.org/t/p/w500/8rp7yGJXdSq8P6B3mPy1KoZgLzU.jpg",
    banner:"https://image.tmdb.org/t/p/original/8rp7yGJXdSq8P6B3mPy1KoZgLzU.jpg",
    episodios:[], servidores:[{nombre:"Ver Capítulo 1",url:"https://www.youtube.com/embed/2EI8mFKj5Sg?autoplay=1",tipo:"iframe"}]},
  { id:"tele002", titulo:"La Reina del Sur", tipo:"telenovela",
    generos:["Acción","Drama","Crimen"], audio:"Español Latino", año:2011, estado:"Completo", rating:9.0,
    sinopsis:"Teresa Mendoza huye de México tras el asesinato de su novio y construye un imperio del narcotráfico en España. Basada en la novela de Arturo Pérez-Reverte.",
    poster:"https://image.tmdb.org/t/p/w500/5iBNHXsXUvKVBPkAOYB0P2X3nGy.jpg",
    banner:"https://image.tmdb.org/t/p/original/5iBNHXsXUvKVBPkAOYB0P2X3nGy.jpg",
    episodios:[], servidores:[{nombre:"Episodio 1",url:"https://www.youtube.com/embed/Bq5rJpJCbFg?autoplay=1",tipo:"iframe"}]},
  { id:"tele003", titulo:"Pasión de Gavilanes", tipo:"telenovela",
    generos:["Romance","Drama","Acción"], audio:"Español Latino", año:2003, estado:"Completo", rating:9.2,
    sinopsis:"Los hermanos Reyes buscan venganza contra la familia Elizondo, pero se enamoran de sus tres hijas. Un clásico del romance latinoamericano.",
    poster:"https://image.tmdb.org/t/p/w500/qFSqpTGBiqpbjiXNKwTVJX8GKQL.jpg",
    banner:"https://image.tmdb.org/t/p/original/qFSqpTGBiqpbjiXNKwTVJX8GKQL.jpg",
    episodios:[], servidores:[{nombre:"Capítulo 1",url:"https://www.youtube.com/embed/3wKJe5rHVEY?autoplay=1",tipo:"iframe"}]},
  { id:"tele004", titulo:"Rubí", tipo:"telenovela",
    generos:["Drama","Romance","Intriga"], audio:"Español Latino", año:2004, estado:"Completo", rating:8.8,
    sinopsis:"Rubí Pérez es una joven ambiciosa y manipuladora dispuesta a todo para conseguir riqueza y poder. Un clásico de la telenovela mexicana.",
    poster:"https://image.tmdb.org/t/p/w500/8XGtRWDVcY5Ep2hLvLFtGXXGiM4.jpg",
    banner:"https://image.tmdb.org/t/p/original/8XGtRWDVcY5Ep2hLvLFtGXXGiM4.jpg",
    episodios:[], servidores:[{nombre:"Capítulo 1",url:"https://www.youtube.com/embed/xXV3j3nNFNI?autoplay=1",tipo:"iframe"}]},
  { id:"tele005", titulo:"Rosario Tijeras", tipo:"telenovela",
    generos:["Acción","Romance","Crimen"], audio:"Español Latino", año:2010, estado:"Completo", rating:8.7,
    sinopsis:"Rosario, una bella y peligrosa sicaria de Medellín, se debate entre el amor y la violencia en los bajos fondos de Colombia.",
    poster:"https://image.tmdb.org/t/p/w500/tEzuDaFfHVPHdJl1GFKEZ4TlN8r.jpg",
    banner:"https://image.tmdb.org/t/p/original/tEzuDaFfHVPHdJl1GFKEZ4TlN8r.jpg",
    episodios:[], servidores:[{nombre:"Episodio 1",url:"https://www.youtube.com/embed/5Js0PVHQ1v0?autoplay=1",tipo:"iframe"}]},
  { id:"tele006", titulo:"La Rosa de Guadalupe", tipo:"telenovela",
    generos:["Drama","Fe","Familia"], audio:"Español Latino", año:2008, estado:"En Emisión", rating:8.5,
    sinopsis:"Serie de episodios unitarios que narran historias de personas en problemas que reciben la ayuda milagrosa de la Virgen de Guadalupe.",
    poster:"https://image.tmdb.org/t/p/w500/5MkuagpVxNMoOjlWi2KHUCEAimB.jpg",
    banner:"https://image.tmdb.org/t/p/original/5MkuagpVxNMoOjlWi2KHUCEAimB.jpg",
    episodios:[], servidores:[{nombre:"Ver Episodio",url:"https://www.youtube.com/embed/results?search_query=la+rosa+de+guadalupe+capitulo&autoplay=1",tipo:"iframe"}]},
];

// ── DORAMAS CHINOS (CDRAMA) ────────────────────────────────
const CDRAMA_DATA = [
  { id:"cd001", titulo:"The Untamed — El Desencadenado", tipo:"dorama",
    generos:["Fantasía","Acción","BL","China"], audio:"Subtítulos Español", año:2019, estado:"Completo", rating:9.5,
    sinopsis:"Dos cultivadores de artes marciales se unen para resolver misterios del mundo espiritual. El dorama chino más viral del mundo con 8 mil millones de visitas.",
    poster:"https://image.tmdb.org/t/p/w500/fOhHFiHqNvHXjxiHSBJg3qlFiN6.jpg",
    banner:"https://image.tmdb.org/t/p/original/fOhHFiHqNvHXjxiHSBJg3qlFiN6.jpg",
    episodios:[], servidores:[{nombre:"Episodio 1 Sub Esp",url:"https://www.youtube.com/embed/oqHvq6yXKsI?autoplay=1",tipo:"iframe"}]},
  { id:"cd002", titulo:"Eternal Love — Amor Eterno", tipo:"dorama",
    generos:["Romance","Fantasía","China"], audio:"Subtítulos Español", año:2017, estado:"Completo", rating:9.2,
    sinopsis:"Una diosa del agua paga su deuda de amor a un dios celestial a través de tres vidas. El romance fantástico más épico de China.",
    poster:"https://image.tmdb.org/t/p/w500/5eDRjMmRmcHlQQ7MYZM4fmR8Uh0.jpg",
    banner:"https://image.tmdb.org/t/p/original/5eDRjMmRmcHlQQ7MYZM4fmR8Uh0.jpg",
    episodios:[], servidores:[{nombre:"Episodio 1 Sub Esp",url:"https://www.youtube.com/embed/FiRa6FhIE_s?autoplay=1",tipo:"iframe"}]},
  { id:"cd003", titulo:"Love O2O — Amor Virtual", tipo:"dorama",
    generos:["Romance","Comedia","China"], audio:"Subtítulos Español", año:2016, estado:"Completo", rating:8.9,
    sinopsis:"Una estudiante universitaria y un genio de los videojuegos se conocen en un MMO y su historia virtual se vuelve realidad.",
    poster:"https://image.tmdb.org/t/p/w500/7HJYXVxP2H5oVKmhCBEIRYAR4VP.jpg",
    banner:"https://image.tmdb.org/t/p/original/7HJYXVxP2H5oVKmhCBEIRYAR4VP.jpg",
    episodios:[], servidores:[{nombre:"Episodio 1",url:"https://www.youtube.com/embed/cR_Lxkj0lCE?autoplay=1",tipo:"iframe"}]},
  { id:"cd004", titulo:"Nirvana in Fire — El Fuego de la Nirvana", tipo:"dorama",
    generos:["Histórico","Político","Acción","China"], audio:"Subtítulos Español", año:2015, estado:"Completo", rating:9.6,
    sinopsis:"Un genio estratega regresa de entre los muertos para restaurar el honor de su familia y tomar venganza del emperador que los traicionó.",
    poster:"https://image.tmdb.org/t/p/w500/8nZJuMhNkmH0k14VNLiQVV5Mldb.jpg",
    banner:"https://image.tmdb.org/t/p/original/8nZJuMhNkmH0k14VNLiQVV5Mldb.jpg",
    episodios:[], servidores:[{nombre:"Episodio 1",url:"https://www.youtube.com/embed/results?search_query=nirvana+in+fire+sub+español&autoplay=1",tipo:"iframe"}]},
  { id:"cd005", titulo:"My Demon — Mi Demonio", tipo:"dorama",
    generos:["Romance","Sobrenatural","China/Korea"], audio:"Subtítulos Español", año:2023, estado:"Completo", rating:9.0,
    sinopsis:"Una heredera arrogante y un demonio sin poderes deben cooperar para sobrevivir. Un romance sobrenatural que conquistó Asia.",
    poster:"https://image.tmdb.org/t/p/w500/gKRphPJFqcFw0yOItSqIDYs7LDT.jpg",
    banner:"https://image.tmdb.org/t/p/original/gKRphPJFqcFw0yOItSqIDYs7LDT.jpg",
    episodios:[], servidores:[{nombre:"Episodio 1",url:"https://www.youtube.com/embed/o3d8HJK7LNQ?autoplay=1",tipo:"iframe"}]},
  { id:"cd006", titulo:"The Story of Ming Lan", tipo:"dorama",
    generos:["Histórico","Romance","Drama","China"], audio:"Subtítulos Español", año:2018, estado:"Completo", rating:9.1,
    sinopsis:"Ming Lan, la hija olvidada de un funcionario chino, usa su inteligencia oculta para sobrevivir en la sociedad imperial y encontrar el amor.",
    poster:"https://image.tmdb.org/t/p/w500/8rp7yGJXdSq8P6B3mPy1KoZgLzU.jpg",
    banner:"https://image.tmdb.org/t/p/original/8rp7yGJXdSq8P6B3mPy1KoZgLzU.jpg",
    episodios:[], servidores:[{nombre:"Ep 1 Sub Esp",url:"https://www.youtube.com/embed/results?search_query=story+of+ming+lan+sub+español&autoplay=1",tipo:"iframe"}]},
  { id:"cd007", titulo:"Ancient Love Poetry", tipo:"dorama",
    generos:["Fantasía","Romance","Histórico","China"], audio:"Subtítulos Español", año:2021, estado:"Completo", rating:8.8,
    sinopsis:"Una diosa antigua viaja a través del tiempo y del amor para encontrar a su alma gemela en un mundo de dioses inmortales y magia.",
    poster:"https://image.tmdb.org/t/p/w500/5eDRjMmRmcHlQQ7MYZM4fmR8Uh0.jpg",
    banner:"https://image.tmdb.org/t/p/original/5eDRjMmRmcHlQQ7MYZM4fmR8Uh0.jpg",
    episodios:[], servidores:[{nombre:"Ep 1 Sub Esp",url:"https://www.youtube.com/embed/results?search_query=ancient+love+poetry+sub+español&autoplay=1",tipo:"iframe"}]},
  { id:"cd008", titulo:"Ashes of Love", tipo:"dorama",
    generos:["Fantasía","Romance","Inmortal","China"], audio:"Subtítulos Español", año:2018, estado:"Completo", rating:9.0,
    sinopsis:"La hija de la diosa de las flores se enamora del inmortal más poderoso. Un romance prohibido entre cielo e infierno.",
    poster:"https://image.tmdb.org/t/p/w500/7HJYXVxP2H5oVKmhCBEIRYAR4VP.jpg",
    banner:"https://image.tmdb.org/t/p/original/7HJYXVxP2H5oVKmhCBEIRYAR4VP.jpg",
    episodios:[], servidores:[{nombre:"Ep 1 Sub Esp",url:"https://www.youtube.com/embed/results?search_query=ashes+of+love+sub+español&autoplay=1",tipo:"iframe"}]},
  { id:"cd009", titulo:"The Longest Promise", tipo:"dorama",
    generos:["Fantasía","Romance","Wuxia","China"], audio:"Subtítulos Español", año:2023, estado:"Completo", rating:8.9,
    sinopsis:"Un maestro inmortal y su discípula quedan unidos por un pacto eterno que desafía el destino y los cielos.",
    poster:"https://image.tmdb.org/t/p/w500/fOhHFiHqNvHXjxiHSBJg3qlFiN6.jpg",
    banner:"https://image.tmdb.org/t/p/original/fOhHFiHqNvHXjxiHSBJg3qlFiN6.jpg",
    episodios:[], servidores:[{nombre:"Ep 1 Sub Esp",url:"https://www.youtube.com/embed/results?search_query=the+longest+promise+sub+español&autoplay=1",tipo:"iframe"}]},
  { id:"cd010", titulo:"Hidden Love", tipo:"dorama",
    generos:["Romance","Juventud","China"], audio:"Subtítulos Español", año:2023, estado:"Completo", rating:9.2,
    sinopsis:"Sangzhi ha amado en secreto al hermano mayor de su mejor amigo durante años. Cuando vuelven a encontrarse, el amor oculto sale a la luz.",
    poster:"https://image.tmdb.org/t/p/w500/8nZJuMhNkmH0k14VNLiQVV5Mldb.jpg",
    banner:"https://image.tmdb.org/t/p/original/8nZJuMhNkmH0k14VNLiQVV5Mldb.jpg",
    episodios:[], servidores:[{nombre:"Ep 1 Sub Esp",url:"https://www.youtube.com/embed/results?search_query=hidden+love+cdrama+sub+español&autoplay=1",tipo:"iframe"}]},
  { id:"cd011", titulo:"Till the End of the Moon", tipo:"dorama",
    generos:["Fantasía","Romance","Oscuro","China"], audio:"Subtítulos Español", año:2023, estado:"Completo", rating:9.3,
    sinopsis:"Una mujer viaja al pasado para detener al futuro dios del mal, pero termina enamorándose de él antes de que se corrompa.",
    poster:"https://image.tmdb.org/t/p/w500/9CQTi9fXb6hC9wX6qmG7aaCcFUV.jpg",
    banner:"https://image.tmdb.org/t/p/original/9CQTi9fXb6hC9wX6qmG7aaCcFUV.jpg",
    episodios:[], servidores:[{nombre:"Ep 1 Sub Esp",url:"https://www.youtube.com/embed/results?search_query=till+the+end+of+the+moon+sub+español&autoplay=1",tipo:"iframe"}]},
  { id:"cd012", titulo:"Love Between Fairy and Devil", tipo:"dorama",
    generos:["Fantasía","Romance","Comedia","China"], audio:"Subtítulos Español", año:2022, estado:"Completo", rating:9.1,
    sinopsis:"Una pequeña hada intercambia cuerpo con el rey demonio más peligroso. Un romance cómico y épico que se volvió viral en Asia.",
    poster:"https://image.tmdb.org/t/p/w500/2EewmxXe72ogD0EaWM8gqa0BQMS.jpg",
    banner:"https://image.tmdb.org/t/p/original/2EewmxXe72ogD0EaWM8gqa0BQMS.jpg",
    episodios:[], servidores:[{nombre:"Ep 1 Sub Esp",url:"https://www.youtube.com/embed/results?search_query=love+between+fairy+and+devil+sub+español&autoplay=1",tipo:"iframe"}]},
];

// ── ANIME EN ESPAÑOL LATINO ───────────────────────────────
const ANIME_ESP_DATA = [
  { id:"aesp001", titulo:"Dragon Ball Z — Español Latino", tipo:"anime", gogo_id:"dragon-ball-z",
    generos:["Acción","Aventura","Clásico"], audio:"Español Latino", año:1989, estado:"Completo", rating:9.8,
    sinopsis:"Goku y sus amigos defienden la Tierra de villanos cada vez más poderosos. El anime más icónico doblado al español latino.",
    poster:"https://image.tmdb.org/t/p/w500/oKKs3Ks31RblUaQUbORPpKQ1RVW.jpg",
    banner:"https://image.tmdb.org/t/p/original/oKKs3Ks31RblUaQUbORPpKQ1RVW.jpg",
    episodios:[], servidores:[{nombre:"Latino HD",url:"https://www.youtube.com/embed/results?search_query=dragon+ball+z+capitulo+1+español+latino&autoplay=1",tipo:"iframe"}]},
  { id:"aesp002", titulo:"Naruto — Español Latino Completo", tipo:"anime", gogo_id:"naruto",
    generos:["Acción","Aventura","Shounen"], audio:"Español Latino", año:2002, estado:"Completo", rating:9.5,
    sinopsis:"Naruto Uzumaki sueña con convertirse en el Hokage de su aldea. 220 episodios doblados al español latino de la mejor calidad.",
    poster:"https://image.tmdb.org/t/p/w500/xppeysfvDKVx775MFuH8Z9ex24r.jpg",
    banner:"https://image.tmdb.org/t/p/original/xppeysfvDKVx775MFuH8Z9ex24r.jpg",
    episodios:[], servidores:[{nombre:"Latino Cap 1",url:"https://www.youtube.com/embed/results?search_query=naruto+capitulo+1+español+latino&autoplay=1",tipo:"iframe"}]},
  { id:"aesp003", titulo:"Caballeros del Zodiaco — Saint Seiya", tipo:"anime",
    generos:["Acción","Clásico","Mitología"], audio:"Español Latino", año:1986, estado:"Completo", rating:9.4,
    sinopsis:"Seiya y sus compañeros luchan para proteger a la diosa Atenea. El clásico más nostálgico de Latinoamérica en español.",
    poster:"https://image.tmdb.org/t/p/w500/9CQTi9fXb6hC9wX6qmG7aaCcFUV.jpg",
    banner:"https://image.tmdb.org/t/p/original/9CQTi9fXb6hC9wX6qmG7aaCcFUV.jpg",
    episodios:[], servidores:[{nombre:"Latino HD",url:"https://www.youtube.com/embed/results?search_query=saint+seiya+capitulo+1+español+latino&autoplay=1",tipo:"iframe"}]},
  { id:"aesp004", titulo:"Bleach — Español Latino", tipo:"anime", gogo_id:"bleach",
    generos:["Acción","Shounen","Sobrenatural"], audio:"Español Latino", año:2004, estado:"Completo", rating:9.2,
    sinopsis:"Ichigo Kurosaki se convierte en un Shinigami y protege a los humanos de los Hollow. El clásico del Shonen Big 3 en Latino.",
    poster:"https://image.tmdb.org/t/p/w500/2EewmxXe72ogD0EaWM8gqa0BQMS.jpg",
    banner:"https://image.tmdb.org/t/p/original/2EewmxXe72ogD0EaWM8gqa0BQMS.jpg",
    episodios:[], servidores:[{nombre:"Latino Ep 1",url:"https://www.youtube.com/embed/results?search_query=bleach+episodio+1+español+latino&autoplay=1",tipo:"iframe"}]},
  { id:"aesp005", titulo:"One Piece — Español Latino", tipo:"anime", gogo_id:"one-piece",
    generos:["Aventura","Acción","Comedia"], audio:"Español Latino", año:1999, estado:"En Emisión", rating:9.7,
    sinopsis:"Monkey D. Luffy navega los siete mares para convertirse en el Rey de los Piratas. La saga de aventuras más larga del anime.",
    poster:"https://image.tmdb.org/t/p/w500/fcsFkYzVhBXm2CgqfpHbXWoqWIi.jpg",
    banner:"https://image.tmdb.org/t/p/original/fcsFkYzVhBXm2CgqfpHbXWoqWIi.jpg",
    episodios:[], servidores:[{nombre:"Latino Ep 1",url:"https://www.youtube.com/embed/results?search_query=one+piece+episodio+1+español+latino&autoplay=1",tipo:"iframe"}]},
];

// ── FRUTI NOVELAS (Mini Dramas) ───────────────────────────────
const FRUTINOVELAS_DATA = [
  { id:"fn001", titulo:"Amor Inesperado (Mini Drama)", tipo:"frutinovel",
    generos:["Romance","Drama","Corto"], audio:"Español", año:2024, estado:"Completo", rating:8.5,
    sinopsis:"Un matrimonio arreglado se convierte en un romance apasionado. Capítulos cortos de 2 minutos para ver rápido.",
    poster:"https://image.tmdb.org/t/p/w500/z7vAQzEGLmS1UvL2Y1F9EEDfQO7.jpg",
    banner:"https://image.tmdb.org/t/p/original/z7vAQzEGLmS1UvL2Y1F9EEDfQO7.jpg",
    episodios:Array.from({length: 50}, (_, i) => ({ num: i+1, titulo: `Episodio ${i+1}`, duracion: "2 min" })),
    servidores:[{nombre:"Ver Completo",url:"https://www.youtube.com/embed/results?search_query=amor+inesperado+mini+drama+completo&autoplay=1",tipo:"iframe"}]},
  { id:"fn002", titulo:"La Venganza de la Heredera", tipo:"frutinovel",
    generos:["Venganza","Drama","Corto"], audio:"Español", año:2023, estado:"Completo", rating:9.0,
    sinopsis:"Después de ser traicionada por su familia, ella regresa multimillonaria y lista para destruir a quienes la lastimaron.",
    poster:"https://image.tmdb.org/t/p/w500/2EewmxXe72ogD0EaWM8gqa0BQMS.jpg",
    banner:"https://image.tmdb.org/t/p/original/2EewmxXe72ogD0EaWM8gqa0BQMS.jpg",
    episodios:Array.from({length: 80}, (_, i) => ({ num: i+1, titulo: `Episodio ${i+1}`, duracion: "1.5 min" })),
    servidores:[{nombre:"Ver Completo",url:"https://www.youtube.com/embed/results?search_query=la+venganza+de+la+heredera+mini+drama+completo&autoplay=1",tipo:"iframe"}]},
  { id:"fn003", titulo:"Mi Jefe Millonario", tipo:"frutinovel",
    generos:["Romance","Comedia","Corto"], audio:"Español", año:2024, estado:"En Emisión", rating:8.7,
    sinopsis:"Ocultó su identidad como CEO, pero se enamoró de su nueva secretaria. Descubre qué pasará cuando se revele la verdad.",
    poster:"https://image.tmdb.org/t/p/w500/8nZJuMhNkmH0k14VNLiQVV5Mldb.jpg",
    banner:"https://image.tmdb.org/t/p/original/8nZJuMhNkmH0k14VNLiQVV5Mldb.jpg",
    episodios:Array.from({length: 30}, (_, i) => ({ num: i+1, titulo: `Episodio ${i+1}`, duracion: "2 min" })),
    servidores:[{nombre:"Ver Completo",url:"https://www.youtube.com/embed/results?search_query=mi+jefe+millonario+mini+drama+completo&autoplay=1",tipo:"iframe"}]},
];

