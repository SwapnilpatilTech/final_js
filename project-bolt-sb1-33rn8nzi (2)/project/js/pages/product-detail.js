import { ProductService } from '../products.js'
import { Cart } from '../cart.js'
import { UserService } from '../user.js'
import { ReviewService } from '../reviews.js'

export class ProductDetailPage {
  constructor() {
    this.productService = new ProductService()
    this.cart = new Cart()
    this.userService = new UserService()
    this.reviewService = new ReviewService()
  }
  
  render(params) {
    const product = this.productService.getProductById(params.id)
    
    if (!product) {
      return `
        <div class="container py-5 text-center">
          <h1 class="display-4 text-muted">Product Not Found</h1>
          <p class="lead">The product you're looking for doesn't exist.</p>
          <button class="btn btn-primary" data-page="products">
            <i class="bi bi-arrow-left me-2"></i>Back to Products
          </button>
        </div>
      `
    }
    
    const relatedProducts = this.productService.getProductsByCategory(product.category)
      .filter(p => p.id !== product.id)
      .slice(0, 4)
    
    const reviews = this.reviewService.getProductReviews(product.id)
    const averageRating = this.reviewService.getAverageRating(product.id)
    const ratingDistribution = this.reviewService.getRatingDistribution(product.id)
    const isInWishlist = this.userService.isInWishlist(product.id)
    
    return `
      <div class="container py-5">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#" data-page="home" class="text-decoration-none">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#" data-page="products" class="text-decoration-none">Products</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#" data-page="products" data-category="${product.category}" class="text-decoration-none">${product.category}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">${product.name}</li>
          </ol>
        </nav>
        
        <!-- Product Details -->
        <div class="row g-5">
          <div class="col-lg-6">
            <div class="product-image-container position-relative">
              <img src="${product.image}" alt="${product.name}" 
                   class="img-fluid rounded shadow-lg w-100" 
                   style="max-height: 500px; object-fit: cover;">
              
              <!-- Wishlist Button -->
              <button class="btn btn-outline-light position-absolute top-0 end-0 m-3 wishlist-btn ${isInWishlist ? 'active' : ''}" 
                      data-product-id="${product.id}">
                <i class="bi bi-heart${isInWishlist ? '-fill' : ''}"></i>
              </button>
            </div>
          </div>
          
          <div class="col-lg-6">
            <div class="product-info">
              <div class="mb-3">
                <span class="badge bg-primary mb-2">${product.category}</span>
                ${!product.inStock ? '<span class="badge bg-danger ms-2">Out of Stock</span>' : '<span class="badge bg-success ms-2">In Stock</span>'}
              </div>
              
              <h1 class="display-5 fw-bold mb-3">${product.name}</h1>
              
              <div class="d-flex align-items-center mb-4">
                <div class="text-warning me-3">
                  ${'★'.repeat(Math.floor(averageRating || product.rating))}${'☆'.repeat(5 - Math.floor(averageRating || product.rating))}
                </div>
                <span class="text-muted">(${averageRating || product.rating}/5.0) • ${reviews.length} reviews</span>
              </div>
              
              <div class="price-section mb-4">
                <span class="display-4 text-primary fw-bold">$${product.price}</span>
                <div class="mt-2">
                  <small class="text-success">
                    <i class="bi bi-truck me-1"></i>
                    Free shipping on orders over $75
                  </small>
                </div>
              </div>
              
              <p class="lead mb-4">${product.description}</p>
              
              <!-- Features -->
              <div class="features-section mb-4">
                <h5 class="fw-bold mb-3">Key Features:</h5>
                <ul class="list-unstyled">
                  ${product.features.map(feature => `
                    <li class="mb-2">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      ${feature}
                    </li>
                  `).join('')}
                </ul>
              </div>
              
              <!-- Add to Cart Section -->
              <div class="add-to-cart-section border-top pt-4">
                <div class="row g-3">
                  <div class="col-4">
                    <label for="quantity" class="form-label fw-bold">Quantity:</label>
                    <select class="form-select" id="quantity" ${!product.inStock ? 'disabled' : ''}>
                      ${[1,2,3,4,5,6,7,8,9,10].map(num => `<option value="${num}">${num}</option>`).join('')}
                    </select>
                  </div>
                  <div class="col-8 d-flex align-items-end">
                    <button class="btn btn-primary btn-lg w-100 ${!product.inStock ? 'disabled' : ''}" 
                            id="addToCartBtn"
                            ${!product.inStock ? 'disabled' : ''}>
                      <i class="bi bi-cart-plus me-2"></i>
                      ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
                
                <div class="row g-3 mt-3">
                  <div class="col-6">
                    <button class="btn btn-outline-primary w-100" onclick="window.buyNow(${product.id})">
                      <i class="bi bi-lightning me-2"></i>Buy Now
                    </button>
                  </div>
                  <div class="col-6">
                    <button class="btn btn-outline-secondary w-100" onclick="window.shareProduct()">
                      <i class="bi bi-share me-2"></i>Share Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Product Tabs -->
        <div class="row mt-5">
          <div class="col-12">
            <ul class="nav nav-tabs" id="productTabs">
              <li class="nav-item">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#reviews">
                  Reviews (${reviews.length})
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#specifications">
                  Specifications
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#shipping">
                  Shipping & Returns
                </button>
              </li>
            </ul>
            
            <div class="tab-content mt-4">
              <!-- Reviews Tab -->
              <div class="tab-pane fade show active" id="reviews">
                ${this.renderReviewsSection(product, reviews, ratingDistribution)}
              </div>
              
              <!-- Specifications Tab -->
              <div class="tab-pane fade" id="specifications">
                <div class="row">
                  <div class="col-md-6">
                    <h5 class="fw-bold mb-3">Product Details</h5>
                    <table class="table">
                      <tr><td class="fw-bold">Category:</td><td>${product.category}</td></tr>
                      <tr><td class="fw-bold">SKU:</td><td>SH-${product.id.toString().padStart(6, '0')}</td></tr>
                      <tr><td class="fw-bold">Weight:</td><td>Varies by product</td></tr>
                      <tr><td class="fw-bold">Warranty:</td><td>1 Year Limited</td></tr>
                    </table>
                  </div>
                  <div class="col-md-6">
                    <h5 class="fw-bold mb-3">Care Instructions</h5>
                    <ul class="list-unstyled">
                      <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i>Follow manufacturer guidelines</li>
                      <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i>Regular maintenance recommended</li>
                      <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i>Professional cleaning when needed</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <!-- Shipping Tab -->
              <div class="tab-pane fade" id="shipping">
                <div class="row">
                  <div class="col-md-6">
                    <h5 class="fw-bold mb-3">Shipping Information</h5>
                    <ul class="list-unstyled">
                      <li class="mb-2"><i class="bi bi-truck text-primary me-2"></i>Free shipping on orders over $75</li>
                      <li class="mb-2"><i class="bi bi-clock text-primary me-2"></i>Standard delivery: 3-5 business days</li>
                      <li class="mb-2"><i class="bi bi-lightning text-primary me-2"></i>Express delivery: 1-2 business days</li>
                      <li class="mb-2"><i class="bi bi-geo-alt text-primary me-2"></i>Ships nationwide</li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <h5 class="fw-bold mb-3">Return Policy</h5>
                    <ul class="list-unstyled">
                      <li class="mb-2"><i class="bi bi-arrow-clockwise text-success me-2"></i>30-day return window</li>
                      <li class="mb-2"><i class="bi bi-shield-check text-success me-2"></i>Items must be in original condition</li>
                      <li class="mb-2"><i class="bi bi-credit-card text-success me-2"></i>Full refund or exchange</li>
                      <li class="mb-2"><i class="bi bi-headset text-success me-2"></i>Customer service support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Related Products -->
        ${relatedProducts.length > 0 ? `
          <section class="related-products mt-5 pt-5 border-top">
            <h3 class="fw-bold mb-4">Related Products</h3>
            <div class="row g-4">
              ${relatedProducts.map(relatedProduct => `
                <div class="col-sm-6 col-lg-3">
                  <div class="card h-100 shadow-sm product-card">
                    <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}" 
                         style="height: 200px; object-fit: cover; cursor: pointer;"
                         onclick="window.viewProduct(${relatedProduct.id})">
                    <div class="card-body">
                      <h6 class="card-title fw-bold">${relatedProduct.name}</h6>
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="h6 text-primary fw-bold mb-0">$${relatedProduct.price}</span>
                        <div class="text-warning small">
                          ${'★'.repeat(Math.floor(relatedProduct.rating))} (${relatedProduct.rating})
                        </div>
                      </div>
                      <button class="btn btn-outline-primary btn-sm w-100 mt-2" onclick="window.viewProduct(${relatedProduct.id})">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    `
  }
  
  renderReviewsSection(product, reviews, ratingDistribution) {
    return `
      <div class="row">
        <div class="col-lg-4">
          <!-- Rating Summary -->
          <div class="card">
            <div class="card-body text-center">
              <h2 class="display-4 fw-bold text-primary">${this.reviewService.getAverageRating(product.id) || product.rating}</h2>
              <div class="text-warning mb-2">
                ${'★'.repeat(Math.floor(this.reviewService.getAverageRating(product.id) || product.rating))}${'☆'.repeat(5 - Math.floor(this.reviewService.getAverageRating(product.id) || product.rating))}
              </div>
              <p class="text-muted">${reviews.length} reviews</p>
              
              <!-- Rating Distribution -->
              <div class="rating-distribution mt-4">
                ${[5,4,3,2,1].map(rating => `
                  <div class="d-flex align-items-center mb-2">
                    <span class="me-2">${rating}★</span>
                    <div class="progress flex-grow-1 me-2" style="height: 8px;">
                      <div class="progress-bar" style="width: ${reviews.length ? (ratingDistribution[rating] / reviews.length * 100) : 0}%"></div>
                    </div>
                    <small class="text-muted">${ratingDistribution[rating]}</small>
                  </div>
                `).join('')}
              </div>
              
              <button class="btn btn-primary mt-3" onclick="window.writeReview(${product.id})">
                Write a Review
              </button>
            </div>
          </div>
        </div>
        
        <div class="col-lg-8">
          <!-- Reviews List -->
          <div class="reviews-list">
            ${reviews.length > 0 ? reviews.map(review => `
              <div class="review-item border-bottom pb-4 mb-4">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <div class="text-warning mb-1">
                      ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                    <h6 class="fw-bold mb-1">${review.title}</h6>
                    <small class="text-muted">
                      By Customer • ${new Date(review.createdAt).toLocaleDateString()}
                      ${review.verified ? '<span class="badge bg-success ms-2">Verified Purchase</span>' : ''}
                    </small>
                  </div>
                </div>
                <p class="mb-3">${review.comment}</p>
                <div class="d-flex align-items-center">
                  <button class="btn btn-sm btn-outline-secondary me-2" onclick="window.markHelpful(${review.id})">
                    <i class="bi bi-hand-thumbs-up me-1"></i>Helpful (${review.helpful})
                  </button>
                  <button class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-flag me-1"></i>Report
                  </button>
                </div>
              </div>
            `).join('') : `
              <div class="text-center py-5">
                <i class="bi bi-chat-square-text fs-1 text-muted"></i>
                <h5 class="mt-3">No reviews yet</h5>
                <p class="text-muted">Be the first to review this product!</p>
              </div>
            `}
          </div>
        </div>
      </div>
    `
  }
  
  init(params) {
    const product = this.productService.getProductById(params.id)
    
    if (product && product.inStock) {
      const addToCartBtn = document.getElementById('addToCartBtn')
      const quantitySelect = document.getElementById('quantity')
      
      addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantitySelect.value)
        this.cart.addItem(product, quantity)
      })
    }
    
