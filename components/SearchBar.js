var CertApp = window.CertApp || {};

CertApp.SearchBar = function(props) {
  var query = props.query;
  var onChange = props.onChange;

  function handleChange(e) {
    onChange(e.target.value);
  }

  function handleClear() {
    onChange('');
  }

  return (
    <div className="search-bar">
      <div className="container">
        <div className="search-bar__wrapper" style={{ position: 'relative' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
          <input 
            type="text" 
            className="search-bar__input" 
            placeholder="Buscar certificado por título o institución..." 
            value={query} 
            onChange={handleChange}
            style={{ paddingLeft: '30px', paddingRight: '30px', width: '100%', boxSizing: 'border-box' }}
          />
          {query && (
            <button onClick={handleClear} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

window.CertApp = CertApp;
