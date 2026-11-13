var CertApp = window.CertApp || {};

CertApp.Header = function(props) {
  var theme = props.theme;
  var onToggleTheme = props.onToggleTheme;
  var qrUrl = props.qrUrl;

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
                title="Enviar correo"
                aria-label="Correo electrónico"
              >
                <iconify-icon icon="ph:envelope-simple-bold" aria-hidden="true"></iconify-icon>
                <span>dilmern9@gmail.com</span>
              </a>
              
              <a 
                href="tel:+50498892081" 
                className="contact-chip" 
                title="Llamar al +504 9889-2081"
                aria-label="Número de teléfono"
              >
                <iconify-icon icon="ph:phone-bold" aria-hidden="true"></iconify-icon>
                <span>+504 9889-2081</span>
              </a>
              
              <span 
                className="contact-chip contact-chip--static" 
                title="Ubicación geográfica"
                aria-label="Ubicación"
              >
                <iconify-icon icon="ph:map-pin-bold" aria-hidden="true"></iconify-icon>
                <span>Tegucigalpa, HN</span>
              </span>
            </div>
          </div>

          {/* ── Columna Derecha: QR Visible + Ver CV + Tema ── */}
          <aside className="site-header__aside">
            {/* Toggle de Tema */}
            <div className="site-header__theme-wrap">
              <CertApp.ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>

            {/* Código QR Siempre Visible */}
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

            {/* Botón Ver CV justo debajo del QR */}
            <a
              href="https://docs.google.com/document/d/11sUW-cUz-EbQGBVD2xDnc0QsesHj7D_xjpjmdeKj-xU/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__cv-btn"
              title="Abrir CV de Dilmer Núñez en Google Docs"
            >
              <iconify-icon icon="ph:file-doc-bold" aria-hidden="true"></iconify-icon>
              <span>Ver CV</span>
            </a>
          </aside>

        </div>
      </div>
    </header>
  );
};

window.CertApp = CertApp;
