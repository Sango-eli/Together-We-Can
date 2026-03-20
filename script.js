// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// WhatsApp Donation Configuration
const WHATSAPP_NUMBER = '256781096164'; // +256781096164 without the +

// Donation Functions - WhatsApp Integration
function donateViaWhatsApp(amount) {
    const message = encodeURIComponent(`Hi, I would like to donate $${amount} to support disabled and underprivileged children. Please share payment details.`);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

function donateCustomAmount() {
    const customAmount = document.getElementById('customAmount').value;
    
    if (!customAmount || customAmount <= 0) {
        alert('Please enter a valid donation amount');
        return;
    }

    const amount = parseFloat(customAmount);
    const message = encodeURIComponent(`Hi, I would like to donate $${amount} to support disabled and underprivileged children. Please share payment details.`);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappURL, '_blank');
    
    // Reset the input
    document.getElementById('customAmount').value = '';
}

// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe program cards and testimonial cards
document.querySelectorAll('.program-card, .testimonial-card, .value-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a:not(.donate-btn)');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.style.color = '#2563eb';
        } else {
            link.style.color = '';
        }
    });
});

// Allow Enter key to submit donation
document.getElementById('customAmount').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        donateCustomAmount();
    }
});

// Counter animation for impact stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 50);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 50);
}

// Start counter animation when impact section is visible
const impactSection = document.querySelector('.impact');
let countersStarted = false;

const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            
            const stats = document.querySelectorAll('.stat-item h3');
            const values = [15000, 50, 95, 2500000];
            
            // Note: The third stat is a percentage, handled differently
            stats.forEach((stat, index) => {
                if (index === 2) {
                    // Percentage stat
                    animateCounter(stat, 95, 2000);
                    stat.textContent = '95%';
                } else if (index === 3) {
                    // Currency with formatting
                    stat.textContent = '$2.5M+';
                } else {
                    animateCounter(stat, values[index], 2000);
                }
            });
        }
    });
}, { threshold: 0.5 });

impactObserver.observe(impactSection);

// Add loading state to donation button
const donateBtn = document.querySelector('.donate-button');
donateBtn.addEventListener('click', function() {
    const originalText = this.textContent;
    this.textContent = 'Opening WhatsApp...';
    
    setTimeout(() => {
        this.textContent = originalText;
    }, 1500);
});

// Log page load
console.log('Hope & Healing Charity Website Loaded Successfully');
