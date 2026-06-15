import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function About() {
  const containerRef = useRef(null);

  const founders = [
    {
      name: "ABHIJIN KM",
      role: "Founder & Creative Director",
      bio: "Visionary leader focused on digital innovation. Orchestrates agency goals and designs solutions that bridge the gap between client requirements and bleeding-edge web technologies.",
      image: "/assets/founder_1.jpg",
      socials: [
        { icon: "fa-brands fa-twitter", link: "#", label: "Twitter" },
        { icon: "fa-brands fa-linkedin-in", link: "#", label: "LinkedIn" },
        { icon: "fa-solid fa-envelope", link: "#", label: "Email" }
      ]
    },
    {
      name: "ARJUN KK",
      role: "Co-Founder & Technical Lead",
      bio: "Frontend, Backend, and Web Technology Specialist. Standardizes high-performance code and database design, ensuring every learning platform, server architecture, and website developed is lightning fast, secure, scalable, and responsive.",
      image: "/assets/founder_2.png",
      socials: [
        { icon: "fa-brands fa-github", link: "#", label: "GitHub" },
        { icon: "fa-brands fa-linkedin-in", link: "#", label: "LinkedIn" },
        { icon: "fa-brands fa-twitter", link: "#", label: "Twitter" }
      ]
    },
    {
      name: "NASLA FATHIMA",
      role: "Co-Founder & UI/UX Design Lead",
      bio: "User Experience and Interface Design Expert. Sculpts visual paths, digital assets, and user interfaces that maximize customer engagement and product adoption.",
      image: "/assets/founder_3.jpg",
      socials: [
        { icon: "fa-brands fa-dribbble", link: "#", label: "Dribbble" },
        { icon: "fa-brands fa-linkedin-in", link: "#", label: "LinkedIn" },
        { icon: "fa-solid fa-envelope", link: "#", label: "Email" }
      ]
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

      // Founders cards scale and slide up
      gsap.from('.about-card', {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="about" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <h2>Meet the <span className="gradient-text">Founders</span></h2>
          <p>Three partners collaborating with a unified mission: bringing next-generation technology and web solutions to businesses globally.</p>
        </div>
        
        <div className="about-grid">
          {founders.map((founder, idx) => (
            <div className="glass-panel about-card" id={`founder-card-${idx + 1}`} key={idx}>
              <div className="about-img-container">
                <img src={founder.image} alt={founder.name} className="about-img" />
                <div className="about-overlay"></div>
              </div>
              <div className="about-content">
                <span className="about-role">{founder.role}</span>
                <h3>{founder.name}</h3>
                <p className="about-bio">{founder.bio}</p>
                <div className="about-socials">
                  {founder.socials.map((social, sIdx) => (
                    <a 
                      href={social.link} 
                      className="about-social-icon" 
                      aria-label={social.label} 
                      key={sIdx}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
