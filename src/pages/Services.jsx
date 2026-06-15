import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);

  const servicesList = [
    {
      icon: "fa-solid fa-laptop-code",
      title: "Custom Website Development",
      description: "Custom websites designed for startups, brands, and modern businesses. Fully responsive, accessible, and optimized for speed."
    },
    {
      icon: "fa-solid fa-server",
      title: "Web Application & SaaS Development",
      description: "Feature-rich software-as-a-service platforms, custom cloud applications, and responsive dashboards built to power operations."
    },
    {
      icon: "fa-solid fa-network-wired",
      title: "API & Backend Integration",
      description: "Secure, robust server architectures, RESTful API development, database optimization, and third-party API integrations."
    },
    {
      icon: "fa-solid fa-window-restore",
      title: "High-Converting Landing Pages",
      description: "High-converting, visually rich landing pages and marketing funnels tailored to launch products and scale your online presence."
    },
    {
      icon: "fa-solid fa-users-rectangle",
      title: "E-commerce & Portal Solutions",
      description: "Premium, secure e-commerce portals, custom client areas, secure payment gateways, and backend inventory systems."
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Interactive Web Tools & Dashboards",
      description: "Custom interactive widgets, real-time reporting dashboards, and collaborative web tools that enhance user engagement."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // section header slide up
      gsap.from('.section-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // services stagger anim
      gsap.from('.service-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="services" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <h2>Our <span className="gradient-text">Services</span></h2>
          <p>We deliver cutting-edge web development and full-scale digital solutions tailored for startups, modern businesses, and digital platforms.</p>
        </div>
        
        <div className="services-grid">
          {servicesList.map((service, idx) => (
            <div className="glass-panel service-card" id={`service-card-${idx + 1}`} key={idx}>
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
