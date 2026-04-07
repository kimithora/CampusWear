// AI Coloring JavaScript
// Fitur AI untuk analisis warna kulit dan rekomendasi pakaian

let stream = null;
let capturedImage = null;

// Start Camera
async function startCamera() {
    try {
        const constraints = {
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = document.getElementById('cameraVideo');
        video.srcObject = stream;

        document.getElementById('cameraArea').style.display = 'none';
        document.getElementById('cameraView').style.display = 'block';

    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.');
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    document.getElementById('cameraView').style.display = 'none';
    document.getElementById('cameraArea').style.display = 'block';
}

function capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    capturedImage = canvas.toDataURL('image/jpeg', 0.8);

    stopCamera();
    document.getElementById('previewImage').src = capturedImage;
    document.getElementById('previewArea').style.display = 'block';
}

function resetUpload() {
    capturedImage = null;
    document.getElementById('previewArea').style.display = 'none';
    document.getElementById('analysisResults').style.display = 'none';
    document.getElementById('cameraArea').style.display = 'block';
}


async function analyzePhoto() {
    if (!capturedImage) return;

    document.getElementById('previewArea').style.display = 'none';
    document.getElementById('loadingArea').style.display = 'block';

    try {
        await new Promise(resolve => setTimeout(resolve, 3000));

        const results = await mockAnalyzeImage(capturedImage);

        displayResults(results);

    } catch (error) {
        console.error('Analysis error:', error);
        alert('Terjadi kesalahan saat menganalisis gambar. Silakan coba lagi.');
    } finally {
        document.getElementById('loadingArea').style.display = 'none';
    }
}

// Mock Image Analysis (Replace with real API call to Google Vision API)
async function mockAnalyzeImage(imageData) {
    // REAL IMPLEMENTATION: Use Google Vision API
    // 1. Get API key from Google Cloud Console
    // 2. Enable Vision API
    // 3. Send POST request to https://vision.googleapis.com/v1/images:annotate
    /*
    const apiKey = 'YOUR_GOOGLE_VISION_API_KEY';
    const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requests: [{
                image: {
                    content: imageData.split(',')[1] // Remove data:image/jpeg;base64, prefix
                },
                features: [{
                    type: 'IMAGE_PROPERTIES',
                    maxResults: 10
                }, {
                    type: 'FACE_DETECTION',
                    maxResults: 5
                }]
            }]
        })
    });

    const data = await response.json();
    const colors = data.responses[0].imagePropertiesAnnotation.dominantColors.colors;
    // Analyze colors to determine skin tone, undertone, season
    */

    // For now, return mock data based on random analysis
    const skinTones = ['Warm', 'Cool', 'Neutral'];
    const undertones = ['Golden', 'Ash', 'Olive'];
    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

    const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
    const undertone = undertones[Math.floor(Math.random() * undertones.length)];
    const season = seasons[Math.floor(Math.random() * seasons.length)];

    // Generate color palette based on season
    const palettes = {
        'Spring': ['#FFB6C1', '#FFA07A', '#98FB98', '#F0E68C', '#DDA0DD'],
        'Summer': ['#87CEEB', '#98FB98', '#F0E68C', '#DDA0DD', '#FFB6C1'],
        'Autumn': ['#8B4513', '#FF6347', '#FFD700', '#DC143C', '#8A2BE2'],
        'Winter': ['#000080', '#FF0000', '#FFD700', '#000000', '#FFFFFF']
    };

    const recommendedColors = palettes[season] || palettes['Spring'];

    return {
        skinTone,
        undertone,
        season,
        colorPalette: recommendedColors,
        recommendedColors,
        avoidColors: ['#808080', '#000000', '#FFFFFF'] // Mock avoid colors
    };
}

// Display Analysis Results
function displayResults(results) {
    // Update skin analysis
    document.getElementById('skinToneResult').textContent = results.skinTone;
    document.getElementById('undertoneResult').textContent = results.undertone;
    document.getElementById('seasonResult').textContent = results.season;

    // Update color palette
    const paletteContainer = document.getElementById('colorPalette');
    paletteContainer.innerHTML = '';
    results.colorPalette.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.title = color;
        paletteContainer.appendChild(swatch);
    });

    // Update recommended colors
    const recommendedContainer = document.getElementById('recommendedColors');
    recommendedContainer.innerHTML = '';
    results.recommendedColors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.innerHTML = `
            <div class="color-swatch-large" style="background-color: ${color};"></div>
            <div class="color-name">${color}</div>
        `;
        recommendedContainer.appendChild(colorCard);
    });

    // Update avoid colors
    const avoidContainer = document.getElementById('avoidColors');
    avoidContainer.innerHTML = '';
    results.avoidColors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.innerHTML = `
            <div class="color-swatch-large" style="background-color: ${color};"></div>
            <div class="color-name">${color}</div>
        `;
        avoidContainer.appendChild(colorCard);
    });

    // Update style recommendations
    const styleContainer = document.getElementById('styleRecommendations');
    styleContainer.innerHTML = '';
    const styleTags = getStyleRecommendations(results.season);
    styleTags.forEach(style => {
        const tag = document.createElement('div');
        tag.className = 'style-tag';
        tag.textContent = style;
        styleContainer.appendChild(tag);
    });

    // Update matching products
    const productsContainer = document.getElementById('matchingProducts');
    productsContainer.innerHTML = '';
    const matchingProducts = getMatchingProducts(results.season);
    matchingProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: var(--radius-lg);">
            </div>
            <div class="product-info" style="padding: var(--space-3);">
                <h4 style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--space-1);">${product.name}</h4>
                <p style="color: var(--primary-600); font-weight: 700; margin-bottom: var(--space-2);">Rp ${product.price.toLocaleString()}</p>
                <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Show results
    document.getElementById('analysisResults').style.display = 'block';
}

