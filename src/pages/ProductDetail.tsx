
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import ProductDetailSkeleton from '@/components/Product/ProductDetailSkeleton';
import ProductMediaGallery from '@/components/Product/ProductMediaGallery';
import ProductInfoSection from '@/components/Product/ProductInfoSection';

import SuggestedProductsSection from '@/components/Product/SuggestedProductsSection';
import HerstyleEnhancementSection from '@/components/Product/HerstyleEnhancementSection';
import ProductLightbox from '@/components/Product/ProductLightbox';


type Product = Database['public']['Tables']['products']['Row'] & {
  images: string[];
  category: { slug: string; name: string } | null;
};
interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductAndSuggestedProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch main product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*, categories(*)')
          .eq('slug', slug)
          .single();

        if (productError) {
          throw productError;
        }

        if (productData) {
          setProduct(productData);
          const media: MediaItem[] = [];
          if (productData.video_url) {
            media.push({ url: productData.video_url, type: 'video' });
          }
          if (productData.images && productData.images.length > 0) {
            productData.images.forEach((url: string) => media.push({ url, type: 'image' }));
          }
          setMediaItems(media);

          // Fetch suggested products (e.g., from the same category, excluding the current product)
          const { data: suggestedData, error: suggestedError } = await supabase
            .from('products')
            .select('*, categories(*)')
            .eq('category_id', productData.category_id) // Assuming category_id exists for filtering
            .neq('id', productData.id) // Exclude the current product
            .limit(4); // Limit to a few suggested products

          if (suggestedError) {
            console.error('Error fetching suggested products:', suggestedError);
            // Don't throw, just log and continue without suggested products
          }

          if (suggestedData) {
            setSuggestedProducts(suggestedData);
          }
        }
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching product or suggested products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndSuggestedProducts();
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
    <div className="min-h-screen bg-cream-50 text-gray-800 font-inter">
      <div className="container mx-auto px-4 py-8">
        {/* Go Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-blush-600 transition-colors duration-300"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
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
            Continue Shopping
          </Link>
        </div>


        {loading ? (
          <ProductDetailSkeleton />
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        ) : product ? (
          <div>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <ProductMediaGallery
                mediaItems={mediaItems}
                currentImageIndex={currentImageIndex}
                handleThumbnailClick={handleThumbnailClick}
                openLightbox={openLightbox}
                productName={product.name}
              />

              <ProductInfoSection
                product={product}
                category={product.category}
                shortDescription="A luxurious and elegant piece for your wardrobe."
                rating={5}
                reviewCount={128}
                colors={['black', 'white', 'blue']}
                sizes={['XS', 'S', 'M', 'L', 'XL']}
                inStock={true}
              />
            </div>



            <SuggestedProductsSection suggestedProducts={suggestedProducts} />

            <ProductLightbox
              isOpen={isLightboxOpen}
              media={lightboxMedia}
              onClose={closeLightbox}
            />
          </div>
        )
        : (
          <div className="text-center py-10 text-gray-500">Product not found.</div>
        )}

        {/* Brand Immersion Strip */}
        <div className="bg-cream-light py-8 mt-12 text-center opacity-0 animate-fade-in animate-delay-500">
          <p className="text-lg font-serif text-gray-800">Designed in Nairobi. Worn around the world.</p>
        </div>

        <HerstyleEnhancementSection />

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
    </div>
  );
};

export default ProductDetail;
