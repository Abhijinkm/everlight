import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { gsap } from 'gsap';

export default function Contact() {
  const { theme } = useTheme();
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Map references
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);

  // GSAP slide-in effect
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      gsap.from('.contact-form-card', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  // Leaflet Map Initialization
  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;

    const studioCoords = [11.2588, 75.7804];

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      try {
        const map = window.L.map(mapContainerRef.current, {
          center: studioCoords,
          zoom: 13,
          scrollWheelZoom: false
        });

        mapInstanceRef.current = map;

        // Custom neon marker
        const customIcon = window.L.divIcon({
          className: 'custom-map-marker',
          html: '<div style="width: 20px; height: 20px; background: linear-gradient(135deg, #38bdf8 0%, #a855f7 100%); border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 15px rgba(99,102,241,0.6);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        window.L.marker(studioCoords, { icon: customIcon })
          .addTo(map)
          .bindPopup('<b style="font-family: Outfit, sans-serif; font-size:1.1em;">Everlight Studio HQ</b><br><span style="font-family: Inter, sans-serif; font-size:0.9em; color:#555;">Premium Web Development & Digital Solutions</span>')
          .openPopup();
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    }

    // Load or update tile layer based on current theme
    if (mapInstanceRef.current) {
      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }

      const tileUrl = theme === 'light'
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

      const tileLayer = window.L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      });

      tileLayer.addTo(mapInstanceRef.current);
      tileLayerRef.current = tileLayer;
    }

    // Cleanup on unmount
    return () => {
      // We keep the instance alive or clean it up if needed.
    };
  }, [theme]);

  // Form Validation and Submission
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear validation error when typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject.';
    if (!formData.message.trim()) newErrors.message = 'Please write a message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Shake form container
      gsap.fromTo('#contact-form-container', 
        { x: -10 }, 
        { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
      );
    } else {
      // Animate form transitions
      const formEl = document.getElementById('contact-form');
      gsap.to(formEl, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
          setIsSubmitted(true);
          // Animate success overlay
          const successEl = document.getElementById('form-success-message');
          if (successEl) {
            gsap.fromTo(successEl, 
              { opacity: 0, y: 20 }, 
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
          }
        }
      });
    }
  };

  const handleReset = () => {
    const successEl = document.getElementById('form-success-message');
    gsap.to(successEl, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      onComplete: () => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        // Animate form back in
        const formEl = document.getElementById('contact-form');
        if (formEl) {
          gsap.fromTo(formEl, 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          );
        }
      }
    });
  };

  return (
    <section className="section" id="contact" ref={contactRef}>
      <div className="container contact-grid">
        <div className="contact-info">
          <div>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Let's <span className="gradient-text">Collaborate</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem' }}>
              Have a custom web project in mind, or need custom digital solutions built? Send us a message, email, or chat on WhatsApp.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div className="contact-item-text">
                  <h3>WhatsApp</h3>
                  <p>
                    <a href="https://wa.me/919567964340" target="_blank" rel="noopener noreferrer" id="contact-whatsapp">
                      +91 9567964340
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="contact-item-text">
                  <h3>Email Address</h3>
                  <p>
                    <a href="mailto:hello@everlightstudio.edu" id="contact-email">
                      hello@everlightstudio.edu
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="contact-item-text">
                  <h3>Studio Headquarters</h3>
                  <p>Calicut, Kerala, India</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interactive Map Container */}
          <div className="map-container-wrapper" id="contact-map-wrapper">
            <div id="map" ref={mapContainerRef}></div>
          </div>
        </div>
        
        {/* Contact Form Card */}
        <div className="glass-panel contact-form-card" id="contact-form-container">
          {!isSubmitted ? (
            <form id="contact-form" onSubmit={handleSubmit} noValidate>
              <h3>Get In Touch</h3>
              <p>Fill out the form below and our team will get back to you within 24 hours.</p>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-input" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ borderColor: errors.name ? '#ef4444' : '' }}
                  />
                  {errors.name && (
                    <span className="form-feedback" style={{ display: 'block' }}>
                      {errors.name}
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="form-input" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ borderColor: errors.email ? '#ef4444' : '' }}
                  />
                  {errors.email && (
                    <span className="form-feedback" style={{ display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="form-input" 
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.subject ? '#ef4444' : '' }}
                />
                {errors.subject && (
                  <span className="form-feedback" style={{ display: 'block' }}>
                    {errors.subject}
                  </span>
                )}
              </div>
              
              <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                <label htmlFor="message" className="form-label">Message Details</label>
                <textarea 
                  id="message" 
                  className="form-input" 
                  placeholder="Describe your project goals, technology stack, or web solutions required..."
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{ borderColor: errors.message ? '#ef4444' : '' }}
                ></textarea>
                {errors.message && (
                  <span className="form-feedback" style={{ display: 'block' }}>
                    {errors.message}
                  </span>
                )}
              </div>
              
              <button type="submit" className="btn btn-primary form-submit-btn" id="btn-form-submit">
                Send Message <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          ) : (
            /* Success message Overlay */
            <div className="form-success-overlay" id="form-success-message" style={{ display: 'flex' }}>
              <div className="success-icon">
                <i className="fa-solid fa-check"></i>
              </div>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. The Everlight Studio founders will contact you shortly.</p>
              <button className="btn btn-secondary" id="btn-success-reset" style={{ marginTop: '2rem' }} onClick={handleReset}>
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
