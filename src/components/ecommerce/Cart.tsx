import React from 'react';
import { Product } from './types';

interface CartProps {
  items: Product[];
  onRemove: (productId: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-xl font-bold text-purple-400 mb-4">Shopping Cart</h3>
      {items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-white">{item.name}</h4>
                    <p className="text-sm text-gray-400">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-400 hover:text-red-300 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300">Total:</span>
              <span className="text-lg font-bold text-white">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
