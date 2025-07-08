
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
              {/* Go Back Button */}
              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 bg-blush-500 text-white rounded-full shadow-md hover:bg-blush-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
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
              {console.log('Product ID:', product.id)}
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


      </div>
    </div>
  );
};

export default ProductDetail;
