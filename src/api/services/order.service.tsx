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
  const [cartItemData, setCartItemData] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<DeliveryAddress[]>([]);

  // 장바구니 아이템조회
  const fetchCartItemData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

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

      const data = await response.json();
      setCartItemData(data.cartItem || []); // cartItem 배열에 접근

      console.log("장바구니조회::::::", data);
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

  // 배송지 조회 (주문자 이름, 폰번호, 기본배송지 연결하기 위해서 )
  const fetchUserInfo = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
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

      // 기본 배송지가 있으면 첫 번째로 정렬
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

  // 주문 생성
  const createOrder = async (orderRequest: CreateOrderRequest) => {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
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

  // useEffect(() => {
  //   fetchCartItemData();
  // }, []);

  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

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

  if (isLoading) return <div>로딩 중...</div>;

  if (error) {
    return (
      <div>
        <h2>주문 데이터를 불러오는데 실패했습니다</h2>
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setIsLoading(true);
            Promise.all([fetchCartItemData(), fetchUserInfo()]);
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!cartItemData.length || !userInfo.length) {
    return <div>주문 데이터가 없습니다.</div>;
  }

  return (
    <OrderView
      cartItemData={cartItemData}
      userInfo={userInfo}
      onCreateOrder={createOrder}
    />
  );
};

export default OrderService;
