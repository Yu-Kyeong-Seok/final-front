'use client'

import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import cn from 'classnames/bind';

const cx = cn.bind(styles);

interface Product {
    name: string;
    originalPrice: number;
    price: number;
    discount: number;
}

const ProductItem = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // public 폴더 내의 JSON 파일 경로로 수정합니다.
                const response = await fetch("/assets/dummy/product-item.json");
                const data = await response.json();
                setProducts(data.results);
                console.log("Fetched data:", data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className={cx("product-box")}>
            {Array.from({ length: 8 }).map((_, index) => {
                const product = products[index % products.length]; // 반복적으로 데이터를 사용
                return (
                    <div key={index} className={cx("product")}>
                        <div className={cx("product-img")}>
                            <img src="" alt={product.name} />
                            <button className={cx("cart")}></button>
                        </div>
                        <p>{product.name}</p>
                        <div>
                            <span>{product.discount}%</span>
                            <span>{product.price}원</span>
                            <del>{product.originalPrice}원</del>
                        </div>
                        <div>
                            <button>상세보기</button>
                            <button>구매하기</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProductItem;