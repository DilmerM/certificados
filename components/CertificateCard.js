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
  var index = props.index;
  var onSelect = props.onSelect;

  var btnHoverState = React.useState(false);
  var isBtnHovered = btnHoverState[0];
  var setIsBtnHovered = btnHoverState[1];

  function handleError(e) {
    e.target.src = 'https://placehold.co/600x400?text=Imagen+No+Disponible';
  }

  function handleClick() {
    onSelect(certificate);
  }

  var delayStyle = { animationDelay: (index * 0.05) + 's' };

  var btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: isBtnHovered ? '#4f6df5' : 'rgba(15, 23, 42, 0.65)',
    color: '#ffffff',
    border: isBtnHovered ? '1.5px solid #4f6df5' : '1.5px solid rgba(255, 255, 255, 0.85)',
    padding: '10px 22px',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    boxShadow: isBtnHovered ? '0 6px 20px rgba(79, 109, 245, 0.55)' : '0 4px 14px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: isBtnHovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0)',
    borderRadius: '0'
  };

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
          <button 
            className="certificate-card__view-btn" 
            type="button"
            style={btnStyle}
            onMouseEnter={function(e) { e.stopPropagation(); setIsBtnHovered(true); }}
            onMouseLeave={function(e) { e.stopPropagation(); setIsBtnHovered(false); }}
          >
            <span>VER CERTIFICADO</span>
          </button>
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
          <span className="certificate-card__category">{getCategoryLabel(certificate.category)}</span>
        </div>
      </div>
    </div>
  );
};

window.CertApp = CertApp;
