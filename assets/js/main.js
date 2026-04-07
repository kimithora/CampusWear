/* ============================================
   CAMPUSWEAR - MAIN JS
   JavaScript Global & Utilities
   ============================================ */

// Utility Functions
const Utils = {
    // Format currency to Rupiah
    formatRupiah: (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    },

    // Format date to Indonesian format
    formatDate: (date) => {
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Generate unique ID
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Validate email
    isValidEmail: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Show alert/notification
    showAlert: (message, type = 'info', duration = 3000) => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        alertDiv.innerHTML = `
            <span class="alert-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <div class="alert-content">
                <div class="alert-description">${message}</div>
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }, duration);
    },

    // Get query parameter
    getQueryParam: (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    // Capitalize first letter
    capitalize: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};

// LocalStorage Helpers
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },

    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },

    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing localStorage:', e);
            return false;
        }
    }
};

// Session Management
const Session = {
    KEY: 'campuswear_session',

    create: (userData) => {
        const session = {
            user: userData,
            loginAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        };
        Storage.set(Session.KEY, session);
        return session;
    },

    get: () => {
        const session = Storage.get(Session.KEY);
        if (!session) return null;
        
        // Check if expired
        if (new Date(session.expiresAt) < new Date()) {
            Session.destroy();
            return null;
        }
        
        return session;
    },

    destroy: () => {
        Storage.remove(Session.KEY);
    },

    isLoggedIn: () => {
        return Session.get() !== null;
    },

    getCurrentUser: () => {
        const session = Session.get();
        return session ? session.user : null;
    },

    updateUser: (userData) => {
        const session = Session.get();
        if (session) {
            session.user = { ...session.user, ...userData };
            Storage.set(Session.KEY, session);
        }
    }
};

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', Utils.debounce(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 100));
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
    `;
    document.head.appendChild(style);
});

// Export for use in other modules
window.CampusWear = {
    Utils,
    Storage,
    Session
};