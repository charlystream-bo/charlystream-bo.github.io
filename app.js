// ============================================================
// CHARLY STREAM — app.js
// ============================================================

/* ── Estado global ── */
let contenidoActual = null;
let episodioActual  = 0;
let filtroActivo    = 'todo';

/* ══════════════════════════════════
   PARTÍCULAS LOGIN
══════════════════════════════════ */
function crearParticulas() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*10+8}s;
      animation-delay:${Math.random()*8}s;
      background:${Math.random()>0.5?'#e50914':'#ff6b35'};
    `;
    c.appendChild(p);
  }
}

/* ══════════════════════════════════
   SISTEMA DE ACCESO
══════════════════════════════════ */
function ingresarConCodigo() {
  const raw = document.getElementById('input-codigo').value.trim().toUpperCase();
  const err = document.getElementById('form-error');
  err.classList.remove('show');

  if (!raw) { mostrarError('Ingresa un código de acceso.'); return; }

  const found = CODIGOS_ACCESO.find(c => c.codigo === raw);
  if (!found) { mostrarError('Código incorrecto. Contacta a Charly por WhatsApp.'); return; }

  // Verificar si ya está guardado y expirado
  const guardado = JSON.parse(localStorage.getItem('cs_sesion') || 'null');
  if (guardado && guardado.codigo === raw) {
    if (Date.now() > guardado.expira) {
      mostrarModalExpiry(); return;
    }
    abrirCatalogo(guardado); return;
  }

  // Código válido → guardar sesión
  const expira = Date.now() + found.dias * 24 * 60 * 60 * 1000;
  const sesion = { codigo: raw, dias: found.dias, tipo: found.tipo, expira, activado: Date.now() };
  localStorage.setItem('cs_sesion', JSON.stringify(sesion));
  abrirCatalogo(sesion);
}

function mostrarPrueba() {
  const sesion = JSON.parse(localStorage.getItem('cs_sesion') || 'null');
  if (sesion && Date.now() < sesion.expira) { abrirCatalogo(sesion); return; }
  mostrarToast('📩 Escríbele a Charly por WhatsApp para recibir tu código gratis 🎁', 4000);
  setTimeout(() => {
    window.open('https://wa.me/59165657865?text=Hola%20Charly%2C%20quiero%20mis%207%20d%C3%ADas%20gratis%20de%20Charly%20Stream%20%F0%9F%8E%8C', '_blank');
  }, 1200);
}

function verificarSesionAlInicio() {
  const sesion = JSON.parse(localStorage.getItem('cs_sesion') || 'null');
  if (!sesion) return;
  if (Date.now() > sesion.expira) { mostrarModalExpiry(); return; }
  abrirCatalogo(sesion);
}

function cerrarSesion() {
  localStorage.removeItem('cs_sesion');
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

/* ══════════════════════════════════
   NAVEGACIÓN DE PÁGINAS
══════════════════════════════════ */
function mostrarPagina(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById(id);
  if (pg) { pg.classList.add('active'); window.scrollTo(0, 0); }
}

function irACatalogo() {
  mostrarPagina('page-catalog');
}

/* ══════════════════════════════════
   ABRIR CATÁLOGO
══════════════════════════════════ */
function abrirCatalogo(sesion) {
  mostrarPagina('page-catalog');
  renderizarCatalogo();
  actualizarNavDias(sesion);
  contarVisita();
}

function actualizarNavDias(sesion) {
  const el = document.getElementById('nav-dias');
  if (!el || !sesion) return;
  const diasRestantes = Math.max(0, Math.ceil((sesion.expira - Date.now()) / 86400000));
  if (sesion.tipo === 'admin') { el.textContent = '👑 Admin'; return; }
  el.textContent = diasRestantes <= 3
    ? `⚠️ ${diasRestantes} día(s) restante(s)`
    : `✅ ${diasRestantes} días restantes`;
  el.style.color = diasRestantes <= 3 ? '#ff6b35' : '#a0a0b8';
}

/* ══════════════════════════════════
   RENDERIZAR CATÁLOGO
══════════════════════════════════ */
function renderizarCatalogo() {
  const todo = [...CHARLY_DATA.anime, ...CHARLY_DATA.doramas, ...CHARLY_DATA.peliculas];

  // Hero con el item de mayor rating
  const destacado = todo.sort((a,b) => b.rating - a.rating)[0];
  renderHero(destacado);

  // Grids por sección
  renderGrid('grid-anime',     CHARLY_DATA.anime);
  renderGrid('grid-doramas',   CHARLY_DATA.doramas);
  renderGrid('grid-peliculas', CHARLY_DATA.peliculas);

  // Continuar viendo
  renderContinuar();
}

function renderHero(item) {
  if (!item) return;
  contenidoActual = item;
  document.getElementById('hero-img').src     = item.banner || item.poster;
  document.getElementById('hero-img').alt     = item.titulo;
  document.getElementById('hero-title').textContent  = item.titulo;
  document.getElementById('hero-rating').textContent = '⭐ ' + item.rating;
  document.getElementById('hero-year').textContent   = item.año;
  document.getElementById('hero-audio').textContent  = item.audio;
  document.getElementById('hero-status').textContent = item.estado;
  document.getElementById('hero-desc').textContent   = item.sinopsis;
}

function renderGrid(containerId, items) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = items.map(item => crearCardHTML(item)).join('');
}

function crearCardHTML(item) {
  const audioClass = item.audio.toLowerCase().includes('latino') ? 'latino' : 'subs';
  const audioLabel = item.audio.toLowerCase().includes('latino') ? '🎤 Latino' : '💬 Subs';
  const badge = item.estado === 'En Emisión' ? '<span class="card-badge">EN VIVO</span>' : '';
  return `
    <div class="card" onclick="abrirContenido('${item.id}')" id="card-${item.id}">
      ${badge}
      <img class="card-poster" src="${item.poster}" alt="${item.titulo}" loading="lazy">
      <div class="card-overlay">
        <div class="card-play-btn">▶</div>
      </div>
      <div class="card-info">
        <div class="card-title">${item.titulo}</div>
        <div class="card-meta">
          <span class="card-audio ${audioClass}">${audioLabel}</span>
          <span class="card-rating">⭐ ${item.rating}</span>
        </div>
      </div>
    </div>`;
}

function renderContinuar() {
  const historial = JSON.parse(localStorage.getItem('cs_historial') || '[]');
  const sec = document.getElementById('section-continuar');
  const grid = document.getElementById('grid-continuar');
  if (!historial.length || !sec || !grid) { if(sec) sec.style.display='none'; return; }
  sec.style.display = 'block';
  const todo = [...CHARLY_DATA.anime, ...CHARLY_DATA.doramas, ...CHARLY_DATA.peliculas];
  const items = historial.map(id => todo.find(x => x.id === id)).filter(Boolean);
  grid.innerHTML = items.map(i => crearCardHTML(i)).join('');
}

/* ══════════════════════════════════
   ABRIR CONTENIDO / REPRODUCTOR
══════════════════════════════════ */
function abrirContenido(id) {
  const todo = [...CHARLY_DATA.anime, ...CHARLY_DATA.doramas, ...CHARLY_DATA.peliculas];
  const item = todo.find(x => x.id === id);
  if (!item) return;
  contenidoActual = item;
  episodioActual  = 0;
  guardarEnHistorial(id);
  reproducirEpisodio(item, 0);
}

function reproducirDestacado() {
  if (!contenidoActual) return;
  abrirContenido(contenidoActual.id);
}

function verInfo() {
  if (!contenidoActual) return;
  mostrarToast(`📺 ${contenidoActual.titulo} — ${contenidoActual.totalEpisodios || 1} episodio(s)`, 3000);
}

function reproducirEpisodio(item, epIndex) {
  const ep = item.episodios[epIndex];
  if (!ep) return;
  episodioActual = epIndex;
  mostrarPagina('page-player');

  document.getElementById('player-show-title').textContent = item.titulo;
  document.getElementById('player-ep-info').textContent =
    item.tipo === 'pelicula'
      ? `🎬 Película • ${ep.duracion}`
      : `Episodio ${ep.num}: ${ep.titulo} • ${ep.duracion}`;
  document.getElementById('player-desc').textContent = item.sinopsis;
  document.getElementById('player-iframe').src = ep.video;
  document.getElementById('btn-download-ep').href = ep.descarga || '#';

  const btnNext = document.getElementById('btn-next-ep');
  btnNext.style.display = epIndex < item.episodios.length - 1 ? 'flex' : 'none';

  renderEpisodeList(item, epIndex);
}

function siguienteEpisodio() {
  if (!contenidoActual) return;
  const next = episodioActual + 1;
  if (next < contenidoActual.episodios.length) {
    reproducirEpisodio(contenidoActual, next);
  }
}

function renderEpisodeList(item, epActivo) {
  const lista = document.getElementById('episodes-list');
  if (!lista) return;
  lista.innerHTML = item.episodios.map((ep, i) => `
    <div class="ep-item ${i === epActivo ? 'active' : ''}" onclick="reproducirEpisodio(contenidoActual,${i})">
      <div class="ep-num">${ep.num}</div>
      <div class="ep-info">
        <div class="ep-title">${ep.titulo}</div>
        <div class="ep-dur">${ep.duracion}</div>
      </div>
      <span class="ep-play-icon">▶</span>
    </div>`).join('');
}

/* ══════════════════════════════════
   BÚSQUEDA
══════════════════════════════════ */
function buscar(termino) {
  const sec     = document.getElementById('search-results');
  const termEl  = document.getElementById('search-term');
  const grid    = document.getElementById('search-grid');
  const secciones = ['section-anime','section-doramas','section-peliculas','section-continuar'];

  if (!termino.trim()) {
    sec.style.display = 'none';
    secciones.forEach(s => { const el = document.getElementById(s); if(el) el.style.display='block'; });
    return;
  }

  secciones.forEach(s => { const el = document.getElementById(s); if(el) el.style.display='none'; });
  sec.style.display = 'block';
  termEl.textContent = termino;

  const todo = [...CHARLY_DATA.anime, ...CHARLY_DATA.doramas, ...CHARLY_DATA.peliculas];
  const q = termino.toLowerCase();
  const resultados = todo.filter(x =>
    x.titulo.toLowerCase().includes(q) ||
    x.sinopsis.toLowerCase().includes(q) ||
    x.generos.some(g => g.toLowerCase().includes(q))
  );

  grid.innerHTML = resultados.length
    ? resultados.map(i => crearCardHTML(i)).join('')
    : '<p style="color:var(--text3);padding:20px;">No se encontraron resultados.</p>';
}

/* ══════════════════════════════════
   FILTROS
══════════════════════════════════ */
function filtrar(tipo, btn) {
  filtroActivo = tipo;
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  const sec = document.getElementById('search-results');
  if (sec) sec.style.display = 'none';
  document.getElementById('search-input').value = '';

  const mapSec = {
    todo:     ['section-anime','section-doramas','section-peliculas'],
    anime:    ['section-anime'],
    dorama:   ['section-doramas'],
    pelicula: ['section-peliculas'],
    latino:   ['section-anime','section-doramas','section-peliculas'],
    subs:     ['section-anime','section-doramas','section-peliculas'],
  };

  ['section-anime','section-doramas','section-peliculas'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = (mapSec[tipo]||[]).includes(s) ? 'block' : 'none';
  });

  if (tipo === 'latino' || tipo === 'subs') {
    const todo = [...CHARLY_DATA.anime, ...CHARLY_DATA.doramas, ...CHARLY_DATA.peliculas];
    const filtrados = todo.filter(x =>
      tipo === 'latino'
        ? x.audio.toLowerCase().includes('latino')
        : x.audio.toLowerCase().includes('sub')
    );
    ['grid-anime','grid-doramas','grid-peliculas'].forEach(g => {
      const el = document.getElementById(g);
      if (el) el.innerHTML = filtrados.map(i => crearCardHTML(i)).join('');
    });
  } else {
    renderizarCatalogo();
  }
}

/* ══════════════════════════════════
   HISTORIAL (CONTINUAR VIENDO)
══════════════════════════════════ */
function guardarEnHistorial(id) {
  let h = JSON.parse(localStorage.getItem('cs_historial') || '[]');
  h = [id, ...h.filter(x => x !== id)].slice(0, 10);
  localStorage.setItem('cs_historial', JSON.stringify(h));
}

/* ══════════════════════════════════
   TOAST
══════════════════════════════════ */
function mostrarToast(msg, duracion = 3000) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show','success');
  setTimeout(() => t.classList.remove('show'), duracion);
}

/* ══════════════════════════════════
   CONTADOR DE VISITAS
══════════════════════════════════ */
function contarVisita() {
  let visitas = parseInt(localStorage.getItem('cs_visitas') || '0') + 1;
  localStorage.setItem('cs_visitas', visitas);
}

/* ══════════════════════════════════
   SERVICE WORKER (PWA)
══════════════════════════════════ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  crearParticulas();
  verificarSesionAlInicio();

  // Enter en input
  const input = document.getElementById('input-codigo');
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') ingresarConCodigo(); });
});
