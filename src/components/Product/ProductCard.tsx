
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
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-cream-50 to-blush-50 rounded-t-3xl">
        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
        
        {product.images?.[0] && !imageError ? (
          <img alt={product.name}
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
              -{discountPercentage}%
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

        {/* Heart Icon */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLoveToggle}
          className={`absolute top-4 right-4 h-8 w-8 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 active:scale-95 z-10 ${
            isLoved 
              ? 'bg-blush-500 border-blush-500 text-white shadow-lg' 
              : 'bg-white/90 border-white/50 text-gray-600 hover:bg-blush-500 hover:text-white hover:border-blush-500'
          }`}
        >
          <Heart size={14} className={isLoved ? 'fill-current' : ''} />
        </Button>

        {/* Quick View Button (appears on hover) */}
        {onQuickView && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleQuickView}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
          >
            <Eye size={20} />
          </Button>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1 mb-1">{product.name}</h3>

        {/* Price */}
        <div className="flex items-baseline space-x-1">
          <span className="text-base font-bold text-gray-900">{formatPrice(currentPrice)}</span>
          {product.sale_price && product.price && product.sale_price < product.price && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
          )}
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
