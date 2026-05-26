"use client";
import React from "react";
import ProductItem from "./ProductItem";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

const ProductList = ({ productList, search, button, navigateCategory, loading }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="mt-16 sm:mt-28 px-5 sm:px-8 md:px-12 w-full">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-8 sm:mb-16 gap-3 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 sm:space-y-3 text-left"
          >
            <div className="flex items-center justify-start gap-2">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-0.5 bg-primary/60"
              />
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                Top Picks
              </span>
            </div>
            <h2 className="text-gray-900 font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tighter leading-none">
              Popular Products
            </h2>
            <p className="text-gray-500 font-medium italic">
              The most loved items this week.
            </p>
          </motion.div>

          {button && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 self-end sm:self-auto"
            >
              <Button
                variant="outline"
                onClick={() => navigateCategory(-1)}
                className="rounded-full h-12 w-12 p-0 border-gray-200 hover:border-primary/30 hover:bg-green-50 transition-all duration-300 active:scale-90 shadow-sm hover:shadow-md"
              >
                <MoveLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigateCategory(+1)}
                className="rounded-full h-12 w-12 p-0 border-gray-200 hover:border-primary/30 hover:bg-green-50 transition-all duration-300 active:scale-90 shadow-sm hover:shadow-md"
              >
                <MoveRight className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[350px] w-full bg-gray-300 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>

        ) : productList && productList.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {productList.map((p, index) => (
              <motion.div
                key={p.id || index}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  },
                }}
              >
                <ProductItem p={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="h-40 sm:h-64 flex items-center justify-center bg-gray-50 rounded-[2rem] sm:rounded-[2.5rem] border border-dashed border-gray-200 transition-colors hover:bg-gray-100/50">
            <p className="text-sm text-gray-400 font-medium tracking-tight">
              No products found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
