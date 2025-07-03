
import React, { useState } from 'react';
import { Heart, ShoppingBag, Share2, Truck, Shield, RotateCcw, Star, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  images: string[];
  category?: string;
  description?: string;
  stock?: number;
  rating?: number;
  reviews_count?: number;
  features?: string[];
  materials?: string[];
  care_instructions?: string[];
  size_guide?: string;
}

interface ProductDescriptionProps {
  product: Product;
  onClose?: () => void;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ 
  product, 
  onClose 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLoved, setIsLoved] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addToCart } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (product.stock === 0) return;
    
    await addToCart(product.id, quantity);
    toast({
      title: '✨ Added to your bag!',
      description: `${quantity}x ${product.name} ready for checkout`,
    });
  };

  const handleLoveToggle = () => {
    setIsLoved(!isLoved);
    toast({
      title: isLoved ? '💔 Removed from wishlist' : '💕 Added to wishlist',
      description: isLoved 
        ? `${product.name} removed from your favorites`
        : `${product.name} saved to your wishlist`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: '🔗 Link copied!',
        description: 'Product link copied to clipboard',
      });
    }
  };

  const discountPercentage = product.sale_price && product.price 
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock && product.stock <= 5 && product.stock > 0;

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Blush', 'Sage', 'Cream'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-blush-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-cream-100 to-blush-100">
                {product.images && product.images[selectedImage] ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-blush-200 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-blush-400" />
                      </div>
                      <p className="text-lg text-blush-400 font-medium">Beautiful Product</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === index 
                            ? 'border-blush-500 scale-105' 
                            : 'border-white/50 hover:border-blush-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {discountPercentage > 0 && (
                  <span className="px-4 py-2 bg-dustyrose-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    Save {discountPercentage}%
                  </span>
                )}
                {isOutOfStock && (
                  <span className="px-4 py-2 bg-gray-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    Sold Out
                  </span>
                )}
                {isLowStock && (
                  <span className="px-4 py-2 bg-gold-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    Only {product.stock} Left
                  </span>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12">
              {/* Header */}
              <div className="mb-6">
                {product.category && (
                  <span className="inline-block text-sm font-medium text-blush-500 bg-blush-50 px-3 py-1 rounded-full mb-4">
                    {product.category}
                  </span>
                )}
                
                <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating!) 
                            ? 'fill-gold-400 text-gold-400' 
                            : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {product.rating} ({product.reviews_count} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.sale_price || product.price)}
                  </span>
                  {product.sale_price && product.sale_price < product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-6 mb-8">
                {/* Size Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                          selectedSize === size
                            ? 'border-blush-500 bg-blush-50 text-blush-600'
                            : 'border-gray-200 hover:border-blush-300 text-gray-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                          selectedColor === color
                            ? 'border-blush-500 bg-blush-50 text-blush-600'
                            : 'border-gray-200 hover:border-blush-300 text-gray-600'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    isOutOfStock
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blush-500 to-dustyrose-500 hover:from-blush-600 hover:to-dustyrose-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
                  }`}
                >
                  <ShoppingBag size={20} className="inline mr-3" />
                  {isOutOfStock ? 'Out of Stock' : `Add to Bag - ${formatPrice((product.sale_price || product.price) * quantity)}`}
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleLoveToggle}
                    className={`flex-1 py-3 px-6 rounded-2xl border-2 font-medium transition-all duration-300 ${
                      isLoved
                        ? 'border-blush-500 bg-blush-50 text-blush-600'
                        : 'border-gray-200 hover:border-blush-300 text-gray-600'
                    }`}
                  >
                    <Heart size={18} className={`inline mr-2 ${isLoved ? 'fill-current' : ''}`} />
                    {isLoved ? 'Loved' : 'Add to Wishlist'}
                  </button>

                  <button
                    onClick={handleShare}
                    className="py-3 px-6 rounded-2xl border-2 border-gray-200 hover:border-blush-300 text-gray-600 font-medium transition-all duration-300"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-r from-cream-50 to-blush-50 rounded-2xl">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-blush-500" />
                  <p className="text-xs font-medium text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-sage-500" />
                  <p className="text-xs font-medium text-gray-600">Authentic</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-dustyrose-500" />
                  <p className="text-xs font-medium text-gray-600">Easy Returns</p>
                </div>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex border-b border-gray-200 mb-6">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'features', label: 'Features' },
                    { id: 'care', label: 'Care' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-6 font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'text-blush-600 border-b-2 border-blush-500'
                          : 'text-gray-600 hover:text-blush-500'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="min-h-[120px]">
                  {activeTab === 'description' && (
                    <div className="prose prose-blush max-w-none">
                      <p className="text-gray-600 leading-relaxed">
                        {product.description || 'This beautiful piece embodies elegance and comfort, crafted with attention to detail and designed to make you feel confident and stylish.'}
                      </p>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <ul className="space-y-2">
                      {(product.features || [
                        'Premium quality materials',
                        'Comfortable fit',
                        'Versatile styling',
                        'Easy care instructions'
                      ]).map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-blush-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'care' && (
                    <ul className="space-y-2">
                      {(product.care_instructions || [
                        'Machine wash cold with similar colors',
                        'Do not bleach',
                        'Tumble dry low',
                        'Iron on low heat if needed'
                      ]).map((instruction, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-sage-400 rounded-full mr-3"></div>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
