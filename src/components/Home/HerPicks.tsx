
import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';

const HerPicks = () => {
  const products = [
    {
      id: 1,
      name: 'Silk Blouse',
      price: 159,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop&crop=center',
      badge: 'New',
      isLiked: false
    },
    {
      id: 2,
      name: 'Pearl Earrings',
      price: 89,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=500&fit=crop&crop=center',
      badge: 'Bestseller',
      isLiked: true
    },
    {
      id: 3,
      name: 'Cashmere Scarf',
      price: 129,
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=500&fit=crop&crop=center',
      isLiked: false
    },
    {
      id: 4,
      name: 'Leather Handbag',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=500&fit=crop&crop=center',
      badge: 'Sale',
      isLiked: false
    },
  ];

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
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                    product.badge === 'New' ? 'bg-sage-500 text-white' :
                    product.badge === 'Sale' ? 'bg-dustyrose-500 text-white' :
                    'bg-gold-500 text-white'
                  }`}>
                    {product.badge}
                  </div>
                )}

                {/* Quick actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                    product.isLiked ? 'bg-blush-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-blush-500 hover:text-white'
                  }`}>
                    <Heart size={16} fill={product.isLiked ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Quick add to bag */}
                <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-full herstyle-button text-sm py-2 backdrop-blur-sm">
                    <ShoppingBag size={16} className="inline mr-2" />
                    Quick Add
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-medium text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="herstyle-button-secondary text-lg px-8 py-3">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default HerPicks;
