/**
 * OPTIMA AI 2.0 INTERACTIVE BROCHURE
 * R Systems - Enterprise AI Transformation
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTabs();
    initCounterAnimation();
    initScrollAnimations();
    initSmoothScroll();
    initHoverEffects();
    initArchitectureDiagramInteractions();
    initNetworkAnimation();
});

// ============================================
// PARTICLE BACKGROUND
// ============================================

function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation delay and duration
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 20 + 15) + 's';

    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.1;

    container.appendChild(particle);
}

// ============================================
// TAB NAVIGATION
// ============================================

function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active content
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${targetId}-content`) {
                    content.classList.add('active');
                    // Trigger animations for newly visible content
                    triggerContentAnimations(content);
                }
            });

            // Smooth scroll to content
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function triggerContentAnimations(content) {
    const animatedElements = content.querySelectorAll('[data-aos]');
    animatedElements.forEach((el, index) => {
        el.classList.remove('aos-animate');
        setTimeout(() => {
            el.classList.add('aos-animate');
        }, index * 100);
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    requestAnimationFrame(updateCounter);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Also animate elements that are already in view
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('aos-animate');
            }
        });
    }, 100);
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// ============================================
// HOVER EFFECTS
// ============================================

function initHoverEffects() {
    // Card tilt effect
    const cards = document.querySelectorAll('.accelerator-card, .capability-card, .tool-card, .use-case-card, .playbook-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Glow effect on buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--glow-x', `${x}px`);
            button.style.setProperty('--glow-y', `${y}px`);
        });
    });
}

// ============================================
// ARCHITECTURE DIAGRAM INTERACTIONS
// ============================================

function initArchitectureDiagramInteractions() {
    // Platform components hover state
    const platformComponents = document.querySelectorAll('.platform-component');

    platformComponents.forEach(component => {
        component.addEventListener('mouseenter', () => {
            // Highlight connected components
            const componentNumber = component.querySelector('.component-number')?.textContent;
            highlightRelatedComponents(componentNumber);
        });

        component.addEventListener('mouseleave', () => {
            resetComponentHighlights();
        });
    });

    // Architecture layer interactions
    const archLayers = document.querySelectorAll('.arch-layer');

    archLayers.forEach(layer => {
        layer.addEventListener('click', () => {
            // Toggle expanded state
            layer.classList.toggle('expanded');

            // Scroll into view if expanded
            if (layer.classList.contains('expanded')) {
                layer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Control module interactions
    const controlModules = document.querySelectorAll('.control-module');

    controlModules.forEach(module => {
        module.addEventListener('click', () => {
            // Show tooltip or modal with more info
            showModuleDetails(module);
        });
    });
}

function highlightRelatedComponents(componentNumber) {
    // Define relationships between components
    const relationships = {
        '1': ['6', '7'], // Guardrails relates to Framework and Runtime
        '2': ['4', '9'], // LLMOps relates to Gateway and Monitoring
        '3': ['6', '8'], // Registry relates to Framework and Memory
        '4': ['2', '9'], // Gateway relates to LLMOps and Monitoring
        '5': ['6', '7'], // Builder relates to Framework and Runtime
        '6': ['1', '3', '5', '7', '8'], // Framework relates to many
        '7': ['1', '6', '8'], // Runtime relates to Guardrails, Framework, Memory
        '8': ['3', '6', '7'], // Memory relates to Registry, Framework, Runtime
        '9': ['2', '4', '10'], // Monitoring relates to LLMOps, Gateway, Data
        '10': ['8', '9'] // Data relates to Memory and Monitoring
    };

    const related = relationships[componentNumber] || [];

    document.querySelectorAll('.platform-component').forEach(comp => {
        const num = comp.querySelector('.component-number')?.textContent;
        if (related.includes(num)) {
            comp.classList.add('highlighted');
        } else if (num !== componentNumber) {
            comp.classList.add('dimmed');
        }
    });
}

function resetComponentHighlights() {
    document.querySelectorAll('.platform-component').forEach(comp => {
        comp.classList.remove('highlighted', 'dimmed');
    });
}

function showModuleDetails(module) {
    const title = module.querySelector('h5')?.textContent;
    const items = Array.from(module.querySelectorAll('li')).map(li => li.textContent);

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'module-tooltip';
    tooltip.innerHTML = `
        <h5>${title}</h5>
        <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
        <button class="tooltip-close">×</button>
    `;

    // Position tooltip
    const rect = module.getBoundingClientRect();
    tooltip.style.cssText = `
        position: fixed;
        top: ${rect.top + window.scrollY}px;
        left: ${rect.right + 20}px;
        background: rgba(10, 22, 40, 0.95);
        border: 1px solid var(--primary-blue);
        border-radius: 12px;
        padding: 20px;
        z-index: 1000;
        max-width: 300px;
        animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(tooltip);

    // Close button
    tooltip.querySelector('.tooltip-close').addEventListener('click', () => {
        tooltip.remove();
    });

    // Close on click outside
    setTimeout(() => {
        document.addEventListener('click', function closeTooltip(e) {
            if (!tooltip.contains(e.target) && !module.contains(e.target)) {
                tooltip.remove();
                document.removeEventListener('click', closeTooltip);
            }
        });
    }, 100);
}

// ============================================
// NETWORK ANIMATION
// ============================================

function initNetworkAnimation() {
    const networkNodes = document.querySelectorAll('.network-node:not(.central)');

    // Pulse animation on hover
    networkNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            node.style.animation = 'pulse 0.5s ease';

            // Highlight connection line
            const nodeClass = Array.from(node.classList).find(c => c.startsWith('node-'));
            if (nodeClass) {
                const lineIndex = parseInt(nodeClass.replace('node-', '')) - 1;
                const lines = document.querySelectorAll('.network-line');
                if (lines[lineIndex]) {
                    lines[lineIndex].style.strokeWidth = '3';
                    lines[lineIndex].style.opacity = '1';
                }
            }
        });

        node.addEventListener('mouseleave', () => {
            node.style.animation = '';

            // Reset lines
            document.querySelectorAll('.network-line').forEach(line => {
                line.style.strokeWidth = '1';
                line.style.opacity = '0.5';
            });
        });
    });

    // Continuous animation for graph nodes
    animateGraphNodes();
}

function animateGraphNodes() {
    const graphNodes = document.querySelectorAll('.graph-node:not(.central)');

    graphNodes.forEach((node, index) => {
        const delay = index * 500;
        const duration = 3000 + Math.random() * 2000;

        setInterval(() => {
            node.style.transform = 'scale(1.2)';
            setTimeout(() => {
                node.style.transform = 'scale(1)';
            }, 300);
        }, duration);
    });
}

// ============================================
// LIFECYCLE TIMELINE ANIMATION
// ============================================

function initLifecycleAnimation() {
    const steps = document.querySelectorAll('.lifecycle-step');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = entry.target;
                const stepNumber = step.dataset.step;

                // Animate step marker
                const marker = step.querySelector('.step-marker');
                marker.style.animation = 'bounceIn 0.5s ease forwards';
                marker.style.animationDelay = `${(stepNumber - 1) * 0.1}s`;

                observer.unobserve(step);
            }
        });
    }, { threshold: 0.3 });

    steps.forEach(step => observer.observe(step));
}

// ============================================
// SDLC PHASE INTERACTIONS
// ============================================

document.querySelectorAll('.sdlc-phase').forEach(phase => {
    phase.addEventListener('mouseenter', () => {
        // Highlight current phase
        phase.style.zIndex = '10';

        // Show connector animation
        const connector = phase.nextElementSibling;
        if (connector && connector.classList.contains('sdlc-connector')) {
            connector.style.background = 'linear-gradient(90deg, #00D4FF 0%, #0170B9 100%)';
            connector.style.height = '4px';
        }
    });

    phase.addEventListener('mouseleave', () => {
        phase.style.zIndex = '';

        const connector = phase.nextElementSibling;
        if (connector && connector.classList.contains('sdlc-connector')) {
            connector.style.background = '';
            connector.style.height = '';
        }
    });
});

// ============================================
// TEAM POD ANIMATION
// ============================================

function initTeamPodAnimation() {
    const podAgents = document.querySelectorAll('.pod-agent');

    podAgents.forEach((agent, index) => {
        // Staggered entrance animation
        agent.style.opacity = '0';
        agent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            agent.style.transition = 'all 0.5s ease';
            agent.style.opacity = '1';
            agent.style.transform = 'translateY(0)';
        }, 200 + index * 100);

        // Hover interaction
        agent.addEventListener('mouseenter', () => {
            // Expand agent card
            agent.style.padding = '1.5rem';

            // Show connection to human
            const human = document.querySelector('.pod-human');
            if (human) {
                human.style.transform = 'scale(1.05)';
            }
        });

        agent.addEventListener('mouseleave', () => {
            agent.style.padding = '';

            const human = document.querySelector('.pod-human');
            if (human) {
                human.style.transform = '';
            }
        });
    });
}

// Initialize team pod animation when SDLC tab is active
document.querySelector('[data-tab="sdlc"]')?.addEventListener('click', () => {
    setTimeout(initTeamPodAnimation, 300);
});

// ============================================
// CLOUD CARD ANIMATIONS
// ============================================

document.querySelectorAll('.cloud-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Animate features list
        const features = card.querySelectorAll('.cloud-features li');
        features.forEach((feature, index) => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-10px)';

            setTimeout(() => {
                feature.style.transition = 'all 0.3s ease';
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, index * 50);
        });
    });
});

// ============================================
// TRANSFORMATION VISUAL ANIMATION
// ============================================

function initTransformationAnimation() {
    const transformSection = document.querySelector('.transformation-visual');
    if (!transformSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate arrow
                const arrow = transformSection.querySelector('.transform-arrow');
                if (arrow) {
                    arrow.style.animation = 'slideRight 1s ease forwards';
                }

                // Highlight after items
                const afterItems = transformSection.querySelectorAll('.after .stage-item');
                afterItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('highlight');
                    }, 500 + index * 200);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(transformSection);
}

// Initialize transformation animation when SaaS tab is active
document.querySelector('[data-tab="saas"]')?.addEventListener('click', () => {
    setTimeout(initTransformationAnimation, 300);
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0170B9, #00D4FF);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

initScrollProgress();

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    const tabs = document.querySelectorAll('.nav-tab');
    const activeTab = document.querySelector('.nav-tab.active');
    const activeIndex = Array.from(tabs).indexOf(activeTab);

    if (e.key === 'ArrowRight' && activeIndex < tabs.length - 1) {
        tabs[activeIndex + 1].click();
    } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        tabs[activeIndex - 1].click();
    }
});

// ============================================
// PRELOADER
// ============================================

window.addEventListener('load', () => {
    // Remove preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 300);
    }

    // Trigger entrance animations
    document.querySelectorAll('.hero-content > *').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + index * 150);
    });
});

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    menuToggle.style.cssText = `
        display: none;
        flex-direction: column;
        gap: 4px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
    `;

    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.parentElement.insertBefore(menuToggle, nav);

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            menuToggle.classList.toggle('active');
        });
    }

    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: flex !important;
            }
            .mobile-menu-toggle span {
                width: 24px;
                height: 2px;
                background: white;
                transition: all 0.3s ease;
            }
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(4px, 4px);
            }
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(4px, -4px);
            }
            .main-nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(10, 22, 40, 0.98);
                flex-direction: column;
                padding: 20px;
                display: none;
            }
            .main-nav.mobile-open {
                display: flex;
            }
            .nav-tab {
                width: 100%;
                justify-content: center;
            }
            .nav-tab .tab-text {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
}

initMobileMenu();

// ============================================
// TOOLTIP SYSTEM
// ============================================

function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(10, 22, 40, 0.95);
        border: 1px solid var(--primary-blue);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
    `;

    element.style.position = 'relative';
    element.appendChild(tooltip);

    element.addEventListener('mouseenter', () => {
        const rect = element.getBoundingClientRect();
        tooltip.style.bottom = '100%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%) translateY(-8px)';
        tooltip.style.opacity = '1';
    });

    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
}

// Add tooltips to relevant elements
document.querySelectorAll('[data-tooltip]').forEach(el => {
    createTooltip(el, el.dataset.tooltip);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll/resize events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll event listeners
window.addEventListener('scroll', throttle(() => {
    // Header background on scroll
    const header = document.querySelector('.main-header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 22, 40, 0.98)';
        } else {
            header.style.background = 'rgba(10, 22, 40, 0.95)';
        }
    }
}, 100));

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log(`
%c╔═══════════════════════════════════════════════════════════╗
%c║                                                           ║
%c║   🚀 OPTIMA AI 2.0 - R SYSTEMS                           ║
%c║                                                           ║
%c║   Enterprise AI Transformation Platform                   ║
%c║   Powered by BCG's AI Framework                          ║
%c║                                                           ║
%c║   Building the future of intelligent automation          ║
%c║                                                           ║
%c╚═══════════════════════════════════════════════════════════╝
`,
    'color: #0170B9; font-weight: bold;',
    'color: #0170B9;',
    'color: #00D4FF; font-weight: bold;',
    'color: #0170B9;',
    'color: #64748B;',
    'color: #64748B;',
    'color: #0170B9;',
    'color: #64748B;',
    'color: #0170B9;',
    'color: #0170B9; font-weight: bold;'
);
