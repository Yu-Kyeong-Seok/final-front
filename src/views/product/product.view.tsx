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

    const productsWithDefaultImage = products.map(product => ({
        ...product,
        img: product.img || 'assets/images/sample.jpg'  // product.img가 없으면 기본 이미지 사용
    }));

    return (
        <div className={cx("product-list")}>
            <div className={cx("list-wrap")}>
                {productsWithDefaultImage.map((product, index) => (
                    <ProductItem 
                        key={index}
                        product={product}
                    />
                ))}
            </div>
            <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet} title="필터">

            </BottomSheet>
        </div>
    )
}