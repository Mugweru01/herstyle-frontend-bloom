
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Filter, Grid, List } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/Product/ProductCard';
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

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Collections = () => {
  const { category: categorySlug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || 'all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]);
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('id, name, price, sale_price, images, category, slug, description, stock')
        .eq('status', true);

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Add mock ratings for demo
      const productsWithRatings = (data || []).map(product => ({
        ...product,
        rating: 4.1 + Math.random() * 0.9,
        reviews_count: Math.floor(Math.random() * 120) + 10
      }));
      
      setProducts(productsWithRatings);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('is_active', true);

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const allCategories = [{ id: 'all', name: 'All', slug: 'all' }, ...categories];
  const currentCategory = categories.find(cat => cat.slug === categorySlug);
  const pageTitle = currentCategory ? currentCategory.name : 'Collections';

  if (selectedProduct) {
    return (
      <Layout>
        <ProductDescription 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-b from-pink-50 to-white py-16 animate-fade-in-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest mb-4 animate-fade-in animate-delay-100">
              Curated Just for You
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-4 animate-fade-in animate-delay-200">
              {pageTitle}
            </h1>
            <p className="font-inter text-lg md:text-xl text-gray-600 font-light tracking-wide italic max-w-2xl mx-auto animate-fade-in animate-delay-300">
              Discover carefully curated pieces that celebrate your individuality and empower your style journey.
            </p>
            <div className="w-24 h-1 bg-pink-300 mx-auto mt-6 animate-fade-in animate-delay-400"></div>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 no-scrollbar">
              {allCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`rounded-full px-5 py-2 border text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.slug
                      ? 'bg-pink-100 text-pink-700 border-pink-300 shadow-sm'
                      : 'bg-white text-gray-700 border-pink-200 hover:bg-pink-50 hover:border-pink-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>


            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 shadow-sm transition-all duration-300"
              >
                <Filter size={16} />
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1 bg-white shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === 'grid' ? 'bg-pink-100 text-pink-700' : 'text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === 'list' ? 'bg-pink-100 text-pink-700' : 'text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-cream-200 rounded-3xl mb-4"></div>
                <div className="h-6 bg-cream-200 rounded mb-2"></div>
                <div className="h-4 bg-cream-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
              {/* Products Grid */}
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 lg:grid-cols-2'
              }`}>
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={handleQuickView}
                    className={`animate-fade-in ${viewMode === 'list' ? 'lg:flex lg:gap-6' : ''} shadow-sm hover:shadow-md transition-all duration-300`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your filters or check back later for new arrivals!</p>
                </div>
              )}
            </>
          )}
          {/* Navigation & Controls */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              {/* Category Navigation */}
              <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 no-scrollbar">
                {allCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`rounded-full px-5 py-2 border text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.slug
                        ? 'bg-pink-100 text-pink-700 border-pink-300 shadow-sm'
                        : 'bg-white text-gray-700 border-pink-200 hover:bg-pink-50 hover:border-pink-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>


              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 shadow-sm transition-all duration-300"
                >
                  <Filter size={16} />
                  Filters
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>

                <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1 bg-white shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === 'grid' ? 'bg-pink-100 text-pink-700' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === 'list' ? 'bg-pink-100 text-pink-700' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default Collections;
