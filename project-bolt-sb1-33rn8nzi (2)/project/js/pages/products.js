import { ProductService } from '../products.js'
import { Cart } from '../cart.js'

export class ProductsPage {
  constructor() {
    this.productService = new ProductService()
    this.cart = new Cart()
    this.currentProducts = []
  }
  
  render(params = {}) {
    let products = this.productService.getAllProducts()
    let pageTitle = 'All Products'
    
    // Apply filters based on parameters
    if (params.category) {
      products = this.productService.getProductsByCategory(params.category)
      pageTitle = `${params.category} Products`
    }
    
    if (params.search) {
      products = this.productService.searchProducts(params.search)
      pageTitle = `Search Results for "${params.search}"`
    }
    
    this.currentProducts = products
    const categories = this.productService.getCategories()
    
    return `
      <div class="container py-5">
        <!-- Page Header -->
        <div class="row mb-4">
          <div class="col">
            <h1 class="display-5 fw-bold">${pageTitle}</h1>
            <p class="text-muted">Showing ${products.length} products</p>
          </div>
        </div>
        
        <!-- Filters and Sorting -->
        <div class="row mb-4">
          <div class="col-md-8">
            <div class="d-flex flex-wrap gap-2">
              <button class="btn btn-outline-primary filter-btn active" data-filter="all">
                All Categories
              </button>
              ${categories.map(category => `
                <button class="btn btn-outline-primary filter-btn" data-filter="${category}">
                  ${category}
                </button>
              `).join('')}
            </div>
          </div>
          <div class="col-md-4">
            <select class="form-select" id="sortSelect">
              <option value="">Sort by...</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating (Highest)</option>
            </select>
          </div>
        </div>
        
        <!-- Products Grid -->
        <div class="row g-4" id="productsContainer">
          ${this.renderProductCards(products)}
        </div>
        
        ${products.length === 0 ? `
          <div class="text-center py-5">
            <i class="bi bi-search fs-1 text-muted"></i>
            <h3 class="mt-3 text-muted">No products found</h3>
            <p class="text-muted">Try adjusting your search criteria or browse all products.</p>
            <button class="btn btn-primary" onclick="window.location.reload()">
              <i class="bi bi-arrow-clockwise me-2"></i>Reset Filters
            </button>
          </div>
        ` : ''}
      </div>
    `
  }
  
  renderProductCards(products) {
    return products.map(product => `
      <div class="col-sm-6 col-lg-4 col-xl-3">
        <div class="card h-100 shadow-sm product-card position-relative">
          ${!product.inStock ? '<div class="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 rounded-end"><small>Out of Stock</small></div>' : ''}
          
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
                      onclick="window.addToCart(${product.id})"
                      ${!product.inStock ? 'disabled' : ''}>
                <i class="bi bi-cart-plus me-2"></i>
                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('')
  }
  
  init(params = {}) {
    // Set up filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.getAttribute('data-filter')
        this.applyFilter(filter)
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
        e.target.classList.add('active')
      })
    })
    
    // Set up sorting
    const sortSelect = document.getElementById('sortSelect')
    sortSelect.addEventListener('change', (e) => {
      this.applySorting(e.target.value)
    })
    
    // Set active filter if category parameter is provided
    if (params.category) {
      const categoryBtn = document.querySelector(`[data-filter="${params.category}"]`)
      if (categoryBtn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
        categoryBtn.classList.add('active')
      }
    }
    
    // Make functions globally available
    window.viewProduct = (productId) => {
      window.router.loadPage('product-detail', { id: productId })
    }
    
    window.addToCart = (productId) => {
      const product = this.productService.getProductById(productId)
      if (product && product.inStock) {
        this.cart.addItem(product)
      }
    }
  }
  
  applyFilter(filter) {
    let filteredProducts = this.productService.getAllProducts()
    
    if (filter !== 'all') {
      filteredProducts = this.productService.getProductsByCategory(filter)
    }
    
    this.currentProducts = filteredProducts
    this.updateProductsDisplay(filteredProducts)
  }
  
  applySorting(sortBy) {
    if (sortBy) {
      const sortedProducts = this.productService.sortProducts(this.currentProducts, sortBy)
      this.updateProductsDisplay(sortedProducts)
    }
  }
  
  updateProductsDisplay(products) {
    const container = document.getElementById('productsContainer')
    container.innerHTML = this.renderProductCards(products)
  }
}