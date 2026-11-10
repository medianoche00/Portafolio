import './style.css';

// ===== PARTÍCULAS =====
(function () {
    const c = document.getElementById('particles');
    const colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#a29bfe', '#fdcb6e'];
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        const s = Math.random() * 4 + 2 + 'px';
        p.style.width = s;
        p.style.height = s;
        p.style.animationDuration = Math.random() * 10 + 8 + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.appendChild(p);
    }
})();

// ===== TEMA =====
function toggleTheme() {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}

(function () {
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
})();

// ===== NAVBAR =====
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MENÚ MÓVIL =====
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');

function toggleMenu() {
    const open = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(open));
}

function closeMenu() {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', toggleMenu);
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

// ===== FILTRO POR CATEGORÍA =====
function filterCategory(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.skill-category').forEach((section) => {
        if (cat === 'todos' || section.dataset.cat === cat) {
            section.classList.remove('cat-hidden');
            section.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            section.classList.add('cat-hidden');
        }
    });
}

document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => filterCategory(btn.dataset.filter, btn));
});

// ===== REVEAL =====
function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('active');
    });
}
window.addEventListener('scroll', revealOnScroll);

// ===== CONTADORES =====
let countersRan = false;
new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting && !countersRan) {
            document.querySelectorAll('.stat-number').forEach((c) => {
                const t = +c.dataset.target;
                const s = t / 125;
                let cur = 0;
                const timer = setInterval(() => {
                    cur += s;
                    if (cur >= t) {
                        c.textContent = t + '+';
                        clearInterval(timer);
                    } else {
                        c.textContent = Math.floor(cur);
                    }
                }, 16);
            });
            countersRan = true;
        }
    });
}, { threshold: 0.3 }).observe(document.querySelector('.about-stats'));

revealOnScroll();
