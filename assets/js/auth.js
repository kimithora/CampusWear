/* ============================================
   CAMPUSWEAR - AUTH JS
   Handle Login & Register Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Force initialize mock data
    initializeUserData();

    // Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Check if already logged in
    checkAuthStatus();
});

// Initialize user data
function initializeUserData() {
    const existingUsers = CampusWear.Storage.get('campuswear_users', []);
    
    if (existingUsers.length === 0) {
        // Initialize with mock data
        const mockUsers = [
            {
                id: 'usr_001',
                name: 'Budi Santoso',
                email: 'budi@student.ui.ac.id',
                password: 'password123',
                phone: '081234567890',
                campus: 'Universitas Indonesia',
                role: 'customer',
                avatar: null,
                isPremium: true,
                premiumExpiry: '2027-04-04',
                createdAt: '2026-01-15'
            },
            {
                id: 'usr_002',
                name: 'Admin CampusWear',
                email: 'admin@campuswear.id',
                password: 'admin123',
                phone: '081234567891',
                campus: 'Headquarters',
                role: 'admin',
                avatar: null,
                isPremium: false,
                createdAt: '2025-12-01'
            },
            {
                id: 'usr_003',
                name: 'Ani Wijaya',
                email: 'ani@student.itb.ac.id',
                password: 'password123',
                phone: '081234567892',
                campus: 'Institut Teknologi Bandung',
                role: 'customer',
                avatar: null,
                isPremium: false,
                createdAt: '2026-02-20'
            }
        ];
        
        CampusWear.Storage.set('campuswear_users', mockUsers);
        console.log('User data initialized:', mockUsers);
    } else {
        console.log('User data already exists:', existingUsers);
    }
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember')?.checked;

    // Validate
    if (!email || !password) {
        CampusWear.Utils.showAlert('Email dan password wajib diisi', 'error');
        return;
    }

    // Get users from storage
    const users = CampusWear.Storage.get('campuswear_users', []);
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        // For demo: allow login with any email/password if no users exist
        if (users.length === 0) {
            // Create demo user
            const demoUser = {
                id: CampusWear.Utils.generateId(),
                email: email,
                name: 'Demo User',
                role: 'customer',
                campus: 'Universitas Indonesia',
                avatar: null,
                isPremium: false,
                createdAt: new Date().toISOString()
            };
            
            CampusWear.Session.create(demoUser);
            CampusWear.Utils.showAlert('Login berhasil! Selamat datang.', 'success');
            
            setTimeout(() => {
                window.location.href = 'customer/dashboard.html';
            }, 1000);
            return;
        }
        
        CampusWear.Utils.showAlert('Email atau password salah', 'error');
        return;
    }

    // Create session
    CampusWear.Session.create(user);
    
    // Show success message
    CampusWear.Utils.showAlert(`Selamat datang kembali, ${user.name}!`, 'success');
    
    // Redirect based on role
    setTimeout(() => {
        if (user.role === 'admin') {
            window.location.href = 'admin/dashboard.html';
        } else {
            window.location.href = 'customer/dashboard.html';
        }
    }, 1000);
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const campus = document.getElementById('campus').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms')?.checked;

    // Validate
    if (!firstName || !lastName || !email || !phone || !campus || !password) {
        CampusWear.Utils.showAlert('Semua field wajib diisi', 'error');
        return;
    }

    if (!CampusWear.Utils.isValidEmail(email)) {
        CampusWear.Utils.showAlert('Format email tidak valid', 'error');
        return;
    }

    if (password.length < 8) {
        CampusWear.Utils.showAlert('Password minimal 8 karakter', 'error');
        return;
    }

    if (password !== confirmPassword) {
        CampusWear.Utils.showAlert('Password tidak cocok', 'error');
        return;
    }

    if (!terms) {
        CampusWear.Utils.showAlert('Anda harus menyetujui syarat dan ketentuan', 'error');
        return;
    }

    // Get existing users
    const users = CampusWear.Storage.get('campuswear_users', []);
    
    // Check if email exists
    if (users.find(u => u.email === email)) {
        CampusWear.Utils.showAlert('Email sudah terdaftar', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: CampusWear.Utils.generateId(),
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        campus: campus,
        password: password, // In real app, this should be hashed
        role: 'customer',
        avatar: null,
        isPremium: false,
        createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);
    CampusWear.Storage.set('campuswear_users', users);

    // Auto login
    CampusWear.Session.create(newUser);
    
    CampusWear.Utils.showAlert('Akun berhasil dibuat! Mengalihkan...', 'success');
    
    setTimeout(() => {
        window.location.href = 'customer/dashboard.html';
    }, 1500);
}

// Check Authentication Status
function checkAuthStatus() {
    const currentUser = CampusWear.Session.getCurrentUser();
    
    // If on auth pages and logged in, redirect to dashboard
    const authPages = ['login.html', 'register.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (authPages.includes(currentPage) && currentUser) {
        if (currentUser.role === 'admin') {
            window.location.href = 'admin/dashboard.html';
        } else {
            window.location.href = 'customer/dashboard.html';
        }
    }
}

// Logout function
function logout() {
    CampusWear.Session.destroy();
    CampusWear.Utils.showAlert('Berhasil logout', 'success');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 500);
}

// Export logout function
window.logout = logout;