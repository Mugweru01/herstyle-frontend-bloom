import React from 'react';

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

interface ProductMediaGalleryProps {
  mediaItems: MediaItem[];
  currentImageIndex: number;
  onThumbnailClick: (index: number) => void;
  onOpenLightbox: (media: MediaItem) => void;
  productName: string;
}

const ProductMediaGallery: React.FC<ProductMediaGalleryProps> = ({
  mediaItems,
  currentImageIndex,
  onThumbnailClick,
  onOpenLightbox,
  productName,
}) => {
  return (
    <div className="lg:w-1/4 w-1/2 rounded-2xl overflow-hidden shadow-lg bg-cream-100 p-4 mx-auto lg:mx-0">
      <div
        className="relative mb-4 rounded-xl overflow-hidden aspect-w-4 aspect-h-3 cursor-pointer"
        onClick={() => mediaItems[currentImageIndex] && onOpenLightbox(mediaItems[currentImageIndex])}
      >
        {mediaItems.length > 0 && mediaItems[currentImageIndex]?.type === 'video' ? (
          <video
            src={mediaItems[currentImageIndex]?.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        ) : (
          <img alt="Product image"
            src={mediaItems.length > 0 ? mediaItems[currentImageIndex]?.url : '/placeholder.svg'}
            alt={productName}
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {mediaItems.length > 0 && mediaItems.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
              index === currentImageIndex ? 'border-blush-500' : 'border-transparent'
            } transition-all duration-300 transform hover:scale-105`}
            onClick={() => onThumbnailClick(index)}
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
                src={item.url || '/placeholder.svg'}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-20 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductMediaGallery;