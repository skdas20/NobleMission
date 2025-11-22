/**
 * Noble Mission School - Main JavaScript
 * Pure Vanilla JavaScript - No Dependencies
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');

            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');

                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ========================================
    // Smooth Scrolling for Anchor Links
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && href !== '#more') {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Scroll to Top Button
    // ========================================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-menu a[href^="#"]');

    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ========================================
    // Animation on Scroll
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ========================================
    // Parallax Effect for Hero Section
    // ========================================
    const heroImage = document.querySelector('.hero-image img');

    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ========================================
    // Add Loading Class to Images
    // ========================================
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // Set initial opacity
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    // ========================================
    // Prevent Default for # Links
    // ========================================
    const hashLinks = document.querySelectorAll('a[href="#"]');
    hashLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.faq-answer').style.maxHeight = 0;
            }
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if(item.classList.contains('active')){
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c Noble Mission School ', 'background: #FFC629; color: #333; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c A school for kids with special needs ', 'color: #4DD0D6; font-size: 14px;');

});

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Get scroll percentage
 */
function getScrollPercent() {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}
