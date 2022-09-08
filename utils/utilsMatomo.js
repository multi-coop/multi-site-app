export const matomoScript = (matomoServer, siteId, domain, hasTrackAllOutlinks = false) => {
  const isMatomoCloud = matomoServer.endsWith('.matomo.cloud')
  const urlServer = `${isMatomoCloud ? 'https://' : '//'}${matomoServer}`
  const scriptSrc = `//${isMatomoCloud ? 'cdn.matomo.cloud/' : ''}${matomoServer}/matomo.js`

  // <!-- Matomo -->
  //     var _paq = window._paq = window._paq || [];
  //     // tracker methods like "setCustomDimension" should be called before "trackPageView"
  //     _paq.push(['trackPageView']);
  //     _paq.push(['enableLinkTracking']);
  //     (function() {
  //       var u="https://gitributemulticoop.matomo.cloud/";
  //       _paq.push(['setTrackerUrl', u+'matomo.php']);
  //       _paq.push(['setSiteId', '1']);
  //       var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  //       g.async=true; g.src='//cdn.matomo.cloud/gitributemulticoop.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
  //     })()
  //   <!-- End Matomo Code -->

  return `
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    
    // Code à coller avant la fonction _paq.push(["trackPageView"]);
    _paq.push([function() {
    var self = this;

    function getOriginalVisitorCookieTimeout() {
      var now = new Date(),
      nowTs = Math.round(now.getTime() / 1000),
      visitorInfo = self.getVisitorInfo();
      var createTs = parseInt(visitorInfo[2]);
      var cookieTimeout = 33696000; // 13 mois en secondes
      var originalTimeout = createTs + cookieTimeout - nowTs;
      return originalTimeout;
    }
    this.setVisitorCookieTimeout( getOriginalVisitorCookieTimeout() );
    }]);

    _paq.push(['setDocumentTitle', '${domain}']);
    _paq.push(['trackPageView']);
    // _paq.push(['setLinkClasses', "outlink"]);
    ${hasTrackAllOutlinks ? "_paq.push(['enableLinkTracking']);" : ''}

    (function() {
      var u='${urlServer}/';
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '${siteId}']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src='${scriptSrc}'; s.parentNode.insertBefore(g,s);
    })();
  `
}

export const setMatomoScript = ( appTitle, matomoServer, matomoSiteId, hasTrackAllOutlinks ) => {
  const scriptUniqueId = 'multi-site-app-matomo-script'

  // console.log('\nU > setMatomoScript > ...')

  // console.log('U > setMatomoScript > matomoServer : ', matomoServer)
  // console.log('U > setMatomoScript > matomoSiteId : ', matomoSiteId)
  // console.log('U > setMatomoScript > hasTrackAllOutlinks : ', hasTrackAllOutlinks)

  let domain = document.domain === 'localhost' ? 'localhost (dev)' : document.domain
  domain = `${appTitle} - ${domain}`
  // console.log('U > setMatomoScript > domain : ', domain)

  let matomoScriptElem = document.getElementById(scriptUniqueId)

  if (!matomoScriptElem && matomoServer && matomoSiteId) {
    matomoScriptElem = document.createElement('script')
    // console.log('C > setMatomoScript > matomoScriptElem :', matomoScriptElem)
    matomoScriptElem.setAttribute('id', scriptUniqueId)
    matomoScriptElem.setAttribute('type', 'text/javascript')

    const scriptText = matomoScript(matomoServer, matomoSiteId, domain, hasTrackAllOutlinks)
    // console.log('C > setMatomoScript > scriptText :', scriptText)
    matomoScriptElem.innerHTML = scriptText

    // console.log('C > setMatomoScript > matomoScriptElem :', matomoScriptElem)

    document.head.appendChild(matomoScriptElem)
  }
}
