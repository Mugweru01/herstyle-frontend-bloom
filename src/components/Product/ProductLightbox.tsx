import React from 'react';

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

interface ProductLightboxProps {
  isOpen: boolean;
  media: MediaItem | null;
  onClose: () => void;
}

const ProductLightbox: React.FC<ProductLightboxProps> = ({
  isOpen,
  media,
  onClose,
}) => {
  if (!isOpen || !media) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
        {media.type === 'video' ? (
          <video
            src={media.url}
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
            src={media.url}
            alt="Zoomed Product Media"
            className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold bg-gray-800 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors duration-200"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ProductLightbox;