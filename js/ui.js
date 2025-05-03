/**
 * UI: User Interface functionality
 */

const UI = {
  /**
   * Initialize UI functionality
   */
  init() {
    // Theme toggle
    this.themeToggle = document.getElementById('themeToggle');
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Mobile menu
    this.menuToggle = document.getElementById('menuToggle');
    this.closeMenu = document.getElementById('closeMenu');
    this.mobileMenu = document.getElementById('mobileMenu');
    this.mobileHome = document.getElementById('mobileHome');
    
    this.menuToggle.addEventListener('click', () => this.openMobileMenu());
    this.closeMenu.addEventListener('click', () => this.closeMobileMenu());
    this.mobileHome.addEventListener('click', () => {
      Router.navigateTo('home');
      this.closeMobileMenu();
    });
    
    // Categories dropdown
    this.categoriesBtn = document.querySelector('.categories-btn');
    this.categoriesMenu = document.querySelector('.categories-menu');
    this.mobileCategoriesEl = document.querySelector('.mobile-categories');
    
    if (this.categoriesBtn) {
      this.categoriesBtn.addEventListener('click', () => this.toggleCategoriesMenu());
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.categories-dropdown') && this.categoriesMenu.classList.contains('active')) {
          this.categoriesMenu.classList.remove('active');
        }
      });
    }
    
    // Fetch and render categories
    this.loadCategories();
    
    // Search functionality
    this.searchInput = document.getElementById('searchInput');
    this.searchBtn = document.getElementById('searchBtn');
    this.searchResults = document.getElementById('searchResults');
    
    this.searchInput.addEventListener('focus', () => this.showSearchResults());
    this.searchInput.addEventListener('input', () => this.handleSearch());
    this.searchBtn.addEventListener('click', () => this.handleSearch());
    
    // Mobile search
    this.mobileSearchInput = document.getElementById('mobileSearchInput');
    this.mobileSearchBtn = document.getElementById('mobileSearchBtn');
    
    if (this.mobileSearchInput && this.mobileSearchBtn) {
      this.mobileSearchBtn.addEventListener('click', () => {
        const keyword = this.mobileSearchInput.value.trim();
        if (keyword) {
          Router.navigateTo('search', keyword);
          this.closeMobileMenu();
        }
      });
      
      this.mobileSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const keyword = this.mobileSearchInput.value.trim();
          if (keyword) {
            Router.navigateTo('search', keyword);
            this.closeMobileMenu();
          }
        }
      });
    }
    
    // Footer links
    document.getElementById('homeLink').addEventListener('click', (e) => {
      e.preventDefault();
      Router.navigateTo('home');
    });
    
    document.getElementById('productsLink').addEventListener('click', (e) => {
      e.preventDefault();
      Router.navigateTo('products');
    });
    
    document.getElementById('categoriesLink').addEventListener('click', (e) => {
      e.preventDefault();
      Router.navigateTo('categories');
    });
    
    // Subscribe to store changes
    store.subscribe(state => {
      this.updateUI(state);
    });
    
    // Initialize toast container
    this.toastContainer = document.getElementById('toastContainer');
    
    // Initial UI update based on current theme
    this.updateUI(store.state);
  },
  
  /**
   * Update UI based on application state
   * @param {Object} state - Application state
   */
  updateUI(state) {
    const { theme } = state;
    
    // Update theme icon
    this.themeToggle.innerHTML = theme === 'dark' 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
  },
  
  /**
   * Toggle theme between light and dark
   */
  toggleTheme() {
    store.toggleTheme();
  },
  
  /**
   * Open mobile menu
   */
  openMobileMenu() {
    this.mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  
  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  /**
   * Toggle categories menu
   */
  toggleCategoriesMenu() {
    this.categoriesMenu.classList.toggle('active');
  },
  
  /**
   * Load and render categories
   */
  async loadCategories() {
    try {
      await store.fetchCategories();
      const { categories } = store.state;
      
      // Render categories in dropdown
      this.categoriesMenu.innerHTML = '';
      categories.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'category-item';
        categoryEl.textContent = category.name;
        categoryEl.addEventListener('click', () => {
          Router.navigateTo('category', category.id);
          this.categoriesMenu.classList.remove('active');
        });
        
        this.categoriesMenu.appendChild(categoryEl);
      });
      
      // Render categories in mobile menu
      if (this.mobileCategoriesEl) {
        this.mobileCategoriesEl.innerHTML = '';
        categories.forEach(category => {
          const categoryEl = document.createElement('li');
          categoryEl.textContent = category.name;
          categoryEl.addEventListener('click', () => {
            Router.navigateTo('category', category.id);
            this.closeMobileMenu();
          });
          
          this.mobileCategoriesEl.appendChild(categoryEl);
        });
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  },
  
  /**
   * Show search results container
   */
  showSearchResults() {
    if (this.searchInput.value.trim()) {
      this.searchResults.classList.add('active');
      this.handleSearch();
    }
    
    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        this.searchResults.classList.remove('active');
      }
    });
  },
  
  /**
   * Handle search input
   */
  async handleSearch() {
    const keyword = this.searchInput.value.trim();
    
    if (!keyword) {
      this.searchResults.classList.remove('active');
      return;
    }
    
    try {
      const results = await store.searchProducts(keyword);
      
      if (results.length === 0) {
        this.searchResults.innerHTML = `
          <div class="search-no-results">
            <p>No results found for "${keyword}"</p>
          </div>
        `;
      } else {
        this.searchResults.innerHTML = '';
        
        // Limit to 5 results in dropdown
        const limitedResults = results.slice(0, 5);
        
        limitedResults.forEach(product => {
          const searchItem = document.createElement('div');
          searchItem.className = 'search-item';
          searchItem.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}" class="search-item-image">
            <div class="search-item-info">
              <h4 class="search-item-title">${product.title}</h4>
              <div class="search-item-price">$${product.price.toFixed(2)}</div>
            </div>
          `;
          
          searchItem.addEventListener('click', () => {
            Router.navigateTo('product', product.id);
            this.searchResults.classList.remove('active');
            this.searchInput.value = '';
          });
          
          this.searchResults.appendChild(searchItem);
        });
        
        // Add "View all results" link if there are more results
        if (results.length > 5) {
          const viewAllLink = document.createElement('div');
          viewAllLink.className = 'search-view-all';
          viewAllLink.innerHTML = `<a href="#">View all ${results.length} results for "${keyword}"</a>`;
          
          viewAllLink.addEventListener('click', (e) => {
            e.preventDefault();
            Router.navigateTo('search', keyword);
            this.searchResults.classList.remove('active');
          });
          
          this.searchResults.appendChild(viewAllLink);
        }
      }
      
      this.searchResults.classList.add('active');
    } catch (error) {
      console.error('Error searching products:', error);
    }
  },
  
  /**
   * Show toast notification
   * @param {string} type - Toast type (success, error, warning, info)
   * @param {string} title - Toast title
   * @param {string} message - Toast message
   * @param {number} duration - Display duration in ms
   */
  showToast(type, title, message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '';
    switch (type) {
      case 'success':
        icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
        break;
      case 'error':
        icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>';
        break;
      case 'warning':
        icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
        break;
      case 'info':
        icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
        break;
    }
    
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <h4 class="toast-title">${title}</h4>
        <p class="toast-message">${message}</p>
      </div>
      <button class="toast-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    `;
    
    this.toastContainer.appendChild(toast);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      this.toastContainer.removeChild(toast);
    });
    
    // Auto remove after duration
    setTimeout(() => {
      if (toast.parentNode === this.toastContainer) {
        this.toastContainer.removeChild(toast);
      }
    }, duration);
  },
  
  /**
   * Render a product card
   * @param {Object} product - Product data
   * @returns {string} HTML for product card
   */
  renderProductCard(product) {
    const isInWishlist = store.isInWishlist(product.id);
    
    return `
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.images[0]}" alt="${product.title}" class="product-image">
          <button class="product-wishlist ${isInWishlist ? 'active' : ''}" data-id="${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isInWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.74-4.5 2.05A5.5 5.5 0 0 0 4.5 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
          ${product.discount > 0 ? `<div class="product-discount">-${product.discount}%</div>` : ''}
        </div>
        <div class="product-content">
          <div class="product-category">${product.category}</div>
          <h3 class="product-title" onclick="Router.navigateTo('product', ${product.id})">${product.title}</h3>
          <div class="product-price">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <div class="product-rating">
            <div class="rating-stars">
              ${this.renderStars(product.rating)}
            </div>
            <span class="rating-count">(${product.ratingCount})</span>
          </div>
          <div class="product-action">
            <button class="btn-primary add-to-cart" data-id="${product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  },
  
  /**
   * Render star rating
   * @param {number} rating - Rating value
   * @returns {string} HTML for star rating
   */
  renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
    
    // Half star
    if (halfStar) {
      stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-half"><path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"/></svg>`;
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
    
    return stars;
  },
  
  /**
   * Render product detail page
   * @param {Object} product - Product data
   * @returns {string} HTML for product detail page
   */
  renderProductDetail(product) {
    const isInWishlist = store.isInWishlist(product.id);
    
    return `
      <div class="container">
        <div class="product-detail">
          <div class="product-detail-gallery">
            <img src="${product.images[0]}" alt="${product.title}" class="product-detail-image" id="mainProductImage">
            <div class="product-thumbnails">
              ${product.images.map((img, index) => `
                <img src="${img}" alt="${product.title}" class="product-thumbnail ${index === 0 ? 'active' : ''}" onclick="UI.changeProductImage(this.src)">
              `).join('')}
            </div>
          </div>
          <div class="product-detail-info">
            <div class="product-detail-category">${product.category}</div>
            <h1 class="product-detail-title">${product.title}</h1>
            <div class="product-detail-price">
              <span class="product-detail-current-price">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="product-detail-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-detail-rating">
              <div class="rating-stars">
                ${this.renderStars(product.rating)}
              </div>
              <span class="rating-count">${product.ratingCount} Reviews</span>
            </div>
            <p class="product-detail-description">${product.description}</p>
            <div class="product-detail-features">
              <h4>Key Features</h4>
              <ul class="feature-list">
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
            <div class="product-stock">
              <span class="${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                ${product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
            <div class="product-detail-actions">
              <button class="btn-primary add-to-cart" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                Add to Cart
              </button>
              <button class="add-to-wishlist ${isInWishlist ? 'active' : ''}" data-id="${product.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isInWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.74-4.5 2.05A5.5 5.5 0 0 0 4.5 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  /**
   * Change product image in gallery
   * @param {string} src - Image source URL
   */
  changeProductImage(src) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
      mainImage.src = src;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.product-thumbnail').forEach(thumb => {
      thumb.classList.toggle('active', thumb.src === src);
    });
  },
  
  /**
   * Render home page
   * @returns {string} HTML for home page
   */
  renderHomePage() {
    return `
      <div class="banner">
        <img src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Banner" class="banner-image">
        <div class="banner-content">
          <div class="banner-subtitle">New Arrivals</div>
          <h1 class="banner-title">Discover Our Premium Collection</h1>
          <p>Quality products for every need. Shop now and enjoy free shipping on all orders.</p>
          <div class="banner-action">
            <button class="btn-primary" onclick="Router.navigateTo('products')">Shop Now</button>
          </div>
        </div>
      </div>
      
      <div class="container">
        <div class="category-section">
          <div class="section-header">
            <h2 class="section-title">Shop by Category</h2>
            <a href="#" class="see-all" onclick="event.preventDefault(); Router.navigateTo('categories');">See All</a>
          </div>
          <div class="category-cards" id="categoryCards">
            <!-- Categories will be loaded here -->
          </div>
        </div>
        
        <div class="category-section">
          <div class="section-header">
            <h2 class="section-title">Featured Products</h2>
            <a href="#" class="see-all" onclick="event.preventDefault(); Router.navigateTo('products');">See All</a>
          </div>
          <div class="product-grid" id="featuredProducts">
            <!-- Featured products will be loaded here -->
          </div>
        </div>
      </div>
    `;
  }
};

// Export UI module
window.UI = UI;