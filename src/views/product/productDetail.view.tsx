"use client";
import { useEffect, useState } from "react";
import styles from "./productDetail.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";

const cx = cn.bind(styles);

// type ProductDetailViewType = {
//     id: string;
//     password: string;
// };

type ProductDetailProps = {
    id?: string;
}

const ProductDetailView = (props : ProductDetailProps) => {
    
    const [loading, setLoading] = useState<boolean>(true);
    const [productData, setProductData] = useState<any>(null);
    const productId = props.id;
    // const productId = "673d8339f40719294a4fb07e";

    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            // const accessToken = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${accessToken}`,
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

    useEffect(() => {
        fetchUserInfo(); // 컴포넌트가 마운트될 때 사용자 정보 가져오기
    }, []);

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
                    product: productData._id,
                    quantity: "1",
                    totalPrice: productData.price,
                    cartId: cartId,
                }),
            });

            if (response.ok) {
                const res = await response.json();
                
                setProductData(res); 

                console.log(res);
            } else {
                throw new Error("구매하기 실패");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    }

    return ( 
        <>
            {productData ? (
                <div className={cx("product-detail")}>
                    <h1>{productData._id}</h1>
                    <h1>{productData.productName}</h1>
                    <p>{productData.description}</p>
                    <p>가격: {productData.price}원</p>
                    <p>sales: {productData.sales}원</p>
                    <img src={productData.img}></img>
                </div>
            ) : (
                <div>제품 정보를 가져올 수 없습니다.</div>
            )}

            <Button type="button" onClick={handlePay}><span>구매하기</span></Button>
        </>
    )
}

export default ProductDetailView;