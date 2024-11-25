// export interface CartItem {
//   cartItemId: string;
//   cartId: string; // 사용자의 고유 장바구니 ID
//   product: {
//     id: string;
//     productName: string;
//     sales: number;
//     price: number;
//     thumbnail: string;
//   };
//   quantity: number;
//   totalPrice: number;
// }

// export interface CartItem {
//   cartId: string;
//   cartItem: [
//     cartId: string, //장바구니 ID
//     id: string,
//     // 장바구니 상품 정보
//     product: {
//       id: string; //제품 ID
//       productName: string; //제품명
//       sales: number; //할인가
//       thumbnail?: string;
//     },
//     quantity: number, //수량
//     totalPrice: number, // 상품별 총 가격
//   ];
//   totalProductPrice: number; //상품 총 가격  (배송비 제외)
//   shippingFee: number; // 배송비
//   totalPaymentAmount: number; // 결제예정금액 (상품 가격 + 배송비)
//   userId: string;
// }

export interface CartItem {
  id: string;
  cartItem: CartItemDetail[];
  totalProductPrice: number;
  shippingFee: number;
  totalPaymentAmount: number;
  userId: string;
}

export interface CartItemDetail {
  id: string;
  product: {
    id: string;
    productName: string;
    sales: number;
    thumbnail?: string;
  };
  quantity: number;
  totalPrice: number;
  cartId: string;
}
