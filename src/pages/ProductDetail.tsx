
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout/Layout';
import ProductDescription from '@/components/Product/ProductDescription';

interface Product {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  images: string[];
  category?: string;
  slug: string;
  description?: string;
  stock?: number;
  rating?: number;
  reviews_count?: number;
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      // First try to find by slug, then by id
      let query = supabase
        .from('products')
        .select('id, name, price, sale_price, images, category, slug, description, stock')
        .eq('status', true);

      if (slug) {
        query = query.or(`slug.eq.${slug},id.eq.${slug}`);
      }

      const { data, error } = await query.single();

      if (error) throw error;

      if (data) {
        // Add mock rating for demo
        const productWithRating = {
          ...data,
          rating: 4.3 + Math.random() * 0.7,
          reviews_count: Math.floor(Math.random() * 150) + 15
        };
        setProduct(productWithRating);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: 'Error',
        description: 'Product not found',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-cream-50 to-blush-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="aspect-square bg-cream-200 rounded-3xl"></div>
                <div className="space-y-6">
                  <div className="h-8 bg-cream-200 rounded w-3/4"></div>
                  <div className="h-6 bg-cream-200 rounded w-1/2"></div>
                  <div className="h-4 bg-cream-200 rounded w-full"></div>
                  <div className="h-4 bg-cream-200 rounded w-5/6"></div>
                  <div className="h-12 bg-cream-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-cream-50 to-blush-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <a href="/collections" className="herstyle-button text-lg px-8 py-3 inline-block">
              Browse All Products
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductDescription product={product} />
    </Layout>
  );
};

export default ProductDetail;
