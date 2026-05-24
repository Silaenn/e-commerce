"use client";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

const ProductList = ({ productList, search, button, navigateCategory }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="mt-28 px-5 sm:px-8 md:px-12 w-full">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-3 text-left"
        >
          <div className="flex items-center justify-start gap-2">
            <span className="h-0.5 w-8 bg-primary/60" />
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
              Top Picks
            </span>
          </div>
          <h2 className="text-gray-900 font-extrabold text-4xl md:text-5xl tracking-tighter">
            Popular Products
          </h2>
          <p className="text-gray-500 font-medium italic">The most loved items this week.</p>
        </motion.div>
        <div className="flex gap-4">
          {button && (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigateCategory(-1)}
                className="rounded-full h-12 w-12 p-0 border-gray-200 hover:border-primary/30 hover:bg-green-50 transition-all duration-300 active:scale-90"
              >
                <MoveLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigateCategory(+1)}
                className="rounded-full h-12 w-12 p-0 border-gray-200 hover:border-primary/30 hover:bg-green-50 transition-all duration-300 active:scale-90"
              >
                <MoveRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {productList && productList.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {productList.map(
            (p, index) => (
              <ProductItem key={p.id || index} p={p} />
            )
          )}
        </motion.div>
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200 transition-colors hover:bg-gray-100/50">
           <p className="text-gray-400 font-medium tracking-tight">No products found matching your search.</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductList;
