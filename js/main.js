/* =========================================================
   Equilibrio Climático — Lógica de la página (v3)
   ---------------------------------------------------------
   EDITA AQUÍ: WhatsApp, redes, precios, servicios, galería,
   videos, equipos, reseñas y preguntas frecuentes.
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
  // Enlace para que tus clientes dejen reseña en Google (Google Business Profile → "Pedir reseñas")
  resenaGoogle: "",
  horarios: ["9:00", "11:00", "13:00", "16:00", "18:00"],
  diasLaborales: [1, 2, 3, 4, 5, 6],   // 0 = domingo
  mesesAdelante: 2,
  recargo2Ton: 150,
  extraDesde4: 500
};

/* ---------------- Ilustraciones SVG ---------------- */
const C = { navy: "#0B1A7A", blue: "#1B3BE6", blue2: "#1229B8", ice: "#9DB2FF", orange: "#FF8A1F" };
const grid = (n, s) => Array.from({ length: n }, (_, i) => `<line x1="${i * s}" y1="0" x2="${i * s}" y2="400"/><line x1="0" y1="${i * s}" x2="600" y2="${i * s}"/>`).join("");
const ART = {
  evaporadora: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ev1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#E3E8FF"/></linearGradient></defs>
  <rect x="30" y="60" width="340" height="110" rx="26" fill="url(#ev1)" stroke="#C9D1F2" stroke-width="2"/>
  <rect x="30" y="140" width="340" height="30" rx="14" fill="#D5DCF7"/>
  <g stroke="#B5C0EA" stroke-width="2">${Array.from({ length: 22 }, (_, i) => `<line x1="${60 + i * 13.5}" y1="146" x2="${60 + i * 13.5}" y2="164"/>`).join("")}</g>
  <rect x="290" y="82" width="54" height="12" rx="6" fill="${C.navy}"/><circle cx="300" cy="88" r="3" fill="#1EC48A"/>
  <text x="60" y="106" font-family="Plus Jakarta Sans,Arial" font-weight="800" font-size="22" fill="${C.navy}">24.0°</text>
  <g fill="none" stroke="${C.blue}" stroke-opacity=".55" stroke-width="4" stroke-linecap="round"><path d="M70 190 C 90 220, 60 245, 85 270"/><path d="M150 190 C 170 220, 140 245, 165 270"/><path d="M230 190 C 250 220, 220 245, 245 270"/><path d="M310 190 C 330 220, 300 245, 325 270"/></g>
  <g font-family="Inter,Arial" font-size="11" font-weight="700" fill="${C.blue}"><circle cx="110" cy="40" r="5" fill="${C.orange}"/><text x="120" y="44">Filtros</text><circle cx="230" cy="40" r="5" fill="${C.orange}"/><text x="240" y="44">Serpentín</text><circle cx="40" cy="200" r="5" fill="${C.orange}"/><text x="20" y="225">Turbina</text><circle cx="360" cy="200" r="5" fill="${C.orange}"/><text x="330" y="225">Drenaje</text></g></svg>`,
  condensadora: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cd1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#DCE2FA"/></linearGradient></defs>
  <rect x="60" y="50" width="280" height="200" rx="18" fill="url(#cd1)" stroke="#C3CCEE" stroke-width="2"/>
  <circle cx="170" cy="150" r="78" fill="${C.navy}"/><circle cx="170" cy="150" r="70" fill="${C.blue2}"/>
  <g stroke="#3A55D8" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<line x1="${100 + i * 17.5}" y1="85" x2="${100 + i * 17.5}" y2="215"/>`).join("")}</g>
  <g transform="translate(170 150)"><g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.4s" repeatCount="indefinite"/>${[0, 120, 240].map(a => `<path transform="rotate(${a})" d="M0 0 C 18 -12, 46 -14, 56 -4 C 40 4, 18 8, 0 0Z" fill="${C.ice}"/>`).join("")}<circle r="9" fill="${C.orange}"/></g></g>
  <g stroke="#B5C0EA" stroke-width="2">${Array.from({ length: 10 }, (_, i) => `<line x1="268" y1="${78 + i * 15}" x2="322" y2="${78 + i * 15}"/>`).join("")}</g>
  <rect x="80" y="250" width="40" height="12" rx="3" fill="${C.navy}"/><rect x="280" y="250" width="40" height="12" rx="3" fill="${C.navy}"/>
  <g font-family="Inter,Arial" font-size="11" font-weight="700" fill="${C.blue}"><circle cx="300" cy="30" r="5" fill="${C.orange}"/><text x="250" y="34">Serpentín</text><circle cx="70" cy="30" r="5" fill="${C.orange}"/><text x="80" y="34">Presiones</text><circle cx="360" cy="150" r="5" fill="${C.orange}"/><text x="335" y="175">Amperaje</text></g></svg>`,
  split: `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sp0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.blue}"/><stop offset="1" stop-color="${C.navy}"/></linearGradient></defs><rect width="600" height="400" fill="url(#sp0)"/><g stroke="rgba(255,255,255,.08)">${grid(18, 36)}</g><rect x="130" y="120" width="340" height="100" rx="24" fill="#F6F8FF"/><rect x="130" y="192" width="340" height="28" rx="12" fill="#D8DFF8"/><rect x="390" y="142" width="56" height="12" rx="6" fill="${C.navy}"/><circle cx="400" cy="148" r="3" fill="#1EC48A"/><g fill="none" stroke="#BFD0FF" stroke-width="5" stroke-linecap="round" opacity=".8"><path d="M180 240 q12 30 -6 60"/><path d="M250 240 q12 30 -6 60"/><path d="M320 240 q12 30 -6 60"/><path d="M390 240 q12 30 -6 60"/></g><circle cx="500" cy="80" r="28" fill="${C.orange}"/><path d="M490 80l7 7 13-14" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`,
  camara: `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cm0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.blue2}"/><stop offset="1" stop-color="${C.navy}"/></linearGradient></defs><rect width="600" height="400" fill="url(#cm0)"/><g stroke="rgba(255,255,255,.07)">${grid(18, 36)}</g><rect x="180" y="60" width="240" height="290" rx="12" fill="#EEF1FF"/><rect x="196" y="76" width="208" height="258" rx="8" fill="#CBD4F5"/><rect x="380" y="180" width="10" height="60" rx="5" fill="${C.navy}"/><rect x="214" y="92" width="120" height="34" rx="8" fill="${C.navy}"/><text x="228" y="116" font-family="Plus Jakarta Sans,Arial" font-weight="800" font-size="19" fill="#BFD0FF">-18.0°C</text><g stroke="${C.blue}" stroke-width="4" stroke-linecap="round" opacity=".6"><path d="M260 210v56M232 238h56M240 218l40 40M280 218l-40 40"/></g><circle cx="480" cy="80" r="28" fill="${C.orange}"/><path d="M470 80l7 7 13-14" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/></svg>`,
  instalacion: `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="in0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2E4FFF"/><stop offset="1" stop-color="${C.navy}"/></linearGradient></defs><rect width="600" height="400" fill="url(#in0)"/><g stroke="rgba(255,255,255,.08)">${grid(18, 36)}</g><rect x="60" y="70" width="260" height="76" rx="20" fill="#F6F8FF"/><rect x="60" y="124" width="260" height="22" rx="10" fill="#D8DFF8"/><path d="M300 146 v70 q0 20 20 20 h120 q20 0 20 20 v20" stroke="#E7B27A" stroke-width="8" fill="none"/><path d="M290 146 v80 q0 20 20 20 h120 q20 0 20 20 v10" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none"/><rect x="380" y="270" width="170" height="110" rx="12" fill="#EEF1FF"/><circle cx="440" cy="325" r="38" fill="${C.blue2}"/><circle cx="440" cy="325" r="10" fill="${C.orange}"/><g stroke="#B5C0EA" stroke-width="2">${Array.from({ length: 6 }, (_, i) => `<line x1="492" y1="${290 + i * 14}" x2="535" y2="${290 + i * 14}"/>`).join("")}</g></svg>`,
  producto: (ton) => `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pr${ton}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#E8ECFB"/></linearGradient></defs><ellipse cx="200" cy="190" rx="150" ry="12" fill="rgba(11,26,122,.12)"/><rect x="40" y="50" width="320" height="110" rx="30" fill="url(#pr${ton})" stroke="#CBD3F2" stroke-width="2"/><rect x="40" y="128" width="320" height="32" rx="14" fill="#D9DFF7"/><g stroke="#B8C3EC" stroke-width="2">${Array.from({ length: 24 }, (_, i) => `<line x1="${62 + i * 12.5}" y1="134" x2="${62 + i * 12.5}" y2="154"/>`).join("")}</g><rect x="270" y="74" width="62" height="14" rx="7" fill="${C.navy}"/><circle cx="281" cy="81" r="3.5" fill="#1EC48A"/><text x="64" y="98" font-family="Plus Jakarta Sans,Arial" font-weight="800" font-size="24" fill="${C.blue}">${ton} TON</text><text x="64" y="118" font-family="Inter,Arial" font-weight="600" font-size="12" fill="#6B76A6">INVERTER · R32</text></svg>`
};
function coilSVG(dirty) {
  const fins = Array.from({ length: 40 }, (_, i) => `<rect x="${20 + i * 9.5}" y="20" width="4" height="210" rx="2" fill="${dirty ? "#9A8F7A" : "#C9D2EE"}"/>`).join("");
  const tubes = Array.from({ length: 6 }, (_, i) => `<rect x="12" y="${35 + i * 34}" width="376" height="9" rx="4.5" fill="${dirty ? "#7A5A3A" : "#E0954F"}"/>`).join("");
  let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const dust = dirty ? Array.from({ length: 150 }, () => `<circle cx="${(rnd() * 400).toFixed(0)}" cy="${(rnd() * 250).toFixed(0)}" r="${(rnd() * 7 + 2).toFixed(1)}" fill="rgba(${95 + rnd() * 40 | 0},${82 + rnd() * 30 | 0},60,.${5 + (rnd() * 4 | 0)})"/>`).join("") : "";
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="400" height="250" fill="${dirty ? "#5E5646" : "#EEF2FF"}"/>${fins}${tubes}${dust}${dirty ? "" : '<rect width="400" height="250" fill="url(#sh)"/>'}</svg>`;
}

