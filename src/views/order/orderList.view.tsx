"use client";
import styles from "./orderList.module.scss";
import cn from "classnames/bind";
import { useState } from "react";

const cx = cn.bind(styles);

/** 메뉴 id/label */
type Menu = {
  id: string;
  label: string;
};

/** 주문자 정보 */
type UserInfo = {
  id: string;
  name: string;
  // phone: string;
  // email: string;
  // address: string;
};

type OrderListProps = {
  menus: Menu[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  selectedItem?: string;
  userInfos: UserInfo[];
};

const OrderListView = (props: OrderListProps) => {
  const { menus, isOpen, selectedItem, userInfos } = props;

  const [activeTab, setActiveTab] = useState<string>(
    selectedItem || menus[0].id
  );

  const handleTabSelect = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className={cx("Wrapper")}>
      <div className={cx("TabContent", { opened: isOpen })}>
        <div className={cx("TabContentInner")}>
          <h3>{userInfos[0].name}의 주문내역</h3>
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

          {/* 선택된 탭에 맞는 콘텐츠 표시 */}
          <div className={cx("Content")}>
            {activeTab === "1" && <p>3개월 주문 내역</p>}
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
