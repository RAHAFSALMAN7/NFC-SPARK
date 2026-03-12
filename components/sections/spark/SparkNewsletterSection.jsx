"use client";
import { useState } from "react";
import { NAVY, BEIGE, ORANGE } from "@/lib/translations";

export default function SparkNewsletterSection({ t }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter" style={{ background: BEIGE }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 34px)",
            fontWeight: 800,
            color: NAVY,
            fontFamily: "Poppins, sans-serif",
            marginBottom: 12,
          }}
        >
          {t.sparkNewsletter.title}
        </h2>
        <p style={{ fontSize: 16, color: "#666", fontFamily: "Nunito, sans-serif", marginBottom: 24 }}>
          {t.sparkNewsletter.sub}
        </p>

        {submitted ? (
          <div
            style={{
              background: "white",
              border: "1px solid rgba(8,8,68,0.1)",
              borderRadius: 16,
              padding: "18px 16px",
            }}
          >
            <p style={{ color: NAVY, fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
              {t.sparkNewsletter.successTitle}
            </p>
            <p style={{ color: "#666", fontFamily: "Nunito, sans-serif", fontSize: 14, marginTop: 6 }}>
              {t.sparkNewsletter.successSub}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder={t.sparkNewsletter.placeholder}
              style={{
                flex: "1 1 280px",
                maxWidth: 420,
                border: "1px solid rgba(8,8,68,0.2)",
                borderRadius: 12,
                padding: "12px 14px",
                fontFamily: "Nunito, sans-serif",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: ORANGE,
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "12px 18px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {t.sparkNewsletter.cta}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
