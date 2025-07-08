import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Search as SearchIcon } from 'lucide-react';
import ProductCard from '@/components/Product/ProductCard';
import ProductQuickView from '@/components/Product/ProductQuickView';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

interface Product {
  id: string;
  name: string;
  price: number;
  image_urls: string[];
  category: string;
  slug: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}



const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<{ products: Product[]; categories: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setSearchQuery('');
      setSearchResults([]);
      setSuggestions(null);
      setLoading(false);
      setError(null);
      setShowSuggestions(false);
      setQuickViewProduct(null);
      setIsQuickViewOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 0) {
        await fetchSuggestions(searchQuery);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
        setSuggestions(null);
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setShowSuggestions(false); // Hide suggestions when performing a search
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_urls, category, slug')
        .or(`name.ilike.%${query}%,category.ilike.%${query}%`);

      if (error) {
        throw error;
      }

      setSearchResults(data || []);
    } catch (err: any) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, price, image_urls, category, slug')
        .ilike('name', `%${query}%`)
        .limit(5);

      const { data: categoriesData, error: categoriesError } = await supabase
        .from('products')
        .select('category')
        .ilike('category', `%${query}%`)
        .limit(5);

      if (productsError) throw productsError;
      if (categoriesError) throw categoriesError;

      const uniqueCategories = Array.from(new Set(categoriesData.map((p: any) => p.category)));

      setSuggestions({
        products: productsData as Product[],
        categories: uniqueCategories as string[],
      });
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setSuggestions(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="top" className="h-full w-full flex flex-col bg-[#F5F5DC]">
        <SheetHeader className="flex flex-col items-center justify-center py-4 text-[#387478]">
          <SheetTitle className="text-2xl font-bold text-[#387478]">Search HerStyle</SheetTitle>
          <SheetDescription className="sr-only">Search for products and categories on HerStyle.</SheetDescription>
        </SheetHeader>
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4">
          <X className="h-6 w-6" />
        </Button>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4 mx-auto w-full max-w-md">
          <Input
            type="text"
            placeholder="Search for products or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Button type="submit" className="rounded-full bg-pink-300 hover:bg-pink-400 text-white px-4 py-2">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </form>

        {showSuggestions && suggestions && searchQuery.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 max-h-60 overflow-y-auto">
            {suggestions.products.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Products</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestions.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
            {suggestions.categories.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.categories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      className="rounded-full px-4 py-2 text-sm bg-pink-100 hover:bg-pink-200 text-pink-800"
                      onClick={() => {
                        setSearchQuery(category);
                        handleSearch(category);
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {(suggestions.products.length === 0 && suggestions.categories.length === 0) && (
              <p className="text-gray-500">No suggestions found.</p>
            )}
          </div>
        )}

        <div className="flex-grow overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-600 text-lg">Loading results...</p>
          ) : error ? (
            <p className="text-center text-red-600 text-lg">Error: {error}</p>
          ) : searchResults.length > 0 ? (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Search Results</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : searchQuery !== '' ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-700 mb-4">No results found for "{searchQuery}".</p>
              <p className="text-md text-gray-500 mb-6">Perhaps try a different search term or browse our suggestions:</p>
              {/* Suggested items - Placeholder */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">

              </div>
              <Button className="bg-pink-300 hover:bg-pink-400 text-white rounded-full px-6 py-3 text-lg">
                Chat with a Stylist
              </Button>
            </div>
          ) : searchResults.length === 0 && searchQuery === '' ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-700 mb-4">Discover your next favorite item.</p>
              <p className="text-md text-gray-500">Start typing to explore Herstyle's exquisite collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {searchResults.map(product => (
                <ProductCard key={product.id} product={product} onQuickView={(p) => { setQuickViewProduct(p); setIsQuickViewOpen(true); }} />
              ))}
            </div>
          )}
        </div>

        <ProductQuickView
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default SearchModal;