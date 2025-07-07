
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import ProductRouter from '@/components/Product/ProductRouter';

interface Product {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  images: string[];
  slug: string;
  description?: string;
  stock?: number;
  rating?: number;
  reviews_count?: number;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

const CategoryPage = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categorySlug) {
      fetchCategoryAndProducts();
    }
  }, [categorySlug]);

  const fetchCategoryAndProducts = async () => {
    try {
      console.log('Fetching category for slug:', categorySlug);
      
      // Fetch category details by slug
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id, name, description')
        .eq('slug', categorySlug)
        .single();

      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        setLoading(false);
        return;
      }

      console.log('Found category:', categoryData);
      setCategory(categoryData);

      // Fetch products for this category using category name
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, price, sale_price, images, slug, description, stock')
        .eq('category', categoryData.name)
        .eq('status', true);

      if (productsError) {
        console.error('Error fetching products:', productsError);
        setProducts([]);
      } else {
        console.log('Found products:', productsData?.length || 0);
        
        // Add mock ratings for demo
        const productsWithRatings = (productsData || []).map(product => ({
          ...product,
          rating: 4.5 + Math.random() * 0.5,
          reviews_count: Math.floor(Math.random() * 50) + 10
        }));
        
        setProducts(productsWithRatings);
      }
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
                    <div className="aspect-[4/5] bg-gray-200 rounded-3xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
              The category "{categorySlug}" doesn't exist or is not active.
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
              {products.map((product, index) => (
                <ProductRouter
                  key={product.id}
                  product={product}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No products found in the {category.name} category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
