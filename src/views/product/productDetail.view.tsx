"use client";
import { useEffect, useState } from "react";
import styles from "./productDetail.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";
import ModalYesorNoWrap from "@/src/components/Modal/ModalYesorNo";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

// type ProductDetailViewType = {
//     id: string;
//     password: string;
// };

type ProductDetailProps = {
    id?: string;
}

const ProductDetailView = (props : ProductDetailProps) => {
    
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

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
                // const res = await response.json();
                // console.log(response);
                requestAddCart();
            } else {
                throw new Error("구매하기 실패");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    }

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
        openYesorNoModal("장바구니로 이동하시겠습니까?", () => handleClick("/order/list"));
    };

    return ( 
        <>
            {productData ? (
                <div className={cx("product-container")}>
                    <img className={cx("product-image")} src={productData.img}></img>
                    {/* <h1>{productData._id}</h1> */}
                    <p className={cx("product-description")}>{productData.delivery}</p>
                    <h1 className={cx("product-title")}>[{productData.seller}]{productData.productName}</h1>
                    <p className={cx("product-description")}>{productData.description}</p>
                    <div className={cx("product-wapper")}>
                        {productData.sales < productData.price && (
                            <p className={cx("product-discount")}>
                            {" "}
                            {Math.round(
                                ((productData.price - productData.sales) / productData.price) * 100
                            )}
                            %
                        </p>
                        )}
                        <p className={cx("product-sales")}>{productData.sales}원</p>
                    </div>
                    <p className={cx("product-price")}>{productData.price}원</p>
                    <Button type="button" onClick={handlePay}><span>장바구니 담기</span></Button>
                </div>
            ) : (
                <div>제품 정보를 가져올 수 없습니다.</div>
            )}
            
            {/* 모달 */}
            <ModalYesorNoWrap 
                isOpen={isYesorNoModalOpen} 
                onClose={closeYesorNoModal} 
                onConfirm={onConfirmAction}
            >
                <p className={cx("ModalMessage")}>{yesorNoModalMessage}</p>
            </ModalYesorNoWrap>
            
        </>
    )
}

export default ProductDetailView;