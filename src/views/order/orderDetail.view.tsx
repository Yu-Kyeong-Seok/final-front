"use client";
import styles from "./orderDetail.module.scss";
import cn from "classnames/bind";
import Image from "next/image";
import Button from "@/src/components/Button/Button";
import { IOrderResponseDTO, OrderStatus } from "@/src/api/@types/order.type";
import { useRouter } from "next/navigation";
import ModalWrap from "@/src/components/Modal/Modal";
import { useState } from "react";

const cx = cn.bind(styles);

type OrderDetailProps = {
  orderDetail: IOrderResponseDTO;
};

// 배송상태 맵핑
const orderItemStatusMap: Record<OrderStatus, string> = {
  PAYMENT_PENDING: "주문완료",
  PAYMENT_COMPLETED: "결제완료",
  ORDER_CANCELED: "주문취소",
  PREPARING_FOR_SHIPPING: "배송준비중",
  SHIPPING: "배송중",
  SHIPPED: "배송완료",
  PARTIAL_REFUND_REQUESTED: "부분 환불 요청",
  FULL_REFUND_REQUESTED: "전체 환불 요청",
  PARTIAL_REFUNDED: "부분 환불 완료",
  FULL_REFUNDED: "전체 환불 완료",
  PARTIAL_EXCHANGE_REQUESTED: "부분 교환 요청",
  PARTIAL_EXCHANGED: "부분 교환 완료",
  FULL_EXCHANGE_REQUESTED: "전체 교환 요청",
  FULL_EXCHANGED: "전체 교환 완료",
};

export default function OrderDetailView(props: OrderDetailProps) {
  const { orderDetail } = props;

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  /** 뒤로가기 router */
  const handleBack = () => {
    router.back();
  };

  /** 아이템 텍스트 길이 제한 */
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  /** 장바구니 추가 핸들러 */
  const handleAddToCart = async (item: any) => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];

      const cartId = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("cartId="))
        ?.split("=")[1];

      const cartItemData = {
        product: item.product.id,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        cartId: cartId,
      };

      console.log("전송할 데이터:", cartItemData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cartItems/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(cartItemData),
        }
      );

      if (response.ok) {
        setModalMessage("장바구니에 추가되었습니다.");
        setIsModalOpen(true);

        router.push("/cart");
      } else {
        throw new Error("장바구니 추가 실패");
      }
    } catch (err) {
      console.error(err);
      setModalMessage("장바구니 추가에 실패했습니다.");
      setIsModalOpen(true);
    }
  };

  // 주문완료일때 모달
  const handleDeliveryCheck = () => {
    // 주문완료(PAYMENT_PENDING) 상태일 때
    if (orderDetail.orderStatus === "PAYMENT_PENDING") {
      setModalMessage("주문완료 상태에서는 배송조회 할 수 없습니다.");
      setIsModalOpen(true);
      return;
    }
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("Inner")}>
        <div className={cx("Contents")}>
          {/* 주문상품 */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <h3>주문 내역 상세</h3>
            </div>

            <span>주문번호 {orderDetail.orderId}</span>

            <div className={cx("ItemContent")}>
              {orderDetail.orderItem.map((item) => (
                <div key={item.id} className={cx("ItemDetail")}>
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.productName}
                    width={70}
                    height={70}
                    className={cx("ProductImage")}
                  />
                  <div className={cx("OrderInfo")}>
                    {/* 상품 이름 */}
                    <h4 className={cx("InfoTitle")}>
                      {item.product.productName}
                    </h4>
                    <div className={cx("ItemInfo")}>
                      <span className={cx("ItemInfoDetail")}>
                        {/* 결제 가격 */}
                        {item.totalPrice.toLocaleString()}원
                      </span>
                      <span className={cx("ItemInfoDetail")}>
                        {/* 원래 가격 */}
                        {item.totalPrice.toLocaleString()}원
                      </span>
                      {/* 수량 */}
                      <span>{item.quantity}개</span>
                    </div>
                  </div>
                  {/* 주문완료 & 장바구니 버튼 */}
                  <div className={cx("StatusInfo")}>
                    <span>{orderItemStatusMap[item.orderItemStatus]}</span>
                    <Button
                      disabled={false}
                      variants={"outline"}
                      className={cx("CartBtn")}
                      onClick={() => handleAddToCart(item)}
                    >
                      <span>장바구니</span>
                    </Button>
                  </div>
                </div>
              ))}

              {/* 주문취소 & 다시담기 버튼*/}
              {/* <div className={cx("OrderCancel")}>
                <Button
                  // text={"주문취소"}
                  disabled={false}
                  variants={"outline"}
                  className={cx("CancelButton")}
                >
                  <span>주문취소</span>
                </Button>

                <Button
                  // text={"전체 상품 다시 담기"}
                  disabled={false}
                  variants={"outline"}
                  className={cx("CancelButton")}
                >
                  <span>전체 상품 다시 담기</span>
                </Button>
              </div> */}
            </div>
          </div>

          {/* 주문자 정보  */}
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <h3 className={cx("ItemTitle")}>배송조회</h3>
            </div>

            <div className={cx("ItemContent", "DeliveryContent")}>
              <span className={cx("DeliverText")}>
                {orderDetail.orderItem.length === 1
                  ? truncateText(
                      orderDetail.orderItem[0].product.productName,
                      20
                    )
                  : `${truncateText(orderDetail.orderItem[0].product.productName, 20)} 외 ${orderDetail.orderItem.length - 1}건`}
              </span>
              <div className={cx("StatusInfo")}>
                <span>{orderItemStatusMap[orderDetail.orderStatus]}</span>
                <span
                  className={cx("DeliveryInfo")}
                  onClick={handleDeliveryCheck}
                >
                  배송조회
                </span>
              </div>
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
                  {orderDetail.totalPaymentAmount.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalWrap isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p style={{ fontSize: "16px" }}>{modalMessage}</p>
      </ModalWrap>
    </div>
  );
}
