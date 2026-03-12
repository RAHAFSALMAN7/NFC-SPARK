"use client";
import { useEffect, useMemo, useState } from "react";

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const orderId = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("order") || "";
  }, []);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;

    const fetchOrder = async () => {
      try {
        await fetch("/api/ziina/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const response = await fetch(`/api/checkout/order?order=${encodeURIComponent(orderId)}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to load order.");
        if (!cancelled) setOrder(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [orderId]);

  const isArabic = order?.locale === "ar";
  const labels = isArabic
    ? {
        title: "جاري تأكيد الدفع",
        waiting: "يرجى الانتظار، نقوم بتحديث حالة العملية...",
        paid: "تم الدفع بنجاح",
        links: "روابط الوصول للعبة",
        ready: "روابط اللعبة جاهزة أدناه.",
        pendingReady: "جاري تجهيز روابط الوصول، انتظر لحظة...",
        important: "مهم: يرجى حفظ هذا الرابط. هذا هو وصولك الدائم للعبة.",
      }
    : {
        title: "Confirming your payment",
        waiting: "Please wait while we update your payment status...",
        paid: "Payment completed successfully",
        links: "Your game access links",
        ready: "Your game links are ready below.",
        pendingReady: "Preparing your permanent access links...",
        important: "Important: Please save this link. It is your permanent access to the game.",
      };

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background: "#EBEBDF",
        color: "#080844",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          background: "white",
          borderRadius: 20,
          border: "1px solid rgba(8,8,68,0.08)",
          padding: 28,
        }}
      >
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 28, marginBottom: 12 }}>{labels.title}</h1>
        {error ? (
          <p>{error}</p>
        ) : !order ? (
          <p>{labels.waiting}</p>
        ) : (
          <>
            <p style={{ marginBottom: 12 }}>
              {order.status === "completed" ? labels.paid : labels.waiting}
            </p>
            {order.status === "completed" && order.accessLinks?.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, marginBottom: 10 }}>{labels.links}</h2>
                <div style={{ display: "grid", gap: 8 }}>
                  {order.accessLinks.map((link) => (
                    <div
                      key={link.id}
                      style={{
                        border: "1px solid rgba(8,8,68,0.12)",
                        borderRadius: 10,
                        padding: "10px 12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 10,
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ fontWeight: 700 }}>{link.title}</span>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#080844",
                            textDecoration: "none",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          Open
                        </a>
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#4b5563",
                          background: "#f8fafc",
                          borderRadius: 8,
                          padding: "8px 10px",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {link.url}
                      </div>
                      <p style={{ marginTop: 8, fontSize: 12, color: "#B54708", fontWeight: 700 }}>
                        {labels.important}
                      </p>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 12, color: "#666", fontSize: 14 }}>
                  {order.deliveryStatus === "ready" ? labels.ready : labels.pendingReady}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
