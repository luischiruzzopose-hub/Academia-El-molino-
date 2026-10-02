/* =========================================================
   ACADEMIA EL MOLINO — script.js
   Menú móvil, header al hacer scroll, enlace activo del menú,
   visor de imágenes y año del footer. Sin dependencias.
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* Año automático */
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }

  /* Header: fondo al bajar */
  var header = document.getElementById('header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Barra de WhatsApp en celular: se oculta mientras se ven los botones de la portada */
  var heroActions = document.getElementById('heroActions');
  if (heroActions && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      document.body.classList.toggle('hero-cta-visible', entries[0].isIntersecting);
    }).observe(heroActions);
  }

  /* Menú móvil */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
  });

  /* Enlace activo según la sección visible */
  if ('IntersectionObserver' in window) {
    var links = {};
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && links[entry.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          links[entry.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) { spy.observe(sec); }
    });
  }

  /* Visor de imágenes: agrupa por bloque (galería, certificados, estacionamiento) */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var group = [], index = 0, lastFocus = null;

  function show(i) {
    index = (i + group.length) % group.length;
    var el = group[index];
    lbImg.src = el.getAttribute('data-full');
    var img = el.querySelector('img');
    lbImg.alt = img ? img.alt : '';
  }
  function open(items, i) {
    group = items; lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus();
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) { lastFocus.focus(); }
  }
  ['.gallery', '.certs', '.park-points'].forEach(function (sel) {
    var box = document.querySelector(sel);
    if (!box) { return; }
    var items = Array.prototype.slice.call(box.querySelectorAll('.zoom'));
    items.forEach(function (el, i) { el.addEventListener('click', function () { open(items, i); }); });
  });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function () { show(index - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { show(index + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) { close(); } });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) { return; }
    if (e.key === 'Escape') { close(); }
    if (e.key === 'ArrowLeft') { show(index - 1); }
    if (e.key === 'ArrowRight') { show(index + 1); }
  });
});
