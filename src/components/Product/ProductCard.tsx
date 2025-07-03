
import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  images: string[];
  category?: string;
  slug: string;
  description?: string;
  stock?: number;
  rating?: number;
  reviews_count?: number;
}

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onQuickView,
  className = "" 
}) => {
  const [isLoved, setIsLoved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) return;
    
    await addToCart(product.id, 1);
    toast({
      title: '✨ Added to your bag!',
      description: `${product.name} is ready for checkout`,
    });
  };

  const handleLoveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoved(!isLoved);
    
    toast({
      title: isLoved ? '💔 Removed from wishlist' : '💕 Added to wishlist',
      description: isLoved 
        ? `${product.name} removed from your favorites`
        : `${product.name} saved to your wishlist`,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const discountPercentage = product.sale_price && product.price 
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock && product.stock <= 5 && product.stock > 0;

  return (
    <div className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-cream-50 to-blush-50">
        {product.images && product.images[0] && !imageError ? (
          <img
            src={product.images[0]}
            alt={product.name}
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
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button
            onClick={handleLoveToggle}
            className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
              isLoved 
                ? 'bg-blush-500 border-blush-500 text-white shadow-lg scale-110' 
                : 'bg-white/80 border-white/50 text-gray-600 hover:bg-blush-500 hover:text-white hover:border-blush-500'
            }`}
          >
            <Heart size={16} className={isLoved ? 'fill-current' : ''} />
          </button>
          
          {onQuickView && (
            <button
              onClick={handleQuickView}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 text-gray-600 hover:bg-sage-500 hover:text-white hover:border-sage-500 transition-all duration-300"
            >
              <Eye size={16} />
            </button>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
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

      {/* Product Info */}
      <div className="p-6">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          {product.category && (
            <span className="text-xs font-medium text-blush-500 bg-blush-50 px-2 py-1 rounded-full">
              {product.category}
            </span>
          )}
          
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-gold-400 text-gold-400" />
              <span className="text-sm font-medium text-gray-600">
                {product.rating}
              </span>
              {product.reviews_count && (
                <span className="text-xs text-gray-400">
                  ({product.reviews_count})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blush-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.sale_price || product.price)}
          </span>
          {product.sale_price && product.sale_price < product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex-1">
              {isLowStock ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gold-600 font-medium">
                    Hurry, only {product.stock} left!
                  </span>
                </div>
              ) : product.stock > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
                  <span className="text-xs text-sage-600">In Stock</span>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blush-500/10 to-dustyrose-500/10"></div>
      </div>
    </div>
  );
};

export default ProductCard;
