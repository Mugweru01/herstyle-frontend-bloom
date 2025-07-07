
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import ProductDetailSkeleton from '@/components/Product/ProductDetailSkeleton';
import { Link } from 'react-router-dom';

type Product = Database['public']['Tables']['products']['Row'];

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(*)')
          .eq('slug', slug)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setProduct(data);
          const media: MediaItem[] = [];
          if (data.video_url) {
            media.push({ url: data.video_url, type: 'video' });
          }
          if (data.image_urls && data.image_urls.length > 0) {
            data.image_urls.forEach((url: string) => media.push({ url, type: 'image' }));
          }
          setMediaItems(media);

          // Fetch suggested products
          if (data.category_id) {
            const { data: suggestedData, error: suggestedError } = await supabase
              .from('products')
              .select('*')
              .eq('category_id', data.category_id)
              .neq('id', data.id) // Exclude current product
              .limit(4);

            if (suggestedError) {
              console.error('Error fetching suggested products:', suggestedError);
            } else if (suggestedData) {
              setSuggestedProducts(suggestedData);
            }
          }
        }
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openLightbox = (media: MediaItem) => {
    setLightboxMedia(media);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxMedia(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter">
      <div className="container mx-auto px-4 py-8">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blush-600 hover:text-blush-800 flex items-center mb-6 font-semibold transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Go Back
        </button>

        {loading ? (
          <ProductDetailSkeleton />
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        ) : product ? (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column: Media Carousel */}
            <div className="lg:w-1/2 w-full rounded-2xl overflow-hidden shadow-lg bg-cream-100 p-4">
              <div
                className="relative mb-4 rounded-xl overflow-hidden aspect-w-1 aspect-h-1 cursor-pointer"
                onClick={() => mediaItems[currentImageIndex] && openLightbox(mediaItems[currentImageIndex])}
              >
                {mediaItems[currentImageIndex]?.type === 'video' ? (
                  <video
                    src={mediaItems[currentImageIndex]?.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={mediaItems[currentImageIndex]?.url || '/public/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {mediaItems.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blush-500' : 'border-transparent'
                    } transition-all duration-300 transform hover:scale-105`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        className="w-full h-20 object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url || '/public/placeholder.svg'}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="lg:w-1/2 w-full p-4 lg:p-0">
              {/* Breadcrumb Navigation */}
              <nav className="text-sm text-gray-600 mb-2">
                <a href="/" className="hover:underline">Home</a> / 
                <a href={`/category/${product.category?.slug}`} className="hover:underline">{product.category?.name}</a> / 
                <span className="font-semibold text-gray-800">{product.name}</span>
              </nav>

              <h1 className="font-playfair text-4xl lg:text-5xl font-extrabold text-dustyrose-900 mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-gray-700 mb-4 font-inter">
                {/* Short Description Placeholder */}
                A luxurious and elegant piece for your wardrobe.
              </p>

              {/* Rating & Reviews Placeholder */}
              <div className="flex items-center mb-4">
                <div className="flex text-gold-500">
                  {'★'.repeat(5)}{'☆'.repeat(0)} {/* Example: 5 stars */}
                </div>
                <span className="text-sm text-gray-600 ml-2">(128 Reviews)</span>
              </div>

              <p className="font-playfair text-3xl font-bold text-blush-700 mb-6">
                {product.currency}{product.price?.toFixed(2)}
                {product.sale_price && (
                  <span className="text-gray-500 line-through ml-2">{product.currency}{product.sale_price?.toFixed(2)}</span>
                )}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Color: <span className="font-normal">Black</span></h3>
                <div className="flex space-x-2">
                  <span className="w-8 h-8 rounded-full bg-black border-2 border-blush-500 cursor-pointer"></span>
                  <span className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 cursor-pointer"></span>
                  <span className="w-8 h-8 rounded-full bg-blue-500 border-2 border-transparent cursor-pointer"></span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Size: <span className="font-normal">M</span></h3>
                <div className="flex space-x-2">
                  <span className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:border-blush-500 transition-colors duration-300">XS</span>
                  <span className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:border-blush-500 transition-colors duration-300">S</span>
                  <span className="px-4 py-2 border border-blush-500 rounded-md cursor-pointer">M</span>
                  <span className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:border-blush-500 transition-colors duration-300">L</span>
                  <span className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:border-blush-500 transition-colors duration-300">XL</span>
                </div>
              </div>

              {/* Stock Status */}
              <p className="text-green-600 font-semibold mb-6">In Stock</p>

              {/* CTA Buttons */}
              <div className="flex space-x-4 mb-8">
                <button className="flex-1 bg-blush-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blush-700 transition-colors duration-300 shadow-lg">
                  Add to Cart
                </button>
                <button className="flex-1 border border-blush-600 text-blush-600 py-3 px-6 rounded-full text-lg font-semibold hover:bg-blush-50 transition-colors duration-300">
                  Add to Wishlist
                </button>
              </div>

              {/* Expandable Product Details */}
              <div className="border-t border-gray-200 py-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-2 font-semibold text-gray-800">
                    Description
                    <span className="transform transition-transform duration-300 group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-2 text-gray-700">
                    <p>{product.description || 'No description available.'}</p>
                  </div>
                </details>
              </div>

              <div className="border-t border-gray-200 py-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-2 font-semibold text-gray-800">
                    Materials & Care
                    <span className="transform transition-transform duration-300 group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-2 text-gray-700">
                    <p>Made from 100% organic cotton. Machine wash cold, tumble dry low.</p>
                  </div>
                </details>
              </div>

              <div className="border-t border-gray-200 py-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-2 font-semibold text-gray-800">
                    Size Guide
                    <span className="transform transition-transform duration-300 group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-2 text-gray-700">
                    <p>Refer to our detailed size chart for the perfect fit.</p>
                  </div>
                </details>
              </div>

              <div className="border-t border-gray-200 py-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-2 font-semibold text-gray-800">
                    Shipping & Returns
                    <span className="transform transition-transform duration-300 group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-2 text-gray-700">
                    <p>Free shipping on all orders over $100. Easy returns within 30 days.</p>
                  </div>
                </details>
              </div>

              <div className="border-t border-gray-200 py-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-2 font-semibold text-gray-800">
                    FAQs
                    <span className="transform transition-transform duration-300 group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-2 text-gray-700">
                    <p>Find answers to common questions about our products and services.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">Product not found.</div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blush-600 hover:bg-blush-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blush-500 transition-colors duration-300"
          >
            <svg
              className="-ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Go to Home
          </Link>
        </div>

        {/* Suggested Products Section */}
        {!loading && suggestedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-playfair text-3xl lg:text-4xl font-extrabold text-dustyrose-900 mb-8 text-center">
              You May Also Like
            </h2>
            <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
              {suggestedProducts.map((suggestedProduct) => (
                <div
                  key={suggestedProduct.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Link to={`/product/${suggestedProduct.slug}`}>
                    <img
                      src={suggestedProduct.image_urls?.[0] || '/public/placeholder.svg'}
                      alt={suggestedProduct.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 text-center">
                      <h3 className="font-playfair text-xl font-bold text-dustyrose-800 mb-1">
                        {suggestedProduct.name}
                      </h3>
                      <p className="text-blush-600 font-semibold">
                        {suggestedProduct.currency}{suggestedProduct.price?.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && lightboxMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {lightboxMedia.type === 'video' ? (
              <video
                src={lightboxMedia.url}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video
              />
            ) : (
              <img
                src={lightboxMedia.url}
                alt="Zoomed Product Media"
                className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
              />
            )}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl font-bold bg-gray-800 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors duration-200"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Brand Immersion Strip */}
      <div className="bg-cream-light py-8 mt-12 text-center opacity-0 animate-fade-in animate-delay-500">
        <p className="text-lg font-serif text-gray-800">Designed in Nairobi. Worn around the world.</p>
      </div>

      {/* Premium Footer Design */}
      <footer className="bg-gray-900 text-gray-300 py-16 mt-12 opacity-0 animate-fade-in animate-delay-700">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Navigation */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
                <li><Link to="/collections" className="hover:text-white transition-colors duration-300">Collections</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors duration-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors duration-300">Blog</Link></li>
          </ul>
        </div>
    
        {/* Column 2: Customer Care */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-white transition-colors duration-300">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition-colors duration-300">Shipping</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors duration-300">Returns</Link></li>
            <li><Link to="/track-order" className="hover:text-white transition-colors duration-300">Track Order</Link></li>
          </ul>
        </div>
    
        {/* Column 3: Newsletter Signup */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">Stay updated with our latest collections and exclusive offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-r-md transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-12">
        &copy; {new Date().getFullYear()} Herstyle. All rights reserved.
      </div>
    </footer>
  </div>
);
};

export default ProductDetail;
