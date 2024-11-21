"use client";

import styles from "./deliveryAddressEdit.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";
import Input from "@/src/components/Input/Input";
import { LuChevronLeft } from "react-icons/lu";
import { DeliveryAddress } from "@/src/api/@types/delivery.type";
import { useState } from "react";
import CheckBox from "@/src/components/CheckBox/CheckBox";

const cx = cn.bind(styles);

type DeliveryAddressEditViewProps = {
  deliveryData: DeliveryAddress;
  onUpdate: (updatedData: DeliveryAddress) => void;
  onDelete: () => void;
  onBack: () => void;
};

export default function DeliveryAddressEditView({
  deliveryData,
  onUpdate,
  onDelete,
  onBack,
}: DeliveryAddressEditViewProps) {
  // 로컬 데이터관리 (입력값을 임시로 관리함!)
  const [localData, setLocalData] = useState<DeliveryAddress>({
    ...deliveryData,
  });

  // input 입력값 변경 핸들러
  const handleInputChange = (field: keyof DeliveryAddress, value: any) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 체크박스 변경 핸들러
  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    // isDefault가 true일 때는 배열에 "isDefault"를 넣고, 아니면 배열에서 제거
    const updatedIsDefault = isChecked ? ["isDefault"] : [];
    setLocalData((prev) => ({
      ...prev,
      isDefault: updatedIsDefault.length > 0,
    }));
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("PageHeader")}>
        <a onClick={onBack}>
          <LuChevronLeft />
        </a>
        <h3>배송지 관리</h3>
      </div>

      <div className={cx("Form")}>
        <div>
          <span className={cx("LabelTxt")}>받으실 분</span>
          <Input
            value={localData.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>

        <div>
          <span className={cx("LabelTxt")}>우편번호</span>
          <Input
            value={localData.postalCode?.toString() || ""}
            onChange={(e) =>
              handleInputChange("postalCode", Number(e.target.value))
            }
          />
        </div>

        <div>
          <span className={cx("LabelTxt")}>주소</span>
          <Input
            value={localData.defaultAddress || ""}
            onChange={(e) =>
              handleInputChange("defaultAddress", e.target.value)
            }
          />
        </div>

        <div>
          <span className={cx("LabelTxt")}>상세주소</span>
          <Input
            value={localData.detailAddress || ""}
            onChange={(e) => handleInputChange("detailAddress", e.target.value)}
          />
        </div>

        <div>
          <span className={cx("LabelTxt")}>휴대폰</span>
          <Input
            value={localData.number || ""}
            onChange={(e) => handleInputChange("number", e.target.value)}
          />
        </div>

        <CheckBox
          id="isDefault"
          label="기본 배송지로 설정"
          value={localData.isDefault ? ["isDefault"] : []} // 배열로 전달
          checked={localData.isDefault || false}
          onChange={(e) => handleInputChange("isDefault", e.target.checked)}
        />

        <div className={cx("Buttons")}>
          <Button onClick={() => onUpdate(localData)}>수정 완료</Button>
          <Button
            onClick={onDelete}
            variants="outline"
            className={cx("DeleteBtn")}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
