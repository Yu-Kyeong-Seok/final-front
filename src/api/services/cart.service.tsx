"use client";
import { useState, useEffect } from "react";
import { CartItem } from "@/src/api/@types/cart.type";
import CartView from "@/src/views/cart/cart.view";

const CartService = () => {
  const [cartList, setCartList] = useState<CartItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetchCartList = async () => {
    try {
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/carts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`장바구니 조회 실패 (${response.status})`);
      }

      const data: CartItem = await response.json();
      setCartList(data);

      // 결제를 위한 데이터 저장
      const orderDetails = {
        cartId: data.id,
        items: data.cartItem,
        totalProductPrice: data.totalProductPrice,
        shippingFee: data.shippingFee,
        totalPaymentAmount: data.totalPaymentAmount,
      };
      sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    } catch (error) {
      console.error("Fetch 에러", error);
      setError(error instanceof Error ? error.message : "장바구니 조회 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (cartItemId: string, quantity: number) => {
    try {
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");
      if (!cartList) throw new Error("장바구니 정보가 없습니다.");

      const item = cartList.cartItem.find((item) => item.id === cartItemId);
      if (!item) throw new Error("해당 장바구니 아이템을 찾을 수 없습니다.");

      const totalPrice = item.product.sales * quantity;

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/cartItems/${cartItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ quantity, totalPrice }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `장바구니 수정 실패 (${response.status}): ${errorText}`
        );
      }

      // 로컬 상태 업데이트
      setCartList((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          cartItem: prev.cartItem.map((item) =>
            item.id === cartItemId ? { ...item, quantity, totalPrice } : item
          ),
        };
      });

      // 장바구니 데이터 다시 조회하여 최신 정보 업데이트
      await fetchCartList();
    } catch (error) {
      console.error("Cart update error:", error);
      throw error;
    }
  };

  const removeCartItem = async (cartItemId: string) => {
    try {
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/cartItems/${cartItemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `장바구니 삭제 실패 (${response.status}): ${errorText}`
        );
      }

      // 장바구니 데이터 다시 조회하여 최신 정보 업데이트
      await fetchCartList();
    } catch (error) {
      console.error("Remove cart item error:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!cartList) return <div>장바구니가 비어있습니다.</div>;

  return (
    <CartView
      cartList={cartList}
      isLoading={isLoading}
      error={error}
      onUpdateQuantity={updateCartItem}
      onRemoveItem={removeCartItem}
    />
  );
};

export default CartService;
