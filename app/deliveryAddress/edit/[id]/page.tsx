import { Suspense } from "react";
import { notFound } from "next/navigation";
import DeliveryAddressEditView from "@/src/views/delivery/deliveryAddrssEdit.view";

type PageProps = {
  params: { id: string };
};

export default function DeliveryAddressEditPage({ params }: PageProps) {
  // id가 undefined나 빈 문자열인 경우 처리
  if (!params.id || params.id === "undefined") {
    notFound();
  }

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <DeliveryAddressEditView deliveryAddressId={params.id} />
    </Suspense>
  );
}
