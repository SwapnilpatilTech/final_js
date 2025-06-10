export class ContactPage {
  render() {
    return `
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="text-center mb-5">
              <h1 class="display-5 fw-bold">Contact Us</h1>
              <p class="lead text-muted">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>
          </div>
        </div>
        
        <div class="row g-5">
          <!-- Contact Form -->
          <div class="col-lg-8">
            <div class="card shadow-sm">
              <div class="card-body p-5">
                <h3 class="fw-bold mb-4">Send us a Message</h3>
                
                <form id="contactForm" novalidate>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label for="firstName" class="form-label fw-bold">First Name *</label>
                      <input type="text" class="form-control" id="firstName" required>
                      <div class="invalid-feedback">Please provide a valid first name.</div>
                    </div>
                    
                    <div class="col-md-6">
                      <label for="lastName" class="form-label fw-bold">Last Name *</label>
                      <input type="text" class="form-control" id="lastName" required>
                      <div class="invalid-feedback">Please provide a valid last name.</div>
                    </div>
                    
                    <div class="col-12">
                      <label for="email" class="form-label fw-bold">Email Address *</label>
                      <input type="email" class="form-control" id="email" required>
                      <div class="invalid-feedback">Please provide a valid email address.</div>
                    </div>
                    
                    <div class="col-12">
                      <label for="phone" class="form-label fw-bold">Phone Number</label>
                      <input type="tel" class="form-control" id="phone">
                      <div class="form-text">Optional - We'll call you if needed</div>
                    </div>
                    
                    <div class="col-12">
                      <label for="subject" class="form-label fw-bold">Subject *</label>
                      <select class="form-select" id="subject" required>
                        <option value="">Choose a subject...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Customer Support</option>
                        <option value="order">Order Related</option>
                        <option value="returns">Returns & Refunds</option>
                        <option value="partnership">Business Partnership</option>
                        <option value="feedback">Feedback & Suggestions</option>
                      </select>
                      <div class="invalid-feedback">Please select a subject.</div>
                    </div>
                    
                    <div class="col-12">
                      <label for="message" class="form-label fw-bold">Message *</label>
                      <textarea class="form-control" id="message" rows="6" placeholder="Please provide as much detail as possible..." required></textarea>
                      <div class="invalid-feedback">Please provide a message.</div>
                      <div class="form-text">Minimum 10 characters required</div>
                    </div>
                    
                    <div class="col-12">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="newsletter">
                        <label class="form-check-label" for="newsletter">
                          Subscribe to our newsletter for updates and special offers
                        </label>
                      </div>
                    </div>
                    
                    <div class="col-12">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="privacy" required>
                        <label class="form-check-label" for="privacy">
                          I agree to the <a href="#" class="text-decoration-none">Privacy Policy</a> and <a href="#" class="text-decoration-none">Terms of Service</a> *
                        </label>
                        <div class="invalid-feedback">You must agree to our terms to proceed.</div>
                      </div>
                    </div>
                    
                    <div class="col-12">
                      <button class="btn btn-primary btn-lg px-5" type="submit">
                        <i class="bi bi-send me-2"></i>Send Message
                      </button>
                      <button class="btn btn-outline-secondary btn-lg px-4 ms-3" type="reset">
                        <i class="bi bi-arrow-clockwise me-2"></i>Reset Form
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div class="col-lg-4">
            <div class="card shadow-sm mb-4">
              <div class="card-body p-4">
                <h5 class="fw-bold mb-4">Get in Touch</h5>
                
                <div class="contact-item d-flex mb-4">
                  <div class="contact-icon me-3">
                    <i class="bi bi-geo-alt-fill fs-4 text-primary"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-1">Address</h6>
                    <p class="text-muted mb-0">123 Main Street<br>City, State 12345<br>United States</p>
                  </div>
                </div>
                
                <div class="contact-item d-flex mb-4">
                  <div class="contact-icon me-3">
                    <i class="bi bi-telephone-fill fs-4 text-primary"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-1">Phone</h6>
                    <p class="text-muted mb-0">(555) 123-4567</p>
                  </div>
                </div>
                
                <div class="contact-item d-flex mb-4">
                  <div class="contact-icon me-3">
                    <i class="bi bi-envelope-fill fs-4 text-primary"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-1">Email</h6>
                    <p class="text-muted mb-0">info@snowshop.com<br>support@snowshop.com</p>
                  </div>
                </div>
                
                <div class="contact-item d-flex mb-4">
                  <div class="contact-icon me-3">
                    <i class="bi bi-clock-fill fs-4 text-primary"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-1">Business Hours</h6>
                    <p class="text-muted mb-0">
                      Mon-Fri: 9:00 AM - 6:00 PM<br>
                      Sat: 10:00 AM - 4:00 PM<br>
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- FAQ Section -->
            <div class="card shadow-sm">
              <div class="card-body p-4">
                <h5 class="fw-bold mb-4">Frequently Asked Questions</h5>
                
                <div class="accordion" id="faqAccordion">
                  <div class="accordion-item">
                    <h6 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                        What is your return policy?
                      </button>
                    </h6>
                    <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div class="accordion-body">
                        We offer a 30-day return policy for all items in original condition with receipt.
                      </div>
                    </div>
                  </div>
                  
                  <div class="accordion-item">
                    <h6 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                        How long does shipping take?
                      </button>
                    </h6>
                    <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div class="accordion-body">
                        Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery.
                      </div>
                    </div>
                  </div>
                  
                  <div class="accordion-item">
                    <h6 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                        Do you offer international shipping?
                      </button>
                    </h6>
                    <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div class="accordion-body">
                        Yes, we ship to over 50 countries worldwide. International shipping rates apply.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  
  init() {
    const form = document.getElementById('contactForm')
    
    // Form validation and submission
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      e.stopPropagation()
      
      if (this.validateForm()) {
        this.submitForm()
      }
      
      form.classList.add('was-validated')
    })
    
    // Real-time validation for specific fields
    this.setupRealTimeValidation()
  }
  
  validateForm() {
    const form = document.getElementById('contactForm')
    const firstName = document.getElementById('firstName').value.trim()
    const lastName = document.getElementById('lastName').value.trim()
    const email = document.getElementById('email').value.trim()
    const subject = document.getElementById('subject').value
    const message = document.getElementById('message').value.trim()
    const privacy = document.getElementById('privacy').checked
    
    let isValid = true
    
    // Custom validation rules
    if (firstName.length < 2) {
      this.setCustomValidity('firstName', 'First name must be at least 2 characters long')
      isValid = false
    } else {
      this.setCustomValidity('firstName', '')
    }
    
    if (lastName.length < 2) {
      this.setCustomValidity('lastName', 'Last name must be at least 2 characters long')
      isValid = false
    } else {
      this.setCustomValidity('lastName', '')
    }
    
    if (!this.isValidEmail(email)) {
      this.setCustomValidity('email', 'Please enter a valid email address')
      isValid = false
    } else {
      this.setCustomValidity('email', '')
    }
    
    if (message.length < 10) {
      this.setCustomValidity('message', 'Message must be at least 10 characters long')
      isValid = false
    } else {
      this.setCustomValidity('message', '')
    }
    
    if (!privacy) {
      this.setCustomValidity('privacy', 'You must agree to our terms to proceed')
      isValid = false
    } else {
      this.setCustomValidity('privacy', '')
    }
    
    return isValid && form.checkValidity()
  }
  
  setupRealTimeValidation() {
    // Email validation
    const emailInput = document.getElementById('email')
    emailInput.addEventListener('blur', () => {
      if (emailInput.value && !this.isValidEmail(emailInput.value)) {
        this.setCustomValidity('email', 'Please enter a valid email address')
      } else {
        this.setCustomValidity('email', '')
      }
    })
    
    // Message length validation
    const messageInput = document.getElementById('message')
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.trim().length
      const counter = document.getElementById('messageCounter')
      
      if (!counter) {
        const counterEl = document.createElement('div')
        counterEl.id = 'messageCounter'
        counterEl.className = 'form-text'
        messageInput.parentNode.appendChild(counterEl)
      }
      
      document.getElementById('messageCounter').textContent = `${length} characters (minimum 10 required)`
      
      if (length > 0 && length < 10) {
        this.setCustomValidity('message', 'Message must be at least 10 characters long')
      } else {
        this.setCustomValidity('message', '')
      }
    })
  }
  
  setCustomValidity(fieldId, message) {
    const field = document.getElementById(fieldId)
    field.setCustomValidity(message)
    
    const feedback = field.parentNode.querySelector('.invalid-feedback')
    if (feedback && message) {
      feedback.textContent = message
    }
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  submitForm() {
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="spinner-border spinner-border-sm me-2"></i>Sending...'
    submitBtn.disabled = true
    
    // Simulate form submission
    setTimeout(() => {
      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      
      // Show success message
      this.showSuccessMessage()
      
      // Reset form
      document.getElementById('contactForm').reset()
      document.getElementById('contactForm').classList.remove('was-validated')
    }, 2000)
  }
  
  showSuccessMessage() {
    const successAlert = document.createElement('div')
    successAlert.className = 'alert alert-success alert-dismissible fade show'
    successAlert.innerHTML = `
      <i class="bi bi-check-circle me-2"></i>
      <strong>Message Sent Successfully!</strong> Thank you for contacting us. We'll get back to you within 24 hours.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `
    
    const form = document.getElementById('contactForm')
    form.parentNode.insertBefore(successAlert, form)
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (successAlert.parentNode) {
        successAlert.remove()
      }
    }, 5000)
  }
}