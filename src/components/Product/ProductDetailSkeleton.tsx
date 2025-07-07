import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Left Column: Media Carousel Skeleton */}
      <div className="lg:w-3/5 w-full rounded-2xl overflow-hidden shadow-lg bg-gray-200 p-4 h-[500px]">
        <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-300 h-3/4 w-full"></div>
        <div className="grid grid-cols-4 gap-3">
          <div className="h-20 w-full rounded-lg bg-gray-300"></div>
          <div className="h-20 w-full rounded-lg bg-gray-300"></div>
          <div className="h-20 w-full rounded-lg bg-gray-300"></div>
          <div className="h-20 w-full rounded-lg bg-gray-300"></div>
        </div>
      </div>

      {/* Right Column: Product Info & Actions Skeleton */}
      <div className="lg:w-2/5 w-full p-4 lg:p-0">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>

        {/* Color & Size Selectors Skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-200 rounded w-1/6 mb-2"></div>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <div className="mb-6">
          <div className="h-4 bg-gray-200 rounded w-1/6 mb-2"></div>
          <div className="flex gap-2">
            <div className="px-4 py-2 rounded-md bg-gray-300 w-12"></div>
            <div className="px-4 py-2 rounded-md bg-gray-300 w-12"></div>
            <div className="px-4 py-2 rounded-md bg-gray-300 w-12"></div>
          </div>
        </div>

        {/* Stock Status Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>

        {/* CTA Buttons Skeleton */}
        <div className="flex flex-col space-y-4 mb-8">
          <div className="w-full h-12 bg-gray-300 rounded-md"></div>
          <div className="w-full h-12 bg-gray-300 rounded-md"></div>
          <div className="w-full h-12 bg-gray-300 rounded-md"></div>
        </div>

        {/* Additional Product Details Skeleton */}
        <div className="border-t border-gray-200 pt-8">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;