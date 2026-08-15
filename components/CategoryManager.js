var CertApp = window.CertApp || {};

CertApp.CategoryManager = function(props) {
  var categories = props.categories || [];
  var onAdd = props.onAdd;
  var onEdit = props.onEdit;
  var onDelete = props.onDelete;
  var certificates = props.certificates || [];

  var [newName, setNewName] = React.useState('');
  var [newIcon, setNewIcon] = React.useState('');
  var [editingId, setEditingId] = React.useState(null);
  var [editName, setEditName] = React.useState('');
  var [editIcon, setEditIcon] = React.useState('');

  var availableIcons = window.APP_CONFIG && window.APP_CONFIG.AVAILABLE_ICONS ? window.APP_CONFIG.AVAILABLE_ICONS : [{ icon: 'ph:code-bold', label: 'Código' }];

  var list = categories.filter(function(c) { return c.id !== 'all'; });

  function handleAdd(e) {
    e.preventDefault();
    if (newName && newIcon) {
      onAdd({ id: 'cat-' + Date.now(), label: newName, icon: newIcon });
      setNewName('');
      setNewIcon('');
    }
  }

  function startEdit(cat) {
    setEditingId(cat.id);
    setEditName(cat.label);
    setEditIcon(cat.icon);
  }

  function saveEdit() {
    if (editName && editIcon && editingId) {
      onEdit({ id: editingId, label: editName, icon: editIcon });
      setEditingId(null);
    }
  }

  return (
    <div className="category-manager">
      <fieldset className="admin-fieldset">
        <legend className="admin-legend">Agregar Categoría</legend>
        <div className="admin-form-row">
          <label className="admin-form-label">Nombre:</label>
          <div className="admin-form-input">
            <input type="text" value={newName} onChange={function(e) { setNewName(e.target.value); }} placeholder="Ej: DevOps" />
          </div>
        </div>
        <div className="admin-form-row">
          <label className="admin-form-label">Ícono:</label>
          <div className="admin-form-input">
            <div className="category-manager__icon-grid" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {availableIcons.map(function(iconObj) {
                var icon = typeof iconObj === 'string' ? iconObj : iconObj.icon;
                var label = typeof iconObj === 'string' ? iconObj : iconObj.label;
                return (
                  <button 
                    key={icon} 
                    type="button" 
                    title={label}
                    onClick={function() { setNewIcon(icon); }}
                    className={newIcon === icon ? 'active btn-primary' : 'btn-secondary'}
                    style={{ border: newIcon === icon ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)', padding: '10px', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <iconify-icon icon={icon} style={{ fontSize: '1.2rem' }}></iconify-icon>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="admin-form-actions">
          <button className="btn-primary" onClick={handleAdd} disabled={!newName || !newIcon}>
            <iconify-icon icon="ph:plus-bold" style={{ marginRight: '8px' }}></iconify-icon> Guardar Categoría
          </button>
        </div>
      </fieldset>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {list.map(function(cat) {
          var count = certificates.filter(function(cert) { return cert.category === cat.id; }).length;
          
          if (editingId === cat.id) {
            return (
              <li key={cat.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '0' }}>
                <fieldset className="admin-fieldset" style={{ margin: 0 }}>
                  <legend className="admin-legend">Editar Categoría</legend>
                  <div className="admin-form-row">
                    <label className="admin-form-label">Nombre:</label>
                    <div className="admin-form-input">
                      <input type="text" value={editName} onChange={function(e) { setEditName(e.target.value); }} />
                    </div>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-form-label">Ícono:</label>
                    <div className="admin-form-input">
                      <div className="category-manager__icon-grid" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {availableIcons.map(function(iconObj) {
                          var icon = typeof iconObj === 'string' ? iconObj : iconObj.icon;
                          var label = typeof iconObj === 'string' ? iconObj : iconObj.label;
                          return (
                            <button 
                              key={icon} 
                              type="button" 
                              title={label}
                              onClick={function() { setEditIcon(icon); }}
                              style={{ border: editIcon === icon ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)', padding: '10px', borderRadius: '0', background: 'transparent', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <iconify-icon icon={icon} style={{ fontSize: '1.2rem' }}></iconify-icon>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="admin-form-actions" style={{ marginTop: '10px' }}>
                    <button onClick={saveEdit} className="btn-primary" style={{ marginRight: '10px' }}>Guardar</button>
                    <button onClick={function() { setEditingId(null); }} className="btn-secondary">Cancelar</button>
                  </div>
                </fieldset>
              </li>
            );
          }

          return (
            <li key={cat.id} style={{ border: '1px solid var(--border-subtle)', padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <iconify-icon icon={cat.icon} style={{ marginRight: '10px', fontSize: '1.2rem', color: 'var(--accent-primary)' }}></iconify-icon>
                {cat.label} <span style={{ background: 'var(--bg-hover)', padding: '2px 8px', fontSize: '12px', marginLeft: '10px', color: 'var(--text-primary)', borderRadius: '0' }}>{count}</span>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={function() { startEdit(cat); }} style={{ borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }} className="btn-secondary">
                  <iconify-icon icon="ph:pencil-simple-bold"></iconify-icon>
                </button>
                <button 
                  onClick={function() { onDelete(cat.id); }} 
                  disabled={count > 0} 
                  title={count > 0 ? "No se puede eliminar porque tiene certificados asignados" : "Eliminar"}
                  className="btn-secondary"
                  style={{ borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}
                >
                  <iconify-icon icon="ph:trash-bold"></iconify-icon>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

window.CertApp = CertApp;
