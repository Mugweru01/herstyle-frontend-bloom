import React from 'react';
import { Link } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'] & {
  images: string[];
  category: { slug: string; name: string } | null;
};

interface SuggestedProductsSectionProps {
  suggestedProducts: Product[];
}

const SuggestedProductsSection: React.FC<SuggestedProductsSectionProps> = ({
  suggestedProducts,
}) => {
  return (
    <div className="mt-16">
      <h2 className="font-playfair text-3xl lg:text-4xl font-extrabold text-dustyrose-900 mb-8 text-center">
        You May Also Like
      </h2>
      <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
        {suggestedProducts.map((suggestedProduct) => (
          <div
            key={suggestedProduct.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Link to={`/product/${suggestedProduct.slug}`}>
              <img alt={product.name}
                src={suggestedProduct.image_urls?.[0] || '/public/placeholder.svg'}
                alt={suggestedProduct.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-playfair text-xl font-bold text-dustyrose-800 mb-1">
                  {suggestedProduct.name}
                </h3>
                <p className="text-blush-600 font-semibold">
                  {suggestedProduct.currency}{suggestedProduct.price?.toFixed(2)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProductsSection;