// ============================================================
// CHARLY STREAM v2.0 — app.js
// ============================================================
'use strict';

/* ── Estado Global ── */
let STATE = {
  sesion: null, contenidoActual: null, episodioActual: 0, servidorActual: 0,
  catalogoAnime: [], catalogoDoramas: [], catalogoPeliculas: [],
  catalogoDeportes: [], catalogoMusica: [],
  catalogoTelenovelas: [], catalogoCdrama: [], catalogoAnimeEsp: [], catalogoFrutinovel: [],
  heroItems: [], heroIndex: 0, heroTimer: null,
  countdownTimer: null, countdownSec: 10,
  todosLosItems: [], favoritosView: false,
  musicaIndex: 0, musicaPlaying: false,
};

/* ─────────────────────────────────────────
   PARTÍCULAS LOGIN
───────────────────────────────────────── */
function crearParticulas() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 7 + 3;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*12+8}s;animation-delay:${Math.random()*10}s;background:${Math.random()>.5?'#e50914':'#ff6b35'};`;
    c.appendChild(p);
  }
}

/* ─────────────────────────────────────────
   ACCESO / LOGIN
───────────────────────────────────────── */
function ingresarConCodigo() {
  const raw = document.getElementById('input-codigo').value.trim().toUpperCase();
  const err = document.getElementById('form-error');
  err.classList.remove('show');
  if (!raw) { mostrarError('Ingresa un código de acceso.'); return; }
  const found = CODIGOS_ACCESO.find(c => c.codigo === raw);
  if (!found) { mostrarError('Código incorrecto. Contacta a Charly por WhatsApp.'); return; }
  const guardado = JSON.parse(localStorage.getItem('cs_sesion') || 'null');
  if (guardado && guardado.codigo === raw) {
    if (Date.now() > guardado.expira) { mostrarModalExpiry(); return; }
    iniciarApp(guardado); return;
  }
  const expira = Date.now() + found.dias * 86400000;
  const sesion = { codigo: raw, dias: found.dias, tipo: found.tipo, expira, activado: Date.now() };
  localStorage.setItem('cs_sesion', JSON.stringify(sesion));
  iniciarApp(sesion);
}

function toggleCodigoVip() {
  const el = document.getElementById('vip-input-section');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function iniciarPruebaAutomatica() {
  const guardado = JSON.parse(localStorage.getItem('cs_sesion') || 'null');
  if (guardado) {
    if (Date.now() > guardado.expira) { mostrarModalExpiry(); return; }
    iniciarApp(guardado);
    return;
  }
  // Crear sesión automática de 3 días
  const expira = Date.now() + 3 * 86400000;
  const sesion = { codigo: "PRUEBA_3_DIAS", dias: 3, tipo: "prueba", expira, activado: Date.now() };
  localStorage.setItem('cs_sesion', JSON.stringify(sesion));
  iniciarApp(sesion);
}

function verificarSesionAlInicio() {
  const s = JSON.parse(localStorage.getItem('cs_sesion') || 'null');
  if (!s) return;
  if (Date.now() > s.expira) { mostrarModalExpiry(); return; }
  iniciarApp(s);
}

function cerrarSesion() {
  localStorage.removeItem('cs_sesion');
  STATE.sesion = null;
  mostrarPagina('page-login');
  document.getElementById('modal-expiry').style.display = 'none';
}

function mostrarModalExpiry() {
  mostrarPagina('page-login');
  document.getElementById('modal-expiry').style.display = 'flex';
}

function mostrarError(msg) {
  const el = document.getElementById('form-error');
  el.textContent = '❌ ' + msg;
  el.classList.add('show');
}

/* ─────────────────────────────────────────
   INICIO DE APP / FETCH CATÁLOGO
───────────────────────────────────────── */
async function iniciarApp(sesion) {
  STATE.sesion = sesion;
  mostrarPagina('page-catalog');
  actualizarNavDias(sesion);
  document.getElementById('loading-state').style.display = 'flex';
  document.getElementById('catalog-main').style.display = 'none';
  try {
    await Promise.all([fetchAnime(), fetchDoramas(), fetchPeliculas()]);
  } catch(e) { console.warn('API error:', e); }
  cargarEspecial();
  construirTodosLosItems();
  renderCatalogo();
  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('catalog-main').style.display = 'block';
  iniciarHeroSlider();
  renderContinuar();
  renderTikTokSection();
  trackVisit();
  if (sesion.tipo === 'admin') renderAdminPanel();
}


async function fetchAnime() {
  const cache = JSON.parse(sessionStorage.getItem('cs_anime') || 'null');
  if (cache) { STATE.catalogoAnime = cache; return; }
  try {
    const res = await fetch(`${CONFIG.jikan}/top/anime?filter=airing&limit=20&sfw`);
    const data = await res.json();
    STATE.catalogoAnime = (data.data || []).map(a => mapJikanToItem(a));
    sessionStorage.setItem('cs_anime', JSON.stringify(STATE.catalogoAnime));
  } catch(e) {
    // Fallback con datos hardcoded si Jikan falla
    STATE.catalogoAnime = ANIME_IDS_JIKAN.map((a,i) => ({
      id: 'anime_' + a.mal_id,
      mal_id: a.mal_id,
      gogo_id: a.gogo_id || null,
      titulo: a.titulo_es,
      tipo: 'anime',
      generos: ['Acción','Aventura'],
      audio: a.audio,
      año: 2023,
      estado: 'En Emisión',
      rating: (9.5 - i*0.1).toFixed(1)*1,
      sinopsis: 'Uno de los mejores animes disponibles en ' + a.audio + '. Haz clic para ver más detalles.',
      poster: `https://via.placeholder.com/400x600/1a1a24/e50914?text=${encodeURIComponent(a.titulo_es)}`,
      banner: `https://via.placeholder.com/1280x500/0a0a0f/e50914?text=${encodeURIComponent(a.titulo_es)}`,
      episodios: generarEpisodiosVacios(12),
    }));
  }
}

async function fetchDoramas() {
  const cache = JSON.parse(sessionStorage.getItem('cs_doramas') || 'null');
  if (cache) { STATE.catalogoDoramas = cache; return; }
  try {
    const promesas = DORAMAS_TMDB_IDS.slice(0,8).map(d =>
      fetch(`${CONFIG.tmdb}/tv/${d.tmdb_id}?api_key=${CONFIG.tmdb_key}&language=es-ES`).then(r=>r.json()).catch(()=>null)
    );
    const results = await Promise.all(promesas);
    STATE.catalogoDoramas = results.filter(Boolean).map((d,i) => mapTMDBToItem(d, 'dorama', DORAMAS_TMDB_IDS[i]));
    sessionStorage.setItem('cs_doramas', JSON.stringify(STATE.catalogoDoramas));
  } catch(e) { STATE.catalogoDoramas = []; }
}

