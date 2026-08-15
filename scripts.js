function App() {
  var themeState = React.useState(function() { return window.StorageUtils.load(window.APP_CONFIG.STORAGE_KEYS.THEME, 'light'); });
  var theme = themeState[0];
  var setTheme = themeState[1];

  var categoriesState = React.useState(function() {
    var stored = window.StorageUtils.load(window.APP_CONFIG.STORAGE_KEYS.CATEGORIES);
    var exported = window.EXPORTED_DATA && window.EXPORTED_DATA.categories;
    if (exported && exported.length > 1) return exported;
    if (stored && stored.length > 1) return stored;
    return window.APP_CONFIG.DEFAULT_CATEGORIES;
  });
  var categories = categoriesState[0];
  var setCategories = categoriesState[1];

  var qrUrlState = React.useState(function() { 
    var stored = window.StorageUtils.load(window.APP_CONFIG.STORAGE_KEYS.QR_CODE);
    var exported = window.EXPORTED_DATA && window.EXPORTED_DATA.qrUrl;
    if (exported) return exported;
    if (stored !== null) return stored;
    return null;
  });
  var qrUrl = qrUrlState[0];
  var setQrUrl = qrUrlState[1];

  var certificatesState = React.useState(function() { 
    var stored = window.StorageUtils.load(window.APP_CONFIG.STORAGE_KEYS.CERTIFICATES);
    var exported = window.EXPORTED_DATA && window.EXPORTED_DATA.certificates;
    if (exported && exported.length > 0) return exported;
    if (stored && stored.length > 0) return stored;
    return []; 
  });
  var certificates = certificatesState[0];
  var setCertificates = certificatesState[1];

  var activeCategoryState = React.useState('all');
  var activeCategory = activeCategoryState[0];
  var setActiveCategory = activeCategoryState[1];

  var searchQueryState = React.useState('');
  var searchQuery = searchQueryState[0];
  var setSearchQuery = searchQueryState[1];

  var selectedCertState = React.useState(null);
  var selectedCert = selectedCertState[0];
  var setSelectedCert = selectedCertState[1];

  var isModalOpenState = React.useState(false);
  var isModalOpen = isModalOpenState[0];
  var setIsModalOpen = isModalOpenState[1];

  var isAdminOpenState = React.useState(false);
  var isAdminOpen = isAdminOpenState[0];
  var setIsAdminOpen = isAdminOpenState[1];

  var isAuthenticatedState = React.useState(false);
  var isAuthenticated = isAuthenticatedState[0];
  var setIsAuthenticated = isAuthenticatedState[1];

  var isEditModalOpenState = React.useState(false);
  var isEditModalOpen = isEditModalOpenState[0];
  var setIsEditModalOpen = isEditModalOpenState[1];

  var editingCertState = React.useState(null);
  var editingCert = editingCertState[0];
  var setEditingCert = editingCertState[1];

  var notificationState = React.useState(null);
  var notification = notificationState[0];
  var setNotification = notificationState[1];

  var themeAnimRef = React.useRef(null);

  React.useEffect(function() {
    document.documentElement.setAttribute('data-theme', theme);
    window.StorageUtils.save(window.APP_CONFIG.STORAGE_KEYS.THEME, theme);
  }, [theme]);

  React.useEffect(function() {
    window.StorageUtils.save(window.APP_CONFIG.STORAGE_KEYS.CATEGORIES, categories);
  }, [categories]);

  React.useEffect(function() {
    window.StorageUtils.save(window.APP_CONFIG.STORAGE_KEYS.QR_CODE, qrUrl);
  }, [qrUrl]);

  React.useEffect(function() {
    window.StorageUtils.save(window.APP_CONFIG.STORAGE_KEYS.CERTIFICATES, certificates);
  }, [certificates]);

  React.useEffect(function() {
    if (window.APP_CONFIG.CLOUDINARY.CLOUD_NAME !== 'TU_CLOUD_NAME' && window.CloudinaryUtils && window.CloudinaryUtils.fetchCertificates) {
      window.CloudinaryUtils.fetchCertificates().then(function(data) {
        if (data && data.length > 0) {
          setCertificates(data);
        }
      }).catch(function(e) {
        console.warn('Failed to fetch certificates from Cloudinary API', e);
      });
    }
  }, []);

  var computedCounts = React.useMemo(function() {
    var counts = { all: certificates.length };
    categories.forEach(function(cat) {
      if (cat.id !== 'all') counts[cat.id] = 0;
    });
    certificates.forEach(function(cert) {
      if (counts[cert.category] !== undefined) {
        counts[cert.category]++;
      }
    });
    return counts;
  }, [certificates, categories]);

  var filteredCertificates = React.useMemo(function() {
    var filtered = certificates.filter(function(cert) {
      var matchesCat = activeCategory === 'all' || cert.category === activeCategory;
      var titleStr = cert.title || '';
      var institutionStr = cert.institution || '';
      var q = searchQuery.toLowerCase();
      var matchesSearch = !q || titleStr.toLowerCase().indexOf(q) !== -1 || 
                          institutionStr.toLowerCase().indexOf(q) !== -1;
      return matchesCat && matchesSearch;
    });
    
    return filtered.sort(function(a, b) {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });
  }, [certificates, activeCategory, searchQuery]);

  var selectedIdx = React.useMemo(function() {
    if (!selectedCert) return -1;
    return filteredCertificates.findIndex(function(c) { return c.id === selectedCert.id; });
  }, [selectedCert, filteredCertificates]);

  function handleToggleTheme(e) {
    var button = e ? e.currentTarget : null;
    var nextTheme = theme === 'light' ? 'dark' : 'light';
    var isDark = nextTheme === 'dark';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var x, y;

    if (button) {
      var rect = button.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else {
      x = viewportWidth / 2;
      y = viewportHeight / 2;
    }

    var maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    );

    // If going dark, expand from 0 to maxRadius. If going light, contract from maxRadius to 0.
    var clipPath = [
      'circle(0px at ' + x + 'px ' + y + 'px)',
      'circle(' + maxRadius + 'px at ' + x + 'px ' + y + 'px)'
    ];

    var root = document.documentElement;
    root.dataset.themeVt = "active";
    if (isDark) {
      root.classList.add("dark-is-new");
      root.style.setProperty("--vt-clip-from", clipPath[0]);
    } else {
      root.classList.add("dark-is-old");
      root.style.setProperty("--vt-clip-from", clipPath[1]);
    }
    root.style.setProperty("--vt-duration", "500ms");

    var cleanup = function() {
      if (themeAnimRef.current) {
        themeAnimRef.current.cancel();
        themeAnimRef.current = null;
      }
      delete root.dataset.themeVt;
      root.classList.remove("dark-is-new", "dark-is-old");
      root.style.removeProperty("--vt-duration");
      root.style.removeProperty("--vt-clip-from");
    };

    var transition = document.startViewTransition(function() {
      document.documentElement.setAttribute('data-theme', nextTheme);
      ReactDOM.flushSync(function() {
        setTheme(nextTheme);
      });
    });

    if (transition.finished && typeof transition.finished.finally === "function") {
      transition.finished.finally(cleanup).catch(function(){});
    } else {
      cleanup();
    }

    if (transition.ready && typeof transition.ready.then === "function") {
      transition.ready.then(function() {
        var finalClipPath = isDark ? clipPath : clipPath.slice().reverse();
        var targetPseudo = isDark ? "::view-transition-new(root)" : "::view-transition-old(root)";

        var anim = document.documentElement.animate(
          { clipPath: finalClipPath },
          {
            duration: 500,
            easing: "ease-in-out",
            fill: "forwards",
            pseudoElement: targetPseudo
          }
        );
        themeAnimRef.current = anim;
      }).catch(function(){});
    }
  }

  function handleSelectCert(cert) {
    setSelectedCert(cert);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setTimeout(function() {
      setSelectedCert(null);
    }, 300);
  }

  function showNotification(message, type) {
    setNotification({ message: message, type: type });
    setTimeout(function() {
      setNotification(null);
    }, 3000);
  }

  function handleAuth(password) {
    if (password === window.APP_CONFIG.PASSWORD) {
      setIsAuthenticated(true);
      showNotification('Autenticado correctamente', 'success');
      return true;
    } else {
      showNotification('Contraseña incorrecta', 'error');
      return false;
    }
  }

  function handleUpload(certOrResult) {
    var newCert = certOrResult;
    if (certOrResult.secure_url) {
      newCert = {
        id: certOrResult.public_id || ('cloud-' + Date.now()),
        url: certOrResult.secure_url,
        title: certOrResult.title || 'Nuevo Certificado',
        institution: certOrResult.institution || '',
        date: certOrResult.date || new Date().toISOString().split('T')[0],
        category: certOrResult.category || 'otros',
        publicId: certOrResult.public_id || ('cloud-' + Date.now())
      };
    } else if (!newCert.id) {
       newCert.id = 'local-' + Date.now();
    }
    setCertificates([newCert].concat(certificates));
    showNotification('Certificado agregado', 'success');
  }

  function handleDelete(cert) {
    if (cert.id && String(cert.id).indexOf('local-') === 0) {
      var updated = certificates.filter(function(c) { return c.id !== cert.id; });
      setCertificates(updated);
      showNotification('Certificado eliminado localmente', 'success');
    } else {
      if (window.CloudinaryUtils && window.CloudinaryUtils.deleteImage) {
        window.CloudinaryUtils.deleteImage(cert.id).then(function() {
          var updated = certificates.filter(function(c) { return c.id !== cert.id; });
          setCertificates(updated);
          showNotification('Certificado eliminado', 'success');
        }).catch(function() {
          var updated = certificates.filter(function(c) { return c.id !== cert.id; });
          setCertificates(updated);
          showNotification('Certificado eliminado (con error en servidor)', 'info');
        });
      } else {
         var updated = certificates.filter(function(c) { return c.id !== cert.id; });
         setCertificates(updated);
         showNotification('Certificado eliminado', 'success');
      }
    }
  }

  function handleEditCert(updatedCert) {
    var updated = certificates.map(function(c) {
      return c.id === updatedCert.id ? updatedCert : c;
    });
    setCertificates(updated);
    setIsEditModalOpen(false);
    setEditingCert(null);
    showNotification('Certificado actualizado', 'success');
  }

  function handleOpenEdit(cert) {
    setEditingCert(cert);
    setIsEditModalOpen(true);
  }

  function handleAddCategory(newCat) {
    setCategories(categories.concat([newCat]));
    showNotification('Categoría agregada', 'success');
  }

  function handleEditCategory(updatedCat) {
    var updated = categories.map(function(c) {
      return c.id === updatedCat.id ? updatedCat : c;
    });
    setCategories(updated);
    showNotification('Categoría actualizada', 'success');
  }

  function handleDeleteCategory(catId) {
    if (catId === 'all') return;
    var inUse = certificates.some(function(c) { return c.category === catId; });
    if (inUse) {
      showNotification('No se puede eliminar la categoría porque hay certificados que la usan.', 'error');
      return;
    }
    var updated = categories.filter(function(c) { return c.id !== catId; });
    setCategories(updated);
    if (activeCategory === catId) {
      setActiveCategory('all');
    }
    showNotification('Categoría eliminada', 'success');
  }

  function handleNextCert() {
    if (selectedIdx < filteredCertificates.length - 1) {
      setSelectedCert(filteredCertificates[selectedIdx + 1]);
    }
  }

  function handlePrevCert() {
    if (selectedIdx > 0) {
      setSelectedCert(filteredCertificates[selectedIdx - 1]);
    }
  }

  function Toast(props) {
    return (
      <div className={'toast toast--' + props.type + ' anim-slide-right'}>
        <span>{props.message}</span>
        <button onClick={props.onClose}><i className="fa-solid fa-xmark"></i></button>
      </div>
    );
  }

  return (
    <div className="app">
      <CertApp.Header
        totalCount={certificates.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        qrUrl={qrUrl}
      />
      <CertApp.CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
        certificateCounts={computedCounts}
      />
      <CertApp.SearchBar
        query={searchQuery}
        onChange={setSearchQuery}
      />
      <CertApp.CertificateGallery
        certificates={filteredCertificates}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSelect={handleSelectCert}
      />
      {isModalOpen && selectedCert && (
        <CertApp.CertificateModal
          certificate={selectedCert}
          onClose={handleCloseModal}
          onEdit={handleOpenEdit}
          onNext={selectedIdx < filteredCertificates.length - 1 ? handleNextCert : null}
          onPrev={selectedIdx > 0 ? handlePrevCert : null}
        />
      )}
      {isEditModalOpen && editingCert && (
        <CertApp.EditCertificateModal
          certificate={editingCert}
          categories={categories}
          onSave={handleEditCert}
          onClose={function() { setIsEditModalOpen(false); setEditingCert(null); }}
        />
      )}
      <CertApp.AdminPanel
        isOpen={isAdminOpen}
        isAuthenticated={isAuthenticated}
        onToggle={function() { setIsAdminOpen(!isAdminOpen); }}
        onAuth={handleAuth}
        certificates={certificates}
        onUpload={handleUpload}
        onDelete={handleDelete}
        onEdit={handleOpenEdit}
        categories={categories}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
        qrUrl={qrUrl}
        onQrChange={setQrUrl}
      />
      <CertApp.FloatingContact phone={window.APP_CONFIG.PHONE} />
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={function() { setNotification(null); }}
        />
      )}
    </div>
  );
}

var rootElement = document.getElementById('root');
if (ReactDOM.createRoot) {
  var root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
} else {
  ReactDOM.render(React.createElement(App), rootElement);
}
