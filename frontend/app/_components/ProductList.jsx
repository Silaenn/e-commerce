"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

const ProductList = ({ productList, search, button, navigateCategory }) => {
  console.log(search);
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        {button && (
          <Button variant="outline" onClick={() => navigateCategory(-1)}>
            <MoveLeft />
          </Button>
        )}
        <h2 className="text-green-600 font-bold text-2xl text-center">
          Our Popular Products
        </h2>
        {button && (
          <Button variant="outline" onClick={() => navigateCategory(+1)}>
            <MoveRight />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid--cols-3 lg:grid-cols-4 gap-5 mt-6">
        {productList.map(
          (p, index) => index < 8 && <ProductItem key={p.id || index} p={p} />
        )}
      </div>
    </div>
  );
};

export default ProductList;
