"use client";
import { useState, useEffect } from "react";
import { DeliveryAddress } from "@/src/api/@types/delivery.type";
import DeliveryAddressView from "@/src/views/delivery/deliveryAddress.view";

// 배송지 API 서비스

const DeliveryAddressService = () => {
  const [deliveryAddressData, setDeliveryAddressData] = useState<
    DeliveryAddress[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDeliveryAddressData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/deliveries`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`주문 데이터 로드 실패. 상태 코드: ${response.status}`);

      const data: DeliveryAddress[] = await response.json();

      // 콘솔에 데이터 출력
      console.log("Fetched Delivery Addresses:", data);

      // 데이터 상태 업뎃
      setDeliveryAddressData(data);
    } catch (error) {
      console.error("장바구니 아이템 가져오기 중 오류 발생:", error);
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
    fetchDeliveryAddressData();
  }, []);

  // 로딩 상태 렌더링하기
  if (isLoading) return <div className="loading-container">로딩 중...</div>;

  // 에러 상태 렌더링
  if (error) {
    return (
      <div>
        <h2>장바구니 아이템 데이터를 불러오는데 실패했습니다</h2>
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setIsLoading(true);
            fetchDeliveryAddressData();
          }}
          className="retry-button"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (deliveryAddressData.length === 0)
    return <h2>등록된 배송지가 없습니다.</h2>;

  return <DeliveryAddressView deliveryAddresses={deliveryAddressData} />;
};

export default DeliveryAddressService;
