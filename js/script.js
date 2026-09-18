// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update active state in nav
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Scroll Animation Observer for sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden-section').forEach((section) => {
    observer.observe(section);
});

// Project Filtering Logic
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    // Show card
                    card.style.display = card.classList.contains('featured-project') ? 'flex' : 'flex';
                    // We need a slight delay to allow display:flex to apply before changing opacity for transition
                    setTimeout(() => {
                        card.classList.remove('hidden');
                    }, 10);
                } else {
                    // Hide card
                    card.classList.add('hidden');
                    // Wait for transition to complete before setting display:none
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 400); // Matches CSS transition duration
                }
            });
        });
    });
});

// Skill Card Highlight Logic
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skills-grid .skill-card');

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle the violet highlight for every box you click
            card.classList.toggle('highlight-card');
        });
    });
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default POST request
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Show loading state
            btn.innerHTML = 'Sending...';
            
            // Simulate a network request
            setTimeout(() => {
                alert('Thank you for your message! \n\n(Note: Since this is a static website template, no email was actually sent. Please email me directly at misslipika.sau@gmail.com)');
                
                // Reset button and form
                btn.innerHTML = 'Message Sent! ✓';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 3000);
            }, 800);
        });
    }
});
