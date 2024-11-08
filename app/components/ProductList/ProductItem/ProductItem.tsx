'use client'

import React from "react";
import styles from "./ProductItem.module.scss";
import cn from 'classnames/bind';
import { Product } from "../api/productApi";
import { MdOutlineShoppingBag } from "react-icons/md";

const cx = cn.bind(styles);

interface ProductItemProps {
    product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => (
    <div className={cx("product")}>
        <div className={cx("img")}>
            <img src="assets/images/sample.png" alt={product.name} />
            <button className={cx("cart")}><MdOutlineShoppingBag/></button>
        </div>
        <div className={cx("desc")}>
            <p className={cx("name")}>{product.name}</p>
            <div className={cx("total")}>
                <span className={cx("discount")}>{product.discount}%</span>
                <span className={cx("price")}>{product.price.toLocaleString()}원</span>
                <del className={cx("ogPrice")}>{product.originalPrice.toLocaleString()}원</del>
            </div>
        </div>
    </div>
);

export default ProductItem;