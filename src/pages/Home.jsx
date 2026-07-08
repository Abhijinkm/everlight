import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  
  // Testimonials state
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayTimerRef = useRef(null);
  const touchStartRef = useRef(0);

  const testimonials = [
    {
      quote: "Everlight Studio built our company's web application in record time. The user experience is flawless and our customer conversion rates have skyrocketed. The custom dashboard is incredibly intuitive!",
      author: "Sarah Jenkins",
      role: "CEO, Summit Enterprises",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
    },
    {
      quote: "As a tech startup founder, I needed a landing page that converts traffic immediately. Everlight designed a glassmorphic masterpiece. Our leads doubled within two weeks of launch!",
      author: "Marcus Vance",
      role: "Founder, InnovateTech",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120"
    },
    {
      quote: "The interactive dashboard and analytics suite developed by Everlight Studio transformed our data operations. Our cross-functional teams now collaborate seamlessly on real-time dashboards.",
      author: "Elena Rostova",
      role: "Director of Product, Oakridge Systems",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120"
    }
  ];

  const stats = [
    { label: "Projects Completed", target: 100 },
    { label: "Happy Clients", target: 50 },
    { label: "Active Users Reached", target: 10000 }
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTL = gsap.timeline();
      heroTL.from('#hero-tag-badge', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('#hero-title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from('#hero-subheadline', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-actions .btn', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      }, '-=0.5')
      .from('#hero-founder-avatars', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('#hero-animation-visual', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.floating-element', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }, '-=0.4');

      // Stats counters scroll animation
      const statElements = document.querySelectorAll('.stats-number');
      statElements.forEach((el) => {
        const targetValue = parseInt(el.getAttribute('data-target') || '0', 10);
        const countObj = { value: 0 };

        gsap.to(countObj, {
          scrollTrigger: {
            trigger: '.stats',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          value: targetValue,
          duration: 2.5,
          ease: 'power3.out',
          onUpdate: () => {
            if (targetValue >= 1000) {
              el.innerText = Math.floor(countObj.value).toLocaleString() + '+';
            } else {
              el.innerText = Math.floor(countObj.value) + '+';
            }
          }
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Autoplay Testimonials
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };

  const handlePrev = () => {
    stopAutoplay();
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    startAutoplay();
  };

  const handleDotClick = (index) => {
    stopAutoplay();
    setCurrentSlide(index);
    startAutoplay();
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    const threshold = 50;

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
  };

  return (
    <div ref={heroRef}>
      {/* Hero Section */}
      <section className="hero section" id="home">
        <div className="hero-bg-shapes">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
        
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tag" id="hero-tag-badge">
              <i className="fa-solid fa-bolt"></i>
              <span>Digital Web Development & Solutions Agency</span>
            </div>
            <h1 id="hero-title">Lighting the <br/><span className="gradient-text">Future of Digital Innovation</span></h1>
            <p className="subheadline" id="hero-subheadline">
              Custom Web Development, Bespoke Digital Solutions, High-Performance Web Applications, and Scalable Cloud Infrastructure.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary" id="btn-hero-start">
                Get Started <i className="fa-solid fa-arrow-right"></i>
              </a>
              <a href="#services" className="btn btn-secondary" id="btn-hero-explore">
                Explore Services
              </a>
            </div>
            
            <div className="hero-collabs" id="hero-founder-avatars">
              <div className="partner-avatars">
                <img src="/assets/founder_abhijin_white.png" alt="Founder 1" className="avatar-mini" />
                <img src="/assets/founder_2.png" alt="Founder 2" className="avatar-mini" />
                <img src="/assets/founder_3.jpg" alt="Founder 3" className="avatar-mini" />
              </div>
              <div className="collabs-text">
                Transforming businesses with <strong>3 Visionary Partners</strong>
              </div>
            </div>
          </div>
          
          <div className="hero-visual" id="hero-animation-visual">
            <div className="glass-panel hero-main-card">
              <div className="card-icon-wrapper">
                <i className="fa-solid fa-code"></i>
              </div>
              <h3>Three Minds. One Vision.</h3>
              <p>We blend frontend elegance, robust backend architectures, and stunning design to build modern digital products that scale.</p>
              <a href="#about" className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                Meet the Founders
              </a>
            </div>
            
            {/* Floating EdTech particles */}
            <div className="floating-element floating-1"><i className="fa-solid fa-code"></i></div>
            <div className="floating-element floating-2"><i className="fa-solid fa-database"></i></div>
            <div className="floating-element floating-3"><i className="fa-solid fa-network-wired"></i></div>
            <div className="floating-element floating-4"><i className="fa-solid fa-rocket"></i></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats" id="stats" ref={statsRef}>
        <div className="container">
          <div className="glass-panel stats-grid">
            {stats.map((stat, idx) => (
              <div className="stats-card" id={`stat-card-${idx + 1}`} key={idx}>
                <div 
                  className="stats-number gradient-text" 
                  id={`stat-count-${idx}`} 
                  data-target={stat.target}
                >
                  0+
                </div>
                <div className="stats-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Client & Partner <span className="gradient-text">Feedback</span></h2>
            <p>Hear what our clients and partners say about our web development and digital solutions.</p>
          </div>
          
          <div className="testimonials-wrapper">
            <div 
              className="testimonials-slider" 
              id="testimonials-slider"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((t, idx) => (
                <div className="testimonial-slide" key={idx}>
                  <div className="glass-panel testimonial-card">
                    <i className="fa-solid fa-quote-left testimonial-quote-icon"></i>
                    <p className="testimonial-text">"{t.quote}"</p>
                    <div className="testimonial-author">
                      <img src={t.image} alt={t.author} className="author-img" />
                      <div className="author-info">
                        <h4>{t.author}</h4>
                        <p>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="slider-controls">
              <button className="slider-btn" id="slider-prev" aria-label="Previous Slide" onClick={handlePrev}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="slider-dots" id="slider-dots">
                {testimonials.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
                    onClick={() => handleDotClick(idx)}
                  ></div>
                ))}
              </div>
              <button className="slider-btn" id="slider-next" aria-label="Next Slide" onClick={handleNext}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