async function fetchPeliculas() {
  const cache = JSON.parse(sessionStorage.getItem('cs_peliculas') || 'null');
  if (cache) { STATE.catalogoPeliculas = cache; return; }
  try {
    const promesas = PELICULAS_TMDB_IDS.slice(0,8).map(p =>
      fetch(`${CONFIG.tmdb}/movie/${p.tmdb_id}?api_key=${CONFIG.tmdb_key}&language=es-ES`).then(r=>r.json()).catch(()=>null)
    );
    const results = await Promise.all(promesas);
    STATE.catalogoPeliculas = results.filter(Boolean).map((m,i) => mapTMDBToItem(m, 'pelicula', PELICULAS_TMDB_IDS[i]));
    sessionStorage.setItem('cs_peliculas', JSON.stringify(STATE.catalogoPeliculas));
  } catch(e) { STATE.catalogoPeliculas = []; }
}

function cargarEspecial() {
  STATE.catalogoDormir = ESPECIAL_DATA.dormir || [];
  STATE.catalogoSuperacion = ESPECIAL_DATA.superacion || [];
}

/* ─────────────────────────────────────────
   MAPPERS API → ITEM
───────────────────────────────────────── */
function mapJikanToItem(a) {
  const ref = ANIME_IDS_JIKAN.find(x => x.mal_id === a.mal_id);
  return {
    id: 'anime_' + a.mal_id,
    mal_id: a.mal_id,
    gogo_id: ref?.gogo_id || null,
    titulo: a.title_spanish || a.title_english || a.title,
    tipo: 'anime',
    generos: (a.genres || []).map(g => g.name).slice(0,3),
    audio: 'Español Latino',
    año: a.year || new Date().getFullYear(),
    estado: a.status === 'Currently Airing' ? 'En Emisión' : 'Completo',
    rating: a.score || 8.5,
    sinopsis: a.synopsis || 'Sin sinopsis disponible.',
    poster: a.images?.jpg?.large_image_url || a.images?.jpg?.image_url || '',
    banner: a.images?.jpg?.large_image_url || a.images?.jpg?.image_url || '',
    totalEpisodios: a.episodes || '?',
    episodios: generarEpisodiosVacios(Math.min(a.episodes || 12, 50)),
  };
}

function mapTMDBToItem(d, tipo, ref) {
  const isTV = tipo === 'dorama';
  const poster = d.poster_path ? CONFIG.tmdb_img + d.poster_path : '';
  const banner = d.backdrop_path ? CONFIG.tmdb_img_lg + d.backdrop_path : poster;
  const eps = isTV ? Math.min(d.number_of_episodes || 24, 50) : 1;
  return {
    id: tipo + '_' + d.id,
    tmdb_id: d.id,
    titulo: d.name || d.title || ref.titulo_es,
    tipo,
    generos: (d.genres || []).map(g => g.name).slice(0,3),
    audio: 'Subtítulos Español',
    año: (d.first_air_date || d.release_date || '2023').substring(0,4),
    estado: isTV ? (d.status === 'Returning Series' ? 'En Emisión' : 'Completo') : 'Disponible',
    rating: d.vote_average ? d.vote_average.toFixed(1)*1 : 8.0,
    sinopsis: d.overview || 'Sin sinopsis disponible.',
    poster,
    banner,
    totalEpisodios: eps,
    duracion: isTV ? null : (d.runtime ? `${Math.floor(d.runtime/60)}h ${d.runtime%60}min` : null),
    episodios: generarEpisodiosVacios(eps),
  };
}

function generarEpisodiosVacios(n) {
  return Array.from({length: n}, (_,i) => ({
    num: i + 1,
    titulo: `Episodio ${i + 1}`,
    duracion: '24 min',
    servidores: [],
  }));
}

/* ─────────────────────────────────────────
   CONSTRUIR LISTA TOTAL
───────────────────────────────────────── */
function construirTodosLosItems() {
  STATE.catalogoDeportes = DEPORTES_DATA || [];
  STATE.catalogoTelenovelas = TELENOVELAS_DATA || [];
  STATE.catalogoCdrama = CDRAMA_DATA || [];
  STATE.catalogoAnimeEsp = ANIME_ESP_DATA || [];
  STATE.catalogoFrutinovel = FRUTINOVELAS_DATA || [];
  const toMs = m => ({ ...m, tipo:'musica', estado:'Disponible', rating:9.0,
    sinopsis: m.artista, banner: m.poster, episodios:[],
    servidores:[{nombre:'YouTube', url:`https://www.youtube.com/embed/${m.yt_id}?autoplay=1`, tipo:'iframe'}]
  });
  STATE.catalogoMusica = (MUSICA_PLAYLIST || []).map(toMs);
  STATE.todosLosItems = [
    ...STATE.catalogoAnime, ...STATE.catalogoDoramas, ...STATE.catalogoPeliculas,
    ...STATE.catalogoDeportes, ...STATE.catalogoMusica,
    ...STATE.catalogoTelenovelas, ...STATE.catalogoCdrama, ...STATE.catalogoAnimeEsp,
    ...STATE.catalogoFrutinovel,
    ...(STATE.catalogoDormir || []), ...(STATE.catalogoSuperacion || []),
  ];
}

function getItemById(id) {
  return STATE.todosLosItems.find(x => x.id === id);
}

/* ─────────────────────────────────────────
   RENDERIZAR CATÁLOGO
───────────────────────────────────────── */
function renderCatalogo() {
  const todo = [...STATE.catalogoAnime, ...STATE.catalogoDoramas, ...STATE.catalogoPeliculas];
  const top10 = [...todo].sort((a,b) => b.rating - a.rating).slice(0,10);
  renderRow('grid-top10', top10, true);
  renderRow('grid-anime', [...STATE.catalogoAnime, ...STATE.catalogoAnimeEsp]);
  renderRow('grid-cdrama', STATE.catalogoCdrama);
  renderRow('grid-frutinovel', STATE.catalogoFrutinovel);
  renderRow('grid-doramas', STATE.catalogoDoramas);
  renderRow('grid-peliculas', STATE.catalogoPeliculas);
  renderRow('grid-dormir', STATE.catalogoDormir || []);
  renderRow('grid-superacion', STATE.catalogoSuperacion || []);
  renderRow('grid-deportes', STATE.catalogoDeportes);
  renderRow('grid-musica', STATE.catalogoMusica);
  renderRow('grid-telenovelas', STATE.catalogoTelenovelas);
  STATE.heroItems = top10.slice(0,3);
  renderContinuar();
}

