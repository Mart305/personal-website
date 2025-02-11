import React from 'react';
import { Product } from './types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-purple-400">{product.name}</h3>
            <p className="text-gray-300 mt-1">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-white">${product.price}</span>
              <button
                onClick={() => onAddToCart(product)}
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
