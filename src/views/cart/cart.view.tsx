"use client";
import { useRouter } from "next/navigation";
import styles from "./cart.module.scss";
import cn from "classnames/bind";
import { LuChevronLeft, LuX, LuPlus, LuMinus } from "react-icons/lu";
import { CartItem } from "@/src/api/@types/cart.type";
import ModalWrap from "@/src/components/Modal/Modal";
import { useState } from "react";
import Image from "next/image";
import Button from "@/src/components/Button/Button";

const cx = cn.bind(styles);

type CartViewProps = {
  cartList: CartItem | null;
  isLoading: boolean;
  error: string | null;
  onUpdateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  onRemoveItem: (cartItemId: string) => Promise<void>;
};

const CartView = ({
  cartList,
  isLoading,
  error,
  onUpdateQuantity,
  onRemoveItem,
}: CartViewProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleQuantityChange = async (
    cartItemId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);

    try {
      await onUpdateQuantity(cartItemId, newQuantity);
      setModalMessage("수량이 변경되었습니다.");
    } catch (error) {
      console.error(error);
      setModalMessage("수량 변경에 실패했습니다.");
    } finally {
      setIsUpdating(false);
      setIsModalOpen(true);
    }
  };

  const handleRemove = async (cartItemId: string) => {
    if (window.confirm("이 상품을 삭제하시겠습니까?")) {
      try {
        await onRemoveItem(cartItemId);
        setModalMessage("상품이 삭제되었습니다.");
      } catch (error) {
        console.error(error);
        setModalMessage("상품 삭제에 실패했습니다.");
      } finally {
        setIsModalOpen(true);
      }
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!cartList || cartList.cartItem.length === 0) {
    return (
      <div className={cx("PageContainer")}>
        <div className={cx("PageHeader")}>
          <button onClick={handleBack} className={cx("BackButton")}>
            <LuChevronLeft />
          </button>
          <h3>장바구니</h3>
        </div>
        <div className={cx("EmptyCart")}>
          <span>장바구니가 비어있습니다.</span>
          <Button onClick={() => router.push("/")}>쇼핑하기</Button>
        </div>
      </div>
    );
  }

  // 금액 계산
  const salesPrice = cartList.cartItem.reduce(
    (sum, item) => sum + item.product.sales * item.quantity,
    0
  );
  const deliveryFee = salesPrice >= 40000 ? 0 : 3000;
  const totalPrice = salesPrice + deliveryFee;

  // 주문 페이지로 이동
  const handlePayment = () => {
    router.push("/order");
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("PageHeader")}>
        <button onClick={handleBack} className={cx("BackButton")}>
          <LuChevronLeft />
        </button>
        <h3>장바구니</h3>
      </div>

      <section>
        <ul className={cx("CartList")}>
          {cartList.cartItem.map((item) => (
            <li key={item.id} className={cx("CartItem")}>
              <span className={cx("ProductName")}>
                {item.product.productName}
              </span>

              <div className={cx("ItemInfo")}>
                <Image
                  src={item.product.thumbnail || ""}
                  alt={item.product.productName}
                  width={70}
                  height={80}
                  className={cx("ProductImage")}
                />
                <div className={cx("PriceAndButtons")}>
                  <strong className={cx("ItemPrice")}>
                    {/* 제품가격 */}
                    {item.product.sales.toLocaleString()}원
                    {item.quantity > 1 && ` * ${item.quantity}`}
                  </strong>
                  <div className={cx("QuantityWrapper")}>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1 || isUpdating}
                    >
                      <LuMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      disabled={isUpdating}
                    >
                      <LuPlus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className={cx("RemoveButton")}
                  disabled={isUpdating}
                >
                  <LuX />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className={cx("Summary")}>
          <p>
            <span>총 상품 금액</span>
            <span>{salesPrice.toLocaleString()}원</span>
          </p>
          <p>
            <span>배송비</span>
            <span>{deliveryFee.toLocaleString()}원</span>
          </p>
          <p>
            <span>결제 예정 금액</span>
            <strong className={cx("TotalPrice")}>
              {totalPrice.toLocaleString()}원
            </strong>
          </p>
          <div className="PayButton">
            <Button
              disabled={cartList.cartItem.length === 0 || isUpdating}
              type="submit"
              onClick={handlePayment}
            >
              <span style={{ fontSize: "15px" }}>
                {totalPrice.toLocaleString()}원 결제하기
              </span>
            </Button>
          </div>
        </div>
      </section>

      <ModalWrap isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p style={{ fontSize: "16px" }}>{modalMessage}</p>
      </ModalWrap>
    </div>
  );
};

export default CartView;
