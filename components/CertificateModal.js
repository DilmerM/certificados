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

CertApp.CertificateModal = function(props) {
  var certificate = props.certificate;
  var onClose = props.onClose;
  var onEdit = props.onEdit;
  var onNext = props.onNext;
  var onPrev = props.onPrev;

  React.useEffect(function() {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    }
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return function() {
      document.body.style.overflow = 'auto';
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
    <div className="modal-backdrop" onClick={handleBackdropClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', display: 'flex', padding: '10px' }}><iconify-icon icon="ph:x-bold"></iconify-icon></button>
      
      {onPrev && <button onClick={onPrev} style={{ position: 'absolute', left: '20px', background: 'none', border: 'none', color: 'white', fontSize: '48px', cursor: 'pointer', display: 'flex' }}><iconify-icon icon="ph:caret-left-bold"></iconify-icon></button>}
      
      <div className="modal-content" style={{ background: 'var(--bg-color, #fff)', color: 'var(--text-color, #000)', maxWidth: '900px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
        <img src={certificate.url} alt={certificate.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
        <div style={{ padding: '20px' }}>
          <h2>{certificate.title}</h2>
          <div style={{ margin: '10px 0', opacity: 0.8 }}>
            <span>{certificate.category}</span>
            {certificate.institution && <span> · {certificate.institution}</span>}
            {certificate.date && <span> · {formatDate(certificate.date)}</span>}
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button onClick={handleDownload} style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><iconify-icon icon="ph:download-simple-bold"></iconify-icon> Descargar</button>
            {onEdit && <button onClick={handleEdit} style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><iconify-icon icon="ph:pencil-simple-bold"></iconify-icon> Editar</button>}
          </div>
        </div>
      </div>

      {onNext && <button onClick={onNext} style={{ position: 'absolute', right: '20px', background: 'none', border: 'none', color: 'white', fontSize: '48px', cursor: 'pointer', display: 'flex' }}><iconify-icon icon="ph:caret-right-bold"></iconify-icon></button>}
    </div>
  );
};

window.CertApp = CertApp;
