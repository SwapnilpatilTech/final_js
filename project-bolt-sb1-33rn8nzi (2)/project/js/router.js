import { HomePage } from './pages/home.js'
import { ProductsPage } from './pages/products.js'
import { ProductDetailPage } from './pages/product-detail.js'
import { CartPage } from './pages/cart.js'
import { ContactPage } from './pages/contact.js'
import { AccountPage } from './pages/account.js'
import { WishlistPage } from './pages/wishlist.js'

export class Router {
  constructor() {
    this.pages = {
      home: new HomePage(),
      products: new ProductsPage(),
      'product-detail': new ProductDetailPage(),
      cart: new CartPage(),
      contact: new ContactPage(),
      account: new AccountPage(),
      wishlist: new WishlistPage()
    }
  }
  
  loadPage(pageName, params = {}) {
    const page = this.pages[pageName]
    if (page) {
      const content = page.render(params)
      document.getElementById('mainContent').innerHTML = content
      
      // Initialize page-specific functionality
      if (page.init) {
        page.init(params)
      }
      
      // Update page title
      this.updatePageTitle(pageName)
      
      // Scroll to top
      window.scrollTo(0, 0)
    }
  }
  
  updatePageTitle(pageName) {
    const titles = {
      home: 'SnowShop - Premium Home Goods & Furniture',
      products: 'Products - SnowShop',
      'product-detail': 'Product Details - SnowShop',
      cart: 'Shopping Cart - SnowShop',
      contact: 'Contact Us - SnowShop',
      account: 'My Account - SnowShop',
      wishlist: 'My Wishlist - SnowShop'
    }
    
    document.title = titles[pageName] || 'SnowShop'
  }
}