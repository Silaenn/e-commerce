import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import CategoryContent from "../_components/CategoryContent";

async function ProductCategory({ params }) {
  const categoryName = params.categoryName;
  
  // Fetch data on the server
  const [categoryList, productList] = await Promise.all([
    GlobalApi.getCategoryList(),
    GlobalApi.getProductsByCategory(categoryName)
  ]);

  const decodedName = decodeURIComponent(categoryName);
  const index = categoryList.findIndex((cat) => cat.name === decodedName);
  const currentCategoryIndex = index !== -1 ? index : 0;

  return (
    <CategoryContent 
      initialProductList={productList || []}
      initialCategoryList={categoryList || []}
      initialCategoryIndex={currentCategoryIndex}
      categoryName={categoryName}
    />
  );
}

export default ProductCategory;
