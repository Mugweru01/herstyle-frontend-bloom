
import React from 'react';
import { Star } from 'lucide-react';

interface ProductInfoProps {
  category?: string;
  rating?: number;
  reviews_count?: number;
  name: string;
  description?: string;
  price: number;
  sale_price?: number;
  stock?: number;
  formatPrice: (price: number) => string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  category,
  rating,
  reviews_count,
  name,
  description,
  price,
  sale_price,
  stock,
  formatPrice
}) => {
  const isOutOfStock = stock === 0;
  const isLowStock = stock && stock <= 5 && stock > 0;

  return (
    <div className="p-6">
      {/* Category & Rating */}
      <div className="flex items-center justify-between mb-2">
        {category && (
          <span className="text-xs font-medium text-blush-500 bg-blush-50 px-2 py-1 rounded-full">
            {category}
          </span>
        )}
        
        {rating && (
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-gold-400 text-gold-400" />
            <span className="text-sm font-medium text-gray-600">
              {rating}
            </span>
            {reviews_count && (
              <span className="text-xs text-gray-400">
                ({reviews_count})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product Name */}
      <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blush-600 transition-colors duration-300">
        {name}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-gray-900">
          {formatPrice(sale_price || price)}
        </span>
        {sale_price && sale_price < price && (
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(price)}
          </span>
        )}
      </div>

      {/* Stock Status */}
      {stock !== undefined && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex-1">
            {isLowStock ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gold-600 font-medium">
                  Hurry, only {stock} left!
                </span>
              </div>
            ) : stock > 0 ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
                <span className="text-xs text-sage-600">In Stock</span>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
