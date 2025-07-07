
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  style?: React.CSSProperties;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onQuickView,
  className = "",
  style
}) => {
  const [isLoved, setIsLoved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) return;
    
    navigate(`/product/${product.slug || product.id}`);
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

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) return;
    
    await addToCart(product.id, 1);
    navigate('/cart');
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
  const currentPrice = product.sale_price || product.price;

  return (
    <div 
      className={`group relative bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl shadow-lg border border-gray-100 ${className}`} 
      style={style}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-cream-50 to-blush-50">
        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
        
        {product.images?.[0] && !imageError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream-100 to-blush-100">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-blush-200 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-blush-400" />
              </div>
              <p className="text-sm text-blush-400 font-medium">Beautiful Item</p>
            </div>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {discountPercentage > 0 && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-dustyrose-500 to-blush-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
              -{discountPercentage}% OFF
            </span>
          )}
          {isOutOfStock && (
            <span className="px-3 py-1.5 bg-gray-800 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
              Sold Out
            </span>
          )}
          {isLowStock && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLoveToggle}
            className={`h-10 w-10 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 active:scale-95 ${
              isLoved 
                ? 'bg-blush-500 border-blush-500 text-white shadow-lg' 
                : 'bg-white/90 border-white/50 text-gray-600 hover:bg-blush-500 hover:text-white hover:border-blush-500'
            }`}
          >
            <Heart size={16} className={isLoved ? 'fill-current' : ''} />
          </Button>
          
          {onQuickView && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleQuickView}
              className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-gray-600 hover:bg-sage-500 hover:text-white hover:border-sage-500 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <Eye size={16} />
            </Button>
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between">
          {product.category && (
            <span className="text-xs font-medium text-blush-600 bg-blush-50 px-2 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          )}
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-gold-400 text-gold-400" />
              <span className="text-xs font-medium text-gray-600">
                {product.rating.toFixed(1)} ({product.reviews_count})
              </span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <div>
          <h3 className="font-playfair font-semibold text-lg text-gray-900 leading-tight group-hover:text-blush-600 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
              {product.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(currentPrice)}
          </span>
          {product.sale_price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="text-xs font-medium">
            {isOutOfStock ? (
              <span className="text-red-500">Out of Stock</span>
            ) : isLowStock ? (
              <span className="text-gold-600">Low Stock</span>
            ) : (
              <span className="text-green-600">In Stock</span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex-1 h-12 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blush-500 to-dustyrose-500 hover:from-blush-600 hover:to-dustyrose-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isOutOfStock ? 'Sold Out' : 'Buy Now'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="h-12 w-12 rounded-2xl border-2 border-blush-200 hover:border-blush-400 hover:bg-blush-50 text-blush-600 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={18} />
          </Button>
        </div>
      </div>

      {/* Premium Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blush-500/5 to-dustyrose-500/5 shadow-2xl"></div>
      </div>
    </div>
  );
};

export default ProductCard;
