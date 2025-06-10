import { UserService } from '../user.js'
import { Cart } from '../cart.js'

export class AccountPage {
  constructor() {
    this.userService = new UserService()
    this.cart = new Cart()
  }
  
  render() {
    if (!this.userService.isLoggedIn()) {
      return this.renderLoginForm()
    }
    
    return this.renderAccountDashboard()
  }
  
  renderLoginForm() {
    return `
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card shadow-sm">
              <div class="card-body p-5">
                <div class="text-center mb-4">
                  <h2 class="fw-bold">Welcome Back</h2>
                  <p class="text-muted">Sign in to your account or create a new one</p>
                </div>
                
                <!-- Login/Register Tabs -->
                <ul class="nav nav-pills nav-justified mb-4" id="authTabs">
                  <li class="nav-item">
                    <button class="nav-link active" id="loginTab" data-bs-toggle="pill" data-bs-target="#loginForm">
                      Sign In
                    </button>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" id="registerTab" data-bs-toggle="pill" data-bs-target="#registerForm">
                      Create Account
                    </button>
                  </li>
                </ul>
                
                <div class="tab-content">
                  <!-- Login Form -->
                  <div class="tab-pane fade show active" id="loginForm">
                    <form id="loginFormElement" novalidate>
                      <div class="mb-3">
                        <label for="loginEmail" class="form-label fw-bold">Email Address</label>
                        <input type="email" class="form-control" id="loginEmail" required>
                        <div class="invalid-feedback">Please provide a valid email.</div>
                      </div>
                      
                      <div class="mb-3">
                        <label for="loginPassword" class="form-label fw-bold">Password</label>
                        <input type="password" class="form-control" id="loginPassword" required>
                        <div class="invalid-feedback">Please provide a password.</div>
                      </div>
                      
                      <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">Remember me</label>
                      </div>
                      
                      <div class="d-grid">
                        <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
                      </div>
                      
                      <div class="text-center mt-3">
                        <a href="#" class="text-decoration-none">Forgot your password?</a>
                      </div>
                    </form>
                  </div>
                  
                  <!-- Register Form -->
                  <div class="tab-pane fade" id="registerForm">
                    <form id="registerFormElement" novalidate>
                      <div class="row g-3">
                        <div class="col-md-6">
                          <label for="firstName" class="form-label fw-bold">First Name</label>
                          <input type="text" class="form-control" id="firstName" required>
                          <div class="invalid-feedback">Please provide your first name.</div>
                        </div>
                        
                        <div class="col-md-6">
                          <label for="lastName" class="form-label fw-bold">Last Name</label>
                          <input type="text" class="form-control" id="lastName" required>
                          <div class="invalid-feedback">Please provide your last name.</div>
                        </div>
                        
                        <div class="col-12">
                          <label for="registerEmail" class="form-label fw-bold">Email Address</label>
                          <input type="email" class="form-control" id="registerEmail" required>
                          <div class="invalid-feedback">Please provide a valid email.</div>
                        </div>
                        
                        <div class="col-12">
                          <label for="phone" class="form-label fw-bold">Phone Number</label>
                          <input type="tel" class="form-control" id="phone">
                        </div>
                        
                        <div class="col-12">
                          <label for="registerPassword" class="form-label fw-bold">Password</label>
                          <input type="password" class="form-control" id="registerPassword" required minlength="6">
                          <div class="invalid-feedback">Password must be at least 6 characters.</div>
                        </div>
                        
                        <div class="col-12">
                          <label for="confirmPassword" class="form-label fw-bold">Confirm Password</label>
                          <input type="password" class="form-control" id="confirmPassword" required>
                          <div class="invalid-feedback">Passwords do not match.</div>
                        </div>
                        
                        <div class="col-12">
                          <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="agreeTerms" required>
                            <label class="form-check-label" for="agreeTerms">
                              I agree to the <a href="#" class="text-decoration-none">Terms of Service</a> and 
                              <a href="#" class="text-decoration-none">Privacy Policy</a>
                            </label>
                            <div class="invalid-feedback">You must agree to the terms.</div>
                          </div>
                        </div>
                        
                        <div class="col-12">
                          <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="subscribeNewsletter">
                            <label class="form-check-label" for="subscribeNewsletter">
                              Subscribe to our newsletter for updates and special offers
                            </label>
                          </div>
                        </div>
                        
                        <div class="col-12">
                          <div class="d-grid">
                            <button type="submit" class="btn btn-primary btn-lg">Create Account</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  
  renderAccountDashboard() {
    const user = this.userService.getCurrentUser()
    
    return `
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-3">
            <!-- Account Sidebar -->
            <div class="card shadow-sm">
              <div class="card-body">
                <div class="text-center mb-4">
                  <div class="avatar-circle mb-3">
                    <i class="bi bi-person-fill fs-1"></i>
                  </div>
                  <h5 class="fw-bold">${user.firstName} ${user.lastName}</h5>
                  <p class="text-muted small">${user.email}</p>
                </div>
                
                <div class="list-group list-group-flush">
                  <button class="list-group-item list-group-item-action active" data-section="overview">
                    <i class="bi bi-speedometer2 me-2"></i>Overview
                  </button>
                  <button class="list-group-item list-group-item-action" data-section="orders">
                    <i class="bi bi-bag me-2"></i>My Orders
                  </button>
                  <button class="list-group-item list-group-item-action" data-section="wishlist">
                    <i class="bi bi-heart me-2"></i>Wishlist
                  </button>
                  <button class="list-group-item list-group-item-action" data-section="addresses">
                    <i class="bi bi-geo-alt me-2"></i>Addresses
                  </button>
                  <button class="list-group-item list-group-item-action" data-section="profile">
                    <i class="bi bi-person me-2"></i>Profile Settings
                  </button>
                  <button class="list-group-item list-group-item-action text-danger" onclick="window.logout()">
                    <i class="bi bi-box-arrow-right me-2"></i>Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-9">
            <!-- Account Content -->
            <div id="accountContent">
              ${this.renderOverviewSection(user)}
            </div>
          </div>
        </div>
      </div>
    `
  }
  
  renderOverviewSection(user) {
    return `
      <div class="row g-4">
        <div class="col-12">
          <h2 class="fw-bold">Account Overview</h2>
          <p class="text-muted">Welcome back, ${user.firstName}! Here's what's happening with your account.</p>
        </div>
        
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <i class="bi bi-bag-check fs-1 text-primary mb-3"></i>
              <h5 class="fw-bold">${user.orders?.length || 0}</h5>
              <p class="text-muted mb-0">Total Orders</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <i class="bi bi-heart fs-1 text-danger mb-3"></i>
              <h5 class="fw-bold">${user.wishlist?.length || 0}</h5>
              <p class="text-muted mb-0">Wishlist Items</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body">
              <i class="bi bi-cart fs-1 text-success mb-3"></i>
              <h5 class="fw-bold">${this.cart.getTotalItems()}</h5>
              <p class="text-muted mb-0">Cart Items</p>
            </div>
          </div>
        </div>
        
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="fw-bold mb-0">Recent Activity</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <div class="activity-icon me-3">
                  <i class="bi bi-person-check text-success"></i>
                </div>
                <div>
                  <p class="mb-0">Account created</p>
                  <small class="text-muted">${new Date(user.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
              
              <div class="d-flex align-items-center">
                <div class="activity-icon me-3">
                  <i class="bi bi-box-arrow-in-right text-primary"></i>
                </div>
                <div>
                  <p class="mb-0">Last login</p>
                  <small class="text-muted">Today</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  
  init() {
    if (!this.userService.isLoggedIn()) {
      this.setupAuthForms()
    } else {
      this.setupAccountDashboard()
    }
  }
  
  setupAuthForms() {
    // Login form
    const loginForm = document.getElementById('loginFormElement')
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        this.handleLogin()
      })
    }
    
    // Register form
    const registerForm = document.getElementById('registerFormElement')
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault()
        this.handleRegister()
      })
    }
    
    // Password confirmation validation
    const confirmPassword = document.getElementById('confirmPassword')
    if (confirmPassword) {
      confirmPassword.addEventListener('input', this.validatePasswordMatch)
    }
  }
  
  setupAccountDashboard() {
    // Sidebar navigation
    document.querySelectorAll('[data-section]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const section = e.target.getAttribute('data-section')
        this.loadAccountSection(section)
        
        // Update active state
        document.querySelectorAll('[data-section]').forEach(b => b.classList.remove('active'))
        e.target.classList.add('active')
      })
    })
    
    // Global logout function
    window.logout = () => {
      this.userService.logout()
      window.router.loadPage('account')
    }
  }
  
  handleLogin() {
    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value
    
    try {
      this.userService.login(email, password)
      this.showSuccess('Login successful! Welcome back.')
      setTimeout(() => {
        window.router.loadPage('account')
      }, 1000)
    } catch (error) {
      this.showError(error.message)
    }
  }
  
  handleRegister() {
    const userData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('registerEmail').value,
      phone: document.getElementById('phone').value,
      password: document.getElementById('registerPassword').value
    }
    
    try {
      this.userService.register(userData)
      this.userService.login(userData.email, userData.password)
      this.showSuccess('Account created successfully! Welcome to SnowShop.')
      setTimeout(() => {
        window.router.loadPage('account')
      }, 1000)
    } catch (error) {
      this.showError(error.message)
    }
  }
  
  validatePasswordMatch() {
    const password = document.getElementById('registerPassword').value
    const confirmPassword = document.getElementById('confirmPassword').value
    const confirmField = document.getElementById('confirmPassword')
    
    if (password !== confirmPassword) {
      confirmField.setCustomValidity('Passwords do not match')
    } else {
      confirmField.setCustomValidity('')
    }
  }
  
  loadAccountSection(section) {
    const content = document.getElementById('accountContent')
    const user = this.userService.getCurrentUser()
    
    switch (section) {
      case 'overview':
        content.innerHTML = this.renderOverviewSection(user)
        break
      case 'orders':
        content.innerHTML = this.renderOrdersSection(user)
        break
      case 'wishlist':
        content.innerHTML = this.renderWishlistSection(user)
        break
      case 'addresses':
        content.innerHTML = this.renderAddressesSection(user)
        break
      case 'profile':
        content.innerHTML = this.renderProfileSection(user)
        break
    }
  }
  
  renderOrdersSection(user) {
    return `
      <div class="card">
        <div class="card-header">
          <h5 class="fw-bold mb-0">My Orders</h5>
        </div>
        <div class="card-body">
          <div class="text-center py-5">
            <i class="bi bi-bag fs-1 text-muted"></i>
            <h5 class="mt-3">No orders yet</h5>
            <p class="text-muted">When you place your first order, it will appear here.</p>
            <button class="btn btn-primary" data-page="products">Start Shopping</button>
          </div>
        </div>
      </div>
    `
  }
  
  renderWishlistSection(user) {
    return `
      <div class="card">
        <div class="card-header">
          <h5 class="fw-bold mb-0">My Wishlist</h5>
        </div>
        <div class="card-body">
          <div class="text-center py-5">
            <i class="bi bi-heart fs-1 text-muted"></i>
            <h5 class="mt-3">Your wishlist is empty</h5>
            <p class="text-muted">Save items you love for later by clicking the heart icon.</p>
            <button class="btn btn-primary" data-page="products">Browse Products</button>
          </div>
        </div>
      </div>
    `
  }
  
  renderAddressesSection(user) {
    return `
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="fw-bold mb-0">Saved Addresses</h5>
          <button class="btn btn-primary btn-sm">Add New Address</button>
        </div>
        <div class="card-body">
          <div class="text-center py-5">
            <i class="bi bi-geo-alt fs-1 text-muted"></i>
            <h5 class="mt-3">No saved addresses</h5>
            <p class="text-muted">Add addresses to make checkout faster and easier.</p>
          </div>
        </div>
      </div>
    `
  }
  
  renderProfileSection(user) {
    return `
      <div class="card">
        <div class="card-header">
          <h5 class="fw-bold mb-0">Profile Settings</h5>
        </div>
        <div class="card-body">
          <form id="profileForm">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-bold">First Name</label>
                <input type="text" class="form-control" value="${user.firstName}">
              </div>
              <div class="col-md-6">
                <label class="form-label fw-bold">Last Name</label>
                <input type="text" class="form-control" value="${user.lastName}">
              </div>
              <div class="col-12">
                <label class="form-label fw-bold">Email Address</label>
                <input type="email" class="form-control" value="${user.email}">
              </div>
              <div class="col-12">
                <label class="form-label fw-bold">Phone Number</label>
                <input type="tel" class="form-control" value="${user.phone || ''}">
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Update Profile</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `
  }
  
  showSuccess(message) {
    this.showAlert(message, 'success')
  }
  
  showError(message) {
    this.showAlert(message, 'danger')
  }
  
  showAlert(message, type) {
    const alert = document.createElement('div')
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;'
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `
    
    document.body.appendChild(alert)
    
    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove()
      }
    }, 5000)
  }
}