import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '@/components/Product/ProductCard';
import { useSupabase } from '@/hooks/useSupabase';

interface Product {
  id: string;
  name: string;
  price: number;
  image_urls: string[];
  category: string;
}

const SearchPage: React.FC = () => {
  const { supabase } = useSupabase();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_urls, category')
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-4xl font-bold text-center mb-8">Search Results</h1>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto space-x-2 mb-8">
        <Input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <SearchIcon className="mr-2 h-4 w-4" /> Search
        </Button>
      </form>

      {loading ? (
        <p className="text-center text-gray-600">Loading results...</p>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : searchResults.length === 0 && searchQuery !== '' ? (
        <p className="text-center text-gray-600">No results found for "{searchQuery}".</p>
      ) : searchResults.length === 0 && searchQuery === '' ? (
        <p className="text-center text-gray-600">Start typing to search for products.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;