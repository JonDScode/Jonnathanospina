/* ══════════════════════════════════════════════════════════
   theme.js — Toggle claro/oscuro
   El atributo data-theme se fija ANTES de pintar con el snippet
   inline del <head> de cada página; aquí solo va el botón.
   Persistencia en localStorage ('theme': 'light' | 'dark').
══════════════════════════════════════════════════════════ */

(function () {
  function current() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function syncMeta(t) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'light' ? '#f7f7fa' : '#0a0a0f');
  }

  function apply(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    syncMeta(t);
    var btn = document.querySelector('.theme-btn');
    if (btn) btn.textContent = t === 'light' ? '☾' : '☀';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    var btn = document.createElement('button');
    btn.className = 'theme-btn';
    btn.setAttribute('aria-label', 'Cambiar tema');
    btn.textContent = current() === 'light' ? '☾' : '☀';
    btn.addEventListener('click', function () {
      apply(current() === 'light' ? 'dark' : 'light');
    });
    var sw = document.querySelector('.lang-switcher');
    if (sw) sw.after(btn); else navbar.appendChild(btn);
    syncMeta(current());
  });
})();
