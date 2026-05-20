"use client";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

const ProductList = ({ productList, search, button, navigateCategory }) => {
  return (
    <div className="mt-24 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <h2 className="text-gray-900 font-extrabold text-4xl tracking-tight">
            Popular Products
          </h2>
          <p className="text-gray-500 font-medium">The most loved items this week.</p>
        </div>
        <div className="flex gap-3">
          {button && (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigateCategory(-1)}
                className="rounded-full h-12 w-12 p-0"
              >
                <MoveLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigateCategory(+1)}
                className="rounded-full h-12 w-12 p-0"
              >
                <MoveRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productList.map(
          (p, index) => index < 8 && <ProductItem key={p.id || index} p={p} />
        )}
      </div>
    </div>
  );
};

export default ProductList;
