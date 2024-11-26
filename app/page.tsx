import HomeView from "@/src/views/home/home.view";
import { fetchProducts } from "@/src/api/product.api";


export default async function Home() {

  const products = await fetchProducts();
    
  const tabs = [
      "추천",
      "신상품",
      "베스트",
      "알뜰쇼핑",
      "특가/혜택",
  ];

  return (
    <HomeView tabs={tabs} products={products}/>
  );
}
