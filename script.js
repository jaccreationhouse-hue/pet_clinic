document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Sticky Navbar and Back to Top Button
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if(backToTop) {
            if(window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    if(backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Animated Counters
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = +entry.target.getAttribute('data-target');
                const countElement = entry.target;
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if(current < target) {
                        countElement.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        countElement.innerText = target;
                        countElement.classList.add('counted');
                    }
                };
                
                updateCounter();
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => countObserver.observe(counter));

    // 5. Form Validation (for Appointment / Contact forms)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation check
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if(!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = 'var(--border-color)';
                }
            });

            if(isValid) {
                // Show success message
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Success!';
                btn.classList.add('btn-primary');
                btn.classList.remove('btn-secondary'); // If it was secondary
                
                setTimeout(() => {
                    form.reset();
                    btn.innerHTML = originalText;
                }, 3000);
            }
        });
    });
});
