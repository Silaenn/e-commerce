"use client";

import { useState, useEffect } from "react";
import GlobalApi from "./_utils/GlobalApi";
import HomeContent from "./_components/HomeContent";

export default function Home() {
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      const sliders = await GlobalApi.getSliders();
      const categories = await GlobalApi.getCategoryList();
      const products = await GlobalApi.getAllProducts();

      setSliderList(sliders);
      setCategoryList(categories);
      setProductList(products);
    };

    fetchData();

    // Set up Midtrans script
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;
    const script = document.createElement("script");

    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <HomeContent
      sliderList={sliderList}
      categoryList={categoryList}
      productList={productList}
    />
  );
}
