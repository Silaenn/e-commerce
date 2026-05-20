"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, LoaderIcon, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetail = ({ product }) => {
  const jwt = sessionStorage.getItem("jwt");
  const paymentToken = localStorage.getItem("paymentToken");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.sellingPrice
      ? product.sellingPrice
      : product.price
  );

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const addToCart = () => {
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    } else if (paymentToken) {
      toast.error("Payment is still pending. Please complete the payment.");
      setIsDisabled(true);
    } else {
      setLoading(true);
      const data = {
        data: {
          quantity: quantity,
          amount: quantity * productTotalPrice,
          products: product.id,
          users_permissions_users: user,
          userId: user.id,
        },
      };

      console.log(data);

      GlobalApi.addToCart(data, jwt).then(
        (resp) => {
          console.log(resp);
          toast("Added to cart");
          setUpdateCart(!updateCart);
          setLoading(false);
        },
        (e) => {
          toast("Error while adding into cart");
          setLoading(false);
        }
      );
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white text-gray-900 h-full md:h-auto max-h-[90vh] overflow-y-auto">
      <div className="bg-gray-50 p-12 flex items-center justify-center">
        <Image
          src={
            (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337") +
            product.images[0].url
          }
          alt="image"
          width={600}
          height={600}
          className="h-full w-full object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col p-12 gap-8 justify-center">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">{product.categories?.[0]?.name || "Organic"}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 leading-tight">{product.name}</h2>
          <div className="flex items-center gap-4">
            {product.sellingPrice && (
              <span className="text-3xl font-extrabold tracking-tighter text-primary">
                Rp{product.sellingPrice.toLocaleString("id-ID")}
              </span>
            )}
            {product.price && (
              <span className="text-xl text-gray-300 line-through font-medium">
                Rp{product.price.toLocaleString("id-ID")}
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-500 leading-relaxed text-lg font-medium border-l-4 border-primary/10 pl-6 italic">
          {product.description || "Fresh selection, carefully picked for your daily nutrition. Guaranteed quality from our farmers."}
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-8 bg-gray-50 w-fit p-2 px-6 rounded-full border border-gray-100">
            <button
              disabled={quantity === 1}
              onClick={() => setQuantity((prev) => prev - 1)}
              className="text-2xl font-bold hover:text-primary transition-colors disabled:opacity-30"
            >
              -
            </button>
            <h2 className="text-xl font-bold w-8 text-center">{quantity}</h2>
            <button 
              onClick={() => setQuantity((prev) => prev + 1)}
              className="text-2xl font-bold hover:text-primary transition-colors"
            >+</button>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-gray-400">
                <span>Total Amount</span>
                <span className="text-primary text-xl font-extrabold">Rp{(quantity * productTotalPrice).toLocaleString("id-ID")}</span>
             </div>
            <Button
              className="w-full h-16 rounded-full text-lg font-bold flex gap-4 bg-primary text-white hover:bg-green-700 transition-all shadow-xl shadow-green-900/10"
              onClick={() => addToCart()}
              disabled={loading || isDisabled}
            >
              <ShoppingBasket className="h-6 w-6" />
              {loading && !paymentToken ? (
                <LoaderCircle className="animate-spin h-6 w-6" />
              ) : (
                <span>{isDisabled ? "Pending Payment" : "Add To Cart"}</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemDetail;
