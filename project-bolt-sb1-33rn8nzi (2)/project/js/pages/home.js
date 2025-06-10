import { ProductService } from '../products.js'

export class HomePage {
  constructor() {
    this.productService = new ProductService()
  }
  
  render() {
    const featuredProducts = this.productService.getAllProducts().slice(0, 4)
    const categories = this.productService.getCategories()
    
    return `
      <!-- Hero Section -->
      <section class="hero-section bg-primary text-white py-5">
        <div class="container">
          <div class="row align-items-center min-vh-50">
            <div class="col-lg-6">
              <h1 class="display-4 fw-bold mb-4">Transform Your Home</h1>
              <p class="lead mb-4">Discover premium home goods, furniture, and lifestyle products that bring comfort and style to every corner of your space.</p>
              <div class="d-flex gap-3 flex-wrap">
                <button class="btn btn-warning btn-lg px-4" data-page="products">
                  <i class="bi bi-house-heart me-2"></i>Shop Home Goods
                </button>
                <button class="btn btn-outline-light btn-lg px-4" data-page="contact">
                  <i class="bi bi-telephone me-2"></i>Contact Us
                </button>
              </div>
            </div>
            <div class="col-lg-6 text-center">
              <img src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600" 
                   alt="Beautiful Home Interior" class="img-fluid rounded shadow-lg">
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-5">
        <div class="container">
          <h2 class="text-center mb-5 fw-bold">Shop by Category</h2>
          <div class="row g-4">
            ${categories.map(category => `
              <div class="col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm category-card" data-category="${category}">
                  <div class="card-body text-center p-4">
                    <div class="category-icon mb-3">
                      <i class="bi ${this.getCategoryIcon(category)} fs-1 text-primary"></i>
                    </div>
                    <h5 class="card-title fw-bold">${category}</h5>
                    <p class="card-text text-muted">Explore our ${category.toLowerCase()} collection</p>
                    <button class="btn btn-outline-primary" data-page="products" data-category="${category}">
                      Browse ${category}
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-5 fw-bold">Featured Products</h2>
          <div class="row g-4">
            ${featuredProducts.map(product => `
              <div class="col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm product-card" data-product-id="${product.id}">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                  <div class="card-body d-flex flex-column">
                    <h6 class="card-title fw-bold">${product.name}</h6>
                    <p class="card-text text-muted small flex-grow-1">${product.description.substring(0, 80)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="h5 text-primary fw-bold mb-0">$${product.price}</span>
                      <div class="text-warning">
                        ${'★'.repeat(Math.floor(product.rating))} (${product.rating})
                      </div>
                    </div>
                    <button class="btn btn-primary mt-3 w-100" onclick="window.viewProduct(${product.id})">
                      <i class="bi bi-eye me-2"></i>View Details
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="text-center mt-5">
            <button class="btn btn-outline-primary btn-lg" data-page="products">
              <i class="bi bi-grid me-2"></i>View All Products
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-5">
        <div class="container">
          <div class="row g-4">
            <div class="col-md-4 text-center">
              <div class="feature-box p-4">
                <i class="bi bi-truck fs-1 text-primary mb-3"></i>
                <h5 class="fw-bold">Free Shipping</h5>
                <p class="text-muted">Free shipping on orders over $75</p>
              </div>
            </div>
            <div class="col-md-4 text-center">
              <div class="feature-box p-4">
                <i class="bi bi-arrow-clockwise fs-1 text-success mb-3"></i>
                <h5 class="fw-bold">Easy Returns</h5>
                <p class="text-muted">30-day return policy on all items</p>
              </div>
            </div>
            <div class="col-md-4 text-center">
              <div class="feature-box p-4">
                <i class="bi bi-house-heart fs-1 text-warning mb-3"></i>
                <h5 class="fw-bold">Home Design</h5>
                <p class="text-muted">Expert interior design consultation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }
  
  getCategoryIcon(category) {
    const icons = {
      'Furniture': 'bi-house-door',
      'Kitchen': 'bi-cup-hot',
      'Textiles': 'bi-palette',
      'Decor': 'bi-gem'
    }
    return icons[category] || 'bi-house'
  }
  
  init() {
    // Add click handlers for category cards
    document.querySelectorAll('[data-category]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          const category = card.getAttribute('data-category')
          window.router.loadPage('products', { category })
        }
      })
    })
    
    // Make viewProduct function globally available
    window.viewProduct = (productId) => {
      window.router.loadPage('product-detail', { id: productId })
    }
  }
}