
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'New Arrivals',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=800&fit=crop&crop=center',
      href: '/new-in',
      description: 'Latest styles for the season'
    },
    {
      id: 2,
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=800&fit=crop&crop=center',
      href: '/beauty',
      description: 'Enhance your natural glow'
    },
    {
      id: 3,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=800&fit=crop&crop=center',
      href: '/accessories',
      description: 'Perfect finishing touches'
    },
    {
      id: 4,
      name: 'Collections',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=800&fit=crop&crop=center',
      href: '/collections',
      description: 'Curated for your lifestyle'
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
          Explore Our World
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From timeless classics to contemporary trends, discover pieces that speak to your unique style.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={category.href}
            className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-[3/4] relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-playfair font-semibold mb-2">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                  {category.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-blush-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
