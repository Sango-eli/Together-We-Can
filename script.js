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
document.querySelectorAll('.program-card, .testimonial-card, .value-item, .testimonial-form-container').forEach(card => {
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

// Local Storage key for testimonies
const TESTIMONIES_STORAGE_KEY = 'charityTestimonies';

// Function to load and display testimonies from local storage
function loadDisplayedTestimonies() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    const storedTestimonies = localStorage.getItem(TESTIMONIES_STORAGE_KEY);
    
    if (storedTestimonies) {
        try {
            const testimonies = JSON.parse(storedTestimonies);
            
            testimonies.forEach(testimony => {
                // Create testimonial card element
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card user-submitted';
                testimonialCard.innerHTML = `
                    <p class="testimonial-text">"${testimony.text}"</p>
                    <p class="testimonial-author">- ${testimony.name}, ${testimony.relationship}</p>
                    <p class="testimonial-date">${testimony.date}</p>
                `;
                
                // Append to grid
                testimonialsGrid.appendChild(testimonialCard);
                
                // Trigger animation for new card
                testimonialCard.style.opacity = '0';
                testimonialCard.style.transform = 'translateY(20px)';
                testimonialCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(testimonialCard);
            });
        } catch (error) {
            console.error('Error loading testimonies:', error);
        }
    }
}

// Call function to display testimonies on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDisplayedTestimonies);
} else {
    loadDisplayedTestimonies();
}

// Testimonial Form Handling
const testimonialForm = document.getElementById('testimonialForm');

if (testimonialForm) {
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const relationship = document.getElementById('relationship').value;
        const testimony = document.getElementById('testimony').value.trim();
        const email = document.getElementById('email').value.trim();
        const sharePublic = document.getElementById('sharePublic').checked;
        
        // Validate required fields
        if (!fullName || !relationship || !testimony) {
            alert('Please fill in all required fields (marked with *)');
            return;
        }
        
        // Save to local storage if user consents to share publicly
        if (sharePublic) {
            const newTestimony = {
                name: fullName,
                relationship: relationship,
                text: testimony,
                date: new Date().toLocaleDateString(),
                email: email
            };
            
            // Get existing testimonies
            const storedTestimonies = localStorage.getItem(TESTIMONIES_STORAGE_KEY);
            let testimonies = storedTestimonies ? JSON.parse(storedTestimonies) : [];
            
            // Add new testimony
            testimonies.unshift(newTestimony); // Add to beginning so newest appears first
            
            // Save back to local storage (limit to 50 most recent)
            testimonies = testimonies.slice(0, 50);
            localStorage.setItem(TESTIMONIES_STORAGE_KEY, JSON.stringify(testimonies));
            
            // Add to page immediately
            const testimonialsGrid = document.querySelector('.testimonials-grid');
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card user-submitted';
            testimonialCard.innerHTML = `
                <p class="testimonial-text">"${testimony}"</p>
                <p class="testimonial-author">- ${fullName}, ${relationship}</p>
                <p class="testimonial-date">${new Date().toLocaleDateString()}</p>
            `;
            
            // Insert at beginning of grid
            testimonialsGrid.insertBefore(testimonialCard, testimonialsGrid.firstChild);
            
            // Trigger animation
            testimonialCard.style.opacity = '0';
            testimonialCard.style.transform = 'translateY(20px)';
            testimonialCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(testimonialCard);
        }
        
        // Create message for WhatsApp
        const testimonialMessage = encodeURIComponent(
            `New Testimony Submission:\n\n` +
            `Name: ${fullName}\n` +
            `Relationship: ${relationship}\n` +
            `Email: ${email || 'Not provided'}\n` +
            `Share Publicly: ${sharePublic ? 'Yes' : 'No'}\n\n` +
            `Testimony:\n${testimony}`
        );
        
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${testimonialMessage}`;
        
        // Show success message and reset form
        const originalText = this.querySelector('.submit-testimony-btn').textContent;
        const submitBtn = this.querySelector('.submit-testimony-btn');
        submitBtn.textContent = '✓ Testimony Submitted!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        setTimeout(() => {
            testimonialForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            
            // Open WhatsApp to send the testimonial
            window.open(whatsappURL, '_blank');
            
            // Show alert with next steps
            alert('Thank you for sharing your testimony!' + (sharePublic ? ' Your story is now visible to other visitors on our website.' : ' Your story has been sent to our team for review.'));
        }, 1500);
    });
}
