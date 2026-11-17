/* =========================================================
   Equilibrio Climático C&M — Lógica de la página (v4)
   ---------------------------------------------------------
   DÓNDE SE EDITA CADA COSA
   • index.html → textos, servicios, paquetes y PRECIOS, mantenimiento,
     equipos, consejos y preguntas frecuentes (así Google los lee).
   • Este archivo (CONFIG y listas de abajo) → WhatsApp, redes, perfil de
     Google, horarios de la agenda, reglas del cotizador, galería, videos
     y reseñas.
   ========================================================= */
const CONFIG = {
  whatsapp: "529622845053",           // lada país (52) + 10 dígitos
  telefonoVisible: "962 284 5053",
  // Pega el enlace de cada red. Si queda vacío, el ícono no se muestra.
  redes: {
    facebook:  "https://www.facebook.com/",   // <-- CAMBIAR por tu página
    instagram: "https://www.instagram.com/",  // <-- CAMBIAR por tu perfil
    tiktok:    "https://www.tiktok.com/",     // <-- CAMBIAR por tu perfil
    youtube:   ""
  },
  // Perfil de Negocio de Google (Google Maps → tu negocio → Compartir → copiar enlace).
  // Al llenarlo aparece el botón "Ver nuestro perfil y reseñas" en Contacto.
  perfilGoogle: "",
  // Enlace para pedir reseñas (Perfil de Negocio → "Pedir reseñas" → copiar enlace).
  resenaGoogle: "",
  horarios: ["9:00", "11:00", "13:00", "16:00", "18:00"],
  diasLaborales: [1, 2, 3, 4, 5, 6],   // 0 = domingo
  mesesAdelante: 2,
  // Reglas del cotizador (los precios base se leen de la sección #paquetes del HTML)
  recargo2Ton: 150,                    // extra por equipo de 2 Ton o más (Básico y Completo)
  extraDesde4: 500                     // Completo: costo de cada equipo después del combo más grande
};

