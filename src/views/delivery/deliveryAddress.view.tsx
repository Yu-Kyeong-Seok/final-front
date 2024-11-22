"use client";

// import CheckBox from "@/src/components/CheckBox/CheckBox";
import styles from "./deliveryAddress.module.scss";
import cn from "classnames/bind";
import { LuChevronLeft, LuAlertCircle, LuPencil } from "react-icons/lu";
// import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeliveryAddress } from "@/src/api/@types/delivery.type";

const cx = cn.bind(styles);

type DeliveryAddressViewProps = {
  deliveryAddresses: DeliveryAddress[];
};

export default function DeliveryAddressView(props: DeliveryAddressViewProps) {
  const { deliveryAddresses } = props;

  /** 버튼 클릭 시 페이지 이동 */
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  /** 뒤로가기 */
  const handleBack = () => {
    router.back();
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("PageHeader")}>
        <a onClick={handleBack}>
          <LuChevronLeft />
        </a>
        <h3>배송지 목록</h3>
        <a className={cx("AddAdress")} onClick={() => handleClick("/delivery")}>
          추가
        </a>
      </div>
      <span className={cx("DeliveryAlertText")}>
        <LuAlertCircle /> 배송지에 따라 상품정보 및 배송유형이 달라질 수
        있습니다.
      </span>

      <section>
        {deliveryAddresses.length > 0 ? (
          deliveryAddresses.map((address) => (
            <div key={address._id} className={cx("AddressList")}>
              <ul>
                <li className={address.isDefault ? cx("DefaultAddress") : ""}>
                  {address.isDefault ? "기본배송지" : null}
                </li>
                <li className={cx("AddressItem")}>
                  {address.defaultAddress} {address.detailAddress}
                </li>
                <li>
                  <ul className={cx("AddressUser")}>
                    <li>{address.name}</li>
                    <li>{address.number}</li>
                  </ul>
                </li>
                <li className={cx("DeliveryType")}>샛별배송</li>
              </ul>
              <span
                onClick={() =>
                  handleClick(`/deliveryAddress/edit/${address._id}`)
                }
              >
                <LuPencil />
              </span>
            </div>
          ))
        ) : (
          <p>등록된 배송지가 없습니다.</p>
        )}
      </section>
    </div>
  );
}