/* ---------------- Datos ---------------- */
const BRANDS = ["Mirage", "Midea", "LG", "Samsung", "Carrier", "York", "Trane", "Hisense", "Daikin", "Gree", "Lennox", "Whirlpool"];

const FEATS = [
  { icon: "i-users", title: "Técnicos capacitados", text: "Personal con experiencia en equipos residenciales y comerciales." },
  { icon: "i-gauge", title: "Herramienta profesional", text: "Manómetros, hidrolavadora y equipo apto para gas R32." },
  { icon: "i-camera", title: "Evidencia de cada trabajo", text: "Fotos, mediciones y video enviados por WhatsApp." },
  { icon: "i-shield", title: "Garantía por escrito", text: "Precios claros y garantía en paquetes Completo y Premium." }
];

const SERVICES = [
  { icon: "i-snow", img: "img/g-ventilador.jpg", title: "Mantenimiento preventivo", text: "Lavado completo interior y exterior, medición de gas y amperaje.", price: "Desde $450" },
  { icon: "i-drop", img: "img/g-techo.jpg", title: "Lavado profundo anti-hongos", text: "Sanitización de turbina y serpentín. Elimina mal olor y goteo.", price: "Desde $850" },
  { icon: "i-box", art: "instalacion", title: "Instalación de minisplit", text: "Vacío, prueba de fugas y puesta en marcha. Inverter y convencional.", price: "Cotización" },
  { icon: "i-wrench", img: "img/g-tarjeta.jpg", title: "Reparación y diagnóstico", text: "No enfría, tira agua o marca error: tarjeta, sensores y motores.", price: "Cotización" },
  { icon: "i-gauge", art: "condensadora", title: "Fugas y carga de gas", text: "Reparamos la fuga antes de recargar. R32, R410A y R22.", price: "$600 – $900" },
  { icon: "i-fridge", art: "camara", title: "Refrigeración comercial", text: "Cámaras frías, vitrinas, enfriadores y refrigeradores.", price: "Cotización" },
  { icon: "i-building", img: "img/trabajo-cassette.jpg", title: "Pólizas para empresas", text: "De 2 a 4 visitas al año con reporte por equipo.", price: "A la medida" },
  { icon: "i-fan", img: "img/g-tecnico.jpg", title: "Calefacción frío / calor", text: "Revisión del modo calor para el invierno de Aguascalientes.", price: "Cotización" }
];

