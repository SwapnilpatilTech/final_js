export class Cart {
  constructor() {
    this.items = this.loadCartFromStorage()
  }
  
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({
        ...product,
        quantity: quantity
      })
    }
    
    this.saveCartToStorage()
    this.updateCartCount()
    this.showAddToCartNotification(product.name)
  }
  
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId)
    this.saveCartToStorage()
    this.updateCartCount()
  }
  
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
        this.saveCartToStorage()
        this.updateCartCount()
      }
    }
  }
  
  getItems() {
    return this.items
  }
  
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }
  
  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
  
  clearCart() {
    this.items = []
    this.saveCartToStorage()
    this.updateCartCount()
  }
  
  loadCartFromStorage() {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  }
  
  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items))
  }
  
  updateCartCount() {
    const cartCountElement = document.getElementById('cartCount')
    if (cartCountElement) {
      const totalItems = this.getTotalItems()
      cartCountElement.textContent = totalItems
      cartCountElement.style.display = totalItems > 0 ? 'block' : 'none'
    }
  }
  
  showAddToCartNotification(productName) {
    // Create toast notification
    const toast = document.createElement('div')
    toast.className = 'toast position-fixed top-0 end-0 m-3'
    toast.style.zIndex = '9999'
    toast.innerHTML = `
      <div class="toast-header bg-success text-white">
        <i class="bi bi-check-circle me-2"></i>
        <strong class="me-auto">Added to Cart</strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        ${productName} has been added to your cart.
      </div>
    `
    
    document.body.appendChild(toast)
    
    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toast)
    bsToast.show()
    
    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
      document.body.removeChild(toast)
    })
  }
}