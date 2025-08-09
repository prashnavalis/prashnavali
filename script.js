// Language and Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Language Toggle Functionality
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('selectedLanguage') || 'en';

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        
        // Update language buttons
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-en][data-hi]');
        translatableElements.forEach(element => {
            if (lang === 'hi' && element.dataset.hi) {
                element.textContent = element.dataset.hi;
            } else if (lang === 'en' && element.dataset.en) {
                element.textContent = element.dataset.en;
            }
        });

        // Update document title
        const titleElement = document.querySelector('title');
        if (titleElement) {
            if (lang === 'hi') {
                titleElement.textContent = 'राम शलाका प्रश्नावली ऑनलाइन - श्री राम से दिव्य मार्गदर्शन';
            } else {
                titleElement.textContent = 'Ram Shalaka Prashnavali Online - Divine Guidance from Lord Rama';
            }
        }
    }

    // Add click event listeners to language buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            switchLanguage(lang);
        });
    });

    // Initialize language on page load
    switchLanguage(currentLang);

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation to table cells
    const tableCells = document.querySelectorAll('.prashnavali-table td a');
    tableCells.forEach(cell => {
        cell.addEventListener('click', function(e) {
            // Add loading state
            this.innerHTML = '<div class="loading"></div>';
            
            // Simulate loading delay (remove this in production)
            setTimeout(() => {
                // Navigate to the answer page
                window.location.href = this.href;
            }, 500);
        });
    });

    // Add hover effects to table cells
    tableCells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.zIndex = '10';
        });
        
        cell.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });

    // Add fade-in animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add click sound effect (optional)
    function playClickSound() {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        audio.volume = 0.1;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }

    // Add click sound to table cells
    tableCells.forEach(cell => {
        cell.addEventListener('click', playClickSound);
    });

    // Add keyboard navigation for accessibility
    let currentFocusIndex = 0;
    const focusableElements = document.querySelectorAll('.prashnavali-table td a, .btn, .nav a');

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            
            if (e.shiftKey) {
                currentFocusIndex = currentFocusIndex > 0 ? currentFocusIndex - 1 : focusableElements.length - 1;
            } else {
                currentFocusIndex = currentFocusIndex < focusableElements.length - 1 ? currentFocusIndex + 1 : 0;
            }
            
            focusableElements[currentFocusIndex].focus();
        }
    });

    // Add touch gesture support for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Swipe up to scroll to top
        if (diffY > 50 && Math.abs(diffX) < 50) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        touchStartX = 0;
        touchStartY = 0;
    });

    // Add vibration feedback for mobile (if supported)
    function vibrate() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    tableCells.forEach(cell => {
        cell.addEventListener('click', vibrate);
    });

    // Add analytics tracking (placeholder)
    function trackEvent(eventName, eventData) {
        // Replace with your analytics service
        console.log('Event tracked:', eventName, eventData);
    }

    // Track table cell clicks
    tableCells.forEach((cell, index) => {
        cell.addEventListener('click', function() {
            trackEvent('prashnavali_click', {
                cellIndex: index,
                cellText: this.textContent,
                timestamp: new Date().toISOString()
            });
        });
    });

    // Add performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log('Page loaded in:', loadTime, 'ms');
        
        if (loadTime > 3000) {
            console.warn('Page load time is slow. Consider optimizing images and scripts.');
        }
    });

    // Add error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        trackEvent('javascript_error', {
            message: e.error.message,
            filename: e.filename,
            lineno: e.lineno
        });
    });

    // Add offline/online detection
    window.addEventListener('online', function() {
        console.log('Connection restored');
        document.body.classList.remove('offline');
    });

    window.addEventListener('offline', function() {
        console.log('Connection lost');
        document.body.classList.add('offline');
    });

    // Add service worker registration (if available)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    }
});

// Add CSS for mobile menu active state
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--deep-red);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav ul {
            flex-direction: column;
            gap: 1rem;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .offline {
            position: relative;
        }
        
        .offline::before {
            content: 'No Internet Connection';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff4444;
            color: white;
            text-align: center;
            padding: 0.5rem;
            z-index: 10000;
        }
    }
`;
document.head.appendChild(style); 