"use client";
import { useState } from "react";
import CartService from "@/src/api/services/cart.service";
import styles from "./cart.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

const CartView = () => {
  const { cartList, updateCartItem, removeCartItem } = CartService();
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(1);

  const handleEditClick = (itemId: string, currentQuantity: number) => {
    setEditItemId(itemId);
    setEditQuantity(currentQuantity);
  };

  const handleUpdate = async () => {
    if (!editItemId) return;

    try {
      await updateCartItem(editItemId, { quantity: editQuantity });
      console.log("장바구니 아이템 수정 성공");
      setEditItemId(null); // 수정 완료 후 초기화
    } catch (error) {
      console.error("장바구니 수정 실패:", error);
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await removeCartItem(itemId);
      console.log("장바구니 아이템 삭제 성공");
    } catch (error) {
      console.error("장바구니 삭제 실패:", error);
    }
  };

  return (
    <div>
      <h1>장바구니</h1>
      <ul>
        {cartList.map((item) => (
          <li key={item.cartItemId} style={{ marginBottom: "1rem" }}>
            <div>
              <strong>{item.name}</strong> - 수량: {item.quantity}
            </div>
            {editItemId === item.cartItemId ? (
              <div>
                <input
                  type="number"
                  min="1"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(Number(e.target.value))}
                />
                <button onClick={handleUpdate}>수정 저장</button>
                <button onClick={() => setEditItemId(null)}>취소</button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() =>
                    handleEditClick(item.cartItemId, item.quantity)
                  }
                >
                  수정
                </button>
                <button onClick={() => handleRemove(item.cartItemId)}>
                  삭제
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartView;
