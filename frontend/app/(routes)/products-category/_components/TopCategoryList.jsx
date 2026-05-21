"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  return (
    <div className="mt-12 px-6 md:px-12 lg:px-12 w-full">
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex overflow-x-auto custom-scrollbar pb-8 gap-6"
        >
          {categoryList.map((c, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0"
            >
              <Link
                href={"/products-category/" + c.name}
                className={`flex flex-col items-center gap-3 p-5 rounded-[2rem] group cursor-pointer transition-all duration-300 min-w-[140px] border
                  ${
                    selectedCategory === c.name 
                    ? "bg-white border-primary shadow-lg shadow-green-900/5" 
                    : "bg-white border-gray-100 hover:border-primary/20 hover:bg-green-50/30"
                  }
                `}
              >
                <div className={`p-4 rounded-2xl transition-all duration-300 ${selectedCategory === c.name ? "bg-green-50" : "bg-gray-50 group-hover:bg-white"}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                      c?.image?.url || ""
                    }`}
                    width={40}
                    height={40}
                    alt={c.name}
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h2
                  className={`font-bold text-sm tracking-tight transition-colors
                    ${selectedCategory === c.name ? "text-primary" : "text-gray-900 group-hover:text-primary"}
                  `}
                >
                  {c.name}
                </h2>

                {selectedCategory === c.name && (
                  <motion.div 
                    layoutId="activeTab"
                    className="h-1 w-6 bg-primary rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopCategoryList;
