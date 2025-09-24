// Three.js Scene Variables
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Dynamic text array for XR/CS specializations
const dynamicTexts = [
    'XR Developer & Computer Scientist',
    'VR/AR Specialist',
    'Unity 3D Developer',
    'Mixed Reality Engineer',
    'Computer Graphics Expert',
    'Machine Learning Researcher',
    'Interactive Systems Designer',
    'Immersive Technology Creator'
];

// Initialize Three.js Scene
function init() {
    const canvas = document.getElementById('three-canvas');
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Particle system
    const particleCount = 1500; // More particles for more immersive feel
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Positions
        positions[i3] = (Math.random() - 0.5) * 2000;
        positions[i3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i3 + 2] = (Math.random() - 0.5) * 1000;

        // Colors - XR-themed gradient (cyan to purple to pink)
        const hue = (Math.random() * 0.4) + 0.45; // 0.45 to 0.85 range
        color.setHSL(hue, 0.8, 0.6);
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Event listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

// Mouse movement handler
function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

    // Update dynamic text based on mouse position
    const dynamicText = document.getElementById('dynamic-text');
    const textIndex = Math.floor((event.clientX / window.innerWidth) * dynamicTexts.length);
    dynamicText.textContent = dynamicTexts[textIndex] || dynamicTexts[0];
}

// Window resize handler
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Particle animation
    const time = Date.now() * 0.001;
    
    if (particles) {
        particles.rotation.x = time * 0.05;
        particles.rotation.y = time * 0.1;

        // Mouse interaction
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
        
        camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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

// Form submission handler
function initFormHandler() {
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('.submit-btn');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            button.style.background = 'linear-gradient(45deg, #4caf50, #81c784)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = 'linear-gradient(45deg, #64ffda, #bb86fc)';
                this.reset();
            }, 2000);
        }, 1500);
    });
}

// Project card hover effects
function initProjectCardEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
            nav.style.backdropFilter = 'blur(15px)';
        }
    });
}

// Skill card hover effects with enhanced animations
function initSkillCardEffects() {
    document.querySelectorAll('.skill-category').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stat cards animation
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });
}

// Education card parallax effect
function initEducationCardEffects() {
    document.querySelectorAll('.education-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

// Experience timeline animations
function initExperienceAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.experience-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Project card click handlers for demo links
function initProjectInteractions() {
    document.querySelectorAll('.project-card').forEach(card => {
        const playButton = card.querySelector('.play-button');
        const demoLink = card.querySelector('.project-link');
        
        if (playButton) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation();
                // Here you can add logic to open video demo
                console.log('Demo video clicked for:', card.querySelector('.project-title').textContent);
                
                // Add visual feedback
                this.style.transform = 'translate(-50%, -50%) scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 200);
            });
        }
    });
}

// Dynamic background particle density based on performance
function initPerformanceOptimization() {
    let fps = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    function checkPerformance() {
        const currentTime = performance.now();
        frameCount++;
        
        if (currentTime - lastTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
            
            // Adjust particle count based on FPS
            if (fps < 30 && particles) {
                const positions = particles.geometry.attributes.position;
                const newCount = Math.max(500, positions.count * 0.8);
                // Note: In a real scenario, you'd recreate the geometry with fewer particles
            }
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    checkPerformance();
}

// Initialize typing effect for hero subtitle
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = '(Terry)';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            subtitle.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeText, 150);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeText, 2000);
}

// Add scroll-triggered animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.stat-card, .skill-category, .project-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
        
        // Initially hide child elements for staggered animation
        const children = section.querySelectorAll('.stat-card, .skill-category, .project-card');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'all 0.6s ease';
        });
    });
}

// Enhanced mouse trail effect for particles
function initMouseTrailEffect() {
    let mouseTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Remove old trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        // Update particle behavior based on mouse trail
        if (particles && mouseTrail.length > 5) {
            const averageX = mouseTrail.reduce((sum, point) => sum + point.x, 0) / mouseTrail.length;
            const averageY = mouseTrail.reduce((sum, point) => sum + point.y, 0) / mouseTrail.length;
            
            // Subtle particle attraction to mouse trail
            const targetX = (averageX - window.innerWidth / 2) * 0.001;
            const targetY = -(averageY - window.innerHeight / 2) * 0.001;
            
            particles.rotation.x += targetY * 0.01;
            particles.rotation.y += targetX * 0.01;
        }
    });
}

