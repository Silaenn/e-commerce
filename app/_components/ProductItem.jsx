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
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          p.attributes.images.data[0].attributes.url
        }
        width={500}
        height={200}
        alt={p.attributes.name}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold text-lg  text-center">{p.attributes.name}</h2>

      <div className="flex gap-3">
        {p.attributes.sellingPrice && (
          <h2 className="font-bold text-lg">
            Rp{p.attributes.sellingPrice.toLocaleString("id-ID")}
          </h2>
        )}
        {p.attributes.mrp && (
          <h2
            className={`font-bold text-lg ${
              p.attributes.sellingPrice && "line-through text-gray-500"
            }`}
          >
            Rp{p.attributes.mrp.toLocaleString("id-ID")}
          </h2>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetail product={p} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
