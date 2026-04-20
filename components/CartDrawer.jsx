"use client";
import { useState } from "react";
import { NAVY, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function CartDrawer({ t, cartItems, cartOpen, setCartOpen, totalPrice, currencyCode, removeFromCart }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    if (totalPrice <= 0 || loading) return;
    setLoading(true);
    try {
      const items = cartItems
        .map((item) => `- ${item.name} x${item.qty} (${item.price})`)
        .join("\n");
      const message = [
        "Hi ZUCCESS, I want to place an order:",
        "",
        items,
        "",
        `Total: ${totalPrice} ${currencyCode}`,
        email ? `Email: ${email}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const separator = WHATSAPP_LINK.includes("?") ? "&" : "?";
      const checkoutUrl = `${WHATSAPP_LINK}${separator}text=${encodeURIComponent(message)}`;
      setCartOpen(false);
      window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    } catch (_error) {
      window.location.href = WHATSAPP_LINK;
    } finally {
      setLoading(false);
    }
  };

  if (!cartOpen) return null;
  return (
    <div style={{ position: "fixed", top: 0, right: t.dir === "rtl" ? "auto" : 0, left: t.dir === "rtl" ? 0 : "auto", bottom: 0, width: 320, background: "white", zIndex: 2000, boxShadow: "-10px 0 40px rgba(0,0,0,0.15)", padding: 24, overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ fontFamily: "Poppins, sans-serif", color: NAVY, fontWeight: 800 }}>{t.nav.cart}</h3>
        <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: NAVY }}>✕</button>
      </div>
      {cartItems.length === 0 ? (
        <p style={{ color: "#888", fontFamily: "Nunito, sans-serif", fontSize: 14 }}>{t.cart.empty}</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div>
                <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: NAVY }}>{item.name}</div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 12, color: "#888" }}>×{item.qty}</div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginTop: 6,
                    border: "none",
                    background: "transparent",
                    color: ORANGE,
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {t.cart.removeOne}
                </button>
              </div>
              <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 800, color: NAVY }}>{item.price}</div>
            </div>
          ))}
          <div style={{ marginTop: 20, padding: "16px 0", borderTop: "2px solid rgba(8,8,68,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, color: NAVY }}>{t.cart.total}</span>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, color: NAVY, fontSize: 18 }}>{totalPrice} {currencyCode}</span>
            </div>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.cart.emailPlaceholder}
              style={{ width: "100%", border: "1px solid rgba(8,8,68,0.15)", borderRadius: 8, padding: "10px 12px", fontFamily: "Nunito, sans-serif", fontSize: 13, marginBottom: 10, outline: "none" }}
            />
            <button
              onClick={onCheckout}
              style={{
                width: "100%",
                background: ORANGE,
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: 14,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: totalPrice > 0 ? "auto" : "none",
                opacity: totalPrice > 0 ? 1 : 0.6,
              }}
            >
              {loading ? t.cart.processing : t.cart.checkout}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
