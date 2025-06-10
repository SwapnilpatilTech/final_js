export class UserService {
  constructor() {
    this.currentUser = this.loadUserFromStorage()
    this.users = this.loadUsersFromStorage()
  }
  
  register(userData) {
    const { email, password, firstName, lastName, phone } = userData
    
    // Check if user already exists
    if (this.users.find(user => user.email === email)) {
      throw new Error('User with this email already exists')
    }
    
    const newUser = {
      id: Date.now(),
      email,
      password, // In real app, this would be hashed
      firstName,
      lastName,
      phone,
      createdAt: new Date().toISOString(),
      addresses: [],
      orders: [],
      wishlist: [],
      preferences: {
        newsletter: false,
        notifications: true
      }
    }
    
    this.users.push(newUser)
    this.saveUsersToStorage()
    return newUser
  }
  
  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password)
    if (!user) {
      throw new Error('Invalid email or password')
    }
    
    this.currentUser = user
    this.saveUserToStorage()
    return user
  }
  
  logout() {
    this.currentUser = null
    localStorage.removeItem('currentUser')
  }
  
  getCurrentUser() {
    return this.currentUser
  }
  
  isLoggedIn() {
    return !!this.currentUser
  }
  
  updateProfile(userData) {
    if (!this.currentUser) throw new Error('No user logged in')
    
    Object.assign(this.currentUser, userData)
    this.saveUserToStorage()
    this.saveUsersToStorage()
    return this.currentUser
  }
  
  addToWishlist(productId) {
    if (!this.currentUser) throw new Error('Please login to add to wishlist')
    
    if (!this.currentUser.wishlist.includes(productId)) {
      this.currentUser.wishlist.push(productId)
      this.saveUserToStorage()
      this.saveUsersToStorage()
    }
  }
  
  removeFromWishlist(productId) {
    if (!this.currentUser) return
    
    this.currentUser.wishlist = this.currentUser.wishlist.filter(id => id !== productId)
    this.saveUserToStorage()
    this.saveUsersToStorage()
  }
  
  isInWishlist(productId) {
    return this.currentUser?.wishlist?.includes(productId) || false
  }
  
  loadUserFromStorage() {
    const stored = localStorage.getItem('currentUser')
    return stored ? JSON.parse(stored) : null
  }
  
  saveUserToStorage() {
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    }
  }
  
  loadUsersFromStorage() {
    const stored = localStorage.getItem('users')
    return stored ? JSON.parse(stored) : []
  }
  
  saveUsersToStorage() {
    localStorage.setItem('users', JSON.stringify(this.users))
  }
}