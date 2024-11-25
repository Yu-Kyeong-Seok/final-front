'use client'

import React, { useState, useEffect} from "react";
import Link from 'next/link';
import styles from "./ProductItem.module.scss";
import cn from 'classnames/bind';
import { TransformedProduct } from "@/src/api/product.api";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import ModalYesorNoWrap from "@/src/components/Modal/ModalYesorNo";

const cx = cn.bind(styles);

interface ProductItemProps {
    id?:string;
    product: TransformedProduct;
}

const ProductItem = (props: ProductItemProps) => {
    const {id, product} = props;
    const router = useRouter();
    const handleClick = (path: string) => {
        router.push(path);
    };
    
    const [loading, setLoading] = useState<boolean>(true);
    const [productData, setProductData] = useState<any>(null);
    const productId = props.id;

    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            const accessToken = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const res = await response.json();
                
                setProductData(res); // 가져온 데이터를 상태에 저장

                console.log(res);

            } else {
                throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    const handlePay = async () => {
        try {
            const accessToken = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];
        
            const cartId = document.cookie.split("; ").find((cookie) => cookie.startsWith("cartId="))?.split("=")[1];
        
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cartItems/`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                product: product.id,
                quantity: "1",
                totalPrice: product.price,
                cartId: cartId,
                }),
            });
        
            if (response.ok) {
                requestAddCart();
            } else {
                throw new Error("구매하기 실패");
            }
            } catch (err) {
            console.log(err);
            } finally {
            setLoading(false);
            }
        };

    /** 모달 */
    const [isYesorNoModalOpen, setIsYesorNoModalOpen] = useState(false);
    const [yesorNoModalMessage, setYesorNoModalMessage] = useState<string | null>(null);
    const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);

    const openYesorNoModal = (message: string, confirmAction: () => void) => {
        setYesorNoModalMessage(message);
        setOnConfirmAction(() => confirmAction); // 모달의 "확인" 버튼 동작 설정
        setIsYesorNoModalOpen(true);
    };

    const closeYesorNoModal = () => {
        setYesorNoModalMessage(null);
        setOnConfirmAction(null);
        setIsYesorNoModalOpen(false);
    };

    /** 모달로 로그아웃 요청 */
    const requestAddCart = () => {
        openYesorNoModal("장바구니로 이동하시겠습니까?", () => handleClick("/cart"));
    };

    return (
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
            <button className={cx("cart")} onClick={handlePay}>
                <MdOutlineShoppingBag/>
            </button>
            {/* 모달 */}
            <ModalYesorNoWrap 
                isOpen={isYesorNoModalOpen} 
                onClose={closeYesorNoModal} 
                onConfirm={onConfirmAction}
            >
                <p className={cx("ModalMessage")}>{yesorNoModalMessage}</p>
            </ModalYesorNoWrap>
        </div>
    )
};

export default ProductItem;