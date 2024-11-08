"use client";
import { useState } from "react";
import styles from "./order.module.scss";
import cn from "classnames/bind";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
// import Image from "next/image";

const cx = cn.bind(styles);

// 더미 데이터 (실제 데이터로 대체)
const orderItems = [
  {
    id: 1,
    name: "칠레산 생 블루베리 125g",
    // details: "칠레산 생 블루베리 2종 (택1)",
    quantity: 1,
    currentPrice: 6980,
    originalPrice: 9980,
  },
  {
    id: 2,
    name: "[Dole] 뉴질랜드 아보카도 1kg (4~7입)",
    quantity: 1,
    currentPrice: 10900, // 현재 가격
    originalPrice: 15900, // 원 가격
  },
  {
    id: 3,
    name: "베키아에누보 이탈리안 올리브 치아바타",
    quantity: 2,
    currentPrice: 108900, // 현재 가격
    originalPrice: 12300, // 원 가격
  },
];

export default function OrderPage() {
  const [isOpen, setIsOpen] = useState(false);

  // 아코디언 토글 함수
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cx("Wrapper")}>
      <div className={cx("Inner")}>
        <div className={cx("AppHeader")}>
          <h3>주문서</h3>
        </div>
        <div className={cx("Contents")}>
          <div className={cx("OrderItem")}>
            <div className={cx("OrderItemHeader")} onClick={toggleAccordion}>
              <span>주문상품</span>
              <span>{isOpen ? <LuChevronDown /> : <LuChevronUp />}</span>
            </div>
            {isOpen && (
              <div className={cx("OrderItemBody")}>
                {/* 주문 리스트 내용 */}
                {orderItems.map((item) => (
                  <div key={item.id} className={cx("OrderDetail")}>
                    <div className={cx("OrderImageContainer")}>
                      {/* <Image
                        src={item.image}
                        alt={item.name}
                        width={60} 
                        height={60} 
                        className={cx("OrderImage")}
                      /> */}
                    </div>
                    <div className={cx("OrderInfo")}>
                      <h4>{item.name}</h4>
                      {/* <p>{item.details}</p> */}
                      <div className={cx("PriceInfo")}>
                        <span className={cx("CurrentPrice")}>
                          {item.currentPrice.toLocaleString()} 원
                        </span>
                        <span className={cx("OriginalPrice")}>
                          {item.originalPrice.toLocaleString()} 원
                        </span>
                      </div>
                      <span>수량: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
