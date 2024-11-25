"use client";
import { useState, useEffect } from "react";
import OrderDetailView from "@/src/views/order/orderDetail.view";
import { IOrderResponseDTO } from "@/src/api/@types/order.type";

const OrderDetailService = ({ orderId }: { orderId: string }) => {
  const [orderDetailData, setOrderDetailData] =
    useState<IOrderResponseDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderDetail = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/orders/${orderId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(
          `주문내역 상세조회 실패. 상태 코드: ${response.status}`
        );

      const data = await response.json();

      console.log("주문내역상세::::::", data);

      setOrderDetailData(data || null);
    } catch (error) {
      console.error("주문내역 상세조회 중 오류 발생:", error);
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  if (isLoading) return <h2>로딩 중...</h2>;

  if (error) {
    return (
      <div>
        <h2>주문내역 상세조회에 실패했습니다</h2>
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setIsLoading(true);
            fetchOrderDetail();
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!orderDetailData) {
    return <h2>주문내역이 없습니다.</h2>;
  }

  return <OrderDetailView orderDetail={orderDetailData} />;
};

export default OrderDetailService;