/* ---------------- Ilustraciones SVG ---------------- */
const C = { navy: "#0B1A7A", blue: "#1B3BE6", blue2: "#1229B8", ice: "#9DB2FF", orange: "#FF8A1F" };
const grid = (n, s) => Array.from({ length: n }, (_, i) => `<line x1="${i * s}" y1="0" x2="${i * s}" y2="400"/><line x1="0" y1="${i * s}" x2="600" y2="${i * s}"/>`).join("");
const ART = {
  evaporadora: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="ev1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#E3E8FF"/></linearGradient></defs>
  <rect x="30" y="60" width="340" height="110" rx="26" fill="url(#ev1)" stroke="#C9D1F2" stroke-width="2"/>
  <rect x="30" y="140" width="340" height="30" rx="14" fill="#D5DCF7"/>
  <g stroke="#B5C0EA" stroke-width="2">${Array.from({ length: 22 }, (_, i) => `<line x1="${60 + i * 13.5}" y1="146" x2="${60 + i * 13.5}" y2="164"/>`).join("")}</g>
  <rect x="290" y="82" width="54" height="12" rx="6" fill="${C.navy}"/><circle cx="300" cy="88" r="3" fill="#1EC48A"/>
  <text x="60" y="106" font-family="Plus Jakarta Sans,Arial" font-weight="800" font-size="22" fill="${C.navy}">24.0°</text>
  <g fill="none" stroke="${C.blue}" stroke-opacity=".55" stroke-width="4" stroke-linecap="round"><path d="M70 190 C 90 220, 60 245, 85 270"/><path d="M150 190 C 170 220, 140 245, 165 270"/><path d="M230 190 C 250 220, 220 245, 245 270"/><path d="M310 190 C 330 220, 300 245, 325 270"/></g>
  <g font-family="Inter,Arial" font-size="11" font-weight="700" fill="${C.blue}"><circle cx="110" cy="40" r="5" fill="${C.orange}"/><text x="120" y="44">Filtros</text><circle cx="230" cy="40" r="5" fill="${C.orange}"/><text x="240" y="44">Serpentín</text><circle cx="40" cy="200" r="5" fill="${C.orange}"/><text x="20" y="225">Turbina</text><circle cx="360" cy="200" r="5" fill="${C.orange}"/><text x="330" y="225">Drenaje</text></g></svg>`,
  condensadora: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="cd1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#DCE2FA"/></linearGradient></defs>
  <rect x="60" y="50" width="280" height="200" rx="18" fill="url(#cd1)" stroke="#C3CCEE" stroke-width="2"/>
  <circle cx="170" cy="150" r="78" fill="${C.navy}"/><circle cx="170" cy="150" r="70" fill="${C.blue2}"/>
  <g stroke="#3A55D8" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<line x1="${100 + i * 17.5}" y1="85" x2="${100 + i * 17.5}" y2="215"/>`).join("")}</g>
  <g transform="translate(170 150)"><g class="fan-spin">${[0, 120, 240].map(a => `<path transform="rotate(${a})" d="M0 0 C 18 -12, 46 -14, 56 -4 C 40 4, 18 8, 0 0Z" fill="${C.ice}"/>`).join("")}<circle r="9" fill="${C.orange}"/></g></g>
  <g stroke="#B5C0EA" stroke-width="2">${Array.from({ length: 10 }, (_, i) => `<line x1="268" y1="${78 + i * 15}" x2="322" y2="${78 + i * 15}"/>`).join("")}</g>
  <rect x="80" y="250" width="40" height="12" rx="3" fill="${C.navy}"/><rect x="280" y="250" width="40" height="12" rx="3" fill="${C.navy}"/>
  <g font-family="Inter,Arial" font-size="11" font-weight="700" fill="${C.blue}"><circle cx="300" cy="30" r="5" fill="${C.orange}"/><text x="250" y="34">Serpentín</text><circle cx="70" cy="30" r="5" fill="${C.orange}"/><text x="80" y="34">Presiones</text><circle cx="360" cy="150" r="5" fill="${C.orange}"/><text x="335" y="175">Amperaje</text></g></svg>`,
  split: `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="sp0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.blue}"/><stop offset="1" stop-color="${C.navy}"/></linearGradient></defs><rect width="600" height="400" fill="url(#sp0)"/><g stroke="rgba(255,255,255,.08)">${grid(18, 36)}</g><rect x="130" y="120" width="340" height="100" rx="24" fill="#F6F8FF"/><rect x="130" y="192" width="340" height="28" rx="12" fill="#D8DFF8"/><rect x="390" y="142" width="56" height="12" rx="6" fill="${C.navy}"/><circle cx="400" cy="148" r="3" fill="#1EC48A"/><g fill="none" stroke="#BFD0FF" stroke-width="5" stroke-linecap="round" opacity=".8"><path d="M180 240 q12 30 -6 60"/><path d="M250 240 q12 30 -6 60"/><path d="M320 240 q12 30 -6 60"/><path d="M390 240 q12 30 -6 60"/></g><circle cx="500" cy="80" r="28" fill="${C.orange}"/><path d="M490 80l7 7 13-14" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`,
  camara: `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="cm0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.blue2}"/><stop offset="1" stop-color="${C.navy}"/></linearGradient></defs><rect width="600" height="400" fill="url(#cm0)"/><g stroke="rgba(255,255,255,.07)">${grid(18, 36)}</g><rect x="180" y="60" width="240" height="290" rx="12" fill="#EEF1FF"/><rect x="196" y="76" width="208" height="258" rx="8" fill="#CBD4F5"/><rect x="380" y="180" width="10" height="60" rx="5" fill="${C.navy}"/><rect x="214" y="92" width="120" height="34" rx="8" fill="${C.navy}"/><text x="228" y="116" font-family="Plus Jakarta Sans,Arial" font-weight="800" font-size="19" fill="#BFD0FF">-18.0°C</text><g stroke="${C.blue}" stroke-width="4" stroke-linecap="round" opacity=".6"><path d="M260 210v56M232 238h56M240 218l40 40M280 218l-40 40"/></g><circle cx="480" cy="80" r="28" fill="${C.orange}"/><path d="M470 80l7 7 13-14" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`,
  instalacion: `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="in0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2E4FFF"/><stop offset="1" stop-color="${C.navy}"/></linearGradient></defs><rect width="600" height="400" fill="url(#in0)"/><g stroke="rgba(255,255,255,.08)">${grid(18, 36)}</g><rect x="60" y="70" width="260" height="76" rx="20" fill="#F6F8FF"/><rect x="60" y="124" width="260" height="22" rx="10" fill="#D8DFF8"/><path d="M300 146 v70 q0 20 20 20 h120 q20 0 20 20 v20" stroke="#E7B27A" stroke-width="8" fill="none"/><path d="M290 146 v80 q0 20 20 20 h120 q20 0 20 20 v10" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none"/><rect x="380" y="270" width="170" height="110" rx="12" fill="#EEF1FF"/><circle cx="440" cy="325" r="38" fill="${C.blue2}"/><circle cx="440" cy="325" r="10" fill="${C.orange}"/><g stroke="#B5C0EA" stroke-width="2">${Array.from({ length: 6 }, (_, i) => `<line x1="492" y1="${290 + i * 14}" x2="535" y2="${290 + i * 14}"/>`).join("")}</g></svg>`,
  producto: ton => `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="pr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#E8ECFB"/></linearGradient></defs><ellipse cx="200" cy="190" rx="150" ry="12" fill="rgba(11,26,122,.12)"/><rect x="40" y="50" width="320" height="110" rx="30" fill="url(#pr)" stroke="#CBD3F2" stroke-width="2"/><rect x="40" y="128" width="320" height="32" rx="14" fill="#D9DFF7"/><g stroke="#B8C3EC" stroke-width="2">${Array.from({ length: 24 }, (_, i) => `<line x1="${62 + i * 12.5}" y1="134" x2="${62 + i * 12.5}" y2="154"/>`).join("")}</g><rect x="270" y="74" width="62" height="14" rx="7" fill="${C.navy}"/><circle cx="281" cy="81" r="3.5" fill="#1EC48A"/><text x="64" y="98" font-family="Plus Jakarta Sans,Arial" font-weight="800" font-size="24" fill="${C.blue}">${ton} TON</text><text x="64" y="118" font-family="Inter,Arial" font-weight="600" font-size="12" fill="#6B76A6">INVERTER · R32</text></svg>`
};
// Cada ilustración insertada recibe ids únicos: así los degradados no chocan
// cuando la misma ilustración aparece varias veces (o dentro de un panel oculto).
let artUid = 0;
function art(name, arg) {
  const src = typeof ART[name] === "function" ? ART[name](arg) : ART[name];
  if (!src) return "";
  const n = ++artUid;
  return src.replace(/id="([^"]+)"/g, `id="$1-${n}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${n})`);
}
function coilSVG(dirty) {
  const fins = Array.from({ length: 40 }, (_, i) => `<rect x="${20 + i * 9.5}" y="20" width="4" height="210" rx="2" fill="${dirty ? "#9A8F7A" : "#C9D2EE"}"/>`).join("");
  const tubes = Array.from({ length: 6 }, (_, i) => `<rect x="12" y="${35 + i * 34}" width="376" height="9" rx="4.5" fill="${dirty ? "#7A5A3A" : "#E0954F"}"/>`).join("");
  let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const dust = dirty ? Array.from({ length: 150 }, () => `<circle cx="${(rnd() * 400).toFixed(0)}" cy="${(rnd() * 250).toFixed(0)}" r="${(rnd() * 7 + 2).toFixed(1)}" fill="rgba(${95 + rnd() * 40 | 0},${82 + rnd() * 30 | 0},60,.${5 + (rnd() * 4 | 0)})"/>`).join("") : "";
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="400" height="250" fill="${dirty ? "#5E5646" : "#EEF2FF"}"/>${fins}${tubes}${dust}${dirty ? "" : '<rect width="400" height="250" fill="url(#sh)"/>'}</svg>`;
}

