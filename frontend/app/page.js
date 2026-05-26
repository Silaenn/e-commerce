import GlobalApi from "./_utils/GlobalApi";
import HomeContent from "./_components/HomeContent";

export default async function Home() {
  // Fetch data on the server in parallel
  const [sliderList, categoryList, productList] = await Promise.all([
    GlobalApi.getSliders(),
    GlobalApi.getCategoryList(),
    GlobalApi.getLatestProducts(),
  ]);

  return (
    <HomeContent
      sliderList={sliderList || []}
      categoryList={categoryList || []}
      productList={productList || []}
    />
  );
}
