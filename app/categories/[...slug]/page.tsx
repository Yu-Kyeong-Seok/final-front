import { Metadata } from "next";
import CategoryMenu from "@/src/views/category/category.view";
import ProductItem from "@/src/components/ProductItem/ProductItem";
import { fetchProductsByCategory } from "@/src/api/product.api";


export const metadata: Metadata = {
    title: '카테고리',
    description: '카테고리 페이지',
};

interface CategoryPageProps {
    params: {
        slug: string[];
    };
}

export default async function CategoryProductPage({ params }: CategoryPageProps) {
    const [mainCategory, subCategory] = params.slug || [];
    const products = await fetchProductsByCategory(mainCategory, subCategory);

    const productsWithDefaultImage = products.map(product => ({
        ...product,
        img: product.img || 'assets/images/sample.jpg'  // product.img가 없으면 기본 이미지 사용
    }));
    
    return (
        <div>
            <CategoryMenu />
            <div className="list-wrap">
                {productsWithDefaultImage.map((product, index) => (
                    <ProductItem 
                        key={index}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}