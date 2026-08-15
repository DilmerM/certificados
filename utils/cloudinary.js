window.CloudinaryUtils = {
  /**
   * Sube una imagen a Cloudinary (unsigned upload)
   * @param {File} file - Archivo de imagen
   * @param {string} category - Categoría del certificado
   * @param {string} title - Título del certificado
   * @returns {Promise<Object>} Respuesta de Cloudinary
   */
  upload: function(file, category, title) {
    var config = window.APP_CONFIG.CLOUDINARY;
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', config.UPLOAD_PRESET);
    formData.append('folder', config.FOLDER + '/' + category);
    formData.append('context', 'caption=' + encodeURIComponent(title) + '|category=' + category);
    formData.append('tags', category);

    return fetch(
      'https://api.cloudinary.com/v1_1/' + config.CLOUD_NAME + '/image/upload',
      { method: 'POST', body: formData }
    ).then(function(response) {
      if (!response.ok) throw new Error('Upload failed: ' + response.statusText);
      return response.json();
    });
  },

  /**
   * Elimina una imagen de Cloudinary (vía serverless function)
   * @param {string} publicId - Public ID de la imagen en Cloudinary
   * @returns {Promise<Object>}
   */
  deleteImage: function(publicId) {
    return fetch('/api/delete-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId: publicId })
    }).then(function(response) {
      if (!response.ok) throw new Error('Delete failed: ' + response.statusText);
      return response.json();
    });
  },

  /**
   * Obtiene la lista de certificados desde Cloudinary (vía serverless function)
   * @returns {Promise<Array>}
   */
  fetchCertificates: function() {
    return fetch('/api/list-certificates')
      .then(function(response) {
        if (!response.ok) throw new Error('Fetch failed: ' + response.statusText);
        return response.json();
      })
      .then(function(data) {
        if (!data.resources || data.resources.length === 0) {
          return [];
        }
        return data.resources.map(function(resource) {
          var context = resource.context || {};
          var custom = context.custom || {};
          return {
            id: resource.public_id,
            url: resource.secure_url,
            title: custom.caption ? decodeURIComponent(custom.caption) : resource.public_id.split('/').pop(),
            category: custom.category || resource.tags[0] || 'otros',
            publicId: resource.public_id
          };
        });
      })
      .catch(function(error) {
        console.warn('No se pudo conectar con la API. Usando datos de ejemplo.', error);
        return null;
      });
  },

  /**
   * Genera una URL de transformación de Cloudinary
   * @param {string} publicId
   * @param {Object} options
   * @returns {string}
   */
  getTransformedUrl: function(publicId, options) {
    var config = window.APP_CONFIG.CLOUDINARY;
    var transforms = [];
    if (options.width) transforms.push('w_' + options.width);
    if (options.height) transforms.push('h_' + options.height);
    if (options.crop) transforms.push('c_' + options.crop);
    if (options.quality) transforms.push('q_' + options.quality);
    var transformStr = transforms.length > 0 ? transforms.join(',') + '/' : '';
    return 'https://res.cloudinary.com/' + config.CLOUD_NAME + '/image/upload/' + transformStr + publicId;
  }
};
