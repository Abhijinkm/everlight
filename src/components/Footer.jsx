import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#home" className="logo" style={{ marginBottom: '1.5rem', gap: '0.75rem' }}>
            <img
              src="/assets/logo.jpg"
              alt="Everlight Studio Logo"
              style={{
                height: '48px',
                width: '48px',
                borderRadius: '50%',
                border: '1.5px solid var(--border-color)',
                objectFit: 'cover'
              }}
            />
            <span>Everlight</span>
          </a>
          <p className="footer-tagline">"Three Minds. One Vision. Endless Innovation."</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            A premier digital agency building bespoke web applications, custom software platforms, and high-performance digital solutions.
          </p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <div className="footer-links">
            <a href="#home" className="footer-link">Home</a>
            <a href="#services" className="footer-link">Our Services</a>
            <a href="#about" className="footer-link">Meet the Founders</a>
            <a href="#portfolio" className="footer-link">Portfolio Showcase</a>
            <a href="#contact" className="footer-link">Get In Touch</a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Stay Connected</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Follow our updates as we develop new tools, frameworks, and web templates for modern brands.
          </p>
          <div className="footer-socials">
            <a href="#" className="about-social-icon" aria-label="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="about-social-icon" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="#" className="about-social-icon" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="about-social-icon" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="copyright" id="footer-copyright-text">
          &copy; <span id="current-year">{currentYear}</span> Everlight Studio. All rights reserved.
        </div>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy Policy</a>
          <a href="#" className="footer-bottom-link">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
