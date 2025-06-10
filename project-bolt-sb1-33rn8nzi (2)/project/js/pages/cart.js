import { Cart } from '../cart.js'

export class CartPage {
  constructor() {
    this.cart = new Cart()
  }
  
  render() {
    const cartItems = this.cart.getItems()
    const totalPrice = this.cart.getTotalPrice()
    const totalItems = this.cart.getTotalItems()
    
    if (cartItems.length === 0) {
      return `
        <div class="container py-5">
          <div class="text-center py-5">
            <i class="bi bi-cart-x fs-1 text-muted mb-4"></i>
            <h1 class="display-5 fw-bold mb-3">Your Cart is Empty</h1>
            <p class="lead text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
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
            <h1 class="display-5 fw-bold mb-4">Shopping Cart</h1>
            <p class="text-muted mb-4">${totalItems} items in your cart</p>
          </div>
        </div>
        
        <div class="row g-4">
          <!-- Cart Items -->
          <div class="col-lg-8">
            <div class="card shadow-sm">
              <div class="card-body">
                ${cartItems.map(item => `
                  <div class="cart-item border-bottom py-4" data-item-id="${item.id}">
                    <div class="row g-3 align-items-center">
                      <div class="col-md-2">
                        <img src="${item.image}" alt="${item.name}" 
                             class="img-fluid rounded" style="max-height: 100px; object-fit: cover;">
                      </div>
                      
                      <div class="col-md-4">
                        <h6 class="fw-bold mb-1">${item.name}</h6>
                        <p class="text-muted small mb-1">${item.category}</p>
                        <div class="text-warning small">
                          ${'★'.repeat(Math.floor(item.rating))} (${item.rating})
                        </div>
                      </div>
                      
                      <div class="col-md-2">
                        <span class="fw-bold text-primary">$${item.price}</span>
                      </div>
                      
                      <div class="col-md-2">
                        <div class="input-group input-group-sm">
                          <button class="btn btn-outline-secondary" type="button" 
                                  onclick="window.updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="bi bi-dash"></i>
                          </button>
                          <input type="number" class="form-control text-center" 
                                 value="${item.quantity}" min="1" max="10"
                                 onchange="window.updateQuantity(${item.id}, this.value)">
                          <button class="btn btn-outline-secondary" type="button"
                                  onclick="window.updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div class="col-md-1">
                        <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <div class="col-md-1">
                        <button class="btn btn-outline-danger btn-sm" 
                                onclick="window.removeFromCart(${item.id})">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
                
                <div class="d-flex justify-content-between align-items-center pt-4">
                  <button class="btn btn-outline-secondary" data-page="products">
                    <i class="bi bi-arrow-left me-2"></i>Continue Shopping
                  </button>
                  <button class="btn btn-outline-danger" onclick="window.clearCart()">
                    <i class="bi bi-trash me-2"></i>Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="col-lg-4">
            <div class="card shadow-sm">
              <div class="card-header bg-light">
                <h5 class="fw-bold mb-0">Order Summary</h5>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between mb-3">
                  <span>Subtotal (${totalItems} items):</span>
                  <span class="fw-bold">$${totalPrice.toFixed(2)}</span>
                </div>
                
                <div class="d-flex justify-content-between mb-3">
                  <span>Shipping:</span>
                  <span class="text-success fw-bold">Free</span>
                </div>
                
                <div class="d-flex justify-content-between mb-3">
                  <span>Tax:</span>
                  <span>$${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                
                <hr>
                
                <div class="d-flex justify-content-between mb-4">
                  <span class="fw-bold fs-5">Total:</span>
                  <span class="fw-bold fs-5 text-primary">$${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
                </div>
                
                <div class="d-grid gap-2">
                  <button class="btn btn-primary btn-lg" onclick="window.proceedToCheckout()">
                    <i class="bi bi-credit-card me-2"></i>Proceed to Checkout
                  </button>
                  <button class="btn btn-outline-primary" onclick="window.saveForLater()">
                    <i class="bi bi-bookmark me-2"></i>Save for Later
                  </button>
                </div>
                
                <!-- Promo Code -->
                <div class="mt-4">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Promo code" id="promoCode">
                    <button class="btn btn-outline-secondary" type="button" onclick="window.applyPromoCode()">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Security Info -->
            <div class="card shadow-sm mt-4">
              <div class="card-body text-center">
                <i class="bi bi-shield-check fs-1 text-success mb-3"></i>
                <h6 class="fw-bold">Secure Checkout</h6>
                <p class="small text-muted mb-0">Your payment information is encrypted and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  
  init() {
    // Make cart management functions globally available
    window.updateQuantity = (productId, quantity) => {
      const qty = parseInt(quantity)
      if (qty > 0 && qty <= 10) {
        this.cart.updateQuantity(productId, qty)
        this.refreshCartPage()
      }
    }
    
    window.removeFromCart = (productId) => {
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        this.cart.removeItem(productId)
        this.refreshCartPage()
      }
    }
    
    window.clearCart = () => {
      if (confirm('Are you sure you want to clear your entire cart?')) {
        this.cart.clearCart()
        this.refreshCartPage()
      }
    }
    
    window.proceedToCheckout = () => {
      alert('Checkout functionality would be implemented here. This would typically redirect to a payment processor like Stripe.')
    }
    
    window.saveForLater = () => {
      // This would typically save items to a wishlist
      alert('Items saved for later! This feature would typically save items to your account for future purchase.')
    }
    
    window.applyPromoCode = () => {
      const promoCode = document.getElementById('promoCode').value.trim()
      if (promoCode) {
        // This would typically validate the promo code with the backend
        if (promoCode.toLowerCase() === 'save10') {
          alert('Promo code applied! 10% discount has been applied to your order.')
        } else {
          alert('Invalid promo code. Please check your code and try again.')
        }
      }
    }
  }
  
  refreshCartPage() {
    // Reload the cart page to reflect changes
    window.router.loadPage('cart')
  }
}