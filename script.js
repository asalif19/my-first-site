// ===== Navigation scroll effect =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ===== Mobile menu toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'fixed';
  navLinks.style.top = '72px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(247, 244, 239, 0.97)';
  navLinks.style.backdropFilter = 'blur(12px)';
  navLinks.style.padding = '24px 32px 32px';
  navLinks.style.gap = '20px';
  navLinks.style.borderBottom = '1px solid rgba(17,17,16,0.1)';

  // Animate hamburger lines
  const spans = hamburger.querySelectorAll('span');
  if (!isOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.style.display = 'none';
    hamburger.querySelectorAll('span').forEach(s => s.style.transform = '');
  });
});

// ===== Scroll reveal =====
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -48px 0px'
});

revealElements.forEach(el => observer.observe(el));

// ===== Stagger children reveals =====
document.querySelectorAll('.services-grid, .work-grid').forEach(grid => {
  const cards = grid.querySelectorAll('.service-card, .work-item');
  cards.forEach((card, i) => {
    if (!card.style.getPropertyValue('--delay')) {
      card.style.setProperty('--delay', `${i * 0.1}s`);
    }
  });
});

// ===== Smooth parallax on hero =====
const heroBg = document.querySelector('.hero-bg');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ===== Stat counter animation =====
function animateCounter(el) {
  const target = parseFloat(el.textContent);
  const suffix = el.textContent.replace(/[\d.]/g, '');
  const duration = 1600;
  const startTime = performance.now();
  const isDecimal = el.textContent.includes('.');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

// ===== Cursor glow (subtle luxury effect) =====
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle, rgba(184,151,90,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  top: 0;
  left: 0;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
}, { passive: true });
