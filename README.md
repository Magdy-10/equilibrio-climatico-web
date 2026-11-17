# Equilibrio Climático C&M — sitio web

Sitio de una sola página para **Equilibrio Climático C&M**: instalación, mantenimiento y reparación de minisplits y refrigeración comercial en Aguascalientes, Jesús María y San Francisco de los Romo.

- **En línea:** https://magdy-10.github.io/equilibrio-climatico-web/
- **Tecnología:** HTML, CSS y JavaScript puros. No necesita instalar nada ni compilar.
- **Publicación:** GitHub Pages publica automáticamente lo que se sube a la rama `main` (tarda 1–2 minutos).

## Estructura

```
index.html      Contenido de la página (textos, servicios, precios, preguntas frecuentes)
css/styles.css  Diseño
js/main.js      Comportamiento + configuración (WhatsApp, redes, agenda, galería, videos, reseñas)
img/            Imágenes (.webp para la página; portada.jpg solo para la vista previa en redes)
robots.txt      Permite que Google rastree el sitio
sitemap.xml     Mapa del sitio para Google Search Console
```

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo | Dónde |
|---|---|---|
| Número de WhatsApp / teléfono | `js/main.js` | `CONFIG.whatsapp` y `CONFIG.telefonoVisible` |
| Redes sociales | `js/main.js` | `CONFIG.redes` (vacío = no se muestra el ícono) |
| Perfil de Google y enlace de reseñas | `js/main.js` | `CONFIG.perfilGoogle` y `CONFIG.resenaGoogle` |
| Horarios y días de la agenda | `js/main.js` | `CONFIG.horarios`, `CONFIG.diasLaborales` |
| Precios de paquetes y combos | `index.html` | Sección `#paquetes`: el número visible **y** su `data-price` |
| Recargo por 2 Ton / precio después del combo | `js/main.js` | `CONFIG.recargo2Ton`, `CONFIG.extraDesde4` |
| Servicios, mantenimiento, equipos, consejos | `index.html` | Sección correspondiente |
| Preguntas frecuentes | `index.html` | Sección `#faq` **y** el bloque `FAQPage` del `<head>` |
| Fotos de proyectos | `js/main.js` | Lista `GALLERY` |
| Videos | `js/main.js` | Lista `VIDEOS` (`"video/archivo.mp4"` o `"youtube:ID"`) |
| Reseñas de clientes | `js/main.js` | Lista `REVIEWS` |

> El cotizador lee los precios directamente de las tarjetas de `#paquetes`. Así el precio que ve el cliente y el que calcula el cotizador nunca se desfasan.

## Imágenes

Usar **WebP** (pesa la mitad que JPG). Ancho recomendado: 800–1280 px para fotos grandes y 400–600 px para miniaturas. Indicar siempre `width` y `height` en la etiqueta `<img>` para que la página no "brinque" al cargar.

## Si se cambia a un dominio propio

Buscar y reemplazar `https://magdy-10.github.io/equilibrio-climatico-web/` en `index.html`, `robots.txt` y `sitemap.xml`.

## Pendientes de contenido

- [ ] Número de WhatsApp real del negocio (lada 449 de preferencia)
- [ ] Enlaces reales de Facebook, Instagram y TikTok
- [ ] Perfil de Negocio de Google → `CONFIG.perfilGoogle`, `CONFIG.resenaGoogle` y `sameAs` en el JSON-LD
- [ ] Fotos reales de trabajos, antes/después y videos
- [ ] Dato de facturación (CFDI) y formas de pago
- [ ] Aviso de privacidad completo
