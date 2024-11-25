"use client";
import { useState, useEffect } from "react";
import { IOrderListResponseDTO } from "@/src/api/@types/order.type";
import OrderListView from "@/src/views/order/orderList.view";

const OrderListService = () => {
  const [orderListData, setOrderListData] = useState<IOrderListResponseDTO[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderListData = async () => {
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
        throw new Error(
          `전체 주문내역 로드 실패. 상태 코드: ${response.status}`
        );

      const data = await response.json();

      console.log("주문목록조회 data::::::", data);

      setOrderListData(data);
    } catch (error) {
      console.error("전체 주문내역 가져오기 중 오류 발생:", error);
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
    fetchOrderListData();
  }, []);

  if (isLoading) return <h2>로딩 중...</h2>;

  if (error) {
    return (
      <div>
        <h2>전체 주문내역을 불러오는데 실패했습니다</h2>
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setIsLoading(true);
            fetchOrderListData();
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (orderListData.length === 0) return <h2>주문내역이 없습니다.</h2>;

  return <OrderListView orderList={orderListData} />;
};

export default OrderListService;
