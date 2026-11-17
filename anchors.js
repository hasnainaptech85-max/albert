/* Alberto Clocks - gives every watch card an id automatically (rolex1, omega1, casio1, gshock1 ...)
   so sitemap links like index.html#omega1 jump straight to that watch. */
(function () {
  function tag() {
    document.querySelectorAll('img[src*="product/"]').forEach(function (img) {
      var m = (img.getAttribute('src') || '').match(/product\/(rolex|omega|casio|g-shock)(\d+)\.jpg/i);
      if (!m) return;
      var id = m[1].toLowerCase().replace('-', '') + m[2];
      if (document.getElementById(id)) return;
      var link = img.closest('a');
      var card = img.closest('.card, .product, .product-card, .watch-card, .item, .slide') ||
                 (link ? link.parentElement : img.parentElement);
      if (card) card.id = id;
    });
    document.querySelectorAll('h1,h2,h3').forEach(function (h) {
      if (/frequently asked questions/i.test(h.textContent) && !document.getElementById('faq')) {
        (h.closest('section') || h).id = 'faq';
      }
    });
  }
  function go() {
    var id = decodeURIComponent(location.hash.slice(1));
    var el = id && document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }
  function init() { tag(); go(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('load', init);
  window.addEventListener('hashchange', go);
})();
