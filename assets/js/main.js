/* ============================================
   LEXIA & ASOCIADOS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.querySelector('.navbar');
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scroll to top button
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Scroll to top ----
  const scrollTopBtn = document.querySelector('.scroll-top');
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Mobile Menu ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
    document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
  });

  mobileClose?.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link, .mobile-sub-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Dropdown Keyboard accessibility ----
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.nav-dropdown-menu');

    toggle?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menu?.classList.toggle('open');
      }
      if (e.key === 'Escape') {
        menu?.classList.remove('open');
      }
    });
  });

  // ---- Testimonials Slider ----
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentSlide = 0;
  let autoplayTimer;

  function goToSlide(index) {
    if (!sliderTrack || slides.length === 0) return;
    currentSlide = (index + slides.length) % slides.length;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  prevBtn?.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoplay(); });
  nextBtn?.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoplay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); resetAutoplay(); }));

  if (sliderTrack && slides.length > 0) {
    goToSlide(0);
    startAutoplay();

    // Touch/swipe support
    let startX = 0;
    sliderTrack.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    sliderTrack.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        resetAutoplay();
      }
    });
  }

  // ---- Intersection Observer Animations ----
  const animatedEls = document.querySelectorAll('.fade-up, .fade-in');

  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animatedEls.forEach(el => observer.observe(el));
  }

  // ---- Counter Animation ----
  function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    el.textContent = '0' + suffix;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // ---- Contact Form Validation ----
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const fields = [
        { id: 'name', label: 'El nombre' },
        { id: 'email', label: 'El correo electrónico' },
        { id: 'phone', label: 'El teléfono' },
        { id: 'service', label: 'El servicio' },
        { id: 'message', label: 'El mensaje' },
      ];

      fields.forEach(({ id, label }) => {
        const input = document.getElementById(id);
        const error = document.getElementById(id + '_error');
        if (!input || !error) return;

        input.classList.remove('error');
        error.textContent = '';

        if (!input.value.trim()) {
          input.classList.add('error');
          error.textContent = `${label} es requerido.`;
          valid = false;
        } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          input.classList.add('error');
          error.textContent = 'Ingresa un correo electrónico válido.';
          valid = false;
        }
      });

      if (valid) {
        const btn = contactForm.querySelector('.submit-btn');
        if (btn) {
          btn.textContent = '✓ Mensaje enviado';
          btn.style.background = '#22c55e';
          btn.style.color = '#fff';
          btn.disabled = true;
        }
        contactForm.reset();
        setTimeout(() => {
          if (btn) {
            btn.textContent = 'Enviar mensaje';
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
          }
        }, 3500);
      }
    });
  }

  // ---- Blog Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      blogCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

});