
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    images: string[];
  };
}

// Use local storage for cart since we don't have cart table yet
export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('herstyle-cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        setItems(cartData);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  };

  const saveCartToStorage = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem('herstyle-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to add items to cart',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      // Fetch product details
      const { data: products, error } = await supabase
        .from('products')
        .select('id, name, price, images')
        .eq('id', productId);

      if (error) throw error;

      if (!products || products.length === 0) {
        toast({
          title: 'Product not found',
          description: 'The requested product could not be found',
          variant: 'destructive',
        });
        return;
      }

      if (products.length > 1) {
        console.warn('Multiple products found for ID:', productId);
        // Optionally handle this case, e.g., pick the first one or show an error
      }

      const product = products[0];

      if (error) throw error;

      if (!product) {
        toast({
          title: 'Product not found',
          description: 'The requested product could not be found',
          variant: 'destructive',
        });
        return;
      }

      // Check if item already exists in cart
      const existingItemIndex = items.findIndex(item => item.product_id === productId);
      let updatedItems: CartItem[];

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: `cart-${Date.now()}`,
          product_id: productId,
          quantity,
          product: {
            name: product.name,
            price: product.price,
            images: product.images || []
          }
        };
        updatedItems = [...items, newItem];
      }

      setItems(updatedItems);
      saveCartToStorage(updatedItems);
      
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (itemId: string) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    saveCartToStorage(updatedItems);
    
    toast({
      title: 'Removed from cart',
      description: 'Item has been removed from your cart',
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    
    setItems(updatedItems);
    saveCartToStorage(updatedItems);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('herstyle-cart');
  };

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  return {
    items,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  };
};
