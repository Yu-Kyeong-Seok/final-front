'use client'
import React, { useState } from "react";
import styles from './product.module.scss';
import cn from 'classnames/bind';
import { TransformedProduct } from "@/src/components/ProductList/api/productApi";
import ProductItem from '@/src/components/ProductList/ProductItem/ProductItem';
import TopTabList from '@/src/components/TopTab/TopTabList';
import Chips from "@/src/components/Chips/Chips";
import BottomSheet from "@/src/components/BottomSheet/BottomSheet";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

type ProductListProps = {
    tabs:string[];
    products:TransformedProduct[];
    labels:string[];
}

export default function ProductList(props:ProductListProps) {
    const {tabs, products, labels} = props;
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    /** 바텀시트 핸들러 */
    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };

    /** 버튼 클릭 시 페이지 이동 */
    const router = useRouter();
    const handleClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className={cx("product-list")}>
            <TopTabList tabs={tabs} selectedTab={selectedTab} onTabClick={handleTabChange}/>
            <Chips labels={labels} onClick={handleOpenBottomSheet} className={cx()}/>
            <div className={cx("list-wrap")}>
                {products.map((product, index) => {
                    return(
                        <div key={product.id || `${product.name}-${index}`} className={cx("list-item")}>
                            <ProductItem product={product}/>
                        </div>
                    )
                })}
            </div>
            <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet} title="필터">

            </BottomSheet>
        </div>
    )
}