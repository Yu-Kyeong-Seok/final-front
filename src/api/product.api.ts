export interface Product {
    _id: string;
    productName: string;
    price: number;
    sales: number;
    rdate: string;
    thumbnail: string | null;
    img: string | null;
    delivery?: string;
    seller: string;
    description: string | null;
    packageType: string | null;
    category:string;
    subCategory:string;
    detail: string;
    __v: number;
}

export interface TransformedProduct extends Omit<Product, '_id' | 'productName' | 'sales'> {
    id: string;          // _id를 id로 변환
    name: string;        // productName을 name으로 변환
    salePrice: number;   // sales를 salePrice로 변환
}

// 전체 상품 조회 함수 추가
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
        throw(error)
    }
}

// 카테고리별 상품 조회 함수
export const fetchProductsByCategory = async (mainCategory: string, subCategory: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/categories?category=${mainCategory}&subCategory=${subCategory}`);
        const data = await response.json();

        if (!data.results || !Array.isArray(data.results)) {
            console.error("Unexpected data format:", data);
            throw new Error("Invalid data format");
        }

        const transformedData = data.results.map((item: Product): TransformedProduct => ({
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

export const searchProducts=async (keyword:string)=>{
    try{  
           const encodedKeyword = encodeURIComponent(keyword);
           const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/products/search?keyword=${encodedKeyword}`);
    
           if (!response.ok) {
               const errorText = await response.text();
               console.error('에러 응답:', errorText);
               throw new Error(`API 요청 실패: ${response.status}`);
           }
   
           const data = await response.json();
           const transformedData = data.map((item: Product): TransformedProduct => ({
               ...item,
               id: item._id,
               name: item.productName,
               salePrice: item.sales,
           }));
          // console.log('제품,,',transformedData)
           return transformedData;
       } catch (error) {
           console.error("제품 검색 실패:", error);
           throw error;
       }
   
}