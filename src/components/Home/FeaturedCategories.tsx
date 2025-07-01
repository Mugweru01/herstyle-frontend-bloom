
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

const FeaturedCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, description, image_url')
        .eq('is_active', true)
        .limit(4);

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback categories with default images if none exist in database
  const fallbackCategories = [
    {
      id: '1',
      name: 'New Arrivals',
      slug: 'new-arrivals',
      description: 'Latest styles for the season',
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=800&fit=crop&crop=center'
    },
    {
      id: '2',
      name: 'Beauty',
      slug: 'beauty',
      description: 'Enhance your natural glow',
      image_url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=800&fit=crop&crop=center'
    },
    {
      id: '3',
      name: 'Accessories',
      slug: 'accessories',
      description: 'Perfect finishing touches',
      image_url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=800&fit=crop&crop=center'
    },
    {
      id: '4',
      name: 'Collections',
      slug: 'collections',
      description: 'Curated for your lifestyle',
      image_url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=800&fit=crop&crop=center'
    },
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="animate-pulse">
            <div className="h-12 bg-cream-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-cream-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-cream-200 rounded-3xl"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

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
        {displayCategories.map((category, index) => (
          <Link
            key={category.id}
            to={`/collections/${category.slug}`}
            className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-[3/4] relative">
              <img
                src={category.image_url || fallbackCategories[index]?.image_url}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackCategories[index]?.image_url || '';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-playfair font-semibold mb-2">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                  {category.description || fallbackCategories.find(f => f.name === category.name)?.description}
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
