/**
 * Router: Handles navigation between pages
 */

const Router = {
  /**
   * Initialize router functionality
   */
  init() {
    // Initialize current route
    this.currentRoute = {
      page: 'home',
      params: null
    };
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state) {
        this.currentRoute = e.state;
        this.renderCurrentRoute();
      }
    });
    
    // Initial render
    this.renderCurrentRoute();
  },
  
  /**
   * Navigate to a specific page
   * @param {string} page - Page to navigate to
   * @param {any} params - Optional parameters for the page
   */
  navigateTo(page, params = null) {
    this.currentRoute = { page, params };
    
    // Update browser history
    window.history.pushState(
      this.currentRoute,
      '',
      `#${page}${params ? '/' + params : ''}`
    );
    
    this.renderCurrentRoute();
  },
  
  /**
   * Render the current route
   */
  renderCurrentRoute() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<div class="loading">Loading...</div>';
    
    switch (this.currentRoute.page) {
      case 'home':
        this.renderHomePage(mainContent);
        break;
      case 'product':
        this.renderProductPage(mainContent, this.currentRoute.params);
        break;
      case 'category':
        this.renderCategoryPage(mainContent, this.currentRoute.params);
        break;
      case 'search':
        this.renderSearchPage(mainContent, this.currentRoute.params);
        break;
      case 'wishlist':
        this.renderWishlistPage(mainContent);
        break;
      case 'profile':
        this.renderProfilePage(mainContent);
        break;
      case 'products':
        this.renderProductsPage(mainContent);
        break;
      case 'categories':
        this.renderCategoriesPage(mainContent);
        break;
      default:
        this.renderHomePage(mainContent);
    }
  },
  
  /**
   * Render home page
   * @param {HTMLElement} container - Container to render in
   */
  async renderHomePage(container) {
    container.innerHTML = UI.renderHomePage();
    
    // Load categories
    try {
      await store.fetchCategories();
      const categories = store.state.categories;
      const categoryCards = document.getElementById('categoryCards');
      
      // Display up to 6 categories
      const limitedCategories = categories.slice(0, 6);
      
      categoryCards.innerHTML = limitedCategories.map(category => `
        <div class="category-card" onclick="Router.navigateTo('category', ${category.id})">
          <img src="${category.image}" alt="${category.name}" class="category-image">
          <div class="category-overlay">
            <div class="category-name">${category.name}</div>
          </div>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error loading categories:', error);
    }
    
    // Load featured products
    try {
      await store.fetchFeaturedProducts();
      const featuredProducts = store.state.featuredProducts || [];
      const featuredProductsEl = document.getElementById('featuredProducts');
      
      featuredProductsEl.innerHTML = featuredProducts.map(product => 
        UI.renderProductCard(product)
      ).join('');
      
      // Add event listeners for wishlist and cart buttons
      this.setupProductCardEventListeners();
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  },
  
  /**
   * Render product page
   * @param {HTMLElement} container - Container to render in
   * @param {number} productId - Product ID
   */
  async renderProductPage(container, productId) {
    try {
      const id = parseInt(productId);
      const product = await store.fetchProductById(id);
      
      container.innerHTML = UI.renderProductDetail(product);
      
      // Add event listeners
      document.querySelector('.add-to-cart').addEventListener('click', () => {
        Cart.addItem(product);
      });
      
      document.querySelector('.add-to-wishlist').addEventListener('click', () => {
        const isInWishlist = Wishlist.toggleItem(product);
        document.querySelector('.add-to-wishlist').classList.toggle('active', isInWishlist);
      });
    } catch (error) {
      container.innerHTML = `
        <div class="container">
          <div class="error-state">
            <h2>Product Not Found</h2>
            <p>Sorry, the product you are looking for does not exist.</p>
            <button class="btn-primary" onclick="Router.navigateTo('home')">Back to Home</button>
          </div>
        </div>
      `;
      console.error('Error loading product:', error);
    }
  },
  
  /**
   * Render category page
   * @param {HTMLElement} container - Container to render in
   * @param {number} categoryId - Category ID
   */
  async renderCategoryPage(container, categoryId) {
    try {
      const id = parseInt(categoryId);
      await store.fetchProductsByCategory(id);
      const category = await store.getCategoryById(id);
      const products = store.state.categoryProducts || [];
      
      container.innerHTML = `
        <div class="container">
          <h1 class="section-title">${category.name}</h1>
          <p class="section-description">${category.description}</p>
          
          <div class="product-grid">
            ${products.length > 0 
              ? products.map(product => UI.renderProductCard(product)).join('') 
              : '<div class="empty-state"><p>No products found in this category.</p></div>'}
          </div>
        </div>
      `;
      
      // Add event listeners for wishlist and cart buttons
      this.setupProductCardEventListeners();
    } catch (error) {
      container.innerHTML = `
        <div class="container">
          <div class="error-state">
            <h2>Category Not Found</h2>
            <p>Sorry, the category you are looking for does not exist.</p>
            <button class="btn-primary" onclick="Router.navigateTo('home')">Back to Home</button>
          </div>
        </div>
      `;
      console.error('Error loading category:', error);
    }
  },
  
  /**
   * Render search results page
   * @param {HTMLElement} container - Container to render in
   * @param {string} keyword - Search keyword
   */
  async renderSearchPage(container, keyword) {
    try {
      await store.searchProducts(keyword);
      const results = store.state.searchResults || [];
      
      container.innerHTML = `
        <div class="container">
          <h1 class="section-title">Search Results for "${keyword}"</h1>
          
          <div class="product-grid">
            ${results.length > 0 
              ? results.map(product => UI.renderProductCard(product)).join('') 
              : '<div class="empty-state"><p>No products found matching your search.</p></div>'}
          </div>
        </div>
      `;
      
      // Add event listeners for wishlist and cart buttons
      this.setupProductCardEventListeners();
    } catch (error) {
      console.error('Error searching products:', error);
    }
  },
  
  /**
   * Render wishlist page
   * @param {HTMLElement} container - Container to render in
   */
  renderWishlistPage(container) {
    container.innerHTML = Wishlist.renderWishlistPage();
    
    // Add event listeners for wishlist and cart buttons
    this.setupProductCardEventListeners();
  },
  
  /**
   * Render profile page
   * @param {HTMLElement} container - Container to render in
   */
  renderProfilePage(container) {
    const { user } = store.state;
    
    if (!user) {
      container.innerHTML = `
        <div class="container">
          <div class="auth-required">
            <h2>Sign In Required</h2>
            <p>Please sign in to view your profile.</p>
            <button class="btn-primary" onclick="Auth.openModal()">Sign In</button>
          </div>
        </div>
      `;
      return;
    }
    
    container.innerHTML = `
      <div class="container">
        <h1 class="section-title">My Account</h1>
        
        <div class="profile-container">
          <div class="profile-sidebar">
            <div class="profile-user">
              <div class="profile-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h3>${user.name}</h3>
              <p>${user.email}</p>
            </div>
            
            <ul class="profile-menu">
              <li class="active">Dashboard</li>
              <li>Orders</li>
              <li>Addresses</li>
              <li>Payment Methods</li>
              <li>Account Details</li>
              <li id="logoutBtn">Logout</li>
            </ul>
          </div>
          
          <div class="profile-content">
            <h2>Dashboard</h2>
            <p>Hello, ${user.name}! From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
            
            <div class="dashboard-cards">
              <div class="dashboard-card">
                <h3>Orders</h3>
                <p>View and track your orders</p>
              </div>
              <div class="dashboard-card">
                <h3>Wishlist</h3>
                <p>${store.state.wishlist.length} items in your wishlist</p>
              </div>
              <div class="dashboard-card">
                <h3>Cart</h3>
                <p>${store.state.cart.length} items in your cart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add logout event listener
    document.getElementById('logoutBtn').addEventListener('click', () => {
      Auth.logout();
    });
  },
  
  /**
   * Render all products page
   * @param {HTMLElement} container - Container to render in
   */
  async renderProductsPage(container) {
    try {
      await store.fetchProducts();
      const products = store.state.products || [];
      
      container.innerHTML = `
        <div class="container">
          <h1 class="section-title">All Products</h1>
          
          <div class="product-grid">
            ${products.map(product => UI.renderProductCard(product)).join('')}
          </div>
        </div>
      `;
      
      // Add event listeners for wishlist and cart buttons
      this.setupProductCardEventListeners();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  },
  
  /**
   * Render all categories page
   * @param {HTMLElement} container - Container to render in
   */
  async renderCategoriesPage(container) {
    try {
      await store.fetchCategories();
      const categories = store.state.categories || [];
      
      container.innerHTML = `
        <div class="container">
          <h1 class="section-title">All Categories</h1>
          
          <div class="categories-grid">
            ${categories.map(category => `
              <div class="category-card" onclick="Router.navigateTo('category', ${category.id})">
                <img src="${category.image}" alt="${category.name}" class="category-image">
                <div class="category-overlay">
                  <div class="category-name">${category.name}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  },
  
  /**
   * Setup event listeners for product card buttons
   */
  setupProductCardEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', async () => {
        const productId = parseInt(btn.getAttribute('data-id'));
        try {
          const product = await API.getProductById(productId);
          Cart.addItem(product);
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      });
    });
    
    // Wishlist toggle buttons
    document.querySelectorAll('.product-wishlist').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.getAttribute('data-id'));
        try {
          const product = await API.getProductById(productId);
          const isInWishlist = Wishlist.toggleItem(product);
          btn.classList.toggle('active', isInWishlist);
        } catch (error) {
          console.error('Error toggling wishlist:', error);
        }
      });
    });
  }
};

// Export Router module
window.Router = Router;