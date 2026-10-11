import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <div className="logo-mark">
            <span className="logo-letter">JR</span>
          </div>
          <div className="logo-text">
            <h1>JR CONSULTING</h1>
            <p>RESTAURANT SET-UP & OPERATIONS</p>
          </div>
        </div>
        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#expertise" onClick={() => setMobileMenuOpen(false)}>Expertise</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#contact" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
        </div>
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`ph ${mobileMenuOpen ? 'ph-x' : 'ph-list'}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
