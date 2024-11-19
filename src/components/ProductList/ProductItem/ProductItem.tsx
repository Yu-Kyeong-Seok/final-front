'use client'

import React from "react";
import Link from 'next/link';
import styles from "./ProductItem.module.scss";
import cn from 'classnames/bind';
import { TransformedProduct } from "../api/productApi";
import { MdOutlineShoppingBag } from "react-icons/md";

const cx = cn.bind(styles);

interface ProductItemProps {
    product: TransformedProduct;
}

const ProductItem = ({ product }: ProductItemProps) => (
    <div className={cx("product")}>
        <Link href={`/products/${product.id}`} className={cx("productLink")}>
            <div className={cx("img")}>
                <img src="assets/images/sample.png" alt={product.name} />
                {/* cart 버튼은 Link 밖으로 빼서 독립적으로 클릭 가능하게 함 */}
                <button 
                    className={cx("cart")} 
                    onClick={(e) => {
                        e.preventDefault(); // 링크 이동 방지
                        // 장바구니 추가 로직
                    }}
                >
                    <MdOutlineShoppingBag/>
                </button>
            </div>
            <div className={cx("desc")}>
                <p className={cx("name")}>{product.name}</p>
                <div className={cx("total")}>
                    <span className={cx("discount")}>{parseFloat(((product.price - product.salePrice) / product.price * 100).toFixed(1))}% </span>
                    <span className={cx("price")}>{product.salePrice.toLocaleString()}원</span>
                    <del className={cx("ogPrice")}>{product.price.toLocaleString()}원</del>
                </div>
            </div>
        </Link>
    </div>
);

export default ProductItem;