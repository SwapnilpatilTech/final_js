import { UserService } from '../user.js'
import { ProductService } from '../products.js'
import { Cart } from '../cart.js'

export class WishlistPage {
  constructor() {
    this.userService = new UserService()
    this.productService = new ProductService()
    this.cart = new Cart()
  }
  
  render() {
    if (!this.userService.isLoggedIn()) {
      return `
        <div class="container py-5">
          <div class="text-center">
            <i class="bi bi-heart fs-1 text-muted mb-4"></i>
            <h1 class="display-5 fw-bold mb-3">Your Wishlist</h1>
            <p class="lead text-muted mb-4">Please sign in to view your saved items.</p>
            <button class="btn btn-primary btn-lg" data-page="account">
              <i class="bi bi-person me-2"></i>Sign In
            </button>
          </div>
        </div>
      `
    }
    
    const user = this.userService.getCurrentUser()
    const wishlistProducts = user.wishlist.map(id => this.productService.getProductById(id)).filter(Boolean)
    
    if (wishlistProducts.length === 0) {
      return `
        <div class="container py-5">
          <div class="text-center">
            <i class="bi bi-heart fs-1 text-muted mb-4"></i>
            <h1 class="display-5 fw-bold mb-3">Your Wishlist is Empty</h1>
            <p class="lead text-muted mb-4">Save items you love by clicking the heart icon on any product.</p>
            <button class="btn btn-primary btn-lg" data-page="products">
              <i class="bi bi-bag me-2"></i>Start Shopping
            </button>
          </div>
        </div>
      `
    }
    
    return `
      <div class="container py-5">
        <div class="row">
          <div class="col-12">
            <h1 class="display-5 fw-bold mb-4">My Wishlist</h1>
            <p class="text-muted mb-4">${wishlistProducts.length} items saved</p>
          </div>
        </div>
        
        <div class="row g-4">
          ${wishlistProducts.map(product => `
            <div class="col-sm-6 col-lg-4 col-xl-3">
              <div class="card h-100 shadow-sm product-card position-relative">
                <button class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2 wishlist-remove" 
                        data-product-id="${product.id}" style="z-index: 10;">
                  <i class="bi bi-heart-fill"></i>
                </button>
                
                <img src="${product.image}" class="card-img-top" alt="${product.name}" 
                     style="height: 250px; object-fit: cover; cursor: pointer;"
                     onclick="window.viewProduct(${product.id})">
                
                <div class="card-body d-flex flex-column">
                  <h6 class="card-title fw-bold">${product.name}</h6>
                  <p class="card-text text-muted small flex-grow-1">${product.description.substring(0, 100)}...</p>
                  
                  <div class="mb-2">
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="h5 text-primary fw-bold mb-0">$${product.price}</span>
                      <div class="text-warning small">
                        ${'★'.repeat(Math.floor(product.rating))} (${product.rating})
                      </div>
                    </div>
                  </div>
                  
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-primary btn-sm" onclick="window.viewProduct(${product.id})">
                      <i class="bi bi-eye me-2"></i>View Details
                    </button>
                    <button class="btn btn-primary btn-sm ${!product.inStock ? 'disabled' : ''}" 
                            onclick="window.addToCartFromWishlist(${product.id})"
                            ${!product.inStock ? 'disabled' : ''}>
                      <i class="bi bi-cart-plus me-2"></i>
                      ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="row mt-5">
          <div class="col-12">
            <div class="card">
              <div class="card-body text-center">
                <h5 class="fw-bold mb-3">Share Your Wishlist</h5>
                <p class="text-muted mb-3">Let friends and family know what you're hoping for!</p>
                <div class="d-flex justify-content-center gap-2">
                  <button class="btn btn-outline-primary btn-sm">
                    <i class="bi bi-envelope me-2"></i>Email
                  </button>
                  <button class="btn btn-outline-primary btn-sm">
                    <i class="bi bi-facebook me-2"></i>Facebook
                  </button>
                  <button class="btn btn-outline-primary btn-sm">
                    <i class="bi bi-twitter me-2"></i>Twitter
                  </button>
                  <button class="btn btn-outline-primary btn-sm">
                    <i class="bi bi-link-45deg me-2"></i>Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  
  init() {
    // Remove from wishlist
    document.querySelectorAll('.wishlist-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const productId = parseInt(e.target.closest('.wishlist-remove').getAttribute('data-product-id'))
        this.removeFromWishlist(productId)
      })
    })
    
    // Global functions
    window.viewProduct = (productId) => {
      window.router.loadPage('product-detail', { id: productId })
    }
    
    window.addToCartFromWishlist = (productId) => {
      const product = this.productService.getProductById(productId)
      if (product && product.inStock) {
        this.cart.addItem(product)
      }
    }
  }
  
  removeFromWishlist(productId) {
    this.userService.removeFromWishlist(productId)
    this.showSuccess('Item removed from wishlist')
    // Reload the page to reflect changes
    setTimeout(() => {
      window.router.loadPage('wishlist')
    }, 1000)
  }
  
  showSuccess(message) {
    const alert = document.createElement('div')
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed'
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;'
    alert.innerHTML = `
      <i class="bi bi-check-circle me-2"></i>${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `
    
    document.body.appendChild(alert)
    
    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove()
      }
    }, 3000)
  }
}