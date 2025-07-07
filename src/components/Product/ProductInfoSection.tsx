import React from 'react';
import { Link } from 'react-router-dom';

interface ProductInfoSectionProps {
  product: {
    name: string;
    category?: { slug: string; name: string } | null;
    currency?: string;
    price?: number;
    sale_price?: number;
    description?: string;
  };
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ product }) => {
  return (
    <div className="lg:w-1/2 w-full p-4 lg:p-0">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-600 mb-2">
        <Link to="/" className="hover:underline">Home</Link> /
        {product.category && (
          <Link to={`/category/${product.category.slug}`} className="hover:underline">{product.category.name}</Link>
        )} /
        <span className="font-semibold text-gray-800">{product.name}</span>
      </nav>

      <h1 className="font-playfair text-3xl lg:text-4xl font-extrabold text-dustyrose-900 mb-1 leading-tight">
        {product.name}
      </h1>
      <p className="text-md text-gray-700 mb-2 font-inter">
        {/* Short Description Placeholder */}
        A luxurious and elegant piece for your wardrobe.
      </p>

      {/* Rating & Reviews Placeholder */}
      <div className="flex items-center mb-2">
        <div className="flex text-gold-500">
          {'★'.repeat(5)}{'☆'.repeat(0)} {/* Example: 5 stars */}
        </div>
        <span className="text-xs text-gray-600 ml-1">(128 Reviews)</span>
      </div>
      <p className="font-playfair text-2xl font-bold text-blush-700 mb-4">
        {product.currency}{product.price?.toFixed(2)}
        {product.sale_price && (
          <span className="text-gray-500 line-through ml-1">{product.currency}{product.sale_price?.toFixed(2)}</span>
        )}
      </p>

      {/* Color Selector */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Color: <span className="font-normal">Black</span></h3>
        <div className="flex space-x-1">
          <span className="w-6 h-6 rounded-full bg-black border-2 border-blush-500 cursor-pointer"></span>
          <span className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 cursor-pointer"></span>
          <span className="w-6 h-6 rounded-full bg-blue-500 border-2 border-transparent cursor-pointer"></span>
        </div>
      </div>

      {/* Size Selector */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Size: <span className="font-normal">M</span></h3>
        <div className="flex space-x-1">
          <span className="px-3 py-1 border border-gray-300 rounded-md cursor-pointer text-sm hover:border-blush-500 transition-colors duration-300">XS</span>
          <span className="px-3 py-1 border border-gray-300 rounded-md cursor-pointer text-sm hover:border-blush-500 transition-colors duration-300">S</span>
          <span className="px-3 py-1 border border-blush-500 rounded-md cursor-pointer text-sm">M</span>
          <span className="px-3 py-1 border border-gray-300 rounded-md cursor-pointer text-sm hover:border-blush-500 transition-colors duration-300">L</span>
          <span className="px-3 py-1 border border-gray-300 rounded-md cursor-pointer text-sm hover:border-blush-500 transition-colors duration-300">XL</span>
        </div>
      </div>

      {/* Stock Status */}
      <p className="text-green-600 font-semibold mb-4 text-sm">In Stock</p>

      {/* CTA Buttons */}
      <div className="flex space-x-2 mb-6">
        <button className="flex-1 bg-blush-600 text-white py-2 px-4 rounded-full text-md font-semibold hover:bg-blush-700 transition-colors duration-300 shadow-lg">
          Add to Cart
        </button>
        <button className="flex-1 border border-blush-600 text-blush-600 py-2 px-4 rounded-full text-md font-semibold hover:bg-blush-50 transition-colors duration-300">
          Add to Wishlist
        </button>
      </div>

      {/* Accordion Content */}
      <div className="border-t border-gray-200 py-2">
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer py-1 font-semibold text-gray-800 text-sm">
            Description
            <span className="transform transition-transform duration-300 group-open:rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <div className="pb-1 text-gray-700 text-sm">
            <p>{product.description || 'No description available.'}</p>
          </div>
        </details>
      </div>

      <div className="border-t border-gray-200 py-2">
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer py-1 font-semibold text-gray-800 text-sm">
            Materials & Care
            <span className="transform transition-transform duration-300 group-open:rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <div className="pb-1 text-gray-700 text-sm">
            <p>Made from 100% organic cotton. Machine wash cold, tumble dry low.</p>
          </div>
        </details>
      </div>

      <div className="border-t border-gray-200 py-2">
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer py-1 font-semibold text-gray-800 text-sm">
            Size Guide
            <span className="transform transition-transform duration-300 group-open:rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <div className="pb-1 text-gray-700 text-sm">
            <p>Refer to our detailed size chart for the perfect fit.</p>
          </div>
        </details>
      </div>

      <div className="border-t border-gray-200 py-2">
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer py-1 font-semibold text-gray-800 text-sm">
            Shipping & Returns
            <span className="transform transition-transform duration-300 group-open:rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <div className="pb-1 text-gray-700 text-sm">
            <p>Free shipping on all orders over $100. Easy returns within 30 days.</p>
          </div>
        </details>
      </div>

      <div className="border-t border-gray-200 py-2">
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer py-1 font-semibold text-gray-800 text-sm">
            FAQs
            <span className="transform transition-transform duration-300 group-open:rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <div className="pb-1 text-gray-700 text-sm">
            <p>Find answers to common questions about our products and services.</p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default ProductInfoSection;