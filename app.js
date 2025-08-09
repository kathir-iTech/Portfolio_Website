// Kathirvel R Portfolio JavaScript - Fixed Navigation Version

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle functionality
    function toggleMobileMenu() {
        if (mobileMenu && mobileMenuBtn) {
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            } else {
                mobileMenu.classList.add('active');
                mobileMenuBtn.classList.add('active');
            }
        }
    }

    // Add click event to mobile menu button
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Improved smooth scroll function
    function smoothScrollToElement(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const elementPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
            
            return true;
        }
        return false;
    }

    // Handle navigation links with improved functionality
    function setupNavigationLinks() {
        // Handle both nav-link and mobile-nav-link classes
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Only handle internal hash links
            if (href && href.startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('Navigation clicked:', href);
                    
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                    
                    // Handle hero section
                    if (href === '#hero') {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } else {
                        // Handle other sections
                        const success = smoothScrollToElement(href);
                        if (!success) {
                            console.warn('Target element not found:', href);
                        }
                    }
                });
            }
        });
    }

    // Setup Get In Touch button
    function setupGetInTouchButton() {
        const getInTouchBtn = document.querySelector('a[href="#contact"]');
        if (getInTouchBtn) {
            getInTouchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Get In Touch clicked');
                smoothScrollToElement('#contact');
            });
        }
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenuBtn) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleNavbarScroll, 10);
    });

    // Active navigation highlighting
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('text-emerald-400');
                    link.classList.add('text-slate-300');
                });

                // Add active class to current nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.remove('text-slate-300');
                    activeLink.classList.add('text-emerald-400');
                }
            }
        });
    }

    // Add scroll listener for active nav
    window.addEventListener('scroll', updateActiveNavigation);

    // Intersection Observer for fade animations
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    // Observe fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Add security attributes and click feedback to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add click feedback for external links
        link.addEventListener('click', function() {
            console.log('External certification link clicked:', this.href);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Certification card interactions
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize hero animations
    function initializeHeroAnimations() {
        const heroElements = document.querySelectorAll('#hero .fade-in-up');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200 + 500);
        });
    }

    // Add interactive effects to tool chips
    function addToolChipEffects() {
        const toolChips = document.querySelectorAll('.tool-chip');
        toolChips.forEach(chip => {
            chip.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });

            chip.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Add hover effects to contact buttons
    function addContactButtonEffects() {
        const contactButtons = document.querySelectorAll('.contact-btn');
        contactButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Staggered animation for certification cards
    function animateCertificationCards() {
        const certCards = document.querySelectorAll('.certification-card');
        certCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    // Initialize page
    function initializePage() {
        // Set initial navbar state
        handleNavbarScroll();
        
        // Set initial active nav
        updateActiveNavigation();
        
        // Setup navigation links
        setupNavigationLinks();
        
        // Setup Get In Touch button
        setupGetInTouchButton();
        
        // Initialize animations
        setTimeout(initializeHeroAnimations, 100);
        setTimeout(animateCertificationCards, 500);
        
        // Add interactive effects
        addToolChipEffects();
        addContactButtonEffects();
        
        // Mark body as loaded
        document.body.classList.add('loaded');
        
        console.log('Portfolio initialized successfully');
        console.log('Navigation system fully functional');
        console.log('Certifications section loaded with clickable links');
    }

    // Run initialization
    initializePage();

    // Debug information
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    console.log('Navigation links found:', navLinks.length);
    console.log('Fade elements found:', fadeElements.length);
    console.log('Certification cards found:', certificationCards.length);
    console.log('External links found:', externalLinks.length);
    console.log('Mobile menu button:', mobileMenuBtn ? 'Found' : 'Not found');
    console.log('Mobile menu:', mobileMenu ? 'Found' : 'Not found');
    
    // List all sections for debugging
    const sections = document.querySelectorAll('section[id]');
    console.log('Sections found:', Array.from(sections).map(s => s.id));
});

// Global variable to track mouse/touch position
let mouse = { x: null, y: null, active: false };

// Mouse movement on desktop
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});

// Mouse leaves canvas
canvas.addEventListener('mouseleave', function() {
  mouse.active = false;
});

// Touch events on mobile
canvas.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    mouse.active = true;
  }
});
canvas.addEventListener('touchmove', function(e) {
  if (e.touches.length === 1) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    mouse.active = true;
  }
});
canvas.addEventListener('touchend', function() {
  mouse.active = false;
});


if (mouse.active && mouse.x !== null && mouse.y !== null) {
  for (const p of particles) {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < maxDistance) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)';
      ctx.stroke();
    }
  }
}

