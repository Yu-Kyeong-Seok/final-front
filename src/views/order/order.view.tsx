"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./order.module.scss";
import cn from "classnames/bind";
import { LuChevronDown, LuChevronUp, LuCheckCircle } from "react-icons/lu";
import Image from "next/image";
import Button from "@/src/components/Button/Button";
import BottomSheet from "@/src/components/BottomSheet/BottomSheet";
import Input from "@/src/components/Input/Input";
import { CreateOrderRequest } from "@/src/api/@types/order.type";
import { CartItem } from "@/src/api/@types/cart.type";
import { DeliveryAddress } from "@/src/api/@types/delivery.type";
import { IOrderResponseDTO } from "@/src/api/@types/order.type";
import ModalWrap from "@/src/components/Modal/Modal";

const cx = cn.bind(styles);

interface OrderViewProps {
  cartItemData: CartItem & {};
  onCreateOrder: (
    orderRequest: CreateOrderRequest
  ) => Promise<IOrderResponseDTO>;
  userInfo: DeliveryAddress[];
  isLoading?: boolean;
  error?: string | null;
  noCartData?: boolean;
  noDeliveryInfo?: boolean;
}

type BottomSheetState = "SUCCESS" | "CLOSED";

const OrderView = ({
  cartItemData,
  onCreateOrder,
  userInfo,
  isLoading,
  error,
  noCartData,
  noDeliveryInfo,
}: OrderViewProps) => {
  const router = useRouter();
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [bottomSheetState, setBottomSheetState] =
    useState<BottomSheetState>("CLOSED");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  if (isLoading) {
    return (
      <div className={cx("PageContainer")}>
        <div className={cx("LoadingState")}>
          <span>로딩 중...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cx("PageContainer")}>
        <div className={cx("ErrorState")}>
          <h3>오류가 발생했습니다</h3>
          <p>{error}</p>
          <Button onClick={() => router.back()}>
            <span>돌아가기</span>
          </Button>
        </div>
      </div>
    );
  }

  if (noCartData) {
    return (
      <div className={cx("PageContainer")}>
        <div className={cx("EmptyState")}>
          <h3>장바구니 정보를 불러올 수 없습니다</h3>
          <Button onClick={() => router.push("/cart")}>
            <span>장바구니로 이동</span>
          </Button>
        </div>
      </div>
    );
  }

  if (noDeliveryInfo) {
    return (
      <div className={cx("PageContainer")}>
        <div className={cx("EmptyState")}>
          <h3>등록된 배송지 정보가 없습니다!</h3>
          <p>먼저 배송지를 등록해주세요.</p>
          <Button onClick={() => router.push("/deliveryAddress")}>
            <span>배송지 등록하기</span>
          </Button>
        </div>
      </div>
    );
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // service에서 계산된 값 사용
  // const { salesPrice, deliveryFee, totalPrice } = cartItemData;

  // 금액 계산
  const salesPrice = cartItemData.cartItem.reduce(
    (sum, item) => sum + item.product.sales * item.quantity,
    0
  );
  const deliveryFee = salesPrice >= 40000 ? 0 : 3000;
  const totalPrice = salesPrice + deliveryFee;

  const toggleOrderAccordion = () => {
    setIsOrderOpen(!isOrderOpen);
  };

  const toggleUserAccordion = () => {
    setIsUserOpen(!isUserOpen);
  };

  const handleCreateOrder = async () => {
    try {
      setIsSubmitting(true);

      if (!userInfo[0]?.defaultAddress) {
        throw new Error("배송지 정보가 없습니다.");
      }

      if (!selectedPaymentMethod) {
        setModalMessage("결제 수단을 선택해주세요.");
        setIsModalOpen(true);
        setIsSubmitting(false);
        return;
      }

      const orderRequest: CreateOrderRequest = {
        deliveryAddress: userInfo[0]?.defaultAddress,
        deliveryRequest: deliveryRequest,
        paymentMethod: selectedPaymentMethod ?? "KAKAO_PAY",
        orderItem: cartItemData.cartItem.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          orderItemStatus: "PAYMENT_PENDING",
        })),
        totalProductPrice: salesPrice,
        shippingFee: deliveryFee,
        totalPaymentAmount: totalPrice,
        orderStatus: "PAYMENT_PENDING",
      };

      console.log("주문 요청 데이터:", JSON.stringify(orderRequest, null, 2));

      const response = await onCreateOrder(orderRequest);
      console.log("서버 응답 response:::::", response);

      if (!response || !response.orderId) {
        throw new Error("주문 생성 실패");
      }

      setCreatedOrderId(response.orderId);
      setBottomSheetState("SUCCESS");
    } catch (error) {
      console.log("주문 생성 실패:", error);
      setBottomSheetState("CLOSED");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewOrderDetail = (path: string) => {
    router.push(path);
  };

  const handleContinueShopping = () => {
    setBottomSheetState("CLOSED");
    router.push("/");
  };

  const handleDeliveryPage = () => {
    router.push("/deliveryAddress");
  };

  const renderBottomSheetContent = () => {
    switch (bottomSheetState) {
      case "SUCCESS":
        return (
          <div className={cx("PayBottomSheet")}>
            <div className={cx("BottomSheetContent")}>
              <span className={cx("BottomSheetIcon")}>
                <LuCheckCircle />
              </span>
              <div className={cx("BottomSheetText")}>
                <h3>{userInfo[0].name}님의 주문이 완료되었습니다.</h3>
                <b>내일 아침에 만나요!</b>
              </div>
              <div className={cx("ItemHeader")}>
                <span className={cx("ItemTitle")}>결제금액</span>
                <span className={cx("TotalAmout")}>
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
              <div className={cx("BottomSheetBtns")}>
                <Button
                  onClick={() =>
                    handleViewOrderDetail(`/order/${createdOrderId}`)
                  }
                  variants="outline"
                >
                  <span>주문 상세보기</span>
                </Button>
                <Button onClick={handleContinueShopping}>
                  <span>쇼핑 계속하기</span>
                </Button>
              </div>
            </div>
          </div>
        );
      case "CLOSED":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("Inner")}>
        <div className={cx("Contents")}>
          <div className={cx("Item")}>
            <div className={cx("ItemHeader")} onClick={toggleOrderAccordion}>
              <span className={cx("ItemTitle")}>주문상품</span>
              <div>
                <span className="ItemText">
                  {cartItemData.cartItem.length === 1
                    ? truncateText(
                        cartItemData.cartItem[0].product.productName,
                        20
                      )
                    : `${truncateText(
                        cartItemData.cartItem[0].product.productName,
                        20
                      )} 외 ${cartItemData.cartItem.length - 1}건`}
                </span>
                <span className={cx("ItemIcon")}>
                  {isOrderOpen ? <LuChevronUp /> : <LuChevronDown />}
                </span>
              </div>
            </div>

            {isOrderOpen && (
              <div className={cx("ItemContent", { open: isOrderOpen })}>
                {cartItemData.cartItem.map((item) => (
                  <div key={item.id} className={cx("ItemDetail")}>
                    <Image
                      src={item.product.thumbnail || ""}
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
                          {item.product.sales.toLocaleString()}원
                          {item.quantity > 1 && ` * ${item.quantity}`}
                        </span>
                        {/* <span className={cx("ItemInfoDetail")}>
                        {item.totalPrice.toLocaleString()}원
                        </span> */}
                        <span>{item.quantity}개</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
                    <ul className={cx("UserInfoDetail")}>
                      <li>{userInfo[0].name}</li>
                      <li>{userInfo[0].number}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <span className={cx("ItemTitle")}>배송지</span>
            </div>
            <div className={cx("Address")}>
              <ul>
                <li className={cx("AddressInfo")}>
                  {userInfo[0].defaultAddress} {userInfo[0].detailAddress}
                </li>
                <li className={cx("AddressBtn")}>
                  <Button
                    disabled={false}
                    variants={"outline"}
                    onClick={handleDeliveryPage}
                  >
                    <span>변경</span>
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <span className={cx("ItemTitle")}>배송 요청사항</span>
            </div>
            <div className={cx("Address")}>
              <Input
                placeholder={"배송 요청사항을 입력해주세요."}
                value={deliveryRequest}
                onChange={(e) => setDeliveryRequest(e.target.value)}
              />
            </div>
          </div>

          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <span className={cx("ItemTitle")}>결제 수단</span>
            </div>
            <div className={cx("Payment")}>
              {([["KAKAO_PAY", "카카오페이"]] as const).map(
                ([method, label]) => (
                  <div
                    key={method}
                    className={cx({
                      Kakao: method === "KAKAO_PAY",
                      PaymentType: method !== "KAKAO_PAY",
                    })}
                  >
                    <Button
                      disabled={isSubmitting}
                      variants={
                        selectedPaymentMethod === method ? "solid" : "outline"
                      }
                      onClick={() => setSelectedPaymentMethod(method)}
                    >
                      <span>{label}</span>
                    </Button>
                  </div>
                )
              )}

              <div className={cx("PaymentMethodsContainer")}>
                {["CREDIT_CARD", "SIMPLE_PAY", "MOBILE_PAYMENT"].map(
                  (method) => {
                    const label =
                      method === "CREDIT_CARD"
                        ? "신용카드"
                        : method === "SIMPLE_PAY"
                          ? "간편결제"
                          : "모바일결제";

                    return (
                      <div key={method} className={cx("PaymentButtonWrapper")}>
                        <Button
                          disabled={isSubmitting}
                          variants={
                            selectedPaymentMethod === method
                              ? "solid"
                              : "outline"
                          }
                          onClick={() =>
                            setSelectedPaymentMethod(method as PaymentMethod)
                          }
                        >
                          <span>{label}</span>
                        </Button>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          <div className={cx("Item")}>
            <div className={cx("ItemHeader")}>
              <span className={cx("ItemTitle")}>상품 금액</span>
              <span className={cx("ItemTitle")}>
                {salesPrice.toLocaleString()}원
              </span>
            </div>
            <div className={cx("Total")}>
              <ul className={cx("DeliveryFee")}>
                <li>배송비</li>
                <li>{deliveryFee.toLocaleString()}원</li>
              </ul>
              <div className={cx("ItemHeader")}>
                <span className={cx("ItemTitle")}>결제예정금액</span>
                <span className={cx("TotalAmout")}>
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          <div className={cx("OrderBtn")}>
            <Button onClick={handleCreateOrder} disabled={isSubmitting}>
              <span style={{ fontSize: "15px" }}>
                {totalPrice.toLocaleString()}원 결제하기
              </span>
            </Button>
          </div>
        </div>

        <BottomSheet
          isOpen={bottomSheetState !== "CLOSED"}
          onClose={() => !isSubmitting && setBottomSheetState("CLOSED")}
        >
          {renderBottomSheetContent()}
        </BottomSheet>
      </div>
      <ModalWrap isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p style={{ fontSize: "16px" }}>{modalMessage}</p>
      </ModalWrap>
    </div>
  );
};

export default OrderView;
