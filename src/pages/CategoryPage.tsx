
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  images: string[];
  slug: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCategoryAndProducts();
    }
  }, [slug]);

  const fetchCategoryAndProducts = async () => {
    try {
      // Fetch category details
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id, name, description')
        .eq('slug', slug)
        .single();

      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        return;
      }

      setCategory(categoryData);

      // Fetch products for this category
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, price, sale_price, images, slug')
        .eq('category', categoryData.name)
        .eq('status', true);

      if (productsError) {
        console.error('Error fetching products:', productsError);
        return;
      }

      setProducts(productsData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              Category Not Found
            </h1>
            <p className="text-lg text-gray-600">
              The category you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden rounded-t-2xl">
                    <img
                      src={product.images[0] || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {product.sale_price ? (
                        <>
                          <span className="text-lg font-semibold text-blush-500">
                            ${product.sale_price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-semibold text-gray-900">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No products found in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
