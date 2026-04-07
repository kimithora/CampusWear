/* ============================================
   CAMPUSWEAR - MOCK DATA JS
   Data Dummy untuk Prototype
   ============================================ */

const MockData = {
    // Users
    users: [
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
    ],

    // Products
    products: [
        {
            id: 'prd_001',
            name: 'Kemeja Flannel Uniqlo',
            description: 'Kemeja flannel branded Uniqlo, kondisi 95% masih bagus, warna biru navy kotak-kotak',
            category: 'kemeja',
            size: 'M',
            color: 'navy',
            colorHex: '#1e3a8a',
            condition: 'Sangat Baik',
            price: 150000,
            originalPrice: 450000,
            images: ['product1.jpg'],
            sellerId: 'usr_001',
            status: 'available',
            aiTags: ['casual', 'formal', 'winter', 'blue-tone'],
            createdAt: '2026-03-15'
        },
        {
            id: 'prd_002',
            name: 'Hoodie Oversize H&M',
            description: 'Hoodie oversize warna cream, bahan tebal dan nyaman, cocok untuk cuaca dingin',
            category: 'hoodie',
            size: 'L',
            color: 'cream',
            colorHex: '#fef3c7',
            condition: 'Baik',
            price: 120000,
            originalPrice: 350000,
            images: ['product2.jpg'],
            sellerId: 'usr_003',
            status: 'available',
            aiTags: ['casual', 'streetwear', 'warm-tone', 'oversize'],
            createdAt: '2026-03-20'
        },
        {
            id: 'prd_003',
            name: 'Celana Chino Zara',
            description: 'Celana chino slim fit warna khaki, kondisi like new, jarang dipakai',
            category: 'celana',
            size: '32',
            color: 'khaki',
            colorHex: '#d4a574',
            condition: 'Like New',
            price: 180000,
            originalPrice: 550000,
            images: ['product3.jpg'],
            sellerId: 'usr_001',
            status: 'available',
            aiTags: ['formal', 'casual', 'earth-tone', 'slim-fit'],
            createdAt: '2026-03-25'
        },
        {
            id: 'prd_004',
            name: 'Jaket Denim Levi\'s',
            description: 'Jaket denim classic Levi\'s, warna blue wash, timeless piece',
            category: 'jaket',
            size: 'L',
            color: 'blue',
            colorHex: '#3b82f6',
            condition: 'Baik',
            price: 250000,
            originalPrice: 1200000,
            images: ['product4.jpg'],
            sellerId: 'usr_003',
            status: 'available',
            aiTags: ['vintage', 'casual', 'blue-tone', 'classic'],
            createdAt: '2026-03-28'
        },
        {
            id: 'prd_005',
            name: 'Kaos Polos Cotton On',
            description: 'Kaos polos premium cotton, warna sage green, bahan adem',
            category: 'kaos',
            size: 'M',
            color: 'green',
            colorHex: '#10b981',
            condition: 'Sangat Baik',
            price: 75000,
            originalPrice: 200000,
            images: ['product5.jpg'],
            sellerId: 'usr_001',
            status: 'available',
            aiTags: ['casual', 'minimalist', 'earth-tone', 'basic'],
            createdAt: '2026-04-01'
        }
    ],

    // Consignments
    consignments: [
        {
            id: 'csg_001',
            sellerId: 'usr_001',
            items: [
                { name: 'Kemeja Flannel', quantity: 2 },
                { name: 'Celana Chino', quantity: 1 }
            ],
            status: 'processing', // pending, processing, completed, rejected
            submittedAt: '2026-03-10',
            processedAt: '2026-03-12',
            notes: 'Semua item dalam kondisi baik, siap diproses'
        },
        {
            id: 'csg_002',
            sellerId: 'usr_003',
            items: [
                { name: 'Hoodie Oversize', quantity: 1 },
                { name: 'Jaket Denim', quantity: 1 }
            ],
            status: 'completed',
            submittedAt: '2026-03-15',
            processedAt: '2026-03-18',
            completedAt: '2026-03-20',
            notes: 'Proses QC dan laundry selesai, foto produk sudah diupload'
        }
    ],

    // Orders
    orders: [
        {
            id: 'ord_001',
            buyerId: 'usr_003',
            items: [
                { productId: 'prd_001', quantity: 1, price: 150000 }
            ],
            total: 150000,
            shipping: 20000,
            grandTotal: 170000,
            status: 'completed',
            shippingAddress: {
                name: 'Ani Wijaya',
                phone: '081234567892',
                address: 'Jl. Ganesha No. 10, Bandung',
                postalCode: '40132'
            },
            createdAt: '2026-03-25',
            paidAt: '2026-03-25',
            shippedAt: '2026-03-26',
            completedAt: '2026-03-28'
        }
    ],

    // AI Color Analysis Results (for premium users)
    aiAnalyses: [
        {
            id: 'ai_001',
            userId: 'usr_001',
            skinTone: 'Warm',
            undertone: 'Golden',
            recommendedColors: [
                { name: 'Terracotta', hex: '#d4a574' },
                { name: 'Olive Green', hex: '#6b8e23' },
                { name: 'Cream', hex: '#fef3c7' },
                { name: 'Burnt Orange', hex: '#cc5500' }
            ],
            avoidColors: [
                { name: 'Cool Pink', hex: '#ff69b4' },
                { name: 'Silver', hex: '#c0c0c0' }
            ],
            styleRecommendations: ['Casual', 'Vintage', 'Earth Tone'],
            analyzedAt: '2026-03-01'
        }
    ],

    // Settlements
    settlements: [
        {
            id: 'stl_001',
            sellerId: 'usr_001',
            orderId: 'ord_001',
            productId: 'prd_001',
            salePrice: 150000,
            platformFee: 15000, // 10%
            sellerEarnings: 135000,
            status: 'paid',
            createdAt: '2026-03-28',
            paidAt: '2026-03-30'
        }
    ]
};

// Initialize mock data in localStorage if not exists
function initMockData() {
    const existingUsers = CampusWear.Storage.get('campuswear_users', []);
    
    // Only initialize if no data exists
    if (existingUsers.length === 0) {
        CampusWear.Storage.set('campuswear_users', MockData.users);
        CampusWear.Storage.set('campuswear_products', MockData.products);
        CampusWear.Storage.set('campuswear_consignments', MockData.consignments);
        CampusWear.Storage.set('campuswear_orders', MockData.orders);
        CampusWear.Storage.set('campuswear_ai_analyses', MockData.aiAnalyses);
        CampusWear.Storage.set('campuswear_settlements', MockData.settlements);
        
        console.log('Mock data initialized successfully');
    }
}

// Run initialization
if (typeof CampusWear !== 'undefined') {
    initMockData();
}

// Export for external use
window.MockData = {
    initMockData: initMockData,
    users: MockData.users,
    products: MockData.products
};

// Export for use in other scripts
window.MockData = MockData;