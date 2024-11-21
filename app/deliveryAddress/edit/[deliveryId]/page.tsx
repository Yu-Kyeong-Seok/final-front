import DeliveryAddressEditView from "@/src/views/delivery/deliveryAddrssEdit.view";

export default function DeliveryPage() {
  return (
    <div>
      <DeliveryAddressEditView deliveryAddress={deliveryAddress} />
    </div>
  );
}
