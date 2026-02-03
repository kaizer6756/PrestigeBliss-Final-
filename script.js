// ============================================
// PRESTIGE BLISS - COMPLETE JAVASCRIPT
// ============================================

// ============================================
// 1. CONFIGURATION & CONSTANTS
// ============================================
const CONFIG = {
    EXCHANGE_RATE: 1, // Now using PHP directly (1 PHP = 1 PHP)
    CURRENCY_SYMBOL: '₱',
    TAX_RATE: 0.12, // 12%
    SHIPPING_FEE: 100.00 // PHP
};

// ============================================
// 2. CURRENCY SYSTEM (PHP DIRECT)
// ============================================
class CurrencySystem {
    static formatPHP(amountPHP) {
        return `${CONFIG.CURRENCY_SYMBOL}${amountPHP.toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }

    static calculateCartTotal(cartItems) {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        
        const tax = subtotal * CONFIG.TAX_RATE;
        const shipping = CONFIG.SHIPPING_FEE;
        const total = subtotal + tax + shipping;
        
        return {
            subtotal,
            tax,
            shipping,
            total
        };
    }
}

// ============================================
// 3. STORAGE MANAGEMENT
// ============================================
class StorageManager {
    static getCart() {
        return JSON.parse(localStorage.getItem('prestigeBlissCart')) || [];
    }

    static saveCart(cart) {
        localStorage.setItem('prestigeBlissCart', JSON.stringify(cart));
    }

    static getUser() {
        return JSON.parse(localStorage.getItem('prestigeBlissUser')) || null;
    }

    static saveUser(user) {
        localStorage.setItem('prestigeBlissUser', JSON.stringify(user));
    }

    static getTheme() {
        return localStorage.getItem('prestigeTheme') || 'dark';
    }

    static saveTheme(theme) {
        localStorage.setItem('prestigeTheme', theme);
    }
}

// ============================================
// 4. CART MANAGEMENT
// ============================================
class CartManager {
    constructor() {
        this.cart = StorageManager.getCart();
    }

    addItem(product, quantity = 1) {
        // Check if item with same id AND same size already exists
        const existingItem = this.cart.find(item => 
            item.id === product.id && item.selectedSize === product.selectedSize
        );
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.save();
        return this.cart;
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.save();
        return this.cart;
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.save();
            }
        }
        return this.cart;
    }

    clear() {
        this.cart = [];
        this.save();
        return this.cart;
    }

    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalAmount() {
        return CurrencySystem.calculateCartTotal(this.cart);
    }

    save() {
        StorageManager.saveCart(this.cart);
    }
}

// ============================================
// 5. PRODUCT DATA WITH MULTIPLE SIZES (PRICES IN PHP)
// ============================================
const PRODUCTS = [
    {
        id: '1',
        name: 'Nexus Noir',
        category: 'signature',
        description: 'A deep, mysterious blend of oud and leather. Limited edition.',
        badge: '35% OFF',
        featured: true,
        sizes: [
            {
                size: '10ml',
                price: 99.00,
                originalPrice: 149.00,
                discountPercentage: 33
            },
            {
                size: '30ml',
                price: 190.00,
                originalPrice: 299.00,
                discountPercentage: 36
            },
            {
                size: '50ml',
                price: 339.00,
                originalPrice: 349.00,
                discountPercentage: 3
            }
        ],
        image: '5.jpg'
    },
    {
        id: '2',
        name: 'Garden of Roses',
        category: 'limited',
        description: 'Amber, vanilla, and white flowers. Spring collection.',
        badge: '34% OFF',
        featured: true,
        sizes: [
            {
                size: '10ml',
                price: 99.00,
                originalPrice: 149.00,
                discountPercentage: 33
            },
            {
                size: '30ml',
                price: 190.00,
                originalPrice: 299.00,
                discountPercentage: 36
            },
            {
                size: '50ml',
                price: 345.00,
                originalPrice: 359.00,
                discountPercentage: 4
            }
        ],
        image: 'https://images.unsplash.com/photo-1590736969958-65d5e7c5e867?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
        id: '3',
        name: 'Velvet Bloom',
        category: 'seasonal',
        description: 'Jasmine, tuberose, and sandalwood. Winter edition.',
        badge: '34% OFF',
        featured: true,
        sizes: [
            {
                size: '10ml',
                price: 99.00,
                originalPrice: 149.00,
                discountPercentage: 33
            },
            {
                size: '30ml',
                price: 190.00,
                originalPrice: 299.00,
                discountPercentage: 36
            },
            {
                size: '50ml',
                price: 342.00,
                originalPrice: 349.00,
                discountPercentage: 2
            }
        ],
        image: '4.jpg'
    },
    {
        id: '4',
        name: 'Comming Soon...',
        category: 'signature',
        description: 'Exotic spices and precious woods. Collector item.',
        badge: '35% OFF',
        featured: false,
        sizes: [
            {
                size: '10ml',
                price: 99.00,
                originalPrice: 149.00,
                discountPercentage: 33
            },
            {
                size: '30ml',
                price: 190.00,
                originalPrice: 299.00,
                discountPercentage: 36
            },
            {
                size: '50ml',
                price: 339.00,
                originalPrice: 349.00,
                discountPercentage: 3
            }
        ],
        image: '1.jpeg'
    },
    {
        id: '5',
        name: 'Comming Soon...',
        category: 'unisex',
        description: 'Musk, amber, and patchouli. Unisex fragrance.',
        badge: '35% OFF',
        featured: false,
        sizes: [
            {
                size: '10ml',
                price: 99.00,
                originalPrice: 149.00,
                discountPercentage: 33
            },
            {
                size: '30ml',
                price: 190.00,
                originalPrice: 299.00,
                discountPercentage: 36
            },
            {
                size: '50ml',
                price: 344.00,
                originalPrice: 354.00,
                discountPercentage: 3
            }
        ],
        image: '1.jpeg'
    },
    {
        id: '6',
        name: 'Comming Soon...',
        category: 'signature',
        description: 'Citrus, bergamot, and cedarwood. Summer special.',
        badge: '35% OFF',
        featured: true,
        sizes: [
            {
                size: '10ml',
                price: 99.00,
                originalPrice: 149.00,
                discountPercentage: 33
            },
            {
                size: '30ml',
                price: 190.00,
                originalPrice: 299.00,
                discountPercentage: 36
            },
            {
                size: '50ml',
                price: 347.00,
                originalPrice: 359.00,
                discountPercentage: 3
            }
        ],
        image: '1.jpeg'
    },
    {
        id: '7',
        name: 'Comming Soon...',
        category: 'limited',
        description: 'Saffron, rose, and sandalwood. Arabian nights.',
        badge: '34% OFF',
        featured: false,
        sizes: [
            {
                size: '10ml',
                price: 99.00,
                originalPrice: 149.00,
                discountPercentage: 33
            },
            {
                size: '30ml',
                price: 190.00,
                originalPrice: 299.00,
                discountPercentage: 36
            },
            {
                size: '50ml',
                price: 340.00,
                originalPrice: 349.00,
                discountPercentage: 3
            }
        ],
        image: '1.jpeg'
    },
    {
        id: '8',
        name: 'Comming Soon...',
        category: 'seasonal',
        description: 'Sea salt, driftwood, and marine notes. Fresh aquatic.',
        badge: '34% OFF',
        featured: true,
        sizes: [
            {
                size: '10ml',
                price: 99.00,
                originalPrice: 149.00,
                discountPercentage: 33
            },
            {
                size: '30ml',
                price: 190.00,
                originalPrice: 299.00,
                discountPercentage: 36
            },
            {
                size: '50ml',
                price: 345.00,
                originalPrice: 355.00,
                discountPercentage: 3
            }
        ],
        image: '1.jpeg'
    }
];

// ============================================
// 6. UI COMPONENTS
// ============================================
class UIComponents {
    static showToast(message, type = 'success') {
        // Remove existing toast
        const existingToast = document.getElementById('toast');
        if (existingToast) existingToast.remove();
        
        // Create new toast
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const iconColor = type === 'success' ? '#FFD700' : '#dc143c';
        
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${icon}" style="color: ${iconColor};"></i>
                <span class="toast-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    static createProductCard(product) {
        const defaultSize = product.sizes[0];
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-category">${product.category} Collection</p>
                    <p class="product-description">${product.description}</p>
                    
                    <!-- Size Selector -->
                    <div class="size-selector">
                        <div style="color: #FFD700; margin-bottom: 5px; font-size: 0.9rem;">Select Size:</div>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-btn ${size.size === '10ml' ? 'active' : ''}" 
                                        data-size="${size.size}" 
                                        data-price="${size.price}" 
                                        data-original="${size.originalPrice}"
                                        data-discount="${size.discountPercentage}">
                                    ${size.size}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Price Display -->
                    <div class="product-size-price">
                        <div class="size-price-display">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span class="selected-size-price">${CurrencySystem.formatPHP(defaultSize.price)}</span>
                                <span class="selected-size-original">${CurrencySystem.formatPHP(defaultSize.originalPrice)}</span>
                                <span class="size-discount">${defaultSize.discountPercentage}% OFF</span>
                            </div>
                            <div class="size-label">for ${defaultSize.size}</div>
                        </div>
                    </div>
                    
                    <!-- Savings Badge -->
                    <div class="savings-badge">
                        Save ${CurrencySystem.formatPHP(defaultSize.originalPrice - defaultSize.price)}
                    </div>
                    
                    <button onclick="addToCart('${product.id}')" class="btn btn-gold add-to-cart">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    }
    
    static createCartItem(item) {
        const itemTotal = item.price * item.quantity;
        
        return `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    ${item.selectedSize ? `<div class="cart-item-size">${item.selectedSize}</div>` : ''}
                    <div class="cart-item-controls">
                        <button onclick="updateCartItem('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartItem('${item.id}', ${item.quantity + 1})">+</button>
                        <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <div class="item-total">${CurrencySystem.formatPHP(itemTotal)}</div>
                    <div class="item-price">${CurrencySystem.formatPHP(item.price)} each</div>
                </div>
            </div>
        `;
    }
}

// ============================================
// 7. PROFILE CONTROLLER
// ============================================
class ProfileController {
    static checkUserStatus() {
        const user = StorageManager.getUser();
        return user && user.isLoggedIn === true;
    }

    static updateUserStatusUI() {
        const isLoggedIn = this.checkUserStatus();
        const user = isLoggedIn ? StorageManager.getUser() : null;
        
        // Update desktop user status
        const desktopIndicator = document.getElementById('userStatusIndicator');
        if (desktopIndicator) {
            if (isLoggedIn) {
                desktopIndicator.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #FFD700;">${user.name}</span>
                        <button onclick="logout()" class="nav-icon" style="color: #dc143c;">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                `;
            } else {
                desktopIndicator.innerHTML = `
                    <a href="login.html" class="nav-icon">
                        <i class="fas fa-sign-in-alt"></i> Login
                    </a>
                `;
            }
        }
        
        // Update mobile user status
        const mobileIndicator = document.getElementById('mobileUserStatus');
        if (mobileIndicator) {
            if (isLoggedIn) {
                mobileIndicator.innerHTML = `
                    <a href="#" class="mobile-nav-link" onclick="logout(); return false;">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                `;
            } else {
                mobileIndicator.innerHTML = `
                    <a href="login.html" class="mobile-nav-link">
                        <i class="fas fa-sign-in-alt"></i> Login
                    </a>
                `;
            }
        }
    }

    static loadProfileContent() {
        const isLoggedIn = this.checkUserStatus();
        const user = isLoggedIn ? StorageManager.getUser() : null;
        const profileContent = document.getElementById('profileContent');
        const profileWelcome = document.getElementById('profileWelcome');
        const profileSubtitle = document.getElementById('profileSubtitle');
        
        if (!profileContent) return;
        
        if (isLoggedIn) {
            // Check if new user (based on memberSince date)
            const memberSince = user.memberSince ? new Date(user.memberSince) : new Date();
            const isNewUser = (Date.now() - memberSince.getTime()) < (7 * 24 * 60 * 60 * 1000); // Within 7 days
            
            profileWelcome.innerHTML = `Welcome, <span class="text-gold">${user.name}</span>`;
            profileSubtitle.textContent = isNewUser ? 'Welcome to Prestige Bliss! Start your fragrance journey.' : 'Manage your account and orders';
            
            profileContent.innerHTML = `
                <div class="profile-grid">
                    <!-- Sidebar -->
                    <aside style="width: 300px;">
                        <div class="profile-card">
                            <div class="profile-avatar">
                                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FFD700&color=000&bold=true" alt="Profile">
                            </div>
                            <h3 class="profile-name">${user.name}</h3>
                            <p class="profile-email">${user.email}</p>
                            <div style="display: flex; align-items: center; gap: 8px; background: rgba(255, 215, 0, 0.1); padding: 5px 15px; border-radius: 20px; margin: 15px 0;">
                                <i class="fas fa-crown text-gold"></i>
                                <span style="color: #FFD700;">${isNewUser ? 'New Member' : 'Gold Member'}</span>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px;">
                                <div style="text-align: center;">
                                    <div style="font-size: 1.2rem; color: #FFD700; font-weight: bold;">0</div>
                                    <div style="font-size: 0.8rem; color: #888;">Orders</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 1.2rem; color: #FFD700; font-weight: bold;">₱0</div>
                                    <div style="font-size: 0.8rem; color: #888;">Spent</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 1.2rem; color: #FFD700; font-weight: bold;">0</div>
                                    <div style="font-size: 0.8rem; color: #888;">Wishlist</div>
                                </div>
                            </div>
                        </div>

                        <div style="background: #1a1a1a; border-radius: 10px; overflow: hidden; margin-top: 20px;">
                            <a href="#" class="profile-menu-item active" onclick="ProfileController.loadDashboard(); return false;" style="display: flex; align-items: center; gap: 15px; padding: 15px 20px; color: #FFD700; text-decoration: none; border-bottom: 1px solid rgba(255, 215, 0, 0.1);">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                            </a>
                            <a href="#" class="profile-menu-item" onclick="ProfileController.loadOrders(); return false;" style="display: flex; align-items: center; gap: 15px; padding: 15px 20px; color: #ccc; text-decoration: none; border-bottom: 1px solid rgba(255, 215, 0, 0.1);">
                                <i class="fas fa-shopping-bag"></i>
                                <span>My Orders</span>
                            </a>
                            <a href="#" class="profile-menu-item" onclick="ProfileController.loadWishlist(); return false;" style="display: flex; align-items: center; gap: 15px; padding: 15px 20px; color: #ccc; text-decoration: none; border-bottom: 1px solid rgba(255, 215, 0, 0.1);">
                                <i class="fas fa-heart"></i>
                                <span>Wishlist</span>
                            </a>
                            <a href="#" class="profile-menu-item" onclick="ProfileController.loadSettings(); return false;" style="display: flex; align-items: center; gap: 15px; padding: 15px 20px; color: #ccc; text-decoration: none; border-bottom: 1px solid rgba(255, 215, 0, 0.1);">
                                <i class="fas fa-cog"></i>
                                <span>Settings</span>
                            </a>
                            <a href="#" class="profile-menu-item" onclick="logout(); return false;" style="display: flex; align-items: center; gap: 15px; padding: 15px 20px; color: #dc143c; text-decoration: none;">
                                <i class="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </aside>

                    <!-- Main Content -->
                    <main style="flex: 1;" id="profileMainContent">
                        ${this.loadDashboardContent(isNewUser)}
                    </main>
                </div>
            `;
        } else {
            // Guest user view
            profileWelcome.innerHTML = `My <span class="text-gold">Profile</span>`;
            profileSubtitle.textContent = 'Create an account or login to access your profile';
            
            profileContent.innerHTML = `
                <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                    <div style="background: #1a1a1a; padding: 50px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2); margin-bottom: 30px;">
                        <i class="fas fa-user-circle fa-5x text-gold mb-4"></i>
                        <h2 style="color: #FFD700; margin-bottom: 15px;">Welcome to Prestige Bliss</h2>
                        <p style="color: #ccc; margin-bottom: 25px; font-size: 1.1rem;">
                            Create an account or login to access your personal profile, track orders, and manage your preferences.
                        </p>
                        <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 30px;">
                            <a href="login.html" class="btn btn-gold btn-lg">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </a>
                            <a href="login.html" class="btn btn-outline-gold btn-lg">
                                <i class="fas fa-user-plus"></i> Register
                            </a>
                        </div>
                        <p style="color: #888; margin-bottom: 30px;">Continue shopping without an account</p>
                        <a href="shop.html" class="btn btn-black">
                            <i class="fas fa-store"></i> Continue Shopping
                        </a>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px;">
                        <div style="background: #1a1a1a; padding: 25px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2);">
                            <i class="fas fa-shopping-bag fa-2x text-gold mb-3"></i>
                            <h4 style="color: #FFD700; margin-bottom: 10px;">Track Orders</h4>
                            <p style="color: #888;">Check your order status and history</p>
                        </div>
                        <div style="background: #1a1a1a; padding: 25px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2);">
                            <i class="fas fa-heart fa-2x text-gold mb-3"></i>
                            <h4 style="color: #FFD700; margin-bottom: 10px;">Wishlist</h4>
                            <p style="color: #888;">Save your favorite fragrances</p>
                        </div>
                        <div style="background: #1a1a1a; padding: 25px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2);">
                            <i class="fas fa-crown fa-2x text-gold mb-3"></i>
                            <h4 style="color: #FFD700; margin-bottom: 10px;">Exclusive Offers</h4>
                            <p style="color: #888;">Get member-only discounts</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    static loadDashboardContent(isNewUser = true) {
        if (isNewUser) {
            return `
                <!-- Welcome Dashboard for New User -->
                <div>
                    <h2 style="color: #FFD700; margin-bottom: 20px;">Welcome to Prestige Bliss!</h2>
                    <p style="color: #ccc; margin-bottom: 30px; font-size: 1.1rem;">
                        Your journey into luxury fragrances begins here. Discover exclusive scents and start building your collection.
                    </p>
                    
                    <!-- Welcome Stats -->
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; color: #FFD700; margin-bottom: 10px;">0</div>
                                <div style="color: #ccc;">Total Orders</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; color: #FFD700; margin-bottom: 10px;">15%</div>
                                <div style="color: #ccc;">Member Discount</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; color: #FFD700; margin-bottom: 10px;">0</div>
                                <div style="color: #ccc;">Wishlist Items</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; color: #FFD700; margin-bottom: 10px;">New</div>
                                <div style="color: #ccc;">Account Status</div>
                            </div>
                        </div>
                    </div>

                    <!-- Welcome Message & Getting Started -->
                    <div style="background: rgba(255, 215, 0, 0.1); padding: 30px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2); margin: 40px 0;">
                        <h3 style="color: #FFD700; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-gift"></i> Getting Started
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                            <div style="text-align: center; padding: 20px;">
                                <div style="width: 60px; height: 60px; background: rgba(255, 215, 0, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                    <i class="fas fa-store text-gold fa-lg"></i>
                                </div>
                                <h4 style="color: #FFD700;">Browse Collection</h4>
                                <p style="color: #888; font-size: 0.9rem;">Discover our luxury fragrances</p>
                            </div>
                            <div style="text-align: center; padding: 20px;">
                                <div style="width: 60px; height: 60px; background: rgba(255, 215, 0, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                    <i class="fas fa-heart text-gold fa-lg"></i>
                                </div>
                                <h4 style="color: #FFD700;">Create Wishlist</h4>
                                <p style="color: #888; font-size: 0.9rem;">Save your favorite scents</p>
                            </div>
                            <div style="text-align: center; padding: 20px;">
                                <div style="width: 60px; height: 60px; background: rgba(255, 215, 0, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                    <i class="fas fa-percent text-gold fa-lg"></i>
                                </div>
                                <h4 style="color: #FFD700;">Get Discounts</h4>
                                <p style="color: #888; font-size: 0.9rem;">Enjoy member-exclusive offers</p>
                            </div>
                            <div style="text-align: center; padding: 20px;">
                                <div style="width: 60px; height: 60px; background: rgba(255, 215, 0, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                    <i class="fas fa-shipping-fast text-gold fa-lg"></i>
                                </div>
                                <h4 style="color: #FFD700;">Fast Shipping</h4>
                                <p style="color: #888; font-size: 0.9rem;">Free shipping on first order</p>
                            </div>
                        </div>
                    </div>

                    <!-- First Time Offer -->
                    <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2); margin-top: 30px;">
                        <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 250px;">
                                <h3 style="color: #FFD700; margin-bottom: 10px;">Special Welcome Offer</h3>
                                <p style="color: #ccc; margin-bottom: 15px;">Get 15% off your first purchase when you spend ₱500 or more.</p>
                                <div style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255, 215, 0, 0.1); padding: 8px 15px; border-radius: 20px;">
                                    <i class="fas fa-tag text-gold"></i>
                                    <span style="color: #FFD700; font-weight: bold;">WELCOME15</span>
                                </div>
                            </div>
                            <div>
                                <a href="shop.html" class="btn btn-gold">
                                    <i class="fas fa-store"></i> Shop Now
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 40px;">
                        <div style="background: #1a1a1a; padding: 25px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2); text-align: center;">
                            <h4 style="color: #FFD700; margin-bottom: 10px;">Start Shopping</h4>
                            <p style="color: #888; margin-bottom: 20px;">Explore our premium fragrance collection</p>
                            <a href="shop.html" class="btn btn-gold btn-sm">Browse Perfumes</a>
                        </div>
                        <div style="background: #1a1a1a; padding: 25px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2); text-align: center;">
                            <h4 style="color: #FFD700; margin-bottom: 10px;">Take Fragrance Quiz</h4>
                            <p style="color: #888; margin-bottom: 20px;">Find your perfect scent match</p>
                            <button class="btn btn-outline-gold btn-sm" onclick="window.showToast('Fragrance quiz coming soon!')">
                                Start Quiz
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // For returning users
            return `
                <!-- Dashboard for Returning Users -->
                <div>
                    <h2 style="color: #FFD700; margin-bottom: 30px;">Dashboard Overview</h2>
                    
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; color: #FFD700; margin-bottom: 10px;">0</div>
                                <div style="color: #ccc;">Total Orders</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; color: #FFD700; margin-bottom: 10px;">0</div>
                                <div style="color: #ccc;">Pending Orders</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; color: #FFD700; margin-bottom: 10px;">0</div>
                                <div style="color: #ccc;">Reviews</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; color: #FFD700; margin-bottom: 10px;">15%</div>
                                <div style="color: #ccc;">Member Discount</div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty Orders Section -->
                    <div style="margin-top: 50px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h3 style="color: #FFD700;">Your Orders</h3>
                        </div>
                        
                        <div style="background: #1a1a1a; padding: 40px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2); text-align: center;">
                            <i class="fas fa-shopping-bag fa-4x text-gold mb-3"></i>
                            <h4 style="color: #FFD700; margin-bottom: 10px;">No orders yet</h4>
                            <p style="color: #888; margin-bottom: 20px;">Start shopping to see your orders here</p>
                            <a href="shop.html" class="btn btn-gold">Start Shopping</a>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 40px;">
                        <div style="background: #1a1a1a; padding: 25px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2); text-align: center;">
                            <h4 style="color: #FFD700; margin-bottom: 10px;">Continue Shopping</h4>
                            <p style="color: #888; margin-bottom: 20px;">Discover new fragrances</p>
                            <a href="shop.html" class="btn btn-gold btn-sm">Shop Now</a>
                        </div>
                        <div style="background: #1a1a1a; padding: 25px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2); text-align: center;">
                            <h4 style="color: #FFD700; margin-bottom: 10px;">Track Order</h4>
                            <p style="color: #888; margin-bottom: 20px;">Track your recent orders</p>
                            <button class="btn btn-outline-gold btn-sm" onclick="window.showToast('No orders to track yet!')">
                                Track Order
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    static loadDashboard() {
        const mainContent = document.getElementById('profileMainContent');
        const user = StorageManager.getUser();
        if (mainContent && user) {
            const memberSince = user.memberSince ? new Date(user.memberSince) : new Date();
            const isNewUser = (Date.now() - memberSince.getTime()) < (7 * 24 * 60 * 60 * 1000);
            mainContent.innerHTML = this.loadDashboardContent(isNewUser);
        }
        this.updateActiveMenu('dashboard');
    }

    static loadOrders() {
        const mainContent = document.getElementById('profileMainContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div>
                    <h2 style="color: #FFD700; margin-bottom: 30px;">My Orders</h2>
                    <div style="background: #1a1a1a; padding: 50px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2); text-align: center;">
                        <i class="fas fa-shopping-bag fa-4x text-gold mb-3"></i>
                        <h4 style="color: #FFD700; margin-bottom: 10px;">No orders yet</h4>
                        <p style="color: #888; margin-bottom: 20px;">When you place an order, it will appear here</p>
                        <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                            <a href="shop.html" class="btn btn-gold">
                                <i class="fas fa-store"></i> Start Shopping
                            </a>
                            <a href="collections.html" class="btn btn-outline-gold">
                                <i class="fas fa-star"></i> Browse Collections
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
        this.updateActiveMenu('orders');
    }

    static loadWishlist() {
        const mainContent = document.getElementById('profileMainContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div>
                    <h2 style="color: #FFD700; margin-bottom: 30px;">My Wishlist</h2>
                    <p style="color: #ccc; margin-bottom: 30px;">Your saved fragrances</p>
                    <div class="text-center" style="padding: 50px; background: #1a1a1a; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2);">
                        <i class="fas fa-heart fa-4x text-gold mb-3"></i>
                        <h4 style="color: #FFD700; margin-bottom: 10px;">Your wishlist is empty</h4>
                        <p style="color: #888; margin-bottom: 20px;">Start adding your favorite perfumes</p>
                        <div style="display: flex; gap: 15px; justify-content: center;">
                            <a href="shop.html" class="btn btn-gold">Browse Collection</a>
                            <a href="collections.html" class="btn btn-outline-gold">View Collections</a>
                        </div>
                    </div>
                </div>
            `;
        }
        this.updateActiveMenu('wishlist');
    }

    static loadSettings() {
        const mainContent = document.getElementById('profileMainContent');
        if (mainContent) {
            const user = StorageManager.getUser() || { name: '', email: '' };
            
            mainContent.innerHTML = `
                <div>
                    <h2 style="color: #FFD700; margin-bottom: 30px;">Account Settings</h2>
                    <div style="background: #1a1a1a; padding: 30px; border-radius: 10px; border: 1px solid rgba(255, 215, 0, 0.2);">
                        <form id="settingsForm">
                            <div class="form-group" style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; color: #FFD700;">Full Name</label>
                                <input type="text" id="settingsName" value="${user.name}" style="width: 100%; padding: 12px; background: #0a0a0a; border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 4px; color: white;">
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; color: #FFD700;">Email Address</label>
                                <input type="email" id="settingsEmail" value="${user.email}" style="width: 100%; padding: 12px; background: #0a0a0a; border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 4px; color: white;">
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; color: #FFD700;">Password</label>
                                <input type="password" placeholder="••••••••" style="width: 100%; padding: 12px; background: #0a0a0a; border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 4px; color: white;">
                            </div>
                            
                            <div style="display: flex; gap: 15px; margin-top: 30px;">
                                <button type="button" class="btn btn-outline-gold" style="flex: 1;" onclick="ProfileController.loadDashboard(); return false;">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-gold" style="flex: 2;">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            
            // Add form submission handler
            const settingsForm = document.getElementById('settingsForm');
            if (settingsForm) {
                settingsForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const name = document.getElementById('settingsName').value;
                    const email = document.getElementById('settingsEmail').value;
                    
                    if (name && email) {
                        const user = StorageManager.getUser() || {};
                        user.name = name;
                        user.email = email;
                        user.isLoggedIn = true;
                        StorageManager.saveUser(user);
                        
                        UIComponents.showToast('Settings updated successfully!');
                        this.loadProfileContent();
                    }
                });
            }
        }
        this.updateActiveMenu('settings');
    }

    static updateActiveMenu(activeItem) {
        const menuItems = document.querySelectorAll('.profile-menu-item');
        menuItems.forEach(item => {
            const text = item.querySelector('span')?.textContent?.toLowerCase();
            if (text === activeItem || (activeItem === 'dashboard' && text === 'dashboard')) {
                item.style.color = '#FFD700';
                item.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
            } else {
                item.style.color = '#ccc';
                item.style.backgroundColor = 'transparent';
            }
        });
    }

    static init() {
        this.updateUserStatusUI();
        this.loadProfileContent();
    }
}

// ============================================
// 8. PAGE CONTROLLERS
// ============================================
class PageController {
    static initialize() {
        this.initializePreloader();
        this.initializeNavigation();
        this.initializeCart();
        this.initializeTheme();
        this.loadPageSpecificScripts();
    }
    
    static initializePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 1000);
            });
            
            if (document.readyState === 'complete') {
                preloader.style.display = 'none';
            }
        }
    }
    
    static initializeNavigation() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileNav.classList.toggle('active');
                mobileMenuBtn.innerHTML = mobileNav.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }
        
        // Mobile nav links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav) mobileNav.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    static initializeCart() {
        const cartManager = new CartManager();
        
        // Update cart count
        const updateCartCount = () => {
            const cartCountElements = document.querySelectorAll('.cart-count');
            const totalItems = cartManager.getTotalItems();
            
            cartCountElements.forEach(element => {
                element.textContent = totalItems;
            });
        };
        
        // Initialize cart count
        updateCartCount();
        
        // Cart sidebar functionality
        const cartIcon = document.querySelector('.cart-icon');
        const cartSidebar = document.querySelector('.cart-sidebar');
        const cartOverlay = document.querySelector('.cart-overlay');
        const closeCart = document.querySelector('.close-cart');
        
        const openCart = () => {
            if (cartSidebar) cartSidebar.classList.add('active');
            if (cartOverlay) cartOverlay.classList.add('active');
            updateCartSidebar();
        };
        
        const closeCartSidebar = () => {
            if (cartSidebar) cartSidebar.classList.remove('active');
            if (cartOverlay) cartOverlay.classList.remove('active');
        };
        
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                openCart();
            });
        }
        
        if (closeCart) {
            closeCart.addEventListener('click', closeCartSidebar);
        }
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCartSidebar);
        }
        
        // Update cart sidebar
        const updateCartSidebar = () => {
            const cartItems = document.querySelector('.cart-items');
            const cartTotalPrice = document.querySelector('.cart-total-price');
            
            if (!cartItems) return;
            
            if (cartManager.cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-bag fa-3x text-gold mb-3"></i>
                        <h4 class="text-gold">Your cart is empty</h4>
                        <p class="text-muted">Add some luxurious perfumes</p>
                        <a href="shop.html" class="btn btn-gold mt-3">Start Shopping</a>
                    </div>
                `;
                if (cartTotalPrice) cartTotalPrice.textContent = CurrencySystem.formatPHP(0);
                return;
            }
            
            let itemsHTML = '';
            cartManager.cart.forEach(item => {
                itemsHTML += UIComponents.createCartItem(item);
            });
            
            cartItems.innerHTML = itemsHTML;
            
            // Update total
            const total = cartManager.getTotalAmount();
            if (cartTotalPrice) {
                cartTotalPrice.textContent = CurrencySystem.formatPHP(total.total);
            }
        };
        
        // Export cart functions to window
        window.addToCart = (productId) => {
            const product = PRODUCTS.find(p => p.id === productId);
            if (product) {
                // Get the selected size and price
                const productCard = document.querySelector(`[data-product-id="${productId}"]`);
                if (!productCard) return;
                
                const activeSizeBtn = productCard.querySelector('.size-btn.active');
                if (!activeSizeBtn) return;
                
                const selectedSize = activeSizeBtn.dataset.size;
                const selectedPrice = parseFloat(activeSizeBtn.dataset.price);
                const selectedOriginal = parseFloat(activeSizeBtn.dataset.original);
                const discountPercentage = parseInt(activeSizeBtn.dataset.discount);
                
                // Create product with size info
                const productToAdd = {
                    ...product,
                    price: selectedPrice,
                    originalPrice: selectedOriginal,
                    selectedSize: selectedSize,
                    discountPercentage: discountPercentage,
                    // Keep only selected size data
                    sizes: [{
                        size: selectedSize,
                        price: selectedPrice,
                        originalPrice: selectedOriginal,
                        discountPercentage: discountPercentage
                    }]
                };
                
                cartManager.addItem(productToAdd, 1);
                updateCartCount();
                updateCartSidebar();
                UIComponents.showToast(`${product.name} (${selectedSize}) added to cart!`);
            }
        };
        
        window.removeFromCart = (productId) => {
            cartManager.removeItem(productId);
            updateCartCount();
            updateCartSidebar();
            UIComponents.showToast('Item removed from cart');
        };
        
        window.updateCartItem = (productId, quantity) => {
            cartManager.updateQuantity(productId, quantity);
            updateCartCount();
            updateCartSidebar();
        };
        
        window.clearCart = () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                cartManager.clear();
                updateCartCount();
                updateCartSidebar();
                UIComponents.showToast('Cart cleared');
            }
        };
    }
    
    static initializeTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const themeIcon = themeToggle.querySelector('i');
        const currentTheme = StorageManager.getTheme();
        
        // Apply saved theme
        if (currentTheme === 'light') {
            document.body.classList.add('light-mode');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
        
        // Toggle theme
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (themeIcon) {
                if (document.body.classList.contains('light-mode')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    StorageManager.saveTheme('light');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    StorageManager.saveTheme('dark');
                }
            }
        });
    }
    
    static loadPageSpecificScripts() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        switch(currentPage) {
            case 'index.html':
                this.initializeHomePage();
                break;
            case 'shop.html':
                this.initializeShopPage();
                break;
            case 'cart.html':
                this.initializeCartPage();
                break;
            case 'checkout.html':
                this.initializeCheckoutPage();
                break;
            case 'profile.html':
                this.initializeProfilePage();
                break;
            case 'admin.html':
                this.initializeAdminPage();
                break;
            case 'collections.html':
                this.initializeCollectionsPage();
                break;
            case 'login.html':
                this.initializeLoginPage();
                break;
        }
    }
    
    static initializeHomePage() {
        // Load featured products
        const featuredContainer = document.getElementById('featuredProducts');
        if (featuredContainer) {
            const featuredProducts = PRODUCTS.filter(p => p.featured);
            featuredContainer.innerHTML = featuredProducts.map(UIComponents.createProductCard).join('');
            
            // Add size selection event listeners
            setTimeout(() => {
                const sizeButtons = featuredContainer.querySelectorAll('.size-btn');
                sizeButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Remove active class from all buttons in this product card
                        const productCard = this.closest('.product-card');
                        const allSizeButtons = productCard.querySelectorAll('.size-btn');
                        allSizeButtons.forEach(btn => btn.classList.remove('active'));
                        
                        // Add active class to clicked button
                        this.classList.add('active');
                        
                        // Update price display
                        const price = parseFloat(this.dataset.price);
                        const originalPrice = parseFloat(this.dataset.original);
                        const discount = this.dataset.discount;
                        const size = this.dataset.size;
                        
                        const priceDisplay = productCard.querySelector('.selected-size-price');
                        const originalDisplay = productCard.querySelector('.selected-size-original');
                        const discountDisplay = productCard.querySelector('.size-discount');
                        const sizeLabel = productCard.querySelector('.size-label');
                        const savingsBadge = productCard.querySelector('.savings-badge');
                        
                        if (priceDisplay) priceDisplay.textContent = CurrencySystem.formatPHP(price);
                        if (originalDisplay) originalDisplay.textContent = CurrencySystem.formatPHP(originalPrice);
                        if (discountDisplay) discountDisplay.textContent = `${discount}% OFF`;
                        if (sizeLabel) sizeLabel.textContent = `for ${size}`;
                        if (savingsBadge) {
                            savingsBadge.textContent = `Save ${CurrencySystem.formatPHP(originalPrice - price)}`;
                        }
                    });
                });
            }, 100);
        }
        
        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                if (email) {
                    UIComponents.showToast('Thank you for subscribing to Prestige Circle!');
                    newsletterForm.reset();
                }
            });
        }
        
        // Update banner to show new pricing
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.textContent = 'Feel the Breeze, Live the Prestige';
        }
    }
    
    static initializeShopPage() {
        const productsContainer = document.getElementById('productsContainer');
        if (!productsContainer) return;
        
        // Get collection from URL
        const urlParams = new URLSearchParams(window.location.search);
        const collection = urlParams.get('collection');
        
        // Filter products
        let filteredProducts = PRODUCTS;
        if (collection) {
            filteredProducts = PRODUCTS.filter(p => p.category === collection);
        }
        
        // Render products
        const renderProducts = (products) => {
            productsContainer.innerHTML = products.map(UIComponents.createProductCard).join('');
            
            // Update product count
            const productCount = document.getElementById('productCount');
            if (productCount) {
                const minPrice = Math.min(...products.flatMap(p => p.sizes.map(s => s.price)));
                const maxPrice = Math.max(...products.flatMap(p => p.sizes.map(s => s.price)));
                productCount.textContent = `${products.length} Products (₱${minPrice} - ₱${maxPrice})`;
            }
            
            // Add size selection event listeners
            const sizeButtons = productsContainer.querySelectorAll('.size-btn');
            sizeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons in this product card
                    const productCard = this.closest('.product-card');
                    const allSizeButtons = productCard.querySelectorAll('.size-btn');
                    allSizeButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Update price display
                    const price = parseFloat(this.dataset.price);
                    const originalPrice = parseFloat(this.dataset.original);
                    const discount = this.dataset.discount;
                    const size = this.dataset.size;
                    
                    const priceDisplay = productCard.querySelector('.selected-size-price');
                    const originalDisplay = productCard.querySelector('.selected-size-original');
                    const discountDisplay = productCard.querySelector('.size-discount');
                    const sizeLabel = productCard.querySelector('.size-label');
                    const savingsBadge = productCard.querySelector('.savings-badge');
                    
                    if (priceDisplay) priceDisplay.textContent = CurrencySystem.formatPHP(price);
                    if (originalDisplay) originalDisplay.textContent = CurrencySystem.formatPHP(originalPrice);
                    if (discountDisplay) discountDisplay.textContent = `${discount}% OFF`;
                    if (sizeLabel) sizeLabel.textContent = `for ${size}`;
                    if (savingsBadge) {
                        savingsBadge.textContent = `Save ${CurrencySystem.formatPHP(originalPrice - price)}`;
                    }
                });
            });
        };
        
        renderProducts(filteredProducts);
        
        // Update shop header
        const shopHeader = document.querySelector('.shop-header-content p.text-muted');
        if (shopHeader) {
            shopHeader.textContent = 'Premium fragrances starting from ₱99 for 10ml to ₱349 for 50ml!';
        }
        
        // Filter functionality
        const filterItems = document.querySelectorAll('.filter-item');
        filterItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                filterItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                const category = item.dataset.category;
                const filtered = category === 'all' 
                    ? PRODUCTS 
                    : PRODUCTS.filter(p => p.category === category);
                
                renderProducts(filtered);
            });
        });
        
        // Price filter - Update max to 350 since 50ml is up to ₱349
        const priceSlider = document.getElementById('priceRange');
        const currentPrice = document.getElementById('currentPrice');
        if (priceSlider && currentPrice) {
            priceSlider.min = 99;
            priceSlider.max = 350;
            priceSlider.value = 350;
            currentPrice.textContent = `Up to ${CurrencySystem.formatPHP(350)}`;
            
            priceSlider.addEventListener('input', function() {
                const maxPrice = parseInt(this.value);
                currentPrice.textContent = `Up to ${CurrencySystem.formatPHP(maxPrice)}`;
                
                // Filter by price (check if any size is within price range)
                const filtered = filteredProducts.filter(p => 
                    p.sizes.some(size => size.price <= maxPrice)
                );
                renderProducts(filtered);
            });
        }
        
        // Apply filters button
        const applyFiltersBtn = document.querySelector('.btn-gold.btn-block');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                UIComponents.showToast('Filters applied!');
            });
        }
    }
    
    static initializeCartPage() {
        const cartManager = new CartManager();
        const cartContainer = document.getElementById('cartItemsContainer');
        const emptyMsg = document.getElementById('emptyCartMessage');
        
        const updateCartDisplay = () => {
            if (cartManager.cart.length === 0) {
                if (cartContainer) cartContainer.innerHTML = '';
                if (emptyMsg) emptyMsg.style.display = 'block';
            } else {
                if (emptyMsg) emptyMsg.style.display = 'none';
                if (cartContainer) {
                    cartContainer.innerHTML = cartManager.cart.map(UIComponents.createCartItem).join('');
                }
            }
            
            // Update summary
            const totals = cartManager.getTotalAmount();
            
            const subtotalEl = document.getElementById('cartSubtotal');
            const shippingEl = document.getElementById('cartShipping');
            const taxEl = document.getElementById('cartTax');
            const totalEl = document.getElementById('cartTotal');
            
            if (subtotalEl) subtotalEl.textContent = CurrencySystem.formatPHP(totals.subtotal);
            if (shippingEl) shippingEl.textContent = CurrencySystem.formatPHP(totals.shipping);
            if (taxEl) taxEl.textContent = CurrencySystem.formatPHP(totals.tax);
            if (totalEl) totalEl.textContent = CurrencySystem.formatPHP(totals.total);
        };
        
        // Initialize cart display
        updateCartDisplay();
        
        // Clear cart function
        window.clearCart = () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                cartManager.clear();
                updateCartDisplay();
                UIComponents.showToast('Cart cleared');
            }
        };
        
        // Promo code
        window.applyPromoCode = () => {
            const codeInput = document.getElementById('promoCode');
            if (codeInput) {
                const code = codeInput.value;
                if (code === 'PRESTIGE10') {
                    UIComponents.showToast('Promo code applied! 10% discount');
                } else if (code) {
                    UIComponents.showToast('Invalid promo code', 'error');
                }
            }
        };
    }
    
    static initializeCheckoutPage() {
        const cartManager = new CartManager();
        
        const loadCheckoutItems = () => {
            const container = document.getElementById('checkoutItems');
            if (!container) return;
            
            if (cartManager.cart.length === 0) {
                container.innerHTML = '<p class="text-muted text-center">Your cart is empty</p>';
                return;
            }
            
            let html = '';
            cartManager.cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                html += `
                    <div class="checkout-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <div>${item.name} ${item.selectedSize ? `(${item.selectedSize})` : ''}</div>
                            <div>Qty: ${item.quantity}</div>
                        </div>
                        <div>${CurrencySystem.formatPHP(itemTotal)}</div>
                    </div>
                `;
            });
            
            container.innerHTML = html;
            
            // Update totals
            const totals = cartManager.getTotalAmount();
            
            const subtotalEl = document.getElementById('checkoutSubtotal');
            const shippingEl = document.getElementById('checkoutShipping');
            const taxEl = document.getElementById('checkoutTax');
            const totalEl = document.getElementById('checkoutTotal');
            
            if (subtotalEl) subtotalEl.textContent = CurrencySystem.formatPHP(totals.subtotal);
            if (shippingEl) shippingEl.textContent = CurrencySystem.formatPHP(totals.shipping);
            if (taxEl) taxEl.textContent = CurrencySystem.formatPHP(totals.tax);
            if (totalEl) totalEl.textContent = CurrencySystem.formatPHP(totals.total);
        };
        
        // Initialize checkout items
        loadCheckoutItems();
        
        // Form submission
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (cartManager.cart.length === 0) {
                    UIComponents.showToast('Your cart is empty!', 'error');
                    return;
                }
                
                // Process order
                UIComponents.showToast('Order placed successfully!');
                cartManager.clear();
                
                // Redirect to profile
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 2000);
            });
        }
    }
    
    static initializeAdminPage() {
        const user = StorageManager.getUser();
        if (!user || !user.isLoggedIn) {
            UIComponents.showToast('Admin access required. Please login.', 'error');
            setTimeout(() => window.location.href = 'login.html', 1500);
            return;
        }
        
        // Initialize admin functionality
        this.initializeAdminForms();
        this.initializeAdminTabs();
    }
    
    static initializeAdminForms() {
        const addProductForm = document.getElementById('addProductForm');
        if (addProductForm) {
            addProductForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(addProductForm);
                const price10ml = parseFloat(formData.get('price10ml'));
                const price30ml = parseFloat(formData.get('price30ml'));
                const price50ml = parseFloat(formData.get('price50ml'));
                
                const newProduct = {
                    id: Date.now().toString(),
                    name: formData.get('name'),
                    category: formData.get('category'),
                    description: formData.get('description'),
                    image: formData.get('image') || 'https://images.unsplash.com/photo-1541643600914-78b084683601',
                    featured: formData.get('featured') === 'on',
                    bestSeller: formData.get('bestSeller') === 'on',
                    badge: 'NEW',
                    sizes: [
                        {
                            size: '10ml',
                            price: price10ml,
                            originalPrice: price10ml * 1.5,
                            discountPercentage: Math.round(((price10ml * 1.5 - price10ml) / (price10ml * 1.5)) * 100)
                        },
                        {
                            size: '30ml',
                            price: price30ml,
                            originalPrice: price30ml * 1.5,
                            discountPercentage: Math.round(((price30ml * 1.5 - price30ml) / (price30ml * 1.5)) * 100)
                        },
                        {
                            size: '50ml',
                            price: price50ml,
                            originalPrice: price50ml * 1.1,
                            discountPercentage: Math.round(((price50ml * 1.1 - price50ml) / (price50ml * 1.1)) * 100)
                        }
                    ]
                };
                
                PRODUCTS.push(newProduct);
                UIComponents.showToast(`${newProduct.name} added successfully!`);
                addProductForm.reset();
            });
        }
    }
    
    static initializeAdminTabs() {
        const tabs = document.querySelectorAll('.admin-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const isManage = tab.textContent.includes('Manage');
                if (isManage) {
                    this.showManageProducts();
                } else {
                    this.showAddProduct();
                }
            });
        });
    }
    
    static showManageProducts() {
        const mainContent = document.querySelector('main');
        if (!mainContent) return;
        
        const manageHTML = `
            <div class="manage-products">
                <h2>Product Inventory</h2>
                <p class="text-muted">${PRODUCTS.length} Products (All with 10ml, 30ml, 50ml sizes)</p>
                <div class="products-list">
                    ${PRODUCTS.map((product, index) => `
                        <div class="manage-product-item">
                            <img src="${product.image}" alt="${product.name}">
                            <div>
                                <h4>${product.name}</h4>
                                <p class="product-category">${product.category}</p>
                                <p class="product-description">${product.description.substring(0, 60)}...</p>
                                <div style="display: flex; gap: 10px; margin-top: 10px;">
                                    ${product.sizes.map(size => `
                                        <div style="background: rgba(255, 215, 0, 0.1); padding: 5px 10px; border-radius: 4px; font-size: 0.8rem;">
                                            <div>${size.size}</div>
                                            <div style="font-weight: bold;">${CurrencySystem.formatPHP(size.price)}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="product-pricing">
                                <div class="current-price">${CurrencySystem.formatPHP(product.sizes[0].price)}</div>
                                <div class="original-price">${CurrencySystem.formatPHP(product.sizes[0].originalPrice)}</div>
                                <div class="discount-badge">${product.sizes[0].discountPercentage}% OFF</div>
                            </div>
                            <div class="product-actions">
                                <button class="btn btn-outline-gold" onclick="editProduct(${index})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-black" onclick="deleteProduct(${index})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        const existingForm = mainContent.querySelector('.product-form');
        if (existingForm) existingForm.style.display = 'none';
        
        const manageContainer = document.getElementById('manageProductsContainer');
        if (manageContainer) {
            manageContainer.innerHTML = manageHTML;
        } else {
            const newContainer = document.createElement('div');
            newContainer.id = 'manageProductsContainer';
            newContainer.innerHTML = manageHTML;
            mainContent.appendChild(newContainer);
        }
    }
    
    static showAddProduct() {
        const mainContent = document.querySelector('main');
        const productForm = mainContent?.querySelector('.product-form');
        const manageContainer = document.getElementById('manageProductsContainer');
        
        if (productForm) productForm.style.display = 'block';
        if (manageContainer) manageContainer.style.display = 'none';
    }
    
    static initializeCollectionsPage() {
        // Quiz functionality
        const quizBtn = document.querySelector('.btn-gold.btn-lg');
        if (quizBtn) {
            quizBtn.addEventListener('click', () => {
                UIComponents.showToast('Quiz feature coming soon!');
            });
        }
        
        // Update collections page text
        const collectionsSubtitle = document.querySelector('.shop-header-content p.text-muted');
        if (collectionsSubtitle) {
            collectionsSubtitle.textContent = 'Premium collections, all fragrances starting from ₱99!';
        }
    }
    
    static initializeProfilePage() {
        // Initialize profile controller
        ProfileController.init();
        
        // Also update cart count
        const cartManager = new CartManager();
        const updateCartCount = () => {
            const cartCountElements = document.querySelectorAll('.cart-count');
            const totalItems = cartManager.getTotalItems();
            
            cartCountElements.forEach(element => {
                element.textContent = totalItems;
            });
        };
        updateCartCount();
    }
    
    static initializeLoginPage() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const toggleLink = document.getElementById('toggleLoginLink');
        const toggleText = document.getElementById('toggleLoginText');
        
        let showingLogin = true;
        
        if (toggleLink) {
            toggleLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (showingLogin) {
                    if (loginForm) loginForm.style.display = 'none';
                    if (registerForm) registerForm.style.display = 'block';
                    toggleLink.textContent = 'Sign In';
                    toggleText.textContent = 'Already have an account?';
                } else {
                    if (registerForm) registerForm.style.display = 'none';
                    if (loginForm) loginForm.style.display = 'block';
                    toggleLink.textContent = 'Sign Up';
                    toggleText.textContent = 'Don\'t have an account?';
                }
                
                showingLogin = !showingLogin;
            });
        }
        
        // Login form
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail')?.value;
                const password = document.getElementById('loginPassword')?.value;
                
                if (email && password) {
                    const user = {
                        name: email.split('@')[0],
                        email: email,
                        isLoggedIn: true,
                        memberSince: new Date().toISOString()
                    };
                    
                    StorageManager.saveUser(user);
                    UIComponents.showToast('Login successful!');
                    
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1500);
                }
            });
        }
        
        // Register form
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.getElementById('registerName')?.value;
                const email = document.getElementById('registerEmail')?.value;
                const password = document.getElementById('registerPassword')?.value;
                const confirmPassword = document.getElementById('registerConfirmPassword')?.value;
                
                if (password !== confirmPassword) {
                    UIComponents.showToast('Passwords do not match!', 'error');
                    return;
                }
                
                if (name && email && password) {
                    const user = {
                        name: name,
                        email: email,
                        isLoggedIn: true,
                        memberSince: new Date().toISOString()
                    };
                    
                    StorageManager.saveUser(user);
                    UIComponents.showToast('Account created successfully!');
                    
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1500);
                }
            });
        }
    }
}

// ============================================
// 9. GLOBAL FUNCTIONS
// ============================================
window.switchProfileTab = (tab) => {
    const mainContent = document.querySelector('.profile-main');
    if (!mainContent) return;
    
    // Update menu items
    const menuItems = document.querySelectorAll('.profile-menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`[onclick*="${tab}"]`);
    if (activeItem) activeItem.classList.add('active');
    
    // Update content based on tab
    switch(tab) {
        case 'dashboard':
            mainContent.innerHTML = PageController.createProfileDashboard();
            break;
        case 'orders':
            mainContent.innerHTML = `
                <div class="profile-section">
                    <h2>My Orders</h2>
                    <div class="orders-container">
                        <p class="text-muted">No orders yet</p>
                    </div>
                </div>
            `;
            break;
        case 'wishlist':
            mainContent.innerHTML = `
                <div class="profile-section">
                    <h2>My Wishlist</h2>
                    <div class="empty-wishlist">
                        <i class="fas fa-heart"></i>
                        <h4>Your wishlist is empty</h4>
                        <p>Start adding your favorite perfumes</p>
                        <a href="shop.html" class="btn btn-gold">Browse Collection</a>
                    </div>
                </div>
            `;
            break;
        case 'settings':
            const user = StorageManager.getUser();
            mainContent.innerHTML = `
                <div class="profile-section">
                    <h2>Account Settings</h2>
                    <form class="settings-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" value="${user?.name || ''}">
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" value="${user?.email || ''}">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="••••••••">
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline-gold">Cancel</button>
                            <button type="submit" class="btn btn-gold">Save Changes</button>
                        </div>
                    </form>
                </div>
            `;
            break;
    }
};

window.logout = () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('prestigeBlissUser');
        
        UIComponents.showToast('Logged out successfully');
        setTimeout(() => location.reload(), 1000);
    }
};

window.editProduct = (index) => {
    UIComponents.showToast(`Editing: ${PRODUCTS[index]?.name}`);
};

window.deleteProduct = (index) => {
    if (confirm('Are you sure you want to delete this product?')) {
        PRODUCTS.splice(index, 1);
        PageController.showManageProducts();
        UIComponents.showToast('Product deleted successfully');
    }
};

// ============================================
// 10. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    PageController.initialize();
});

// Export to window for HTML access
window.UIComponents = UIComponents;
window.CurrencySystem = CurrencySystem;
window.PageController = PageController;
window.ProfileController = ProfileController;