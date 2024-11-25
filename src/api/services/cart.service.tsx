"use client";

import { useState, useEffect } from "react";
import { CartItem } from "@/src/api/@types/cart.type";
import CartView from "@/src/views/cart/cart.view";

const CartService = () => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
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

      const response = await fetch(`${apiUrl}/api/cartItems`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`장바구니 조회 실패 (${response.status})`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("서버 응답이 JSON 형식이 아닙니다.");
      }

      const text = await response.text(); // 먼저 텍스트로 받아서
      if (!text) {
        throw new Error("빈 응답을 받았습니다.");
      }

      const data = JSON.parse(text); // JSON 파싱
      if (!Array.isArray(data)) {
        throw new Error("올바르지 않은 응답 형식입니다.");
      }

      const mappedData = data.map((item: any) => ({
        ...item,
        cartItemId: item.id,
      }));

      setCartList(mappedData);
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

      const item = cartList.find((item) => item.cartItemId === cartItemId);
      if (!item) throw new Error("해당 장바구니 아이템을 찾을 수 없습니다.");

      const totalPrice = item.product.sales * quantity;

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      // console.log("업데이트 request 보내기:", {
      //   cartItemId,
      //   quantity,
      //   totalPrice,
      // });

      const response = await fetch(`${apiUrl}/api/cartItems/${cartItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ quantity, totalPrice }),
      });

      console.log(response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(
          `장바구니 수정 실패 (${response.status}): ${errorText}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // JSON이 아닌 경우, 성공으로 간주하고 로컬 상태만 업데이트,,,,,

        setCartList((prev) =>
          prev.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity, totalPrice }
              : item
          )
        );
        return;
      }

      const text = await response.text();
      if (!text) {
        setCartList((prev) =>
          prev.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity, totalPrice }
              : item
          )
        );
        return;
      }

      try {
        const updatedItem = JSON.parse(text);
        console.log("Parsed response:", updatedItem);

        const mappedUpdatedItem = {
          ...updatedItem,
          cartItemId: updatedItem.id || cartItemId,
        };

        setCartList((prev) =>
          prev.map((item) =>
            item.cartItemId === cartItemId ? mappedUpdatedItem : item
          )
        );
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        // JSON 파싱 실패시 로컬 상태만 업데이트
        setCartList((prev) =>
          prev.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity, totalPrice }
              : item
          )
        );
      }
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

      setCartList((prev) =>
        prev.filter((item) => item.cartItemId !== cartItemId)
      );
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
