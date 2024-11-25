import { fetchProductsByCategory } from '@/src/api/product.api';
import CategoriesView from '@/src/views/categories/categories.view';

interface CategoryPageProps {
    params: {
        slug: string[];
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = params;
    const category = slug[0];
    const subcategory = slug[1];

    if (!category || !subcategory) {
        return <div>Invalid category</div>;
    }

    try {
        const products = await fetchProductsByCategory(category, subcategory);
        console.log(products);
        return <CategoriesView category={category} subcategory={subcategory} products={products} />;
    } catch (error) {
        console.error('Error fetching category products:', error);
        return <div>Error occurred while fetching products</div>;
    }
}