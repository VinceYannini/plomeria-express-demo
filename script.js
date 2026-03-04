/* ============================================
   PLOMERÍA EXPRESS — JavaScript
   Nav, form→WhatsApp, scroll animations
   ============================================ */

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
    });
});

/* ---- Form → WhatsApp ---- */
const form = document.getElementById('quoteForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('fname').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    const service = document.getElementById('fservice').value;
    const desc = document.getElementById('fdesc').value.trim();
    const urgency = document.querySelector('input[name="urgency"]:checked').value;

    if (!name || !phone || !service) {
        alert('Por favor llena los campos obligatorios: nombre, teléfono y servicio.');
        return;
    }

    const isEmergency = urgency === 'EMERGENCIA' || service === 'EMERGENCIA';
    const prefix = isEmergency ? '🚨 EMERGENCIA' : '📋 Nueva Cotización';

    // Build WhatsApp message
    const msg = [
        `PLOMERIA: ${prefix}`,
        ``,
        `👤 Nombre: ${name}`,
        `📞 Teléfono: ${phone}`,
        `🔧 Servicio: ${service}`,
        `⏰ Urgencia: ${urgency}`,
        desc ? `📝 Descripción: ${desc}` : '',
    ].filter(Boolean).join('\n');

    const encoded = encodeURIComponent(msg);
    // Phone number placeholder — replace with actual number
    const waUrl = `https://wa.me/521234567890?text=${encoded}`;

    window.open(waUrl, '_blank');
});

/* ---- Scroll-reveal ---- */
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.service-card, .step-card, .testimonial-card, .tag').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
});

/* ---- WA Float: hide at footer ---- */
const waFloat = document.getElementById('waFloat');
const footer = document.querySelector('.footer');

const footerObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        waFloat.style.opacity = e.isIntersecting ? '0' : '1';
        waFloat.style.pointerEvents = e.isIntersecting ? 'none' : 'auto';
    });
});
footerObs.observe(footer);
