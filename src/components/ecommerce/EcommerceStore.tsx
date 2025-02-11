import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
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
    description: "High-performance gaming laptop with RTX 3080",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Gaming Mouse",
    description: "RGB gaming mouse with 16000 DPI",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Gaming Headset",
    description: "7.1 surround sound gaming headset",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with Cherry MX switches",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3"
  }
];

const EcommerceStore: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
    setCart([]);

    // Reset after showing success message
    setTimeout(() => {
      setOrderComplete(false);
      setShowCheckout(false);
      setCheckoutForm({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
    }, 3000);
  };

  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-400 mb-8">Tech Store</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Products Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Products</h2>
            <div className="grid grid-cols-1 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-[#1E1E1E] rounded-lg p-4 flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <p className="text-gray-300 mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400 font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-[#1E1E1E] rounded-lg p-6 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-white mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-300">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-[#2D2D2D] p-3 rounded-md">
                    <div>
                      <h3 className="text-white">{item.name}</h3>
                      <p className="text-purple-400">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="border-t border-[#2D2D2D] pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Total:</span>
                    <span className="text-purple-400 font-bold">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    disabled={cart.length === 0}
                    className="w-full bg-purple-600 text-white py-2 rounded-md mt-4 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] rounded-lg p-6 max-w-md w-full">
            {orderComplete ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Order Complete!</h3>
                <p className="text-gray-300">Thank you for your purchase.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Checkout</h3>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={checkoutForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#2D2D2D] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={checkoutForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#2D2D2D] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Shipping Address</label>
                    <input
                      type="text"
                      name="address"
                      value={checkoutForm.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#2D2D2D] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={checkoutForm.cardNumber}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{16}"
                      placeholder="1234567890123456"
                      className="w-full bg-[#2D2D2D] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={checkoutForm.expiryDate}
                        onChange={handleInputChange}
                        required
                        placeholder="MM/YY"
                        pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                        className="w-full bg-[#2D2D2D] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={checkoutForm.cvv}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{3,4}"
                        placeholder="123"
                        className="w-full bg-[#2D2D2D] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-purple-600 text-white py-2 rounded-md mt-6 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceStore;
