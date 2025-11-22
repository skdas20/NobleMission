/**
 * Noble Mission School - Complete JavaScript
 * All features and interactions
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Hero Slider
    // ========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let heroInterval;

    function showHeroSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));

        if (heroSlides[index]) {
            heroSlides[index].classList.add('active');
        }
        if (heroDots[index]) {
            heroDots[index].classList.add('active');
        }

        // Reset text animations
        const heroTitle = document.querySelector('.hero-title');
        const heroBtn = document.querySelector('.btn-hero');
        if (heroTitle && heroBtn) {
            heroTitle.style.animation = 'none';
            heroBtn.style.animation = 'none';
            setTimeout(() => {
                heroTitle.style.animation = '';
                heroBtn.style.animation = '';
            }, 10);
        }
    }

    function nextHeroSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showHeroSlide(currentSlide);
    }

    if (heroSlides.length > 0) {
        // Auto-rotate slides every 6 seconds
        heroInterval = setInterval(nextHeroSlide, 6000);

        // Dots navigation
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(heroInterval);
                currentSlide = index;
                showHeroSlide(currentSlide);
                heroInterval = setInterval(nextHeroSlide, 6000);
            });
        });

        // Pause on hover
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', function() {
                clearInterval(heroInterval);
            });

            heroSection.addEventListener('mouseleave', function() {
                heroInterval = setInterval(nextHeroSlide, 6000);
            });
        }
    }

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');

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
    // Smooth Scrolling
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
    // Testimonials Slider
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    if (testimonialCards.length > 0) {
        // Auto-rotate testimonials every 5 seconds
        testimonialInterval = setInterval(nextTestimonial, 5000);

        // Click on dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        });
    }

    // ========================================
    // Scroll to Top Button
    // ========================================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

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

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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

    // Observe all cards
    const cards = document.querySelectorAll('.feature-card, .program-card, .news-card, .staff-card, .event-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.05}s`;
        observer.observe(card);
    });

    // ========================================
    // Parallax Effect for Hero
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
    // Newsletter Form Submission
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                alert(`Thank you for subscribing! We'll send updates to ${email}`);
                this.reset();
            }
        });
    }

    // ========================================
    // Contact Form Submission
    // ========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                firstName: this.querySelectorAll('input')[0].value,
                lastName: this.querySelectorAll('input')[1].value,
                email: this.querySelector('input[type="email"]').value,
                subject: this.querySelectorAll('input')[3].value,
                message: this.querySelector('textarea').value
            };

            console.log('Form submission:', formData);
            alert('Thank you for contacting us! We will get back to you soon.');
            this.reset();
        });
    }

    // ========================================
    // Mission Tabs
    // ========================================
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // In a real implementation, you would show/hide different content here
            console.log('Tab clicked:', this.textContent);
        });
    });

    // ========================================
    // Counter Animation for Stats
    // ========================================
    const statNumber = document.querySelector('.stat-number');

    if (statNumber) {
        const targetValue = 345599;
        const duration = 2000;
        let startTime = null;

        function animateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                const currentValue = Math.floor(targetValue * progress);
                statNumber.textContent = '$' + currentValue.toLocaleString();
                requestAnimationFrame(animateCounter);
            } else {
                statNumber.textContent = '$' + targetValue.toLocaleString();
            }
        }

        const statObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    requestAnimationFrame(animateCounter);
                }
            });
        });

        statObserver.observe(statNumber);
    }

    // ========================================
    // Image Loading
    // ========================================
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    // ========================================
    // Prevent Default for Empty Links
    // ========================================
    const hashLinks = document.querySelectorAll('a[href="#"]');
    hashLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ========================================
    // Instagram Grid Hover Effect
    // ========================================
    const instaItems = document.querySelectorAll('.insta-item');

    instaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
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

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
