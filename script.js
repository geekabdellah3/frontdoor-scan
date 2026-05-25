document.addEventListener('DOMContentLoaded', () => {

    // --- 0.5. Announcement Bar Logic ---
    const announcementBar = document.getElementById('announcement-bar');
    const closeAnnouncementBtn = document.getElementById('close-announcement');

    // Bar is visible by default in HTML. Hide only if user already dismissed it.
    if (announcementBar && localStorage.getItem('memorybloom_trial_dismissed')) {
        announcementBar.style.display = 'none';
        document.body.style.paddingTop = '0';
        document.querySelector('.navbar').style.top = '0';
    }

    if (closeAnnouncementBtn) {
        closeAnnouncementBtn.addEventListener('click', () => {
            announcementBar.classList.add('hidden');
            localStorage.setItem('memorybloom_trial_dismissed', 'true');
            setTimeout(() => {
                announcementBar.style.display = 'none';
                document.body.style.paddingTop = '0';
                document.querySelector('.navbar').style.top = '0';
            }, 200);
        });
    }

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Drawer Logic ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
    });

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- 3. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- 4. Pricing Toggle Logic ---
    const billingToggle = document.getElementById('billing-toggle');
    const premiumPrice = document.getElementById('premium-price');

    if (billingToggle && premiumPrice) {
        billingToggle.addEventListener('change', () => {
            if (billingToggle.checked) {
                // Annual
                premiumPrice.innerHTML = '$80 <span>/ year</span>';
            } else {
                // Monthly
                premiumPrice.innerHTML = '$8 <span>/ month</span>';
            }
        });
    }

    // --- 5. Scroll Reveal Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    fadeElements.forEach(el => observer.observe(el));

    // --- 6. CTA Link Tracking & UTM Passthrough ---
    // Example UTM Passthrough: Keep existing query params from the URL when clicking Start Free
    const ctaLinks = document.querySelectorAll('a[href^="/start"]');
    const currentParams = window.location.search;

    ctaLinks.forEach(link => {
        if (currentParams) {
            const originalHref = link.getAttribute('href');
            // Check if link already has params
            if (originalHref.includes('?')) {
                // Remove the '?' from currentParams and append
                link.setAttribute('href', `${originalHref}&${currentParams.substring(1)}`);
            } else {
                link.setAttribute('href', `${originalHref}${currentParams}`);
            }
        }
        
        // Mocking the click for the static landing page demo
        // DEVELOPER NOTE: Signup modal must have 3 steps: 
        // 1. Email/Password 
        // 2. Card Details (Stripe) 
        // 3. Confirmation showing Day 4 billing date. Card is strictly required.
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const source = link.getAttribute('data-cta') || 'unknown';
            console.log(`Navigating to: ${link.href} (Source: ${source})`);
            alert(`Simulation: Opening 3-Step Trial Signup Modal (Card Required)\nNavigating to ${link.href}`);
        });
    });

    // Mock Login Link
    const loginLinks = document.querySelectorAll('a[href="/login"]');
    loginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Simulation: Navigating to Login');
        });
    });

    // --- 7. Exit Intent Modal ---
    const exitModal = document.getElementById('exit-modal');
    const closeModal = document.getElementById('close-modal');
    let hasShownExitModal = false;

    // Detect mouse leaving towards the top of the viewport
    document.addEventListener('mouseout', (e) => {
        if (e.clientY < 50 && !hasShownExitModal && window.innerWidth > 768) { // Desktop only exit intent
            exitModal.classList.add('active');
            hasShownExitModal = true;
        }
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            exitModal.classList.remove('active');
        });
    }

    // Close modal on outside click
    if (exitModal) {
        exitModal.addEventListener('click', (e) => {
            if (e.target === exitModal) {
                exitModal.classList.remove('active');
            }
        });
    }

    // --- 8. Footer Year ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
