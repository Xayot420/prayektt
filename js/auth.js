/**
 * Auth: Authentication functionality
 */

const Auth = {
  /**
   * Initialize auth functionality
   */
  init() {
    // Get DOM elements
    this.authBtn = document.getElementById('authBtn');
    this.authModal = document.getElementById('authModal');
    this.loginForm = document.getElementById('loginForm');
    this.registerForm = document.getElementById('registerForm');
    this.tabBtns = document.querySelectorAll('.tab-btn');
    this.loginTab = document.getElementById('loginTab');
    this.registerTab = document.getElementById('registerTab');
    this.closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Add event listeners
    this.authBtn.addEventListener('click', () => this.openModal());
    this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    
    // Tab switching
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.getAttribute('data-tab')));
    });
    
    // Close modal
    this.closeModalBtns.forEach(btn => {
      btn.addEventListener('click', () => this.closeModal());
    });
    
    // Close modal when clicking outside
    this.authModal.addEventListener('click', (e) => {
      if (e.target === this.authModal) {
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
   * Update UI based on auth state
   * @param {Object} state - Application state
   */
  updateUI(state) {
    const { user } = state;
    
    // Update auth button text/icon
    if (user) {
      document.getElementById('authBtn').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
      `;
    } else {
      document.getElementById('authBtn').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      `;
    }
    
    // Handle mobile menu elements
    const mobileProfile = document.getElementById('mobileProfile');
    if (mobileProfile) {
      mobileProfile.textContent = user ? 'My Account' : 'Sign In';
    }
  },
  
  /**
   * Open auth modal
   */
  openModal() {
    // If user is already logged in, show profile page instead
    if (store.state.user) {
      Router.navigateTo('profile');
      return;
    }
    
    this.authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  
  /**
   * Close auth modal
   */
  closeModal() {
    this.authModal.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  /**
   * Switch between login and register tabs
   * @param {string} tab - Tab to switch to
   */
  switchTab(tab) {
    this.tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
    
    this.loginTab.classList.toggle('active', tab === 'login');
    this.registerTab.classList.toggle('active', tab === 'register');
  },
  
  /**
   * Handle login form submission
   * @param {Event} e - Form submission event
   */
  async handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
      await store.loginUser(email, password);
      this.closeModal();
      UI.showToast('success', 'Welcome back!', 'You have successfully logged in.');
    } catch (error) {
      UI.showToast('error', 'Login Failed', error.message);
    }
  },
  
  /**
   * Handle register form submission
   * @param {Event} e - Form submission event
   */
  async handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate password match
    if (password !== confirmPassword) {
      UI.showToast('error', 'Registration Failed', 'Passwords do not match.');
      return;
    }
    
    try {
      const userData = {
        name,
        email,
        password,
        address: {}
      };
      
      await store.registerUser(userData);
      this.closeModal();
      UI.showToast('success', 'Registration Successful', 'Your account has been created.');
    } catch (error) {
      UI.showToast('error', 'Registration Failed', error.message);
    }
  },
  
  /**
   * Log out the current user
   */
  logout() {
    store.logoutUser();
    UI.showToast('info', 'Logged Out', 'You have been logged out successfully.');
    Router.navigateTo('home');
  }
};

// Export Auth module
window.Auth = Auth;