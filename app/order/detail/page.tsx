import OrderDetailView from "@/src/views/order/orderDetail.view";

/** 주문 아이템 */
const orderItems = [
  {
    id: 1,
    name: "칠레산 생 블루베리 125g",
    quantity: 1,
    currentPrice: 6980,
    originalPrice: 9980,
    image:
      "https://img-cf.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/shop/data/goods/1637923286553l0.jpeg",
  },
  {
    id: 2,
    name: "[Dole] 뉴질랜드 아보카도 1kg (4~7입)",
    quantity: 1,
    currentPrice: 10900,
    originalPrice: 15900,
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/1cef6b73-3e91-4a7a-8024-58b5d8cf5010.jpg",
  },
  {
    id: 3,
    name: "베키아에누보 이탈리안 올리브 치아바타",
    quantity: 2,
    currentPrice: 20900,
    originalPrice: 12300,
    image:
      "https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/e971445b-df76-482b-9502-88a64f62041f.jpg",
  },
];

/** 주문자 정보 */
// const userInfos = [
//   {
//     id: "random1",
//     name: "황다영",
//     phone: "010-0000-0000",
//     email: "1234@gmail.com",
//     address: "서울특별시 강남구 테헤란로 133 한국타이어빌딩 18층 (역삼동)",
//   },
// ];

const orderNumber = "ORD123456789";

const orderStatus = "주문완료";

/** 주문서 페이지 props 내려줌 */
export default function OrderDetailPage() {
  return (
    <OrderDetailView
      orderItems={orderItems}
      // userInfos={userInfos}
      orderNumber={orderNumber}
      orderStatus={orderStatus}
    />
  );
}
