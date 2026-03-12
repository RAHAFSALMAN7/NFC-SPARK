"use client";
import { NAVY, BEIGE, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function HowItWorks({ t }) {
  const sectionStyle = { maxWidth: 1100, margin: "0 auto", padding: "80px 24px" };
  const titleStyle = { fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: NAVY, fontFamily: "Poppins, sans-serif", textAlign: "center", marginBottom: 12 };
  const subStyle = { fontSize: 16, color: "#666", fontFamily: "Nunito, sans-serif", textAlign: "center", marginBottom: 52, maxWidth: 560, margin: "0 auto 52px" };
  const ctaPrimary = { display: "inline-flex", alignItems: "center", gap: 8, background: ORANGE, color: "white", padding: "14px 28px", borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", textDecoration: "none", border: "none", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(234,121,70,0.4)" };

  return (
    <section id="how-it-works" style={{ background: "white" }}>
      <div style={sectionStyle}>
        <h2 style={titleStyle}>{t.howItWorks.title}</h2>
        <p style={subStyle}>{t.howItWorks.sub}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, position: "relative" }}>
          {t.howItWorks.steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: BEIGE,
                borderRadius: 20,
                padding: "28px 22px",
                border: "1px solid rgba(8,8,68,0.06)",
                transition: "all 0.3s ease",
                position: "relative"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(8,8,68,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, color: "rgba(8,8,68,0.06)", fontFamily: "Poppins, sans-serif", marginBottom: 8 }}>
                {step.n}
              </div>

              {/* Icon Box */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: `linear-gradient(135deg, ${ORANGE}, #f4a261)`,
                  borderRadius: 12,
                  marginBottom: 14,
                  boxShadow: "0 4px 12px rgba(234,121,70,0.3)"
                }}
              />

              <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, fontFamily: "Poppins, sans-serif", marginBottom: 8 }}>
                {step.title}
              </h3>

              <p style={{ fontSize: 13, color: "#666", fontFamily: "Nunito, sans-serif", lineHeight: 1.6 }}>
                {step.desc}
              </p>

              {i < 3 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: -12,
                    transform: "translateY(-50%)",
                    color: ORANGE,
                    fontSize: 18,
                    fontWeight: 700,
                    zIndex: 2
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>
            {t.hero.cta1}
          </a>
        </div>
      </div>
    </section>
  );
}