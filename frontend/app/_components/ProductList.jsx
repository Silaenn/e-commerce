"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

const ProductList = ({ productList, search, button, navigateCategory }) => {
  return (
    <div className="mt-24 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-2">
          <h2 className="text-primary font-bold text-3xl md:text-4xl tracking-tighter">
            Our Popular Products
          </h2>
          <p className="text-muted-foreground font-medium">Selected favorites, loved by our community.</p>
        </div>
        <div className="flex gap-4">
          {button && (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigateCategory(-1)}
                className="rounded-full h-12 w-12 p-0 border-primary/10 hover:bg-primary hover:text-background transition-all"
              >
                <MoveLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigateCategory(+1)}
                className="rounded-full h-12 w-12 p-0 border-primary/10 hover:bg-primary hover:text-background transition-all"
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
