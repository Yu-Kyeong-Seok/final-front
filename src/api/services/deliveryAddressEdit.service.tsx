"use client";

export const updateDeliveryAddress = async (id: string, updatedData: any) => {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
    if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

    const accessToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="))
      ?.split("=")[1];

    if (!accessToken) throw new Error("토큰이 없습니다");

    const response = await fetch(`${apiUrl}/api/deliveries/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(
        `배송지 수정에 실패했습니다. 상태 코드: ${response.status}`
      );
    }

    return true; // 성공 시 true 반환
  } catch (err) {
    console.error(err);
    throw new Error(
      err instanceof Error ? err.message : "서버 오류로 수정에 실패했습니다."
    );
  }
};

export const deleteDeliveryAddress = async (id: string) => {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

    if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

    const accessToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="))
      ?.split("=")[1];

    if (!accessToken) throw new Error("토큰이 없습니다");

    const response = await fetch(`${apiUrl}/api/deliveries/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("배송지 삭제에 실패했습니다.");
    }

    return true; // 성공 시 true 반환
  } catch (err) {
    console.error(err);
    throw new Error(
      err instanceof Error ? err.message : "서버 오류로 삭제에 실패했습니다."
    );
  }
};
