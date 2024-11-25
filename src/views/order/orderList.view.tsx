import { useMemo } from "react";
import styles from "./orderList.module.scss";
import cn from "classnames/bind";
import { HiChevronRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { IOrderListResponseDTO } from "@/src/api/@types/order.type";

const cx = cn.bind(styles);

interface OrderListViewProps {
  orderList: IOrderListResponseDTO;
}

export default function OrderListView({ orderList }: OrderListViewProps) {
  const router = useRouter();

  // 결제 방법 맵핑하기
  const getPaymentMethodText = (method: string) => {
    const methodMap: { [key: string]: string } = {
      MOBILE_PAYMENT: "휴대폰",
      KAKAO_PAY: "카카오페이",
      CREDIT_CARD: "신용카드",
      SIMPLE_PAY: "간편결제",
    };
    return methodMap[method] || method;
  };

  // 주문 상태 맵핑
  const getOrderStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      PAYMENT_PENDING: "주문완료",
      PAYMENT_COMPLETED: "결제완료",
      PREPARING: "상품준비중",
      SHIPPING: "배송중",
      DELIVERED: "배송완료",
    };
    return statusMap[status] || status;
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`,
      time: `${String(date.getHours()).padStart(2, "0")}시 ${String(date.getMinutes()).padStart(2, "0")}분`,
    };
  };

  // 상품명 텍스트 길이 제한
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  // 주문상세 페이지로 이동
  const handleOrderDetailClick = (orderId: string) => {
    router.push(`/order/${orderId}`);
  };

  // 주문내역 최신순 정렬
  const sortedOrders = useMemo(() => {
    return [...orderList.results].sort((a, b) => {
      return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
    });
  }, [orderList.results]);

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("Inner")}>
        <div className={cx("TabAll")}>
          <div className={cx("TabMenu")}></div>

          <div className={cx("TabContent")}>
            {sortedOrders.map((order) => {
              const { date, time } = formatDate(order.orderDate);

              return (
                <section key={order.orderId}>
                  <div className={cx("OrderItemText")}>
                    <div className={cx("DateAndTime")}>
                      <span>{date}</span>
                      <span> ({time})</span>
                    </div>
                    <span
                      onClick={() => handleOrderDetailClick(order.orderId)}
                      className={cx("OrderDetail")}
                    >
                      주문상세 <HiChevronRight />
                    </span>
                  </div>

                  <div className={cx("OrderListText")}>
                    <ul className={cx("OrderValue")}>
                      <li>상품명</li>
                      <li>주문번호</li>
                      <li>결제방법</li>
                      <li>결제금액</li>
                      <li>주문상태</li>
                    </ul>
                    <ul>
                      <li key={order.orderId}>
                        <ul>
                          <li>
                            {order.orderItem.length === 1
                              ? truncateText(
                                  order.orderItem[0].product.productName,
                                  20
                                )
                              : `${truncateText(order.orderItem[0].product.productName, 20)} 외 ${order.orderItem.length - 1}건`}
                          </li>
                          <li>{order.orderId}</li>
                          <li>{getPaymentMethodText(order.paymentMethod)}</li>
                          <li>{order.totalPaymentAmount.toLocaleString()}원</li>
                          <li>{getOrderStatusText(order.orderStatus || "")}</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
