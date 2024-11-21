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

export const fetchProducts = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/products');
        const data = await response.json();
        const transformedData = data.map((item: Product): TransformedProduct => ({
            ...item,
            id: item._id,
            name: item.productName,
            salePrice: item.sales,
        }));
        return transformedData;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};