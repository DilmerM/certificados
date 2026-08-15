var CertApp = window.CertApp || {};

CertApp.UploadForm = function(props) {
  var onUpload = props.onUpload;
  var categories = props.categories || [];

  var [file, setFile] = React.useState(null);
  var [title, setTitle] = React.useState('');
  var [category, setCategory] = React.useState('');
  var [date, setDate] = React.useState('');
  var [institution, setInstitution] = React.useState('');
  var [uploading, setUploading] = React.useState(false);
  var [previewUrl, setPreviewUrl] = React.useState(null);

  var availableCategories = categories.filter(function(c) { return c.id !== 'all'; });

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      var selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!file || !title || !category) return;
    setUploading(true);

    var useLocal = !window.APP_CONFIG || !window.APP_CONFIG.CLOUDINARY || window.APP_CONFIG.CLOUDINARY.CLOUD_NAME === 'TU_CLOUD_NAME';

    if (useLocal) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        var dataURL = evt.target.result;
        var cert = {
          id: 'local-' + Date.now(),
          url: dataURL,
          title: title,
          category: category,
          publicId: 'local-' + Date.now(),
          date: date,
          institution: institution
        };
        onUpload(cert);
        resetForm();
      };
      reader.readAsDataURL(file);
    } else {
      if (window.CloudinaryUtils && window.CloudinaryUtils.upload) {
        window.CloudinaryUtils.upload(file).then(function(result) {
          var cert = {
            id: 'cloud-' + Date.now(),
            url: result.secure_url,
            title: title,
            category: category,
            publicId: result.public_id,
            date: date,
            institution: institution
          };
          onUpload(cert);
          resetForm();
        }).catch(function(err) {
          console.error(err);
          setUploading(false);
          alert('Error al subir');
        });
      }
    }
  }

  function resetForm() {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setTitle('');
    setCategory('');
    setDate('');
    setInstitution('');
    setUploading(false);
    var fileInput = document.getElementById('upload-file-input');
    if (fileInput) fileInput.value = '';
  }

  if (availableCategories.length === 0) {
    return <p>Primero debes crear al menos una categoría</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <fieldset className="admin-fieldset">
        <legend className="admin-legend">Detalles del Certificado</legend>
        
        <div className="admin-form-row">
          <label className="admin-form-label">Título:</label>
          <div className="admin-form-input">
            <input type="text" value={title} onChange={function(e) { setTitle(e.target.value); }} placeholder="Ej: AWS Certified Solutions Architect" required />
          </div>
        </div>
        
        <div className="admin-form-row">
          <label className="admin-form-label">Categoría:</label>
          <div className="admin-form-input">
            <select value={category} onChange={function(e) { setCategory(e.target.value); }} required>
              <option value="">Selecciona una categoría</option>
              {availableCategories.map(function(c) {
                return <option key={c.id} value={c.id}>{c.label}</option>;
              })}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend className="admin-legend">Metadatos</legend>
        <div className="admin-form-row">
          <label className="admin-form-label">Institución:</label>
          <div className="admin-form-input">
            <input type="text" value={institution} onChange={function(e) { setInstitution(e.target.value); }} placeholder="Ej: Amazon Web Services" />
          </div>
        </div>
        <div className="admin-form-row">
          <label className="admin-form-label">Fecha:</label>
          <div className="admin-form-input">
            <input type="date" value={date} onChange={function(e) { setDate(e.target.value); }} />
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend className="admin-legend">Archivo</legend>
        <div className="upload-form__file-zone admin-form-row">
          <label className="admin-form-label">Archivo (Arrastrar o clic)</label>
          <div className="admin-form-input" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <input type="file" id="upload-file-input" accept="image/*" onChange={handleFileChange} required />
            {previewUrl && (
              <img src={previewUrl} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', border: '1px solid var(--border-medium)', marginTop: '10px' }} />
            )}
          </div>
        </div>
      </fieldset>

      <div className="admin-form-actions">
        <button type="submit" className="btn-primary" disabled={uploading || !file || !title || !category}>
          {uploading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-cloud-arrow-up"></i>} Subir Certificado
        </button>
      </div>
    </form>
  );
};

window.CertApp = CertApp;
