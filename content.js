// Shared content loader for the prose pages.
// Each page sets <body data-page="NAME"> and provides #content; the bilingual prose
// lives in content/NAME.en.md / content/NAME.es.md (Markdown, with raw HTML passed
// through for structured/styled bits). Pages with data-driven pieces (charts, CSV,
// tables) define window.onContentRender(lang), called after each render.
(function () {
  var page = document.body.getAttribute('data-page');
  var content = document.getElementById('content');
  if (!page || !content) return;

  function render(lang) {
    fetch('content/' + page + '.' + lang + '.md')
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (md) {
        var html = (window.marked ? marked.parse(md) : md)
          .replace(/<a href="(https?:\/\/[^"]*)"/g, '<a target="_blank" rel="noopener" href="$1"');
        content.innerHTML = html;
        if (typeof window.onContentRender === 'function') window.onContentRender(lang);
        // Content is injected after load, so a #hash deep-link (e.g. trends.html#grid-co2)
        // needs a manual scroll once its target exists.
        if (location.hash.length > 1) {
          var target = document.getElementById(location.hash.slice(1));
          if (target) target.scrollIntoView();
        }
      })
      .catch(function (e) {
        content.innerHTML = '<p class="lede">Could not load content (' + e.message + '). Serve this folder over HTTP (file:// blocks fetch).</p>';
      });
  }

  function setLang(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.lang === lang); });
    var back = document.querySelector('.back-link');
    if (back) back.textContent = lang === 'es' ? '← Volver al mapa' : '← Back to map';
    render(lang);
  }
  window.__setLang = setLang;
  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });
  setLang(localStorage.getItem('lang') || 'en');
})();
