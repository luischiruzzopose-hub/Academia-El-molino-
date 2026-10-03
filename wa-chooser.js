/* =========================================================
   ACADEMIA EL MOLINO — wa-chooser.js
   Al tocar cualquier botón de WhatsApp se abre un selector
   para elegir instructor (Carlos o Fernando). El mensaje se
   arma solo: "Hola Carlos, <consulta>".
   Cada enlace define su consulta con data-consulta="...".
   Los enlaces con data-directo no abren el selector.
   Sin JavaScript, los enlaces funcionan igual (van a Carlos).
   ========================================================= */
(function () {
  var INSTRUCTORES = [
    { nombre: 'Carlos',   tel: '59894547478', visible: '094 547 478' },
    { nombre: 'Fernando', tel: '59891638709', visible: '091 638 709' }
  ];
  var CONSULTA_POR_DEFECTO = 'quiero consultar por clases de manejo.';

  var css = '' +
    '.wa-pick{position:fixed;inset:0;z-index:400;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.6);opacity:0;transition:opacity .2s ease}' +
    '.wa-pick.open{opacity:1}' +
    '.wa-pick[hidden]{display:none}' +
    '.wa-sheet{width:100%;max-width:440px;background:#fff;color:#000;border-radius:22px 22px 0 0;padding:22px 20px calc(22px + env(safe-area-inset-bottom,0px));transform:translateY(24px);transition:transform .25s cubic-bezier(.2,.7,.2,1);font-family:"Barlow","Segoe UI",Roboto,Arial,sans-serif}' +
    '.wa-pick.open .wa-sheet{transform:none}' +
    '@media (min-width:641px){.wa-pick{align-items:center;padding:20px}.wa-sheet{border-radius:22px;padding:26px}}' +
    '.wa-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:6px}' +
    '.wa-title{margin:0;font-family:"Barlow Condensed","Arial Narrow",sans-serif;font-weight:800;font-size:1.8rem;line-height:1}' +
    '.wa-close{flex:none;width:40px;height:40px;border:0;border-radius:50%;background:#f0f1ee;font-size:1.6rem;line-height:1;cursor:pointer;color:#000}' +
    '.wa-close:hover{background:#e2e5df}' +
    '.wa-topic{margin:0 0 16px;color:#474b45;font-size:.95rem}' +
    '.wa-opts{display:grid;gap:10px}' +
    '.wa-opt{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;padding:16px 18px;border-radius:16px;background:#9be22d;color:#000;text-decoration:none;transition:background-color .2s ease,transform .2s ease}' +
    '.wa-opt+.wa-opt{background:#000;color:#fff}' +
    '.wa-opt:hover{transform:translateY(-1px);background:#b2f04e}' +
    '.wa-opt+.wa-opt:hover{background:#222}' +
    '.wa-opt svg{width:32px;height:32px}' +
    '.wa-opt strong{display:block;font-family:"Barlow Condensed","Arial Narrow",sans-serif;font-weight:800;font-size:1.6rem;line-height:1}' +
    '.wa-opt small{display:block;font-size:.95rem;font-weight:600;opacity:.8;margin-top:2px}' +
    '.wa-go{font-weight:700;font-size:.9rem;white-space:nowrap}' +
    '.wa-preview{margin:14px 0 0;font-size:.85rem;color:#6a6f66}';

  var waIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var pick = document.createElement('div');
    pick.className = 'wa-pick';
    pick.hidden = true;
    pick.setAttribute('role', 'dialog');
    pick.setAttribute('aria-modal', 'true');
    pick.setAttribute('aria-labelledby', 'waPickTitle');
    pick.innerHTML =
      '<div class="wa-sheet">' +
        '<div class="wa-head"><h2 class="wa-title" id="waPickTitle">¿Con quién querés hablar?</h2>' +
        '<button type="button" class="wa-close" aria-label="Cerrar">×</button></div>' +
        '<p class="wa-topic">Elegí un instructor y se abre WhatsApp con tu mensaje listo.</p>' +
        '<div class="wa-opts"></div>' +
        '<p class="wa-preview"></p>' +
      '</div>';
    document.body.appendChild(pick);

    var opts = pick.querySelector('.wa-opts');
    var preview = pick.querySelector('.wa-preview');
    var closeBtn = pick.querySelector('.wa-close');
    var lastFocus = null;

    function buildLink(inst, consulta) {
      var texto = 'Hola ' + inst.nombre + ', ' + consulta;
      return 'https://wa.me/' + inst.tel + '?text=' + encodeURIComponent(texto);
    }

    function open(consulta) {
      lastFocus = document.activeElement;
      opts.innerHTML = '';
      INSTRUCTORES.forEach(function (inst) {
        var a = document.createElement('a');
        a.className = 'wa-opt';
        a.href = buildLink(inst, consulta);
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML = waIcon + '<span><strong>' + inst.nombre + '</strong><small>' + inst.visible + '</small></span><span class="wa-go">Escribir</span>';
        a.addEventListener('click', function () { setTimeout(close, 150); });
        opts.appendChild(a);
      });
      preview.textContent = 'Mensaje: “Hola …, ' + consulta + '”';
      pick.hidden = false;
      requestAnimationFrame(function () { pick.classList.add('open'); });
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      pick.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(function () { pick.hidden = true; }, 200);
      if (lastFocus) { lastFocus.focus(); }
    }

    closeBtn.addEventListener('click', close);
    pick.addEventListener('click', function (e) { if (e.target === pick) { close(); } });
    document.addEventListener('keydown', function (e) {
      if (!pick.hidden && e.key === 'Escape') { close(); }
    });

    // Delegación: cualquier enlace a wa.me de la página
    document.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a[href*="wa.me/"]') : null;
      if (!link || link.hasAttribute('data-directo') || link.classList.contains('wa-opt')) { return; }
      e.preventDefault();
      open(link.getAttribute('data-consulta') || CONSULTA_POR_DEFECTO);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
