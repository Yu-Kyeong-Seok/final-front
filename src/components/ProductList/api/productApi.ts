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
    detail: string;
    __v: number;
}

export interface TransformedProduct {
    id: string;
    name: string;
    price: number;
    salePrice: number;
}

export const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/products');
        const data = await response.json();
        const transformedData = data.map((item: Product): TransformedProduct => ({
            id: item._id,
            name: item.productName,
            price: item.price,
            salePrice: item.sales,
        }));
        return transformedData;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};