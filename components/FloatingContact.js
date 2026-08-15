var CertApp = window.CertApp || {};

function FloatingContact(props) {
  var phone = props.phone;
  var isExpandedState = React.useState(false);
  var isExpanded = isExpandedState[0];
  var setIsExpanded = isExpandedState[1];
  
  var timeoutRef = React.useRef(null);

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(function() {
      setIsExpanded(false);
    }, 2000);
  }

  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(function() {
    return function() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className={"floating-contact-premium " + (isExpanded ? "is-expanded" : "")} 
      onMouseLeave={handleMouseLeave} 
      onMouseEnter={handleMouseEnter}
      onClick={toggleExpanded}
    >
      <div className="fc-icon">
        <iconify-icon icon="ph:phone-duotone"></iconify-icon>
      </div>
      <div className="fc-text">
        <a href={"tel:" + phone}>{phone}</a>
      </div>
    </div>
  );
}

CertApp.FloatingContact = FloatingContact;
window.CertApp = CertApp;
