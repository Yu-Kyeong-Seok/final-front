import OrderDetailService from "@/src/api/services/orderDetail.service";

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;

  return <OrderDetailService orderId={orderId} />;
}