function renderRow(gridId, items, isTop10) {
  const el = document.getElementById(gridId);
  if (!el) return;
  el.innerHTML = items.length
    ? items.map((item,i) => crearCardHTML(item, isTop10 ? i+1 : null)).join('')
    : '<p style="color:var(--text3);padding:20px;font-size:.85rem;">Sin contenido aún.</p>';
}

function renderContinuar() {
  const hist = JSON.parse(localStorage.getItem('cs_historial') || '[]');
  const sec = document.getElementById('sec-continuar');
  const grid = document.getElementById('grid-continuar');
  if (!hist.length || !sec || !grid) { if(sec) sec.style.display='none'; return; }
  const items = hist.map(id => getItemById(id)).filter(Boolean);
  if (!items.length) { sec.style.display='none'; return; }
  sec.style.display = 'block';
  grid.innerHTML = items.map(i => crearCardHTML(i)).join('');
}

/* ─────────────────────────────────────────
   CREAR CARD HTML
───────────────────────────────────────── */
function crearCardHTML(item, top10Num) {
  if (!item) return '';
  const audioClass = item.audio?.toLowerCase().includes('latino') ? 'latino' : 'subs';
  const audioLabel = item.tipo === 'musica' ? '🎵 Música'
    : item.tipo === 'deporte' ? '⚽ Deporte'
    : item.audio?.toLowerCase().includes('latino') ? '🎤 Latino' : '💬 Subs';
  const isFav = esFavorito(item.id);
  const prog = getProgreso(item.id);
  const progHTML = prog > 0 ? `<div class="card-progress"><div class="card-progress-bar" style="width:${prog}%"></div></div>` : '';
  const top10HTML = top10Num ? `<div class="top10-num">${top10Num}</div>` : '';
  const isLive = item.estado === 'En Vivo';
  const isNew  = item.estado === 'En Emisión';
  const badge  = isLive ? '<span class="card-live-badge">🔴 EN VIVO</span>'
    : isNew ? '<span class="card-badge-new">NUEVO</span>' : '';
  const playIcon = item.tipo === 'musica' ? '🎵' : item.tipo === 'deporte' ? '⚽' : '▶';
  return `
<div class="card" onclick="abrirDetalle('${item.id}')" id="card-${item.id}">
  ${top10HTML}${badge}
  <img class="card-poster" src="${item.poster}" alt="${item.titulo}" loading="lazy"
    onerror="this.src='https://via.placeholder.com/400x600/1a1a24/e50914?text=${encodeURIComponent(item.titulo?.substring(0,15)||'')}' ">
  <div class="card-overlay"><div class="card-play">${playIcon}</div></div>
  <button class="card-fav ${isFav?'active':''}" onclick="toggleFavoritoCard(event,'${item.id}')" title="Favorito">${isFav?'❤️':'🤍'}</button>
  ${progHTML}
  <div class="card-info">
    <div class="card-title">${item.titulo || 'Sin título'}</div>
    <div class="card-meta-row">
      <span class="card-audio-badge ${audioClass}">${audioLabel}</span>
      <span class="card-rating-val">⭐ ${item.rating || '?'}</span>
    </div>
  </div>
</div>`;
}

/* ─────────────────────────────────────────
   HERO SLIDER
───────────────────────────────────────── */
function iniciarHeroSlider() {
  if (!STATE.heroItems.length) return;
  const dotsEl = document.getElementById('hero-dots');
  if (!dotsEl) return;
  dotsEl.innerHTML = STATE.heroItems.map((_,i) =>
    `<div class="hero-dot ${i===0?'active':''}" onclick="irAHeroSlide(${i})"></div>`
  ).join('');
  STATE.heroItems.forEach((item, i) => renderHeroSlide(item, i));
  irAHeroSlide(0);
  clearInterval(STATE.heroTimer);
  STATE.heroTimer = setInterval(() => {
    const next = (STATE.heroIndex + 1) % STATE.heroItems.length;
    irAHeroSlide(next);
  }, 6000);
}

function renderHeroSlide(item, i) {
  const bg = document.getElementById(`hero-bg-${i}`);
  const content = document.getElementById(`hero-content-${i}`);
  if (!bg || !content) return;
  bg.style.backgroundImage = `url('${item.banner || item.poster}')`;
  const tipoLabel = {anime:'🎌 Anime', dorama:'🏯 Dorama', pelicula:'🎬 Película', dormir:'💤 Relajación', superacion:'💪 Superación'}[item.tipo] || '';
  content.innerHTML = `
<div class="hero-badge-type">${tipoLabel}</div>
<h1 class="hero-title-main">${item.titulo}</h1>
<div class="hero-meta-row">
  <span class="hero-rating-badge">⭐ ${item.rating}</span>
  <span>${item.año}</span>
  <span>${item.audio}</span>
  <span>${item.estado}</span>
</div>
<p class="hero-desc-text">${item.sinopsis}</p>
<div class="hero-action-btns">
  <button class="btn-hero-play" onclick="abrirDetalle('${item.id}')">▶ Ver Ahora</button>
  <button class="btn-hero-info" onclick="abrirDetalle('${item.id}')">ℹ️ Más Info</button>
</div>`;
}

function irAHeroSlide(index) {
  STATE.heroIndex = index;
  document.querySelectorAll('.hero-slide').forEach((s,i) => s.classList.toggle('active', i===index));
  document.querySelectorAll('.hero-dot').forEach((d,i) => d.classList.toggle('active', i===index));
}

/* ─────────────────────────────────────────
   NAVEGACIÓN
───────────────────────────────────────── */
function mostrarPagina(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById(id);
  if (pg) { pg.classList.add('active'); window.scrollTo(0,0); }
}

function irACatalogo() {
  cancelarCountdown();
  limpiarPlayer();
  mostrarPagina('page-catalog');
}

