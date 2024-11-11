import OrderCompleteView from "@/src/views/order/orderComplete.view";

/** props로 내려줄 것 => view 컴포넌트로 */

/** 주문서 페이지 */
export default function OrderPage() {
  return <OrderView orderItems={orderItems} userInfos={userInfos} />;
}

/** 주문완료 페이지 */
