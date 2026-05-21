"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useContext, useEffect, useState } from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";
import { SearchContext } from "@/app/_context/SearchContext";
import { useRouter } from "next/navigation";

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
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {decodeURIComponent(params.categoryName)}
      </h2>

      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={decodeURIComponent(params.categoryName)}
      />

      <div className="p-5 md:p-10">
        <ProductList
          productList={productList}
          button={button}
          navigateCategory={navigateCategory}
        />
      </div>
    </div>
  );
}

export default ProductCategory;
