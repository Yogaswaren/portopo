// ==========================================
// YOGAS WAREN - PORTFOLIO JAVASCRIPT
// Language Toggle, Animations, CV Modal
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // ===== ELEMENTS =====
    const header = document.querySelector('.header');
    const backToTop = document.getElementById('backToTop');
    const langToggle = document.getElementById('langToggle');
    const langFlag = document.getElementById('langFlag');
    const langText = document.getElementById('langText');
    const cvModal = document.getElementById('cvModal');
    const cvModalOverlay = document.getElementById('cvModalOverlay');
    const cvCloseBtn = document.getElementById('cvCloseBtn');
    const viewCvBtn = document.getElementById('viewCvBtn');
    const cvIframe = document.getElementById('cvIframe');

    let currentLang = 'en';
    document.querySelectorAll('.hero-role, .cursor, #typingText').forEach(el => el.remove());

    // ===== STICKY HEADER =====
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 80);

        // Back to top button
        if (backToTop) {
            backToTop.classList.toggle('show', window.scrollY > 500);
        }

        // Scroll reveal
        revealElements();

        // Animate stat counters
        animateCounters();
    });

    // ===== SCROLL REVEAL =====
    function revealElements() {
        const reveals = document.querySelectorAll('.glass-card, .project-showcase, .timeline-item, .skills-category, .section-header, .about-grid, .about-img-wrapper, .about-info, .contact-info, .contact-form-wrapper, .qualification-card, .focus-pills');

        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('reveal', 'active');
            }
        });
    }

    // ===== STAT COUNTER ANIMATION =====
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;

        const statSection = document.querySelector('.about-stats');
        if (!statSection) return;

        const sectionTop = statSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            countersAnimated = true;
            const counters = document.querySelectorAll('.stat-number');

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, 40);
            });
        }
    }

    // ===== DUAL LANGUAGE ENGINE =====
    function setLanguage(lang) {
        currentLang = lang;
        try {
            localStorage.setItem('yogas_portfolio_lang', lang);
        } catch (e) {
            // Storage not available
        }

        // Update HTML lang and data-lang attribute
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang);

        // Update header language switch active states
        const headerLangBtns = document.querySelectorAll('.lang-btn-opt');
        headerLangBtns.forEach(btn => {
            if (btn.getAttribute('data-lang-val') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update floating toggle button
        if (langFlag && langText) {
            langFlag.className = 'lang-flag flag ' + (lang === 'en' ? 'flag-gb' : 'flag-id');
            langText.textContent = lang === 'en' ? 'EN' : 'ID';
        }

        // Update all elements with data-en and data-id attributes
        const translatableElements = document.querySelectorAll('[data-en][data-id]');
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                el.textContent = text;
            }
        });

        // Update inputs and textareas placeholders
        const placeholderInputs = document.querySelectorAll('[data-en-placeholder][data-id-placeholder]');
        placeholderInputs.forEach(input => {
            const ph = input.getAttribute(`data-${lang}-placeholder`);
            if (ph) input.placeholder = ph;
        });
    }

    // Header Language Switch Buttons
    const headerLangBtns = document.querySelectorAll('.lang-btn-opt');
    headerLangBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const chosenLang = btn.getAttribute('data-lang-val');
            setLanguage(chosenLang);
        });
    });

    // Floating Language Toggle
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'id' : 'en';
            setLanguage(newLang);
            langToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                langToggle.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Initialize Language from localStorage or default to 'id'
    let initialLang = 'id';
    try {
        const stored = localStorage.getItem('yogas_portfolio_lang');
        if (stored === 'en' || stored === 'id') {
            initialLang = stored;
        }
    } catch (e) {
        initialLang = 'id';
    }
    setLanguage(initialLang);

    // ===== CV MODAL & DUAL LANGUAGE CV TABS =====
    const cvTabId = document.getElementById('cvTabId');
    const cvTabEn = document.getElementById('cvTabEn');
    const cvEnView = document.getElementById('cvEnView');

    function switchCvTab(tab) {
        if (tab === 'en') {
            if (cvTabEn) cvTabEn.classList.add('active');
            if (cvTabId) cvTabId.classList.remove('active');
            if (cvIframe) cvIframe.style.display = 'none';
            if (cvEnView) cvEnView.style.display = 'block';
        } else {
            if (cvTabId) cvTabId.classList.add('active');
            if (cvTabEn) cvTabEn.classList.remove('active');
            if (cvEnView) cvEnView.style.display = 'none';
            if (cvIframe) {
                cvIframe.style.display = 'block';
                if (!cvIframe.src || cvIframe.src === '' || cvIframe.src.endsWith('/')) {
                    cvIframe.src = './CV_Yogas_Waren.pdf';
                }
            }
        }
    }

    if (cvTabId) {
        cvTabId.addEventListener('click', () => switchCvTab('id'));
    }
    if (cvTabEn) {
        cvTabEn.addEventListener('click', () => switchCvTab('en'));
    }

    // Tombol View CV / Lihat CV langsung membuka file PDF melalui href="./CV_Yogas_Waren.pdf"

    if (cvCloseBtn) {
        cvCloseBtn.addEventListener('click', () => {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (cvModalOverlay) {
        cvModalOverlay.addEventListener('click', () => {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close CV modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.classList.contains('active')) {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Create mailto link
            const mailtoLink = `mailto:yogaswrn11@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
            window.location.href = mailtoLink;

            // Show success feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="bx bx-check"></i> <span>' + (currentLang === 'en' ? 'Opening Email...' : 'Membuka Email...') + '</span>';
            btn.style.background = 'var(--success)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ===== PARTICLES BACKGROUND =====
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(108, 92, 231, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200 + 50}px, -${Math.random() * 500 + 200}px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    createParticles();

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== HANDLE HERO IMAGE FALLBACK =====
    const heroImg = document.getElementById('heroImg');
    if (heroImg) {
        heroImg.onerror = function() {
            // Try alternative image sources
            const alternatives = ['./Capture.JPG', './Photolab-681562354.jpeg', './ksks_2-removebg-preview.png'];
            let altIndex = 0;

            const tryNext = () => {
                if (altIndex < alternatives.length) {
                    heroImg.src = alternatives[altIndex];
                    altIndex++;
                } else {
                    // Final fallback: gradient placeholder with initials
                    const frame = heroImg.closest('.image-frame');
                    if (frame) {
                        frame.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#6c5ce7,#a29bfe);font-size:8rem;font-weight:800;color:white;font-family:'Outfit',sans-serif;">YW</div>`;
                    }
                }
            };

            heroImg.onerror = tryNext;
            tryNext();
        };
    }

    // About image fallback
    const aboutImg = document.querySelector('.about-img-wrapper img');
    if (aboutImg) {
        aboutImg.onerror = function() {
            const alternatives = ['./Capture.JPG', './Photolab-681562354.jpeg', './ksks_2-removebg-preview.png'];
            let altIndex = 0;

            const tryNext = () => {
                if (altIndex < alternatives.length) {
                    aboutImg.src = alternatives[altIndex];
                    altIndex++;
                } else {
                    aboutImg.style.display = 'none';
                }
            };

            aboutImg.onerror = tryNext;
            tryNext();
        };
    }

    // Initial reveal check
    revealElements();
    animateCounters();
});
