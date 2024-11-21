import DeliveryAddressEditService from "@/src/api/services/deliveryAddressEdit.service";

export default function DeliveryAddressEditPage({
  params,
}: {
  params: { id: string };
}) {
  const deliveryId = params.id;

  return (
    <div>
      <DeliveryAddressEditService deliveryId={deliveryId} />
    </div>
  );
}
