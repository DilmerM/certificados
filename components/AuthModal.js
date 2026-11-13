var CertApp = window.CertApp || {};

CertApp.AuthModal = function(props) {
  var isOpen = props.isOpen;
  var onClose = props.onClose;
  var onAuth = props.onAuth;
  
  var passwordState = React.useState('');
  var password = passwordState[0];
  var setPassword = passwordState[1];
  
  var errorState = React.useState(false);
  var error = errorState[0];
  var setError = errorState[1];

  function handleClose() {
    setPassword('');
    setError(false);
    onClose();
  }

  React.useEffect(function() {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') handleClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return function() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (onAuth(password)) {
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div className="certificate-modal anim-fade-in" style={{ zIndex: 2500 }}>
      <div className="certificate-modal__backdrop" onClick={handleClose}></div>
      <div 
        className="certificate-modal__content" 
        style={{ 
          maxWidth: '400px', 
          width: '90%', 
          padding: '28px 24px', 
          textAlign: 'center', 
          borderRadius: '8px', 
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--depth-floating)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <button 
          onClick={handleClose} 
          style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '12px', 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-muted)', 
            fontSize: '18px', 
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Cerrar"
        >
          <iconify-icon icon="ph:x-bold"></iconify-icon>
        </button>

        <div 
          style={{ 
            width: '52px', 
            height: '52px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(67, 97, 238, 0.12)', 
            color: 'var(--accent-primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 16px', 
            fontSize: '24px' 
          }}
        >
          <iconify-icon icon="ph:lock-key-bold"></iconify-icon>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px' }}>
          Autorización Requerida
        </h3>
        
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '0 0 20px', lineHeight: 1.5 }}>
          Ingrese la contraseña de administrador para editar este certificado.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="password"
            autoFocus
            style={{ 
              width: '100%', 
              boxSizing: 'border-box', 
              textAlign: 'center', 
              padding: '10px 14px', 
              fontSize: '1rem', 
              letterSpacing: '0.2em', 
              borderRadius: '6px', 
              border: error ? '1.5px solid var(--color-danger, #ef4444)' : '1px solid var(--border-medium)', 
              backgroundColor: 'var(--bg-elevated)', 
              color: 'var(--text-primary)',
              outline: 'none'
            }}
            value={password}
            onChange={function(e) { setPassword(e.target.value); setError(false); }}
            placeholder="••••"
          />
          
          {error && (
            <span style={{ color: 'var(--color-danger, #ef4444)', fontSize: '0.8rem', fontWeight: 600 }}>
              Contraseña incorrecta. Intente de nuevo.
            </span>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button 
              type="button" 
              onClick={handleClose}
              style={{ 
                flex: 1, 
                padding: '10px', 
                backgroundColor: 'transparent', 
                border: '1px solid var(--border-medium)', 
                color: 'var(--text-secondary)', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 600, 
                fontSize: '0.86rem' 
              }}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              style={{ 
                flex: 1, 
                padding: '10px', 
                backgroundColor: 'var(--accent-primary)', 
                border: 'none', 
                color: '#ffffff', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 700, 
                fontSize: '0.86rem' 
              }}
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

window.CertApp = CertApp;