// Add keyboard navigation support
function initKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'Tab':
                // Enhanced tab navigation
                if (e.shiftKey) {
                    currentIndex = Math.max(0, currentIndex - 1);
                } else {
                    currentIndex = Math.min(navLinks.length - 1, currentIndex + 1);
                }
                navLinks[currentIndex].focus();
                break;
                
            case 'Enter':
                if (document.activeElement.getAttribute('href')) {
                    document.activeElement.click();
                }
                break;
                
            case 'Escape':
                document.activeElement.blur();
                break;
        }
    });
}

// Add contact form validation
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        
        // Validation rules
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#ff6b6b';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearErrors(e) {
        const field = e.target;
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

// Add theme customization (for future enhancement)
function initThemeCustomization() {
    // Store user preferences
    const preferences = {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        highContrast: window.matchMedia('(prefers-contrast: high)').matches
    };
    
    if (preferences.reducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--animation-duration', '0s');
        document.querySelectorAll('.floating').forEach(el => {
            el.style.animation = 'none';
        });
    }
    
    if (preferences.highContrast) {
        // Enhance contrast for accessibility
        document.documentElement.style.setProperty('--text-opacity', '1');
        document.documentElement.style.setProperty('--border-opacity', '0.5');
    }
}

// Add mobile touch gestures
function initMobileGestures() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    });
    
    function handleGesture() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger section navigation
                console.log('Swipe up detected');
            } else {
                // Swipe down
                console.log('Swipe down detected');
            }
        }
    }
}

// Add loading state management
function initLoadingState() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinnerText = document.createElement('div');
    spinnerText.textContent = 'Loading XR Experience...';
    spinnerText.style.cssText = `
        color: #64ffda;
        font-size: 1.2rem;
        font-weight: 600;
    `;
    
    loader.appendChild(spinnerText);
    document.body.appendChild(loader);
    
    // Remove loader when everything is ready
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading state first
    initLoadingState();
    
    // Core functionality
    initSmoothScrolling();
    initFormHandler();
    initFormValidation();
    
    // Visual effects
    initProjectCardEffects();
    initSkillCardEffects();
    initEducationCardEffects();
    
    // Animations
    initScrollAnimations();
    initExperienceAnimations();
    
    // Interactions
    initProjectInteractions();
    initNavbarScrollEffect();
    initMouseTrailEffect();
    
    // Accessibility
    initKeyboardNavigation();
    initThemeCustomization();
    
    // Performance
    initPerformanceOptimization();
    
    // Mobile features
    if ('ontouchstart' in window) {
        initMobileGestures();
    }
    
    // Delayed effects
    setTimeout(initTypingEffect, 1000);
});

// Initialize Three.js scene when page loads
window.addEventListener('load', init);

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized resize handler
const debouncedResize = debounce(onWindowResize, 100);
window.addEventListener('resize', debouncedResize);

// Export functions for potential external use
window.PortfolioUtils = {
    updateDynamicText: (newTexts) => {
        dynamicTexts.splice(0, dynamicTexts.length, ...newTexts);
    },
    
    addProjectCard: (projectData) => {
        // Function to dynamically add project cards
        console.log('Adding project:', projectData);
    },
    
    toggleParticles: () => {
        if (particles) {
            particles.visible = !particles.visible;
        }
    },
    
    // Utility to update project links with actual URLs
    updateProjectLinks: (projectTitle, demoUrl, detailsUrl) => {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const titleElement = card.querySelector('.project-title');
            if (titleElement && titleElement.textContent.includes(projectTitle)) {
                const links = card.querySelectorAll('.project-link');
                if (links[0] && demoUrl) links[0].href = demoUrl;
                if (links[1] && detailsUrl) links[1].href = detailsUrl;
            }
        });
    }
};