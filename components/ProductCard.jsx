"use client";
import { useState } from "react";
import { CreditCard, ContactRound, KeyRound, ClipboardCheck } from "lucide-react";
import { NAVY, ORANGE } from "@/lib/translations";

export default function ProductCard({ product, t, onAdd }) {
  const [added, setAdded] = useState(false);
  const tagColors = {
    "Most Popular": ORANGE, "الأكثر طلباً": ORANGE,
    "Premium": "#2563eb", "مميز": "#2563eb",
    "New": "#16a34a", "جديد": "#16a34a",
    "For Business": "#7c3aed", "للأعمال": "#7c3aed",
  };
  const tagColor = tagColors[product.tag] || ORANGE;
  const iconMap = {
    1: CreditCard,
    2: ContactRound,
    3: KeyRound,
    4: ClipboardCheck,
  };
  const Icon = iconMap[product.id] || CreditCard;

  return (
    <div
      style={{
        background: "white", borderRadius: 20, overflow: "hidden",
        border: "1px solid rgba(8,8,68,0.08)", transition: "all 0.3s ease",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(8,8,68,0.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
    >
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a1a6e 100%)`, height: 180, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span style={{ background: tagColor, color: "white", fontSize: 10, padding: "3px 8px", borderRadius: 20, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>{product.tag}</span>
        </div>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 16,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <Icon size={34} color="white" strokeWidth={2.2} />
        </div>
        <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "Nunito, sans-serif" }}>Replace with {product.img}</div>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, fontFamily: "Poppins, sans-serif", margin: "0 0 6px" }}>{product.name}</h3>
        <p style={{ fontSize: 12, color: "#666", fontFamily: "Nunito, sans-serif", margin: "0 0 14px", lineHeight: 1.5 }}>{product.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: NAVY, fontFamily: "Poppins, sans-serif" }}>{product.price}</span>
          <button
            onClick={() => { setAdded(true); onAdd(product); setTimeout(() => setAdded(false), 1500); }}
            style={{ background: added ? "#16a34a" : ORANGE, color: "white", border: "none", borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer", transition: "all 0.2s ease" }}
          >
            {added ? "Added" : t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
