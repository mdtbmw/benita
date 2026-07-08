// Cursor Glow
(function(){
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
        document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
        (function animateGlow() {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        })();
    }
})();

// Navbar scroll
const nav = document.getElementById('main-nav');
if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    });
}

// Scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Hero elements fire immediately
    setTimeout(() => {
        document.querySelectorAll('#hero .reveal, #hero .reveal-scale').forEach(el => el.classList.add('active'));
    }, 100);
});

// Mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    if (!menu || !btn) return;
    menu.classList.toggle('hidden');
    btn.innerHTML = menu.classList.contains('hidden')
        ? '<i class="fa-solid fa-bars text-lg"></i>'
        : '<i class="fa-solid fa-xmark text-lg"></i>';
}

// Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toast-message').textContent = message;
    toast.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
    }, 3000);
}

const PHONE_NUMBER = "2348167900635";
function triggerInquiry(name) {
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(`Hello Emmanuel Benita, I am interested in enrolling for the ${name} program. Please send me details.`)}`, '_blank');
}
function handleFormSubmit(e) {
    e.preventDefault();
    const i = e.target.querySelectorAll('input, select, textarea');
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(`*New Website Inquiry*\n\n*Name:* ${i[0].value}\n*Track:* ${i[1].value}\n*Message:* ${i[2].value}`)}`, '_blank');
    showToast("Redirecting to WhatsApp...");
    e.target.reset();
}

function openBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    const t = new Date(); t.setDate(t.getDate() + 1);
    const dateInput = document.getElementById('modal-date');
    if (dateInput) dateInput.value = t.toISOString().split('T')[0];
}
function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.classList.add('hidden');
}
function submitBooking() {
    const track = document.getElementById('modal-track');
    const date = document.getElementById('modal-date');
    if (!track || !date) return;
    if (!date.value) { showToast("Please select a valid date."); return; }
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(`*Booking Request*\n\nHi Emmanuel, I'd like to book the *${track.value}* starting around *${date.value}*. Let's discuss timings.`)}`, '_blank');
    closeBookingModal();
    showToast("Redirecting to WhatsApp to confirm schedule...");
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});