var CertApp = window.CertApp || {};

function CategoryFilter(props) {
  var categories = props.categories || [];
  var active = props.active || 'all';
  var onChange = props.onChange;
  var certificateCounts = props.certificateCounts || {};
  
  var searchQuery = props.searchQuery || '';
  var onSearchChange = props.onSearchChange;
  
  var institutions = props.institutions || [];
  var selectedInstitution = props.selectedInstitution || 'all';
  var onInstitutionChange = props.onInstitutionChange;
  
  var dateOrder = props.dateOrder || 'desc';
  var onDateOrderChange = props.onDateOrderChange;

  var totalFiltered = props.totalFiltered !== undefined ? props.totalFiltered : (certificateCounts['all'] || 0);
  var onResetFilters = props.onResetFilters;

  var hasActiveFilters = active !== 'all' || 
                         selectedInstitution !== 'all' || 
                         searchQuery.trim() !== '' || 
                         dateOrder !== 'desc';

  function handleSearchInput(e) {
    if (onSearchChange) onSearchChange(e.target.value);
  }

  function handleClearSearch() {
    if (onSearchChange) onSearchChange('');
  }

  return (
    <nav className="filter-section anim-fade-in" role="navigation" aria-label="Filtros y búsqueda de certificados">
      <div className="container">
        
        {/* ── 1. Pestañas de Categorías ── */}
        <div className="category-tabs" role="tablist" aria-label="Categorías de certificados">
          {categories.map(function(cat) {
            var isActive = active === cat.id;
            var count = certificateCounts[cat.id] !== undefined ? certificateCounts[cat.id] : 0;
            var className = "category-tab" + (isActive ? " category-tab--active" : "");
            
            return (
              <button
                key={cat.id}
                className={className}
                onClick={function() { onChange(cat.id); }}
                role="tab"
                aria-selected={isActive}
                type="button"
              >
                {cat.icon && (
                  <iconify-icon icon={cat.icon} aria-hidden="true" className="category-tab__icon"></iconify-icon>
                )}
                <span className="category-tab__label">{cat.label}</span>
                <span className="category-tab__count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* ── 2. Barra de Herramientas: Buscador único + Filtro Institución + Orden Fecha ── */}
        <div className="filter-toolbar">
          
          {/* Único Buscador */}
          <div className="filter-toolbar__search">
            <i className="fa-solid fa-magnifying-glass filter-toolbar__search-icon" aria-hidden="true"></i>
            <input
              type="text"
              className="filter-toolbar__search-input"
              placeholder="Buscar por título, institución o palabra clave..."
              value={searchQuery}
              onChange={handleSearchInput}
              aria-label="Buscar certificados"
            />
            {searchQuery && (
              <button
                className="filter-toolbar__search-clear"
                onClick={handleClearSearch}
                aria-label="Limpiar búsqueda"
                type="button"
                title="Limpiar"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            )}
          </div>

          {/* Filtro por Institución Emisora */}
          <div className="filter-toolbar__control">
            <label className="filter-toolbar__label" htmlFor="institution-select">
              <iconify-icon icon="ph:buildings-bold" aria-hidden="true"></iconify-icon>
              Institución:
            </label>
            <select
              id="institution-select"
              className="filter-toolbar__select"
              value={selectedInstitution}
              onChange={function(e) { if (onInstitutionChange) onInstitutionChange(e.target.value); }}
            >
              <option value="all">Todas las instituciones</option>
              {institutions.map(function(inst) {
                return (
                  <option key={inst} value={inst}>{inst}</option>
                );
              })}
            </select>
          </div>

          {/* Filtro / Orden por Fecha */}
          <div className="filter-toolbar__control">
            <label className="filter-toolbar__label" htmlFor="date-order-select">
              <iconify-icon icon="ph:calendar-blank-bold" aria-hidden="true"></iconify-icon>
              Fecha:
            </label>
            <select
              id="date-order-select"
              className="filter-toolbar__select"
              value={dateOrder}
              onChange={function(e) { if (onDateOrderChange) onDateOrderChange(e.target.value); }}
            >
              <option value="desc">Más recientes primero</option>
              <option value="asc">Más antiguos primero</option>
            </select>
          </div>

          {/* Contador y botón de reset */}
          <div className="filter-toolbar__meta">
            <span className="filter-toolbar__counter">
              <strong>{totalFiltered}</strong> {totalFiltered === 1 ? 'certificado' : 'certificados'}
            </span>
            {hasActiveFilters && (
              <button 
                type="button"
                className="filter-toolbar__reset-btn"
                onClick={onResetFilters}
                title="Restablecer todos los filtros"
              >
                <iconify-icon icon="ph:arrow-counter-clockwise-bold" aria-hidden="true"></iconify-icon>
                Limpiar
              </button>
            )}
          </div>

        </div>

      </div>
    </nav>
  );
}

CertApp.CategoryFilter = CategoryFilter;
window.CertApp = CertApp;
