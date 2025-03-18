import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Gaming Laptop",
    description: "High-performance gaming laptop with RTX 3080, 32GB RAM, 1TB SSD, and a 240Hz display for immersive gaming experience.",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Computers",
    rating: 4.8
  },
  {
    id: 2,
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with 30-hour battery life, premium sound quality, and comfortable over-ear design.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Audio",
    rating: 4.5
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with 16000 DPI optical sensor, programmable buttons, and customizable RGB lighting.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    rating: 4.7
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with Cherry MX switches, customizable lighting effects, and anti-ghosting technology for responsive gaming.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    rating: 4.9
  },
  {
    id: 5,
    name: "4K Monitor",
    description: "32-inch 4K UHD monitor with HDR support, 144Hz refresh rate, and adaptive sync technology for smooth visuals.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Monitors",
    rating: 4.6
  },
  {
    id: 6,
    name: "Gaming Chair",
    description: "Ergonomic gaming chair with adjustable lumbar support, 4D armrests, and reclining function for comfortable gaming sessions.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Furniture",
    rating: 4.3
  }
];

const EcommerceStore: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Calculate cart total
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price, 0);
  }, [cart]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Filter by category if selected
        if (selectedCategory && product.category !== selectedCategory) {
          return false;
        }
        
        // Filter by search query
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
            !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by selected option
        switch (sortOption) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
          default:
            return b.rating - a.rating;
        }
      });
  }, [products, selectedCategory, searchQuery, sortOption]);

  // Handle input change for checkout form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCheckoutForm({ ...checkoutForm, [name]: value });
  };

  // Handle checkout submission
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 1500);
  };

  // Handle add to cart
  const addToCart = (product: Product) => {
    // Add to cart with animation
    setCart([...cart, product]);
    
    // Add visual feedback
    const productElement = document.getElementById(`product-${product.id}`);
    if (productElement) {
      productElement.classList.add('border-purple-500');
      setTimeout(() => {
        productElement.classList.remove('border-purple-500');
      }, 1000);
    }
  };

  // Handle remove from cart
  const removeFromCart = (productId: number) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const FilterAndSearch = () => (
    <motion.div 
      className="bg-gray-900 rounded-xl border border-gray-700 shadow-xl overflow-hidden mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-5 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter & Search
        </h2>
        <motion.button
          className="text-gray-400 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          {isFiltersVisible ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </motion.button>
      </div>
      
      {isFiltersVisible && (
        <div className="p-5 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Search Products</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Categories</label>
            <div className="flex flex-wrap gap-2">
              <motion.button
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  selectedCategory === null 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </motion.button>
              
              {Array.from(new Set(products.map(p => p.category))).map((category) => (
                <motion.button
                  key={category}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category as string)}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Sort */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Sort By</label>
            <div className="flex flex-wrap gap-2">
              <motion.button
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  sortOption === 'rating' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortOption('rating')}
              >
                Top Rated
              </motion.button>
              <motion.button
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  sortOption === 'price-asc' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortOption('price-asc')}
              >
                Price: Low to High
              </motion.button>
              <motion.button
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  sortOption === 'price-desc' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortOption('price-desc')}
              >
                Price: High to Low
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  const ProductCard = ({ product }: { product: Product }) => {
    const isHovered = hoveredProductId === product.id;
    
    return (
      <motion.div 
        id={`product-${product.id}`}
        className="group relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
        onHoverStart={() => setHoveredProductId(product.id)}
        onHoverEnd={() => setHoveredProductId(null)}
        layout
      >
        {/* Animated gradient overlay on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        
        {/* Product Image with zoom effect */}
        <div className="relative h-48 overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-sm font-medium px-2 py-1 rounded-full flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034zM17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {product.rating}
          </div>
          
          {/* Category Badge */}
          <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-blue-400 text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">{product.name}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
            
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center z-10 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  const CheckoutFormComponent = () => (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCheckout(false)}
    >
      <motion.div 
        className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Checkout
            </h2>
            <motion.button
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCheckout(false)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="p-6 border-b border-gray-700 bg-gray-800/50">
          <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
          <div className="max-h-40 overflow-y-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-3 py-2 border-b border-gray-700 last:border-0">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{item.name}</h4>
                  <p className="text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-300">Total:</span>
            <span className="text-white">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Form */}
        {!orderComplete ? (
          <form onSubmit={handleCheckout} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 007-7z" />
                  </svg>
                  Personal Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={checkoutForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={checkoutForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Shipping Address</label>
                  <textarea
                    name="address"
                    value={checkoutForm.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="123 Main St, City, Country"
                  />
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={checkoutForm.cardNumber}
                    onChange={handleInputChange}
                    required
                    maxLength={19}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={checkoutForm.expiryDate}
                      onChange={handleInputChange}
                      required
                      maxLength={5}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={checkoutForm.cvv}
                      onChange={handleInputChange}
                      required
                      maxLength={3}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Complete Purchase
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mb-6 mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Order Completed!</h2>
            <p className="text-gray-400 mb-6">Thank you for your purchase. Your order has been processed successfully.</p>
            <motion.button
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowCheckout(false);
                setOrderComplete(false);
                setCart([]);
              }}
            >
              Continue Shopping
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  const ProductGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
          <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
          <p className="text-gray-400 mb-6">We couldn't find any products matching your criteria. Try adjusting your filters or search term.</p>
          <motion.button
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
              setSortOption('rating');
            }}
          >
            Reset Filters
          </motion.button>
        </div>
      )}
    </div>
  );

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Next-Gen Tech for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Modern Gamers
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Discover premium gaming gear designed for performance, comfort, and style. Elevate your gaming experience today.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop Now
              </motion.button>
              <motion.button
                className="px-8 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium rounded-lg border border-gray-700 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#111" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Featured Categories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Browse our collection of premium gaming equipment across various categories</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Computers", image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
            { name: "Accessories", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
            { name: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
            { name: "Monitors", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }
          ].map((category, index) => (
            <motion.div
              key={category.name}
              className="group relative h-60 rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <div className="flex items-center">
                  <span className="text-gray-300 text-sm mr-2">Shop Now</span>
                  <svg className="w-4 h-4 text-blue-400 transform transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Tech Store
            </h1>
            <p className="text-gray-400">Discover the latest gaming gear and accessories</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <FilterAndSearch />
            <motion.button
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCheckout(true)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              View Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </motion.button>
          </div>
        </motion.div>
        
        {/* Filter and Search */}
        <FilterAndSearch />
        
        {/* Products Grid */}
        <ProductGrid />
      </div>
      
      {/* Featured Product */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="inline-block bg-blue-900/50 text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-4">Featured Product</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ultimate Gaming Setup Bundle</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Get everything you need to build the perfect gaming station with our premium bundle. Includes our top-rated gaming laptop, mechanical keyboard, mouse, and headset at a special price.
              </p>
              <ul className="space-y-3 mb-8">
                {["RTX 3080 Gaming Laptop", "RGB Mechanical Keyboard", "16000 DPI Gaming Mouse", "7.1 Surround Sound Headset"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center mb-8">
                <span className="text-3xl font-bold text-white mr-4">$2,399.99</span>
                <span className="text-xl text-gray-400 line-through">$2,999.99</span>
                <span className="ml-4 bg-green-900/50 text-green-400 px-3 py-1 rounded-lg text-sm font-medium">Save $600</span>
              </div>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg flex items-center relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Create a bundle product
                  const bundleProduct: Product = {
                    id: 999,
                    name: "Ultimate Gaming Setup Bundle",
                    description: "Complete gaming setup bundle including laptop, keyboard, mouse, and headset.",
                    price: 2399.99,
                    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    category: "Bundle",
                    rating: 5.0
                  };
                  // Add to cart directly
                  setCart([...cart, bundleProduct]);
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add Bundle to Cart
              </motion.button>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl"></div>
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Gaming Setup Bundle" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">What Gamers Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Hear from our satisfied customers about their experience with our products</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Professional Gamer",
              image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              quote: "The gaming laptop exceeded my expectations. The performance is incredible and it handles all my games at max settings without breaking a sweat."
            },
            {
              name: "Sarah Williams",
              role: "Twitch Streamer",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              quote: "I've tried many mechanical keyboards, but this one is by far the best. The tactile feedback is perfect and the RGB lighting is stunning on camera."
            },
            {
              name: "Michael Chen",
              role: "eSports Coach",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              quote: "The entire shopping experience was seamless. Fast shipping, excellent customer service, and most importantly, top-quality gaming gear."
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + (index * 0.1) }}
            >
              <div className="absolute -top-6 left-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="pt-6">
                <svg className="w-10 h-10 text-gray-700 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8">Subscribe to our newsletter to receive updates on new products, exclusive deals, and gaming tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <CheckoutFormComponent />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EcommerceStore;
