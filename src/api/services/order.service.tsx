"use client";
import { useEffect, useState } from "react";
import OrderView from "@/src/views/order/order.view";
import { CartItem } from "@/src/api/@types/cart.type";
import { DeliveryAddress } from "@/src/api/@types/delivery.type";
import {
  CreateOrderRequest,
  IOrderResponseDTO,
} from "@/src/api/@types/order.type";

const OrderService = () => {
  const [cartData, setCartData] = useState<CartItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<DeliveryAddress[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetchCartItemData = async () => {
    try {
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const cartId = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("cartId="))
        ?.split("=")[1];
      if (!cartId) throw new Error("장바구니 ID가 없습니다");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/carts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`주문 데이터 로드 실패. 상태 코드: ${response.status}`);

      const data: CartItem = await response.json();

      if (data && data.id === cartId) {
        setCartData(data);
        console.log("장바구니 아이템 조회::::::", data);
      }
    } catch (error) {
      console.error("주문 데이터 가져오기 중 오류 발생:", error);
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다.");

      const response = await fetch(`${apiUrl}/api/deliveries`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`배송지 정보 로드 실패. 상태 코드: ${response.status}`);

      const data = await response.json();
      console.log("배송지 정보::::::", data);

      const sortedAddresses = [...data].sort((a, b) =>
        a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
      );
      setUserInfo(sortedAddresses);
    } catch (error) {
      console.error("배송지 정보 가져오기 중 오류 발생:", error);
      setError(error instanceof Error ? error.message : "알 수 없는 에러");
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (orderRequest: CreateOrderRequest) => {
    if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

    const accessToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="))
      ?.split("=")[1];
    if (!accessToken) throw new Error("토큰이 없습니다");

    try {
      console.log("주문 요청 데이터:", orderRequest);

      const response = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderRequest),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("서버 응답 에러:", errorData);
        throw new Error(`주문 생성 실패. 상태 코드: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("주문 생성 응답:", responseData);
      return responseData as IOrderResponseDTO;
    } catch (error) {
      console.error("주문 생성 중 에러:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchCartItemData(), fetchUserInfo()]);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
        setError(error instanceof Error ? error.message : "알 수 없는 에러");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <OrderView isLoading={isLoading} />;
  if (error) return <OrderView error={error} />;
  if (!cartData) return <OrderView noCartData={true} />;
  if (!userInfo.length) return <OrderView noDeliveryInfo={true} />;

  return (
    <OrderView
      cartItemData={cartData}
      userInfo={userInfo}
      onCreateOrder={createOrder}
    />
  );
};

export default OrderService;
