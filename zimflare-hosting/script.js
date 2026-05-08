/* ========================================
   ZIMFLARE HOSTING - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeMenuToggle();
    initializeBillingToggle();
    initializeFAQAccordion();
    initializeSmoothScroll();
});

/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */

function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

/* ========================================
   BILLING TOGGLE (Monthly / Annual)
   ======================================== */

function initializeBillingToggle() {
    const billingToggle = document.getElementById('billingToggle');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            const priceElements = document.querySelectorAll('.plan-card');

            priceElements.forEach(card => {
                const monthlyPrice = card.querySelector('.price-monthly');
                const annualPrice = card.querySelector('.price-annual');
                const periodSpan = card.querySelector('.price-period');

                if (isAnnual) {
                    monthlyPrice.style.display = 'none';
                    annualPrice.style.display = 'inline';
                    periodSpan.textContent = '/year';
                } else {
                    monthlyPrice.style.display = 'inline';
                    annualPrice.style.display = 'none';
                    periodSpan.textContent = '/month';
                }
            });
        });
    }
}

/* ========================================
   FAQ ACCORDION
   ======================================== */

function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

function initializeSmoothScroll() {
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

function scrollTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/* ========================================
   DOMAIN SEARCH FUNCTIONALITY
   ======================================== */

function searchDomain(extension = null) {
    const domainInput = document.getElementById('domainSearch');
    const domainExtension = document.getElementById('domainExtension');
    const searchResults = document.getElementById('searchResults');

    const domain = domainInput.value.trim();
    const ext = extension || domainExtension.value;

    if (!domain) {
        searchResults.innerHTML = '<span style="color: #ff6b35;">Please enter a domain name</span>';
        return;
    }

    // Simulate domain search (in production, this would call an API)
    searchResults.innerHTML = `
        <span style="color: rgba(255, 255, 255, 0.9);">
            ✓ <strong>${domain}${ext}</strong> is available! 
            <button class="btn btn-outline" style="margin-left: 1rem; padding: 8px 16px; font-size: 0.9rem;" onclick="selectDomain('${domain}${ext}')">
                Add to Cart
            </button>
        </span>
    `;
}

function selectDomain(domainName) {
    alert(`${domainName} has been added to your cart!\n\nProceeding to checkout...`);
    console.log('Domain selected:', domainName);
    // In production, this would redirect to checkout
}

/* ========================================
   PLAN SELECTION
   ======================================== */

function selectPlan(planName) {
    alert(`${planName} Plan selected!\n\nProceeding to checkout...\n\nIn a real implementation, this would redirect to the payment/signup page.`);
    console.log('Plan selected:', planName);
    // In production, this would redirect to the signup page with plan pre-selected
}

/* ========================================
   FORM VALIDATION HELPERS
   ======================================== */

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateDomainName(domain) {
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
    return domainRegex.test(domain);
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.trust-card, .plan-card, .why-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Run animations on page load
window.addEventListener('load', observeElements);

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#25d366' : '#ff6b35'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ========================================
   ANALYTICS TRACKING (Optional)
   ======================================== */

function trackButtonClick(buttonName) {
    console.log(`Button clicked: ${buttonName}`);
    // In production, send this to analytics service (Google Analytics, Mixpanel, etc.)
}

// Track plan selections
document.querySelectorAll('.plan-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const planName = this.closest('.plan-card').querySelector('h3').textContent;
        trackButtonClick(`Plan Selection: ${planName}`);
    });
});

// Track CTA buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        trackButtonClick(`CTA: ${this.textContent}`);
    });
});

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Format currency
function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

// Get query parameter from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Redirect to mobile app or site
if (isMobileDevice()) {
    console.log('Mobile device detected');
    // Optional: customize for mobile experience
}

/* ========================================
   PAGE LOAD PERFORMANCE
   ======================================== */

window.addEventListener('load', function() {
    console.log('Zimflare Hosting website loaded successfully');
    // Page fully loaded - hide loading spinner if present
});

/* ========================================
   ERROR HANDLING
   ======================================== */

window.addEventListener('error', function(event) {
    console.error('Error occurred:', event.error);
    // In production, send error to logging service
});

/* ========================================
   KEYBOARD ACCESSIBILITY
   ======================================== */

document.addEventListener('keydown', function(event) {
    // Close mobile menu on Escape
    if (event.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});