function actualizarNavDias(sesion) {
  const el = document.getElementById('nav-dias');
  if (!el || !sesion) return;
  if (sesion.tipo === 'admin') { el.textContent = '👑 Admin'; return; }
  const dias = Math.max(0, Math.ceil((sesion.expira - Date.now()) / 86400000));
  el.textContent = dias <= 3 ? `⚠️ ${dias} día(s)` : `✅ ${dias} días`;
  el.style.color = dias <= 3 ? '#ff6b35' : '';
}

/* ─────────────────────────────────────────
   MODAL DE DETALLE
───────────────────────────────────────── */
function abrirDetalle(id) {
  const item = getItemById(id);
  if (!item) return;
  STATE.contenidoActual = item;
  STATE.episodioActual = 0;
  const modal = document.getElementById('modal-detail');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  // Banner
  document.getElementById('detail-banner').src = item.banner || item.poster;
  // Badge con todos los tipos
  const badges = {
    anime:'🎌 Anime', dorama:'🏯 Dorama', pelicula:'🎬 Película',
    dormir:'💤 Para Dormir', superacion:'💪 Superación',
    deporte:'⚽ Deportes', musica:'🎵 Música'
  };
  document.getElementById('detail-badge').textContent = badges[item.tipo] || '';
  document.getElementById('detail-title').textContent = item.titulo;
  document.getElementById('detail-meta').innerHTML = `
    <span>⭐ ${item.rating}</span><span>${item.año}</span>
    <span>${item.audio || ''}</span><span>${item.estado}</span>
    ${item.totalEpisodios ? `<span>${item.totalEpisodios} ep.</span>` : ''}
    ${item.duracion ? `<span>${item.duracion}</span>` : ''}
    ${item.artista ? `<span>🎤 ${item.artista}</span>` : ''}`;
  document.getElementById('detail-sinopsis').textContent = item.sinopsis;
  // Tags
  document.getElementById('detail-tags').innerHTML = (item.generos||[]).map(g => `<span class="detail-tag">${g}</span>`).join('');
  // Favorito
  const favBtn = document.getElementById('detail-fav-btn');
  favBtn.classList.toggle('active', esFavorito(item.id));
  favBtn.textContent = esFavorito(item.id) ? '❤️ En Favoritos' : '🤍 Favorito';
  // Episodios o servidores directos
  const epWrap = document.getElementById('detail-episodes-wrap');
  const srvWrap = document.getElementById('detail-servers-wrap');
  if (item.episodios && item.episodios.length > 0) {
    epWrap.style.display = 'block';
    srvWrap.style.display = 'none';
    renderDetalleEpisodios(item);
  } else if (item.servidores && item.servidores.length > 0) {
    epWrap.style.display = 'none';
    srvWrap.style.display = 'block';
    document.getElementById('detail-servers').innerHTML = item.servidores.map((s,i) =>
      `<button class="server-btn" onclick="reproducirDirecto('${item.id}',${i})">${s.nombre}</button>`
    ).join('');
  } else {
    epWrap.style.display = 'none';
    srvWrap.style.display = 'none';
  }
  // Activar barra de música si es canción
  if (item.tipo === 'musica') {
    const idx = STATE.catalogoMusica?.findIndex(m => m.id === id) ?? -1;
    if (idx >= 0) {
      STATE.musicaIndex = idx;
      STATE.musicaPlaying = true;
      const bar = document.getElementById('music-bar');
      if (bar) bar.style.display = 'flex';
      const el = i => document.getElementById(i);
      if (el('music-bar-title'))  el('music-bar-title').textContent  = item.titulo;
      if (el('music-bar-artist')) el('music-bar-artist').textContent = item.artista || '';
      if (el('music-bar-thumb'))  el('music-bar-thumb').src = item.poster || '';
      if (el('music-play-btn'))   el('music-play-btn').textContent = '⏸';
    }
  }
}

function renderDetalleEpisodios(item) {
  const lista = document.getElementById('detail-episodes');
  const vistos = JSON.parse(localStorage.getItem('cs_vistos_' + item.id) || '[]');
  lista.innerHTML = item.episodios.map((ep, i) => {
    const visto = vistos.includes(i);
    return `
<div class="detail-ep-item${visto?' visto':''}" onclick="reproducirEpisodioDesdeDetalle(${i})" title="Episodio ${ep.num}${visto?' ✓ Visto':''}">
  <div class="detail-ep-num">${ep.num}</div>
  <span class="detail-ep-play">▶</span>
  ${visto ? '<span class="detail-ep-dur">✓</span>' : ''}
</div>`;
  }).join('');
}


function cerrarDetalle(e) {
  if (e && e.target !== document.getElementById('modal-detail')) return;
  document.getElementById('modal-detail').style.display = 'none';
  document.body.style.overflow = '';
}

function reproducirDesdeDetalle() {
  document.getElementById('modal-detail').style.display = 'none';
  document.body.style.overflow = '';
  reproducirEpisodio(STATE.contenidoActual, 0);
}

function reproducirEpisodioDesdeDetalle(epIndex) {
  document.getElementById('modal-detail').style.display = 'none';
  document.body.style.overflow = '';
  reproducirEpisodio(STATE.contenidoActual, epIndex);
}

function reproducirDirecto(id, srvIndex) {
  const item = getItemById(id);
  if (!item) return;
  STATE.contenidoActual = item;
  STATE.episodioActual = 0;
  document.getElementById('modal-detail').style.display = 'none';
  document.body.style.overflow = '';
  reproducirEpisodio(item, 0, srvIndex);
}

/* ─────────────────────────────────────────
   REPRODUCTOR
───────────────────────────────────────── */
function marcarEpisodioVisto(itemId, epIndex) {
  const key = 'cs_vistos_' + itemId;
  const v = JSON.parse(localStorage.getItem(key) || '[]');
  if (!v.includes(epIndex)) { v.push(epIndex); localStorage.setItem(key, JSON.stringify(v)); }
}

