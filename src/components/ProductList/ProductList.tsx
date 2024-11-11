'use client'

import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import cn from 'classnames/bind';
import { fetchProducts, Product } from "./api/productApi";
import ProductItem from "./ProductItem/ProductItem";

const cx = cn.bind(styles);

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        getProducts();
    }, []);

    if (isLoading) {
        return <div className={cx("loading")}>Loading...</div>;
    }

    if (error) {
        return <div className={cx("error")}>{error}</div>;
    }

    if (!products.length) {
        return <div className={cx("no-products")}>상품이 없습니다.</div>;
    }

    return (
        <div className={cx("product-box")}>
            {products.map((product, index) => (
                <ProductItem key={`${product.name}-${index}`} product={product} />
            ))}
        </div>
    );
};

export default ProductList;