/* ---------------- Contenido multimedia (se reemplaza al subir fotos y videos reales) ---------------- */
// Proyectos. Para agregar uno: sube la foto a /img (de preferencia .webp) y agrega una línea.
const GALLERY = [
  { type: "img", cat: "comercial", src: "img/portada.webp", title: "Mantenimiento a equipo tipo cassette", desc: "Local comercial · Limpieza de turbina, serpentín y revisión eléctrica." },
  { type: "img", cat: "mantenimiento", src: "img/g-ventilador.webp", title: "Turbina lista para lavado", desc: "Desarmado completo para eliminar hongo y mal olor." },
  { type: "img", cat: "mantenimiento", src: "img/g-tecnico.webp", title: "Revisión de conexiones", desc: "Tarjeta, sensores y terminales eléctricas." },
  { type: "art", cat: "instalacion", art: "instalacion", title: "Instalación de minisplit inverter", desc: "Vacío, prueba de fugas y puesta en marcha." },
  { type: "img", cat: "comercial", src: "img/g-techo.webp", title: "Equipos de plafón en negocio", desc: "Mantenimiento sin interrumpir la operación de tu local." },
  { type: "art", cat: "comercial", art: "camara", title: "Cámara de refrigeración", desc: "Revisión de temperatura, evaporador y compresor." },
  { type: "img", cat: "mantenimiento", src: "img/g-tarjeta.webp", title: "Diagnóstico de tarjeta electrónica", desc: "Detectamos la falla antes de cambiar piezas." },
  { type: "art", cat: "instalacion", art: "split", title: "Minisplit instalado y funcionando", desc: "Entrega con prueba de temperatura de salida." }
];

// Videos. src: "video/archivo.mp4" o "youtube:ID_DEL_VIDEO". Vacío = "próximamente".
const VIDEOS = [
  { poster: "img/reel-1.webp", src: "", dur: "0:45", title: "Lavado de minisplit con hidrolavadora", sub: "Mantenimiento Completo" },
  { poster: "img/reel-2.webp", src: "", dur: "0:30", title: "Limpieza de turbina anti-hongos", sub: "Paquete Premium" },
  { poster: "img/reel-3.webp", src: "", dur: "0:20", title: "Revisión de equipo tipo cassette", sub: "Servicio comercial" },
  { posterArt: "condensadora", src: "", dur: "0:15", title: "Prueba de aire después del servicio", sub: "10–14 °C de salida" },
  { posterArt: "instalacion", src: "", dur: "0:40", title: "Instalación paso a paso", sub: "Minisplit inverter" }
];

// Reseñas reales de tus clientes. Mientras esté vacío se muestra la invitación a dejar reseña.
const REVIEWS = [
  // { name: "Nombre del cliente", place: "Colonia", stars: 5, text: "Comentario del cliente." }
];

/* ---------------- Utilidades ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => "$" + n.toLocaleString("es-MX");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const CATS = { mantenimiento: "Mantenimiento", instalacion: "Instalación", comercial: "Comercial" };
const media = g => g.type === "img" ? `<img src="${g.src}" alt="${esc(g.title)}" loading="lazy" decoding="async">` : `<div class="g-art">${art(g.art)}</div>`;
const poster = v => v.poster ? `<img src="${v.poster}" alt="" loading="lazy" decoding="async">` : `<div class="g-art">${art(v.posterArt)}</div>`;

/* ---------------- WhatsApp / teléfono ----------------
   Los enlaces son <a> reales con href a wa.me y target="_blank": el navegador abre
   UNA sola pestaña (antes se abría la pestaña y además se redirigía la página). */
function hydrateLinks(root = document) {
  $$("a.js-wa", root).forEach(a => { a.href = waLink(a.dataset.msg || "Hola"); a.target = "_blank"; a.rel = "noopener"; });
  $$("a.js-call", root).forEach(a => (a.href = "tel:+" + CONFIG.whatsapp));
}
function setWaMsg(a, msg) { a.dataset.msg = msg; a.href = waLink(msg); }
function openWhatsApp(msg) {
  const url = waLink(msg);
  const w = window.open(url, "_blank");
  if (w) w.opener = null; else location.href = url;   // si el navegador bloquea la ventana, abre en la misma
}
function bindContact() {
  hydrateLinks();
  // Para enlaces insertados después (lightbox, reproductor): fija el href justo antes de que se abra.
  document.addEventListener("click", e => {
    const a = e.target.closest("a.js-wa");
    if (a) { a.href = waLink(a.dataset.msg || "Hola"); a.target = "_blank"; a.rel = "noopener"; }
  }, true);
}

/* ---------------- Render de lo que depende de CONFIG ---------------- */
function renderStatic() {
  // Ilustraciones SVG (servicios, mantenimiento, equipos)
  $$("[data-art]").forEach(el => (el.innerHTML = art(el.dataset.art, el.dataset.ton)));
  // Marquesina de marcas: duplica la lista (oculta a lectores de pantalla) para el giro continuo
  const track = $("#brandsTrack");
  track.insertAdjacentHTML("beforeend", track.innerHTML.replace(/<span>/g, '<span aria-hidden="true">'));
  // Redes, teléfono, perfil de Google
  const map = { facebook: ["i-fb", "Facebook"], instagram: ["i-ig", "Instagram"], tiktok: ["i-tt", "TikTok"], youtube: ["i-yt", "YouTube"] };
  const soc = Object.entries(CONFIG.redes).filter(([, u]) => u).map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${map[k][1]}"><svg class="i" aria-hidden="true"><use href="#${map[k][0]}"/></svg></a>`).join("");
  $$(".js-socials").forEach(el => (el.innerHTML = soc));
  $$(".js-phone").forEach(el => (el.textContent = CONFIG.telefonoVisible));
  $$(".js-gbp").forEach(el => { if (CONFIG.perfilGoogle) { el.href = CONFIG.perfilGoogle; el.hidden = false; } });
  // Reseñas
  $("#reviews").innerHTML = REVIEWS.length ? REVIEWS.map(r => `
    <article class="rev reveal"><div class="rev__stars" role="img" aria-label="${r.stars} de 5 estrellas">${"★".repeat(r.stars)}</div><p>“${esc(r.text)}”</p>
      <div class="rev__who"><span class="rev__av" aria-hidden="true">${esc(r.name[0])}</span><div><b>${esc(r.name)}</b><small>${esc(r.place)}</small></div></div></article>`).join("")
    : `<div class="rev-empty reveal"><span class="rev-empty__g" aria-hidden="true"><svg class="i"><use href="#i-google"/></svg></span>
        <div><h3>¿Ya te atendimos? Tu opinión nos ayuda a crecer</h3><p>Déjanos tu reseña en Google y ayuda a más familias y negocios de Aguascalientes a elegir con confianza.</p></div>
        ${CONFIG.resenaGoogle
          ? `<a href="${CONFIG.resenaGoogle}" class="btn btn--orange" target="_blank" rel="noopener">Dejar mi reseña <i class="arr" aria-hidden="true">→</i></a>`
          : `<a href="#" class="btn btn--orange js-wa" data-msg="Hola, quiero dejar mi reseña de su servicio.">Dejar mi reseña <i class="arr" aria-hidden="true">→</i></a>`}</div>`;
}

/* ---------------- Pestañas accesibles (flechas, Inicio, Fin) ---------------- */
function bindTabs(list, onChange) {
  const tabs = $$('[role="tab"]', list);
  const select = (t, focus) => {
    tabs.forEach(x => {
      const on = x === t;
      x.classList.toggle("is-active", on);
      x.setAttribute("aria-selected", on);
      x.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(x.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
    if (focus) t.focus();
    if (onChange) onChange(t);
  };
  list.addEventListener("click", e => { const t = e.target.closest('[role="tab"]'); if (t) select(t); });
  list.addEventListener("keydown", e => {
    const i = tabs.indexOf(document.activeElement); if (i < 0) return;
    const next = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
    if (next !== undefined) { e.preventDefault(); select(tabs[next], true); }
  });
  select(tabs.find(t => t.getAttribute("aria-selected") === "true") || tabs[0]);
}

/* ---------------- Servicios: carrusel ----------------
   Avanza solo cada 4.5 s, pero se pausa si el carrusel no está en pantalla, si la pestaña
   está oculta o si el cursor/foco está encima; se detiene al tocarlo o usar las flechas,
   y no se mueve si el usuario pidió reducir el movimiento. */
function bindServices() {
  const track = $("#servicesTrack"), cards = $$(".svc", track), dots = $("#svcDots");
  dots.innerHTML = cards.map((c, i) => `<button type="button" aria-label="Ir a ${esc($("h3", c).textContent)}" data-i="${i}"></button>`).join("");
  const step = () => (cards[0]?.offsetWidth || 300) + 22;
  const sync = () => {
    const i = Math.min(Math.round(track.scrollLeft / step()), cards.length - 1);
    $$("button", dots).forEach((d, k) => { d.classList.toggle("is-on", k === i); d.toggleAttribute("aria-current", k === i); });
  };
  let inView = !("IntersectionObserver" in window), hovering = false, stopped = reduceMotion;
  const stop = () => (stopped = true);
  track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
  dots.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { stop(); track.scrollTo({ left: +b.dataset.i * step() }); } });
  $("#svcPrev").addEventListener("click", () => { stop(); track.scrollBy({ left: -step() }); });
  $("#svcNext").addEventListener("click", () => { stop(); track.scrollBy({ left: step() }); });
  ["pointerenter", "focusin"].forEach(ev => track.addEventListener(ev, () => (hovering = true)));
  ["pointerleave", "focusout"].forEach(ev => track.addEventListener(ev, () => (hovering = false)));
  ["touchstart", "wheel"].forEach(ev => track.addEventListener(ev, stop, { once: true, passive: true }));
  if (!inView) new IntersectionObserver(([en]) => (inView = en.isIntersecting), { threshold: .3 }).observe(track);
  setInterval(() => {
    if (stopped || hovering || !inView || document.hidden) return;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) track.scrollTo({ left: 0 }); else track.scrollBy({ left: step() });
  }, 4500);
  sync();
}

