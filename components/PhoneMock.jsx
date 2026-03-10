"use client";
import { NAVY, BEIGE, ORANGE } from "@/lib/translations";

export default function PhoneMock() {
  return (
    <div style={{ position: "relative", width: 220, margin: "0 auto" }}>
      <div style={{
        position: "absolute", inset: -40, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(234,121,70,0.35) 0%, rgba(8,8,68,0) 70%)",
        animation: "pulse 3s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: -60, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(8,8,68,0.6) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        background: "linear-gradient(145deg, #1a1a5e, #080844)",
        borderRadius: 36, padding: "10px 6px 20px",
        border: "2px solid rgba(255,255,255,0.12)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)",
        position: "relative", zIndex: 2,
      }}>
        <div style={{ width: 60, height: 10, background: "#0a0a3a", borderRadius: 8, margin: "0 auto 8px", border: "1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ background: "#0d0d50", borderRadius: 24, overflow: "hidden", padding: 0 }}>
          <div style={{ background: "linear-gradient(135deg, #080844 0%, #1a1a6e 100%)", padding: "16px 14px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${ORANGE}, #f4a261)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "white", flexShrink: 0 }}>Z</div>
              <div>
                <div style={{ color: "white", fontSize: 11, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>Ahmad Al-Rashidi</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 9, fontFamily: "Nunito, sans-serif" }}>Sales Director · AutoNation</div>
              </div>
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
              {["Call", "Mail", "Link"].map((icon, i) => (
                <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 0", textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.85)", fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>{icon}</div>
              ))}
            </div>
          </div>
          <div style={{ background: BEIGE, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 52, height: 52, background: "white", borderRadius: 6, display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1, padding: 4, flexShrink: 0 }}>
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} style={{ background: [0,1,2,7,8,14,42,43,44,48,49,50,35,36,37,28,21].includes(i) ? NAVY : "transparent", borderRadius: 1 }} />
              ))}
            </div>
            <div>
              <div style={{ fontSize: 8, color: NAVY, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>Scan to Connect</div>
              <div style={{ fontSize: 7, color: "#666", marginTop: 2, fontFamily: "Nunito, sans-serif" }}>zuccess.co/ahmad</div>
              <div style={{ marginTop: 4, background: ORANGE, borderRadius: 4, padding: "2px 6px", fontSize: 7, color: "white", fontFamily: "Poppins, sans-serif", display: "inline-block", fontWeight: 700 }}>Share Profile</div>
            </div>
          </div>
          <div style={{ background: "#080844", padding: "8px 14px", display: "flex", justifyContent: "center", gap: 10 }}>
            {["in", "ig", "tw", "wa"].map((s, i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
