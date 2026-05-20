"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "./Slider";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import Image from "next/image";
import Footer from "./Footer";
import { SearchContext } from "../_context/SearchContext";

export default function HomeContent({ sliderList, categoryList, productList }) {
  const router = useRouter();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  const jwt =
    typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;

  useEffect(() => {
    if (!user && !jwt) {
      router.push("/sign-in");
    }
  }, [user, jwt, router]);

  const { search } = useContext(SearchContext);
  console.log(search);

  return (
    <div className="bg-background min-h-screen">
      <div className="space-y-24 pb-20">
        {/* Slider */}
        <Slider sliderList={sliderList} />
        
        {/* Daftar Kategori */}
        <CategoryList categoryList={categoryList} />
        
        {/* Daftar Produk */}
        <ProductList productList={productList} search={search} />
        
        {/* Promo Banner Section */}
        <div className="px-6 md:px-12 lg:px-24">
          <div className="relative overflow-hidden rounded-[3rem] bg-accent/10 p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 group">
            <div className="space-y-8 z-10 text-center md:text-left">
              <span className="bg-accent text-white px-6 py-2 rounded-full text-xs font-bold tracking-[0.3em] uppercase shadow-lg shadow-accent/20">Special Offer</span>
              <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-primary max-w-lg leading-[0.9]">Healthy Living <br/> Starts Here.</h2>
              <p className="text-gray-600 text-xl max-w-sm font-medium leading-relaxed">Get up to 30% off on your first organic basket purchase. Sustainable quality, delivered.</p>
              <button className="bg-primary text-background px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20">
                Claim Offer
              </button>
            </div>
            <Image
              src="/banner.png"
              width={600}
              height={600}
              className="w-full md:w-1/2 h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
              alt="banner"
            />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
