// Mobile menu toggle for about page
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Stats counter animation for about page
    initStatsCounter();
});

function initStatsCounter() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statDuration = 2000;

    if (statsNumbers.length === 0) {
        return;
    }

    statsNumbers.forEach(num => {
        num.textContent = '0';
    });

    function animateCounter(element, target, duration, suffix = '') {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            element.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    // Start animation after a short delay
    setTimeout(() => {
        statsNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const h3Element = num.previousElementSibling;
            const type = h3Element ? h3Element.textContent : '';
            
            let suffix = '';
            if (type.includes('Projects') || type.includes('Happy Clients') || type.includes('Years')) {
                suffix = '+';
            } else if (type.includes('Satisfaction')) {
                suffix = '%';
            }
            
            animateCounter(num, target, statDuration, suffix);
        });
    }, 300);
}