function reproducirEpisodio(item, epIndex, srvIndex) {
  if (!item) return;
  STATE.contenidoActual = item;
  STATE.episodioActual = epIndex;
  STATE.servidorActual = srvIndex || 0;
  guardarHistorial(item.id);
  marcarEpisodioVisto(item.id, epIndex);
  mostrarPagina('page-player');
  // Info
  document.getElementById('player-show-title').textContent = item.titulo;
  const ep = item.episodios?.[epIndex];
  document.getElementById('player-ep-label').textContent = ep
    ? (item.tipo === 'pelicula' ? `🎬 Película · ${item.duracion||''}` : `Episodio ${ep.num}: ${ep.titulo} · ${ep.duracion||'24 min'}`)
    : item.titulo;
  document.getElementById('player-sinopsis').textContent = item.sinopsis || '';
  // Favorito
  const favBtn = document.getElementById('btn-fav-player');
  favBtn.classList.toggle('active', esFavorito(item.id));
  favBtn.textContent = esFavorito(item.id) ? '❤️' : '🤍';
  // Share WA
  const shareText = `¡Mira ${item.titulo} en Charly Stream! https://charlystream-bo.github.io`;
  document.getElementById('btn-wa-share').href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  // Nav botones
  const hasEps = item.episodios && item.episodios.length > 1;
  document.getElementById('btn-prev-ep').style.display = hasEps && epIndex > 0 ? 'flex' : 'none';
  document.getElementById('btn-next-ep').style.display = hasEps && epIndex < item.episodios.length - 1 ? 'flex' : 'none';
  // Sidebar episodios
  renderSidebarEpisodios(item, epIndex);
  // Servidores
  const servidores = ep?.servidores || item.servidores || [];
  renderServerBtns(servidores);
  // Cargar servidor — si no hay, intentar auto-fetch
  if (servidores.length > 0) {
    cargarServidor(servidores, STATE.servidorActual);
  } else {
    fetchServidoresAuto(item, epIndex);
  }
}

function renderServerBtns(servidores) {
  const row = document.getElementById('server-btns-row');
  if (!row) return;
  if (!servidores.length) {
    row.innerHTML = '<span style="color:var(--text3);font-size:.78rem;">Sin servidores — Agrega links en datos.js</span>';
    return;
  }
  row.innerHTML = servidores.map((s, i) =>
    `<button class="srv-btn ${i===STATE.servidorActual?'active':''}" onclick="seleccionarServidor(${i})" id="srv-btn-${i}">${i+1}</button>`
  ).join('');
}

function seleccionarServidor(index) {
  const item = STATE.contenidoActual;
  if (!item) return;
  STATE.servidorActual = index;
  const ep = item.episodios?.[STATE.episodioActual];
  const servidores = ep?.servidores || item.servidores || [];
  document.querySelectorAll('.srv-btn').forEach((b,i) => b.classList.toggle('active', i===index));
  cargarServidor(servidores, index);
}

function cargarServidor(servidores, index) {
  const srv = servidores[index];
  if (!srv) { mostrarSinServidor(); return; }
  const loading = document.getElementById('iframe-loading');
  const iframeEl = document.getElementById('player-iframe');
  const videoEl = document.getElementById('player-video');
  const errorEl = document.getElementById('server-error');
  errorEl.style.display = 'none';
  if (srv.tipo === 'hls' || srv.url.includes('.m3u8')) {
    // HLS.js
    iframeEl.style.display = 'none';
    videoEl.style.display = 'block';
    loading.style.display = 'flex';
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(srv.url);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => { loading.style.display='none'; videoEl.play(); });
      hls.on(Hls.Events.ERROR, () => { loading.style.display='none'; mostrarSinServidor(); });
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = srv.url;
      videoEl.addEventListener('loadedmetadata', () => { loading.style.display='none'; videoEl.play(); });
    }
  } else {
    // iframe embed
    videoEl.style.display = 'none';
    iframeEl.style.display = 'block';
    loading.style.display = 'flex';
    iframeEl.src = 'about:blank';
    setTimeout(() => {
      iframeEl.src = srv.url;
      iframeEl.onload = () => { loading.style.display = 'none'; };
      setTimeout(() => { loading.style.display = 'none'; }, 8000);
    }, 300);
  }
}

function mostrarSinServidor() {
  document.getElementById('iframe-loading').style.display = 'none';
  document.getElementById('server-error').style.display = 'flex';
  document.getElementById('player-iframe').src = 'about:blank';
}

/* ─────────────────────────────────────────
   AUTO-FETCH DE SERVIDORES (Consumet API)
───────────────────────────────────────── */
async function fetchServidoresAuto(item, epIndex) {
  const loading = document.getElementById('iframe-loading');
  const errorEl = document.getElementById('server-error');
  loading.style.display = 'flex';
  errorEl.style.display = 'none';
  mostrarToast('🔍 Buscando servidor automático...', 3000);

  // Solo funciona para anime con gogo_id
  if (item.tipo !== 'anime' || !item.gogo_id) {
    loading.style.display = 'none';
    mostrarSinServidor();
    return;
  }

  try {
    // Paso 1: obtener lista de episodios del anime
    const infoRes = await fetch(
      `${CONFIG.consumet}/anime/gogoanime/info?id=${encodeURIComponent(item.gogo_id)}`,
      { signal: AbortSignal.timeout(10000) }
    );
    if (!infoRes.ok) throw new Error('info fail');
    const info = await infoRes.json();
    const ep = (info.episodes || [])[epIndex];
    if (!ep?.id) throw new Error('no ep');

    // Paso 2: obtener streams del episodio
    const streamRes = await fetch(
      `${CONFIG.consumet}/anime/gogoanime/watch?episodeId=${encodeURIComponent(ep.id)}`,
      { signal: AbortSignal.timeout(10000) }
    );
    if (!streamRes.ok) throw new Error('stream fail');
    const stream = await streamRes.json();
    const sources = (stream.sources || []).filter(s => s.url);
    if (!sources.length) throw new Error('no sources');

    // Éxito — guardar en el item y reproducir
    const servidores = sources.map(s => ({
      nombre: `Auto ${s.quality || 'HD'}`,
      url: s.url,
      tipo: 'hls',
    }));
    // Guardar en cache del episodio para no volver a buscar
    if (item.episodios?.[epIndex]) item.episodios[epIndex].servidores = servidores;
    loading.style.display = 'none';
    renderServerBtns(servidores);
    mostrarToast('✅ Servidor encontrado automáticamente', 2000);
    cargarServidor(servidores, 0);

  } catch(e) {
    console.warn('Auto-fetch falló:', e);
    loading.style.display = 'none';
    mostrarSinServidor();
    mostrarToast('⚠️ Sin servidor disponible. Contacta a Charly.', 4000);
  }
}

function intentarSiguienteServidor() {
  const item = STATE.contenidoActual;
  if (!item) return;
  const ep = item.episodios?.[STATE.episodioActual];
  const srvs = ep?.servidores || item.servidores || [];
  const next = STATE.servidorActual + 1;
  if (next < srvs.length) { seleccionarServidor(next); }
  else { mostrarToast('❌ No hay más servidores disponibles.', 3000); }
}

