import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Portfolio() {
  const containerRef = useRef(null);

  const portfolioItems = [
    {
      title: "Synapse Interactive Portal",
      tag: "E-Learning & Interactive Coding",
      desc: "An advanced quantum computing platform featuring interactive syllabus modules, video lectures, and live code execution with Qiskit.",
      image: "/assets/synapse.jpg"
    },
    {
      title: "High-Performance Web Platforms",
      tag: "Custom Platform",
      desc: "High-performance video streaming systems, dynamic databases, and user interaction portals with advanced metrics trackers.",
      image: "/assets/portfolio_2.png"
    },
    {
      title: "Brand Landing Pages & Portals",
      tag: "Marketing / Brand",
      desc: "Clean, glassmorphic marketing interfaces and high-speed portals for modern brands and technology companies.",
      image: "/assets/portfolio_3.png"
    },
    {
      title: "Interactive Real-time Apps",
      tag: "Interactive Tools",
      desc: "Collaborative whiteboards, real-time chat clients, and interactive web tools that make work collaborative, engaging, and seamless.",
      image: "/assets/portfolio_4.png"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.section-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Cards slide up stagger
      gsap.from('.portfolio-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="portfolio" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <h2>Our <span className="gradient-text">Portfolio</span></h2>
          <p>Explore some of our recent digital products developed for businesses, startups, and modern brands.</p>
        </div>
        
        <div className="portfolio-grid">
          {portfolioItems.map((item, idx) => (
            <div className="portfolio-card" id={`portfolio-item-${idx + 1}`} key={idx}>
              <div className="portfolio-img-container">
                <img src={item.image} alt={item.title} className="portfolio-img" />
                <div className="portfolio-content-overlay">
                  <span className="portfolio-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p className="portfolio-desc">{item.desc}</p>
                  <a 
                    href={item.link || "#contact"} 
                    className="portfolio-link" 
                    target={item.link ? "_blank" : undefined} 
                    rel={item.link ? "noopener noreferrer" : undefined}
                  >
                    {item.link ? "Visit Project" : "Inquire Project"} <i className="fa-solid fa-arrow-right-long"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
