'use client'

import React from "react";
import Link from 'next/link';
import styles from "./ProductItem.module.scss";
import cn from 'classnames/bind';
import { TransformedProduct } from "@/src/api/product.api";
import { MdOutlineShoppingBag } from "react-icons/md";
import Image from 'next/image';

const cx = cn.bind(styles);

interface ProductItemProps {
    product: TransformedProduct;
}

const ProductItem = ({ product }: ProductItemProps) => (
    <div className={cx("product")}>
        <Link href={`/products/${product.id}`} className={cx("productLink")}>
            <div className={cx("img")}>
                {product.img ? (
                    <img 
                        src={product.img} 
                        alt={product.name}
                    />
                ) : (
                    // 이미지가 없을 경우 기본 이미지나 플레이스홀더 표시
                    <div className={cx("noImage")}>상품 이미지 없음</div>
                )}
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