    // Wishlist functionality
    const wishlistBtn = document.querySelector('.wishlist-btn')
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        this.toggleWishlist(product.id)
      })
    }
    
    // Global functions
    window.viewProduct = (productId) => {
      window.router.loadPage('product-detail', { id: productId })
    }
    
    window.buyNow = (productId) => {
      const product = this.productService.getProductById(productId)
      if (product && product.inStock) {
        this.cart.addItem(product)
        window.router.loadPage('cart')
      }
    }
    
    window.shareProduct = () => {
      if (navigator.share) {
        navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        })
      } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href)
        this.showSuccess('Product link copied to clipboard!')
      }
    }
    
    window.writeReview = (productId) => {
      if (!this.userService.isLoggedIn()) {
        this.showError('Please sign in to write a review')
        return
      }
      this.showReviewModal(productId)
    }
    
    window.markHelpful = (reviewId) => {
      this.reviewService.markHelpful(reviewId)
      this.showSuccess('Thank you for your feedback!')
      // Refresh the page to show updated count
      setTimeout(() => {
        window.router.loadPage('product-detail', params)
      }, 1000)
    }
  }
  
  toggleWishlist(productId) {
    if (!this.userService.isLoggedIn()) {
      this.showError('Please sign in to save items to your wishlist')
      return
    }
    
    const isInWishlist = this.userService.isInWishlist(productId)
    const wishlistBtn = document.querySelector('.wishlist-btn')
    const icon = wishlistBtn.querySelector('i')
    
    if (isInWishlist) {
      this.userService.removeFromWishlist(productId)
      wishlistBtn.classList.remove('active')
      icon.className = 'bi bi-heart'
      this.showSuccess('Removed from wishlist')
    } else {
      this.userService.addToWishlist(productId)
      wishlistBtn.classList.add('active')
      icon.className = 'bi bi-heart-fill'
      this.showSuccess('Added to wishlist')
    }
  }
  
  showReviewModal(productId) {
    const modal = document.createElement('div')
    modal.className = 'modal fade'
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Write a Review</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="reviewForm">
              <div class="mb-3">
                <label class="form-label fw-bold">Rating</label>
                <div class="rating-input">
                  ${[1,2,3,4,5].map(rating => `
                    <input type="radio" name="rating" value="${rating}" id="star${rating}" required>
                    <label for="star${rating}">★</label>
                  `).join('')}
                </div>
              </div>
              
              <div class="mb-3">
                <label for="reviewTitle" class="form-label fw-bold">Review Title</label>
                <input type="text" class="form-control" id="reviewTitle" required>
              </div>
              
              <div class="mb-3">
                <label for="reviewComment" class="form-label fw-bold">Your Review</label>
                <textarea class="form-control" id="reviewComment" rows="4" required></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="window.submitReview(${productId})">Submit Review</button>
          </div>
        </div>
      </div>
    `
    
    document.body.appendChild(modal)
    const bsModal = new bootstrap.Modal(modal)
    bsModal.show()
    
    modal.addEventListener('hidden.bs.modal', () => {
      document.body.removeChild(modal)
    })
    
    window.submitReview = (productId) => {
      const form = document.getElementById('reviewForm')
      const rating = form.querySelector('input[name="rating"]:checked')?.value
      const title = document.getElementById('reviewTitle').value
      const comment = document.getElementById('reviewComment').value
      
      if (rating && title && comment) {
        this.reviewService.addReview(productId, this.userService.getCurrentUser().id, {
          rating: parseInt(rating),
          title,
          comment
        })
        
        bsModal.hide()
        this.showSuccess('Review submitted successfully!')
        
        // Refresh the page to show new review
        setTimeout(() => {
          window.router.loadPage('product-detail', { id: productId })
        }, 1000)
      }
    }
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
      <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>${message}
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