/* ---------------- Cotizador + calculadora ---------------- */
// Precios leídos de la sección #paquetes (fuente única: lo que ve el cliente es lo que cobra el cotizador).
const PRICING = {
  plans: $$(".plan[data-plan]").map(p => ({ id: p.dataset.plan, name: p.dataset.name, price: +p.dataset.price, multi: +p.dataset.priceMulti || 0 })),
  combos: Object.fromEntries($$('.combo[data-plan="completo"][data-qty]').map(c => [+c.dataset.qty, +c.dataset.price]))
};
const quote = { plan: "completo", qty: 1, cap: 1 };
function comboPrice(p, qty) {
  if (qty === 1) return p.price;
  if (PRICING.combos[qty]) return PRICING.combos[qty];
  const smaller = Object.keys(PRICING.combos).map(Number).filter(k => k < qty);
  if (!smaller.length) return p.price * qty;
  const k = Math.max(...smaller);
  return PRICING.combos[k] + (qty - k) * CONFIG.extraDesde4;
}
function calcQuote() {
  const { qty, cap } = quote, p = PRICING.plans.find(x => x.id === quote.plan);
  const extra = cap === 2 ? CONFIG.recargo2Ton : 0;
  let total, note;
  if (p.id === "completo") {
    total = comboPrice(p, qty) + extra * qty;
    note = qty >= 2 ? `Precio combo de ${qty} equipos` : `Precio por equipo: ${money(p.price)}`;
  } else if (p.multi) {                       // Premium: precio especial desde 2 equipos, ya cubre 2 Ton
    const u = qty >= 2 ? p.multi : p.price; total = u * qty; note = `Precio por equipo: ${money(u)}`;
  } else {
    const u = p.price + extra; total = u * qty; note = `Precio por equipo: ${money(u)}`;
  }
  if (cap === 2 && !p.multi) note += " · incluye ajuste por 2 Ton";
  $("#qTotal").textContent = money(total); $("#qNote").textContent = note; $("#qQty").textContent = qty;
  setWaMsg($("#qWa"), `Hola, quiero el paquete ${p.name} para ${qty} equipo(s) de ${cap === 2 ? "2 Ton o más" : "1–1.5 Ton"}. Total estimado: ${money(total)}.`);
}
function calcBtu() {
  const m2 = +$("#bM2").value, ppl = +$("#bPpl").value;
  const btu = m2 * 650 * +$("#bType").value * +$("#bSun").value + Math.max(0, ppl - 2) * 600;
  const sizes = [1, 1.5, 2, 3, 4, 5]; const ton = sizes.find(s => s * 12000 >= btu) || 5;
  $("#bM2Val").textContent = `${m2} m²`; $("#bPplVal").textContent = ppl;
  $("#bM2").setAttribute("aria-valuetext", `${m2} metros cuadrados`);
  $("#bTon").textContent = `${ton} Ton`; $("#bBtu").textContent = `≈ ${Math.round(btu).toLocaleString("es-MX")} BTU/h necesarios · equipo de ${(ton * 12000).toLocaleString("es-MX")} BTU`;
  setWaMsg($("#bWa"), `Hola, necesito un minisplit para un espacio de ${m2} m² (${$("#bType").selectedOptions[0].text}). La calculadora me recomienda ${ton} Ton. ¿Me cotizan el equipo con instalación?`);
}
function bindTools() {
  const sel = $("#qPlan");
  sel.innerHTML = PRICING.plans.map(p => `<option value="${p.id}" ${p.id === quote.plan ? "selected" : ""}>${esc(p.name)} — ${money(p.price)}</option>`).join("");
  sel.addEventListener("change", () => { quote.plan = sel.value; calcQuote(); });
  $$(".stepper button").forEach(b => b.addEventListener("click", () => { quote.qty = Math.min(10, Math.max(1, quote.qty + +b.dataset.step)); calcQuote(); }));
  $$("#qCap button").forEach(b => b.addEventListener("click", () => {
    $$("#qCap button").forEach(x => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-pressed", x === b); });
    quote.cap = +b.dataset.cap; calcQuote();
  }));
  $("#qAgenda").addEventListener("click", () => setBookingService(quote.plan));
  ["#bM2", "#bPpl", "#bType", "#bSun"].forEach(s => $(s).addEventListener("input", calcBtu));
  bindTabs($("#toolTabs"));
  [$("#quoteForm"), $("#btuForm")].forEach(f => f.addEventListener("submit", e => e.preventDefault()));
  calcQuote(); calcBtu();
}

/* ---------------- Agenda (solicitud de horario preferido) ---------------- */
const booking = { date: null, slot: null, view: null };
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const sod = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const longDate = d => new Date(d).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
function renderCalendar() {
  const today = sod(new Date());
  if (!booking.view) booking.view = new Date(today.getFullYear(), today.getMonth(), 1);
  const y = booking.view.getFullYear(), m = booking.view.getMonth();
  $("#calTitle").textContent = `${MONTHS[m]} ${y}`;
  const first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + CONFIG.mesesAdelante + 1, 0);
  let html = "";
  for (let i = 0; i < first; i++) html += `<span class="empty" aria-hidden="true"></span>`;
  for (let d = 1; d <= days; d++) {
    const date = new Date(y, m, d);
    const off = date < today || date > maxDate || !CONFIG.diasLaborales.includes(date.getDay());
    const sel = booking.date && +booking.date === +date;
    html += `<button type="button" data-d="${+date}" ${off ? "disabled" : ""} aria-pressed="${!!sel}" aria-label="${longDate(date)}${+date === +today ? " (hoy)" : ""}" class="${+date === +today ? "is-today " : ""}${sel ? "is-sel" : ""}">${d}</button>`;
  }
  $("#calGrid").innerHTML = html;
  $("#calPrev").disabled = y === today.getFullYear() && m === today.getMonth();
  $("#calNext").disabled = new Date(y, m + 1, 1) > maxDate;
}
function renderSlots() {
  const box = $("#slots");
  if (!booking.date) { box.innerHTML = `<span class="slots__hint">Selecciona un día en el calendario.</span>`; return; }
  const now = new Date(), isToday = +sod(now) === +booking.date;
  box.innerHTML = CONFIG.horarios.map(h => {
    const [hh, mm] = h.split(":").map(Number);
    const past = isToday && hh * 60 + mm <= now.getHours() * 60 + now.getMinutes() + 90;
    return `<button type="button" data-slot="${h}" ${past ? "disabled" : ""} aria-pressed="${booking.slot === h}" class="${booking.slot === h ? "is-sel" : ""}">${h}</button>`;
  }).join("");
  $("#slotDate").textContent = longDate(booking.date);
}
function setBookingService(id) { const p = PRICING.plans.find(x => x.id === id); if (p) $("#bService").value = `Mantenimiento ${p.name}`; }
function bindBooking() {
  $("#calGrid").addEventListener("click", e => {
    const b = e.target.closest("button[data-d]"); if (!b || b.disabled) return;
    booking.date = new Date(+b.dataset.d); booking.slot = null; renderCalendar(); renderSlots();
    $(`#calGrid button[data-d="${+booking.date}"]`)?.focus();   // conserva el foco al redibujar
  });
  $("#calPrev").addEventListener("click", () => { booking.view = new Date(booking.view.getFullYear(), booking.view.getMonth() - 1, 1); renderCalendar(); });
  $("#calNext").addEventListener("click", () => { booking.view = new Date(booking.view.getFullYear(), booking.view.getMonth() + 1, 1); renderCalendar(); });
  $("#slots").addEventListener("click", e => {
    const b = e.target.closest("button[data-slot]"); if (!b || b.disabled) return;
    booking.slot = b.dataset.slot; renderSlots(); $(`#slots button[data-slot="${booking.slot}"]`)?.focus();
  });
  $("#bookForm").addEventListener("submit", e => {
    e.preventDefault();
    const err = $("#bookError"), name = $("#bName").value.trim(), phone = $("#bPhone").value.trim(), zone = $("#bZone").value.trim(), notes = $("#bNotes").value.trim();
    if (!booking.date) return (err.textContent = "Selecciona un día en el calendario.");
    if (!booking.slot) return (err.textContent = "Selecciona un horario.");
    if (!name || phone.replace(/\D/g, "").length < 10 || !zone) return (err.textContent = "Completa nombre, teléfono a 10 dígitos y colonia.");
    err.textContent = "";
    const msg = `Hola, quiero solicitar una cita:\n• Servicio: ${$("#bService").value}\n• Fecha preferida: ${longDate(booking.date)}\n• Hora preferida: ${booking.slot}\n• Nombre: ${name}\n• Teléfono: ${phone}\n• Colonia: ${zone}${notes ? "\n• Comentarios: " + notes : ""}`;
    openWhatsApp(msg);
  });
  document.addEventListener("click", e => { const p = e.target.closest(".js-plan"); if (p) setBookingService(p.dataset.plan); });
  renderCalendar(); renderSlots();
}

