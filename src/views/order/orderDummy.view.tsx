"use client";
import { useState } from "react";
import styles from "./order.module.scss";
import cn from "classnames/bind";
import { LuChevronDown, LuChevronUp, LuCheckCircle } from "react-icons/lu";
import Image from "next/image";
import Button from "@/src/components/Button/Button";
import Input from "@/src/components/Input/Input";
import BottomSheet from "@/src/components/BottomSheet/BottomSheet";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

/** TEST - 주문(+주문아이템) */

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
  // const [selectedItem, setSelectedItem] = useState<string>();

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

  /** 아이템 텍스트 길이 제한 */
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  /** 바텀시트 items */
  // const items = [
  //   { id: "1", label: "메뉴 1" },
  //   { id: "2", label: "메뉴 2" },
  // ];

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
              <div>
                <span className="ItemText">
                  {orderItems.length === 1
                    ? truncateText(orderItems[0].name, 20)
                    : `${truncateText(orderItems[0].name, 20)} 외 ${orderItems.length - 1}건`}
                </span>
                <span className={cx("ItemIcon")}>
                  {isOrderOpen ? <LuChevronUp /> : <LuChevronDown />}
                </span>
              </div>
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
                  <Button disabled={false} variants={"outline"}>
                    <span>변경</span>
                  </Button>
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
                <Button disabled={false} variants={"solid"}>
                  <span>카카오페이</span>
                </Button>
              </div>

              <div className={cx("PaymentType")}>
                <Button disabled={false} variants={"outline"}>
                  {" "}
                  <span>신용카드</span>
                </Button>
                <Button disabled={false} variants={"outline"}>
                  <span>간편결제</span>
                </Button>
                <Button disabled={false} variants={"outline"}>
                  <span>휴대폰</span>
                </Button>
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
                disabled={false}
                variants={"solid"}
                onClick={handleOpenBottomSheet}
              >
                <span>{`${totalPayment.toLocaleString()}원 결제하기`}</span>
              </Button>
            </div>
            <BottomSheet
              // items={items}
              // selectedItem={selectedItem}
              isOpen={isBottomSheetOpen}
              onClose={handleCloseBottomSheet}
              // title="주문완료"
              className={cx("PayBottomSheet")}
            >
              <div className={cx("BottomSheetContent")}>
                <span className={cx("BottomSheetIcon")}>
                  <LuCheckCircle />
                </span>
                <div className={cx("BottomSheetText")}>
                  <h3>{userInfos[0].name}님의 주문이 완료되었습니다.</h3>
                  <b>내일 아침에 만나요!</b>
                </div>
                <div className={cx("ItemHeader")}>
                  <span className={cx("ItemTitle")}>결제금액</span>
                  <span className={cx("TotalAmout")}>
                    {totalPayment.toLocaleString()}원
                  </span>
                </div>
                <div className={cx("ItemHeader", "BottomSheetBtns")}>
                  <Button
                    // text={"주문 상세보기"}
                    disabled={false}
                    variants={"outline"}
                    onClick={() => handleClick("/order/detail")}
                  >
                    <span>주문 상세보기</span>
                  </Button>
                  <Button
                    disabled={false}
                    variants={"solid"}
                    onClick={() => handleClick("/")}
                  >
                    <span>쇼핑 계속하기</span>
                  </Button>
                </div>
              </div>
            </BottomSheet>
          </div>
        </div>
      </div>
    </div>
  );
}