const MTTO = {
  interior: { art: "evaporadora", items: [
    ["Lavado de filtros de aire", "Con agua y jabón para recuperar el flujo de aire."],
    ["Limpieza profunda de turbina / blower", "Donde se acumulan el hongo y el mal olor."],
    ["Lavado del serpentín evaporador", "Con químicos especiales y funda para no mojar tu pared."],
    ["Charola y manguera de drenaje", "Limpieza y destape para que no gotee adentro (prueba con agua)."],
    ["Revisión electrónica", "Tarjeta, sensor y conexiones."]] },
  exterior: { art: "condensadora", items: [
    ["Lavado del serpentín condensador", "Con hidrolavadora y líquido especial."],
    ["Presiones de gas refrigerante", "Medición con manómetros."],
    ["Amperaje del compresor", "Detectamos consumo anormal antes de que falle."],
    ["Apriete de terminales eléctricas", "Evita falsos contactos y sobrecalentamiento."],
    ["Aspas y vibraciones", "Limpieza de aspas y revisión de ruidos."]] }
};

const STEPS = [
  ["Diagnóstico inicial", "Foto del equipo, temperatura de salida y amperaje antes de empezar."],
  ["Limpieza interior", "Filtros, turbina, serpentín evaporador, charola y drenaje (prueba con agua)."],
  ["Limpieza exterior", "Serpentín de la condensadora con hidrolavadora y químico especial."],
  ["Mediciones finales", "Presión de gas, amperaje, voltaje y temperatura de salida."],
  ["Evidencia por WhatsApp", "Fotos de comprobación + video de 10 segundos con el aire trabajando."]
];

const PLANS = [
  { id: "basico", icon: "i-drop", name: "Básico", price: 450, for: "1 minisplit de 1 Ton. Ideal para departamentos.",
    items: ["Lavado de filtros", "Limpieza de turbina", "Lavado de serpentín evaporador", "Limpieza de drenaje"] },
  { id: "completo", icon: "i-snow", name: "Completo", price: 650, hot: true, for: "Mantenimiento integral interior + exterior.",
    items: ["Todo lo del Básico", "Hidrolavadora en condensadora", "Medición de gas y amperaje", "Limpieza de charola", "Garantía de 15 días"] },
  { id: "premium", icon: "i-shield", name: "Premium", price: 850, for: "1 equipo de 2 Ton o casas con 2–3 equipos ($750 c/u).",
    items: ["Todo lo del Completo", "Sanitización anti-hongos", "Desincrustante en serpentines", "Ideal para equipos con mal olor", "Garantía de 15 días"] }
];

// Proyectos. Para agregar uno: sube la foto a /img y agrega una línea.
const GALLERY = [
  { type: "img", cat: "comercial", src: "img/portada.jpg", title: "Mantenimiento a equipo tipo cassette", desc: "Local comercial · Limpieza de turbina, serpentín y revisión eléctrica." },
  { type: "img", cat: "mantenimiento", src: "img/g-ventilador.jpg", title: "Turbina lista para lavado", desc: "Desarmado completo para eliminar hongo y mal olor." },
  { type: "img", cat: "mantenimiento", src: "img/g-tecnico.jpg", title: "Revisión de conexiones", desc: "Tarjeta, sensores y terminales eléctricas." },
  { type: "art", cat: "instalacion", art: "instalacion", title: "Instalación de minisplit inverter", desc: "Vacío, prueba de fugas y puesta en marcha." },
  { type: "img", cat: "comercial", src: "img/g-techo.jpg", title: "Equipos de plafón en negocio", desc: "Mantenimiento sin interrumpir la operación de tu local." },
  { type: "art", cat: "comercial", art: "camara", title: "Cámara de refrigeración", desc: "Revisión de temperatura, evaporador y compresor." },
  { type: "img", cat: "mantenimiento", src: "img/g-tarjeta.jpg", title: "Diagnóstico de tarjeta electrónica", desc: "Detectamos la falla antes de cambiar piezas." },
  { type: "art", cat: "instalacion", art: "split", title: "Minisplit instalado y funcionando", desc: "Entrega con prueba de temperatura de salida." }
];

