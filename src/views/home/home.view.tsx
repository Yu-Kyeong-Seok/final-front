'use client'

import React, { useState } from "react";
import styles from './home.view.module.scss';
import cn from 'classnames/bind';
import { TransformedProduct } from "@/src/components/ProductList/api/productApi";
import ProductItem from "@/src/components/ProductList/ProductItem/ProductItem";
import CountdownTimer from "@/src/components/Countdown/Countdown";
import Link from "next/link";
import TopTabList from "@/src/components/TopTab/TopTabList";
import SwiperContainer from "@/src/components/Swiper/Swiper";
import { MdOutlineKeyboardArrowRight, MdOutlineAccessTimeFilled } from "react-icons/md";

const cx = cn.bind(styles);

type HomeProps = {
    tabs:string[];
    products:TransformedProduct[];
}


export default function HomeView(props:HomeProps) {
    const {tabs, products} = props;
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const productDefaultImage = products.map((product) => ({
        ...product,
        img:product.img || 'assets/images/sample.jpg'
    }));

    return (
        <div>
            <TopTabList tabs={tabs} selectedTab={selectedTab} onTabClick={handleTabChange}/>
            <SwiperContainer/>
            <div className={cx("sec","special-deal")}>
                <div className={cx("sec-header")}>
                    <h2 className={cx("tit")}>마감세일</h2>
                    <Link href="/sale" className={cx("all")}>
                        <span>전체보기</span>
                        <MdOutlineKeyboardArrowRight />
                    </Link>
                </div>
                <div className={cx("list-wrap")}>
                {productDefaultImage.slice(0, 8).map((product, index) => {
                    return(
                        <div key={product.id || `${product.name}-${index}`} className={cx("list-item")}>
                            <ProductItem product={product}/>
                        </div>
                        )
                    })}
                </div>
            </div>

            <div className={cx("sec","weekend-sale")}>
                <div className={cx("sec-header")}>
                    <h2 className={cx("tit")}>주말 특가</h2>
                </div>
                <p className={cx("desc")}>48시간 한정 특가!</p>
                <div className={cx("countdown")}>
                    <MdOutlineAccessTimeFilled className={cx("timer-icon")}/>
                    <CountdownTimer className={cx("timer-text")}/>
                </div>
                <div className={cx("list-wrap")}>
                {productDefaultImage.slice(0,3).map((product, index) => {
                    return(
                        <div key={product.id || `${product.name}-${index}`} className={cx("list-item")}>
                        <ProductItem product={product}/>
                        </div>
                    )
                })}
                </div>
            </div>

            <div className={cx("sec","new-products")}>
                <div className={cx("sec-header")}>
                    <h2 className={cx("tit")}>고객 반응으로 입증된 신상품</h2>
                    <Link href="/sale" className={cx("all")}>
                        <span>전체보기</span>
                        <MdOutlineKeyboardArrowRight />
                    </Link>
                </div>
                <div className={cx("list-wrap")}>
                {productDefaultImage.slice(0, 8).map((product, index) => {
                    return(
                        <div key={product.id || `${product.name}-${index}`} className={cx("list-item")}>
                        <ProductItem product={product}/>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>  
    );
}
