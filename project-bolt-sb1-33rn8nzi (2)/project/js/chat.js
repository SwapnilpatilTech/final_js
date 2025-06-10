export class ChatService {
  constructor() {
    this.isOpen = false
    this.messages = []
    this.isTyping = false
  }
  
  init() {
    this.createChatWidget()
    this.setupEventListeners()
  }
  
  createChatWidget() {
    const chatWidget = document.createElement('div')
    chatWidget.id = 'chatWidget'
    chatWidget.innerHTML = `
      <!-- Chat Toggle Button -->
      <div id="chatToggle" class="chat-toggle">
        <i class="bi bi-chat-dots-fill"></i>
        <span class="chat-notification" id="chatNotification">1</span>
      </div>
      
      <!-- Chat Window -->
      <div id="chatWindow" class="chat-window">
        <div class="chat-header">
          <div class="d-flex align-items-center">
            <div class="chat-avatar me-2">
              <i class="bi bi-person-circle"></i>
            </div>
            <div>
              <h6 class="mb-0">Customer Support</h6>
              <small class="text-success">Online</small>
            </div>
          </div>
          <button class="btn btn-sm" id="chatClose">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div class="chat-messages" id="chatMessages">
          <div class="message bot-message">
            <div class="message-content">
              <p>Hi! 👋 Welcome to SnowShop! How can I help you today?</p>
              <small class="message-time">Just now</small>
            </div>
          </div>
        </div>
        
        <div class="chat-typing" id="chatTyping" style="display: none;">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <small>Support is typing...</small>
        </div>
        
        <div class="chat-input">
          <div class="input-group">
            <input type="text" class="form-control" id="chatMessageInput" 
                   placeholder="Type your message...">
            <button class="btn btn-primary" id="chatSend">
              <i class="bi bi-send"></i>
            </button>
          </div>
        </div>
        
        <div class="chat-quick-actions">
          <button class="btn btn-outline-primary btn-sm quick-action" data-message="I need help with my order">
            Order Help
          </button>
          <button class="btn btn-outline-primary btn-sm quick-action" data-message="What's your return policy?">
            Returns
          </button>
          <button class="btn btn-outline-primary btn-sm quick-action" data-message="Do you offer free shipping?">
            Shipping
          </button>
        </div>
      </div>
    `
    
    document.body.appendChild(chatWidget)
  }
  
  setupEventListeners() {
    const chatToggle = document.getElementById('chatToggle')
    const chatClose = document.getElementById('chatClose')
    const chatSend = document.getElementById('chatSend')
    const chatInput = document.getElementById('chatMessageInput')
    
    chatToggle.addEventListener('click', () => this.toggleChat())
    chatClose.addEventListener('click', () => this.closeChat())
    chatSend.addEventListener('click', () => this.sendMessage())
    
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage()
      }
    })
    
    // Quick actions
    document.querySelectorAll('.quick-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const message = e.target.getAttribute('data-message')
        this.sendUserMessage(message)
      })
    })
  }
  
  toggleChat() {
    this.isOpen = !this.isOpen
    const chatWindow = document.getElementById('chatWindow')
    const chatNotification = document.getElementById('chatNotification')
    
    if (this.isOpen) {
      chatWindow.style.display = 'flex'
      chatNotification.style.display = 'none'
    } else {
      chatWindow.style.display = 'none'
    }
  }
  
  closeChat() {
    this.isOpen = false
    document.getElementById('chatWindow').style.display = 'none'
  }
  
  sendMessage() {
    const input = document.getElementById('chatMessageInput')
    const message = input.value.trim()
    
    if (message) {
      this.sendUserMessage(message)
      input.value = ''
    }
  }
  
  sendUserMessage(message) {
    this.addMessage(message, 'user')
    
    // Simulate bot response
    setTimeout(() => {
      this.showTyping()
      setTimeout(() => {
        this.hideTyping()
        this.addBotResponse(message)
      }, 1500)
    }, 500)
  }
  
  addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages')
    const messageDiv = document.createElement('div')
    messageDiv.className = `message ${sender}-message`
    
    messageDiv.innerHTML = `
      <div class="message-content">
        <p>${message}</p>
        <small class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
      </div>
    `
    
    messagesContainer.appendChild(messageDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
  
  addBotResponse(userMessage) {
    let response = "Thank you for your message! Our team will get back to you shortly."
    
    // Simple keyword-based responses
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('order') || lowerMessage.includes('shipping')) {
      response = "For order inquiries, please check your email for tracking information. Orders typically ship within 1-2 business days with free shipping on orders over $75."
    } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      response = "We offer a 30-day return policy on all items. Items must be in original condition. You can start a return by visiting our returns page or contacting customer service."
    } else if (lowerMessage.includes('size') || lowerMessage.includes('dimension')) {
      response = "Product dimensions are listed on each product page. If you need specific measurements, please let me know which product you're interested in!"
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('card')) {
      response = "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our encrypted checkout system."
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = "Hello! Welcome to SnowShop! I'm here to help you with any questions about our home goods and furniture. What can I assist you with today?"
    }
    
    this.addMessage(response, 'bot')
  }
  
  showTyping() {
    document.getElementById('chatTyping').style.display = 'flex'
    const messagesContainer = document.getElementById('chatMessages')
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
  
  hideTyping() {
    document.getElementById('chatTyping').style.display = 'none'
  }
}