function limpiarPlayer() {
  const iframeEl = document.getElementById('player-iframe');
  const videoEl = document.getElementById('player-video');
  if (iframeEl) iframeEl.src = 'about:blank';
  if (videoEl) { videoEl.pause(); videoEl.src = ''; }
}

function renderSidebarEpisodios(item, epActivo) {
  const lista = document.getElementById('episodes-list');
  if (!lista) return;
  if (!item.episodios || item.episodios.length <= 1) { lista.innerHTML = ''; return; }
  const vistos = JSON.parse(localStorage.getItem('cs_vistos_' + item.id) || '[]');
  lista.innerHTML = `<div class="sidebar-ep-grid">${
    item.episodios.map((ep, i) => {
      const activo = i === epActivo;
      const visto = vistos.includes(i);
      return `<div class="sidebar-ep-cell ${activo?'active':''} ${visto&&!activo?'visto':''}" onclick="cambiarAlEpisodio(${i})" title="Episodio ${ep.num}">${ep.num}</div>`;
    }).join('')
  }</div>`;
  // scroll al activo
  setTimeout(() => {
    const el = lista.querySelector('.sidebar-ep-cell.active');
    if (el) el.scrollIntoView({block:'nearest'});
  }, 100);
}

function cambiarAlEpisodio(index) {
  reproducirEpisodio(STATE.contenidoActual, index, 0);
}

function cambiarEpisodio(dir) {
  const item = STATE.contenidoActual;
  if (!item) return;
  const next = STATE.episodioActual + dir;
  if (next >= 0 && next < (item.episodios?.length || 1)) {
    reproducirEpisodio(item, next, 0);
  }
}

/* ─────────────────────────────────────────
   SIGUIENTE EPISODIO AUTOMÁTICO
───────────────────────────────────────── */
function iniciarCountdown() {
  const item = STATE.contenidoActual;
  if (!item?.episodios || STATE.episodioActual >= item.episodios.length - 1) return;
  STATE.countdownSec = 10;
  const box = document.getElementById('next-ep-countdown');
  box.style.display = 'flex';
  document.getElementById('countdown-num').textContent = STATE.countdownSec;
  clearInterval(STATE.countdownTimer);
  STATE.countdownTimer = setInterval(() => {
    STATE.countdownSec--;
    document.getElementById('countdown-num').textContent = STATE.countdownSec;
    if (STATE.countdownSec <= 0) { clearInterval(STATE.countdownTimer); reproducirSiguienteEpisodio(); }
  }, 1000);
}

function cancelarCountdown() {
  clearInterval(STATE.countdownTimer);
  const box = document.getElementById('next-ep-countdown');
  if (box) box.style.display = 'none';
}

function reproducirSiguienteEpisodio() {
  cancelarCountdown();
  cambiarEpisodio(1);
}

/* ─────────────────────────────────────────
   BÚSQUEDA
───────────────────────────────────────── */
function buscar(termino) {
  const sec = document.getElementById('search-results');
  const grid = document.getElementById('search-grid');
  const term = document.getElementById('search-term');
  const secciones = ['sec-continuar','sec-top10','sec-anime','sec-doramas','sec-peliculas','sec-dormir','sec-superacion'];
  if (!termino.trim()) {
    sec.style.display = 'none';
    secciones.forEach(s => { const e = document.getElementById(s); if(e) e.style.display = 'block'; });
    return;
  }
  secciones.forEach(s => { const e = document.getElementById(s); if(e) e.style.display = 'none'; });
  sec.style.display = 'block';
  term.textContent = termino;
  const q = termino.toLowerCase();
  const res = STATE.todosLosItems.filter(x =>
    x.titulo?.toLowerCase().includes(q) ||
    x.sinopsis?.toLowerCase().includes(q) ||
    x.generos?.some(g => g.toLowerCase().includes(q))
  );
  grid.innerHTML = res.length
    ? res.map(i => crearCardHTML(i)).join('')
    : '<p style="color:var(--text3);padding:24px;">No se encontraron resultados.</p>';
}

/* ─────────────────────────────────────────
   FILTROS
───────────────────────────────────────── */
function filtrar(tipo, btn) {
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  document.getElementById('search-results').style.display = 'none';
  document.getElementById('search-input').value = '';
  const todas = ['sec-continuar','sec-top10','sec-anime','sec-cdrama','sec-frutinovel','sec-doramas','sec-peliculas','sec-dormir','sec-superacion','sec-deportes','sec-musica','sec-tiktok'];
  const map = {
    todo: todas,
    anime: ['sec-anime'],
    dorama: ['sec-doramas','sec-cdrama','sec-frutinovel'],
    cdrama: ['sec-cdrama'],
    frutinovel: ['sec-frutinovel'],
    pelicula: ['sec-peliculas'],
    dormir: ['sec-dormir'],
    superacion: ['sec-superacion'],
    deporte: ['sec-deportes'],
    musica: ['sec-musica'],
  };
  const show = map[tipo] || todas;
  todas.forEach(s => { const el = document.getElementById(s); if (el) el.style.display = show.includes(s) ? 'block' : 'none'; });
}

/* ─────────────────────────────────────────
   FAVORITOS
───────────────────────────────────────── */
function getFavoritos() { return JSON.parse(localStorage.getItem('cs_favs') || '[]'); }
function esFavorito(id) { return getFavoritos().includes(id); }

function toggleFavorito() {
  const item = STATE.contenidoActual;
  if (!item) return;
  let favs = getFavoritos();
  if (favs.includes(item.id)) {
    favs = favs.filter(x => x !== item.id);
    mostrarToast('🤍 Eliminado de favoritos', 2000);
  } else {
    favs.unshift(item.id);
    mostrarToast('❤️ Agregado a favoritos', 2000);
  }
  localStorage.setItem('cs_favs', JSON.stringify(favs));
  // Actualizar botones
  const detBtn = document.getElementById('detail-fav-btn');
  if (detBtn) { detBtn.classList.toggle('active', esFavorito(item.id)); detBtn.textContent = esFavorito(item.id) ? '❤️ En Favoritos' : '🤍 Favorito'; }
  const plrBtn = document.getElementById('btn-fav-player');
  if (plrBtn) { plrBtn.classList.toggle('active', esFavorito(item.id)); plrBtn.textContent = esFavorito(item.id) ? '❤️' : '🤍'; }
  const card = document.getElementById('card-' + item.id);
  if (card) { const fav = card.querySelector('.card-fav'); if(fav){fav.classList.toggle('active',esFavorito(item.id));fav.textContent=esFavorito(item.id)?'❤️':'🤍';} }
}

