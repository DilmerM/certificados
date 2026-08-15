var CertApp = window.CertApp || {};

CertApp.CertificateGallery = function(props) {
  var certificates = props.certificates || [];
  var activeCategory = props.activeCategory || 'all';
  var searchQuery = props.searchQuery || '';
  var onSelect = props.onSelect;

  var [filtered, setFiltered] = React.useState(certificates);
  var [animating, setAnimating] = React.useState(false);

  React.useEffect(function() {
    setAnimating(true);
    var timeout = setTimeout(function() {
      var nextFiltered = certificates.filter(function(cert) {
        var matchesCategory = activeCategory === 'all' || cert.category === activeCategory;
        var matchesQuery = true;
        if (searchQuery.trim() !== '') {
          var q = searchQuery.toLowerCase();
          var titleMatch = cert.title && cert.title.toLowerCase().indexOf(q) !== -1;
          var instMatch = cert.institution && cert.institution.toLowerCase().indexOf(q) !== -1;
          matchesQuery = titleMatch || instMatch;
        }
        return matchesCategory && matchesQuery;
      });
      setFiltered(nextFiltered);
      setAnimating(false);
    }, 300); // fade out duration
    return function() { clearTimeout(timeout); };
  }, [activeCategory, searchQuery, certificates]);

  var containerClass = 'certificate-gallery ' + (animating ? 'fade-out' : 'fade-in');

  if (certificates.length === 0) {
    return (
      <div className="empty-state">
        <iconify-icon icon="ph:folder-open-duotone" class="empty-state__icon"></iconify-icon>
        <h3>Aún no hay certificados</h3>
        <p className="empty-state__text">Tu portafolio está vacío. Usa el panel de administración para comenzar a agregar tus logros.</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <iconify-icon icon="ph:magnifying-glass-duotone" class="empty-state__icon"></iconify-icon>
        <h3>No se encontraron resultados</h3>
        <p className="empty-state__text">No hay certificados que coincidan con tu búsqueda o filtro actual.</p>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {filtered.map(function(cert, index) {
        return <CertApp.CertificateCard key={cert.id} certificate={cert} index={index} onSelect={onSelect} />;
      })}
    </div>
  );
};

window.CertApp = CertApp;
