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

CertApp.CertificateModal = function(props) {
  var certificate = props.certificate;
  var onClose = props.onClose;
  var onEdit = props.onEdit;
  var onNext = props.onNext;
  var onPrev = props.onPrev;
  var isAuthenticated = props.isAuthenticated;

  React.useEffect(function() {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    }

    var supportsGutter = window.CSS && CSS.supports && CSS.supports('scrollbar-gutter', 'stable');
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    var originalOverflow = document.body.style.overflow;
    var originalPaddingRight = document.body.style.paddingRight;

    if (!supportsGutter && scrollbarWidth > 0) {
      document.body.style.paddingRight = scrollbarWidth + 'px';
    }
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return function() {
      document.body.style.overflow = originalOverflow;
      if (!supportsGutter && scrollbarWidth > 0) {
        document.body.style.paddingRight = originalPaddingRight;
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  if (!certificate) return null;

  function handleDownload() {
    window.open(certificate.url, '_blank');
  }

  function handleEdit() {
    if (onEdit) onEdit(certificate);
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-backdrop anim-fade-in" onClick={handleBackdropClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', display: 'flex', padding: '10px' }} aria-label="Cerrar"><iconify-icon icon="ph:x-bold"></iconify-icon></button>
      
      {onPrev && <button onClick={onPrev} style={{ position: 'absolute', left: '20px', background: 'none', border: 'none', color: 'white', fontSize: '48px', cursor: 'pointer', display: 'flex' }} aria-label="Anterior"><iconify-icon icon="ph:caret-left-bold"></iconify-icon></button>}
      
      <div 
        className="modal-content" 
        style={{ 
          background: 'var(--bg-secondary)', 
          color: 'var(--text-primary)', 
          maxWidth: '860px', 
          width: '92%', 
          maxHeight: '90vh', 
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '8px', 
          border: '1px solid var(--border-medium)', 
          boxShadow: 'var(--depth-floating)',
          overflow: 'hidden'
        }}
      >
        <div style={{ flex: '1 1 auto', overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
            <img 
              src={certificate.url} 
              alt={certificate.title} 
              style={{ maxWidth: '100%', maxHeight: '54vh', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: '4px' }} 
            />
          </div>
          <div style={{ padding: '20px 24px' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{certificate.title}</h2>
            <div style={{ margin: '0 0 16px', color: 'var(--text-secondary)', fontSize: '0.88rem', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{getCategoryLabel(certificate.category)}</span>
              {certificate.institution && <span>· {certificate.institution}</span>}
              {certificate.date && <span>· {formatDate(certificate.date)}</span>}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleDownload} 
                style={{ 
                  padding: '9px 18px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                <iconify-icon icon="ph:arrow-square-out-bold"></iconify-icon> Ver Certificado
              </button>
              {onEdit && (
                <button 
                  onClick={handleEdit} 
                  title={!isAuthenticated ? "Requiere contraseña de administrador" : "Editar certificado"}
                  style={{ 
                    padding: '9px 16px', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    borderRadius: '6px',
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-medium)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <iconify-icon icon={!isAuthenticated ? "ph:lock-simple-bold" : "ph:pencil-simple-bold"}></iconify-icon> 
                  Editar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {onNext && <button onClick={onNext} style={{ position: 'absolute', right: '20px', background: 'none', border: 'none', color: 'white', fontSize: '48px', cursor: 'pointer', display: 'flex' }} aria-label="Siguiente"><iconify-icon icon="ph:caret-right-bold"></iconify-icon></button>}
    </div>
  );
};

window.CertApp = CertApp;