function toggleFavoritoCard(e, id) {
  e.stopPropagation();
  const prev = STATE.contenidoActual;
  STATE.contenidoActual = getItemById(id);
  toggleFavorito();
  STATE.contenidoActual = prev;
}

function toggleFavoritesView() {
  STATE.favoritosView = !STATE.favoritosView;
  const favSec = document.getElementById('fav-section');
  const secciones = ['sec-continuar','sec-top10','sec-anime','sec-doramas','sec-peliculas','sec-dormir','sec-superacion'];
  if (STATE.favoritosView) {
    favSec.style.display = 'block';
    secciones.forEach(s => { const e=document.getElementById(s); if(e) e.style.display='none'; });
    const favs = getFavoritos();
    const items = favs.map(id => getItemById(id)).filter(Boolean);
    const grid = document.getElementById('fav-grid');
    const empty = document.getElementById('fav-empty');
    grid.innerHTML = items.map(i => crearCardHTML(i)).join('');
    empty.style.display = items.length ? 'none' : 'block';
  } else {
    favSec.style.display = 'none';
    secciones.forEach(s => { const e=document.getElementById(s); if(e) e.style.display='block'; });
  }
}

/* ─────────────────────────────────────────
   HISTORIAL Y PROGRESO
───────────────────────────────────────── */
function guardarHistorial(id) {
  let h = JSON.parse(localStorage.getItem('cs_historial') || '[]');
  h = [id, ...h.filter(x => x !== id)].slice(0, 12);
  localStorage.setItem('cs_historial', JSON.stringify(h));
}

function getProgreso(id) {
  const prog = JSON.parse(localStorage.getItem('cs_progress') || '{}');
  return prog[id] || 0;
}

/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
function mostrarToast(msg, dur) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show','success');
  setTimeout(() => t.classList.remove('show','success'), dur || 3000);
}

/* ─────────────────────────────────────────
   SERVICE WORKER
───────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  crearParticulas();
  verificarSesionAlInicio();
  const input = document.getElementById('input-codigo');
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') ingresarConCodigo(); });
});

/* ─────────────────────────────────────────
   TIKTOK TRENDING SECTION
───────────────────────────────────────── */
function renderTikTokSection() {
  const main = document.getElementById('catalog-main');
  if (!main || !window.TIKTOK_TRENDING) return;

  // Agregar items al catálogo total
  TIKTOK_TRENDING.forEach(item => {
    if (!STATE.todosLosItems.find(x => x.id === item.id)) {
      STATE.todosLosItems.push(item);
    }
  });

  // Crear sección si no existe
  let sec = document.getElementById('sec-tiktok');
  if (!sec) {
    sec = document.createElement('div');
    sec.id = 'sec-tiktok';
    sec.className = 'section-row tiktok-section';
    // Insertar antes del Top10
    const top10 = document.getElementById('sec-top10');
    if (top10) main.insertBefore(sec, top10);
    else main.prepend(sec);
  }

  sec.innerHTML = `
<div class="tiktok-header">
  <div class="tiktok-title-wrap">
    <span class="tiktok-logo">🎵</span>
    <span class="tiktok-section-title">🔥 Viral en TikTok</span>
  </div>
  <div class="tiktok-live-badge">
    <span class="tiktok-live-dot"></span>TRENDING
  </div>
</div>
<div class="tiktok-row" id="tiktok-row">
  ${TIKTOK_TRENDING.map(item => crearTikTokCard(item)).join('')}
</div>`;
}

function crearTikTokCard(item) {
  const tipoLabel = item.tipo === 'anime' ? '🎌' : '🏯';
  return `
<div class="tiktok-card" onclick="abrirDetalle('${item.id}')">
  <img class="tiktok-poster" src="${item.poster}" alt="${item.titulo}"
    loading="lazy" onerror="this.src='https://via.placeholder.com/180x260/1a1a24/e50914?text=${encodeURIComponent(item.titulo?.substring(0,12)||'')}'" >
  <div class="tiktok-overlay"></div>
  <div class="tiktok-badge">🎵 TOP TIKTOK</div>
  <div class="tiktok-views">👁 ${item.views}</div>
  <div class="tiktok-info">
    <div class="tiktok-card-title">${tipoLabel} ${item.titulo}</div>
    <span class="tiktok-tag">${item.tiktok_tag}</span>
    <button class="tiktok-play-btn" onclick="event.stopPropagation();abrirDetalle('${item.id}')">
      <span>▶</span> Ver Ahora
    </button>
  </div>
</div>`;
}

/* ─────────────────────────────────────────
   ADMIN PANEL — Rastreo y estadísticas
───────────────────────────────────────── */
async function renderAdminPanel() {
  const main = document.getElementById('catalog-main');
  if (!main) return;

  let panel = document.getElementById('admin-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'admin-panel';
    panel.className = 'admin-panel';
    main.prepend(panel);
  }

  const visitas = await obtenerVisitas();
  const sesionesHoy = JSON.parse(localStorage.getItem('cs_admin_sessions') || '[]');
  const codigosUsados = new Set(sesionesHoy.map(s => s.codigo)).size;

  panel.innerHTML = `
<div class="admin-panel-title">👑 Panel Administrador — Charly Stream</div>
<div class="admin-stats-grid">
  <div class="admin-stat-card highlight">
    <div class="admin-stat-num" id="admin-visitas">${visitas}</div>
    <div class="admin-stat-label">👁 Visitas Totales</div>
  </div>
  <div class="admin-stat-card">
    <div class="admin-stat-num">${ADMIN_CONFIG.totalCodigos}</div>
    <div class="admin-stat-label">🔑 Códigos Totales</div>
  </div>
  <div class="admin-stat-card">
    <div class="admin-stat-num">${ADMIN_CONFIG.codigosPrueba}</div>
    <div class="admin-stat-label">🎁 Códigos Gratis</div>
  </div>
  <div class="admin-stat-card">
    <div class="admin-stat-num">${ADMIN_CONFIG.codigosPremium}</div>
    <div class="admin-stat-label">⭐ Códigos VIP</div>
  </div>
  <div class="admin-stat-card">
    <div class="admin-stat-num">${codigosUsados}</div>
    <div class="admin-stat-label">✅ Usados hoy</div>
  </div>
</div>
<div class="admin-codes-list">
  ${CODIGOS_ACCESO.map(c => `
  <div class="admin-code-row">
    <code>${c.codigo}</code>
    <span>${c.dias} días</span>
    <span class="admin-code-badge ${c.tipo}">${c.tipo.toUpperCase()}</span>
  </div>`).join('')}
</div>
<button class="admin-refresh-btn" onclick="refreshAdminStats()">🔄 Actualizar Stats</button>`;
}

