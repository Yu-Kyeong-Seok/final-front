"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DeliveryAddress } from "@/src/api/@types/delivery.type";
import {
  fetchDeliveryAddress,
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
  deliveryAddressId: string;
};

export default function DeliveryAddressEditView({
  deliveryAddressId,
}: DeliveryAddressEditViewProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<DeliveryAddress>>({
    name: "",
    postalCode: 0,
    defaultAddress: "",
    detailAddress: "",
    number: "",
    isDefault: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDeliveryAddressData = async () => {
      try {
        const data = await fetchDeliveryAddress(deliveryAddressId);
        setFormData(data);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "서버 오류가 발생했습니다."
        );
        setIsLoading(false);
      }
    };

    loadDeliveryAddressData();
  }, [deliveryAddressId]);

  const handleUpdate = async () => {
    try {
      await updateDeliveryAddress(deliveryAddressId, formData);
      alert("배송지가 수정되었습니다.");
      router.push("/deliveryAddress");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "배송지 수정에 실패했습니다."
      );
    }
  };

  const handleDelete = async () => {
    if (confirm("정말로 이 배송지를 삭제하시겠습니까?")) {
      try {
        await deleteDeliveryAddress(deliveryAddressId);
        alert("배송지가 삭제되었습니다.");
        router.push("/deliveryAddress");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "배송지 삭제에 실패했습니다."
        );
      }
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("PageHeader")}>
        <a onClick={() => router.push("/deliveryAddress")}>
          <LuChevronLeft />
        </a>
        <h3>배송지 수정</h3>
      </div>

      <div className={cx("Form")}>
        <Input
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          value={formData.postalCode?.toString() || ""}
          onChange={(e) =>
            setFormData({ ...formData, postalCode: Number(e.target.value) })
          }
        />
        <Input
          value={formData.defaultAddress || ""}
          onChange={(e) =>
            setFormData({ ...formData, defaultAddress: e.target.value })
          }
        />
        <Input
          value={formData.detailAddress || ""}
          onChange={(e) =>
            setFormData({ ...formData, detailAddress: e.target.value })
          }
        />
        <Input
          value={formData.number || ""}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={formData.isDefault || false}
            onChange={(e) =>
              setFormData({ ...formData, isDefault: e.target.checked })
            }
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
