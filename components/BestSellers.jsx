"use client";
import ProductCard from "./ProductCard";
import { NAVY, BEIGE, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function BestSellers({ t, addToCart }) {
  const sectionStyle = { maxWidth: 1100, margin: "0 auto", padding: "80px 24px" };
  const titleStyle = { fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: NAVY, fontFamily: "Poppins, sans-serif", textAlign: "center", marginBottom: 12 };
  const subStyle = { fontSize: 16, color: "#666", fontFamily: "Nunito, sans-serif", textAlign: "center", marginBottom: 52, maxWidth: 560, margin: "0 auto 52px" };

  return (
    <section id="shop" style={{ background: BEIGE }}>
      <div style={sectionStyle}>
        <h2 style={titleStyle}>{t.bestSellers.title}</h2>
        <p style={subStyle}>{t.bestSellers.sub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {t.bestSellers.products.map(product => (
            <ProductCard key={product.id} product={product} t={t.bestSellers} onAdd={addToCart} />
          ))}
        </div>
        {/* Car Showroom special card */}
        <div style={{ marginTop: 24, background: `linear-gradient(135deg, ${NAVY}, #1a1a6e)`, borderRadius: 24, padding: "32px 36px", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <span style={{ background: ORANGE, color: "white", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>For Showrooms</span>
            <h3 style={{ color: "white", fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 800, margin: "10px 0 8px" }}>Car Showroom NFC Card</h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Nunito, sans-serif", fontSize: 13, lineHeight: 1.6, maxWidth: 400 }}>Each car gets its own NFC card. Tap to instantly view the car video, full specs, pricing, and a direct WhatsApp CTA — no app required.</p>
            <div style={{ marginTop: 20, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ color: "white", fontSize: 24, fontWeight: 900, fontFamily: "Poppins, sans-serif" }}>199 SAR <span style={{ fontSize: 12, opacity: 0.5 }}>/card</span></span>
              <button
                onClick={() => addToCart({ id: 5, name: "Car Showroom NFC Card", price: "199 SAR" })}
                style={{ background: ORANGE, color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer" }}
              >Add to Cart</button>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button style={{ background: "transparent", border: `2px solid ${NAVY}`, color: NAVY, borderRadius: 12, padding: "12px 32px", fontSize: 14, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer" }}>{t.viewAll}</button>
        </div>
      </div>
    </section>
  );
}
