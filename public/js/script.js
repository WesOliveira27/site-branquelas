// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll to Contact
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            eventType: document.getElementById('eventType').value,
            eventDate: document.getElementById('eventDate').value,
            message: document.getElementById('message').value.trim()
        };

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // Submit form
        await submitForm(formData);
    });
}

// Clear error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });
    document.getElementById('formStatus').textContent = '';
    document.getElementById('formStatus').className = 'form-status';
}

// Validate form
function validateForm(data) {
    let isValid = true;
    const errors = {};

    // Name validation
    if (!data.name) {
        errors.name = 'Nome é obrigatório';
        isValid = false;
    } else if (data.name.length < 3) {
        errors.name = 'Nome deve ter pelo menos 3 caracteres';
        isValid = false;
    } else if (data.name.length > 100) {
        errors.name = 'Nome não pode ter mais de 100 caracteres';
        isValid = false;
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(data.name)) {
        errors.name = 'Nome contém caracteres inválidos';
        isValid = false;
    }

    // Email validation
    if (!data.email) {
        errors.email = 'Email é obrigatório';
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        errors.email = 'Email inválido';
        isValid = false;
    }

    // Event type validation
    if (!data.eventType) {
        errors.eventType = 'Selecione um tipo de evento';
        isValid = false;
    }

    // Message validation
    if (!data.message) {
        errors.message = 'Mensagem é obrigatória';
        isValid = false;
    } else if (data.message.length < 10) {
        errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
        isValid = false;
    } else if (data.message.length > 1000) {
        errors.message = 'Mensagem não pode ter mais de 1000 caracteres';
        isValid = false;
    }

    // Phone validation (if provided)
    if (data.phone && !/^[0-9\s\-\(\)\+]*$/.test(data.phone)) {
        errors.phone = 'Telefone inválido';
        isValid = false;
    }

    // Event date validation (optional, but validate if provided)
    if (data.eventDate) {
        const eventDate = new Date(data.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(eventDate.getTime())) {
            errors.eventDate = 'Data inválida';
            isValid = false;
        } else if (eventDate < today) {
            errors.eventDate = 'Data deve ser no futuro';
            isValid = false;
        }
    }

    // Display errors
    for (const [field, message] of Object.entries(errors)) {
        const errorElement = document.getElementById(`${field}Error`);
        const inputElement = document.getElementById(field);
        if (errorElement) {
            errorElement.textContent = message;
        }
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }

    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 100;
}

// Submit form
async function submitForm(data) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('formStatus');

    try {
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        contactForm.classList.add('loading');

        // Send to server
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            // Success
            formStatus.textContent = '✅ Mensagem enviada com sucesso! Entraremos em contato em breve.';
            formStatus.className = 'form-status success';
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        } else {
            throw new Error(result.message || 'Erro ao enviar mensagem');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        formStatus.textContent = '❌ Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.';
        formStatus.className = 'form-status error';
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Mensagem';
        contactForm.classList.remove('loading');
    }
}

// Real-time input validation with centralized rules
const validationRules = {
    name: {
        element: document.getElementById('name'),
        errorElement: document.getElementById('nameError'),
        validate: (value) => {
            if (!value) return null;
            if (value.length < 3) return 'Mínimo 3 caracteres';
            if (value.length > 100) return 'Máximo 100 caracteres';
            if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) return 'Caracteres inválidos';
            return null;
        }
    },
    email: {
        element: document.getElementById('email'),
        errorElement: document.getElementById('emailError'),
        validate: (value) => {
            if (!value) return null;
            if (!isValidEmail(value)) return 'Email inválido';
            return null;
        }
    },
    message: {
        element: document.getElementById('message'),
        errorElement: document.getElementById('messageError'),
        validate: (value) => {
            if (!value) return null;
            if (value.length < 10) return 'Mínimo 10 caracteres';
            if (value.length > 1000) return 'Máximo 1000 caracteres';
            return null;
        }
    },
    eventDate: {
        element: document.getElementById('eventDate'),
        errorElement: document.getElementById('eventDateError'),
        validate: (value) => {
            if (!value) return null;
            const date = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (isNaN(date.getTime())) return 'Data inválida';
            if (date < today) return 'Data deve ser no futuro';
            return null;
        }
    }
};

// Attach real-time validation listeners
Object.entries(validationRules).forEach(([fieldName, rule]) => {
    if (rule.element) {
        rule.element.addEventListener('blur', function() {
            const errorMsg = rule.validate(this.value);
            if (errorMsg) {
                this.classList.add('error');
                rule.errorElement.textContent = errorMsg;
            } else {
                this.classList.remove('error');
                rule.errorElement.textContent = '';
            }
        });
    }
});

// Prevent form submission on Enter in text fields (except textarea)
contactForm?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (menuToggle && !menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance: Log page load time
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime, 'ms');
    }
});

// Service Worker registration (for offline support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
