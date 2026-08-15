var CertApp = window.CertApp || {};

function CategoryFilter(props) {
  var categories = props.categories;
  var active = props.active;
  var onChange = props.onChange;
  var certificateCounts = props.certificateCounts;

  return (
    <nav className="category-filter anim-fade-in">
      <div className="container">
        <div className="category-filter__buttons">
          {categories.map(function(cat) {
            var isActive = active === cat.id;
            var className = "category-filter__btn" + (isActive ? " category-filter__btn--active" : "");
            return (
              <button 
                key={cat.id} 
                className={className} 
                onClick={function() { onChange(cat.id); }}
              >
                <iconify-icon icon={cat.icon} style={{ marginRight: '8px', fontSize: '1.2rem', verticalAlign: 'middle' }}></iconify-icon>
                {cat.label}
                {certificateCounts && certificateCounts[cat.id] !== undefined && (
                  <span className="category-filter__count">{certificateCounts[cat.id]}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

CertApp.CategoryFilter = CategoryFilter;
window.CertApp = CertApp;
