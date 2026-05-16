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
    <div className="p-5 md:p-16 px-16 ">
      {/* Slider */}
      <Slider sliderList={sliderList} />
      {/* Daftar Kategori */}
      <CategoryList categoryList={categoryList} />
      {/* Daftar Produk */}
      <ProductList productList={productList} search={search} />
      {/* Banner */}
      <Image
        src="/banner.png"
        width={1000}
        height={300}
        className="w-full h-[400px] object-contain"
        alt="banner"
      />
      {/* Footer */}
      <Footer />
    </div>
  );
}
