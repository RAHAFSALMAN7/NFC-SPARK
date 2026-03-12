"use client";
import { NAVY, BEIGE, ORANGE } from "@/lib/translations";

export default function NFCExplainerVideo({ t, locale }) {
  const videoSrc = locale === "ar" ? "/games/NFC-AR.mp4" : "/games/NFC-EN.mp4";

  return (
    <section id="nfc-explainer" style={{ background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: 24,
            alignItems: "center",
          }}
        >
          <div style={{ order: t.dir === "rtl" ? 2 : 1 }}>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                color: NAVY,
                fontFamily: "Poppins, sans-serif",
                marginBottom: 12,
                textAlign: t.dir === "rtl" ? "right" : "left",
              }}
            >
              {t.nfcVideo.title}
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#666",
                fontFamily: "Nunito, sans-serif",
                lineHeight: 1.8,
                marginBottom: 18,
                textAlign: t.dir === "rtl" ? "right" : "left",
              }}
            >
              {t.nfcVideo.sub}
            </p>
            <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
              {t.nfcVideo.points.map((point, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: t.dir === "rtl" ? "flex-end" : "flex-start",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: ORANGE, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#444", fontFamily: "Nunito, sans-serif" }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              order: t.dir === "rtl" ? 1 : 2,
              background: BEIGE,
              border: "1px solid rgba(8,8,68,0.08)",
              borderRadius: 22,
              padding: 14,
              boxShadow: "0 10px 30px rgba(8,8,68,0.12)",
            }}
          >
            <video
              key={videoSrc}
              src={videoSrc}
              controls
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "clamp(220px, 32vw, 340px)",
                borderRadius: 14,
                display: "block",
                background: "#000",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
