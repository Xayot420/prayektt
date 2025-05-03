/**
 * Wishlist: Wishlist functionality
 */

const Wishlist = {
  /**
   * Initialize wishlist functionality
   */
  init() {
    // Get DOM elements
    this.wishlistBtn = document.getElementById('wishlistBtn');
    this.wishlistCount = document.querySelector('.wishlist-count');
    
    // Mobile wishlist button
    this.mobileWishlistBtn = document.getElementById('mobileWishlist');
    
    // Add event listeners
    this.wishlistBtn.addEventListener('click', () => {
      Router.navigateTo('wishlist');
    });
    
    if (this.mobileWishlistBtn) {
      this.mobileWishlistBtn.addEventListener('click', () => {
        Router.navigateTo('wishlist');
        UI.closeMobileMenu();
      });
    }
    
    // Subscribe to store changes
    store.subscribe(state => {
      this.updateUI(state);
    });
    
    // Initial UI update
    this.updateUI(store.state);
  },
  
  /**
   * Update UI based on wishlist state
   * @param {Object} state - Application state
   */
  updateUI(state) {
    const { wishlist } = state;
    
    // Update wishlist count
    this.wishlistCount.textContent = wishlist.length;
    this.wishlistCount.style.display = wishlist.length > 0 ? 'flex' : 'none';
  },
  
  /**
   * Toggle item in wishlist
   * @param {Object} product - Product to toggle
   * @returns {boolean} - New wishlist state for the product
   */
  toggleItem(product) {
    const isInWishlist = store.isInWishlist(product.id);
    
    if (isInWishlist) {
      store.removeFromWishlist(product.id);
      UI.showToast('info', 'Removed from Wishlist', `${product.title} has been removed from your wishlist.`);
      return false;
    } else {
      store.addToWishlist(product);
      UI.showToast('success', 'Added to Wishlist', `${product.title} has been added to your wishlist.`);
      return true;
    }
  },
  
  /**
   * Render wishlist page
   * @returns {string} HTML content for wishlist page
   */
  renderWishlistPage() {
    const { wishlist } = store.state;
    
    let html = `
      <div class="container">
        <h1 class="section-title">My Wishlist</h1>
        
        <div class="wishlist-container">
    `;
    
    if (wishlist.length === 0) {
      html += `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.74-4.5 2.05A5.5 5.5 0 0 0 4.5 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          <h3>Your wishlist is empty</h3>
          <p>Add items to your wishlist to save them for later.</p>
          <button class="btn-primary" onclick="Router.navigateTo('home')">Start Shopping</button>
        </div>
      `;
    } else {
      html += `<div class="product-grid">`;
      
      wishlist.forEach(product => {
        html += UI.renderProductCard(product);
      });
      
      html += `</div>`;
    }
    
    html += `
        </div>
      </div>
    `;
    
    return html;
  }
};

// Export Wishlist module
window.Wishlist = Wishlist;