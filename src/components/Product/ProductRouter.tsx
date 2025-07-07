
import React from 'react';
import ProductCard from './ProductCard';

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

interface ProductRouterProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
  style?: React.CSSProperties;
}

const ProductRouter: React.FC<ProductRouterProps> = ({ 
  product, 
  onQuickView, 
  className, 
  style 
}) => {
  // ProductCard now handles its own navigation, so we just pass through the props
  return (
    <ProductCard
      product={product}
      onQuickView={onQuickView}
      className={className}
      style={style}
    />
  );
};

export default ProductRouter;
