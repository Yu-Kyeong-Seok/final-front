"use client";
import styles from "./orderList.module.scss";
import cn from "classnames/bind";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

/** 메뉴 id/label */
type Menu = {
  id: string;
  label: string;
};

/** 주문 아이템 */
type OrderItem = {
  /** 아이템 id */
  id: number;
  /** 아이템 이름 */
  name: string;
  /** 수량 */
  quantity: number;
  /** 현재가격 */
  currentPrice: number;
  /** 원가격 */
  originalPrice: number;
  /** 이미지 */
  image: string;
};

/** 주문자 정보 */
// type UserInfo = {
//   id: string;
//   name: string;
//   // phone: string;
//   // email: string;
//   // address: string;
// };

type OrderListProps = {
  menus: Menu[];
  isOpen: boolean;
  // onClose: () => void;
  title?: string;
  selectedItem?: string;
  // userInfos: UserInfo[];
  orderDate?: Date;
  orderTime?: Date;
  orderItems: OrderItem[];
  /** 주문번호 */
  orderNumber: string;
  /** 주문상태 */
  orderStatus: "주문완료" | "배송중" | "배송완료";
  paymentMethod: "신용카드" | "간편결제" | "휴대폰결제";
};

/** 날짜 변환 YYYY-MM-DD */
function formatDate(date: Date | undefined): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

/** 시간 변환 HH:MM */
function formatTime(time: Date | undefined): string {
  if (!time) return "";
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  return `${hours}시 ${minutes}분`;
}

const OrderListView = (props: OrderListProps) => {
  const {
    menus,
    isOpen,
    selectedItem,
    orderDate,
    orderTime,
    orderItems,
    orderNumber,
    orderStatus,
    paymentMethod,
  } = props;

  const [activeTab, setActiveTab] = useState<string>(
    selectedItem || menus[0].id
  );

  const handleTabSelect = (id: string) => {
    setActiveTab(id);
  };

  /** 아이템 텍스트 길이 제한 */
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  /** 버튼 클릭 시 페이지 이동 */
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  /** 현재금액 * 수량 */
  const totalAmount = orderItems.reduce((sum, item) => {
    return sum + item.currentPrice * item.quantity;
  }, 0);

  /** 배송비 계산 */
  const deliveryFee = totalAmount >= 40000 ? 0 : 3000;

  /** 결제 예정 금액 */
  const totalPayment = totalAmount + deliveryFee;

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("Inner")}>
        <div className={cx("TabAll", { opened: isOpen })}>
          {/* <div className={cx("PageHeader")}>
              <h3>{userInfos[0].name}님의 주문내역</h3>
            </div> */}

          {/* 탭 메뉴 버튼 */}
          <div className={cx("TabMenu")}>
            {menus.map((menu) => (
              <button
                key={menu.id}
                className={cx("TabButton", { active: activeTab === menu.id })}
                onClick={() => handleTabSelect(menu.id)}
              >
                {menu.label}
              </button>
            ))}
          </div>

          {/* 탭 컨텐츠 */}
          <div className={cx("TabContent")}>
            {activeTab === "1" && (
              <section>
                <div className={cx("OrderItemText")}>
                  <div className={cx("DateAndTime")}>
                    <span>{formatDate(orderDate)}</span>
                    <span> ({formatTime(orderTime)})</span>
                  </div>
                  <span
                    onClick={() => handleClick("/order/detail")}
                    className={cx("OrderDetail")}
                  >
                    주문상세&nbsp; <HiChevronRight />
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
                    <li>
                      {orderItems.length === 1
                        ? truncateText(orderItems[0].name, 20)
                        : `${truncateText(orderItems[0].name, 20)} 외 ${orderItems.length - 1}건...`}
                    </li>
                    <li>{orderNumber}</li>
                    <li>{paymentMethod}</li>
                    <li> {totalPayment.toLocaleString()}원</li>
                    <li>{orderStatus}</li>
                  </ul>
                </div>
              </section>
            )}
            {activeTab === "2" && <p>6개월 주문 내역</p>}
            {activeTab === "3" && <p>1년 주문 내역</p>}
            {activeTab === "4" && <p>3년 주문 내역</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListView;
