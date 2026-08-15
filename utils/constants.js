/* ==============================================
   CONFIGURACIÓN GLOBAL
   ============================================== */

window.APP_CONFIG = {
  PASSWORD: '1234',
  PHONE: '+504 XXXX-XXXX',
  OWNER_NAME: 'Dilmer Núñez',
  TITLE: 'Certificados Profesionales',
  SUBTITLE: 'Formación continua en tecnología, desarrollo e ingeniería de sistemas',

  CLOUDINARY: {
    CLOUD_NAME: 'TU_CLOUD_NAME',
    UPLOAD_PRESET: 'TU_UPLOAD_PRESET',
    API_KEY: 'TU_API_KEY',
    FOLDER: 'certificados'
  },

  CLOUDFLARE_R2: {
    ACCESS_KEY_ID: '333a14947a9208666b4ccf20ceee87db',
    SECRET_ACCESS_KEY: '92c1a5af833c80f876777de272bc32fa3f85e214c7eb7198308621f5084ac880',
    ACCOUNT_ID: '0dc56db90ffac9c990e822627f5f4524',
    BUCKET_NAME: 'proyectoanalisis',
    PUBLIC_URL: 'https://pub-ada139691018466fa48df5ea9f22ee6c.r2.dev'
  },

  DEFAULT_CATEGORIES: [
    { id: 'all', label: 'Todos', icon: 'ph:squares-four-bold' }
  ],

  /* Íconos disponibles para asignar a categorías (Iconify / Phosphor) */
  AVAILABLE_ICONS: [
    { icon: 'ph:code-bold', label: 'Código' },
    { icon: 'ph:database-bold', label: 'Base de datos' },
    { icon: 'ph:hard-drives-bold', label: 'Servidor' },
    { icon: 'ph:plugs-connected-bold', label: 'Red' },
    { icon: 'ph:cloud-bold', label: 'Nube' },
    { icon: 'ph:chart-line-up-bold', label: 'Analítica' },
    { icon: 'ph:student-bold', label: 'Educación' },
    { icon: 'ph:book-open-bold', label: 'Libro' },
    { icon: 'ph:translate-bold', label: 'Idioma' },
    { icon: 'ph:certificate-bold', label: 'Certificado' },
    { icon: 'ph:laptop-bold', label: 'Desarrollo' },
    { icon: 'ph:shield-check-bold', label: 'Seguridad' },
    { icon: 'ph:cpu-bold', label: 'Hardware' },
    { icon: 'ph:robot-bold', label: 'IA' },
    { icon: 'ph:brain-bold', label: 'Ciencia' },
    { icon: 'ph:globe-hemisphere-west-bold', label: 'Web' },
    { icon: 'ph:device-mobile-bold', label: 'Móvil' },
    { icon: 'ph:palette-bold', label: 'Diseño' },
    { icon: 'ph:terminal-window-bold', label: 'Terminal' },
    { icon: 'ph:gear-bold', label: 'Ingeniería' },
    { icon: 'ph:kanban-bold', label: 'Proyecto' },
    { icon: 'ph:microsoft-logo-bold', label: 'Microsoft' },
    { icon: 'ph:google-logo-bold', label: 'Google' },
    { icon: 'ph:amazon-logo-bold', label: 'AWS' }
  ],

  /* Claves de localStorage */
  STORAGE_KEYS: {
    THEME: 'cert_theme',
    CATEGORIES: 'cert_categories',
    CERTIFICATES: 'cert_certificates',
    QR_CODE: 'cert_qr_code'
  },
};

/* ==============================================
   UTILIDADES DE PERSISTENCIA (localStorage)
   ============================================== */

window.StorageUtils = {
  load: function(key, defaultValue) {
    try {
      var stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      console.warn('Error loading from localStorage:', e);
      return defaultValue;
    }
  },

  save: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  },

  remove: function(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Error removing from localStorage:', e);
    }
  }
};
