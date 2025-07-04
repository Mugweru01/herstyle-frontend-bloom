
import React from 'react';
import { Heart, Eye } from 'lucide-react';

interface ProductActionsProps {
  isLoved: boolean;
  onLoveToggle: (e: React.MouseEvent) => void;
  onQuickView?: (e: React.MouseEvent) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  isLoved,
  onLoveToggle,
  onQuickView
}) => {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
      <button
        onClick={onLoveToggle}
        className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
          isLoved 
            ? 'bg-blush-500 border-blush-500 text-white shadow-lg scale-110' 
            : 'bg-white/80 border-white/50 text-gray-600 hover:bg-blush-500 hover:text-white hover:border-blush-500'
        }`}
      >
        <Heart size={16} className={isLoved ? 'fill-current' : ''} />
      </button>
      
      {onQuickView && (
        <button
          onClick={onQuickView}
          className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 text-gray-600 hover:bg-sage-500 hover:text-white hover:border-sage-500 transition-all duration-300"
        >
          <Eye size={16} />
        </button>
      )}
    </div>
  );
};

export default ProductActions;
