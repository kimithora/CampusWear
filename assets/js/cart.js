/* ============================================
   CAMPUSWEAR - CART JS
   Logic untuk Keranjang Belanja
   ============================================ */

const Cart = {
    KEY: 'campuswear_cart',

    getItems: () => {
        return CampusWear.Storage.get(Cart.KEY, []);
    },

    addItem: (product, quantity = 1) => {
        const items = Cart.getItems();
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || '👕',
                quantity: quantity,
                seller: product.seller || 'Unknown'
            });
        }
        
        CampusWear.Storage.set(Cart.KEY, items);
        Cart.updateUI();
        CampusWear.Utils.showAlert('Produk ditambahkan ke keranjang', 'success');
    },

    removeItem: (productId) => {
        let items = Cart.getItems();
        items = items.filter(item => item.id !== productId);
        CampusWear.Storage.set(Cart.KEY, items);
        Cart.updateUI();
        Cart.renderCart();
    },

    updateQuantity: (productId, quantity) => {
        const items = Cart.getItems();
        const item = items.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                Cart.removeItem(productId);
            } else {
                item.quantity = quantity;
                CampusWear.Storage.set(Cart.KEY, items);
                Cart.updateUI();
                Cart.renderCart();
            }
        }
    },

    clear: () => {
        CampusWear.Storage.remove(Cart.KEY);
        Cart.updateUI();
    },

    getTotal: () => {
        const items = Cart.getItems();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getCount: () => {
        const items = Cart.getItems();
        return items.reduce((count, item) => count + item.quantity, 0);
    },

    updateUI: () => {
        const badges = document.querySelectorAll('.cart-badge');
        const count = Cart.getCount();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    renderCart: () => {
        const container = document.getElementById('cartList');
        const emptyState = document.getElementById('emptyCart');
        const orderSummary = document.getElementById('orderSummary');
        const items = Cart.getItems();

        if (items.length === 0) {
            if (container) container.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            if (orderSummary) orderSummary.style.display = 'none';
            return;
        }

        if (container) {
            container.style.display = 'block';
            container.innerHTML = items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Dari: ${item.seller}</p>
                        <div class="current-price">${CampusWear.Utils.formatRupiah(item.price)}</div>
                    </div>
                    <div class="quantity-control">
                        <button onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <button onclick="Cart.removeItem('${item.id}')" style="color: var(--error); background: none; border: none; cursor: pointer; font-size: var(--text-xl);">🗑️</button>
                </div>
            `).join('');
        }

        if (emptyState) emptyState.style.display = 'none';
        if (orderSummary) {
            orderSummary.style.display = 'block';
            const subtotal = Cart.getTotal();
            const shipping = 20000;
            const total = subtotal + shipping;
            
            document.getElementById('subtotalPrice').textContent = CampusWear.Utils.formatRupiah(subtotal);
            document.getElementById('totalPrice').textContent = CampusWear.Utils.formatRupiah(total);
        }
    }
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateUI();
    Cart.renderCart();
});

// Expose to window
window.Cart = Cart;