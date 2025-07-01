
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Heart, ShoppingBag, Filter, Grid, List } from 'lucide-react';

const Collections = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Silk Blouse',
      price: 159,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop',
      category: 'Clothing',
      colors: ['Black', 'White', 'Blush'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      badge: 'Sale',
      isLiked: false
    },
    {
      id: 2,
      name: 'Pearl Earrings',
      price: 89,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=500&fit=crop',
      category: 'Accessories',
      colors: ['Pearl', 'Gold'],
      badge: 'New',
      isLiked: true
    },
    {
      id: 3,
      name: 'Cashmere Scarf',
      price: 129,
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=500&fit=crop',
      category: 'Accessories',
      colors: ['Cream', 'Gray', 'Navy'],
      isLiked: false
    },
    {
      id: 4,
      name: 'Leather Handbag',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=500&fit=crop',
      category: 'Bags',
      colors: ['Black', 'Brown', 'Cognac'],
      badge: 'Bestseller',
      isLiked: false
    },
    // Add more products...
    {
      id: 5,
      name: 'Wool Coat',
      price: 349,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop',
      category: 'Clothing',
      colors: ['Camel', 'Black', 'Navy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      isLiked: false
    },
    {
      id: 6,
      name: 'Gold Bracelet',
      price: 149,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop',
      category: 'Jewelry',
      colors: ['Gold', 'Silver'],
      badge: 'Limited',
      isLiked: true
    }
  ];

  const categories = ['All', 'Clothing', 'Accessories', 'Bags', 'Jewelry'];
  const priceRanges = ['Under $50', '$50 - $100', '$100 - $200', '$200 - $500', 'Over $500'];

  return (
    <Layout>
      <div className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-cream-50 to-blush-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 mb-4">
              Collections
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
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-6 py-2 rounded-2xl border border-cream-200 hover:border-blush-300 hover:bg-blush-50 transition-colors text-sm font-medium"
                >
                  {category}
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
                <option value="popular">Most Popular</option>
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

          {/* Filters Sidebar */}
          {showFilters && (
            <div className="bg-cream-50 rounded-2xl p-6 mb-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-playfair font-semibold text-lg mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blush-500 focus:ring-blush-500" />
                        <span className="ml-2 text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-playfair font-semibold text-lg mb-4">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        className="px-3 py-2 text-sm border border-cream-200 rounded-lg hover:border-blush-300 hover:bg-blush-50 transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-playfair font-semibold text-lg mb-4">Color</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {['#000000', '#FFFFFF', '#F7B3BE', '#E0606B', '#5E7961', '#EBC9B7'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blush-300 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                      product.badge === 'New' ? 'bg-sage-500 text-white' :
                      product.badge === 'Sale' ? 'bg-dustyrose-500 text-white' :
                      product.badge === 'Limited' ? 'bg-gold-500 text-white' :
                      'bg-blush-500 text-white'
                    }`}>
                      {product.badge}
                    </div>
                  )}

                  {/* Quick actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      product.isLiked ? 'bg-blush-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-blush-500 hover:text-white'
                    }`}>
                      <Heart size={16} fill={product.isLiked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Quick add to bag */}
                  <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-full herstyle-button text-sm py-2 backdrop-blur-sm">
                      <ShoppingBag size={16} className="inline mr-2" />
                      Quick Add
                    </button>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-playfair font-semibold text-lg text-gray-900">
                      {product.name}
                    </h3>
                    <span className="text-xs text-gray-500 bg-cream-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-medium text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Colors */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-600">Colors:</span>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 3).map((color) => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ 
                            backgroundColor: color === 'Black' ? '#000' : 
                                          color === 'White' ? '#fff' :
                                          color === 'Blush' ? '#F7B3BE' :
                                          color === 'Pearl' ? '#f8f8f8' :
                                          color === 'Gold' ? '#fbbf24' :
                                          color === 'Gray' ? '#6b7280' :
                                          color === 'Navy' ? '#1e3a8a' :
                                          color === 'Cream' ? '#fef3c7' :
                                          color === 'Brown' ? '#92400e' :
                                          color === 'Cognac' ? '#d97706' :
                                          color === 'Camel' ? '#f59e0b' :
                                          color === 'Silver' ? '#e5e7eb' :
                                          '#f3f4f6'
                          }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Sizes (if applicable) */}
                  {product.sizes && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Sizes:</span>
                      <div className="flex gap-1">
                        {product.sizes.slice(0, 4).map((size) => (
                          <span key={size} className="text-xs text-gray-500 bg-cream-100 px-2 py-1 rounded">
                            {size}
                          </span>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="text-xs text-gray-500">+{product.sizes.length - 4}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="herstyle-button-secondary text-lg px-8 py-3">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Collections;
