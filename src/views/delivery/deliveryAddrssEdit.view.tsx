"use client";

import { useRouter } from "next/navigation";
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
  // deliveryAddresses: DeliveryAddress[]; // 전체 배송지 목록
  onUpdate: (updatedData: DeliveryAddress) => void;
  onDelete: () => void;
};

export default function DeliveryAddressEditView({
  deliveryData,
  // deliveryAddresses,
  onUpdate,
  onDelete,
}: DeliveryAddressEditViewProps) {
  const router = useRouter();

  // 로컬 데이터관리 (입력값을 임시로 관리함!)
  const [localData, setLocalData] = useState<DeliveryAddress>({
    ...deliveryData,
  });

  // input 입력값 변경 핸들러
  const handleInputChange = (
    field: keyof DeliveryAddress,
    value: string | number
  ) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 체크박스 변경 핸들러
  // const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const isChecked = e.target.checked;

  //   const updatedIsDefault = isChecked ? ["isDefault"] : [];
  //   setLocalData((prev) => ({
  //     ...prev,
  //     isDefault: updatedIsDefault.length > 0,
  //   }));
  // };

  // 뒤로가기
  const handleBack = () => {
    router.back(); //이전 페이지로 이동
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("PageHeader")}>
        <a onClick={handleBack}>
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

        <div className={cx("CheckBoxWrap")}>
          <CheckBox
            id="isDefault"
            label={
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                기본 배송지로 저장
              </span>
            }
            value={localData.isDefault ? ["isDefault"] : []}
            // checked={localData.isDefault || false}
            onChange={(e) => {
              const isChecked = e.target.checked;

              if (!isChecked && localData.isDefault) {
                const confirmUnset =
                  window.confirm("기본 배송지를 해제하시겠습니까?");
                if (confirmUnset) {
                  setLocalData((prev) => ({
                    ...prev,
                    isDefault: false,
                  }));
                }
                return;
              }

              // 상태 업데이트
              setLocalData((prev) => ({
                ...prev,
                isDefault: isChecked,
              }));
            }}
          />
        </div>

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
