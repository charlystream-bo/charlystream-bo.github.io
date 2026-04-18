// ==========================================================
// CHARLY STREAM - app.js
// ==========================================================

/* --- Estado global --- */
let contenidoActual = null;
let episodioActual = 0;
let filtroActivo = 'todo';

/* ==========================================================
   PARTÍCULAS LOGIN
========================================================== */
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

/* ==========================================================
   SISTEMA DE ACCESO
========================================================== */
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

    // Código válido - guardar sesión
    const expira = Date.now() + found.dias * 24 * 60 * 60 * 1000;
    const sesion = { codigo: raw, dias: found.dias, tipo: found.tipo, expira: expira };
    localStorage.setItem('cs_sesion', JSON.stringify(sesion));
    abrirCatalogo(sesion);
}
