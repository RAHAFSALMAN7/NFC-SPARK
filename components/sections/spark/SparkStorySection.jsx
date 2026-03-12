"use client";
import { NAVY, BEIGE, ORANGE } from "@/lib/translations";

export default function SparkStorySection({ t }) {
  return (
    <section id="story" style={{ background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              color: NAVY,
              fontFamily: "Poppins, sans-serif",
              marginBottom: 12,
            }}
          >
            {t.sparkStory.title}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              fontFamily: "Nunito, sans-serif",
              maxWidth: 720,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            {t.sparkStory.subtitle}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24 }}>
          <div
            style={{
              background: BEIGE,
              borderRadius: 24,
              border: "1px solid rgba(8,8,68,0.08)",
              padding: "28px 24px",
            }}
          >
            {t.sparkStory.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: 15,
                  color: "#444",
                  fontFamily: "Nunito, sans-serif",
                  lineHeight: 1.9,
                  marginBottom: index === t.sparkStory.paragraphs.length - 1 ? 0 : 16,
                  textAlign: t.dir === "rtl" ? "right" : "left",
                }}
              >
                {paragraph}
              </p>
            ))}
            <div style={{ marginTop: 24, textAlign: t.dir === "rtl" ? "right" : "left" }}>
              <a
                href="https://nwevarsion-spark.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: ORANGE,
                  color: "white",
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "Poppins, sans-serif",
                  textDecoration: "none",
                }}
              >
                {t.sparkStory.learnMoreCta}
              </a>
            </div>
          </div>

          <div
            style={{
              background: `linear-gradient(135deg, ${NAVY} 0%, #1a1a6e 100%)`,
              borderRadius: 24,
              padding: "24px 20px",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                letterSpacing: 1.1,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 14,
              }}
            >
              {t.sparkStory.statsTitle}
            </p>
            <div style={{ display: "grid", gap: 14 }}>
              {t.sparkStory.stats.map((stat, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    padding: "14px 12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      color: ORANGE,
                      fontSize: 24,
                      fontWeight: 900,
                      fontFamily: "Poppins, sans-serif",
                      marginBottom: 4,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 13, fontFamily: "Nunito, sans-serif" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
