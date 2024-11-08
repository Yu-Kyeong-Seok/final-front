"use client";
import { useState } from "react";
import styles from "./order.module.scss";
import cn from "classnames/bind";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import Image from "next/image";

const cx = cn.bind(styles);

const orderItems = [
  {
    id: 1,
    name: "칠레산 생 블루베리 125g",
    quantity: 1,
    currentPrice: 6980,
    originalPrice: 9980,
    image:
      "https://img-cf.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/shop/data/goods/1637923286553l0.jpeg",
  },
  {
    id: 2,
    name: "[Dole] 뉴질랜드 아보카도 1kg (4~7입)",
    quantity: 1,
    currentPrice: 10900,
    originalPrice: 15900,
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/1cef6b73-3e91-4a7a-8024-58b5d8cf5010.jpg",
  },
  {
    id: 3,
    name: "베키아에누보 이탈리안 올리브 치아바타",
    quantity: 2,
    currentPrice: 108900,
    originalPrice: 12300,
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/e971445b-df76-482b-9502-88a64f62041f.jpg",
  },
];

const userInfos = [
  {
    id: "random1",
    name: "황다영",
    phone: "010-0000-0000",
    email: "1234@gmail.com",
  },
];

export default function OrderPage() {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const toggleOrderAccordion = () => {
    setIsOrderOpen(!isOrderOpen);
  };

  const toggleUserAccordion = () => {
    setIsUserOpen(!isUserOpen);
  };

  return (
    <div className={cx("Wrapper")}>
      <div className={cx("Inner")}>
        <div className={cx("AppHeader")}>
          <h3>주문서</h3>
        </div>
        <div className={cx("Contents")}>
          {/* 주문상품 아코디언 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")} onClick={toggleOrderAccordion}>
              <span className={cx("ItemTitle")}>주문상품</span>
              <span>{isOrderOpen ? <LuChevronUp /> : <LuChevronDown />}</span>
            </div>
            {isOrderOpen && (
              <div className={cx("ItemContent", { open: isOrderOpen })}>
                {orderItems.map((item) => (
                  <div key={item.id} className={cx("ItemDetail")}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={70}
                      height={70}
                      className={cx("ProductImage")}
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
                      </div>
                      {/* 수량 */}
                      <span>수량: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 주문자 정보 아코디언 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")} onClick={toggleUserAccordion}>
              <span className={cx("ItemTitle")}>주문자 정보</span>
              <span>{isUserOpen ? <LuChevronUp /> : <LuChevronDown />}</span>
            </div>
            {isUserOpen && (
              <div className={cx("ItemContent", { open: isUserOpen })}>
                {userInfos.map((info) => (
                  <div key={info.id} className={cx("ItemDetail")}>
                    <div className={cx("ItemInfo")}>
                      <h4 className={cx("InfoTitle")}>{info.name}</h4>
                      <div className={cx("PriceInfo")}>
                        <span className={cx("ItemInfoDetail")}>
                          {info.phone}
                        </span>
                        <span className={cx("ItemInfoDetail")}>
                          {info.email}
                        </span>
                      </div>
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
