// ============================================================
// CHARLY STREAM — BASE DE DATOS DE CONTENIDO
// ============================================================
// Para agregar nuevo contenido:
// 1. Copia un bloque { id, titulo... } y pégalo al array
// 2. Para el video: ve a YouTube, copia el ID de la URL
//    Ejemplo: youtube.com/watch?v=ABC123  → video: "https://www.youtube.com/embed/ABC123"
// 3. Para el poster: copia la URL de cualquier imagen de internet
// ============================================================

const CHARLY_DATA = {

  // ════════════════════════════════
  // 🎌 ANIME
  // ════════════════════════════════
  anime: [
    {
      id: "a001",
      titulo: "Dragon Ball Super",
      tipo: "anime",
      generos: ["Acción", "Aventura", "Artes Marciales"],
      audio: "Español Latino",
      año: 2015,
      estado: "Completo",
      rating: 9.2,
      sinopsis: "Goku y sus amigos enfrentan nuevas amenazas del universo. Dioses de la destrucción, guerreros de otros universos y el épico Torneo del Poder. ¡La acción más explosiva del anime en español latino!",
      poster: "https://images.unsplash.com/photo-1560972550-aba3456b5564?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1560972550-aba3456b5564?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 131,
      episodios: [
        {
          num: 1,
          titulo: "Tráiler Oficial — Español Latino",
          duracion: "1:30 min",
          video: "https://www.youtube.com/embed/hIg0l5uiebI",
          descarga: "https://drive.google.com"
        }
      ]
    },
    {
      id: "a002",
      titulo: "Demon Slayer: Castillo Infinito",
      tipo: "anime",
      generos: ["Acción", "Sobrenatural", "Drama"],
      audio: "Español Latino",
      año: 2024,
      estado: "En Emisión",
      rating: 9.7,
      sinopsis: "Tanjiro y los Pilares se enfrentan a Muzan dentro del Castillo Infinito. La batalla más épica de Kimetsu no Yaiba con audio en español latino. ¡No te la pierdas!",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 12,
      episodios: [
        {
          num: 1,
          titulo: "Tráiler Oficial — Castillo Infinito",
          duracion: "2:10 min",
          video: "https://www.youtube.com/embed/SKQWT0As7oc",
          descarga: "https://drive.google.com"
        }
      ]
    },
    {
      id: "a003",
      titulo: "Naruto Shippuden",
      tipo: "anime",
      generos: ["Acción", "Aventura", "Ninja"],
      audio: "Español Latino",
      año: 2007,
      estado: "Completo",
      rating: 9.5,
      sinopsis: "Naruto Uzumaki regresa más fuerte tras dos años de entrenamiento. Enfrenta a la organización Akatsuki y busca salvar a su amigo Sasuke. Uno de los mejores animes de todos los tiempos.",
      poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 500,
      episodios: [
        {
          num: 1,
          titulo: "Opening 16 — Silhouette (Español Latino)",
          duracion: "1:30 min",
          video: "https://www.youtube.com/embed/PbN-c02Cusc",
          descarga: "https://drive.google.com"
        }
      ]
    },
    {
      id: "a004",
      titulo: "One Piece (Live Action)",
      tipo: "anime",
      generos: ["Aventura", "Acción", "Comedia"],
      audio: "Español Latino",
      año: 2023,
      estado: "En Emisión",
      rating: 9.8,
      sinopsis: "Monkey D. Luffy y la tripulación de los Piratas de Paja en su aventura para encontrar el legendario tesoro One Piece. Ahora en la versión Live Action de Netflix en español latino.",
      poster: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 8,
      episodios: [
        {
          num: 1,
          titulo: "Tráiler Oficial Netflix — Español Latino",
          duracion: "2:30 min",
          video: "https://www.youtube.com/embed/JoO7TGG2Kms",
          descarga: "https://drive.google.com"
        }
      ]
    },
    {
      id: "a005",
      titulo: "Jujutsu Kaisen",
      tipo: "anime",
      generos: ["Acción", "Sobrenatural", "Escolar"],
      audio: "Subtítulos Español",
      año: 2020,
      estado: "En Emisión",
      rating: 9.3,
      sinopsis: "Yuji Itadori ingiere un dedo de Sukuna y se convierte en su huésped. Ahora debe luchar junto a hechiceros de la escuela Jujutsu para proteger a la humanidad de los espíritus malditos.",
      poster: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 47,
      episodios: [
        {
          num: 1,
          titulo: "Tráiler Oficial — Español",
          duracion: "2:00 min",
          video: "https://www.youtube.com/embed/aPBUUJbrAWo",
          descarga: "https://drive.google.com"
        }
      ]
    }
  ],

  // ════════════════════════════════
  // 🏯 DORAMAS CHINOS
  // ════════════════════════════════
  doramas: [
    {
      id: "d001",
      titulo: "Romances Históricos Chinos 2026",
      tipo: "dorama",
      generos: ["Romance", "Histórico", "Fantasía"],
      audio: "Subtítulos Español",
      año: 2026,
      estado: "En Emisión",
      rating: 9.0,
      sinopsis: "Los mejores romances históricos chinos del 2026. Historias de amor épicas entre guerreros, diosas y príncipes en el antiguo China imperial. Subtítulos en español.",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 40,
      episodios: [
        {
          num: 1,
          titulo: "Compilación — Mejores Romances 2026",
          duracion: "5:00 min",
          video: "https://www.youtube.com/embed/vVUArnOKu5Q",
          descarga: "https://drive.google.com"
        }
      ]
    },
    {
      id: "d002",
      titulo: "The Longest Promise (Yu Gu Yao)",
      tipo: "dorama",
      generos: ["Romance", "Fantasía", "Xianxia"],
      audio: "Subtítulos Español",
      año: 2023,
      estado: "Completo",
      rating: 9.1,
      sinopsis: "Zhu Yan, la princesa del mundo demoníaco, y Shi Ying, el discípulo más talentoso del mundo inmortal, están ligados por un destino antiguo. Una historia de amor épica entre mundos opuestos.",
      poster: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 40,
      episodios: [
        {
          num: 1,
          titulo: "Tráiler Oficial — The Longest Promise",
          duracion: "2:20 min",
          video: "https://www.youtube.com/embed/i3GgZoznVas",
          descarga: "https://drive.google.com"
        }
      ]
    },
    {
      id: "d003",
      titulo: "Love Between Fairy and Devil",
      tipo: "dorama",
      generos: ["Romance", "Fantasía", "Comedia"],
      audio: "Subtítulos Español",
      año: 2022,
      estado: "Completo",
      rating: 9.3,
      sinopsis: "Orchid, una pequeña hada, accidentalmente libera a Changheng, el Señor del Océano Lunar. Sus almas quedan entrelazadas, generando una historia de amor imposible entre el bien y el mal.",
      poster: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 36,
      episodios: [
        {
          num: 1,
          titulo: "Tráiler Oficial — Love Between Fairy and Devil",
          duracion: "2:30 min",
          video: "https://www.youtube.com/embed/4srh0hL90_U",
          descarga: "https://drive.google.com"
        }
      ]
    },
    {
      id: "d004",
      titulo: "Till the End of the Moon",
      tipo: "dorama",
      generos: ["Romance", "Fantasía", "Acción"],
      audio: "Subtítulos Español",
      año: 2023,
      estado: "Completo",
      rating: 9.2,
      sinopsis: "Li Susu viaja al pasado para eliminar al dios demonio antes de que nazca. Pero termina enamorándose de él. Una historia de amor épica y trágica que atraviesa el tiempo y los mundos.",
      poster: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 40,
      episodios: [
        {
          num: 1,
          titulo: "Tráiler Oficial — Till the End of the Moon",
          duracion: "2:00 min",
          video: "https://www.youtube.com/embed/g-IGW-K7ZaY",
          descarga: "https://drive.google.com"
        }
      ]
    },
    {
      id: "d005",
      titulo: "Nirvana in Fire",
      tipo: "dorama",
      generos: ["Histórico", "Drama", "Intriga"],
      audio: "Subtítulos Español",
      año: 2015,
      estado: "Completo",
      rating: 9.6,
      sinopsis: "Mei Changsu regresa de entre los muertos con una nueva identidad para limpiar el nombre de su familia y vengar a sus compañeros caídos. Considerado el mejor dorama chino de la historia.",
      poster: "https://images.unsplash.com/photo-1549390143-7a5a20f9a97e?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1549390143-7a5a20f9a97e?w=1280&h=500&fit=crop&q=80",
      totalEpisodios: 54,
      episodios: [
        {
          num: 1,
          titulo: "Tráiler Oficial — Nirvana in Fire",
          duracion: "2:10 min",
          video: "https://www.youtube.com/embed/ecu8DEcpyJ8",
          descarga: "https://drive.google.com"
        }
      ]
    }
  ],

  // ════════════════════════════════
  // 🎬 PELÍCULAS
  // ════════════════════════════════
  peliculas: [
    {
      id: "p001",
      titulo: "Demon Slayer: Mugen Train",
      tipo: "pelicula",
      generos: ["Acción", "Drama", "Anime"],
      audio: "Español Latino",
      año: 2020,
      estado: "Disponible",
      rating: 9.4,
      sinopsis: "Tanjiro, Nezuko, Zenitsu e Inosuke se unen al Pilar de las Llamas Rengoku en una misión en el Tren Infinito. La película anime más taquillera de la historia.",
      poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280&h=500&fit=crop&q=80",
      duracion: "1h 57min",
      episodios: [
        {
          num: 1,
          titulo: "Demon Slayer: Mugen Train — Tráiler Oficial",
          duracion: "1h 57min",
          video: "https://www.youtube.com/embed/SKQWT0As7oc",
          descarga: "https://drive.google.com"
        }
      ]
    }
  ]
};

