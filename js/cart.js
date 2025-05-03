/**
 * Cart: Shopping cart functionality
 */

const Cart = {
  /**
   * Initialize cart functionality
   */
  init() {
    // Get DOM elements
    this.cartBtn = document.getElementById('cartBtn');
    this.cartModal = document.getElementById('cartModal');
    this.cartItems = document.getElementById('cartItems');
    this.cartSubtotal = document.getElementById('cartSubtotal');
    this.cartShipping = document.getElementById('cartShipping');
    this.cartTotal = document.getElementById('cartTotal');
    this.checkoutBtn = document.getElementById('checkoutBtn');
    this.continueShoppingBtn = document.getElementById('continueShoppingBtn');
    this.closeModalBtns = document.querySelectorAll('.close-modal');
    this.cartCount = document.querySelector('.cart-count');
    
    // Mobile cart button
    this.mobileCartBtn = document.getElementById('mobileCart');
    
    // Add event listeners
    this.cartBtn.addEventListener('click', () => this.openModal());
    if (this.mobileCartBtn) {
      this.mobileCartBtn.addEventListener('click', () => this.openModal());
    }
    
    this.checkoutBtn.addEventListener('click', () => this.checkout());
    this.continueShoppingBtn.addEventListener('click', () => this.closeModal());
    
    // Close modal
    this.closeModalBtns.forEach(btn => {
      btn.addEventListener('click', () => this.closeModal());
    });
    
    // Close modal when clicking outside
    this.cartModal.addEventListener('click', (e) => {
      if (e.target === this.cartModal) {
        this.closeModal();
      }
    });
    
    // Subscribe to store changes
    store.subscribe(state => {
      this.updateUI(state);
    });
    
    // Initial UI update
    this.updateUI(store.state);
  },
  
  /**
   * Update UI based on cart state
   * @param {Object} state - Application state
   */
  updateUI(state) {
    const { cart } = state;
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    this.cartCount.textContent = totalItems;
    this.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart items
    this.cartItems.innerHTML = '';
    
    if (cart.length === 0) {
      this.cartItems.innerHTML = `
        <div class="empty-cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <p>Your cart is empty</p>
          <button class="btn-primary" onclick="Cart.closeModal()">Start Shopping</button>
        </div>
      `;
    } else {
      cart.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
          <img src="${item.images[0]}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-actions">
              <div class="quantity-control">
                <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                <input type="number" class="cart-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
              </div>
              <button class="remove-item" data-id="${item.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </button>
            </div>
          </div>
        `;
        
        this.cartItems.appendChild(cartItemEl);
      });
      
      // Add event listeners to cart item controls
      this.setupCartItemControls();
    }
    
    // Update cart summary
    const subtotal = store.getCartTotal();
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;
    
    this.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    this.cartShipping.textContent = subtotal > 0 ? `$${shipping.toFixed(2)}` : 'Free';
    this.cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Enable/disable checkout button
    this.checkoutBtn.disabled = cart.length === 0;
  },
  
  /**
   * Set up event listeners for cart item controls
   */
  setupCartItemControls() {
    // Quantity decrease buttons
    document.querySelectorAll('.quantity-btn[data-action="decrease"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = parseInt(btn.getAttribute('data-id'));
        const item = store.state.cart.find(item => item.id === productId);
        if (item.quantity > 1) {
          this.updateItemQuantity(productId, item.quantity - 1);
        }
      });
    });
    
    // Quantity increase buttons
    document.querySelectorAll('.quantity-btn[data-action="increase"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = parseInt(btn.getAttribute('data-id'));
        const item = store.state.cart.find(item => item.id === productId);
        this.updateItemQuantity(productId, item.quantity + 1);
      });
    });
    
    // Quantity input fields
    document.querySelectorAll('.cart-quantity').forEach(input => {
      input.addEventListener('change', () => {
        const productId = parseInt(input.getAttribute('data-id'));
        const quantity = parseInt(input.value) || 1;
        this.updateItemQuantity(productId, quantity);
      });
    });
    
    // Remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = parseInt(btn.getAttribute('data-id'));
        this.removeItem(productId);
      });
    });
  },
  
  /**
   * Open cart modal
   */
  openModal() {
    this.cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  
  /**
   * Close cart modal
   */
  closeModal() {
    this.cartModal.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  /**
   * Add an item to the cart
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add
   */
  addItem(product, quantity = 1) {
    store.addToCart(product, quantity);
    UI.showToast('success', 'Added to Cart', `${product.title} has been added to your cart.`);
  },
  
  /**
   * Update cart item quantity
   * @param {number} productId - Product ID
   * @param {number} quantity - New quantity
   */
  updateItemQuantity(productId, quantity) {
    store.updateCartItemQuantity(productId, quantity);
  },
  
  /**
   * Remove item from cart
   * @param {number} productId - Product ID
   */
  removeItem(productId) {
    const product = store.state.cart.find(item => item.id === productId);
    store.removeFromCart(productId);
    
    if (product) {
      UI.showToast('info', 'Removed from Cart', `${product.title} has been removed from your cart.`);
    }
  },
  
  /**
   * Clear all items from cart
   */
  clearCart() {
    store.clearCart();
    UI.showToast('info', 'Cart Cleared', 'All items have been removed from your cart.');
  },
  
  /**
   * Process checkout
   */
  checkout() {
    // Check if user is logged in
    if (!store.state.user) {
      UI.showToast('warning', 'Please Sign In', 'You need to sign in before checkout.');
      this.closeModal();
      Auth.openModal();
      return;
    }
    
    // Create order
    const orderData = {
      items: store.state.cart,
      total: store.getCartTotal() + 10, // Add shipping
      shipping: 10,
      status: 'pending',
      date: new Date().toISOString()
    };
    
    store.createOrder(orderData)
      .then(() => {
        UI.showToast('success', 'Order Placed', 'Your order has been placed successfully!');
        this.closeModal();
        Router.navigateTo('profile');
      })
      .catch(error => {
        UI.showToast('error', 'Checkout Failed', error.message);
      });
  }
};

// Export Cart module
window.Cart = Cart;