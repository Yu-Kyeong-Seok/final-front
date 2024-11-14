import path from 'path';
import { promises as fs } from 'fs';

export interface Product {
    id: number;
    name: string;
    originalPrice: number;
    price: number;
    discount: number;
}

export const fetchProducts = async () => {
    try {
        // public 폴더의 파일 직접 읽기
        const filePath = path.join(process.cwd(), 'public/assets/dummy/product-item.json');
        const jsonData = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(jsonData);
        return data.results;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};