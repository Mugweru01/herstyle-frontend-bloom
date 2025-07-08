
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

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
  created_at: string;
  stock: number;
  rating?: number;
  reviews_count?: number;
}

const NewIn = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const fetchNewProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, sale_price, images, description, category, slug, created_at, stock')
        .eq('status', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      // Add mock ratings for demo
      const productsWithRatings = (data || []).map(product => ({
        ...product,
        rating: 4.2 + Math.random() * 0.8,
        reviews_count: Math.floor(Math.random() * 75) + 8
      }));
      
      setProducts(productsWithRatings);
    } catch (error) {
      console.error('Error fetching new products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load new products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="animate-pulse">
                <div className="h-12 bg-cream-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-cream-200 rounded w-96 mx-auto"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-cream-200 rounded-3xl mb-4"></div>
                  <div className="h-6 bg-cream-200 rounded mb-2"></div>
                  <div className="h-4 bg-cream-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (selectedProduct) {
    return (
        <ProductDescription 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-full shadow-lg">
                <Sparkles className="w-12 h-12 text-blush-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
              New In
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our latest arrivals. Fresh styles and trending pieces, 
              added regularly to keep your wardrobe current.
            </p>
          </div>

          {products.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="mb-8">
                <Sparkles className="w-16 h-16 text-blush-300 mx-auto mb-4" />
                <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-lg text-gray-600">No new products available at the moment.</p>
                <p className="text-sm text-gray-500 mt-2">Check back soon for fresh arrivals!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div key={product.id} className="relative">
                  <ProductCard
                    product={product}
                    onQuickView={handleQuickView}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                  {/* New arrival badge */}
                  <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-blush-500 to-dustyrose-500 text-white text-xs font-semibold rounded-full shadow-lg z-10">
                    New
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default NewIn;
