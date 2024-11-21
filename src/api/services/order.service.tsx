"use client";
import { useEffect, useState } from "react";
import OrderView from "@/src/views/order/order.view";

export type CreateOrderRequest = Omit<
  IOrder,
  "id" | "userId" | "userInfo" | "createdAt" | "orderStatus"
>;

const OrderService = () => {
  const [orderData, setOrderData] = useState<IOrderResponseDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`주문 데이터 로드 실패. 상태 코드: ${response.status}`);

      const data: IOrderResponseDTO = await response.json();
      setOrderData(data);
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

  const createOrder = async (orderRequest: CreateOrderRequest) => {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

    const accessToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="))
      ?.split("=")[1];
    if (!accessToken) throw new Error("토큰이 없습니다");

    const response = await fetch(`${apiUrl}/api/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderRequest),
    });

    if (!response.ok)
      throw new Error(`주문 생성 실패. 상태 코드: ${response.status}`);

    return (await response.json()) as IOrderResponseDTO;
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  if (isLoading) return <div className="loading-container">로딩 중...</div>;

  if (error) {
    return (
      <div className="error-container">
        <h2>주문 데이터를 불러오는데 실패했습니다</h2>
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setIsLoading(true);
            fetchOrderData();
          }}
          className="retry-button"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!orderData)
    return <div className="error-container">주문 데이터가 없습니다</div>;

  return <OrderView orderData={orderData} onCreateOrder={createOrder} />;
};

export default OrderService;
