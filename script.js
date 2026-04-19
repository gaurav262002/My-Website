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

    async function typeWriter(element, text, speed = 40) {
        for (let i = 0; i < text.length; i++) {
            element.innerHTML += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }

    async function runIntro() {
        // Skip if not on index or already seen in session
        const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

        if (!isHomePage || hasSeenIntro) {
            if (introOverlay) introOverlay.style.display = 'none';
            if (mainContent) mainContent.style.opacity = '1';
            return;
        }

        // Lock scroll during intro
        body.style.overflow = 'hidden';

        // Wait a beat
        await new Promise(r => setTimeout(r, 500));

        // Type Name
        await typeWriter(introName, nameText, 50);
        await new Promise(r => setTimeout(r, 400));

        // Type Tagline
        await typeWriter(introTagline, taglineText, 30);
        await new Promise(r => setTimeout(r, 1000));

        // Fade out overlay
        introOverlay.style.opacity = '0';
        setTimeout(() => {
            introOverlay.style.display = 'none';
            body.style.overflow = '';
            // Fade in main content
            mainContent.style.opacity = '1';
            sessionStorage.setItem('hasSeenIntro', 'true');
        }, 1000);
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
