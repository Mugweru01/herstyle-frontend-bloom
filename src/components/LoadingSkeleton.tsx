import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="pt-24 pb-12" aria-busy="true" aria-live="polite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-gray-200 rounded-3xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;