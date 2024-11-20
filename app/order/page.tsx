// import React from "react";
// import OrderView from "@/src/views/order/order.view";

import OrderService from "@/src/api/services/order.service";

export default function OrderPage() {
  return <OrderService />;
}

// async function fetchOrderData(): Promise<IOrderResponseDTO> {
//   try {
//     // API URL이 undefined가 아닌지,,
//     const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
//     if (!apiUrl) {
//       throw new Error("API URL이 설정되지 않았습니다.");
//     }

//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) {
//       throw new Error("토큰이 없습니다");
//     }

//     const response = await fetch(`${apiUrl}api/orders`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`주문 데이터 로드 실패. 상태 코드: ${response.status}`);
//     }

//     const data: IOrderResponseDTO = await response.json();
//     return data;
//   } catch (error) {
//     console.error("주문 데이터 가져오기 중 오류 발생:", error);
//     throw error;
//   }
// }

// export default async function OrderPage() {
//   try {
//     const orderData = await fetchOrderData();
//     return (
//       <div>
//         <OrderView orderData={orderData} />
//       </div>
//     );
//   } catch (error) {
//     return (
//       <div className="error-container">
//         <h2>주문 데이터를 불러오는데 실패했습니다.</h2>
//         <p>잠시 후 다시 시도해주세요</p>
//       </div>
//     );
//   }
// }
