import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { findOrderByPaymentIntent } from "@/lib/checkoutStore";
import { syncOrderWithPaymentStatus } from "@/lib/orderDelivery";

function verifySignature(rawBody, providedSignature, secret) {
  if (!secret) return true;
  if (!providedSignature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const providedBuffer = Buffer.from(providedSignature, "utf8");
  if (expectedBuffer.length !== providedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, providedBuffer);
}

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-hmac-signature");
    const secret = process.env.ZIINA_WEBHOOK_SECRET || "";

    const valid = verifySignature(rawBody, signature, secret);
    if (!valid) return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });

    const payload = JSON.parse(rawBody);
    if (payload?.event !== "payment_intent.status.updated") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const intent = payload?.data || {};
    const paymentIntentId = intent.id;
    const status = intent.status;
    if (!paymentIntentId) return NextResponse.json({ ok: true, ignored: true });

    const order = await findOrderByPaymentIntent(paymentIntentId);
    if (!order) return NextResponse.json({ ok: true, ignored: true });

    await syncOrderWithPaymentStatus(order, status);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Webhook processing failed." }, { status: 500 });
  }
}
