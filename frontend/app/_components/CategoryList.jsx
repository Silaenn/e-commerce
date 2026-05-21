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
        className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
      >
        <div className="space-y-1">
          <h2 className="text-gray-900 font-extrabold text-4xl tracking-tight">Browse Categories</h2>
          <p className="text-gray-500 font-medium">Top picks for your healthy lifestyle.</p>
        </div>
      </motion.div>
      
      {categoryList && categoryList.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          {categoryList.map((c, index) => (
            <motion.div key={c.id || index} variants={itemVariants}>
              <Link
                href={"/products-category/" + c.name}
                className="group flex flex-col items-center gap-4"
              >
                {/* Large Product Image Container */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative aspect-square w-full rounded-[2rem] bg-gray-50 flex items-center justify-center p-10 transition-colors duration-300 group-hover:bg-green-50"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                      c?.image?.url || ""
                    }`}
                    width={150}
                    height={150}
                    alt={c.name}
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
                
                {/* Text Below the image */}
                <div className="text-center">
                  <h2 className="text-gray-900 font-bold text-lg transition-colors group-hover:text-primary">
                    {c.name}
                  </h2>
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
