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
    <div className="edit-modal" onClick={handleBackdropClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1001, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'var(--bg-color, #fff)', color: 'var(--text-color, #000)', padding: '20px', width: '600px', maxWidth: '90%', borderRadius: '0' }}>
        <h2 style={{ marginBottom: '20px' }}>Editar Certificado</h2>
        <div style={{ marginBottom: '20px' }}>
          <img src={certificate.url} alt="preview" style={{ width: '150px', display: 'block', margin: '0 auto', borderRadius: '0' }} />
          {date && <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '5px' }}>Fecha actual: {formatDate(date)}</div>}
        </div>
        
        <form onSubmit={handleSubmit} className="admin-form edit-modal__body">
          <fieldset className="admin-fieldset">
            <legend className="admin-legend">Información General</legend>
            <div className="admin-form-row">
               <label className="admin-form-label">Título:</label>
               <div className="admin-form-input">
                 <input type="text" value={title} onChange={function(e) { setTitle(e.target.value); }} style={{ width: '100%', boxSizing: 'border-box' }} required />
               </div>
            </div>
            <div className="admin-form-row">
               <label className="admin-form-label">Categoría:</label>
               <div className="admin-form-input">
                 <select value={category} onChange={function(e) { setCategory(e.target.value); }} style={{ width: '100%', boxSizing: 'border-box' }} required>
                   {availableCategories.map(function(c) {
                     return <option key={c.id} value={c.id}>{c.label}</option>;
                   })}
                 </select>
               </div>
            </div>
          </fieldset>

          <fieldset className="admin-fieldset">
            <legend className="admin-legend">Fechas y Detalles</legend>
            <div className="admin-form-row">
               <label className="admin-form-label">Institución:</label>
               <div className="admin-form-input">
                 <input type="text" value={institution} onChange={function(e) { setInstitution(e.target.value); }} style={{ width: '100%', boxSizing: 'border-box' }} />
               </div>
            </div>
            <div className="admin-form-row">
               <label className="admin-form-label">Fecha:</label>
               <div className="admin-form-input">
                 <input type="date" value={date} onChange={function(e) { setDate(e.target.value); }} style={{ width: '100%', boxSizing: 'border-box' }} />
               </div>
            </div>
          </fieldset>
          
          <div className="admin-form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ borderRadius: '0' }}>Cancelar</button>
            <button type="submit" className="btn-primary" style={{ borderRadius: '0' }}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

window.CertApp = CertApp;
