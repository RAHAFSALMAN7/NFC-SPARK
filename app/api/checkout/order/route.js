import { NextResponse } from "next/server";
import { getOrder } from "@/lib/checkoutStore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order");
  if (!orderId) return NextResponse.json({ error: "order query param is required." }, { status: 400 });

  const order = await getOrder(orderId);
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });

  return NextResponse.json({
    id: order.id,
    status: order.status,
    locale: order.locale,
    email: order.email,
    deliveryStatus: order.deliveryStatus,
    accessLinks: order.accessLinks || [],
    totalPriceSar: order.totalPriceSar,
    currencyCode: order.currencyCode || "SAR",
  });
}
