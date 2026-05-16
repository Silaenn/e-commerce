import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

const ProductItem = ({ p }) => {
  return (
    <div className="group p-4 flex flex-col gap-4 bg-card hover:bg-background rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 border border-transparent hover:border-primary/10">
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-secondary/10 p-8 flex items-center justify-center">
        <Image
          src={
            (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337") +
            p.images[0].url
          }
          width={400}
          height={400}
          alt={p.name}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4 h-12 w-12 rounded-full p-0 flex items-center justify-center bg-primary text-background hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden group/btn hover:w-36"
            >
              <div className="flex items-center gap-2 whitespace-nowrap px-4">
                <span className="text-xl font-bold">+</span>
                <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity font-bold text-sm">Add to Cart</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
            <ProductItemDetail product={p} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-1 px-2">
        <h2 className="font-bold text-lg text-primary truncate">{p.name}</h2>
        <div className="flex items-center gap-3 font-medium">
          {p.sellingPrice && (
            <span className="text-primary text-xl font-bold tracking-tighter">
              Rp{p.sellingPrice.toLocaleString("id-ID")}
            </span>
          )}
          {p.price && (
            <span className="text-muted-foreground text-sm line-through decoration-primary/30">
              Rp{p.price.toLocaleString("id-ID")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
