export interface Product {
    _id: string;
    productName: string;
    price: number;
    sales: number;
    rdate: string;
    thumbnail: string | null;
    img: string | null;
    delivery: string;
    seller: string;
    description: string | null;
    packageType: string | null;
    category:string;
    detail: string;
    __v: number;
}

export interface TransformedProduct extends Omit<Product, '_id' | 'productName' | 'sales'> {
    id: string;          // _id를 id로 변환
    name: string;        // productName을 name으로 변환
    salePrice: number;   // sales를 salePrice로 변환
}

export const fetchProductsByCategory = async (mainCategory: string, subCategory: string) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/products');
        const data = await response.json();
        
        // 카테고리로 필터링
        const filteredData = data.filter((item: Product) => {
            return item.category === `${mainCategory}/${subCategory}`;
        });

        const transformedData = filteredData.map((item: Product): TransformedProduct => ({
            ...item,
            id: item._id,
            name: item.productName,
            salePrice: item.sales,
        }));
        
        return transformedData;
    } catch (error) {
        console.error("Error fetching category products:", error);
        throw error;
    }
};