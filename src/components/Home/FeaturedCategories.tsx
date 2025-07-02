
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
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
        .select('id, name, slug, description')
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

  // Updated categories with new images and clean taglines
  const fallbackCategories = [
    {
      id: '1',
      name: 'Evening Wear',
      slug: 'evening-wear',
      description: 'Stunning Elegance',
      image_url: '/lovable-uploads/e6c96a3a-8435-4193-b309-9f3a3bffe1b9.png'
    },
    {
      id: '2',
      name: 'Footwear',
      slug: 'footwear',
      description: 'Step Forward',
      image_url: '/lovable-uploads/759eb4ae-d821-4098-9c45-ec9ae2e2a570.png'
    },
    {
      id: '3',
      name: 'Beauty',
      slug: 'beauty',
      description: 'Natural Glow',
      image_url: '/lovable-uploads/83fee30b-494a-4ac0-988d-fad829e99594.png'
    },
    {
      id: '4',
      name: 'Casual Wear',
      slug: 'casual-wear',
      description: 'Effortless Style',
      image_url: '/lovable-uploads/bb73604a-0ec4-4297-98c3-a98647f8a72f.png'
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayCategories.map((category, index) => {
          const fallbackCategory = fallbackCategories[index] || fallbackCategories[0];
          return (
            <Link
              key={category.id}
              to={`/collections/${category.slug}`}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={fallbackCategory.image_url}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-playfair font-semibold">
                    {category.name}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blush-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCategories;
