import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createOrder, updateOrder } from "@/lib/checkoutStore";
import { resolveAccessLinks } from "@/lib/gameAccess";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

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
    const { totalPrice, totalPriceSar, currencyCode, cartItems, locale, email } = body || {};
    const finalTotal = Number(totalPrice ?? totalPriceSar);
    const finalCurrency = (currencyCode || "SAR").toUpperCase();
    const allowedCurrencies = new Set(["SAR", "AED"]);

    if (!finalTotal || finalTotal <= 0 || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: "Invalid checkout payload." }, { status: 400 });
    }
    if (!allowedCurrencies.has(finalCurrency)) {
      return NextResponse.json({ error: "Unsupported currency." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required to send game access links." }, { status: 400 });
    }

    const orderId = randomUUID();
    const baseUrl = getBaseUrl();
    const successUrl = `${baseUrl}/checkout/success?order=${orderId}`;
    const cancelUrl = `${baseUrl}/checkout/cancel?order=${orderId}`;
    const amountMinor = Math.round(finalTotal * 100);

    const accessLinks = resolveAccessLinks(cartItems);

    await createOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending",
      locale: locale || "en",
      email,
      totalPriceSar: finalTotal,
      currencyCode: finalCurrency,
      amountMinor,
      cartItems,
      accessLinks,
      paymentIntentId: null,
      checkoutUrl: null,
      deliveryStatus: "pending",
    });

    const ziinaResponse = await fetch("https://api-v2.ziina.com/api/payment_intent", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountMinor,
        currency_code: finalCurrency,
        message: `ZUCCESS checkout ${orderId}`,
        success_url: successUrl,
        cancel_url: cancelUrl,
        failure_url: cancelUrl,
        test: process.env.ZIINA_TEST_MODE === "true",
      }),
    });

    if (!ziinaResponse.ok) {
      const errorText = await ziinaResponse.text();
      return NextResponse.json(
        { error: `Ziina create payment intent failed: ${errorText}` },
        { status: 502 }
      );
    }

    const paymentIntent = await ziinaResponse.json();
    const checkoutUrl =
      paymentIntent.redirect_url || paymentIntent.payment_url || paymentIntent.url || null;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "Ziina response did not include a checkout URL." },
        { status: 502 }
      );
    }

    await updateOrder(orderId, (current) => ({
      ...current,
      updatedAt: new Date().toISOString(),
      paymentIntentId: paymentIntent.id || null,
      checkoutUrl,
    }));

    return NextResponse.json({ checkoutUrl, orderId });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Checkout failed." }, { status: 500 });
  }
}
