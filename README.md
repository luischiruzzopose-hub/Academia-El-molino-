# Academia El Molino — Sitio web

Sitio estático (HTML/CSS/JS, sin dependencias ni build) de Academia El Molino, escuela de conducir de autos y motos en Maldonado y Punta del Este.

## Estructura
```
index.html       → página principal
styles.css       → estilos (colores en las variables de :root)
script.js        → menú móvil, header y visor de fotos
assets/images/   → fotos optimizadas (portada, motos, alumnos, certificados)
```

## Cambiar datos
- **Precios:** buscá la sección `id="precios"` en `index.html`.
- **WhatsApp:** los enlaces usan `https://wa.me/59894547478` y `https://wa.me/59891638709`. El texto después de `?text=` es el mensaje que aparece precargado.
- **Fotos de alumnos:** agregá la imagen en `assets/images/` y copiá un bloque `<button class="g-item">` en la sección `id="alumnos"`.

## Publicar gratis con GitHub Pages
```bash
git init
git add .
git commit -m "Sitio Academia El Molino"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/academia-el-molino.git
git push -u origin main
```
Después: repositorio → **Settings** → **Pages** → rama `main`, carpeta `/ (root)`.
El sitio queda en `https://TU-USUARIO.github.io/academia-el-molino/`.

Para actualizar: `git add . && git commit -m "cambio" && git push`.