// Get Style Recommendations based on season
function getStyleRecommendations(season) {
    const recommendations = {
        'Spring': ['Casual Chic', 'Pastel Colors', 'Light Fabrics', 'Floral Patterns', 'Minimalist'],
        'Summer': ['Beach Wear', 'Bright Colors', 'Light Materials', 'Boho Style', 'Sporty'],
        'Autumn': ['Warm Tones', 'Layered Look', 'Earthy Colors', 'Classic Cuts', 'Cozy'],
        'Winter': ['Dark Colors', 'Heavy Fabrics', 'Monochrome', 'Elegant', 'Street Style']
    };
    return recommendations[season] || recommendations['Spring'];
}

// Get Matching Products (mock data)
function getMatchingProducts(season) {
    const products = {
        'Spring': [
            { id: 1, name: 'Blouse Pastel Pink', price: 150000, image: '../assets/images/product1.jpg' },
            { id: 2, name: 'Skirt Floral White', price: 200000, image: '../assets/images/product2.jpg' },
            { id: 3, name: 'Cardigan Light Blue', price: 180000, image: '../assets/images/product3.jpg' }
        ],
        'Summer': [
            { id: 4, name: 'Tank Top Yellow', price: 120000, image: '../assets/images/product4.jpg' },
            { id: 5, name: 'Shorts Denim', price: 160000, image: '../assets/images/product5.jpg' },
            { id: 6, name: 'Sunglasses Round', price: 250000, image: '../assets/images/product6.jpg' }
        ],
        'Autumn': [
            { id: 7, name: 'Sweater Burgundy', price: 220000, image: '../assets/images/product7.jpg' },
            { id: 8, name: 'Boots Brown', price: 350000, image: '../assets/images/product8.jpg' },
            { id: 9, name: 'Jacket Leather', price: 450000, image: '../assets/images/product9.jpg' }
        ],
        'Winter': [
            { id: 10, name: 'Coat Black', price: 500000, image: '../assets/images/product10.jpg' },
            { id: 11, name: 'Scarf Wool', price: 80000, image: '../assets/images/product11.jpg' },
            { id: 12, name: 'Jeans Dark', price: 250000, image: '../assets/images/product12.jpg' }
        ]
    };
    return products[season] || products['Spring'];
}

// Add to Cart function (mock)
function addToCart(productId) {
    alert(`Produk dengan ID ${productId} ditambahkan ke keranjang!`);
    // In real implementation, update cart in localStorage or send to server
}

// Set Premium Account (for testing/demo)
function setPremiumAccount() {
    localStorage.setItem('isPremium', 'true');
    document.getElementById('premiumLock').style.display = 'none';
    document.getElementById('aiContent').style.display = 'block';
    // Optional: Show success message
    alert('Akun premium berhasil diaktifkan! Sekarang Anda dapat menggunakan fitur AI Coloring.');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is premium (mock check)
    const isPremium = localStorage.getItem('isPremium') === 'true';

    if (isPremium) {
        document.getElementById('aiContent').style.display = 'block';
    } else {
        document.getElementById('premiumLock').style.display = 'block';
    }
});
