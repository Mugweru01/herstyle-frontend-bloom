
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Heart, ShoppingBag, Filter, Grid, List } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';

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
  const { addToCart } = useCart();

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
      setProducts(data || []);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  const handleAddToCart = async (productId: string, productName: string) => {
    await addToCart(productId, 1);
  };

  const allCategories = [{ id: 'all', name: 'All', slug: 'all' }, ...categories];
  const currentCategory = categories.find(cat => cat.slug === categorySlug);
  const pageTitle = currentCategory ? currentCategory.name : 'Collections';

  return (
    <Layout>
      <div className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-cream-50 to-blush-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 mb-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover carefully curated pieces that celebrate your individuality and empower your style journey.
            </p>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-6 py-2 rounded-2xl border transition-colors text-sm font-medium ${
                    selectedCategory === category.slug
                      ? 'border-blush-300 bg-blush-50 text-blush-600'
                      : 'border-cream-200 hover:border-blush-300 hover:bg-blush-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-cream-200 hover:border-blush-300 transition-colors"
              >
                <Filter size={16} />
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-2xl border border-cream-200 focus:outline-none focus:ring-2 focus:ring-blush-300"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex items-center gap-2 border border-cream-200 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-colors ${
                    viewMode === 'grid' ? 'bg-blush-100 text-blush-600' : 'text-gray-400'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-colors ${
                    viewMode === 'list' ? 'bg-blush-100 text-blush-600' : 'text-gray-400'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-cream-200 rounded-2xl mb-4"></div>
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
                  : 'grid-cols-1'
              }`}>
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`group herstyle-card overflow-hidden animate-fade-in ${
                      viewMode === 'list' ? 'flex gap-6' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-[3/4]'
                    }`}>
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-cream-100 flex items-center justify-center">
                          <span className="text-cream-400">No image</span>
                        </div>
                      )}
                      
                      {/* Sale Badge */}
                      {product.sale_price && product.sale_price < product.price && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-dustyrose-500 text-white">
                          Sale
                        </div>
                      )}

                      {/* Out of stock badge */}
                      {product.stock === 0 && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gray-500 text-white">
                          Out of Stock
                        </div>
                      )}

                      {/* Quick actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-blush-500 hover:text-white transition-colors">
                          <Heart size={16} />
                        </button>
                      </div>

                      {/* Quick add to bag */}
                      {product.stock !== 0 && (
                        <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <button 
                            onClick={() => handleAddToCart(product.id, product.name)}
                            className="w-full herstyle-button text-sm py-2 backdrop-blur-sm"
                          >
                            <ShoppingBag size={16} className="inline mr-2" />
                            Quick Add
                          </button>
                        </div>
                      )}
                    </div>

                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-playfair font-semibold text-lg text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                        {product.category && (
                          <span className="text-xs text-gray-500 bg-cream-100 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                            {product.category}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-medium text-gray-900">
                          {formatPrice(product.sale_price || product.price)}
                        </span>
                        {product.sale_price && product.sale_price < product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>

                      {viewMode === 'list' && product.description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {product.description}
                        </p>
                      )}

                      {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                        <p className="text-sm text-dustyrose-500 font-medium">
                          Only {product.stock} left in stock
                        </p>
                      )}
                    </div>
                  </div>
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
        </div>
      </div>
    </Layout>
  );
};

export default Collections;
