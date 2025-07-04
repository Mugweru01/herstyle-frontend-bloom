
import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

interface ProductImageProps {
  images: string[];
  name: string;
  discountPercentage: number;
  isOutOfStock: boolean;
  isLowStock: boolean;
  stock?: number;
  onAddToCart: (e: React.MouseEvent) => void;
  children: React.ReactNode; // For action buttons
}

const ProductImage: React.FC<ProductImageProps> = ({
  images,
  name,
  discountPercentage,
  isOutOfStock,
  isLowStock,
  stock,
  onAddToCart,
  children
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-cream-50 to-blush-50">
      {images && images[0] && !imageError ? (
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream-100 to-blush-100">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-blush-200 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-blush-400" />
            </div>
            <p className="text-sm text-blush-400 font-medium">Beautiful Item</p>
          </div>
        </div>
      )}
      
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {discountPercentage > 0 && (
          <span className="px-3 py-1 bg-dustyrose-500 text-white text-xs font-semibold rounded-full shadow-lg">
            -{discountPercentage}%
          </span>
        )}
        {isOutOfStock && (
          <span className="px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full shadow-lg">
            Sold Out
          </span>
        )}
        {isLowStock && (
          <span className="px-3 py-1 bg-gold-500 text-white text-xs font-semibold rounded-full shadow-lg">
            Only {stock} Left
          </span>
        )}
      </div>

      {/* Action Buttons */}
      {children}

      {/* Quick Add Button */}
      <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-2xl font-medium text-sm transition-all duration-300 backdrop-blur-sm ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blush-500 hover:bg-blush-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
          }`}
        >
          <ShoppingBag size={16} className="inline mr-2" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
        </button>
      </div>

      {/* Shimmer Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <div className="shimmer absolute inset-0"></div>
      </div>
    </div>
  );
};

export default ProductImage;
