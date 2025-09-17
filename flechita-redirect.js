(function () {
  var riotUrl = "https://authenticate.riotgames.com/?client_id=accountodactyl-prod&method=riot_identity&platform=web&redirect_uri=https%3A%2F%2Fauth.riotgames.com%2Fauthorize%3Facr_values%3Durn%3Ariot%3Agold%26client_id%3Daccountodactyl-prod%26redirect_uri%3Dhttps%3A%2F%2Faccount.riotgames.com%2Foauth2%2Flog-in%26response_type%3Dcode%26scope%3Dopenid%2520email%2520profile%2520riot%3A%2F%2Friot.atlas%2Fopenid%2520riot%3A%2F%2Friot.atlas%2Faccounts.edit%2520riot%3A%2F%2Friot.atlas%2Faccounts%2Fpassword.edit%2520riot%3A%2F%2Friot.atlas%2Faccounts%2Femail.edit%2520riot%3A%2F%2Friot.atlas%2Faccounts.auth%2520riot%3A%2F%2Fthird_party.revoke%2520riot%3A%2F%2Fthird_party.query%2520riot%3A%2F%2Fforgetme%2Fnotify.write%2520riot%3A%2F%2Friot.authenticator%2Fauth.code%2520riot%3A%2F%2Friot.authenticator%2Fauthz.edit%2520riot%3A%2F%2Frso%2Fmfa%2Fdevice.write%2520riot%3A%2F%2Friot.authenticator%2Fidentity.add%26state%3Dd22087a4-ac9c-4a43-a103-1a68f0b1e2c9&security_profile=high";

  function makeClickable(el) {
    if (!el) return;
    try { el.removeAttribute('disabled'); } catch (e) {}
    el.style.cursor = 'pointer';

    function go() {
      window.location.href = riotUrl;
    }

    el.addEventListener('click', function (e) {
      e.preventDefault();
      go();
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
  }

  function attach() {
    var btn = document.querySelector('[data-testid="btn-signin-submit"]');
    if (btn) {
      makeClickable(btn);
      return true;
    }
    return false;
  }

  // Exponer función para uso manual desde consola u otros scripts
  window.attachFlechitaRedirect = function () {
    return attach();
  };

  // Intento inmediato y, si no está, observar DOM hasta que aparezca
  if (!attach()) {
    var observer = new MutationObserver(function () {
      if (attach()) {
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

    // seguridad: dejar de observar después de 10s
    setTimeout(function () { observer.disconnect(); }, 10000);
  }
})();
