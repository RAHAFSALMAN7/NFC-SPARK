import { updateOrder } from "@/lib/checkoutStore";

export async function syncOrderWithPaymentStatus(order, status) {
  let updated = await updateOrder(order.id, (current) => ({
    ...current,
    updatedAt: new Date().toISOString(),
    status,
  }));

  if (status === "completed" && updated.deliveryStatus !== "ready") {
    updated = await updateOrder(updated.id, (current) => ({
      ...current,
      updatedAt: new Date().toISOString(),
      deliveryStatus: "ready",
      deliveryChannel: "on-page",
      deliveryReason: "Automatic email is disabled. Access links are delivered on the success page.",
      paidAt: new Date().toISOString(),
    }));
  }

  return updated;
}
