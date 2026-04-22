/**
 * TECHHUB - IT WEBSITE
 * JavaScript functionality
 */

// ===== NAVBAR TRANSPARENCY & MOBILE MENU =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar transparency on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// ===== DROPDOWN MENU =====
const dropdownItems = document.querySelectorAll('.dropdown');

function isMobile() {
    return window.innerWidth <= 768;
}

dropdownItems.forEach(item => {
    const toggle = item.querySelector('.nav-link');
    
    toggle.addEventListener('click', (e) => {
        if (isMobile()) {
            e.preventDefault();
            const wasOpen = item.classList.contains('open');
            dropdownItems.forEach(d => d.classList.remove('open'));
            if (!wasOpen) {
                item.classList.add('open');
            }
        }
    });
});

document.addEventListener('click', (e) => {
    if (isMobile()) {
        dropdownItems.forEach(item => {
            if (!item.contains(e.target)) {
                item.classList.remove('open');
            }
        });
    }
});

// ===== HERO SLIDER =====
class HeroSlider {
    constructor() {
        this.sliderContainer = document.querySelector('.slider-container');
        this.items = document.querySelectorAll('.slider-item');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.currentIndex = 0;
        this.autoSlideInterval = null;

        this.init();
    }

    init() {
        this.createDots();
        this.updateSlider();
        this.attachEventListeners();
        this.startAutoSlide();
    }

    createDots() {
        this.items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = document.querySelectorAll('.dot');
    }

    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    updateSlider() {
        this.items.forEach((item, index) => {
            item.classList.remove('active');
        });
        this.items[this.currentIndex].classList.add('active');

        this.dots.forEach((dot, index) => {
            dot.classList.remove('active');
        });
        this.dots[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateSlider();
        this.resetAutoSlide();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateSlider();
        this.resetAutoSlide();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
        this.resetAutoSlide();
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// Initialize hero slider
const heroSlider = new HeroSlider();

// ===== STATS COUNTER ANIMATION =====
const statsNumbers = document.querySelectorAll('.stat-number');
const statDuration = 2000;

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
//===== STATS COUNTER OBSERVER =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statsNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const type = num.previousElementSibling?.textContent || '';
                
                let suffix = '';
                if (type.includes('Projects') || type.includes('Happy Clients') || type.includes('Years')) {
                    suffix = '+';
                } else if (type.includes('Satisfaction')) {
                    suffix = '%';
                }
                
                animateCounter(num, target, statDuration, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== GALLERY SLIDER =====
class GallerySlider {
    constructor() {
        this.gallerySlider = document.querySelector('.gallery-slider');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.prevBtn = document.querySelector('.gallery-prev');
        this.nextBtn = document.querySelector('.gallery-next');
        this.itemWidth = 270;

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.scroll(-this.itemWidth));
        this.nextBtn.addEventListener('click', () => this.scroll(this.itemWidth));
    }

    scroll(distance) {
        this.gallerySlider.scrollBy({
            left: distance,
            behavior: 'smooth'
        });
    }
}

const gallerySlider = new GallerySlider();

// Gallery items hover effect - slide on hover
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        const container = item.parentElement;
        const itemWidth = 270;
        container.scrollBy({
            left: itemWidth,
            behavior: 'smooth'
        });
    });
});

// ===== VIDEO MODAL =====
class VideoModal {
    constructor() {
        this.modal = document.getElementById('videoModal');
        this.playBtn = document.querySelector('.play-btn');
        this.closeBtn = document.querySelector('.close');
        this.videoFrame = document.getElementById('videoFrame');

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.playBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal() {
        const videoId = this.playBtn.getAttribute('data-video-id');
        this.videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.videoFrame.src = '';
        document.body.style.overflow = 'auto';
    }
}

const videoModal = new VideoModal();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .process-card, .why-card, .gallery-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== WHATSAPP LINK =====
const whatsappLink = document.querySelector('.whatsapp a');
if (whatsappLink) {
    const phoneNumber = '2348045678945';
    const message = 'Hello TechHub! I am interested in your services.';
    const encodedMessage = encodeURIComponent(message);
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// ===== CTA BUTTON FUNCTIONALITY =====
const ctaButton = document.querySelector('.cta .btn-primary');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact') || document.querySelector('.footer');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===== FORM VALIDATION (if needed) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

// ===== RESPONSIVE MENU CLOSE ON RESIZE =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
    }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== PERFORMANCE OPTIMIZATION: Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        const srcSet = img.getAttribute('src');
        if (srcSet && !srcSet.includes('placeholder')) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('src');
                        observer.unobserve(img);
                    }
                });
            });
            observer.observe(img);
        }
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%cWelcome to TechHub!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cModern IT Solutions for Your Business', 'font-size: 14px; color: #764ba2; font-weight: bold;');
