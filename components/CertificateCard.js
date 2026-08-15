var CertApp = window.CertApp || {};

function formatDate(dateStr) {
  if (!dateStr) return '';
  var months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  var d = parseInt(parts[2], 10);
  var m = parseInt(parts[1], 10) - 1;
  var y = parts[0];
  return d + ' de ' + months[m] + ' de ' + y;
}

CertApp.CertificateCard = function(props) {
  var certificate = props.certificate;
  var index = props.index;
  var onSelect = props.onSelect;

  function handleError(e) {
    e.target.src = 'https://placehold.co/600x400?text=Imagen+No+Disponible';
  }

  function handleClick() {
    onSelect(certificate);
  }

  var delayStyle = { animationDelay: (index * 0.05) + 's' };

  return (
    <div className="certificate-card hover-premium stagger-anim" style={delayStyle} onClick={handleClick}>
      <div className="certificate-card__image-wrapper">
        <img 
          src={certificate.url} 
          alt={certificate.title} 
          className="certificate-card__image" 
          onError={handleError} 
        />
        <div className="certificate-card__overlay">
          <button className="certificate-card__view-btn">VER CERTIFICADO</button>
        </div>
      </div>
      <div className="certificate-card__content certificate-card__info">
        <h3 className="certificate-card__title">{certificate.title}</h3>
        <div className="certificate-card__meta-premium">
          {certificate.institution && (
            <div className="certificate-card__meta-item">
              <iconify-icon icon="ph:buildings-duotone"></iconify-icon>
              <span>{certificate.institution}</span>
            </div>
          )}
          {certificate.date && (
            <div className="certificate-card__meta-item">
              <iconify-icon icon="ph:calendar-blank-duotone"></iconify-icon>
              <span>{formatDate(certificate.date)}</span>
            </div>
          )}
        </div>
        <div className="certificate-card__meta" style={{marginTop: 'var(--space-md)'}}>
          <span className="certificate-card__category">{certificate.category}</span>
        </div>
      </div>
    </div>
  );
};

window.CertApp = CertApp;
