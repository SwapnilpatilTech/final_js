import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'
import { Router } from './js/router.js'
import { Cart } from './js/cart.js'
import { ProductService } from './js/products.js'
import { UserService } from './js/user.js'
import { NewsletterService } from './js/newsletter.js'
import { ChatService } from './js/chat.js'

// Initialize the application
class App {
  constructor() {
    this.router = new Router()
    this.cart = new Cart()
    this.productService = new ProductService()
    this.userService = new UserService()
    this.newsletterService = new NewsletterService()
    this.chatService = new ChatService()
    
    // Make router globally available
    window.router = this.router
    
    this.init()
  }
  
  init() {
    // Initialize cart count display
    this.cart.updateCartCount()
    
    // Initialize user interface
    this.updateUserInterface()
    
    // Set up navigation event listeners
    this.setupNavigation()
    
    // Set up search functionality
    this.setupSearch()
    
    // Set up newsletter
    this.setupNewsletter()
    
    // Initialize chat
    this.chatService.init()
    
    // Load initial page
    this.router.loadPage('home')
  }
  
  updateUserInterface() {
    const user = this.userService.getCurrentUser()
    const userGreeting = document.getElementById('userGreeting')
    const authAction = document.getElementById('authAction')
    
    if (user) {
      userGreeting.textContent = `Hi, ${user.firstName}`
      authAction.innerHTML = '<i class="bi bi-box-arrow-right me-2"></i>Sign Out'
      authAction.onclick = () => {
        this.userService.logout()
        this.updateUserInterface()
        this.router.loadPage('home')
      }
    } else {
      userGreeting.textContent = 'Account'
      authAction.innerHTML = '<i class="bi bi-box-arrow-in-right me-2"></i>Sign In'
      authAction.onclick = () => {
        this.router.loadPage('account')
      }
    }
  }
  
  setupNavigation() {
    document.addEventListener('click', (e) => {
      const pageLink = e.target.closest('[data-page]')
      if (pageLink) {
        e.preventDefault()
        const page = pageLink.getAttribute('data-page')
        const category = pageLink.getAttribute('data-category')
        
        if (category) {
          this.router.loadPage(page, { category })
        } else {
          this.router.loadPage(page)
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active')
        })
        if (pageLink.classList.contains('nav-link')) {
          pageLink.classList.add('active')
        }
        
        // Update user interface after navigation
        setTimeout(() => this.updateUserInterface(), 100)
      }
    })
  }
  
  setupSearch() {
    const searchInput = document.getElementById('searchInput')
    const searchBtn = document.getElementById('searchBtn')
    
    const performSearch = () => {
      const query = searchInput.value.trim()
      if (query) {
        this.router.loadPage('products', { search: query })
        searchInput.value = ''
      }
    }
    
    searchBtn.addEventListener('click', performSearch)
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch()
      }
    })
    
    // Search suggestions (simple implementation)
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase()
      if (query.length > 2) {
        const suggestions = this.productService.getAllProducts()
          .filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
          )
          .slice(0, 5)
        
        // You could implement a dropdown here for suggestions
      }
    })
  }
  
  setupNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm')
    
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = document.getElementById('newsletterEmail').value
      
      try {
        this.newsletterService.subscribe(email)
        this.showSuccess('Thank you for subscribing to our newsletter!')
        newsletterForm.reset()
      } catch (error) {
        if (error.message.includes('already subscribed')) {
          this.showInfo('You are already subscribed to our newsletter.')
        } else {
          this.showError('Failed to subscribe. Please try again.')
        }
      }
    })
  }
  
  showSuccess(message) {
    this.showAlert(message, 'success')
  }
  
  showError(message) {
    this.showAlert(message, 'danger')
  }
  
  showInfo(message) {
    this.showAlert(message, 'info')
  }
  
  showAlert(message, type) {
    const alert = document.createElement('div')
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;'
    alert.innerHTML = `
      <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>${message}
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

// Start the application
new App()