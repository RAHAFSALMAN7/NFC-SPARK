import { NextResponse } from "next/server";
import { getOrder } from "@/lib/checkoutStore";
import { syncOrderWithPaymentStatus } from "@/lib/orderDelivery";

export async function POST(request) {
  try {
    const token = process.env.ZIINA_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Missing ZIINA_ACCESS_TOKEN environment variable." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const orderId = body?.orderId;
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required." }, { status: 400 });
    }

    const order = await getOrder(orderId);
    if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    if (!order.paymentIntentId) {
      return NextResponse.json({ error: "Order has no payment intent." }, { status: 400 });
    }

    const response = await fetch(
      `https://api-v2.ziina.com/api/payment_intent/${encodeURIComponent(order.paymentIntentId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json(
        { error: `Unable to confirm payment with Ziina: ${details}` },
        { status: 502 }
      );
    }

    const intent = await response.json();
    const status = intent?.status || "pending";
    const updatedOrder = await syncOrderWithPaymentStatus(order, status);
    return NextResponse.json({
      ok: true,
      status: updatedOrder.status,
      deliveryStatus: updatedOrder.deliveryStatus,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Payment confirmation failed." },
      { status: 500 }
    );
  }
}
