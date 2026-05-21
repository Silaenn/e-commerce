"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const CategoryList = ({ categoryList }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 1.11, 0.81, 0.99] // Smooth spring-like ease
      }
    }
  };

  return (
    <div className="mt-24 px-6 md:px-12 lg:px-24">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-primary/30" />
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
              Fresh Selection
            </span>
          </div>
          <h2 className="text-gray-900 font-extrabold text-4xl md:text-5xl tracking-tighter">Browse Categories</h2>
          <p className="text-gray-500 font-medium italic">Top picks for your healthy lifestyle.</p>
        </div>
      </motion.div>
      
      {categoryList && categoryList.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10"
        >
          {categoryList.map((c, index) => (
            <motion.div key={c.id || index} variants={itemVariants}>
              <Link
                href={"/products-category/" + c.name}
                className="group flex flex-col items-center gap-6"
              >
                {/* Large Product Image Container */}
                <motion.div 
                  whileHover={{ 
                    y: -8,
                    shadow: "0 20px 25px -5px rgba(34, 197, 94, 0.1), 0 8px 10px -6px rgba(34, 197, 94, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative aspect-square w-full rounded-[2.5rem] bg-gray-50 border border-transparent flex items-center justify-center p-10 transition-all duration-500 group-hover:bg-white group-hover:border-green-100 group-hover:shadow-2xl group-hover:shadow-green-900/5"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                      c?.image?.url || ""
                    }`}
                    width={150}
                    height={150}
                    alt={c.name}
                    className="object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                  />
                  
                  {/* Subtle Glow behind image on hover */}
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-0 group-hover:scale-100 transition-transform duration-700 -z-10" />
                </motion.div>
                
                {/* Text Below the image */}
                <div className="text-center space-y-1">
                  <h2 className="text-gray-900 font-bold text-xl tracking-tight transition-colors group-hover:text-primary">
                    {c.name}
                  </h2>
                  <div className="h-1 w-0 bg-primary mx-auto rounded-full transition-all duration-300 group-hover:w-8" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CategoryList;
