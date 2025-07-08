import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { ProductCard } from '@/components/Product/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
}

// Dummy product data for demonstration
const dummyProducts: Product[] = [
  { id: '1', name: 'Elegant Silk Dress', price: 1200, images: ['https://via.placeholder.com/300x300?text=Silk+Dress'], category: 'Dresses' },
  { id: '2', name: 'Classic Leather Handbag', price: 850, images: ['https://via.placeholder.com/300x300?text=Leather+Handbag'], category: 'Accessories' },
  { id: '3', name: 'Vintage Denim Jacket', price: 950, images: ['https://via.placeholder.com/300x300?text=Denim+Jacket'], category: 'Jackets' },
  { id: '4', name: 'Boho Chic Blouse', price: 450, images: ['https://via.placeholder.com/300x300?text=Boho+Blouse'], category: 'Tops' },
  { id: '5', name: 'Minimalist Silver Necklace', price: 300, images: ['https://via.placeholder.com/300x300?text=Silver+Necklace'], category: 'Jewelry' },
  { id: '6', name: 'Comfortable Running Shoes', price: 700, images: ['https://via.placeholder.com/300x300?text=Running+Shoes'], category: 'Footwear' },
];

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    handleSearch(initialQuery);
  }, [initialQuery]);

  const handleSearch = (query: string) => {
    const filteredResults = dummyProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
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

      {searchResults.length === 0 && searchQuery !== '' ? (
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