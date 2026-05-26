import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-green-50/30 py-10 sm:py-16 px-5 sm:px-8 md:px-12 w-full border-b border-green-100/50">
        <div className="max-w-[1800px] mx-auto space-y-4">
          <div className="h-4 w-32 bg-gray-300 animate-pulse rounded-full" />
          <div className="h-12 w-64 sm:w-96 bg-gray-300 animate-pulse rounded-2xl" />
        </div>
      </div>

      {/* Top Category List Skeleton */}
      <div className="mt-12 px-5 sm:px-8 md:px-12 w-full">
        <div className="max-w-[1800px] mx-auto flex gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 min-w-[140px] bg-gray-200 animate-pulse rounded-[2rem]" />
          ))}
        </div>
      </div>

      {/* Product List Skeleton */}
      <div className="mt-16 sm:mt-28 px-5 sm:px-8 md:px-12 w-full">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[400px] w-full bg-gray-200 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
