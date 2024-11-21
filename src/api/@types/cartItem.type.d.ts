export interface CartItem {
  cartItemId: string; //주문 상품 ID
  product: {
    //주문 상품 제목
    id: string; //제품 ID
    productName: string; //제품명
    sales: number; //제품 할인가
  };
  quantity: number; //주문 수량
  totalPrice: number; //주문 총 가격
  cartId: string; //장바구니 ID
}
