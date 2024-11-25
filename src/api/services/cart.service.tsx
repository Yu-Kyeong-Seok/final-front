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

      // cartId 쿠키에서 가져오기
      const cartId = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("cartId="))
        ?.split("=")[1];

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/carts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`장바구니 조회 실패 (${response.status})`);
      }

      const data: CartItem = await response.json();

      // cartId와 일치하는 장바구니만 필터링
      if (data && data.id === cartId) {
        // 총 금액 계산
        const totalProductPrice = data.cartItem.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
        const shippingFee = totalProductPrice >= 40000 ? 0 : 3000;

        const userCart: CartItem = {
          ...data,
          totalProductPrice,
          shippingFee,
          totalPaymentAmount: totalProductPrice + shippingFee,
        };

        setCartList(userCart);

        // 결제를 위한 데이터 저장
        const orderDetails = {
          cartId: userCart.id,
          items: userCart.cartItem,
          totalProductPrice: userCart.totalProductPrice,
          shippingFee: userCart.shippingFee,
          totalPaymentAmount: userCart.totalPaymentAmount,
        };
        sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails));
      }
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
