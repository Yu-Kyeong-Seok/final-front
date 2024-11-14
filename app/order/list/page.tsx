"use client";
import OrderListView from "@/src/views/order/orderList.view";

const menus = [
  { id: "1", label: "3개월" },
  { id: "2", label: "6개월" },
  { id: "3", label: "1년" },
  { id: "4", label: "3년" },
];

const userInfos = [
  {
    id: "random1",
    name: "황다영",
    // phone: "010-0000-0000",
    // email: "1234@gmail.com",
    // address: "서울특별시 강남구 테헤란로 133 한국타이어빌딩 18층 (역삼동)",
  },
];

// const title = "주문 내역";

export default function OrderDetailPage() {
  const handleClose = () => {
    console.log("닫힘");
  };

  return (
    <OrderListView
      menus={menus}
      // title={title}
      isOpen={true}
      onClose={handleClose}
      selectedItem="1" // 기본 선택 메뉴 설정
      userInfos={userInfos}
    />
  );
}
