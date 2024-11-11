"use client";
import { useState } from "react";
import styles from "./order.module.scss";
import cn from "classnames/bind";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import Image from "next/image";
import Button from "@/src/components/Button/Button";
import Input from "@/src/components/Input/Input";
import BottomSheet from "@/src/components/BottomSheet/BottomSheet";
// import BottomSheet from "@/src/components/BottomSheet/BottomSheet";

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

/** 주문자 정보 */
type UserInfo = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

type OrderViewProps = {
  orderItems: OrderItem[];
  userInfos: UserInfo[];
};

export default function OrderView(props: OrderViewProps) {
  const { orderItems, userInfos } = props;

  /** useState */
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  /** 바텀시트 useState */
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>();

  /** 주문 상품 목록 아코디언 */
  const toggleOrderAccordion = () => {
    setIsOrderOpen(!isOrderOpen);
  };

  /** 주문자 정보 아코디언 */
  const toggleUserAccordion = () => {
    setIsUserOpen(!isUserOpen);
  };

  /** 현재금액 * 수량 */
  const totalAmount = orderItems.reduce((sum, item) => {
    return sum + item.currentPrice * item.quantity;
  }, 0);

  /** 배송비 계산 */
  const deliveryFee = totalAmount >= 40000 ? 0 : 3000;

  /** 결제 예정 금액 */
  const totalPayment = totalAmount + deliveryFee;

  /** 바텀시트 items & 핸들러 */
  const items = [
    { id: "1", label: "메뉴 1" },
    { id: "2", label: "메뉴 2" },
  ];

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
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
                onClick={handleOpenBottomSheet}
              />
            </div>
            <BottomSheet
              items={items}
              isOpen={isBottomSheetOpen}
              onClose={handleCloseBottomSheet}
              title="결제 완료"
              selectedItem={selectedItem}
              className={cx("PayBottomSheet")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
