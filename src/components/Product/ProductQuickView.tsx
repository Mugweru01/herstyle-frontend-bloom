import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
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
  description?: string;
  stock?: number;
  rating?: number;
  reviews_count?: number;
}

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (product.stock === 0) return;
    await addToCart(product.id, 1);
    toast({
      title: '✨ Added to your bag!',
      description: `${product.name} is ready for checkout`,
    });
  };

  const handleViewProduct = () => {
    onClose();
    navigate(`/product/${product.slug || product.id}`);
  };

  const currentPrice = product.sale_price || product.price;
  const isOutOfStock = product.stock === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl lg:max-w-4xl p-0 overflow-hidden rounded-lg">
        <DialogDescription className="sr-only">Product Quick View</DialogDescription>
        {product ? (
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
              <img src={product.images[0]} alt={product.name} className="max-h-96 object-contain rounded-md" />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-xl font-semibold text-gray-900 mb-4">{formatPrice(currentPrice)}</p>
                <p className="text-gray-600 text-sm mb-6 line-clamp-4">{product.description || 'No description available.'}</p>
              </div>

              <div className="flex flex-col space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full bg-pink-300 hover:bg-pink-400 text-white rounded-full py-3 text-lg"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleViewProduct}
                  className="w-full border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full py-3 text-lg"
                >
                  View Product
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;