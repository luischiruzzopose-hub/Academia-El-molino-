# Academia El Molino — Sitio web

Sitio estático (HTML, CSS y JS sin dependencias ni build) de Academia El Molino, escuela de conducir para autos y motos en Maldonado y Punta del Este.

## Estructura
```
index.html        → página principal
simulacro.html    → simulacro de examen teórico (30 preguntas)
styles.css        → estilos (colores y tipografías en :root)
script.js         → menú móvil, header, enlace activo y visor de fotos
assets/images/    → fotos optimizadas (portada, cursos, alumnos, certificados, estacionamiento)
assets/images/simulacro/ → señales del simulacro
assets/video/     → video de estacionamiento entre balizas
```

## Secciones de index.html
Inicio · Cursos · Por qué · Clases · Estacionamiento · Precios · Promociones · Simulacro · Requisitos · Traslado · Seguridad vial · Instructor · Alumnos · Contacto.

## Cambiar datos
- **Precios:** sección `id="precios"`. Si cambian, actualizá también el bloque `application/ld+json` del `<head>`.
- **WhatsApp:** los enlaces usan `https://wa.me/59894547478` y `https://wa.me/59891638709`. El texto después de `?text=` es el mensaje precargado.
- **Fotos de alumnos:** agregá la imagen en `assets/images/` y copiá un `<button class="g zoom">` en la sección `id="alumnos"`.
- **Dominio:** si el sitio pasa a un dominio propio, reemplazá `https://academia1-xi.vercel.app/` en las etiquetas `canonical`, `og:` y en los datos estructurados.

## Publicar
Vercel o GitHub Pages sirven la carpeta tal cual (no hay build).
```bash
git add .
git commit -m "Nuevo diseño del sitio"
git push
```

## Reseñas de Google
La sección `id="resenas"` enlaza a la ficha de Google Maps. Para mostrar reseñas en la página, hay un bloque comentado dentro de esa sección: copiá una tarjeta por reseña con el texto y el nombre tal cual aparecen en Google.
