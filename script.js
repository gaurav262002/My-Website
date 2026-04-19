document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }

    // 2. Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-menu a.nav-item');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // 3. Landing Animation (Homepage only)
    const introOverlay = document.getElementById('intro-overlay');
    const introName = document.getElementById('intro-name');
    const introTagline = document.getElementById('intro-tagline');
    const mainContent = document.querySelector('main');

    const nameText = "Gaurav Kolte";
    const taglineText = "Purdue Industrial Engineering | Incoming Tesla Intern";

    async function runIntro() {
        const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

        if (!isHomePage || hasSeenIntro) {
            if (introOverlay) introOverlay.style.display = 'none';
            if (mainContent) mainContent.style.opacity = '1';
            return;
        }

        // Lock scroll
        body.style.overflow = 'hidden';

        // Set Text immediately (but invisible due to CSS)
        introName.textContent = nameText;
        introTagline.textContent = taglineText;

        // Start Sequence
        await new Promise(r => setTimeout(r, 500));
        
        // Step 1: Reveal Elements
        introOverlay.classList.add('reveal');

        // Step 2: Hold for a premium moment
        await new Promise(r => setTimeout(r, 2800));

        // Step 3: Exit Intro
        introOverlay.classList.add('fade-out');

        // Step 4: Fade in content elegantly
        setTimeout(() => {
            if (mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.transition = 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
                mainContent.style.transform = 'translateY(0)';
            }
        }, 500);

        setTimeout(() => {
            introOverlay.style.display = 'none';
            body.style.overflow = '';
            sessionStorage.setItem('hasSeenIntro', 'true');
        }, 2000);
    }

    if (introOverlay) {
        runIntro();
    } else {
        // If no overlay (other pages), just show content
        if (mainContent) mainContent.style.opacity = '1';
    }

    // 4. Scroll Animations for cards
    const fadeElements = document.querySelectorAll('.project-card, .info-pill, .about-box');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
});
