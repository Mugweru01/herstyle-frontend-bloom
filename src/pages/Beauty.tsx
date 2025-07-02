
import React from 'react';
import Layout from '../components/Layout/Layout';
import { Sparkles, Heart, Star, Palette } from 'lucide-react';

const Beauty = () => {
  const beautyCategories = [
    {
      id: 1,
      name: 'Skincare',
      description: 'Nourish and pamper your skin with our premium skincare collection',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      icon: <Sparkles className="w-6 h-6" />,
      products: 24
    },
    {
      id: 2,
      name: 'Makeup',
      description: 'Express yourself with our curated makeup essentials',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      icon: <Palette className="w-6 h-6" />,
      products: 36
    },
    {
      id: 3,
      name: 'Fragrance',
      description: 'Discover your signature scent from our luxury fragrance collection',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      icon: <Heart className="w-6 h-6" />,
      products: 18
    },
    {
      id: 4,
      name: 'Hair Care',
      description: 'Achieve beautiful, healthy hair with our professional hair care range',
      image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      icon: <Star className="w-6 h-6" />,
      products: 21
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blush-50 to-dustyrose-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
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

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beautyCategories.map((category) => (
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
                    <div className="p-2 bg-blush-100 rounded-lg text-blush-600 mr-4">
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
                    Explore {category.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-16 bg-gradient-to-r from-dustyrose-100 to-blush-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-6">
              Beauty Consultation Available
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Book a personalized beauty consultation with our experts to discover 
              the perfect products for your skin type and style.
            </p>
            <button className="herstyle-button text-lg px-8 py-4">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Beauty;