// ════════════════════════════════════════════════════════
// 🔑 CÓDIGOS DE ACCESO
// ════════════════════════════════════════════════════════
// CÓMO FUNCIONA:
// 1. Tú tienes esta lista de códigos aquí
// 2. Le mandas un código por WhatsApp a tu amigo
// 3. Él lo ingresa en la app → accede por 7 días
// 4. Después de 7 días → le mandas un código VIP (5 Bs)
// 5. Para renovar: agrega un nuevo código VIP aquí
//
// CONSEJO: Guarda los códigos usados en un bloc de notas
//          con el nombre de la persona que los usó
// ════════════════════════════════════════════════════════
const CODIGOS_ACCESO = [
  // ── PRUEBA GRATIS 7 DÍAS ── (mándalos por WhatsApp)
  { codigo: "CHARLY001", dias: 7,  tipo: "prueba"  },
  { codigo: "CHARLY002", dias: 7,  tipo: "prueba"  },
  { codigo: "CHARLY003", dias: 7,  tipo: "prueba"  },
  { codigo: "CHARLY004", dias: 7,  tipo: "prueba"  },
  { codigo: "CHARLY005", dias: 7,  tipo: "prueba"  },
  { codigo: "AMIGO001",  dias: 7,  tipo: "prueba"  },
  { codigo: "AMIGO002",  dias: 7,  tipo: "prueba"  },
  { codigo: "AMIGO003",  dias: 7,  tipo: "prueba"  },
  { codigo: "PRUEBA001", dias: 7,  tipo: "prueba"  },
  { codigo: "PRUEBA002", dias: 7,  tipo: "prueba"  },
  { codigo: "STREAM001", dias: 7,  tipo: "prueba"  },
  { codigo: "STREAM002", dias: 7,  tipo: "prueba"  },
  { codigo: "BOLIVIA01", dias: 7,  tipo: "prueba"  },
  { codigo: "GRATIS01",  dias: 7,  tipo: "prueba"  },
  { codigo: "GRATIS02",  dias: 7,  tipo: "prueba"  },
  // ── ACCESO PAGO 30 DÍAS — 5 Bs ── (enviar al pagar)
  { codigo: "VIP2026-A", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-B", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-C", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-D", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-E", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-F", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-G", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-H", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-I", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-J", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-K", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-L", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-M", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-N", dias: 30, tipo: "premium" },
  { codigo: "VIP2026-O", dias: 30, tipo: "premium" },
  // ── ADMIN — Sin expiración (solo para TI) ──
  { codigo: "CHARLY_ADMIN_2026", dias: 36500, tipo: "admin" },
];

// ════════════════════════════════════════
// ⚙️ CONFIGURACIÓN GENERAL
// ════════════════════════════════════════
const CONFIG = {
  nombre:          "CHARLY STREAM",
  slogan:          "Anime & Doramas en Español",
  whatsapp:        "59165657865",
  precio_mensual:  "5 Bs",
  dias_prueba:     7,
  version:         "1.0.0",
  tiktok:          "https://www.tiktok.com/@abel_ofi",
};
