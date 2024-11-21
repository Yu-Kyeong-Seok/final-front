import { DeliveryAddress } from "@/src/api/@types/delivery.type";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

const getAccessToken = (): string | null => {
  const accessToken = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("accessToken="))
    ?.split("=")[1];
  if (!accessToken) {
    throw new Error("토큰이 없습니다");
  }
  return accessToken;
};

// 배송지 상세 조회
export const fetchDeliveryAddress = async (
  id: string
): Promise<DeliveryAddress> => {
  console.log("배송지 조회 id:", id);
  const response = await fetch(`${API_URL}/api/deliveries/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("배송지 정보를 불러오지 못했습니다.");
  }

  const data = await response.json();

  // 데이터 확인용 console.log
  console.log("배송지 상세 조회 응답:", data);

  // _id를 id로 매핑
  const mappedData: DeliveryAddress = {
    id: data._id, // _id -> id로 변경
    userId: data.userId,
    name: data.name,
    postalCode: data.postalCode,
    defaultAddress: data.defaultAddress,
    detailAddress: data.detailAddress,
    number: data.number,
    isDefault: data.isDefault,
  };

  return mappedData;
};

// 배송지 수정
export const updateDeliveryAddress = async (
  id: string,
  updatedData: Partial<DeliveryAddress>
): Promise<void> => {
  console.log("배송지 조회 id - PUT:", id);

  const response = await fetch(`${API_URL}/api/deliveries/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(
      `배송지 수정에 실패했습니다. 상태 코드: ${response.status}`
    );
  }
};

// 배송지 삭제
export const deleteDeliveryAddress = async (id: string): Promise<void> => {
  console.log("배송지 조회 id - DELETE:", id);

  const response = await fetch(`${API_URL}/api/deliveries/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("배송지 삭제에 실패했습니다.");
  }
};
