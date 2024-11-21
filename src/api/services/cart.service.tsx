"use client";
import { useState, useEffect } from "react";
import { CartItem } from "@/src/api/@types/cartItem.type";

const CartService = () => {
  const [cartList, setCartList] = useState<CartItem[]>([]);

  // 장바구니 데이터 조회
  const fetchCartList = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("토큰이 없습니다.");

      const response = await fetch(`${apiUrl}/api/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`장바구니 조회 실패. 상태 코드: ${response.status}`);
      }

      const cartItems: CartItem[] = await response.json();
      setCartList(cartItems);
    } catch (error) {
      console.error("장바구니 조회 실패:", error);
      throw error;
    }
  };

  // 장바구니 데이터 수정
  const updateCartItem = async (
    cartItemId: string,
    updatedData: Partial<CartItem>
  ) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("토큰이 없습니다.");

      const response = await fetch(`${apiUrl}/api/cartItems/${cartItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`장바구니 수정 실패. 상태 코드: ${response.status}`);
      }

      const updatedCartItem: CartItem = await response.json();

      // 상태 업데이트
      setCartList((prevItems) =>
        prevItems.map((item) =>
          item.cartItemId === cartItemId ? updatedCartItem : item
        )
      );
    } catch (error) {
      console.error("장바구니 수정 실패:", error);
      throw error;
    }
  };

  // 장바구니 데이터 삭제
  const removeCartItem = async (cartItemId: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("토큰이 없습니다.");

      const response = await fetch(`${apiUrl}/api/cartItems/${cartItemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`장바구니 삭제 실패. 상태 코드: ${response.status}`);
      }

      setCartList((prevItems) =>
        prevItems.filter((item) => item.cartItemId !== cartItemId)
      );
    } catch (error) {
      console.error("장바구니 삭제 실패:", error);
      throw error;
    }
  };

  // 컴포넌트 초기 로드 시 장바구니 데이터 가져오기
  useEffect(() => {
    fetchCartList();
  }, []);

  return { cartList, fetchCartList, updateCartItem, removeCartItem };
};

export default CartService;
