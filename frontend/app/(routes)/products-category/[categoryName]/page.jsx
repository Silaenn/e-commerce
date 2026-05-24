"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useContext, useEffect, useState } from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";
import { SearchContext } from "@/app/_context/SearchContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function ProductCategory({ params }) {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const button = true;
  const router = useRouter();

  useEffect(() => {
    GlobalApi.getCategoryList().then((res) => {
      setCategoryList(res);
      const decodedName = decodeURIComponent(params.categoryName);
      const index = res.findIndex((cat) => cat.name === decodedName);
      setCurrentCategoryIndex(index !== -1 ? index : 0);
    });
  }, [params.categoryName]);

  useEffect(() => {
    // Halaman kategori sekarang murni mengambil berdasarkan kategori
    GlobalApi.getProductsByCategory(params.categoryName).then((res) => {
      setProductList(res);
    });
  }, [params.categoryName]);

  const navigateCategory = (direction) => {
    let newIndex = currentCategoryIndex + direction;
    if (newIndex < 0) newIndex = categoryList.length - 1;
    if (newIndex >= categoryList.length) newIndex = 0;

    const newCategory = categoryList[newIndex].name;
    // Gunakan router untuk navigasi ke kategori baru
    router.push(`/products-category/${newCategory}`);
  };

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="bg-green-50/30 py-10 sm:py-16 px-5 sm:px-8 md:px-12 w-full border-b border-green-100/50">
         <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 sm:space-y-3 text-center sm:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="h-0.5 w-8 bg-primary/60" />
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                Category
              </span>
            </div>
             <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-gray-900">
              {decodeURIComponent(params.categoryName)}
            </h2>
          </motion.div>

          <Link href={"/"}>
            <motion.button 
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-white border border-green-100 rounded-full text-primary font-black shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all text-xs sm:text-sm uppercase tracking-widest"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              Back to Home
            </motion.button>
          </Link>
        </div>
      </div>

      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={decodeURIComponent(params.categoryName)}
      />

      <ProductList
        productList={productList}
        button={button}
        navigateCategory={navigateCategory}
      />
      
      <div className="pb-20" />
    </div>
  );
}

export default ProductCategory;
