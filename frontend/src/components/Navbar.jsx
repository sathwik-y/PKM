const Navbar = () => {
  const scrollToSection = (id) => {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <div className="nav-content">
        <a href="#" className="logo">smart<span>PKM</span></a>
        <div className="nav-links">
          <a href="#dashboard" onClick={(e) => { e.preventDefault(); scrollToSection('#dashboard'); }}>Dashboard</a>
          <a href="#knowledge" onClick={(e) => { e.preventDefault(); scrollToSection('#knowledge'); }}>Knowledge Base</a>
          <a href="#add" onClick={(e) => { e.preventDefault(); scrollToSection('#add'); }}>Add Content</a>
          <a href="#settings" onClick={(e) => { e.preventDefault(); scrollToSection('#settings'); }}>Settings</a>
          <button className="btn">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
