"use client";

import { useState, useEffect } from "react";
import { DeliveryAddress } from "@/src/api/@types/delivery.type";
import DeliveryAddressEditView from "@/src/views/delivery/deliveryAddrssEdit.view";

const DeliveryAddressEditService = ({ deliveryId }: { deliveryId: string }) => {
  const [deliveryData, setDeliveryData] = useState<DeliveryAddress | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  // Fetch 배송지 데이터
  const fetchDeliveryAddress = async () => {
    try {
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/deliveries/${deliveryId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("배송지 정보를 가져올 수 없습니다.");

      const data = await response.json();
      setDeliveryData(data || null);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Update 배송지 데이터
  const updateDeliveryAddress = async (updatedData: DeliveryAddress) => {
    try {
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/deliveries/${deliveryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        setModalMessage("배송지 수정에 실패했습니다.");
        setIsModalOpen(true);
        return;
      }

      setModalMessage("배송지가 수정되었습니다.");
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      setModalMessage("배송지 수정 중 문제가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  // Delete 배송지 데이터
  const deleteDeliveryAddress = async () => {
    if (!confirm) {
      setModalMessage("이 배송지를 삭제하시겠습니까?");
      setIsModalOpen(true);
      return;
    }

    try {
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch(`${apiUrl}/api/deliveries/${deliveryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setModalMessage("배송지 삭제에 실패했습니다.");
        setIsModalOpen(true);
        return;
      }

      setModalMessage("배송지가 삭제되었습니다.");
      setIsModalOpen(true);
      // router.push() 제거 - view에서 처리할 예정
    } catch (error) {
      console.error(error);
      setModalMessage("배송지 삭제 중 문제가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    fetchDeliveryAddress();
  }, [deliveryId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchDeliveryAddress}>다시 시도</button>
      </div>
    );

  if (!deliveryData) return <div>배송지 정보를 가져올 수 없습니다.</div>;

  return (
    <DeliveryAddressEditView
      deliveryData={deliveryData}
      onUpdate={updateDeliveryAddress}
      onDelete={deleteDeliveryAddress}
      modalMessage={modalMessage}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      // onBack={() => router.push("/deliveryAddress")}
    />
  );
};

export default DeliveryAddressEditService;
