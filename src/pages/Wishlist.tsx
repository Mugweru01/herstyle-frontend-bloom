
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import ProductCard from '@/components/Product/ProductCard';


interface WishlistItem {
  id: string;
  product_id: string;
  created_at: string;
  products: {
    id: string;
    name: string;
    price: number;
    sale_price?: number;
    images: string[];
    description?: string;
    stock: number;
  };
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          id,
          product_id,
          created_at,
          products (
            id,
            name,
            price,
            sale_price,
            images,
            description,
            stock
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast({
        title: 'Error',
        description: 'Failed to load wishlist items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistItemId: string) => {
    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('id', wishlistItemId);

      if (error) throw error;

      setWishlistItems(prev => prev.filter(item => item.id !== wishlistItemId));
      toast({
        title: 'Removed from wishlist',
        description: 'Item has been removed from your wishlist',
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove item from wishlist',
        variant: 'destructive',
      });
    }
  };

  const handleAddToCart = async (productId: string, productName: string) => {
    await addToCart(productId, 1);
    toast({
      title: 'Added to cart',
      description: `${productName} has been added to your cart`,
    });
  };



  if (loading) {
    return 
        <div className="min-h-screen bg-gradient-to-b from-blush-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="animate-pulse">
                <div className="h-12 bg-blush-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-blush-200 rounded w-96 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>;
  }

  return (
      <div className="min-h-screen bg-gradient-to-b from-blush-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Heart className="w-12 h-12 text-blush-500" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
              My Wishlist
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your saved favorites, ready when you are.
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Start exploring and save your favorite items to your wishlist.
              </p>
              <a
                href="/collections"
                className="herstyle-button text-lg px-8 py-4"
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlistItems.map((item, index) => (
                <ProductCard
                  key={item.id}
                  product={{
                    id: item.products.id,
                    name: item.products.name,
                    price: item.products.price,
                    sale_price: item.products.sale_price,
                    images: item.products.images,
                    slug: item.products.id, // Using product id as slug for now, assuming it's unique
                    description: item.products.description,
                    stock: item.products.stock,
                  }}
                  onRemoveFromWishlist={() => removeFromWishlist(item.id)}
                  isWishlisted={true}
                  animationDelay={`${index * 0.1}s`}
                />


              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default Wishlist;
