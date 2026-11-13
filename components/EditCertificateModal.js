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

CertApp.EditCertificateModal = function(props) {
  var certificate = props.certificate;
  var categories = props.categories || [];
  var onSave = props.onSave;
  var onClose = props.onClose;

  var [title, setTitle] = React.useState(certificate ? certificate.title : '');
  var [category, setCategory] = React.useState(certificate ? certificate.category : '');
  var [date, setDate] = React.useState(certificate ? (certificate.date || '') : '');
  var [institution, setInstitution] = React.useState(certificate ? (certificate.institution || '') : '');

  var availableCategories = categories.filter(function(c) { return c.id !== 'all'; });

  React.useEffect(function() {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return function() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!certificate) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !category) return;
    
    var updated = Object.assign({}, certificate, {
      title: title,
      category: category,
      date: date,
      institution: institution
    });
    onSave(updated);
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="edit-modal anim-fade-in" onClick={handleBackdropClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1001, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', padding: '20px 24px', width: '520px', maxWidth: '100%', maxHeight: '100%', overflowY: 'auto', borderRadius: '8px', border: '1px solid var(--border-medium)', boxShadow: 'var(--depth-floating)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Editar Certificado</h2>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer', padding: '4px' }}
            aria-label="Cerrar"
          >
            <iconify-icon icon="ph:x-bold"></iconify-icon>
          </button>
        </div>

        <div style={{ marginBottom: '12px', textAlign: 'center' }}>
          <img src={certificate.url} alt="preview" style={{ maxWidth: '120px', maxHeight: '72px', objectFit: 'contain', margin: '0 auto', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }} />
          {date && <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Fecha actual: {formatDate(date)}</div>}
        </div>
        
        <form onSubmit={handleSubmit} className="admin-form edit-modal__body">
          <fieldset className="admin-fieldset" style={{ border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '10px 14px', marginBottom: '12px' }}>
            <legend className="admin-legend" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, padding: '0 8px' }}>Información General</legend>
            <div className="admin-form-row" style={{ marginBottom: '8px' }}>
               <label className="admin-form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-secondary)' }}>Título:</label>
               <div className="admin-form-input">
                 <input 
                   type="text" 
                   value={title} 
                   onChange={function(e) { setTitle(e.target.value); }} 
                   style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', fontSize: '0.9rem', borderRadius: '4px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }} 
                   required 
                 />
               </div>
            </div>
            <div className="admin-form-row">
               <label className="admin-form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-secondary)' }}>Categoría:</label>
               <div className="admin-form-input">
                 <select 
                   value={category} 
                   onChange={function(e) { setCategory(e.target.value); }} 
                   style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', fontSize: '0.9rem', borderRadius: '4px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }} 
                   required
                 >
                   {availableCategories.map(function(c) {
                     return <option key={c.id} value={c.id}>{c.label}</option>;
                   })}
                 </select>
               </div>
            </div>
          </fieldset>

          <fieldset className="admin-fieldset" style={{ border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '10px 14px', marginBottom: '14px' }}>
            <legend className="admin-legend" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, padding: '0 8px' }}>Fechas y Detalles</legend>
            <div className="admin-form-row" style={{ marginBottom: '8px' }}>
               <label className="admin-form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-secondary)' }}>Institución:</label>
               <div className="admin-form-input">
                 <input 
                   type="text" 
                   value={institution} 
                   onChange={function(e) { setInstitution(e.target.value); }} 
                   style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', fontSize: '0.9rem', borderRadius: '4px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }} 
                 />
               </div>
            </div>
            <div className="admin-form-row">
               <label className="admin-form-label" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-secondary)' }}>Fecha:</label>
               <div className="admin-form-input">
                 <input 
                   type="date" 
                   value={date} 
                   onChange={function(e) { setDate(e.target.value); }} 
                   style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', fontSize: '0.9rem', borderRadius: '4px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }} 
                 />
               </div>
            </div>
          </fieldset>
          
          <div className="admin-form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.86rem' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              style={{ padding: '8px 18px', backgroundColor: 'var(--accent-primary)', border: 'none', color: '#ffffff', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.86rem' }}
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

window.CertApp = CertApp;
