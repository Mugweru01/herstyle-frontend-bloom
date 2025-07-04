
import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import ProductImage from './ProductImage';
import ProductActions from './ProductActions';
import ProductInfo from './ProductInfo';

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
    <div className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${className}`} style={style}>
      <ProductImage
        images={product.images}
        name={product.name}
        discountPercentage={discountPercentage}
        isOutOfStock={isOutOfStock}
        isLowStock={isLowStock}
        stock={product.stock}
        onAddToCart={handleAddToCart}
      >
        <ProductActions
          isLoved={isLoved}
          onLoveToggle={handleLoveToggle}
          onQuickView={onQuickView ? handleQuickView : undefined}
        />
      </ProductImage>

      <ProductInfo
        category={product.category}
        rating={product.rating}
        reviews_count={product.reviews_count}
        name={product.name}
        description={product.description}
        price={product.price}
        sale_price={product.sale_price}
        stock={product.stock}
        formatPrice={formatPrice}
      />

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blush-500/10 to-dustyrose-500/10"></div>
      </div>
    </div>
  );
};

export default ProductCard;
