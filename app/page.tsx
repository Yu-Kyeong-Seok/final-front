'use client'

import React, { useEffect, useState } from "react";
import styles from './page.module.css';
import cn from 'classnames/bind';
import { fetchProducts, Product } from "@/src/components/ProductList/api/productApi";
import ProductItem from "@/src/components/ProductList/ProductItem/ProductItem";
import Link from "next/link";
import TopTabList from "@/src/components/TopTab/TopTabList";

const cx = cn.bind(styles);


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tabs = [
    "추천",
    "베스트",
    "컬리세일",
    "신상품",
    // "알뜰쇼핑",
    // "특가/혜택",
    // "특가/혜택2",
    // "특가/혜택3",
    // "특가/혜택4",
    // "특가/혜택5",
    // "특가/혜택6",
    // "특가/혜택7",
    // "특가/혜택8",
    // "특가/혜택9",
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

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

  return (
    <div>
      <TopTabList tabs={tabs} selectedTab={selectedTab} onTabClick={handleTabChange}/>
      <div className={cx("sec")}>
        <div className={cx("sale-list")}>
          <div className={cx("sale-header")}>
            <h2 className={cx("tit")}>마감세일</h2>
            <Link href="/sale" className={cx("all")}>전체보기</Link>
          </div>
          <div className={cx("list-wrap")}>
          {products.map((product, index) => {
            return(
                <div className={cx("list-item")}>
                  <ProductItem key={`${product.name}-${index}`} product={product}/>
                </div>
            )
          })}
          </div>
        </div>
      </div>

      <div className={cx("sec")}>
        <div className={cx("sale-list")}>
          <div className={cx("sale-header")}>
            <h2 className={cx("tit")}>고객 반응으로 입증된 신상품</h2>
            <Link href="/sale" className={cx("all")}>전체보기</Link>
          </div>
          <div className={cx("list-wrap")}>
          {products.map((product, index) => {
            return(
                <div className={cx("list-item")}>
                  <ProductItem key={`${product.name}-${index}`} product={product}/>
                </div>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
