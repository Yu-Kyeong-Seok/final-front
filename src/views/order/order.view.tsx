"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./order.module.scss";
import cn from "classnames/bind";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import Image from "next/image";
import Button from "@/src/components/Button/Button";
import BottomSheet from "@/src/components/BottomSheet/BottomSheet";

const cx = cn.bind(styles);

interface OrderViewProps {
  orderData: IOrderResponseDTO;
  onCreateOrder: (
    orderRequest: CreateOrderRequest
  ) => Promise<IOrderResponseDTO>;
}

type BottomSheetState = "PAYMENT" | "SUCCESS" | "CLOSED";

// ordverView
const OrderView = ({ orderData, onCreateOrder }: OrderViewProps) => {
  const router = useRouter();
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [bottomSheetState, setBottomSheetState] =
    useState<BottomSheetState>("CLOSED");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("MOBILE_PAYMENT");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  /** 주문 아이템 텍스트 길이 제한 */
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // 토글 아코디언
  const toggleOrderAccordion = () => {
    setIsOrderOpen(!isOrderOpen);
  };

  const toggleUserAccordion = () => {
    setIsUserOpen(!isUserOpen);
  };

  const handleOpenPaymentSheet = () => {
    setBottomSheetState("PAYMENT");
  };

  const handleCreateOrder = async () => {
    try {
      setIsSubmitting(true);
      const orderRequest: CreateOrderRequest = {
        deliveryAddress: orderData.deliveryAddress,
        deliveryRequest: orderData.deliveryRequest,
        paymentMethod: selectedPaymentMethod,
        orderItem: orderData.orderItem.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        })),
        totalProductPrice: orderData.totalProductPrice,
        shippingFee: orderData.shippingFee,
        totalPaymentAmount: orderData.totalPaymentAmount,
      };

      const response = await onCreateOrder(orderRequest);
      setCreatedOrderId(response.orderId);
      // 주문 생성 성공 후 성공 바텀시트로 전환
      setBottomSheetState("SUCCESS");
    } catch (error) {
      console.error("주문 생성 실패:", error);
      // TODO: 에러 처리 (토스트 메시지 등)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewOrderDetail = () => {
    setBottomSheetState("CLOSED");
    router.push("/orders"); // 주문 목록 페이지로 이동
  };

  const handleContinueShopping = () => {
    setBottomSheetState("CLOSED");
    router.push("/"); // 홈으로 이동
  };

  const renderBottomSheetContent = () => {
    switch (bottomSheetState) {
      case "PAYMENT":
        return (
          <div className={cx("PaymentSheet")}>
            <h3>결제 진행</h3>
            <p>
              총 결제금액: {orderData.totalPaymentAmount.toLocaleString()}원
            </p>
            <Button
              onClick={handleCreateOrder}
              disabled={isSubmitting}
              className={cx("PaymentButton")}
            >
              {isSubmitting ? "결제 처리중..." : "결제하기"}
            </Button>
          </div>
        );
      case "SUCCESS":
        return (
          <div className={cx("SuccessSheet")}>
            <h3>주문이 완료되었습니다!</h3>
            <p>주문번호: {createdOrderId}</p>
            <div className={cx("ButtonGroup")}>
              <Button onClick={handleViewOrderDetail}>주문 상세보기</Button>
              <Button onClick={handleContinueShopping} variants="outline">
                계속 쇼핑하기
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("Inner")}>
        {/* <div className={cx("PageHeader")}></div> */}
        <div className={cx("Contents")}>
          {/* 주문상품 - 펼치기 전 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")} onClick={toggleOrderAccordion}>
              <span className={cx("ItemTitle")}>주문상품</span>
              <div>
                <span className="ItemText">
                  {orderData.results[0].orderItem.length === 1
                    ? truncateText(
                        orderData.results[0].orderItem[0].product.productName,
                        20
                      )
                    : `${truncateText(orderData.results[0].orderItem[0].product.productName, 20)} 외 ${orderData.results[0].orderItem.length - 1}건`}
                </span>
                <span className={cx("ItemIcon")}>
                  {isOrderOpen ? <LuChevronUp /> : <LuChevronDown />}
                </span>
              </div>
            </div>

            {/*  주문상품 - 펼쳤을 때 */}
            {isOrderOpen && (
              <div className={cx("ItemContent", { open: isOrderOpen })}>
                {orderData.results[0].orderItem.map((item) => (
                  <div key={item.id} className={cx("ItemDetail")}>
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.productName}
                      width={70}
                      height={70}
                      className={cx("ProductImage")}
                    />
                    <div className={cx("OrderInfo")}>
                      <h4 className={cx("InfoTitle")}>
                        {item.product.productName}
                      </h4>
                      <div className={cx("ItemInfo")}>
                        <span className={cx("ItemInfoDetail")}>
                          {item.product.price.toLocaleString()}원
                        </span>
                        <span className={cx("ItemInfoDetail")}>
                          {item.product.sales.toLocaleString()}원
                        </span>
                        <span>{item.quantity}개</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 주문자 정보 */}
        <div className={cx("Item")}>
          <div className={cx("ItemHeader")} onClick={toggleUserAccordion}>
            <span className={cx("ItemTitle")}>주문자 정보</span>
            <span className={cx("ItemIcon")}>
              {isUserOpen ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {isUserOpen && (
            <div className={cx("ItemContent", { open: isUserOpen })}>
              <div className={cx("UserDetail")}>
                <div className={cx("UserInfo")}>
                  <ul className={cx("UserInfoDetail", "InfoText")}>
                    <li>보내는 분</li>
                    <li>휴대폰</li>
                  </ul>
                  {/* <ul className={cx("UserInfoDetail")}>
                      <li>{orderData.userInfo.firstName}</li>
                      <li>{orderData.userInfo.phoneNum}</li>
                    </ul> */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 결제 수단 선택 */}
        <div className={cx("Item")}>
          <div className={cx("ItemHeader")}>
            <span className={cx("ItemTitle")}>결제 수단</span>
          </div>
          <div className={cx("Payment")}>
            {(
              [
                ["KAKAO_PAY", "카카오페이"],
                ["CREDIT_CARD", "신용카드"],
                ["SIMPLE_PAY", "간편결제"],
                ["MOBILE_PAYMENT", "모바일결제"],
              ] as const
            ).map(([method, label]) => (
              <Button
                key={method}
                disabled={isSubmitting}
                variants={
                  selectedPaymentMethod === method ? "solid" : "outline"
                }
                onClick={() => setSelectedPaymentMethod(method)}
              >
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* 주문하기 버튼 */}
        <div className={cx("OrderBtn")}>
          <Button onClick={handleOpenPaymentSheet} disabled={isSubmitting}>
            결제하기
          </Button>
        </div>

        {/* 바텀시트 */}
        <BottomSheet
          isOpen={bottomSheetState !== "CLOSED"}
          onClose={() => !isSubmitting && setBottomSheetState("CLOSED")}
        >
          {renderBottomSheetContent()}
        </BottomSheet>
      </div>
    </div>
  );
};

export default OrderView;
