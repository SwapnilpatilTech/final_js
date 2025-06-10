export class ProductService {
  constructor() {
    this.products = [
      {
        id: 1,
        name: "Modern Sectional Sofa",
        price: 1299.99,
        category: "Furniture",
        image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Comfortable L-shaped sectional sofa with premium fabric upholstery and sturdy wooden frame.",
        features: ["Premium fabric upholstery", "Solid wood frame", "Removable cushions", "L-shaped design"],
        inStock: true,
        rating: 4.8
      },
      {
        id: 2,
        name: "Ceramic Dinnerware Set",
        price: 89.99,
        category: "Kitchen",
        image: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "16-piece ceramic dinnerware set perfect for family dining and entertaining guests.",
        features: ["16-piece set", "Dishwasher safe", "Microwave safe", "Elegant design"],
        inStock: true,
        rating: 4.6
      },
      {
        id: 3,
        name: "Luxury Throw Blanket",
        price: 49.99,
        category: "Textiles",
        image: "https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Ultra-soft luxury throw blanket made from premium materials for ultimate comfort.",
        features: ["Ultra-soft material", "Machine washable", "50x60 inches", "Multiple colors"],
        inStock: true,
        rating: 4.7
      },
      {
        id: 4,
        name: "Wooden Coffee Table",
        price: 299.99,
        category: "Furniture",
        image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Rustic wooden coffee table with storage shelf, perfect for modern living rooms.",
        features: ["Solid wood construction", "Storage shelf", "Rustic finish", "Easy assembly"],
        inStock: true,
        rating: 4.5
      },
      {
        id: 5,
        name: "Decorative Wall Mirror",
        price: 129.99,
        category: "Decor",
        image: "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Round decorative wall mirror with elegant frame to enhance any room's aesthetic.",
        features: ["Round design", "Decorative frame", "Easy mounting", "Premium glass"],
        inStock: true,
        rating: 4.4
      },
      {
        id: 6,
        name: "Kitchen Knife Set",
        price: 159.99,
        category: "Kitchen",
        image: "https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Professional 8-piece kitchen knife set with wooden block for culinary enthusiasts.",
        features: ["8-piece set", "Stainless steel blades", "Wooden block included", "Professional grade"],
        inStock: true,
        rating: 4.8
      },
      {
        id: 7,
        name: "Aromatherapy Candle Set",
        price: 39.99,
        category: "Decor",
        image: "https://images.pexels.com/photos/6186810/pexels-photo-6186810.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Set of 3 aromatherapy candles with natural scents for relaxation and ambiance.",
        features: ["Natural soy wax", "3 different scents", "40-hour burn time", "Eco-friendly"],
        inStock: true,
        rating: 4.3
      },
      {
        id: 8,
        name: "Bamboo Cutting Board",
        price: 34.99,
        category: "Kitchen",
        image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Eco-friendly bamboo cutting board with juice groove and easy-grip handles.",
        features: ["Bamboo construction", "Juice groove", "Easy-grip handles", "Eco-friendly"],
        inStock: true,
        rating: 4.6
      },
      {
        id: 9,
        name: "Velvet Accent Chair",
        price: 399.99,
        category: "Furniture",
        image: "https://images.pexels.com/photos/586744/pexels-photo-586744.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Elegant velvet accent chair with gold legs, perfect for adding luxury to any space.",
        features: ["Velvet upholstery", "Gold metal legs", "Comfortable seating", "Modern design"],
        inStock: true,
        rating: 4.7
      },
      {
        id: 10,
        name: "Ceramic Vase Collection",
        price: 69.99,
        category: "Decor",
        image: "https://images.pexels.com/photos/6207353/pexels-photo-6207353.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Set of 3 ceramic vases in different sizes, perfect for fresh or dried flowers.",
        features: ["Set of 3 vases", "Different sizes", "Ceramic material", "Versatile design"],
        inStock: true,
        rating: 4.5
      },
      {
        id: 11,
        name: "Memory Foam Pillow",
        price: 59.99,
        category: "Textiles",
        image: "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Ergonomic memory foam pillow with cooling gel layer for optimal sleep comfort.",
        features: ["Memory foam core", "Cooling gel layer", "Hypoallergenic", "Removable cover"],
        inStock: true,
        rating: 4.6
      },
      {
        id: 12,
        name: "Stainless Steel Cookware Set",
        price: 249.99,
        category: "Kitchen",
        image: "https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "10-piece stainless steel cookware set with non-stick coating and heat-resistant handles.",
        features: ["10-piece set", "Non-stick coating", "Heat-resistant handles", "Dishwasher safe"],
        inStock: false,
        rating: 4.8
      },
      {
        id: 13,
        name: "Wooden Bookshelf",
        price: 189.99,
        category: "Furniture",
        image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "5-tier wooden bookshelf with adjustable shelves for books and decorative items.",
        features: ["5 adjustable shelves", "Solid wood", "Easy assembly", "Versatile storage"],
        inStock: true,
        rating: 4.4
      },
      {
        id: 14,
        name: "Cotton Bed Sheet Set",
        price: 79.99,
        category: "Textiles",
        image: "https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "100% cotton bed sheet set with deep pockets, available in multiple colors.",
        features: ["100% cotton", "Deep pocket fitted sheet", "Wrinkle resistant", "Multiple colors"],
        inStock: true,
        rating: 4.5
      },
      {
        id: 15,
        name: "Glass Storage Containers",
        price: 44.99,
        category: "Kitchen",
        image: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Set of 6 glass food storage containers with airtight lids for kitchen organization.",
        features: ["Set of 6 containers", "Airtight lids", "Microwave safe", "Stackable design"],
        inStock: true,
        rating: 4.7
      },
      {
        id: 16,
        name: "Decorative Table Lamp",
        price: 89.99,
        category: "Decor",
        image: "https://images.pexels.com/photos/6207353/pexels-photo-6207353.jpeg?auto=compress&cs=tinysrgb&w=500",
        description: "Modern table lamp with fabric shade and brass base for ambient lighting.",
        features: ["Fabric lampshade", "Brass base", "Ambient lighting", "Modern design"],
        inStock: true,
        rating: 4.3
      }
    ]
  }
  
  getAllProducts() {
    return this.products
  }
  
  getProductById(id) {
    return this.products.find(product => product.id === parseInt(id))
  }
  
  getProductsByCategory(category) {
    return this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }
  
  searchProducts(query) {
    const lowerQuery = query.toLowerCase()
    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    )
  }
  
  getCategories() {
    return [...new Set(this.products.map(product => product.category))]
  }
  
  sortProducts(products, sortBy) {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price)
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name))
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating)
      default:
        return products
    }
  }
}