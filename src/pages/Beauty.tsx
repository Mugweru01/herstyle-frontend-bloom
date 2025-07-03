
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout/Layout';

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
}

const Beauty = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
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
      setProducts(data || []);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  const handleAddToCart = async (productId: string, productName: string) => {
    await addToCart(productId, 1);
    toast({
      title: 'Added to cart',
      description: `${productName} has been added to your cart`,
    });
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
                  <div className="aspect-[3/4] bg-blush-200 rounded-lg mb-4"></div>
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blush-50 to-dustyrose-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-12 h-12 text-blush-500" />
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
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">No beauty products available at the moment.</p>
              <p className="text-sm text-gray-500 mt-2">Check back soon for new arrivals!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group herstyle-card overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-blush-100 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-blush-400" />
                      </div>
                    )}
                    
                    {/* Sale badge */}
                    {product.sale_price && product.sale_price < product.price && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-dustyrose-500 text-white">
                        Sale
                      </div>
                    )}

                    {/* Quick actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-blush-500 hover:text-white transition-colors">
                        <Heart size={16} />
                      </button>
                    </div>

                    {/* Quick add to bag */}
                    <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <button 
                        onClick={() => handleAddToCart(product.id, product.name)}
                        className="w-full herstyle-button text-sm py-2 backdrop-blur-sm"
                        disabled={product.stock === 0}
                      >
                        <ShoppingBag size={16} className="inline mr-2" />
                        {product.stock === 0 ? 'Out of Stock' : 'Quick Add'}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl font-medium text-gray-900">
                        {formatPrice(product.sale_price || product.price)}
                      </span>
                      {product.sale_price && product.sale_price < product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Beauty;
