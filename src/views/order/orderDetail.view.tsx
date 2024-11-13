"use client";
// import { useState } from "react";

import styles from "./orderDetail.module.scss";
import cn from "classnames/bind";
// import { LuChevronDown, LuChevronUp, LuCheckCircle } from "react-icons/lu";
import Image from "next/image";
import Button from "@/src/components/Button/Button";

// import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

/** 주문 아이템 */
type OrderItem = {
  /** 아이템 id */
  id: number;
  /** 아이템 이름 */
  name: string;
  /** 수량 */
  quantity: number;
  /** 현재가격 */
  currentPrice: number;
  /** 원가격 */
  originalPrice: number;
  /** 이미지 */
  image: string;
};

type OrderViewProps = {
  orderItems: OrderItem[];

  /** 주문번호 */
  orderNumber: string;
  /** 주문상태 */
  orderStatus: "주문완료" | "배송중" | "배송완료";
};

export default function OrderDetailView(props: OrderViewProps) {
  const { orderItems, orderNumber, orderStatus } = props;

  /** 현재금액 * 수량 */
  const totalAmount = orderItems.reduce((sum, item) => {
    return sum + item.currentPrice * item.quantity;
  }, 0);

  /** 배송비 계산 */
  const deliveryFee = totalAmount >= 40000 ? 0 : 3000;

  /** 결제 예정 금액 */
  const totalPayment = totalAmount + deliveryFee;

  /** 버튼 클릭 시 페이지 이동 */
  // const router = useRouter();
  // const handleClick = (path: string) => {
  //   router.push(path);
  // };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("Inner")}>
        <div className={cx("Contents")}>
          {/* 주문상품 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <h3 className={cx("ItemTitle")}>주문 내역 상세</h3>
            </div>

            <span>주문번호 {orderNumber}</span>

            <div className={cx("ItemContent")}>
              {orderItems.map((item) => (
                <div key={item.id} className={cx("ItemDetail")}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={70}
                    height={70}
                  />
                  <div className={cx("OrderInfo")}>
                    {/* 상품 이름 */}
                    <h4 className={cx("InfoTitle")}>{item.name}</h4>
                    <div className={cx("ItemInfo")}>
                      <span className={cx("ItemInfoDetail")}>
                        {/* 결제 가격 */}
                        {item.currentPrice.toLocaleString()}원
                      </span>
                      <span className={cx("ItemInfoDetail")}>
                        {/* 원래 가격 */}
                        {item.originalPrice.toLocaleString()}원
                      </span>
                      {/* 수량 */}
                      <span>{item.quantity}개</span>
                    </div>
                  </div>
                  {/* 주문완료 & 장바구니 버튼 */}
                  <div className={cx("StatusInfo")}>
                    <span>{orderStatus}</span>
                    <Button
                      text={"장바구니"}
                      disabled={false}
                      variants={"outline"}
                    />
                  </div>
                </div>
              ))}

              {/* 주문취소 & 다시담기 버튼*/}
              <div className={cx("OrderCancel")}>
                <Button
                  text={"주문취소"}
                  disabled={false}
                  variants={"outline"}
                  className={cx("CancelButton")}
                />
                <Button
                  text={"전체 상품 다시 담기"}
                  disabled={false}
                  variants={"outline"}
                  className={cx("CancelButton")}
                />
              </div>
            </div>
          </div>

          {/* 주문자 정보  */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <h3 className={cx("ItemTitle")}>배송조회</h3>
            </div>

            <div className={cx("ItemContent", "DeliveryContent")}>
              <span>
                {orderItems.length === 1
                  ? orderItems[0].name
                  : `${orderItems[0].name} 외 ${orderItems.length - 1}건...`}
              </span>
              <span className={cx("DeliveryInfo")}>배송조회</span>
            </div>
          </div>

          {/* 결제 정보 */}
          <div className={cx("Item", "PaymentItem")}>
            <div className={cx("ItemHeader")}>
              <h3 className={cx("ItemTitle")}>결제정보</h3>
            </div>
            <div className={cx("ItemContent")}>
              <div className={cx("ItemHeader")}>
                <span className={cx("ItemTitle")}>상품 금액</span>
                <span className={cx("ItemTitle")}>
                  {totalPayment.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