// Videos. src: "video/archivo.mp4" o "youtube:ID_DEL_VIDEO". Vacío = "próximamente".
const VIDEOS = [
  { poster: "img/reel-1.jpg", src: "", dur: "0:45", title: "Lavado de minisplit con hidrolavadora", sub: "Mantenimiento Completo" },
  { poster: "img/reel-2.jpg", src: "", dur: "0:30", title: "Limpieza de turbina anti-hongos", sub: "Paquete Premium" },
  { poster: "img/reel-3.jpg", src: "", dur: "0:20", title: "Revisión de equipo tipo cassette", sub: "Servicio comercial" },
  { posterArt: "condensadora", src: "", dur: "0:15", title: "Prueba de aire después del servicio", sub: "10–14 °C de salida" },
  { posterArt: "instalacion", src: "", dur: "0:40", title: "Instalación paso a paso", sub: "Minisplit inverter" }
];

const PRODUCTS = [
  { ton: "1", name: "Minisplit Inverter 1 Ton", specs: ["12,000 BTU", "Inverter", "R32", "Frío / calor"], text: "Ideal para recámaras y oficinas de hasta ~16 m².", badge: "Más vendido" },
  { ton: "1.5", name: "Minisplit Inverter 1.5 Ton", specs: ["18,000 BTU", "Inverter", "R32", "Frío / calor"], text: "Para salas, comedores y locales de ~20 a 28 m²." },
  { ton: "2", name: "Minisplit Inverter 2 Ton", specs: ["24,000 BTU", "Inverter", "R32", "Frío / calor"], text: "Espacios amplios, cocinas abiertas y negocios." }
];

const TIPS = [
  { icon: "i-temp", title: "Ponlo en 24 °C", text: "Es la temperatura más eficiente. Cada grado menos sube tu consumo." },
  { icon: "i-snow", title: "Mantenimiento a tiempo", text: "Un serpentín sucio hace trabajar de más al compresor y gasta más luz." },
  { icon: "i-door", title: "Puertas y ventanas cerradas", text: "Evita que se escape el aire frío y el equipo no descanse." },
  { icon: "i-leaf", title: "Elige inverter", text: "Los equipos inverter ajustan su velocidad y consumen menos energía." }
];

// Reseñas reales de tus clientes. Mientras esté vacío se muestra la invitación a dejar reseña.
const REVIEWS = [
  // { name: "Nombre del cliente", place: "Colonia", stars: 5, text: "Comentario del cliente." }
];

const FAQ = [
  ["¿Cada cuánto debo darle mantenimiento a mi minisplit?", "En casa normal, cada 6 meses. Si está en cocina, taller o cerca de tierra y polvo (muy común en Aguascalientes), cada 3 a 4 meses."],
  ["¿Cuánto tarda el servicio?", "Un mantenimiento completo toma aproximadamente 60 minutos por equipo."],
  ["¿Qué incluye y qué no incluye el mantenimiento?", "Incluye mano de obra, lavado, químicos y revisión. No incluye recarga de gas (se cobra aparte solo si hay fuga, y primero se repara) ni refacciones."],
  ["Mi equipo no enfría, ¿necesita gas?", "No siempre. La mayoría de las veces es suciedad en serpentines o filtros. Si le falta gas es porque tiene una fuga: primero la localizamos y reparamos, y después recargamos."],
  ["¿Cómo sé que el trabajo quedó bien?", "Medimos presión, amperaje, voltaje y temperatura de salida (debe bajar a 10–14 °C). Te enviamos fotos y un video de 10 segundos por WhatsApp."],
  ["¿Tienen garantía?", "Sí. Los paquetes Completo y Premium tienen garantía de 15 días en el servicio."],
  ["¿Venden e instalan equipos?", "Sí. Te asesoramos para elegir la capacidad correcta y te cotizamos el equipo con instalación incluida."],
  ["¿Atienden negocios y refrigeración comercial?", "Sí. Atendemos cámaras frías, vitrinas y enfriadores, y ofrecemos pólizas con 2 a 4 visitas al año."]
];

