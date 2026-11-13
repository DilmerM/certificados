var CertApp = window.CertApp || {};

CertApp.Header = function(props) {
  var theme = props.theme;
  var onToggleTheme = props.onToggleTheme;
  var qrUrl = props.qrUrl;

  var qrModalState = React.useState(false);
  var isQrModalOpen = qrModalState[0];
  var setIsQrModalOpen = qrModalState[1];

  var SKILLS = ['SQL', 'Oracle Academy', 'Python', 'JavaScript', 'Git', 'IA & Automatización'];

  return (
    <header className="site-header anim-fade-in-down">
      <div className="container">
        <div className="site-header__content">

          {/* ── Columna Izquierda: Perfil y Contacto ── */}
          <div className="site-header__main">
            <div className="site-header__eyebrow">
              Portafolio de Certificados Profesionales
            </div>
            
            <h1 className="site-header__title">Dilmer Eli Núñez Moreira</h1>
            
            <p className="site-header__subtitle">
              Pasante Universitario · Licenciatura en Informática Administrativa
            </p>
            
            <div className="site-header__divider"></div>
            
            <p className="site-header__bio">
              96 % de la carrera completada (UNAH). Especialización en <strong>SQL</strong>,{' '}
              <strong>Oracle Academy</strong> y automatización de procesos con <strong>IA</strong>.
            </p>

            {/* Chips de Habilidades Técnicas */}
            <div className="site-header__skills" aria-label="Habilidades técnicas">
              {SKILLS.map(function(skill) {
                return (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                );
              })}
            </div>

            {/* Vías de Contacto Profesionales */}
            <div className="site-header__contacts">
              <a 
                href="mailto:dilmern9@gmail.com" 
                className="contact-chip" 
                title="Enviar correo a dilmern9@gmail.com"
                aria-label="Correo electrónico"
              >
                <iconify-icon icon="ph:envelope-simple-bold" aria-hidden="true"></iconify-icon>
                <span>dilmern9@gmail.com</span>
              </a>
              
              <a 
                href="https://wa.me/50498892081" 
                target="_blank"
                rel="noopener noreferrer"
                className="contact-chip contact-chip--whatsapp" 
                title="Chatear por WhatsApp al +504 9889-2081"
                aria-label="Contactar por WhatsApp"
              >
                <iconify-icon icon="ph:whatsapp-logo-bold" aria-hidden="true"></iconify-icon>
                <span>+504 9889-2081</span>
              </a>

              <div 
                className="contact-location-info" 
                title="Ubicación geográfica"
              >
                <iconify-icon icon="ph:map-pin-bold" aria-hidden="true"></iconify-icon>
                <span>Tegucigalpa, Honduras</span>
              </div>
            </div>
          </div>

          {/* ── Columna Derecha: QR Visible + Ver CV + Tema ── */}
          <aside className="site-header__aside">
            {/* Toggle de Tema */}
            <div className="site-header__theme-wrap">
              <CertApp.ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>

            {/* Botón Ver CV (CTA Primario) */}
            <a
              href="https://docs.google.com/document/d/11sUW-cUz-EbQGBVD2xDnc0QsesHj7D_xjpjmdeKj-xU/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__cv-btn"
              title="Abrir Currículum Vitae en Google Docs"
            >
              <iconify-icon icon="ph:file-doc-bold" aria-hidden="true"></iconify-icon>
              <span>Ver CV Completo</span>
            </a>

            {/* Botón Compartir QR para móvil */}
            <button
              type="button"
              className="site-header__share-btn"
              onClick={function() { setIsQrModalOpen(true); }}
              title="Compartir portafolio mediante código QR"
            >
              <iconify-icon icon="ph:qr-code-bold" aria-hidden="true"></iconify-icon>
              <span>Compartir QR</span>
            </button>

            {/* Código QR Siempre Visible en Escritorio */}
            <div className="site-header__qr-box">
              {qrUrl ? (
                <img 
                  src={qrUrl} 
                  alt="Código QR para compartir este portafolio" 
                  className="site-header__qr-img" 
                  width="135" 
                  height="135" 
                />
              ) : (
                <div className="site-header__qr-fallback">
                  <iconify-icon icon="ph:qr-code-bold" style={{ fontSize: '3rem', color: 'var(--text-muted)' }}></iconify-icon>
                  <span>QR Portafolio</span>
                </div>
              )}
              <span className="site-header__qr-caption">Escanear portafolio</span>
            </div>
          </aside>

        </div>
      </div>

      {/* Modal para Compartir QR en Pantallas Móviles */}
      {isQrModalOpen && (
        <div className="certificate-modal anim-fade-in" style={{ zIndex: 2600 }}>
          <div className="certificate-modal__backdrop" onClick={function() { setIsQrModalOpen(false); }}></div>
          <div 
            className="certificate-modal__content" 
            style={{ 
              maxWidth: '340px', 
              width: '90%', 
              padding: '24px', 
              textAlign: 'center', 
              borderRadius: '8px', 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border-medium)', 
              boxShadow: 'var(--depth-floating)',
              position: 'relative'
            }}
          >
            <button 
              onClick={function() { setIsQrModalOpen(false); }} 
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}
              aria-label="Cerrar modal de QR"
            >
              <iconify-icon icon="ph:x-bold"></iconify-icon>
            </button>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>
              Compartir Portafolio
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: 1.4 }}>
              Muestra este código a otra persona o reclutador para abrir el portafolio en su dispositivo.
            </p>
            <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', display: 'inline-block', boxShadow: 'var(--depth-subtle)', marginBottom: '16px' }}>
              {qrUrl ? (
                <img src={qrUrl} alt="Código QR" style={{ width: '160px', height: '160px', display: 'block' }} />
              ) : (
                <div style={{ width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <iconify-icon icon="ph:qr-code-bold" style={{ fontSize: '4rem', color: '#64748b' }}></iconify-icon>
                </div>
              )}
            </div>
            <div>
              <button 
                type="button" 
                onClick={function() { setIsQrModalOpen(false); }}
                style={{ width: '100%', padding: '10px', backgroundColor: 'var(--accent-primary)', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

window.CertApp = CertApp;
