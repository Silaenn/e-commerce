"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useContext, useEffect, useState } from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";
import { SearchContext } from "@/app/_context/SearchContext";
import { useRouter } from "next/navigation";

export async function generateStaticParams() {
  const categories = await GlobalApi.getCategoryList();

  return categories.map((category) => ({
    categoryName: category.attributes.name,
  }));
}

function ProductCategory({ params }) {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const { search } = useContext(SearchContext);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const button = true;
  const router = useRouter();

  useEffect(() => {
    GlobalApi.getCategoryList().then(setCategoryList);
  }, []);

  useEffect(() => {
    if (search) {
      // Jika ada pencarian, gunakan API pencarian
      GlobalApi.searchProducts(search).then(setProductList);
    } else {
      // Jika tidak ada pencarian, tampilkan produk berdasarkan kategori
      GlobalApi.getProductsByCategory(params.categoryName).then((res) => {
        setProductList(res);
      });

      GlobalApi.getCategoryList().then((res) => {
        const index = res.findIndex(
          (cat) => cat.attributes.name === params.categoryName
        );
        setCurrentCategoryIndex(index !== -1 ? index : 0);
        console.log(index);
      });
    }
  }, [search, params.categoryName]);

  const navigateCategory = (direction) => {
    let newIndex = currentCategoryIndex + direction;
    if (newIndex < 0) newIndex = categoryList.length - 1;
    if (newIndex >= categoryList.length) newIndex = 0;

    const newCategory = categoryList[newIndex].attributes.name;
    // Gunakan router untuk navigasi ke kategori baru
    router.push(`/products-category/${newCategory}`);
  };
  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {params.categoryName}
      </h2>

      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.categoryName}
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