/* ---------------- Utilidades ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => "$" + n.toLocaleString("es-MX");
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const CATS = { mantenimiento: "Mantenimiento", instalacion: "Instalación", comercial: "Comercial" };
const media = g => g.type === "img" ? `<img src="${g.src}" alt="${g.title}" loading="lazy">` : `<div class="g-art">${ART[g.art]}</div>`;
const poster = v => v.poster ? `<img src="${v.poster}" alt="" loading="lazy">` : `<div class="g-art">${ART[v.posterArt]}</div>`;

/* ---------------- Render ---------------- */
function renderStatic() {
  const b = BRANDS.map(x => `<span>${x}</span>`).join("");
  $("#brandsTrack").innerHTML = b + b.replace(/<span>/g, '<span aria-hidden="true">');
  $("#feats").innerHTML = FEATS.map(f => `<div class="feat reveal"><span class="feat__ic"><svg class="i"><use href="#${f.icon}"/></svg></span><div><b>${f.title}</b><span>${f.text}</span></div></div>`).join("");
  $("#servicesTrack").innerHTML = SERVICES.map(s => `
    <article class="svc">
      <div class="svc__media">${s.img ? `<img src="${s.img}" alt="${s.title}" loading="lazy">` : `<div class="g-art">${ART[s.art]}</div>`}</div>
      <div class="svc__body"><span class="svc__ic"><svg class="i"><use href="#${s.icon}"/></svg></span><h3>${s.title}</h3><p>${s.text}</p>
        <div class="svc__foot"><span class="svc__price">${s.price}</span><a class="svc__go js-wa" href="#" data-msg="Hola, me interesa: ${s.title}." aria-label="Cotizar ${s.title}">→</a></div></div>
    </article>`).join("");
  $("#steps").innerHTML = STEPS.map((s, i) => `<li class="step"><span class="step__n">${String(i + 1).padStart(2, "0")}</span><div><b>${s[0]}</b><span>${s[1]}</span></div></li>`).join("");
  $("#plans").innerHTML = PLANS.map(p => `
    <article class="plan ${p.hot ? "plan--hot" : ""} reveal">
      ${p.hot ? '<span class="plan__badge">★ El más vendido</span>' : ""}
      <span class="plan__ic"><svg class="i"><use href="#${p.icon}"/></svg></span>
      <div class="plan__name">${p.name}</div><div class="plan__for">${p.for}</div>
      <div class="plan__price"><strong>${money(p.price)}</strong><span>MXN / equipo</span></div>
      <ul>${p.items.map(i => `<li>${i}</li>`).join("")}</ul>
      <a href="#agenda" class="btn ${p.hot ? "btn--orange" : "btn--outline"} btn--block js-plan" data-plan="${p.id}">Agendar ${p.name} <i class="arr">→</i></a>
    </article>`).join("");
  $("#products").innerHTML = PRODUCTS.map(p => `
    <article class="prod reveal">
      <div class="prod__media">${p.badge ? `<span class="prod__badge">${p.badge}</span>` : ""}${ART.producto(p.ton)}</div>
      <div class="prod__body"><h3>${p.name}</h3><div class="prod__specs">${p.specs.map(s => `<span>${s}</span>`).join("")}</div><p>${p.text}</p>
        <div class="prod__foot"><div><small>Con instalación</small><b>Precio por cotización</b></div><a href="#" class="btn btn--blue js-wa" data-msg="Hola, quiero cotizar un ${p.name} con instalación.">Cotizar</a></div></div>
    </article>`).join("");
  $("#tips").innerHTML = TIPS.map(t => `<div class="tip"><span class="tip__ic"><svg class="i"><use href="#${t.icon}"/></svg></span><b>${t.title}</b><span>${t.text}</span></div>`).join("");
  $("#reviews").innerHTML = REVIEWS.length ? REVIEWS.map(r => `
    <article class="rev reveal"><div class="rev__stars">${"★".repeat(r.stars)}</div><p>“${r.text}”</p>
      <div class="rev__who"><span class="rev__av">${r.name[0]}</span><div><b>${r.name}</b><small>${r.place}</small></div></div></article>`).join("")
    : `<div class="rev-empty reveal"><span class="rev-empty__g"><svg class="i"><use href="#i-google"/></svg></span>
        <div><div class="rev-empty__stars">★★★★★</div><h3>¿Ya te atendimos? Tu opinión nos ayuda a crecer</h3><p>Déjanos tu reseña en Google y ayuda a más familias y negocios de Aguascalientes a elegir con confianza.</p></div>
        <a href="${CONFIG.resenaGoogle || "#"}" class="btn btn--orange ${CONFIG.resenaGoogle ? "" : "js-wa"}" data-msg="Hola, quiero dejar mi reseña de su servicio." ${CONFIG.resenaGoogle ? 'target="_blank" rel="noopener"' : ""}>Dejar mi reseña <i class="arr">→</i></a></div>`;
  $("#faqList").innerHTML = FAQ.map((f, i) => `<details class="reveal" ${i === 0 ? "open" : ""}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("");
  const map = { facebook: ["i-fb", "Facebook"], instagram: ["i-ig", "Instagram"], tiktok: ["i-tt", "TikTok"], youtube: ["i-yt", "YouTube"] };
  const soc = Object.entries(CONFIG.redes).filter(([, u]) => u).map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${map[k][1]}"><svg class="i"><use href="#${map[k][0]}"/></svg></a>`).join("");
  $$(".js-socials").forEach(el => (el.innerHTML = soc));
  $$(".js-phone").forEach(el => (el.textContent = CONFIG.telefonoVisible));
}

function renderMtto(key) {
  const d = MTTO[key];
  $("#mttoVisual").innerHTML = ART[d.art];
  $("#mttoList").innerHTML = d.items.map((it, i) => `<li style="animation-delay:${i * 70}ms"><div><b>${it[0]}</b><span>${it[1]}</span></div></li>`).join("");
}

/* ---------------- Servicios: carrusel ---------------- */
function bindServices() {
  const track = $("#servicesTrack"), cards = $$(".svc", track), dots = $("#svcDots");
  dots.innerHTML = cards.map((_, i) => `<button aria-label="Servicio ${i + 1}" data-i="${i}"></button>`).join("");
  const step = () => (cards[0]?.offsetWidth || 300) + 22;
  const sync = () => { const i = Math.round(track.scrollLeft / step()); $$("button", dots).forEach((d, k) => d.classList.toggle("is-on", k === Math.min(i, cards.length - 1))); };
  track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
  dots.addEventListener("click", e => { const b = e.target.closest("button"); if (b) track.scrollTo({ left: +b.dataset.i * step() }); });
  $("#svcPrev").addEventListener("click", () => track.scrollBy({ left: -step() }));
  $("#svcNext").addEventListener("click", () => track.scrollBy({ left: step() }));
  let auto = setInterval(() => { if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) track.scrollTo({ left: 0 }); else track.scrollBy({ left: step() }); }, 4500);
  ["pointerenter", "touchstart", "focusin"].forEach(ev => track.addEventListener(ev, () => clearInterval(auto), { once: true, passive: true }));
  sync();
}

/* ---------------- WhatsApp / teléfono ---------------- */
function bindContact() {
  document.addEventListener("click", e => {
    const wa = e.target.closest(".js-wa");
    if (wa) { e.preventDefault(); const url = waLink(wa.dataset.msg || "Hola"); window.open(url, "_blank", "noopener") || (location.href = url); }
    const call = e.target.closest(".js-call");
    if (call) { e.preventDefault(); location.href = "tel:+" + CONFIG.whatsapp; }
  });
}

