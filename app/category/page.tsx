import CategoryMenu from "@/src/views/category/category.view";
import { fetchProductsByCategory } from "@/src/api/product.api";

export default async function Category() {
    // 서버 사이드에서 데이터 페칭
    const products = await fetchProductsByCategory();

    return (
        <CategoryMenu/>
    )
}