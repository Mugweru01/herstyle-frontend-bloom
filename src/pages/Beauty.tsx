
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/Product/ProductCard';
import ProductDescription from '@/components/Product/ProductDescription';

interface Product {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  images: string[];
  description?: string;
  category?: string;
  slug: string;
  stock: number;
  rating?: number;
  reviews_count?: number;
}

const Beauty = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBeautyProducts();
  }, []);

  const fetchBeautyProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, sale_price, images, description, category, slug, stock')
        .eq('status', true)
        .ilike('category', '%beauty%')
        .limit(12);

      if (error) throw error;
      
      // Add mock ratings for demo
      const productsWithRatings = (data || []).map(product => ({
        ...product,
        rating: 4.0 + Math.random() * 1.0,
        reviews_count: Math.floor(Math.random() * 100) + 5
      }));
      
      setProducts(productsWithRatings);
    } catch (error) {
      console.error('Error fetching beauty products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load beauty products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-blush-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="animate-pulse">
                <div className="h-12 bg-blush-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-blush-200 rounded w-96 mx-auto"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-blush-200 rounded-3xl mb-4"></div>
                  <div className="h-6 bg-blush-200 rounded mb-2"></div>
                  <div className="h-4 bg-blush-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (selectedProduct) {
    return (
      <Layout>
        <ProductDescription 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blush-50 to-dustyrose-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-full shadow-lg">
                <Sparkles className="w-12 h-12 text-blush-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Beauty Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Enhance your natural beauty with our carefully curated selection of premium beauty products, 
              from skincare essentials to luxury makeup and fragrances.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blush-200 rounded-full opacity-20 animate-gentle-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-dustyrose-200 rounded-full opacity-30 animate-gentle-bounce" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-8">
                <Sparkles className="w-16 h-16 text-blush-300 mx-auto mb-4" />
                <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-lg text-gray-600">No beauty products available at the moment.</p>
                <p className="text-sm text-gray-500 mt-2">Check back soon for new arrivals!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Beauty;