/* ---------------- Cotizador + calculadora ---------------- */
const quote = { plan: "completo", qty: 1, cap: 1 };
function calcQuote() {
  const { plan, qty, cap } = quote; let total, note;
  if (plan === "basico") { const u = 450 + (cap === 2 ? CONFIG.recargo2Ton : 0); total = u * qty; note = `Precio por equipo: ${money(u)}`; }
  else if (plan === "completo") { const base = qty === 1 ? 650 : qty === 2 ? 1100 : 1500 + (qty - 3) * CONFIG.extraDesde4; total = base + (cap === 2 ? CONFIG.recargo2Ton * qty : 0); note = qty >= 2 ? `Precio combo de ${qty} equipos` : "Precio por equipo: $650"; }
  else { const u = qty >= 2 ? 750 : 850; total = u * qty; note = `Precio por equipo: ${money(u)}`; }
  if (cap === 2 && plan !== "premium") note += " · incluye ajuste por 2 Ton";
  $("#qTotal").textContent = money(total); $("#qNote").textContent = note; $("#qQty").textContent = qty;
  $("#qWa").dataset.msg = `Hola, quiero el paquete ${PLANS.find(p => p.id === plan).name} para ${qty} equipo(s) de ${cap === 2 ? "2 Ton o más" : "1–1.5 Ton"}. Total estimado: ${money(total)}.`;
}
function calcBtu() {
  const m2 = +$("#bM2").value, ppl = +$("#bPpl").value;
  const btu = m2 * 650 * +$("#bType").value * +$("#bSun").value + Math.max(0, ppl - 2) * 600;
  const sizes = [1, 1.5, 2, 3, 4, 5]; const ton = sizes.find(s => s * 12000 >= btu) || 5;
  $("#bM2Val").textContent = `${m2} m²`; $("#bPplVal").textContent = ppl;
  $("#bTon").textContent = `${ton} Ton`; $("#bBtu").textContent = `≈ ${Math.round(btu).toLocaleString("es-MX")} BTU/h necesarios · equipo de ${(ton * 12000).toLocaleString("es-MX")} BTU`;
  $("#bWa").dataset.msg = `Hola, necesito un minisplit para un espacio de ${m2} m² (${$("#bType").selectedOptions[0].text}). La calculadora me recomienda ${ton} Ton. ¿Me cotizan el equipo con instalación?`;
}
function bindTools() {
  const sel = $("#qPlan");
  sel.innerHTML = PLANS.map(p => `<option value="${p.id}" ${p.id === "completo" ? "selected" : ""}>${p.name} — ${money(p.price)}</option>`).join("");
  sel.addEventListener("change", () => { quote.plan = sel.value; calcQuote(); });
  $$(".stepper button").forEach(b => b.addEventListener("click", () => { quote.qty = Math.min(10, Math.max(1, quote.qty + +b.dataset.step)); calcQuote(); }));
  $$("#qCap button").forEach(b => b.addEventListener("click", () => { $$("#qCap button").forEach(x => x.classList.toggle("is-active", x === b)); quote.cap = +b.dataset.cap; calcQuote(); }));
  $("#qAgenda").addEventListener("click", () => setBookingService(quote.plan));
  ["#bM2", "#bPpl", "#bType", "#bSun"].forEach(s => $(s).addEventListener("input", calcBtu));
  $("#toolTabs").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#toolTabs button").forEach(x => x.classList.toggle("is-active", x === b));
    $("#quoteForm").hidden = b.dataset.tool !== "quote"; $("#btuForm").hidden = b.dataset.tool !== "btu";
  });
  [$("#quoteForm"), $("#btuForm")].forEach(f => f.addEventListener("submit", e => e.preventDefault()));
  calcQuote(); calcBtu();
}

