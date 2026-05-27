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

      <div className="max-w-[1800px] mx-auto px-5 py-4 sm:px-8 sm:py-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2 space-y-10">
             <div className="space-y-6">
                <div className="h-14 w-full bg-gray-200 animate-pulse rounded-3xl" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="h-14 w-full bg-gray-100 animate-pulse rounded-2xl" />
                   <div className="h-14 w-full bg-gray-100 animate-pulse rounded-2xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="h-14 w-full bg-gray-100 animate-pulse rounded-2xl" />
                   <div className="h-14 w-full bg-gray-100 animate-pulse rounded-2xl" />
                </div>
                <div className="h-32 w-full bg-gray-100 animate-pulse rounded-3xl" />
             </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-1">
             <div className="h-[400px] w-full bg-gray-200 animate-pulse rounded-[2.5rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
