import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Sticky header state
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Track active section based on scroll offset
      const sections = ['home', 'services', 'about', 'portfolio', 'contact'];
      let currentSection = 'home';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const offsetTop = el.offsetTop - 120; // adjust offset for header height
          if (window.scrollY >= offsetTop) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`} id="header">
      <div className="container nav-container">
        <a href="#home" className="logo" id="nav-logo" style={{ gap: '0.75rem' }} onClick={closeMenu}>
          <img
            src="/assets/logo.jpg"
            alt="Everlight Studio Logo"
            style={{
              height: '42px',
              width: '42px',
              borderRadius: '50%',
              border: '1.5px solid var(--border-color)',
              objectFit: 'cover'
            }}
          />
          <span>Everlight</span>
        </a>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          <a
            href="#home"
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </a>
          <a
            href="#services"
            className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Services
          </a>
          <a
            href="#about"
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About Us
          </a>
          <a
            href="#portfolio"
            className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            id="theme-toggle-btn"
            aria-label="Toggle Theme"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun" style={{ display: 'block' }}></i>
            ) : (
              <i className="fa-solid fa-moon" style={{ display: 'block' }}></i>
            )}
          </button>

          <button
            className="mobile-nav-toggle"
            id="mobile-toggle"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