async function obtenerVisitas() {
  try {
    const r = await fetch(`https://api.countapi.xyz/hit/${ADMIN_CONFIG.countapi_ns}/${ADMIN_CONFIG.countapi_key}`);
    const d = await r.json();
    return d.value || '—';
  } catch(e) { return '—'; }
}

async function refreshAdminStats() {
  const el = document.getElementById('admin-visitas');
  if (el) {
    el.textContent = '...';
    const v = await obtenerVisitas();
    el.textContent = v;
    mostrarToast('✅ Stats actualizados', 2000);
  }
}

/* ─────────────────────────────────────────
   TRACKING DE VISITAS
───────────────────────────────────────── */
function trackVisit() {
  // Registrar sesión local para el admin
  const sesion = STATE.sesion;
  if (!sesion) return;
  try {
    let sessions = JSON.parse(localStorage.getItem('cs_admin_sessions') || '[]');
    const today = new Date().toDateString();
    // Limpiar sesiones de más de 7 días
    sessions = sessions.filter(s => {
      const d = new Date(s.fecha);
      return (Date.now() - d.getTime()) < 7 * 86400000;
    });
    sessions.push({ codigo: sesion.codigo, tipo: sesion.tipo, fecha: new Date().toISOString() });
    localStorage.setItem('cs_admin_sessions', JSON.stringify(sessions));
  } catch(e) {}

  // Ping contador de visitas (no bloqueante)
  if (sesion.tipo !== 'admin') {
    fetch(`https://api.countapi.xyz/hit/${ADMIN_CONFIG.countapi_ns}/${ADMIN_CONFIG.countapi_key}`)
      .catch(() => {});
  }
}

/* ─────────────────────────────────────────
   REPRODUCTOR DE MÚSICA
───────────────────────────────────────── */
function musicPlay(index) {
  const lista = STATE.catalogoMusica;
  if (!lista || index < 0 || index >= lista.length) return;
  STATE.musicaIndex = index;
  STATE.musicaPlaying = true;
  const song = lista[index];
  // Actualizar barra
  const bar = document.getElementById('music-bar');
  if (bar) bar.style.display = 'flex';
  const el = id => document.getElementById(id);
  if (el('music-bar-title'))  el('music-bar-title').textContent  = song.titulo;
  if (el('music-bar-artist')) el('music-bar-artist').textContent = song.artista || '';
  if (el('music-bar-thumb'))  el('music-bar-thumb').src = song.poster || '';
  if (el('music-play-btn'))   el('music-play-btn').textContent = '⏸';
  // Reproducir en player principal
  reproducirEpisodio(song, 0, 0);
}

function musicPlayPause() {
  STATE.musicaPlaying = !STATE.musicaPlaying;
  const btn = document.getElementById('music-play-btn');
  if (btn) btn.textContent = STATE.musicaPlaying ? '⏸' : '▶';
  // Controlar iframe de YouTube es limitado, solo toggling UI
  mostrarToast(STATE.musicaPlaying ? '▶ Reproduciendo' : '⏸ Pausado', 1500);
}

function musicNext() {
  const next = (STATE.musicaIndex + 1) % (STATE.catalogoMusica?.length || 1);
  musicPlay(next);
}

function musicPrev() {
  const prev = STATE.musicaIndex > 0 ? STATE.musicaIndex - 1 : (STATE.catalogoMusica?.length || 1) - 1;
  musicPlay(prev);
}

function musicClose() {
  STATE.musicaPlaying = false;
  const bar = document.getElementById('music-bar');
  if (bar) bar.style.display = 'none';
  limpiarPlayer();
}

// Cuando se abre un item de música, la barra ya se activa dentro de abrirDetalle
// (Este bloque reemplaza el override roto que causaba bucle infinito)

/* ─────────────────────────────────────────
   MEMORIA DE REPRODUCCIÓN (Resume)
───────────────────────────────────────── */
function saveProgress(itemId, epIndex, seconds) {
  try {
    const prog = JSON.parse(localStorage.getItem('cs_resume') || '{}');
    prog[`${itemId}_${epIndex}`] = { t: Math.floor(seconds), saved: Date.now() };
    localStorage.setItem('cs_resume', JSON.stringify(prog));
  } catch(e) {}
}

function getResumeTime(itemId, epIndex) {
  try {
    const prog = JSON.parse(localStorage.getItem('cs_resume') || '{}');
    const entry = prog[`${itemId}_${epIndex}`];
    if (!entry) return 0;
    // Solo resumir si fue en los últimos 30 días
    if (Date.now() - entry.saved > 30 * 86400000) return 0;
    return entry.t || 0;
  } catch(e) { return 0; }
}

// Hook al video nativo HLS para guardar progreso cada 5 segundos
document.addEventListener('DOMContentLoaded', () => {
  const vid = document.getElementById('player-video');
  if (!vid) return;
  let saveInterval = null;
  vid.addEventListener('play', () => {
    saveInterval = setInterval(() => {
      if (!STATE.contenidoActual || vid.paused) return;
      saveProgress(STATE.contenidoActual.id, STATE.episodioActual, vid.currentTime);
      // Actualizar barra de progreso en la card
      const duracion = vid.duration || 1;
      const pct = Math.round((vid.currentTime / duracion) * 100);
      if (STATE.contenidoActual.id) {
        const prog = JSON.parse(localStorage.getItem('cs_progress') || '{}');
        prog[STATE.contenidoActual.id] = pct;
        localStorage.setItem('cs_progress', JSON.stringify(prog));
      }
    }, 5000);
  });
  vid.addEventListener('pause', () => clearInterval(saveInterval));
  vid.addEventListener('ended', () => { clearInterval(saveInterval); reproducirSiguienteEpisodio(); });
  // Restaurar posición al cargar
  vid.addEventListener('loadedmetadata', () => {
    if (!STATE.contenidoActual) return;
    const t = getResumeTime(STATE.contenidoActual.id, STATE.episodioActual);
    if (t > 10) {
      vid.currentTime = t;
      mostrarToast(`▶ Continuando desde ${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`, 3000);
    }
  });
});

