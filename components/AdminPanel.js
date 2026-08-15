var CertApp = window.CertApp || {};

function AdminPanel(props) {
  var isOpen = props.isOpen;
  var isAuthenticated = props.isAuthenticated;
  var onToggle = props.onToggle;
  var onAuth = props.onAuth;
  var certificates = props.certificates || [];
  var onUpload = props.onUpload;
  var onDelete = props.onDelete;
  var onEdit = props.onEdit;
  var categories = props.categories || [];
  var onAddCategory = props.onAddCategory;
  var onEditCategory = props.onEditCategory;
  var onDeleteCategory = props.onDeleteCategory;
  var qrUrl = props.qrUrl;
  var onQrChange = props.onQrChange;

  var activeTabState = React.useState(0);
  var activeTab = activeTabState[0];
  var setActiveTab = activeTabState[1];

  var passwordState = React.useState('');
  var password = passwordState[0];
  var setPassword = passwordState[1];

  function formatDate(dateStr) {
    if (!dateStr) return '';
    var months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    var parts = dateStr.split('-');
    var d = parseInt(parts[2], 10);
    var m = parseInt(parts[1], 10) - 1;
    var y = parts[0];
    return d + ' de ' + months[m] + ' de ' + y;
  }

  function handleAuthSubmit(e) {
    e.preventDefault();
    onAuth(password);
    setPassword('');
  }

  var tabLabels = ['Subir', 'Certificados', 'Categorías', 'Ajustes'];

  return (
    <React.Fragment>
      <button className="admin-toggle" onClick={onToggle}>
        <i className="fa-solid fa-gear"></i>
      </button>

      <div className={"admin-panel" + (isOpen ? " admin-panel--open" : "")}>
        <div className="admin-panel__header">
          <h2>Administración</h2>
          <button className="admin-panel__close" onClick={onToggle}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="admin-panel__body">
            <div className="password-gate">
              <i className="fa-solid fa-lock password-gate__icon"></i>
              <h3 className="password-gate__title">Panel de Administración</h3>
              <p className="password-gate__text">Ingrese la contraseña para continuar</p>
              <form onSubmit={handleAuthSubmit}>
                <input
                  type="password"
                  className="password-gate__input"
                  value={password}
                  onChange={function(e) { setPassword(e.target.value); }}
                  placeholder="Contraseña"
                />
                <button type="submit" className="password-gate__btn">Ingresar</button>
              </form>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className="admin-panel__tabs">
              {tabLabels.map(function(label, i) {
                return (
                  <button
                    key={label}
                    className={"admin-panel__tab" + (activeTab === i ? " active" : "")}
                    onClick={function() { setActiveTab(i); }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="admin-panel__body">
              {activeTab === 0 && (
                <CertApp.UploadForm onUpload={onUpload} categories={categories} />
              )}

              {activeTab === 1 && (
                <div className="admin-cert-list">
                  {certificates.length === 0 ? (
                    <div className="empty-state">
                      <i className="fa-solid fa-folder-open"></i>
                      <p>No hay certificados</p>
                    </div>
                  ) : (
                    certificates.map(function(cert) {
                      return (
                        <div className="admin-cert-item" key={cert.id}>
                          <img
                            src={cert.url}
                            alt={cert.title}
                            className="admin-cert-item__thumb"
                          />
                          <div className="admin-cert-item__info">
                            <h4>{cert.title}</h4>
                            <span className="admin-cert-item__category">{cert.category}</span>
                            {cert.date && (
                              <span className="admin-cert-item__date">{formatDate(cert.date)}</span>
                            )}
                          </div>
                          <div className="admin-cert-item__actions">
                            <button
                              className="admin-cert-item__edit"
                              onClick={function() { onEdit(cert); }}
                              title="Editar"
                            >
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button
                              className="admin-cert-item__delete"
                              onClick={function() { onDelete(cert); }}
                              title="Eliminar"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {activeTab === 2 && (
                <CertApp.CategoryManager
                  categories={categories}
                  onAdd={onAddCategory}
                  onEdit={onEditCategory}
                  onDelete={onDeleteCategory}
                  certificates={certificates}
                />
              )}

              {activeTab === 3 && (
                <div className="admin-panel__section anim-fade-in">
                  <h3>Ajustes Adicionales</h3>
                  <fieldset className="admin-fieldset">
                    <legend className="admin-legend">Código QR de Contacto</legend>
                    <div className="admin-form-row">
                      <label className="admin-form-label">Subir Imagen QR (aparecerá arriba):</label>
                      <div className="admin-form-input">
                        <input type="file" accept="image/*" onChange={function(e) {
                          if (e.target.files && e.target.files[0]) {
                            var reader = new FileReader();
                            reader.onload = function(evt) {
                              if (onQrChange) onQrChange(evt.target.result);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }} />
                      </div>
                    </div>
                    {qrUrl && (
                      <div style={{ marginTop: '15px' }}>
                        <img src={qrUrl} alt="QR actual" style={{ width: '120px', height: '120px', objectFit: 'contain', border: '1px solid var(--border-medium)', background: 'white' }} />
                        <button className="btn-secondary" style={{ display: 'block', marginTop: '10px' }} onClick={function() { if (onQrChange) onQrChange(null); }}>
                          <i className="fa-solid fa-trash"></i> Eliminar QR
                        </button>
                      </div>
                    )}
                  </fieldset>

                  <fieldset className="admin-fieldset" style={{ marginTop: '20px' }}>
                    <legend className="admin-legend">Publicar en Vercel</legend>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.5' }}>
                      Actualmente tus datos solo existen en este navegador. Para que todo el mundo pueda verlos en Vercel, debes hacerlos estáticos en el código. Haz clic abajo para descargar tu configuración actual y reemplázala en el archivo <code>utils/constants.js</code>.
                    </p>
                    <button className="btn-primary" style={{ width: '100%' }} onClick={function() {
                      var dataToExport = {
                        certificates: certificates,
                        categories: categories,
                        qrUrl: qrUrl
                      };
                      var fileContent = "/* Archivo exportado automáticamente */\\n\\n" + 
                                        "window.EXPORTED_DATA = " + JSON.stringify(dataToExport, null, 2) + ";";
                      
                      var blob = new Blob([fileContent], { type: "text/javascript" });
                      var link = document.createElement("a");
                      link.href = URL.createObjectURL(blob);
                      link.download = "exported_data.js";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}>
                      <i className="fa-solid fa-file-export"></i> Descargar Datos Actuales
                    </button>
                  </fieldset>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

CertApp.AdminPanel = AdminPanel;
window.CertApp = CertApp;
