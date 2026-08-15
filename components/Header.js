var CertApp = window.CertApp || {};

CertApp.Header = function(props) {
  var totalCount = props.totalCount;
  var theme = props.theme;
  var onToggleTheme = props.onToggleTheme;
  var qrUrl = props.qrUrl;
  var subtitle = window.APP_CONFIG && window.APP_CONFIG.SUBTITLE ? window.APP_CONFIG.SUBTITLE : 'Mi Portafolio';

  var countText = totalCount === 0 ? 'Sin certificados aún' : totalCount + (totalCount === 1 ? ' certificado' : ' certificados');

  return (
    <header className="site-header anim-fade-in-down">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="site-header__left" style={{ width: '100%', maxWidth: '800px' }}>
          <div style={{ textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
            Portafolio de Certificados Profesionales
          </div>
          <h1 className="site-header__title" style={{ fontSize: 'var(--font-4xl)', marginBottom: '5px', letterSpacing: '-0.02em' }}>Dilmer Eli Núñez Moreira</h1>
          <p className="site-header__subtitle" style={{ fontSize: 'var(--font-lg)', color: 'var(--accent-primary)', fontWeight: '600' }}>Pasante Universitario: Licenciatura en Informática Administrativa</p>
          <div className="site-header__line" style={{ height: '4px', background: 'var(--accent-primary)', width: '60px', margin: '20px 0' }}></div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '25px', fontSize: '1.05rem' }}>
            Comprometido con el desarrollo técnico y el trabajo en equipo. Apasionado por las bases de datos (SQL, Oracle), la automatización de procesos y el desarrollo de software. Con actitud proactiva orientada al aprendizaje continuo y la mejora de sistemas.
          </p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
            <span style={{ background: 'var(--bg-elevated)', padding: '6px 12px', fontSize: 'var(--font-sm)', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <iconify-icon icon="ph:envelope-simple-bold" style={{ color: 'var(--accent-primary)' }}></iconify-icon> dilmern9@gmail.com
            </span>
            <span style={{ background: 'var(--bg-elevated)', padding: '6px 12px', fontSize: 'var(--font-sm)', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <iconify-icon icon="ph:phone-bold" style={{ color: 'var(--accent-primary)' }}></iconify-icon> 9889-2081
            </span>
            <span style={{ background: 'var(--bg-elevated)', padding: '6px 12px', fontSize: 'var(--font-sm)', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <iconify-icon icon="ph:map-pin-bold" style={{ color: 'var(--accent-primary)' }}></iconify-icon> Tegucigalpa, HN
            </span>
          </div>
          <div className="site-header__meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '1.1rem' }}>
            <iconify-icon icon="ph:certificate-bold" style={{ color: 'var(--accent-primary)', fontSize: '1.4rem' }}></iconify-icon> {countText}
          </div>
        </div>
        <div className="site-header__right" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          {qrUrl ? (
            <img src={qrUrl} alt="QR Contacto" style={{ width: '150px', height: '150px', objectFit: 'contain', border: '1px solid var(--border-medium)', background: 'white', padding: '5px' }} />
          ) : (
            <div id="qr-placeholder" style={{ width: '150px', height: '150px', border: '1px dashed var(--border-medium)', opacity: 0 }}></div>
          )}
          <div className="site-header__actions">
            <CertApp.ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

window.CertApp = CertApp;
