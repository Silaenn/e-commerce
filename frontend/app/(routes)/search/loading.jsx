import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-green-50/30 py-10 sm:py-16 px-5 sm:px-8 md:px-12 w-full border-b border-green-100/50">
        <div className="max-w-[1800px] mx-auto flex flex-col items-center sm:items-start space-y-4 text-center sm:text-left">
          <div className="h-4 w-32 bg-gray-300 animate-pulse rounded-full" />
          <div className="h-12 w-64 sm:w-96 bg-gray-300 animate-pulse rounded-2xl" />
        </div>
      </div>

      {/* Product List Skeleton with Header */}
      <div className="mt-16 px-5 sm:px-8 md:px-12 w-full">
        <div className="max-w-[1800px] mx-auto">
          {/* Detailed Header Skeleton */}
          <div className="flex flex-col sm:flex-row items-start justify-between mb-12 sm:mb-16 gap-3 sm:gap-6">
            <div className="space-y-3">
               <div className="flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-gray-300 animate-pulse" />
                  <div className="h-4 w-24 bg-gray-300 animate-pulse rounded-full" />
               </div>
               <div className="h-10 w-64 sm:w-80 bg-gray-300 animate-pulse rounded-xl" />
               <div className="h-4 w-48 bg-gray-200 animate-pulse rounded-full" />
            </div>
          </div>

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
