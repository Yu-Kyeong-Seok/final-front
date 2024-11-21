import CategoryMenu from "@/src/views/category/category";
import { fetchProducts } from "@/src/components/ProductList/api/productApi";

export default async function Category() {
    // 서버 사이드에서 데이터 페칭
    const products = await fetchProducts();

    return (
        <CategoryMenu/>
    )
}