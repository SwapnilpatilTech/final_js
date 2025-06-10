export class ReviewService {
  constructor() {
    this.reviews = this.loadReviewsFromStorage()
  }
  
  addReview(productId, userId, reviewData) {
    const review = {
      id: Date.now(),
      productId: parseInt(productId),
      userId,
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      helpful: 0,
      verified: Math.random() > 0.3, // 70% chance of verified purchase
      createdAt: new Date().toISOString()
    }
    
    this.reviews.push(review)
    this.saveReviewsToStorage()
    return review
  }
  
  getProductReviews(productId) {
    return this.reviews
      .filter(review => review.productId === parseInt(productId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
  
  getAverageRating(productId) {
    const productReviews = this.getProductReviews(productId)
    if (productReviews.length === 0) return 0
    
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / productReviews.length).toFixed(1)
  }
  
  getRatingDistribution(productId) {
    const productReviews = this.getProductReviews(productId)
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    
    productReviews.forEach(review => {
      distribution[review.rating]++
    })
    
    return distribution
  }
  
  markHelpful(reviewId) {
    const review = this.reviews.find(r => r.id === reviewId)
    if (review) {
      review.helpful++
      this.saveReviewsToStorage()
    }
  }
  
  loadReviewsFromStorage() {
    const stored = localStorage.getItem('reviews')
    if (stored) {
      return JSON.parse(stored)
    }
    
    // Default reviews for demo
    return [
      {
        id: 1,
        productId: 1,
        userId: 'demo1',
        rating: 5,
        title: "Absolutely love this sofa!",
        comment: "The quality is outstanding and it's incredibly comfortable. Perfect for our living room.",
        helpful: 12,
        verified: true,
        createdAt: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        productId: 1,
        userId: 'demo2',
        rating: 4,
        title: "Great value for money",
        comment: "Good quality sofa, delivery was quick. Only minor issue was assembly instructions could be clearer.",
        helpful: 8,
        verified: true,
        createdAt: "2024-01-10T14:20:00Z"
      },
      {
        id: 3,
        productId: 2,
        userId: 'demo3',
        rating: 5,
        title: "Beautiful dinnerware set",
        comment: "Elegant design and very durable. We use it for both everyday meals and special occasions.",
        helpful: 15,
        verified: true,
        createdAt: "2024-01-12T09:15:00Z"
      }
    ]
  }
  
  saveReviewsToStorage() {
    localStorage.setItem('reviews', JSON.stringify(this.reviews))
  }
}