/**
 * Store: Centralized state management
 */

class Store {
  constructor() {
    this.state = {
      products: [],
      categories: [],
      cart: [],
      wishlist: [],
      user: null,
      isLoading: false,
      error: null,
      theme: localStorage.getItem('theme') || 'light'
    };
    
    this.listeners = [];
    
    // Initialize from localStorage
    this.initFromStorage();
  }
  
  /**
   * Initialize state from localStorage
   */
  initFromStorage() {
    try {
      // Cart
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.state.cart = JSON.parse(savedCart);
      }
      
      // Wishlist
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        this.state.wishlist = JSON.parse(savedWishlist);
      }
      
      // User
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.state.user = JSON.parse(savedUser);
      }
      
      // Theme
      document.documentElement.classList.toggle('dark', this.state.theme === 'dark');
    } catch (error) {
      console.error('Error initializing from localStorage:', error);
    }
  }
  
  /**
   * Subscribe to state changes
   * @param {Function} listener - Callback function when state changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  /**
   * Notify all listeners of state change
   */
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
  
  /**
   * Update state
   * @param {Object} newState - Partial state to update
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
    
    // Persist relevant state to localStorage
    this.persistToStorage();
  }
  
  /**
   * Persist state to localStorage
   */
  persistToStorage() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.state.cart));
      localStorage.setItem('wishlist', JSON.stringify(this.state.wishlist));
      localStorage.setItem('theme', this.state.theme);
      
      if (this.state.user) {
        localStorage.setItem('user', JSON.stringify(this.state.user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error persisting to localStorage:', error);
    }
  }
  
  /**
   * Fetch all products
   */
  async fetchProducts() {
    try {
      this.setState({ isLoading: true, error: null });
      const products = await API.getProducts();
      this.setState({ products, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }
  
  /**
   * Fetch featured products
   */
  async fetchFeaturedProducts() {
    try {
      this.setState({ isLoading: true, error: null });
      const products = await API.getFeaturedProducts();
      this.setState({ featuredProducts: products, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }
  
  /**
   * Fetch all categories
   */
  async fetchCategories() {
    try {
      this.setState({ isLoading: true, error: null });
      const categories = await API.getCategories();
      this.setState({ categories, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }
  
  /**
   * Fetch products by category ID
   * @param {number} categoryId - Category ID
   */
  async fetchProductsByCategory(categoryId) {
    try {
      this.setState({ isLoading: true, error: null });
      const products = await API.getProductsByCategory(categoryId);
      this.setState({ categoryProducts: products, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }
  
  /**
   * Fetch a product by ID
   * @param {number} productId - Product ID
   */
  async fetchProductById(productId) {
    try {
      this.setState({ isLoading: true, error: null });
      const product = await API.getProductById(productId);
      this.setState({ currentProduct: product, isLoading: false });
      return product;
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
      throw error;
    }
  }
  
  /**
   * Search products by keyword
   * @param {string} keyword - Search keyword
   */
  async searchProducts(keyword) {
    try {
      this.setState({ isLoading: true, error: null });
      const products = await API.searchProducts(keyword);
      this.setState({ searchResults: products, isLoading: false });
      return products;
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
      throw error;
    }
  }
  
  /**
   * Add item to cart
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add
   */
  addToCart(product, quantity = 1) {
    const existingItem = this.state.cart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = this.state.cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      );
    } else {
      updatedCart = [...this.state.cart, { ...product, quantity }];
    }
    
    this.setState({ cart: updatedCart });
  }
  
  /**
   * Update cart item quantity
   * @param {number} productId - Product ID
   * @param {number} quantity - New quantity
   */
  updateCartItemQuantity(productId, quantity) {
    const updatedCart = this.state.cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: Math.max(1, quantity) } 
        : item
    );
    
    this.setState({ cart: updatedCart });
  }
  
  /**
   * Remove item from cart
   * @param {number} productId - Product ID to remove
   */
  removeFromCart(productId) {
    const updatedCart = this.state.cart.filter(item => item.id !== productId);
    this.setState({ cart: updatedCart });
  }
  
  /**
   * Clear the entire cart
   */
  clearCart() {
    this.setState({ cart: [] });
  }
  
  /**
   * Calculate cart total
   * @returns {number} Cart total price
   */
  getCartTotal() {
    return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  /**
   * Add item to wishlist
   * @param {Object} product - Product to add
   */
  addToWishlist(product) {
    const existingItem = this.state.wishlist.find(item => item.id === product.id);
    
    if (!existingItem) {
      const updatedWishlist = [...this.state.wishlist, product];
      this.setState({ wishlist: updatedWishlist });
    }
  }
  
  /**
   * Remove item from wishlist
   * @param {number} productId - Product ID to remove
   */
  removeFromWishlist(productId) {
    const updatedWishlist = this.state.wishlist.filter(item => item.id !== productId);
    this.setState({ wishlist: updatedWishlist });
  }
  
  /**
   * Check if item is in wishlist
   * @param {number} productId - Product ID to check
   * @returns {boolean} True if product is in wishlist
   */
  isInWishlist(productId) {
    return this.state.wishlist.some(item => item.id === productId);
  }
  
  /**
   * Register user
   * @param {Object} userData - User registration data
   */
  async registerUser(userData) {
    try {
      this.setState({ isLoading: true, error: null });
      const user = await API.registerUser(userData);
      this.setState({ user, isLoading: false });
      return user;
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
      throw error;
    }
  }
  
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async loginUser(email, password) {
    try {
      this.setState({ isLoading: true, error: null });
      const user = await API.loginUser(email, password);
      this.setState({ user, isLoading: false });
      return user;
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
      throw error;
    }
  }
  
  /**
   * Logout user
   */
  logoutUser() {
    this.setState({ user: null });
    localStorage.removeItem('user');
  }
  
  /**
   * Create an order
   * @param {Object} orderData - Order data
   */
  async createOrder(orderData) {
    try {
      this.setState({ isLoading: true, error: null });
      const order = await API.createOrder({
        ...orderData,
        userId: this.state.user ? this.state.user.id : null
      });
      
      // Send order notification to Telegram
      try {
        await Telegram.sendOrderNotification(order);
      } catch (error) {
        console.error('Error sending Telegram notification:', error);
      }
      
      // Clear cart after successful order
      this.clearCart();
      
      this.setState({ isLoading: false });
      return order;
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
      throw error;
    }
  }
  
  /**
   * Toggle theme between light and dark
   */
  toggleTheme() {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({ theme: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }
}

// Initialize store
const store = new Store();

// Export the store
window.store = store;