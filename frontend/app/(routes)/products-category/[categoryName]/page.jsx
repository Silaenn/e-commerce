"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useContext, useEffect, useState } from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";
import { SearchContext } from "@/app/_context/SearchContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function ProductCategory({ params }) {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const { search } = useContext(SearchContext);
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
    if (search) {
      // Jika ada pencarian, gunakan API pencarian
      GlobalApi.searchProducts(search).then(setProductList);
    } else {
      // Jika tidak ada pencarian, tampilkan produk berdasarkan kategori
      GlobalApi.getProductsByCategory(params.categoryName).then((res) => {
        setProductList(res);
      });
    }
  }, [search, params.categoryName]);

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
      <div className="bg-green-50/30 py-16 px-6 md:px-12 lg:px-12 w-full border-b border-green-100/50">
        <div className="max-w-[1800px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-8 bg-primary/60" />
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                Category
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900">
              {decodeURIComponent(params.categoryName)}
            </h2>
          </motion.div>
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