/* ---------------- Agenda ---------------- */
const booking = { date: null, slot: null, view: null };
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const sod = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
function renderCalendar() {
  const today = sod(new Date());
  if (!booking.view) booking.view = new Date(today.getFullYear(), today.getMonth(), 1);
  const y = booking.view.getFullYear(), m = booking.view.getMonth();
  $("#calTitle").textContent = `${MONTHS[m]} ${y}`;
  const first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + CONFIG.mesesAdelante + 1, 0);
  let html = "";
  for (let i = 0; i < first; i++) html += `<span class="empty"></span>`;
  for (let d = 1; d <= days; d++) {
    const date = new Date(y, m, d);
    const off = date < today || date > maxDate || !CONFIG.diasLaborales.includes(date.getDay());
    html += `<button type="button" data-d="${+date}" ${off ? "disabled" : ""} class="${+date === +today ? "is-today " : ""}${booking.date && +booking.date === +date ? "is-sel" : ""}">${d}</button>`;
  }
  $("#calGrid").innerHTML = html;
  $("#calPrev").disabled = y === today.getFullYear() && m === today.getMonth();
  $("#calNext").disabled = new Date(y, m + 1, 1) > maxDate;
}
function renderSlots() {
  const box = $("#slots");
  if (!booking.date) { box.innerHTML = `<span class="slots__hint">Selecciona un día disponible en el calendario.</span>`; return; }
  const now = new Date(), isToday = +sod(now) === +booking.date;
  box.innerHTML = CONFIG.horarios.map(h => {
    const [hh, mm] = h.split(":").map(Number);
    const past = isToday && hh * 60 + mm <= now.getHours() * 60 + now.getMinutes() + 90;
    return `<button type="button" data-slot="${h}" ${past ? "disabled" : ""} class="${booking.slot === h ? "is-sel" : ""}">${h}</button>`;
  }).join("");
  $("#slotDate").textContent = new Date(booking.date).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
}
function setBookingService(id) { const p = PLANS.find(x => x.id === id); if (p) $("#bService").value = `Mantenimiento ${p.name}`; }
function bindBooking() {
  $("#bService").innerHTML = [...PLANS.map(p => `Mantenimiento ${p.name}`), ...SERVICES.slice(2).map(s => s.title), "Compra de equipo con instalación"].map(s => `<option>${s}</option>`).join("");
  setBookingService("completo");
  $("#calGrid").addEventListener("click", e => { const b = e.target.closest("button[data-d]"); if (!b || b.disabled) return; booking.date = new Date(+b.dataset.d); booking.slot = null; renderCalendar(); renderSlots(); });
  $("#calPrev").addEventListener("click", () => { booking.view = new Date(booking.view.getFullYear(), booking.view.getMonth() - 1, 1); renderCalendar(); });
  $("#calNext").addEventListener("click", () => { booking.view = new Date(booking.view.getFullYear(), booking.view.getMonth() + 1, 1); renderCalendar(); });
  $("#slots").addEventListener("click", e => { const b = e.target.closest("button[data-slot]"); if (!b || b.disabled) return; booking.slot = b.dataset.slot; renderSlots(); });
  $("#bookForm").addEventListener("submit", e => {
    e.preventDefault();
    const err = $("#bookError"), name = $("#bName").value.trim(), phone = $("#bPhone").value.trim(), zone = $("#bZone").value.trim(), notes = $("#bNotes").value.trim();
    if (!booking.date) return (err.textContent = "Selecciona un día en el calendario.");
    if (!booking.slot) return (err.textContent = "Selecciona un horario.");
    if (!name || phone.replace(/\D/g, "").length < 10 || !zone) return (err.textContent = "Completa nombre, teléfono a 10 dígitos y colonia.");
    err.textContent = "";
    const fecha = new Date(booking.date).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
    const msg = `Hola, quiero agendar un servicio:\n• Servicio: ${$("#bService").value}\n• Fecha: ${fecha}\n• Hora: ${booking.slot}\n• Nombre: ${name}\n• Teléfono: ${phone}\n• Colonia: ${zone}${notes ? "\n• Comentarios: " + notes : ""}`;
    const url = waLink(msg); window.open(url, "_blank", "noopener") || (location.href = url);
  });
  document.addEventListener("click", e => { const p = e.target.closest(".js-plan"); if (p) setBookingService(p.dataset.plan); });
  renderCalendar(); renderSlots();
}

/* ---------------- Proyectos: acordeón + mosaico ---------------- */
function renderProjects() {
  const counts = GALLERY.reduce((o, g) => (o[g.cat] = (o[g.cat] || 0) + 1, o), {});
  $("#galleryFilters").innerHTML = `<button class="is-active" data-filter="todos">Todos <sup>${GALLERY.length}</sup></button>` +
    Object.keys(CATS).filter(k => counts[k]).map(k => `<button data-filter="${k}">${CATS[k]} <sup>${counts[k]}</sup></button>`).join("");
  const featured = GALLERY.slice(0, 5);
  $("#accordion").innerHTML = featured.map((g, i) => `
    <button class="acc ${i === 0 ? "is-open" : ""}" data-i="${i}" data-cat="${g.cat}" aria-label="${g.title}">
      ${media(g)}<span class="acc__num">${String(i + 1).padStart(2, "0")}</span><span class="acc__vlabel">${g.title}</span>
      <span class="acc__body"><span><small>${CATS[g.cat]}</small><h3>${g.title}</h3><p>${g.desc}</p></span><span class="acc__open">→</span></span>
    </button>`).join("");
  $("#mosaic").innerHTML = GALLERY.map((g, i) => `<button class="mo" data-i="${i}" data-cat="${g.cat}" aria-label="Ver ${g.title}">${media(g)}</button>`).join("");
}

