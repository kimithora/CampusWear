/* ============================================
   CAMPUSWEAR - NAVIGATION JS
   Handle Navigation & Routing
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initActiveNav();
    updateAuthNav();
    initDropdownMenus(); // Add this for customer pages
});

// ... existing code ...

// Initialize dropdown menus for customer pages
function initDropdownMenus() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = userDropdown.style.display === 'block';
            userDropdown.style.display = isVisible ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.style.display = 'none';
            }
        });
        
        // Hover effect for dropdown items
        const dropdownItems = userDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = 'var(--gray-50)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarNav = document.getElementById('navbarNav');
    
    if (navbarToggle && navbarNav) {
        navbarToggle.addEventListener('click', () => {
            navbarNav.classList.toggle('active');
            
            // Animate hamburger
            const spans = navbarToggle.querySelectorAll('span');
            if (navbarNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarToggle.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarNav.classList.remove('active');
                const spans = navbarToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Set Active Navigation
function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update Navigation based on Auth Status
function updateAuthNav() {
    const currentUser = CampusWear.Session.getCurrentUser();
    const navbarActions = document.querySelector('.navbar-actions');
    
    if (navbarActions && currentUser) {
        // Check if we're in customer or admin pages
        const isCustomerPage = window.location.pathname.includes('/customer/');
        const isAdminPage = window.location.pathname.includes('/admin/');
        
        // Only update navbar if we're not in customer/admin pages (to avoid overriding static navbar)
        if (!isCustomerPage && !isAdminPage) {
            // Replace login/register with user menu for index/other pages
            navbarActions.innerHTML = `
                <a href="${currentUser.role === 'admin' ? 'admin/dashboard.html' : 'customer/dashboard.html'}" class="nav-link">
                    Dashboard
                </a>
                <div class="user-menu" style="position: relative;">
                    <button class="btn btn-ghost" id="userMenuBtn" style="display: flex; align-items: center; gap: var(--space-2);">
                        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, var(--primary-500), var(--secondary-500)); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: var(--text-sm);">
                            ${currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <span style="font-weight: 600;">${currentUser.name.split(' ')[0]}</span>
                        <span>▼</span>
                    </button>
                    <div class="dropdown-menu" id="userDropdown" style="display: none; position: absolute; right: 0; top: 100%; margin-top: var(--space-2); background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); min-width: 200px; padding: var(--space-2); z-index: 100;">
                        <a href="${currentUser.role === 'admin' ? 'admin/profile.html' : 'customer/profile.html'}" class="dropdown-item" style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); color: var(--gray-700); border-radius: var(--radius-md); transition: all var(--transition-fast);">
                            <span>👤</span> Profil
                        </a>
                        <a href="${currentUser.role === 'admin' ? 'admin/dashboard.html' : 'customer/dashboard.html'}" class="dropdown-item" style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); color: var(--gray-700); border-radius: var(--radius-md); transition: all var(--transition-fast);">
                            <span>📊</span> Dashboard
                        </a>
                        <hr style="border: none; border-top: 1px solid var(--gray-200); margin: var(--space-2) 0;">
                        <button onclick="logout()" class="dropdown-item" style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); color: var(--error); border-radius: var(--radius-md); transition: all var(--transition-fast); width: 100%; text-align: left; background: none; border: none; cursor: pointer;">
                            <span>🚪</span> Keluar
                        </button>
                    </div>
                </div>
            `;
            
            // Toggle dropdown
            const userMenuBtn = document.getElementById('userMenuBtn');
            const userDropdown = document.getElementById('userDropdown');
            
            if (userMenuBtn && userDropdown) {
                userMenuBtn.addEventListener('click', () => {
                    userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                        userDropdown.style.display = 'none';
                    }
                });
            }
        }
    }
}

// Smooth scroll for anchor links
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