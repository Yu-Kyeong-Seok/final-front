type PaymentMethod =
  | "CREDIT_CARD"
  | "SIMPLE_PAY"
  | "MOBILE_PAYMENT"
  | "KAKAO_PAY";

export type OrderStatus =
  | "PAYMENT_PENDING"
  | "PAYMENT_COMPLETED"
  | "ORDER_CANCELED"
  | "PREPARING_FOR_SHIPPING"
  | "SHIPPING"
  | "SHIPPED"
  | "PARTIAL_REFUND_REQUESTED"
  | "FULL_REFUND_REQUESTED"
  | "PARTIAL_REFUNDED"
  | "FULL_REFUNDED"
  | "PARTIAL_EXCHANGE_REQUESTED"
  | "PARTIAL_EXCHANGED"
  | "FULL_EXCHANGE_REQUESTED"
  | "FULL_EXCHANGED";

export interface IOrder {
  /** 주문 ID */
  id: string;
  userId: string;
  /** 주문 회원 정보  */
  userInfo: IProfile;
  /** 배송지 */
  deliveryAddress: string;
  /** 배송요청사항 */
  deliveryRequest?: string;
  /** 주문날짜 */
  createdAt: Date;
  /** 결제수단 */
  paymentMethod: PaymentMethod;
  /** 주문 상품 정보 (상품 정보, 가격정보) */
  orderItem: IOrderItem[];
  /** 총 상품 가격 */
  totalProductPrice: number;
  /** 배송비 */
  shippingFee: number;
  /** 결제예정금액 */
  totalPaymentAmount: number;
  /** 주문상태 */
  orderStatus?: OrderStatus;
}

// 주문 생성 응담 DTO
export interface IOrderResponseDTO {
  orderId: string;
  userId: string;
  userInfo: {
    firstName: string;
    phoneNum: string;
  };
  deliveryAddress: string;
  deliveryRequest?: string;
  orderDate: string;
  paymentMethod: PaymentMethod;
  orderItem: {
    id: string;
    product: {
      id: string;
      productName: string;
      sales: number;
      price: number;
      thumbnail: File | Blob | null;
    };
    quantity: number;
    totalPrice: number;
    orderItemStatus: OrderItemStatus;
  }[];
  totalProductPrice: number;
  shippingFee: number;
  totalPaymentAmount: number;
  orderStatus?: OrderStatus;
}

// 주문 목록 조회 응담 DTO => 응답 확인시 results안에 쌓여있어서 따로 만들어줌
export interface IOrderListResponseDTO {
  results: IOrderResponseDTO[];
}

type OrderItemStatus =
  | "PAYMENT_PENDING"
  | "PAYMENT_COMPLETED"
  | "ORDER_CANCELED"
  | "PREPARING_FOR_SHIPPING"
  | "SHIPPING"
  | "SHIPPED"
  | "REFUND_REQUESTED"
  | "REFUNDED"
  | "EXCHANGE_REQUESTED"
  | "EXCHANGED";

type OrderItemStatus = keyof typeof ORDER_ITEM_STATUS;

interface IOrderItem {
  /** 주문 상품 ID */
  productId: string;
  product: IProduct;
  /** 주문 수량 */
  quantity: number;
  /** 주문 총 가격 */
  totalPrice: number;
  /** 주문 상태 (주문상품별) */
  orderItemStatus: OrderItemStatus;
}

interface IOrderItemResponseDTO {
  /** 주문 상품 ID */
  orderItemId: string;
  /** 주문 상품 제목 */
  product: {
    id: string;
    productName: string;
    sales: number;
    price: number;
    thumbnail: File | Blob | null;
  };
  /** 주문 수량 */
  quantity: number;
  /** 주문 총 가격 */
  totalPrice: number;
  /** 주문 상태 (주문상품별) */
  orderItemStatus: OrderItemStatus;
}

//------------------------------------------------//

// 주문 생성 요청을 위한 타입
export interface CreateOrderRequest {
  deliveryAddress: string;
  deliveryRequest?: string;
  paymentMethod: PaymentMethod;
  orderItem: OrderRequestItem[];
  totalProductPrice: number;
  shippingFee: number;
  totalPaymentAmount: number;
  orderStatus: orderStatus;
}

// 주문 요청 시 사용할 상품 아이템 타입
interface OrderRequestItem {
  product: string;
  quantity: number;
  totalPrice: number;
  orderItemStatus: OrderItemStatus;
}
