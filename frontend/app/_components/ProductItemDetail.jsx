"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, LoaderIcon, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import { motion } from "framer-motion";

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

  const addToCart = async () => {
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    } else if (paymentToken) {
      toast.error("Payment is still pending. Please complete the payment.");
      setIsDisabled(true);
    } else {
      setLoading(true);

      try {
        // 1. Ambil data cart terbaru untuk mengecek apakah item sudah ada
        const cartItems = await GlobalApi.getCartItems(user.id, jwt);
        
        // 2. Cari apakah produk ini sudah ada di cart
        // Perlu dicek item.product (ID produk) atau item.name jika ID tidak tersedia
        const existingItem = cartItems.find(
          (item) => item.product === product.id
        );

        if (existingItem) {
          // 3. Jika ADA, update quantity dan amount
          const newQuantity = existingItem.quantity + quantity;
          const updateData = {
            data: {
              quantity: newQuantity,
              amount: newQuantity * productTotalPrice,
            },
          };

          await GlobalApi.updateCartQuantity(existingItem.id, updateData, jwt);
          toast.success("Cart updated successfully!");
        } else {
          // 4. Jika TIDAK ADA, buat baru
          const data = {
            data: {
              quantity: quantity,
              amount: quantity * productTotalPrice,
              products: [product.id],
              userId: user.id.toString(),
            },
          };
          await GlobalApi.addToCart(data, jwt);
          toast.success("Added to cart successfully!");
        }

        setUpdateCart(!updateCart);
      } catch (e) {
        console.error("DEBUG: Add/Update Cart Error:", e.response?.data || e.message);
        toast.error(e?.response?.data?.error?.message || "Error while adding into cart");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white text-gray-900 h-full md:h-auto max-h-[90vh] overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 p-12 flex items-center justify-center"
      >
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
      </motion.div>
      <div className="flex flex-col p-12 gap-8 justify-center">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary/60">
              {product.categories?.[0]?.name || "Organic Fresh"}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 leading-[0.9]">{product.name}</h2>
          <div className="flex items-center gap-4 pt-2">
            {product.sellingPrice && (
              <span className="text-4xl font-extrabold tracking-tighter text-primary">
                Rp{product.sellingPrice.toLocaleString("id-ID")}
              </span>
            )}
            {product.price && (
              <span className="text-xl text-gray-300 line-through font-medium">
                Rp{product.price.toLocaleString("id-ID")}
              </span>
            )}
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 leading-relaxed text-lg font-medium border-l-4 border-primary/20 pl-6 italic bg-green-50/30 py-4 rounded-r-2xl"
        >
          {product.description || "Fresh selection, carefully picked for your daily nutrition. Guaranteed quality from our farmers."}
        </motion.p>

        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-8 bg-gray-50 w-fit p-3 px-8 rounded-full border border-green-100 shadow-sm"
          >
            <button
              disabled={quantity === 1}
              onClick={() => setQuantity((prev) => prev - 1)}
              className="text-2xl font-bold text-gray-400 hover:text-primary transition-all disabled:opacity-20 active:scale-75"
            >
              -
            </button>
            <h2 className="text-2xl font-black w-10 text-center text-gray-900">{quantity}</h2>
            <button 
              onClick={() => setQuantity((prev) => prev + 1)}
              className="text-2xl font-bold text-gray-400 hover:text-primary transition-all active:scale-75"
            >+</button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
             <div className="flex justify-between items-center text-sm font-bold uppercase tracking-[0.2em] text-gray-400 px-2">
                <span>Subtotal</span>
                <span className="text-primary text-3xl font-black tracking-tighter">Rp{(quantity * productTotalPrice).toLocaleString("id-ID")}</span>
             </div>
            <Button
              className="w-full h-20 rounded-full text-xl font-bold flex gap-4 bg-primary text-white hover:bg-green-700 transition-all shadow-2xl shadow-green-900/20 active:scale-[0.98]"
              onClick={() => addToCart()}
              disabled={loading || isDisabled}
            >
              <ShoppingBasket className="h-7 w-7" />
              {loading && !paymentToken ? (
                <LoaderCircle className="animate-spin h-7 w-7" />
              ) : (
                <span>{isDisabled ? "Payment Pending" : "Add To Cart"}</span>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemDetail;
