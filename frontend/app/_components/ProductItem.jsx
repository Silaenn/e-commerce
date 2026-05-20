import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";
import { ShoppingBasket } from "lucide-react";

const ProductItem = ({ p }) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200">
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-2xl flex items-center justify-center p-6 overflow-hidden">
        <Image
          src={
            (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337") +
            p.images[0].url
          }
          width={400}
          height={400}
          alt={p.name}
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick Add Overlay */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="bg-white text-black p-3 rounded-full shadow-lg translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                 <ShoppingBasket className="h-6 w-6" />
               </div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl">
            <ProductItemDetail product={p} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Section */}
      <div className="mt-4 space-y-1">
        <h2 className="font-bold text-gray-900 text-lg truncate group-hover:text-primary transition-colors">{p.name}</h2>
        <div className="flex items-center gap-2">
          {p.sellingPrice && (
            <span className="font-extrabold text-xl text-gray-900">
              Rp{p.sellingPrice.toLocaleString("id-ID")}
            </span>
          )}
          {p.price && (
            <span className="text-gray-400 text-sm line-through">
              Rp{p.price.toLocaleString("id-ID")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
