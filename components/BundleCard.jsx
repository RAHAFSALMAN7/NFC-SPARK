"use client";
import { NAVY, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function BundleCard({ plan, t }) {
  return (
    <div style={{
      background: plan.popular ? NAVY : "white",
      borderRadius: 24, padding: "28px 24px 24px",
      border: plan.popular ? "2px solid rgba(234,121,70,0.6)" : "1px solid rgba(8,8,68,0.1)",
      position: "relative", transition: "all 0.3s ease",
      boxShadow: plan.popular ? "0 20px 60px rgba(8,8,68,0.3), 0 0 0 1px rgba(234,121,70,0.3)" : "0 4px 20px rgba(0,0,0,0.06)",
      transform: plan.popular ? "scale(1.04)" : "scale(1)",
    }}>
      {plan.popular && (
        <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: ORANGE, color: "white", fontSize: 11, padding: "4px 16px", borderRadius: 20, fontWeight: 700, fontFamily: "Poppins, sans-serif", whiteSpace: "nowrap" }}>
          {t.mostPopular}
        </div>
      )}
      <div style={{ marginBottom: 4, fontSize: 18, fontWeight: 800, color: plan.popular ? "white" : NAVY, fontFamily: "Poppins, sans-serif" }}>{plan.name}</div>
      <div style={{ fontSize: 12, color: plan.popular ? "rgba(255,255,255,0.6)" : "#888", fontFamily: "Nunito, sans-serif", marginBottom: 14 }}>{plan.desc}</div>
      <div style={{ fontSize: 32, fontWeight: 900, color: plan.popular ? "white" : NAVY, fontFamily: "Poppins, sans-serif", marginBottom: 20 }}>{plan.price}</div>
      <div style={{ marginBottom: 22 }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: plan.popular ? "rgba(234,121,70,0.3)" : "rgba(8,8,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: plan.popular ? "rgba(255,255,255,0.85)" : "#444", fontFamily: "Nunito, sans-serif" }}>{f}</span>
          </div>
        ))}
      </div>
      <a
        href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
        style={{ display: "block", textAlign: "center", background: plan.popular ? ORANGE : "transparent", color: plan.popular ? "white" : NAVY, border: plan.popular ? "none" : `2px solid ${NAVY}`, borderRadius: 12, padding: "12px", fontSize: 13, fontWeight: 700, fontFamily: "Poppins, sans-serif", textDecoration: "none", transition: "all 0.2s ease" }}
        onMouseEnter={e => { if (!plan.popular) { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = "white"; } else { e.currentTarget.style.opacity = "0.9"; } }}
        onMouseLeave={e => { if (!plan.popular) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = NAVY; } else { e.currentTarget.style.opacity = "1"; } }}
      >
        {plan.cta}
      </a>
    </div>
  );
}
