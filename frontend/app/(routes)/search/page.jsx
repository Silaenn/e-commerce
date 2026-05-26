import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import SearchContent from "./_components/SearchContent";

async function SearchPage({ searchParams }) {
  const query = searchParams.q;
  let productList = [];

  if (query) {
    productList = await GlobalApi.searchProducts(query);
  }

  return (
    <SearchContent 
      initialProductList={productList || []}
      query={query || ""}
    />
  );
}

export default SearchPage;
