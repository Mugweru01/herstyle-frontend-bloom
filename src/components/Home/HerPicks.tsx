
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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
}

const HerPicks = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, sale_price, images, category, slug')
        .eq('status', true)
        .limit(4);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
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
                <div className="aspect-[3/4] bg-cream-200 rounded-lg mb-4"></div>
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
            <div
              key={product.id}
              className="group herstyle-card overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-cream-100 flex items-center justify-center">
                    <span className="text-cream-400">No image</span>
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
                  >
                    <ShoppingBag size={16} className="inline mr-2" />
                    Quick Add
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-medium text-gray-900">
                    {formatPrice(product.sale_price || product.price)}
                  </span>
                  {product.sale_price && product.sale_price < product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                {product.category && (
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                )}
              </div>
            </div>
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
