/*
  Everlight Studio - Interactive Logic
  Handles: Light/Dark Mode, Navigation, GSAP Animations, Stats Counter, Testimonials Slider, Interactive Map, and Form Validation
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Theme Switcher (Light / Dark Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;
  
  // Set current theme from local storage or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', currentTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    let theme = htmlElement.getAttribute('data-theme');
    let newTheme = (theme === 'dark') ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update map style if initialized
    updateMapTileLayer(newTheme);
  });

  // ==========================================
  // 2. Sticky Header & Active Navigation Links
  // ==========================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    // Sticky header
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
    
    // Update active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 3. Mobile Navigation Menu
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const mobileToggleIcon = mobileToggle.querySelector('i');
  
  function closeMenu() {
    navMenu.classList.remove('active');
    mobileToggleIcon.classList.remove('fa-xmark');
    mobileToggleIcon.classList.add('fa-bars');
    document.body.style.overflow = '';
  }

  function openMenu() {
    navMenu.classList.add('active');
    mobileToggleIcon.classList.remove('fa-bars');
    mobileToggleIcon.classList.add('fa-xmark');
    document.body.style.overflow = 'hidden';
  }

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Close menu when navigation links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnToggle = mobileToggle.contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // ==========================================
  // 4. GSAP & ScrollTrigger Animations
  // ==========================================
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero section animations (runs immediately on load)
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

  // Animation helper for headers
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // Services section stagger slide up
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // About us profile cards slide up and scale
  gsap.from('.about-card', {
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 80,
    opacity: 0,
    scale: 0.95,
    duration: 0.9,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Portfolio items fade & scale
  gsap.from('.portfolio-card', {
    scrollTrigger: {
      trigger: '.portfolio-grid',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  });

  // Stats Counters Scroll Animation
  const statsElements = document.querySelectorAll('.stats-number');
  
  statsElements.forEach(stat => {
    const targetValue = parseInt(stat.getAttribute('data-target'));
    
    let countObj = { value: 0 };
    
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
        // Format numbers like 10,000+
        if (targetValue >= 1000) {
          stat.innerText = Math.floor(countObj.value).toLocaleString() + '+';
        } else {
          stat.innerText = Math.floor(countObj.value) + '+';
        }
      }
    });
  });

  // Contact section fade in
  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 80%'
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });

  gsap.from('.contact-form-card', {
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 80%'
    },
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });

  // ==========================================
  // 5. Testimonials Carousel / Slider
  // ==========================================
  const slider = document.getElementById('testimonials-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayTimer;
  
  // Build indicators / dots
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  }
  
  const dots = document.querySelectorAll('.slider-dot');
  
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });
  
  // Autoplay functionality
  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 5000);
  }
  
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }
  
  startAutoplay();
  
  // Swipe controls for mobile devices
  let startX = 0;
  let endX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const threshold = 50;
    if (startX - endX > threshold) {
      nextSlide();
      resetAutoplay();
    } else if (endX - startX > threshold) {
      prevSlide();
      resetAutoplay();
    }
  }

  // ==========================================
  // 6. Leaflet Interactive Map
  // ==========================================
  let map;
  let tileLayer;
  
  // Coordinates for Silicon Valley Office
  const studioCoords = [37.3382, -121.8863];
  
  function initMap() {
    map = L.map('map', {
      center: studioCoords,
      zoom: 13,
      scrollWheelZoom: false
    });
    
    const initialTheme = htmlElement.getAttribute('data-theme') || 'dark';
    
    // Choose tile template based on theme
    const tileUrl = getTileUrlForTheme(initialTheme);
    
    tileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>'
    }).addTo(map);
    
    // Custom neon marker icon
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: '<div style=\"width: 20px; height: 20px; background: linear-gradient(135deg, #38bdf8 0%, #a855f7 100%); border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 15px rgba(99,102,241,0.6);\"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    
    L.marker(studioCoords, { icon: customIcon })
      .addTo(map)
      .bindPopup('<b style=\"font-family: Outfit, sans-serif; font-size:1.1em;\">Everlight Studio HQ</b><br><span style=\"font-family: Inter, sans-serif; font-size:0.9em; color:#555;\">Lighting the Future of Learning</span>')
      .openPopup();
  }
  
  function getTileUrlForTheme(theme) {
    // Voyager for Light, Dark All for Dark theme
    return (theme === 'light') 
      ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  }
  
  function updateMapTileLayer(theme) {
    if (map && tileLayer) {
      map.removeLayer(tileLayer);
      const newUrl = getTileUrlForTheme(theme);
      tileLayer = L.tileLayer(newUrl, {
        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>'
      }).addTo(map);
    }
  }
  
  // Try initializing map, catch potential connection issues
  try {
    initMap();
  } catch (error) {
    console.error('Failed to load Leaflet map:', error);
  }

  // ==========================================
  // 7. Interactive Form Validation & Overlay
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formFields = {
    name: document.getElementById('form-name'),
    email: document.getElementById('form-email'),
    subject: document.getElementById('form-subject'),
    message: document.getElementById('form-message')
  };
  
  const feedbacks = {
    name: document.getElementById('feedback-name'),
    email: document.getElementById('feedback-email'),
    subject: document.getElementById('feedback-subject'),
    message: document.getElementById('feedback-message')
  };
  
  const successOverlay = document.getElementById('form-success-message');
  const resetBtn = document.getElementById('btn-success-reset');
  
  // Real-time validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  
  function checkField(field, feedback, validationFn = null) {
    let isValid = true;
    const value = field.value.trim();
    
    if (value === '') {
      feedback.innerText = 'This field is required.';
      feedback.style.display = 'block';
      field.style.borderColor = '#ef4444';
      isValid = false;
    } else if (validationFn && !validationFn(value)) {
      feedback.innerText = 'Please enter a valid format.';
      feedback.style.display = 'block';
      field.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      feedback.style.display = 'none';
      field.style.borderColor = 'var(--border-color)';
    }
    
    return isValid;
  }
  
  // Input event listeners to clear error styling as user types
  Object.keys(formFields).forEach(key => {
    formFields[key].addEventListener('input', () => {
      formFields[key].style.borderColor = 'var(--border-color)';
      feedbacks[key].style.display = 'none';
    });
  });
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = checkField(formFields.name, feedbacks.name);
    const isEmailValid = checkField(formFields.email, feedbacks.email, validateEmail);
    const isSubjectValid = checkField(formFields.subject, feedbacks.subject);
    const isMessageValid = checkField(formFields.message, feedbacks.message);
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // Form is fully validated, animate successful transition
      gsap.to(contactForm, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
          contactForm.style.display = 'none';
          successOverlay.style.display = 'flex';
          gsap.fromTo(successOverlay, {
            opacity: 0,
            y: 20
          }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    } else {
      // Shake form if errors are present
      gsap.fromTo('#contact-form-container', {
        x: -10
      }, {
        x: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    }
  });
  
  resetBtn.addEventListener('click', () => {
    gsap.to(successOverlay, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      onComplete: () => {
        successOverlay.style.display = 'none';
        contactForm.reset();
        
        // Reset borders
        Object.keys(formFields).forEach(key => {
          formFields[key].style.borderColor = 'var(--border-color)';
        });
        
        contactForm.style.display = 'block';
        gsap.fromTo(contactForm, {
          opacity: 0,
          y: -20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
  });

  // Set copyright footer year to current
  document.getElementById('current-year').innerText = new Date().getFullYear();
});
