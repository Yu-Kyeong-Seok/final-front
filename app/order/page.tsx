"use client";
import { useState } from "react";
import styles from "./order.module.scss";
import cn from "classnames/bind";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
// import { LuChevronDown, LuChevronUp, LuFileCheck2 } from "react-icons/lu";
// import { BiSolidMessageRounded } from "react-icons/bi";
import Image from "next/image";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";

const cx = cn.bind(styles);

/** 주문 아이템 */
/** props로 내려줄 것 => view 컴포넌트로 */
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
    currentPrice: 20900,
    originalPrice: 12300,
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/e971445b-df76-482b-9502-88a64f62041f.jpg",
  },
];

/** 주문자 정보 */
const userInfos = [
  {
    id: "random1",
    name: "황다영",
    phone: "010-0000-0000",
    email: "1234@gmail.com",
    address: "서울특별시 강남구 테헤란로 133 한국타이어빌딩 18층 (역삼동)",
  },
];

/** 현재금액 * 수량 */
const totalAmount = orderItems.reduce((sum, item) => {
  return sum + item.currentPrice * item.quantity;
}, 0);

/** 배송비 계산 */
const deliveryFee = totalAmount >= 40000 ? 0 : 3000;

/** 결제 예정 금액 */
const totalPayment = totalAmount + deliveryFee;

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
    <div className={cx("PageContainer")}>
      <div className={cx("Inner")}>
        <div className={cx("PageHeader")}>
          {/* <h3>
            <LuFileCheck2 />
            &nbsp; 주문서
          </h3> */}
        </div>
        <div className={cx("Contents")}>
          {/* 주문상품 아코디언 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")} onClick={toggleOrderAccordion}>
              <span className={cx("ItemTitle")}>주문상품</span>
              <span className={cx("ItemIcon")}>
                {isOrderOpen ? <LuChevronUp /> : <LuChevronDown />}
              </span>
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
                        {/* 수량 */}
                        <span>{item.quantity}개</span>
                      </div>
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
              <span className={cx("ItemIcon")}>
                {isUserOpen ? <LuChevronUp /> : <LuChevronDown />}
              </span>
            </div>
            {isUserOpen && (
              <div className={cx("ItemContent", { open: isUserOpen })}>
                {userInfos.map((info) => (
                  <div key={info.id} className={cx("UserDetail")}>
                    <div className={cx("UserInfo")}>
                      <ul className={cx("UserInfoDetail", "InfoText")}>
                        <li>보내는 분</li>
                        <li>휴대폰</li>
                        <li>이메일</li>
                      </ul>
                      <ul className={cx("UserInfoDetail")}>
                        <li>{info.name}</li>
                        <li>{info.phone}</li>
                        <li>{info.email}</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 배송지 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <span className={cx("ItemTitle")}>배송지</span>
            </div>
            <div className={cx("Address")}>
              <ul>
                <li className={cx("AddressInfo")}>{userInfos[0].address}</li>
                <li className={cx("AddressBtn")}>
                  <Button text={"변경"} disabled={false} variants={"outline"} />
                </li>
              </ul>
            </div>
          </div>

          {/* 배송 요청사항 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <span className={cx("ItemTitle")}>배송 요청사항</span>
            </div>
            <div className={cx("Address")}>
              <Input placeholder={"배송 요청사항을 입력해주세요."} />
            </div>
          </div>

          {/* 결제 수단 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <span className={cx("ItemTitle")}>결제 수단</span>
            </div>
            <div className={cx("Payment")}>
              <div className={cx("Kakao")}>
                <Button
                  text={"카카오페이"}
                  disabled={false}
                  variants={"solid"}
                />
              </div>

              <div className={cx("PaymentType")}>
                <Button
                  text={"신용카드"}
                  disabled={false}
                  variants={"outline"}
                />
                <Button
                  text={"간편결제"}
                  disabled={false}
                  variants={"outline"}
                />
                <Button text={"휴대폰"} disabled={false} variants={"outline"} />
              </div>
            </div>
          </div>
          {/* 상품 계산 금액 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <span className={cx("ItemTitle")}>상품 금액</span>
              <span className={cx("ItemTitle")}>
                {totalAmount.toLocaleString()}원
              </span>
            </div>
            <div className={cx("Total")}>
              {/* <ul>
                <li>상품할인금액</li>
                <li>3,300원</li>
              </ul> */}
              <ul className={cx("DeliveryFee")}>
                <li>배송비</li>
                <li>{deliveryFee.toString()}원</li>
              </ul>
              <div className={cx("ItemHeader")}>
                <span className={cx("ItemTitle")}>결제예정금액</span>
                <span className={cx("TotalAmout")}>
                  {totalPayment.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
          {/* 결제 동의 및 결제하기 버튼 */}
          <div className={cx("Item")}>
            <div>
              <span className={cx("PaymentTitle")}>
                위 내용을 확인 하였으며 결제에 동의합니다.
              </span>
            </div>
            <div className={cx("PaymentButton")}>
              <Button
                text={`${totalPayment.toLocaleString()}원 결제하기`}
                disabled={false}
                variants={"solid"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
