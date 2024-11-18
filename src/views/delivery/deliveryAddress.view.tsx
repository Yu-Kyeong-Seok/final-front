"use client";

import CheckBox from "@/src/components/CheckBox/CheckBox";
import styles from "./deliveryAddress.module.scss";
import cn from "classnames/bind";
// import { useState } from "react";
import { LuChevronLeft, LuAlertCircle } from "react-icons/lu";
import { useState } from "react";
// import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

export default function DeliveryAddressView() {
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
        <CheckBox
          onChange={handleChange}
          value={selectedValues}
          id="checkbox1"
          name="checkbox-group"
        />
      </section>
    </div>
  );
}
