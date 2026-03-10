"use client";
import { NAVY, BEIGE, ORANGE } from "@/lib/translations";

export default function Testimonials({ t }) {
  return (
    <section style={{ background: BEIGE }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: NAVY, fontFamily: "Poppins, sans-serif", textAlign: "center", marginBottom: 12 }}>{t.testimonials.title}</h2>
        <p style={{ fontSize: 16, color: "#666", fontFamily: "Nunito, sans-serif", textAlign: "center", marginBottom: 44, maxWidth: 560, margin: "0 auto 44px" }}>{t.testimonials.sub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {t.testimonials.items.map((item, i) => (
            <div key={i} style={{ background: "white", borderRadius: 20, padding: "28px 24px", border: "1px solid rgba(8,8,68,0.06)", position: "relative" }}>
              <div style={{ color: ORANGE, fontSize: 28, fontWeight: 900, lineHeight: 1, marginBottom: 14 }}>"</div>
              <p style={{ fontSize: 13, color: "#555", fontFamily: "Nunito, sans-serif", lineHeight: 1.7, marginBottom: 20 }}>{item.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${NAVY}, #1a1a6e)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14, fontFamily: "Poppins, sans-serif" }}>{item.name[0]}</div>
                <div>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: NAVY }}>{item.name}</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 11, color: "#888" }}>{item.role}</div>
                </div>
              </div>
              <div style={{ position: "absolute", top: 24, right: 24, color: "rgba(8,8,68,0.08)", fontSize: 10 }}>5/5</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
