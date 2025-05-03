/**
 * Main application file
 */

// Initialize modules
document.addEventListener('DOMContentLoaded', () => {
  // Initialize store with data
  store.fetchProducts();
  store.fetchCategories();
  
  // Initialize UI components
  UI.init();
  Cart.init();
  Wishlist.init();
  Auth.init();
  
  // Initialize router
  Router.init();
  
  // Add global click listener for product cards
  document.addEventListener('click', (e) => {
    // Handle product title clicks
    if (e.target.classList.contains('product-title')) {
      const productCard = e.target.closest('.product-card');
      if (productCard) {
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        if (addToCartBtn) {
          const productId = parseInt(addToCartBtn.getAttribute('data-id'));
          Router.navigateTo('product', productId);
        }
      }
    }
  });
  
  // Logo click handler - return to home
  document.getElementById('logo').addEventListener('click', () => {
    Router.navigateTo('home');
  });
  
  // Handle newsletter form submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // Simulate newsletter subscription
        UI.showToast('success', 'Subscription Successful', 'Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  }
  
  // Debugging - Log initial store state
  console.log('Initial store state:', store.state);
});