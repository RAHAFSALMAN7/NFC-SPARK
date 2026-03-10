"use client";
import { NAVY, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function FinalCTA({ t }) {
  const ctaPrimary = { display: "inline-flex", alignItems: "center", gap: 8, background: ORANGE, color: "white", padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 700, fontFamily: "Poppins, sans-serif", textDecoration: "none", border: "none", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(234,121,70,0.4)" };
  const ctaSecondary = { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "white", padding: "16px 32px", borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all 0.2s ease", backdropFilter: "blur(10px)" };

  return (
    <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d0d5a 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(234,121,70,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "white", fontFamily: "Poppins, sans-serif", textAlign: "center", marginBottom: 16 }}>{t.finalCta.title}</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", fontFamily: "Nunito, sans-serif", textAlign: "center", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>{t.finalCta.sub}</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>{t.finalCta.cta1}</a>
          <button onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} style={ctaSecondary}>{t.finalCta.cta2}</button>
        </div>
      </div>
    </section>
  );
}
