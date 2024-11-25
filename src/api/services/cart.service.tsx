"use client";
import { useState, useEffect } from "react";
import { CartItem } from "@/src/api/@types/cart.type";
import CartView from "@/src/views/cart/cart.view";

// View에서 사용할 타입 (UI 표시용)
interface CartItemView {
  cartItemId: string;
  cartId: string;
  product: {
    id: string;
    productName: string;
    sales: number;
    thumbnail: string;
  };
  quantity: number;
  totalPrice: number;
}

const CartService = () => {
  const [cartList, setCartList] = useState<CartItemView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartData, setCartData] = useState<CartItem | null>(null);

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
      setCartData(data);

      // 데이터 매핑 (View용)
      if (Array.isArray(data.cartItem)) {
        const mappedData: CartItemView[] = data.cartItem.map((item) => ({
          cartItemId: item.id,
          cartId: data.cartId,
          product: {
            id: item.product.id,
            productName: item.product.productName,
            sales: item.product.sales,
            thumbnail: item.product.thumbnail || "",
          },
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }));

        setCartList(mappedData);

        // 결제를 위한 데이터 저장
        const orderDetails = {
          cartId: data.cartId,
          items: mappedData,
          totalProductPrice: data.totalProductPrice,
          shippingFee: data.shippingFee,
          totalPaymentAmount: data.totalPaymentAmount,
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

      const item = cartList.find((item) => item.cartItemId === cartItemId);
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
      setCartList((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity, totalPrice }
            : item
        )
      );

      // sessionStorage 업데이트
      const orderDetails = JSON.parse(
        sessionStorage.getItem("orderDetails") || "{}"
      );
      if (orderDetails.items) {
        const updatedItems = orderDetails.items.map((item: CartItemView) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity, totalPrice }
            : item
        );

        // 총 금액 다시 계산
        const totalProductPrice = updatedItems.reduce(
          (sum: number, item: CartItemView) => sum + item.totalPrice,
          0
        );
        const shippingFee = totalProductPrice >= 40000 ? 0 : 3000;

        orderDetails.items = updatedItems;
        orderDetails.totalProductPrice = totalProductPrice;
        orderDetails.shippingFee = shippingFee;
        orderDetails.totalPaymentAmount = totalProductPrice + shippingFee;

        sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails));
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

      // 상태 업데이트
      setCartList((prev) =>
        prev.filter((item) => item.cartItemId !== cartItemId)
      );

      // sessionStorage 업데이트
      const orderDetails = JSON.parse(
        sessionStorage.getItem("orderDetails") || "{}"
      );
      if (orderDetails.items) {
        const updatedItems = orderDetails.items.filter(
          (item: CartItemView) => item.cartItemId !== cartItemId
        );

        // 총 금액 다시 계산
        const totalProductPrice = updatedItems.reduce(
          (sum: number, item: CartItemView) => sum + item.totalPrice,
          0
        );
        const shippingFee = totalProductPrice >= 40000 ? 0 : 3000;

        orderDetails.items = updatedItems;
        orderDetails.totalProductPrice = totalProductPrice;
        orderDetails.shippingFee = shippingFee;
        orderDetails.totalPaymentAmount = totalProductPrice + shippingFee;

        sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails));
      }
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
