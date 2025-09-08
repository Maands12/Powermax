// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const batteryLevel = document.getElementById('battery-level');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const countdownElements = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};
const ports = document.querySelectorAll('.port');
const featureCards = document.querySelectorAll('.feature-card');

// State
let currentTestimonial = 0;
let countdownTime = {
    hours: 12,
    minutes: 34,
    seconds: 56
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeBatteryAnimation();
    initializeTestimonialCarousel();
    initializeCountdown();
    initializeInteractions();
    initializeSmoothScrolling();
    initializeScrollAnimations();
});

// Navigation
function initializeNavigation() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Battery Animation
function initializeBatteryAnimation() {
    let batteryPercent = 0;
    const animateBattery = () => {
        batteryPercent = (batteryPercent + 1) % 101;
        batteryLevel.style.width = batteryPercent + '%';
        
        // Change color based on level
        if (batteryPercent < 20) {
            batteryLevel.style.background = 'linear-gradient(90deg, #f44336, #ff5722)';
        } else if (batteryPercent < 50) {
            batteryLevel.style.background = 'linear-gradient(90deg, #ff9800, #ffc107)';
        } else {
            batteryLevel.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
        }
    };

    // Start battery animation
    setInterval(animateBattery, 100);
}

// Testimonial Carousel
function initializeTestimonialCarousel() {
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentTestimonial = index;
    }

    // Next button
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(prevIndex);
    });

    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Auto-rotate testimonials
    setInterval(() => {
        const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }, 5000);
}

// Countdown Timer
function initializeCountdown() {
    function updateCountdown() {
        // Decrease seconds
        countdownTime.seconds--;
        
        if (countdownTime.seconds < 0) {
            countdownTime.seconds = 59;
            countdownTime.minutes--;
        }
        
        if (countdownTime.minutes < 0) {
            countdownTime.minutes = 59;
            countdownTime.hours--;
        }
        
        if (countdownTime.hours < 0) {
            // Reset countdown
            countdownTime = { hours: 12, minutes: 34, seconds: 56 };
        }
        
        // Update display
        countdownElements.hours.textContent = countdownTime.hours.toString().padStart(2, '0');
        countdownElements.minutes.textContent = countdownTime.minutes.toString().padStart(2, '0');
        countdownElements.seconds.textContent = countdownTime.seconds.toString().padStart(2, '0');
    }
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// Interactive Elements
function initializeInteractions() {
    // Button clicks
    const buyButtons = document.querySelectorAll('#buy-now, #final-cta');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
            // Show purchase modal (simulated)
            showPurchaseModal();
        });
    });
    
    // Learn more button
    document.getElementById('learn-more').addEventListener('click', () => {
        document.getElementById('features').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Port hover effects
    ports.forEach(port => {
        port.addEventListener('mouseenter', () => {
            // Add glow effect
            port.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.8)';
        });
        
        port.addEventListener('mouseleave', () => {
            port.style.boxShadow = 'none';
        });
    });
    
    // Feature card interactions
    featureCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Add ripple effect
            createRipple(card, event);
            
            // Show feature details
            showFeatureDetail(card.dataset.feature);
        });
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
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
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .spec-item, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility Functions
function createRipple(element, event) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (event.clientX - rect.left - radius) + 'px';
    circle.style.top = (event.clientY - rect.top - radius) + 'px';
    circle.classList.add('ripple');
    
    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            background-color: rgba(255, 255, 255, 0.7);
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('#ripple-style')) {
        rippleStyle.id = 'ripple-style';
        document.head.appendChild(rippleStyle);
    }
    
    const ripple = element.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    element.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}

function showPurchaseModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        ">
            <div style="
                background: white;
                padding: 3rem;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                animation: modalSlideIn 0.3s ease;
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                <h2 style="color: #2d3748; margin-bottom: 1rem;">Obrigado pelo interesse!</h2>
                <p style="color: #718096; margin-bottom: 2rem;">
                    Este é um site de demonstração. Em uma implementação real, 
                    você seria redirecionado para o checkout.
                </p>
                <button onclick="this.closest('div').remove()" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                ">Fechar</button>
            </div>
        </div>
    `;
    
    // Add modal animation
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    if (!document.querySelector('#modal-style')) {
        modalStyle.id = 'modal-style';
        document.head.appendChild(modalStyle);
    }
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function showFeatureDetail(feature) {
    const features = {
        capacity: {
            title: 'Capacidade de 20.000mAh',
            description: 'Com esta capacidade gigante, você pode carregar seu smartphone até 7 vezes, tablet 2-3 vezes, ou usar como fonte de energia para diversos dispositivos por dias.',
            icon: '⚡'
        },
        speed: {
            title: 'Carregamento Ultra-Rápido',
            description: 'Tecnologia Quick Charge 3.0 e USB-C Power Delivery permitem carregar seus dispositivos até 4x mais rápido que carregadores convencionais.',
            icon: '🚀'
        },
        ports: {
            title: 'Múltiplas Saídas USB',
            description: 'Com 2 portas USB-A e 1 USB-C, você pode carregar até 3 dispositivos simultaneamente, otimizando seu tempo e produtividade.',
            icon: '🔌'
        },
        display: {
            title: 'Display Digital Inteligente',
            description: 'Tela LED que mostra a porcentagem exata da bateria restante, eliminando adivinhações sobre quando recarregar.',
            icon: '📱'
        },
        safety: {
            title: 'Proteção Avançada',
            description: '11 sistemas de proteção incluindo sobrecarga, sobrecorrente, superaquecimento e curto-circuito para máxima segurança.',
            icon: '🛡️'
        },
        design: {
            title: 'Design Premium',
            description: 'Acabamento em liga de alumínio, design ultra-compacto e ergonômico que cabe perfeitamente na palma da mão.',
            icon: '✨'
        }
    };
    
    const featureData = features[feature];
    if (!featureData) return;
    
    // Create feature detail modal
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        ">
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 3rem;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                animation: modalSlideIn 0.3s ease;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${featureData.icon}</div>
                <h2 style="margin-bottom: 1rem; font-size: 1.8rem;">${featureData.title}</h2>
                <p style="opacity: 0.9; line-height: 1.6; margin-bottom: 2rem; font-size: 1.1rem;">
                    ${featureData.description}
                </p>
                <button onclick="this.closest('div').remove()" style="
                    background: #ff6b6b;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                ">Entendi</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Performance optimization
window.addEventListener('scroll', throttle(() => {
    // Add scroll-based animations or effects here
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.powerbank-3d');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16)); // ~60fps

function throttle(func, wait) {
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