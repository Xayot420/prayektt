/**
 * Mock API service to mimic backend functionality
 */

const API = {
  /**
   * Products data
   */
  products: [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 129.99,
      originalPrice: 199.99,
      discount: 35,
      rating: 4.8,
      ratingCount: 342,
      category: "Electronics",
      categoryId: 1,
      description: "Experience crystal-clear sound with these premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable memory foam ear cups.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Bluetooth 5.2 connectivity",
        "Memory foam ear cups",
        "Built-in microphone for calls"
      ],
      images: [
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 24,
      isFeatured: true
    },
    {
      id: 2,
      title: "Smart 4K Ultra HD TV - 55 inch",
      price: 499.99,
      originalPrice: 699.99,
      discount: 28,
      rating: 4.6,
      ratingCount: 529,
      category: "Electronics",
      categoryId: 1,
      description: "Transform your home entertainment with this 55-inch 4K Ultra HD Smart TV. Features HDR technology, built-in voice assistant, and seamless streaming from all popular services.",
      features: [
        "4K Ultra HD resolution (3840 x 2160)",
        "HDR technology for vibrant colors",
        "Built-in voice assistant",
        "Smart platform with popular streaming apps",
        "Multiple HDMI and USB ports"
      ],
      images: [
        "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 15,
      isFeatured: true
    },
    {
      id: 3,
      title: "Designer Leather Crossbody Bag",
      price: 89.99,
      originalPrice: 129.99,
      discount: 30,
      rating: 4.7,
      ratingCount: 276,
      category: "Fashion",
      categoryId: 2,
      description: "Elevate your style with this elegant leather crossbody bag. Features premium genuine leather, adjustable strap, and multiple compartments for organization.",
      features: [
        "100% genuine leather",
        "Adjustable shoulder strap",
        "Multiple interior compartments",
        "Secure zipper closure",
        "Water-resistant lining"
      ],
      images: [
        "https://images.pexels.com/photos/12446212/pexels-photo-12446212.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/5705506/pexels-photo-5705506.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6044254/pexels-photo-6044254.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 32,
      isFeatured: false
    },
    {
      id: 4,
      title: "Professional Stainless Steel Cookware Set",
      price: 249.99,
      originalPrice: 399.99,
      discount: 37,
      rating: 4.9,
      ratingCount: 413,
      category: "Home & Kitchen",
      categoryId: 3,
      description: "Upgrade your kitchen with this premium 10-piece stainless steel cookware set. Features tri-ply construction for even heat distribution, dishwasher-safe pieces, and ergonomic handles.",
      features: [
        "10-piece comprehensive set",
        "Tri-ply stainless steel construction",
        "Compatible with all cooktops including induction",
        "Dishwasher safe",
        "Oven safe up to 500°F"
      ],
      images: [
        "https://images.pexels.com/photos/6996014/pexels-photo-6996014.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6996075/pexels-photo-6996075.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6996077/pexels-photo-6996077.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 18,
      isFeatured: true
    },
    {
      id: 5,
      title: "Organic Cotton Bedding Set - Queen",
      price: 119.99,
      originalPrice: 149.99,
      discount: 20,
      rating: 4.7,
      ratingCount: 189,
      category: "Home & Kitchen",
      categoryId: 3,
      description: "Experience luxury with this organic cotton bedding set. Includes 1 fitted sheet, 1 flat sheet, and 2 pillowcases. Made from 100% GOTS-certified organic cotton for softness and sustainability.",
      features: [
        "100% GOTS-certified organic cotton",
        "300 thread count for softness",
        "Naturally hypoallergenic",
        "Pre-shrunk fabric",
        "Easy care - machine washable"
      ],
      images: [
        "https://images.pexels.com/photos/6186812/pexels-photo-6186812.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6585763/pexels-photo-6585763.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6186824/pexels-photo-6186824.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 27,
      isFeatured: false
    },
    {
      id: 6,
      title: "Smartwatch with Health Tracking",
      price: 159.99,
      originalPrice: 199.99,
      discount: 20,
      rating: 4.5,
      ratingCount: 312,
      category: "Electronics",
      categoryId: 1,
      description: "Monitor your health and stay connected with this advanced smartwatch. Features continuous heart rate monitoring, sleep tracking, and a bright AMOLED display.",
      features: [
        "Continuous heart rate monitoring",
        "Sleep tracking and analysis",
        "Water resistant up to 50 meters",
        "1.4\" AMOLED display",
        "7-day battery life"
      ],
      images: [
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1682821/pexels-photo-1682821.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 42,
      isFeatured: true
    },
    {
      id: 7,
      title: "Men's Classic Fit Cotton Shirt",
      price: 49.99,
      originalPrice: 69.99,
      discount: 28,
      rating: 4.3,
      ratingCount: 157,
      category: "Fashion",
      categoryId: 2,
      description: "Elevate your wardrobe with this classic fit cotton shirt. Made from premium combed cotton for comfort and durability, perfect for both casual and formal occasions.",
      features: [
        "100% premium combed cotton",
        "Classic fit design",
        "Button-down collar",
        "Machine washable",
        "Available in multiple colors"
      ],
      images: [
        "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 53,
      isFeatured: false
    },
    {
      id: 8,
      title: "Professional DSLR Camera with 18-55mm Lens",
      price: 799.99,
      originalPrice: 999.99,
      discount: 20,
      rating: 4.8,
      ratingCount: 205,
      category: "Electronics",
      categoryId: 1,
      description: "Capture stunning photos and videos with this professional DSLR camera. Features a 24.1MP sensor, 4K video recording, and comes with a versatile 18-55mm lens.",
      features: [
        "24.1 Megapixel CMOS sensor",
        "4K video recording",
        "Optical viewfinder with 45-point autofocus",
        "Built-in Wi-Fi and Bluetooth",
        "Includes 18-55mm zoom lens"
      ],
      images: [
        "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 12,
      isFeatured: true
    },
    {
      id: 9,
      title: "Women's Running Shoes",
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      rating: 4.6,
      ratingCount: 287,
      category: "Sports & Outdoors",
      categoryId: 4,
      description: "Enhance your running performance with these lightweight and responsive running shoes. Features cushioned midsole, breathable mesh upper, and durable rubber outsole.",
      features: [
        "Lightweight mesh upper for breathability",
        "Responsive cushioning for comfort",
        "Durable rubber outsole",
        "Ergonomic design for natural foot movement",
        "Reflective elements for visibility"
      ],
      images: [
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 35,
      isFeatured: false
    },
    {
      id: 10,
      title: "Ergonomic Office Chair",
      price: 179.99,
      originalPrice: 249.99,
      discount: 28,
      rating: 4.7,
      ratingCount: 196,
      category: "Furniture",
      categoryId: 5,
      description: "Work in comfort with this ergonomic office chair. Features adjustable height and armrests, lumbar support, and breathable mesh backrest for all-day comfort.",
      features: [
        "Adjustable height and armrests",
        "Lumbar support for back health",
        "Breathable mesh backrest",
        "360° swivel with smooth-rolling casters",
        "Supports up to 300 lbs"
      ],
      images: [
        "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3740297/pexels-photo-3740297.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 19,
      isFeatured: true
    },
    {
      id: 11,
      title: "Professional Blender with Glass Jar",
      price: 119.99,
      originalPrice: 159.99,
      discount: 25,
      rating: 4.5,
      ratingCount: 167,
      category: "Home & Kitchen",
      categoryId: 3,
      description: "Blend smoothies, soups, and more with this powerful professional blender. Features a durable glass jar, multiple speed settings, and pulse function for precise control.",
      features: [
        "1000W powerful motor",
        "64 oz glass jar",
        "5 speed settings plus pulse",
        "Stainless steel blades",
        "Dishwasher-safe parts"
      ],
      images: [
        "https://images.pexels.com/photos/3209101/pexels-photo-3209101.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3735188/pexels-photo-3735188.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 22,
      isFeatured: false
    },
    {
      id: 12,
      title: "Wireless Gaming Mouse",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.6,
      ratingCount: 231,
      category: "Electronics",
      categoryId: 1,
      description: "Gain a competitive edge with this high-performance wireless gaming mouse. Features a precise optical sensor, programmable buttons, and customizable RGB lighting.",
      features: [
        "16,000 DPI optical sensor",
        "Wireless with ultra-low latency",
        "7 programmable buttons",
        "Customizable RGB lighting",
        "Up to 60 hours battery life"
      ],
      images: [
        "https://images.pexels.com/photos/5082582/pexels-photo-5082582.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1374002/pexels-photo-1374002.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3736398/pexels-photo-3736398.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      stock: 40,
      isFeatured: true
    },
  ],

  /**
   * Categories data
   */
  categories: [
    {
      id: 1,
      name: "Electronics",
      description: "Latest gadgets and electronic devices",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      name: "Fashion",
      description: "Clothing, shoes, and accessories",
      image: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Everything for your home",
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      description: "Gear for all your activities",
      image: "https://images.pexels.com/photos/4753987/pexels-photo-4753987.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 5,
      name: "Furniture",
      description: "Quality furniture for every room",
      image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 6,
      name: "Beauty & Personal Care",
      description: "Products for your wellness and beauty",
      image: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 7,
      name: "Books",
      description: "Books for all interests",
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 8,
      name: "Toys & Games",
      description: "Fun for all ages",
      image: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ],

  /**
   * Users data
   */
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA"
      },
      orders: []
    }
  ],

  /**
   * Orders data
   */
  orders: [],

  /**
   * Get all products
   * @returns {Promise} Promise resolving to array of products
   */
  getProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.products]);
      }, 300);
    });
  },

  /**
   * Get featured products
   * @returns {Promise} Promise resolving to array of featured products
   */
  getFeaturedProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products.filter(product => product.isFeatured));
      }, 300);
    });
  },

  /**
   * Get a single product by ID
   * @param {number} id - Product ID
   * @returns {Promise} Promise resolving to a product object
   */
  getProductById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = this.products.find(p => p.id === id);
        if (product) {
          resolve({...product});
        } else {
          reject(new Error(`Product with ID ${id} not found`));
        }
      }, 300);
    });
  },

  /**
   * Get products by category ID
   * @param {number} categoryId - Category ID
   * @returns {Promise} Promise resolving to array of products in category
   */
  getProductsByCategory(categoryId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = this.products.filter(p => p.categoryId === categoryId);
        resolve([...products]);
      }, 300);
    });
  },

  /**
   * Search products by keyword
   * @param {string} keyword - Search keyword
   * @returns {Promise} Promise resolving to array of products
   */
  searchProducts(keyword) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowercaseKeyword = keyword.toLowerCase();
        const results = this.products.filter(product => {
          return (
            product.title.toLowerCase().includes(lowercaseKeyword) ||
            product.description.toLowerCase().includes(lowercaseKeyword) ||
            product.category.toLowerCase().includes(lowercaseKeyword)
          );
        });
        resolve([...results]);
      }, 300);
    });
  },

  /**
   * Get all categories
   * @returns {Promise} Promise resolving to array of categories
   */
  getCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.categories]);
      }, 300);
    });
  },

  /**
   * Get a single category by ID
   * @param {number} id - Category ID
   * @returns {Promise} Promise resolving to a category object
   */
  getCategoryById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const category = this.categories.find(c => c.id === id);
        if (category) {
          resolve({...category});
        } else {
          reject(new Error(`Category with ID ${id} not found`));
        }
      }, 300);
    });
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Promise resolving to the created user object
   */
  registerUser(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = this.users.find(u => u.email === userData.email);
        if (existingUser) {
          reject(new Error("Email already exists"));
          return;
        }
        
        const newUser = {
          id: this.users.length + 1,
          ...userData,
          orders: []
        };
        
        this.users.push(newUser);
        resolve({...newUser, password: undefined});
      }, 500);
    });
  },

  /**
   * Login a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Promise resolving to user object
   */
  loginUser(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
          resolve({...user, password: undefined});
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 500);
    });
  },

  /**
   * Create an order
   * @param {Object} orderData - Order data
   * @returns {Promise} Promise resolving to created order
   */
  createOrder(orderData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          id: this.orders.length + 1,
          date: new Date().toISOString(),
          status: "pending",
          ...orderData
        };
        
        this.orders.push(newOrder);
        
        // Add to user's orders if user is authenticated
        if (orderData.userId) {
          const user = this.users.find(u => u.id === orderData.userId);
          if (user) {
            user.orders.push(newOrder.id);
          }
        }
        
        resolve(newOrder);
      }, 500);
    });
  },

  /**
   * Get a user's orders
   * @param {number} userId - User ID
   * @returns {Promise} Promise resolving to array of orders
   */
  getUserOrders(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
          reject(new Error("User not found"));
          return;
        }
        
        const userOrders = this.orders.filter(order => order.userId === userId);
        resolve([...userOrders]);
      }, 300);
    });
  }
};

// Export the API
window.API = API;