/* ---------------- Videos: reproductor + playlist + reels ---------------- */
let currentVideo = 0;
function renderPlayer(i, play = false) {
  currentVideo = i; const v = VIDEOS[i], main = $("#playerMain");
  if (play && v.src) {
    main.innerHTML = v.src.startsWith("youtube:") ? `<iframe src="https://www.youtube.com/embed/${v.src.slice(8)}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen title="${v.title}"></iframe>` : `<video src="${v.src}" controls autoplay playsinline></video>`;
  } else {
    main.innerHTML = `${poster(v)}
      <div class="player__overlay">
        <div class="player__top"><span class="live">Servicio real</span><span class="player__brand"><img src="img/emblema.svg" alt="">Equilibrio Climático</span></div>
        <div class="player__info"><h3>${v.title}</h3><span>${v.sub} · ${v.dur}</span><div class="player__bar"><span>0:00</span><span class="player__track"><i></i></span><span>${v.dur}</span></div></div>
      </div>
      <button class="player__center" id="playerPlay" aria-label="Reproducir ${v.title}"><svg class="i"><use href="#i-play"/></svg></button>
      ${play && !v.src ? `<div class="player__soon"><div><h3>Video próximamente</h3><p>Estamos preparando este video. Mientras tanto, pídelo por WhatsApp y te lo enviamos.</p><a href="#" class="btn btn--orange js-wa" data-msg="Hola, ¿me pueden enviar videos de sus trabajos?"><svg class="i"><use href="#i-wa"/></svg> Pedir videos</a></div></div>` : ""}`;
  }
  $$("#playlist button").forEach((b, k) => b.classList.toggle("is-on", k === i));
}
function bindVideos() {
  $("#playlist").innerHTML = VIDEOS.map((v, i) => `<li><button data-i="${i}"><span class="pl-thumb">${poster(v)}<em>${v.dur}</em></span><span class="pl-txt"><b>${v.title}</b><small>${v.sub}</small></span></button></li>`).join("");
  $("#plCount").textContent = `${VIDEOS.length} videos`;
  $("#reels").innerHTML = VIDEOS.map((v, i) => `<button class="reel" data-i="${i}" aria-label="Ver ${v.title}">${poster(v)}<span class="reel__tag">▶ ${v.dur}</span><span class="reel__play"><svg class="i"><use href="#i-play"/></svg></span><span class="reel__cap">${v.title}</span></button>`).join("");
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
    if (it.src && it.src.startsWith("youtube:")) m.innerHTML = `<iframe src="https://www.youtube.com/embed/${it.src.slice(8)}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen title="${it.title}"></iframe>`;
    else if (it.src) m.innerHTML = `<video src="${it.src}" controls autoplay playsinline></video>`;
    else m.innerHTML = `<div class="lb-msg"><h3>Video próximamente</h3><p>Estamos preparando este video. Pídelo por WhatsApp y te lo enviamos.</p><a href="#" class="btn btn--orange js-wa" data-msg="Hola, ¿me pueden enviar videos de sus trabajos?"><svg class="i"><use href="#i-wa"/></svg> Pedir videos</a></div>`;
  } else m.innerHTML = it.type === "img" ? `<img src="${it.src}" alt="${it.title}">` : `<div style="width:min(860px,100%);border-radius:18px;overflow:hidden">${ART[it.art]}</div>`;
  $("#lbTag").textContent = it.tag; $("#lbCap").textContent = it.title; $("#lbDesc").textContent = it.desc || "";
  $("#lbCount").textContent = `${lb.i + 1} / ${lb.list.length}`;
  $("#lbThumbs").innerHTML = lb.list.map((t, k) => `<button class="${k === lb.i ? "is-on" : ""}" data-k="${k}" aria-label="${t.title}">${t.video ? poster(t) : media(t)}</button>`).join("");
}
function lbOpen(kind, i) {
  if (kind === "videos") lb.list = VIDEOS.map(v => ({ ...v, video: true, tag: "Video", desc: v.sub }));
  else lb.list = GALLERY.map(g => ({ ...g, tag: CATS[g.cat] }));
  lb.i = i; lbRender();
  const el = $("#lightbox"); el.classList.add("is-open"); el.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
}
function lbClose() { const el = $("#lightbox"); el.classList.remove("is-open"); el.setAttribute("aria-hidden", "true"); $("#lbMedia").innerHTML = ""; document.body.style.overflow = ""; }
const lbStep = d => { lb.i = (lb.i + d + lb.list.length) % lb.list.length; lbRender(); };
function bindGallery() {
  $("#galleryFilters").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#galleryFilters button").forEach(x => x.classList.toggle("is-active", x === b));
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
  $("#lbClose").addEventListener("click", lbClose);
  $("#lbPrev").addEventListener("click", () => lbStep(-1));
  $("#lbNext").addEventListener("click", () => lbStep(1));
  $("#lbThumbs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { lb.i = +b.dataset.k; lbRender(); } });
  $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") lbClose(); });
  let x0 = null;
  $("#lbMedia").addEventListener("touchstart", e => (x0 = e.touches[0].clientX), { passive: true });
  $("#lbMedia").addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1); x0 = null; });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { lbClose(); closeModal(); }
    if (!$("#lightbox").classList.contains("is-open")) return;
    if (e.key === "ArrowRight") lbStep(1);
    if (e.key === "ArrowLeft") lbStep(-1);
  });
}

/* ---------------- Antes / después ---------------- */
function bindBeforeAfter() {
  $("#baBefore").innerHTML = coilSVG(true); $("#baAfter").innerHTML = coilSVG(false);
  const r = $("#baRange"), upd = () => { $("#baBefore").style.clipPath = `inset(0 ${100 - r.value}% 0 0)`; $("#baHandle").style.left = r.value + "%"; };
  r.addEventListener("input", upd); upd();
}

/* ---------------- Modal ---------------- */
function closeModal() { const m = $("#privacyModal"); m.classList.remove("is-open"); m.setAttribute("aria-hidden", "true"); }
function bindModal() {
  $("#privacyLink").addEventListener("click", e => { e.preventDefault(); const m = $("#privacyModal"); m.classList.add("is-open"); m.setAttribute("aria-hidden", "false"); });
  $("#privacyModal").addEventListener("click", e => { if (e.target.id === "privacyModal" || e.target.closest("[data-close]")) closeModal(); });
}

/* ---------------- UI general ---------------- */
function bindUI() {
  const header = $("#header"), burger = $("#burger"), nav = $("#nav"), toTop = $("#toTop");
  const onScroll = () => { header.classList.toggle("is-scrolled", scrollY > 10); toTop.classList.toggle("is-on", scrollY > 700); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  burger.addEventListener("click", () => { const o = nav.classList.toggle("is-open"); burger.setAttribute("aria-expanded", o); });
  nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); } });
  $$(".tab").forEach(t => t.addEventListener("click", () => { $$(".tab").forEach(x => { x.classList.toggle("is-active", x === t); x.setAttribute("aria-selected", x === t); }); renderMtto(t.dataset.tab); }));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: .12 });
    $$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });
    const links = $$('.nav a[href^="#"]:not(.btn)');
    const spy = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(l => { const s = $(l.getAttribute("href")); if (s) spy.observe(s); });
  } else $$(".reveal").forEach(el => el.classList.add("is-in"));
  $("#year").textContent = new Date().getFullYear();
}

/* ---------------- Inicio ---------------- */
renderStatic();
renderMtto("interior");
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
