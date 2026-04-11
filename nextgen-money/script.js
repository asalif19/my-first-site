// Parallax hero
const heroBgImg = document.getElementById('heroBgImg');
window.addEventListener('scroll', () => {
  if (heroBgImg) {
    heroBgImg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
  }
}, { passive: true });

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Fade-up on scroll
const fadeEls = document.querySelectorAll(
  'h2, h3, .card, .tip, .step, .extra-block, .example-box, blockquote, .rule-visual, .about-image'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));
