"use client";

import CheckBox from "@/src/components/CheckBox/CheckBox";
import styles from "./deliveryAddress.module.scss";
import cn from "classnames/bind";
// import { useState } from "react";
import { LuChevronLeft, LuAlertCircle, LuPencil } from "react-icons/lu";
import { useState } from "react";
// import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

/** 주문자 정보 */
type UserInfo = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

type OrderViewProps = {
  // orderItems: OrderItem[];
  userInfos: UserInfo[];
};

export default function DeliveryAddressView(props: OrderViewProps) {
  const { userInfos } = props;

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    setSelectedValues((prev) =>
      checked ? [...prev, id] : prev.filter((value) => value !== id)
    );
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("PageHeader")}>
        <a>
          <LuChevronLeft />
        </a>
        <h3>배송지 관리</h3>
        <a className={cx("AddAdress")}>추가</a>
      </div>
      <span className={cx("DeliveryAlertText")}>
        <LuAlertCircle /> 배송지에 따라 상품정보 및 배송유형이 달라질 수
        있습니다.
      </span>

      <section>
        <div className={cx("AddressList")}>
          <CheckBox
            onChange={handleChange}
            value={selectedValues}
            id="checkbox1"
            name="checkbox-group"
          />
          <ul>
            <li className={cx("AddressItem")}>{userInfos[0].address}</li>
            <li>
              <ul className={cx("AddressUser")}>
                <li>{userInfos[0].name}</li>
                <li>{userInfos[0].phone}</li>
              </ul>
            </li>
            <li className={cx("DeliveryType")}>샛별배송</li>
          </ul>
          <span>
            <LuPencil />
          </span>
        </div>
      </section>
    </div>
  );
}
