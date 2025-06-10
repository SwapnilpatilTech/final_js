export class NewsletterService {
  constructor() {
    this.subscribers = this.loadSubscribersFromStorage()
  }
  
  subscribe(email, preferences = {}) {
    if (this.isSubscribed(email)) {
      throw new Error('Email already subscribed')
    }
    
    const subscriber = {
      id: Date.now(),
      email,
      subscribedAt: new Date().toISOString(),
      preferences: {
        newProducts: preferences.newProducts || true,
        sales: preferences.sales || true,
        homeDesignTips: preferences.homeDesignTips || false,
        ...preferences
      },
      active: true
    }
    
    this.subscribers.push(subscriber)
    this.saveSubscribersToStorage()
    return subscriber
  }
  
  unsubscribe(email) {
    const subscriber = this.subscribers.find(s => s.email === email)
    if (subscriber) {
      subscriber.active = false
      this.saveSubscribersToStorage()
    }
  }
  
  isSubscribed(email) {
    return this.subscribers.some(s => s.email === email && s.active)
  }
  
  updatePreferences(email, preferences) {
    const subscriber = this.subscribers.find(s => s.email === email)
    if (subscriber) {
      subscriber.preferences = { ...subscriber.preferences, ...preferences }
      this.saveSubscribersToStorage()
    }
  }
  
  loadSubscribersFromStorage() {
    const stored = localStorage.getItem('newsletterSubscribers')
    return stored ? JSON.parse(stored) : []
  }
  
  saveSubscribersToStorage() {
    localStorage.setItem('newsletterSubscribers', JSON.stringify(this.subscribers))
  }
}