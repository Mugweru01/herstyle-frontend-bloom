
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleProductClick = () => {
    // Navigate to product detail page
    navigate(`/product/${product.slug || product.id}`);
  };

  return (
    <div onClick={handleProductClick} className="cursor-pointer">
      <ProductCard
        product={product}
        onQuickView={onQuickView}
        className={className}
        style={style}
      />
    </div>
  );
};

export default ProductRouter;
