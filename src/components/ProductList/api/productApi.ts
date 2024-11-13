export interface Product {
    id:number;
    name: string;
    originalPrice: number;
    price: number;
    discount: number;
}

export const fetchProducts = async () => {
    try {
        const response = await fetch("/assets/dummy/product-item.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};