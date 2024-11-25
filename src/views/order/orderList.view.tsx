import { useState, useMemo } from "react";
import styles from "./orderList.module.scss";
import cn from "classnames/bind";
import { HiChevronRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { IOrderListResponseDTO } from "@/src/api/@types/order.type";

const cx = cn.bind(styles);

// 메뉴 타입 정의
const MENU_ITEMS = [
  { id: "1", label: "3개월" },
  { id: "2", label: "6개월" },
  { id: "3", label: "1년" },
  { id: "4", label: "3년" },
] as const;

interface OrderListViewProps {
  orderList: IOrderListResponseDTO;
}

export default function OrderListView({ orderList }: OrderListViewProps) {
  const [activeTab, setActiveTab] = useState<string>(MENU_ITEMS[0].id);
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

  // 기간별 주문 필터링
  const getFilteredOrders = useMemo(() => {
    const now = new Date();
    const monthsAgo = (months: number) => {
      const date = new Date();
      date.setMonth(date.getMonth() - months);
      return date;
    };

    const filterMap = {
      "1": monthsAgo(3),
      "2": monthsAgo(6),
      "3": monthsAgo(12),
      "4": monthsAgo(36),
    };

    return orderList.results.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= filterMap[activeTab as keyof typeof filterMap];
    });
  }, [orderList.results, activeTab]);

  // const filteredOrders = getFilteredOrders();

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("Inner")}>
        <div className={cx("TabAll")}>
          {/* 탭 메뉴 버튼 */}
          <div className={cx("TabMenu")}>
            {MENU_ITEMS.map((menu) => (
              <button
                key={menu.id}
                className={cx("TabButton", { active: activeTab === menu.id })}
                onClick={() => setActiveTab(menu.id)}
              >
                {menu.label}
              </button>
            ))}
          </div>

          {/* 탭 컨텐츠 */}
          <div className={cx("TabContent")}>
            {getFilteredOrders.map((order) => {
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
