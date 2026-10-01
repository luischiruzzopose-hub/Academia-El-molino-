/* =========================================================
   ACADEMIA EL MOLINO — script.js
   Menú móvil, header al hacer scroll, visor de imágenes y año.
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* Año automático en el footer */
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }

  /* Header: fondo negro al bajar */
  var header = document.getElementById('header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  /* Visor de imágenes (alumnos y certificados) */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var group = [];
  var index = 0;
  var lastFocus = null;

  function show(i) {
    index = (i + group.length) % group.length;
    var el = group[index];
    lbImg.src = el.getAttribute('data-full');
    lbImg.alt = (el.querySelector('img') || {}).alt || '';
  }
  function open(items, i) {
    group = items;
    lastFocus = document.activeElement;
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

  [document.querySelectorAll('.g-item'), document.querySelectorAll('.cert'), document.querySelectorAll('.park-img')].forEach(function (list) {
    var items = Array.prototype.slice.call(list);
    items.forEach(function (el, i) {
      el.addEventListener('click', function () { open(items, i); });
    });
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
