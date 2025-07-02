
import React from 'react';
import Layout from '../components/Layout/Layout';
import { Crown, Watch, Gem, Gift } from 'lucide-react';

const Accessories = () => {
  const accessoryCategories = [
    {
      id: 1,
      name: 'Jewelry',
      description: 'Elegant pieces to complement your every look',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      icon: <Gem className="w-6 h-6" />,
      products: 42
    },
    {
      id: 2,
      name: 'Watches',
      description: 'Timeless timepieces for the modern woman',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      icon: <Watch className="w-6 h-6" />,
      products: 28
    },
    {
      id: 3,
      name: 'Hair Accessories',
      description: 'Beautiful accessories to perfect your hairstyle',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      icon: <Crown className="w-6 h-6" />,
      products: 35
    },
    {
      id: 4,
      name: 'Gift Sets',
      description: 'Curated gift collections for someone special',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      icon: <Gift className="w-6 h-6" />,
      products: 16
    }
  ];

  const featuredAccessories = [
    {
      id: 1,
      name: 'Rose Gold Statement Necklace',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Classic Pearl Earrings',
      price: '$156',
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      name: 'Minimalist Gold Watch',
      price: '$234',
      image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream-50 to-dustyrose-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Accessories Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Complete your look with our exquisite collection of accessories. 
              From statement jewelry to elegant watches, find the perfect pieces to express your style.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {accessoryCategories.map((category) => (
              <div key={category.id} className="herstyle-card group cursor-pointer overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-dustyrose-100 rounded-lg text-dustyrose-600 mr-4">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-playfair font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-gray-500">{category.products} products</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <button className="herstyle-button-secondary">
                    Shop {category.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Featured Accessories
            </h2>
            <p className="text-lg text-gray-600">
              Our most loved pieces, handpicked for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAccessories.map((item) => (
              <div key={item.id} className="herstyle-card group cursor-pointer">
                <div className="aspect-w-1 aspect-h-1 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-2xl font-bold text-blush-600">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blush-500 to-dustyrose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-6">
              Join Our VIP Access
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Get early access to new collections, exclusive discounts, and styling tips 
              delivered straight to your inbox.
            </p>
            <button className="bg-white text-blush-600 font-semibold px-8 py-4 rounded-2xl hover:bg-cream-50 transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Accessories;
