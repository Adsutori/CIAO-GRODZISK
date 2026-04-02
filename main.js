/* ----------------------------------------------------------
    NAVBAR SCROLL EFFECT
    ---------------------------------------------------------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
} else {
    navbar.classList.remove('scrolled');
}
}, { passive: true });

/* ----------------------------------------------------------
    MOBILE MENU
    ---------------------------------------------------------- */
const hamburger      = document.getElementById('hamburger');
const mobileMenu     = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

hamburger.addEventListener('click', () => {
mobileMenu.classList.add('open');
document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
mobileMenu.classList.remove('open');
document.body.style.overflow = '';
}

// Close mobile menu on outside click
mobileMenu.addEventListener('click', (e) => {
if (e.target === mobileMenu) closeMobileMenu();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
    closeMobileMenu();
    if (currentView === 'menu') showHome();
}
});

/* ----------------------------------------------------------
    MENU CATEGORY TABS
    ---------------------------------------------------------- */
const tabsContainer = document.getElementById('menuTabs');

if (tabsContainer) {
tabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.menu-tab');
    if (!btn) return;

    const cat = btn.dataset.cat;

    // Update active tab
    tabsContainer.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    // Update active category panel
    document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('active'));
    const panel = document.getElementById('cat-' + cat);
    if (panel) panel.classList.add('active');

    // Scroll tab into view on mobile
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
});
}

/* ----------------------------------------------------------
    RESERVATION FORM
    ---------------------------------------------------------- */
function handleReservation(e) {
e.preventDefault();

const form    = document.getElementById('reservationForm');
const success = document.getElementById('formSuccess');

// Animate form out
form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
form.style.opacity    = '0';
form.style.transform  = 'translateY(-8px)';

setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';
    success.style.opacity = '0';
    success.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        success.style.opacity = '1';
    });
    });
}, 400);
}

/* ----------------------------------------------------------
    SMOOTH SCROLL for anchor nav links
    ---------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
});

/* ----------------------------------------------------------
    INTERSECTION OBSERVER — fade-in on scroll
    ---------------------------------------------------------- */
const fadeEls = document.querySelectorAll(
'.dish-card, .stat-pill, .about-window, .contact-col, .menu-item'
);

const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.style.opacity   = '1';
    entry.target.style.transform = 'translateY(0)';
    fadeObserver.unobserve(entry.target);
    }
});
}, observerOpts);

fadeEls.forEach(el => {
el.style.opacity    = '0';
el.style.transform  = 'translateY(20px)';
el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
fadeObserver.observe(el);
});

/* ----------------------------------------------------------
    HERO HEADLINE — staggered word reveal on load
    ---------------------------------------------------------- */
window.addEventListener('load', () => {
const heroContent = document.querySelector('.hero-content');
if (!heroContent) return;

heroContent.style.opacity   = '0';
heroContent.style.transform = 'translateY(24px)';
heroContent.style.transition = 'opacity 1s ease 0.2s, transform 1s ease 0.2s';

requestAnimationFrame(() => {
    requestAnimationFrame(() => {
    heroContent.style.opacity   = '1';
    heroContent.style.transform = 'translateY(0)';
    });
});
});
