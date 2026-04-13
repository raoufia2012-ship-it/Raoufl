// ──── Scroll Progress Bar ────
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// ──── Navbar Scroll Effect ────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ──── Fade-in on Scroll ────
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ──── Smooth Scroll for Anchor Links ────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ──── Language Switching ────
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        translatePage(lang);
    });
});

// ──── Phone Mockup Interaction ────
const mockPlay = document.querySelector('.mock-play');
if (mockPlay) {
    mockPlay.addEventListener('click', () => {
        mockPlay.style.transform = 'scale(0.9)';
        setTimeout(() => {
            mockPlay.style.transform = 'scale(1.1)';
            setTimeout(() => {
                mockPlay.style.transform = 'scale(1)';
            }, 100);
        }, 100);
    });
}

// ──── Animated Counter ────
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ──── Trigger counters when in view ────
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const impactNumbers = entry.target.querySelectorAll('.impact-number');
            impactNumbers.forEach(num => {
                const text = num.textContent;
                if (text.includes('K')) {
                    const value = parseFloat(text.replace('K', '')) * 1000;
                    animateCounter(num, value);
                    setTimeout(() => {
                        num.textContent = text; // Restore original format
                    }, 2000);
                } else if (text.includes('M')) {
                    const value = parseFloat(text.replace('M', '')) * 1000000;
                    animateCounter(num, value);
                    setTimeout(() => {
                        num.textContent = text;
                    }, 2000);
                } else if (text.includes('%')) {
                    const value = parseInt(text.replace('%', ''));
                    animateCounter(num, value);
                    setTimeout(() => {
                        num.textContent = text;
                    }, 2000);
                } else if (text.includes('+')) {
                    const value = parseInt(text.replace('+', '').replace(',', ''));
                    animateCounter(num, value);
                    setTimeout(() => {
                        num.textContent = text;
                    }, 2000);
                }
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const impactSection = document.querySelector('.impact-section');
if (impactSection) {
    impactObserver.observe(impactSection);
}

// ──── Custom Cursor (Desktop Only) ────
if (window.innerWidth > 1024) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = (outlineX - 20) + 'px';
        cursorOutline.style.top = (outlineY - 20) + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Cursor hover interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .testimonial-card, .problem-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// ──── Parallax Effect for Hero Cards ────
document.addEventListener('mousemove', (e) => {
    const heroCards = document.querySelectorAll('.hero-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    heroCards.forEach((card, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 10;
        const y = (mouseY - 0.5) * speed * 10;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ──── Random float animation delays for cards ────
document.querySelectorAll('.hero-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
});

// ──── Add sparkle effect to impact cards ────
document.querySelectorAll('.impact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle 0.6s ease-out forwards;
        `;
        card.style.position = 'relative';
        card.appendChild(sparkle);
        
        const rect = card.getBoundingClientRect();
        sparkle.style.left = Math.random() * rect.width + 'px';
        sparkle.style.top = Math.random() * rect.height + 'px';
        
        setTimeout(() => sparkle.remove(), 600);
    });
});

// ──── Add CSS for sparkle animation ────
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @media (min-width: 1024px) {
        .cursor-dot {
            width: 8px;
            height: 8px;
            background: var(--accent);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease;
        }

        .cursor-outline {
            width: 40px;
            height: 40px;
            border: 2px solid var(--accent);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.15s ease;
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// ──── Easter Egg: Konami Code ────
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Rainbow effect on the page
    document.body.style.animation = 'rainbow 3s infinite';
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 You found the secret! NextSap is the future! 🚀';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: bounce 0.6s ease;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        document.body.style.animation = '';
        rainbowStyle.remove();
    }, 3000);
}

const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
`;
document.head.appendChild(bounceStyle);

// ──── Log build info ────
console.log('%c🚀 NextSap Portfolio', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with passion by Raoufl', 'color: #6b6b6b; font-size: 14px;');
console.log('%cTech Stack: HTML, CSS, JavaScript', 'color: #16a34a; font-size: 12px;');
console.log('%cVersion: 2.0 - Multilingual Edition', 'color: #ea580c; font-size: 12px;');