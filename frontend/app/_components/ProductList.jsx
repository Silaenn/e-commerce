"use client";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

const ProductList = ({ productList, search, button, navigateCategory }) => {
  return (
    <div className="mt-24 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between mb-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-1"
        >
          <h2 className="text-gray-900 font-extrabold text-4xl tracking-tight">
            Popular Products
          </h2>
          <p className="text-gray-500 font-medium">The most loved items this week.</p>
        </motion.div>
        <div className="flex gap-3">
          {button && (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigateCategory(-1)}
                className="rounded-full h-12 w-12 p-0 transition-transform active:scale-90"
              >
                <MoveLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigateCategory(+1)}
                className="rounded-full h-12 w-12 p-0 transition-transform active:scale-90"
              >
                <MoveRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {productList.map(
          (p, index) => index < 8 && (
            <ProductItem key={p.id || index} p={p} index={index} />
          )
        )}
      </motion.div>
    </div>
  );
};

export default ProductList;
