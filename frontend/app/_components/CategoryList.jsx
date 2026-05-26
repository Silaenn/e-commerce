"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { resolveMediaUrl } from "../_utils/backend";

const CategoryList = ({ categoryList }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="mt-16 sm:mt-28 px-5 sm:px-8 md:px-12 w-full">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between mb-8 sm:mb-16 gap-4"
        >
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-0.5 bg-primary/60"
              />
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                Fresh Selection
              </span>
            </div>
            <h2 className="text-gray-900 font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tighter leading-none">
              Browse Categories
            </h2>
            <p className="text-gray-500 font-medium italic">
              Top picks for your healthy lifestyle.
            </p>
          </div>
        </motion.div>

        {categoryList && categoryList.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-8 md:gap-10"
          >
            {categoryList.map((c, index) => (
              <motion.div key={c.id || index} variants={itemVariants}>
                <Link
                  href={"/products-category/" + c.name}
                  className="group flex flex-col items-center gap-4 sm:gap-6"
                >
                  <motion.div
                    whileHover={{
                      y: -12,
                      rotate: 2,
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="relative aspect-square w-full rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-gray-50 border border-transparent flex items-center justify-center p-5 sm:p-8 md:p-10 transition-all duration-500 group-hover:bg-white group-hover:border-green-100 group-hover:shadow-2xl group-hover:shadow-green-900/5 overflow-hidden"
                  >
                    <Image
                      src={resolveMediaUrl(c?.image?.url) || "/logo.png"}
                      width={150}
                      height={150}
                      alt={c.name}
                      className="object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[-2deg] drop-shadow-sm z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-0 group-hover:scale-100 transition-transform duration-1000 -z-10" />
                  </motion.div>

                  <div className="text-center space-y-1">
                    <h2 className="text-gray-900 font-bold text-sm sm:text-base md:text-xl tracking-tight transition-all duration-300 group-hover:text-primary group-hover:scale-110">
                      {c.name}
                    </h2>
                    <motion.div
                      className="h-1 bg-primary mx-auto rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: 32 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-8 md:gap-10">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <div className="h-[150px] w-full sm:h-[180px] md:h-[220px] bg-gray-200 animate-pulse rounded-[2rem] sm:rounded-[2.5rem]" />
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-full" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;