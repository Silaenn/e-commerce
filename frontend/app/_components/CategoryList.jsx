import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryList = ({ categoryList }) => {
  return (
    <div className="mt-24 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div className="space-y-1">
          <h2 className="text-gray-900 font-extrabold text-4xl tracking-tight">Browse Categories</h2>
          <p className="text-gray-500 font-medium">Top picks for your healthy lifestyle.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categoryList.map((c, index) => (
          <Link
            key={c.id || index}
            href={"/products-category/" + c.name}
            className="group flex flex-col items-center gap-4"
          >
            {/* Large Product Image Container */}
            <div className="relative aspect-square w-full rounded-[2rem] bg-gray-50 flex items-center justify-center p-10 transition-all duration-500 group-hover:bg-green-50 group-hover:shadow-xl group-hover:shadow-green-900/5">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                  c?.image?.url || ""
                }`}
                width={150}
                height={150}
                alt={c.name}
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Text Below the image */}
            <div className="text-center">
              <h2 className="text-gray-900 font-bold text-lg transition-colors group-hover:text-primary">
                {c.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
