const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

menuToggle?.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('is-visible'));
}

const hero = document.querySelector('.hero');
if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const shift = Math.min(window.scrollY * 0.08, 42);
    hero.style.setProperty('--hero-shift', `${shift}px`);
  }, { passive: true });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

// Rotating hero statements
const rotateItems = document.querySelectorAll('.hero-rotate-item');
if (rotateItems.length > 1) {
  let currentIndex = 0;
  setInterval(() => {
    rotateItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % rotateItems.length;
    rotateItems[currentIndex].classList.add('active');
  }, 5000);
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.querySelector('#form-feedback');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    setTimeout(() => {
      if (feedback) {
        feedback.className = 'form-feedback success is-visible';
        feedback.textContent = 'Thank you! Your enquiry has been received. A Health-Hub Africa clinical coordinator will contact you promptly.';
      }
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send enquiry';
      }
    }, 600);
  });
}

