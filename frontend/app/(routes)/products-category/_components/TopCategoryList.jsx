"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex overflow-x-auto custom-scrollbar pb-6 mx-6 md:mx-24 gap-6 mt-8"
    >
      {categoryList.map((c, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link
            href={"/products-category/" + c.name}
            className={`flex flex-col items-center gap-3 p-4 rounded-3xl group cursor-pointer transition-all duration-300 min-w-[120px] border relative
              ${
                selectedCategory === c.name 
                ? "bg-primary border-primary shadow-lg shadow-green-900/20" 
                : "bg-white border-gray-100 hover:border-primary/20 hover:bg-green-50"
              }
            `}
          >
            {selectedCategory === c.name && (
              <motion.div 
                layoutId="activeCategory"
                className="absolute inset-0 bg-primary rounded-3xl -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className={`p-4 rounded-2xl transition-colors ${selectedCategory === c.name ? "bg-white/20" : "bg-gray-50 group-hover:bg-white"}`}>
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
                ${selectedCategory === c.name ? "text-white" : "text-gray-900 group-hover:text-primary"}
              `}
            >
              {c.name}
            </h2>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TopCategoryList;
