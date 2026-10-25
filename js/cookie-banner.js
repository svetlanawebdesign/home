/* Плашка про cookie: показывается, пока человек не нажмёт «Принять». Выбор хранится в браузере
   (localStorage + cookie cookie_consent на 1 год), поэтому на всех страницах сайта (RU и EN) плашка больше не появляется. */
(function () {
  var KEY = 'cookie_consent', box = document.getElementById('cookieBanner');
  if (!box) return;

  function accepted() {
    try { if (localStorage.getItem(KEY) === 'accepted') return true; } catch (e) {}
    return document.cookie.indexOf(KEY + '=accepted') > -1;
  }
  function save() {
    try { localStorage.setItem(KEY, 'accepted'); } catch (e) {}
    document.cookie = KEY + '=accepted; max-age=31536000; path=/; SameSite=Lax';
  }
  /* Сюда можно добавить загрузку Яндекс Метрики, чтобы она включалась только после согласия:
     function loadAnalytics() { ...вставьте код счётчика... }
     Вызывается и при нажатии «Принять», и при следующих визитах, если согласие уже есть. */
  function loadAnalytics() { document.dispatchEvent(new CustomEvent('cookie-consent')); }

  if (accepted()) { loadAnalytics(); return; }

  setTimeout(function () {
    box.hidden = false;
    requestAnimationFrame(function () { box.classList.add('is-visible'); });
  }, 1200);

  var btn = box.querySelector('[data-cookie-accept]');
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    save(); loadAnalytics();
    box.classList.remove('is-visible');
    setTimeout(function () { box.hidden = true; }, 400);
  });
})();