/* ---------------- Diálogos (lightbox y aviso de privacidad) ----------------
   Al abrir: mueve el foco dentro y lo mantiene ahí con Tab. Al cerrar: lo regresa
   al botón que lo abrió. Escape siempre cierra. */
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,iframe,video[controls],[tabindex]:not([tabindex="-1"])';
let dialog = null;
function openDialog(el, onClose) {
  if (dialog && dialog.el !== el) closeDialog();
  if (!dialog) dialog = { el, onClose, last: document.activeElement };
  el.classList.add("is-open"); el.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
  ($("[data-autofocus]", el) || $(FOCUSABLE, el))?.focus();
}
function closeDialog() {
  if (!dialog) return;
  const { el, onClose, last } = dialog; dialog = null;
  el.classList.remove("is-open"); el.setAttribute("aria-hidden", "true"); document.body.style.overflow = "";
  if (onClose) onClose();
  if (last && last.focus) last.focus();
}
document.addEventListener("keydown", e => {
  if (!dialog) return;
  if (e.key === "Escape") { e.preventDefault(); closeDialog(); return; }
  if (e.key !== "Tab") return;
  const items = $$(FOCUSABLE, dialog.el).filter(x => x.offsetParent !== null);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ---------------- Proyectos: acordeón + mosaico ---------------- */
function renderProjects() {
  const counts = GALLERY.reduce((o, g) => (o[g.cat] = (o[g.cat] || 0) + 1, o), {});
  $("#galleryFilters").innerHTML = `<button type="button" class="is-active" aria-pressed="true" data-filter="todos">Todos <sup>${GALLERY.length}</sup></button>` +
    Object.keys(CATS).filter(k => counts[k]).map(k => `<button type="button" aria-pressed="false" data-filter="${k}">${CATS[k]} <sup>${counts[k]}</sup></button>`).join("");
  const featured = GALLERY.slice(0, 5);
  // Solo <span> dentro del botón: un <button> no puede contener encabezados ni párrafos.
  $("#accordion").innerHTML = featured.map((g, i) => `
    <button type="button" class="acc ${i === 0 ? "is-open" : ""}" data-i="${i}" data-cat="${g.cat}" aria-label="${esc(g.title)}: ${esc(g.desc)}">
      ${media(g)}<span class="acc__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><span class="acc__vlabel" aria-hidden="true">${esc(g.title)}</span>
      <span class="acc__body" aria-hidden="true"><span><small>${CATS[g.cat]}</small><span class="acc__title">${esc(g.title)}</span><span class="acc__desc">${esc(g.desc)}</span></span><span class="acc__open">→</span></span>
    </button>`).join("");
  $("#mosaic").innerHTML = GALLERY.map((g, i) => `<button type="button" class="mo" data-i="${i}" data-cat="${g.cat}" aria-label="Ver ${esc(g.title)}">${media(g)}</button>`).join("");
}

/* ---------------- Videos: reproductor + playlist + reels ---------------- */
let currentVideo = 0;
const ytFrame = (id, title) => `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="${esc(title)}"></iframe>`;
const soonBox = cls => `<div class="${cls}"><div><h3>Video próximamente</h3><p>Estamos preparando este video. Mientras tanto, pídelo por WhatsApp y te lo enviamos.</p><a href="#" class="btn btn--orange js-wa" data-msg="Hola, ¿me pueden enviar videos de sus trabajos?"><svg class="i" aria-hidden="true"><use href="#i-wa"/></svg> Pedir videos</a></div></div>`;
function renderPlayer(i, play = false) {
  currentVideo = i; const v = VIDEOS[i], main = $("#playerMain");
  if (play && v.src) {
    main.innerHTML = v.src.startsWith("youtube:") ? ytFrame(v.src.slice(8), v.title) : `<video src="${v.src}" controls autoplay playsinline></video>`;
  } else {
    main.innerHTML = `${poster(v)}
      <div class="player__overlay">
        <div class="player__top"><span class="live">Servicio real</span><span class="player__brand"><img src="img/emblema.svg" alt="" width="30" height="30">Equilibrio Climático C&amp;M</span></div>
        <div class="player__info"><h3>${esc(v.title)}</h3><span>${esc(v.sub)} · ${v.dur}</span><div class="player__bar" aria-hidden="true"><span>0:00</span><span class="player__track"><i></i></span><span>${v.dur}</span></div></div>
      </div>
      <button type="button" class="player__center" id="playerPlay" aria-label="Reproducir ${esc(v.title)}"><svg class="i" aria-hidden="true"><use href="#i-play"/></svg></button>
      ${play && !v.src ? soonBox("player__soon") : ""}`;
    hydrateLinks(main);
  }
  $$("#playlist button").forEach((b, k) => { b.classList.toggle("is-on", k === i); b.toggleAttribute("aria-current", k === i); });
}
function bindVideos() {
  $("#playlist").innerHTML = VIDEOS.map((v, i) => `<li><button type="button" data-i="${i}"><span class="pl-thumb">${poster(v)}<em>${v.dur}</em></span><span class="pl-txt"><b>${esc(v.title)}</b><small>${esc(v.sub)}</small></span></button></li>`).join("");
  $("#plCount").textContent = `${VIDEOS.length} videos`;
  $("#reels").innerHTML = VIDEOS.map((v, i) => `<button type="button" class="reel" data-i="${i}" aria-label="Ver ${esc(v.title)}">${poster(v)}<span class="reel__tag" aria-hidden="true">▶ ${v.dur}</span><span class="reel__play" aria-hidden="true"><svg class="i"><use href="#i-play"/></svg></span><span class="reel__cap" aria-hidden="true">${esc(v.title)}</span></button>`).join("");
  $("#playlist").addEventListener("click", e => { const b = e.target.closest("button"); if (b) renderPlayer(+b.dataset.i); });
  $("#playerMain").addEventListener("click", e => { if (e.target.closest("#playerPlay")) renderPlayer(currentVideo, true); });
  $("#reels").addEventListener("click", e => { const r = e.target.closest(".reel"); if (r) lbOpen("videos", +r.dataset.i); });
  renderPlayer(0);
}

/* ---------------- Lightbox ---------------- */
const lb = { list: [], i: 0 };
function lbRender() {
  const it = lb.list[lb.i], m = $("#lbMedia");
  if (it.video) {
    if (it.src && it.src.startsWith("youtube:")) m.innerHTML = ytFrame(it.src.slice(8), it.title);
    else if (it.src) m.innerHTML = `<video src="${it.src}" controls autoplay playsinline></video>`;
    else m.innerHTML = soonBox("lb-msg");
  } else m.innerHTML = it.type === "img" ? `<img src="${it.src}" alt="${esc(it.title)}">` : `<div class="lb-art">${art(it.art)}</div>`;
  hydrateLinks(m);
  $("#lbTag").textContent = it.tag; $("#lbCap").textContent = it.title; $("#lbDesc").textContent = it.desc || "";
  $("#lbCount").textContent = `${lb.i + 1} / ${lb.list.length}`;
  $("#lbThumbs").innerHTML = lb.list.map((t, k) => `<button type="button" class="${k === lb.i ? "is-on" : ""}" ${k === lb.i ? "aria-current" : ""} data-k="${k}" aria-label="${esc(t.title)}">${t.video ? poster(t) : media(t)}</button>`).join("");
}
function lbOpen(kind, i) {
  lb.list = kind === "videos" ? VIDEOS.map(v => ({ ...v, video: true, tag: "Video", desc: v.sub })) : GALLERY.map(g => ({ ...g, tag: CATS[g.cat] }));
  lb.i = i; lbRender();
  openDialog($("#lightbox"), () => ($("#lbMedia").innerHTML = ""));   // al cerrar, detiene cualquier video
}
const lbStep = d => { lb.i = (lb.i + d + lb.list.length) % lb.list.length; lbRender(); };
function bindGallery() {
  $("#galleryFilters").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#galleryFilters button").forEach(x => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-pressed", x === b); });
    const f = b.dataset.filter;
    $$(".acc, .mo").forEach(it => it.classList.toggle("is-hidden", f !== "todos" && it.dataset.cat !== f));
    const firstVisible = $(".acc:not(.is-hidden)");
    $$(".acc").forEach(a => a.classList.toggle("is-open", a === firstVisible));
  });
  $("#accordion").addEventListener("click", e => {
    const a = e.target.closest(".acc"); if (!a) return;
    if (a.classList.contains("is-open")) lbOpen("gallery", +a.dataset.i);
    else $$(".acc").forEach(x => x.classList.toggle("is-open", x === a));
  });
  $("#accordion").addEventListener("mouseover", e => {
    if (!matchMedia("(hover:hover) and (min-width:981px)").matches) return;
    const a = e.target.closest(".acc"); if (a && !a.classList.contains("is-open")) $$(".acc").forEach(x => x.classList.toggle("is-open", x === a));
  });
  $("#mosaic").addEventListener("click", e => { const m = e.target.closest(".mo"); if (m) lbOpen("gallery", +m.dataset.i); });
  document.addEventListener("click", e => {
    const g = e.target.closest(".js-open-gallery"); if (g) lbOpen("gallery", +g.dataset.i);
    const v = e.target.closest(".js-open-video"); if (v) lbOpen("videos", +v.dataset.i);
  });
  $("#lbClose").addEventListener("click", closeDialog);
  $("#lbPrev").addEventListener("click", () => lbStep(-1));
  $("#lbNext").addEventListener("click", () => lbStep(1));
  $("#lbThumbs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { lb.i = +b.dataset.k; lbRender(); $(`#lbThumbs button[data-k="${lb.i}"]`)?.focus(); } });
  $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") closeDialog(); });
  let x0 = null;
  $("#lbMedia").addEventListener("touchstart", e => (x0 = e.touches[0].clientX), { passive: true });
  $("#lbMedia").addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1); x0 = null; });
  document.addEventListener("keydown", e => {
    if (!dialog || dialog.el.id !== "lightbox") return;
    if (e.key === "ArrowRight") lbStep(1);
    if (e.key === "ArrowLeft") lbStep(-1);
  });
}

