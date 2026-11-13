var CertApp = window.CertApp || {};

function formatDate(dateStr) {
  if (!dateStr) return '';
  var months = ['enero','febrero','marzo','abril','mayo','junio',
                'julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  var d = parseInt(parts[2], 10);
  var m = parseInt(parts[1], 10) - 1;
  var y = parts[0];
  return d + ' de ' + months[m] + ' de ' + y;
}

function getCategoryLabel(catId) {
  if (!catId) return '';
  var cats = (window.EXPORTED_DATA && window.EXPORTED_DATA.categories) || [];
  for (var i = 0; i < cats.length; i++) {
    if (cats[i].id === catId) return cats[i].label;
  }
  return catId;
}

CertApp.CertificateCard = function(props) {
  var certificate = props.certificate;
  var index       = props.index;
  var onSelect    = props.onSelect;

  function handleError(e) {
    e.target.src = 'https://placehold.co/600x400?text=Sin+imagen';
  }

  function open() { onSelect(certificate); }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  }

  var delay = { animationDelay: (index * 0.05) + 's' };
  var altText = 'Certificado: ' + certificate.title +
    (certificate.institution ? ' — ' + certificate.institution : '');

  return (
    <article
      className="certificate-card stagger-anim"
      style={delay}
      onClick={open}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={'Abrir: ' + certificate.title}
    >
      {/* ── Miniatura: proporción fija, sin overlay ── */}
      <div className="certificate-card__thumb">
        <img
          src={certificate.url}
          alt={altText}
          className="certificate-card__image"
          onError={handleError}
        />
      </div>

      {/* ── Contenido ── */}
      <div className="certificate-card__info">

        {/* Título */}
        <h3 className="certificate-card__title">{certificate.title}</h3>

        {/* Metadatos: institución + fecha */}
        <div className="certificate-card__meta">
          {certificate.institution && (
            <div className="certificate-card__meta-item">
              <iconify-icon icon="ph:buildings-duotone" aria-hidden="true"></iconify-icon>
              <span className="certificate-card__institution">{certificate.institution}</span>
            </div>
          )}
          {certificate.date && (
            <div className="certificate-card__meta-item">
              <iconify-icon icon="ph:calendar-blank-duotone" aria-hidden="true"></iconify-icon>
              <span>{formatDate(certificate.date)}</span>
            </div>
          )}
        </div>

        {/* Footer: categoría + acción */}
        <div className="certificate-card__footer">
          {certificate.category && (
            <span className="certificate-card__category">
              {getCategoryLabel(certificate.category)}
            </span>
          )}
          <span className="certificate-card__view-link" aria-hidden="true">
            Ver certificado →
          </span>
        </div>

      </div>
    </article>
  );
};

window.CertApp = CertApp;
