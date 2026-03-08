
// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});

function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx - 20 + 'px';
  cursorRing.style.top = ry - 20 + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// ===== BINARY RAIN =====
function createBinaryRain() {
  const rain = document.getElementById('binaryRain');
  const cols = Math.floor(window.innerWidth / 20);
  for (let i = 0; i < cols; i++) {
    const col = document.createElement('div');
    col.className = 'binary-col';
    col.style.left = (i * 20) + 'px';
    col.style.animationDuration = (Math.random() * 3 + 2) + 's';
    col.style.animationDelay = (Math.random() * 2) + 's';
    let str = '';
    for (let j = 0; j < 30; j++) str += Math.random() > 0.5 ? '1' : '0';
    col.textContent = str;
    rain.appendChild(col);
  }
}
createBinaryRain();

// ===== LOADER =====
const loaderLines = [
  { id: 'l1', delay: 200 },
  { id: 'l2', delay: 600 },
  { id: 'l3', delay: 1000 },
  { id: 'l4', delay: 1400 },
  { id: 'l5', delay: 1800 },
  { id: 'l6', delay: 2400 },
  { id: 'l7', delay: 2900 },
];

const bar = document.getElementById('loaderBar');
const pct = document.getElementById('loaderPct');
let progress = 0;

loaderLines.forEach(({id, delay}) => {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }, delay);
});

// Progress bar
const totalTime = 3800;
const startTime = Date.now();
const barInterval = setInterval(() => {
  const elapsed = Date.now() - startTime;
  progress = Math.min(100, (elapsed / totalTime) * 100);
  bar.style.width = progress + '%';
  pct.textContent = Math.floor(progress) + '%';
  if (progress >= 100) clearInterval(barInterval);
}, 16);

// Remove loader
setTimeout(() => {
  const loader = document.getElementById('loader');
  loader.classList.add('fade-out');
  setTimeout(() => {
    loader.style.display = 'none';
    document.getElementById('main').classList.add('visible');
    initAnimations();
    animateCounters();
  }, 800);
}, 4000);

// ===== INIT ANIMATIONS =====
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skill bars
        const bar = entry.target.querySelector('.skill-bar');
        if (bar) {
          setTimeout(() => {
            bar.style.width = bar.dataset.width + '%';
          }, 200);
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .exp-item').forEach(el => observer.observe(el));
}

// ===== COUNTERS =====
function animateCounters() {
  function count(id, target, suffix = '') {
    let current = 0;
    const step = target / 60;
    const el = document.getElementById(id);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + suffix;
    }, 25);
  }
  count('c1',0, '+');
  count('c2', 0, '+');
  count('c3', '1.2k'.replace('k','') * 1, '');
  setTimeout(() => {
    document.getElementById('c3').textContent = '1.2k';
  }, 1600);
}

// ===== SCROLL DOTS =====
const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
const dots = document.querySelectorAll('.scroll-dot');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.offsetTop - 200;
    const bottom = top + el.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      dots.forEach(d => d.classList.remove('active'));
      dots[i].classList.add('active');
    }
  });
});

// ===== PARALLAX HERO BG =====
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const grid = document.querySelector('.hero-bg-grid');
  if (grid) grid.style.transform = `translateY(${y * 0.3}px)`;
});

// ===== GLITCH RANDOM =====
setInterval(() => {
  const glitch = document.querySelector('.hero-name');
  if (!glitch) return;
  glitch.style.filter = 'blur(0.5px)';
  setTimeout(() => glitch.style.filter = '', 50);
}, 5000);