/* ---------------- Antes / después ---------------- */
function bindBeforeAfter() {
  $("#baBefore").innerHTML = coilSVG(true); $("#baAfter").innerHTML = coilSVG(false);
  const r = $("#baRange"), upd = () => {
    $("#baBefore").style.clipPath = `inset(0 ${100 - r.value}% 0 0)`; $("#baHandle").style.left = r.value + "%";
    r.setAttribute("aria-valuetext", `${r.value}% antes, ${100 - r.value}% después`);
  };
  r.addEventListener("input", upd); upd();
}

/* ---------------- Aviso de privacidad ---------------- */
function bindModal() {
  const m = $("#privacyModal");
  $("#privacyLink").addEventListener("click", e => { e.preventDefault(); openDialog(m); });
  m.addEventListener("click", e => { if (e.target === m || e.target.closest("[data-close]")) closeDialog(); });
}

/* ---------------- UI general ---------------- */
function bindUI() {
  const header = $("#header"), burger = $("#burger"), nav = $("#nav"), toTop = $("#toTop");
  const onScroll = () => { header.classList.toggle("is-scrolled", scrollY > 10); toTop.classList.toggle("is-on", scrollY > 700); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const setNav = open => { nav.classList.toggle("is-open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú"); };
  burger.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setNav(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setNav(false); burger.focus(); } });
  bindTabs($(".mtto__tabs"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: .12 });
    $$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });
    const links = $$('.nav a[href^="#"]:not(.btn)');
    const spy = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) links.forEach(l => { const on = l.getAttribute("href") === "#" + en.target.id; l.classList.toggle("is-active", on); l.toggleAttribute("aria-current", on); });
    }), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(l => { const s = $(l.getAttribute("href")); if (s) spy.observe(s); });
  } else $$(".reveal").forEach(el => el.classList.add("is-in"));
  $("#year").textContent = new Date().getFullYear();
}

/* ---------------- Inicio ---------------- */
renderStatic();
renderProjects();
bindContact();
bindServices();
bindTools();
bindBooking();
bindVideos();
bindGallery();
bindBeforeAfter();
bindModal();
bindUI();
