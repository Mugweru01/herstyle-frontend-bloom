
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/Product/ProductCard';

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

const HerPicks = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, sale_price, images, category, slug, description, stock')
        .eq('status', true)
        .limit(4);

      if (error) throw error;
      
      // Add mock ratings for demo
      const productsWithRatings = (data || []).map(product => ({
        ...product,
        rating: 4.5 + Math.random() * 0.5,
        reviews_count: Math.floor(Math.random() * 50) + 10
      }));
      
      setProducts(productsWithRatings);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-cream-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-cream-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-cream-200 rounded-3xl mb-4"></div>
                <div className="h-6 bg-cream-200 rounded mb-2"></div>
                <div className="h-4 bg-cream-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Her Picks
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-selected pieces that embody elegance, comfort, and timeless appeal. 
            Discover what makes each piece special.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/collections" className="herstyle-button-secondary text-lg px-8 py-3 inline-block">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default HerPicks;
