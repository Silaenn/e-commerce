import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-green-50/30 py-10 sm:py-16 px-5 sm:px-8 md:px-12 w-full border-b border-green-100/50">
        <div className="max-w-[1800px] mx-auto space-y-4">
          <div className="h-4 w-32 bg-gray-300 animate-pulse rounded-full" />
          <div className="h-12 w-64 sm:w-96 bg-gray-300 animate-pulse rounded-2xl" />
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16">
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 w-full bg-gray-200 animate-pulse rounded-[2rem] sm:rounded-[2.5rem]" />
          ))}
        </div>
      </div>
    </div>
  );
}
