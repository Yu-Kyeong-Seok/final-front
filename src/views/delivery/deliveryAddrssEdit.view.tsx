"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeliveryAddress } from "@/src/api/@types/delivery.type";
import {
  updateDeliveryAddress,
  deleteDeliveryAddress,
} from "@/src/api/services/deliveryAddressEdit.service";
import Input from "@/src/components/Input/Input";
import Button from "@/src/components/Button/Button";
import { LuChevronLeft } from "react-icons/lu";
import styles from "./deliveryAddressEdit.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type DeliveryAddressEditViewProps = {
  deliveryAddress: DeliveryAddress;
};

export default function DeliveryAddressEditView({
  deliveryAddress,
}: DeliveryAddressEditViewProps) {
  const [name, setName] = useState(deliveryAddress.name);
  const [postalCode, setPostalCode] = useState(deliveryAddress.postalCode);
  const [defaultAddress, setDefaultAddress] = useState(
    deliveryAddress.defaultAddress
  );
  const [detailAddress, setDetailAddress] = useState(
    deliveryAddress.detailAddress
  );
  const [number, setNumber] = useState(deliveryAddress.number);
  const [isDefault, setIsDefault] = useState(deliveryAddress.isDefault);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleUpdate = async () => {
    try {
      const updatedData = {
        name,
        postalCode,
        defaultAddress,
        detailAddress,
        number,
        isDefault,
      };

      await updateDeliveryAddress(deliveryAddress.id, updatedData);
      alert("배송지가 수정되었습니다.");
      router.push("/deliveryAddress");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "배송지 수정에 실패했습니다."
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDeliveryAddress(deliveryAddress.id);
      alert("배송지가 삭제되었습니다.");
      router.push("/deliveryAddress");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "배송지 삭제에 실패했습니다."
      );
    }
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("PageHeader")}>
        <a onClick={() => router.push("/deliveryAddress")}>
          <LuChevronLeft />
        </a>
        <h3>배송지 수정</h3>
      </div>

      {error && <p className={cx("ErrorText")}>{error}</p>}

      <div className={cx("Form")}>
        <Input
          // label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          //label="우편번호"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <Input
          //label="기본 주소"
          value={defaultAddress}
          onChange={(e) => setDefaultAddress(e.target.value)}
        />
        <Input
          //label="상세 주소"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
        <Input
          //label="전화번호"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
          />
          기본 배송지로 설정
        </label>

        <div className={cx("Buttons")}>
          <Button onClick={handleUpdate}>수정 완료</Button>
          <Button onClick={handleDelete} variants="outline">
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
