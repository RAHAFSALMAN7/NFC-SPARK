"use client";
import { useState } from "react";
import { NAVY, BEIGE, ORANGE } from "@/lib/translations";

export default function GameFinderSection({ t, addToCart }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = t.sparkGameFinder.options.find((option) => option.id === selectedId);

  return (
    <section id="game-finder" style={{ background: BEIGE }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              color: NAVY,
              fontFamily: "Poppins, sans-serif",
              marginBottom: 12,
            }}
          >
            {t.sparkGameFinder.title}
          </h2>
          <p style={{ fontSize: 16, color: "#666", fontFamily: "Nunito, sans-serif" }}>
            {t.sparkGameFinder.sub}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 26,
          }}
        >
          {t.sparkGameFinder.options.map((option) => {
            const active = option.id === selectedId;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedId(option.id)}
                style={{
                  textAlign: t.dir === "rtl" ? "right" : "left",
                  border: `1px solid ${active ? ORANGE : "rgba(8,8,68,0.12)"}`,
                  background: active ? "white" : "rgba(255,255,255,0.7)",
                  borderRadius: 16,
                  padding: "18px 16px",
                  cursor: "pointer",
                  boxShadow: active ? "0 12px 30px rgba(8,8,68,0.12)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    marginBottom: 10,
                    border: "1px solid rgba(8,8,68,0.08)",
                    background: "white",
                    height: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  <img
                    src={option.image}
                    alt={option.gameName}
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
                <div
                  style={{
                    color: NAVY,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 4,
                  }}
                >
                  {option.label}
                </div>
                <div style={{ color: "#777", fontFamily: "Nunito, sans-serif", fontSize: 13 }}>
                  {option.sub}
                </div>
              </button>
            );
          })}
        </div>

        {selected && (
          <div
            style={{
              background: "white",
              border: "1px solid rgba(8,8,68,0.1)",
              borderRadius: 20,
              padding: "26px 22px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: ORANGE,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {t.sparkGameFinder.resultLabel}
            </div>
            <h3
              style={{
                color: NAVY,
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(20px, 3vw, 28px)",
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              {t.sparkGameFinder.resultPrefix} {selected.gameName}
            </h3>
            <p
              style={{
                color: "#666",
                fontFamily: "Nunito, sans-serif",
                fontSize: 14,
                marginBottom: 10,
              }}
            >
              {t.sparkGameFinder.resultSub}
            </p>
            <p style={{ color: NAVY, fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 18 }}>
              {selected.price}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <a
                href={selected.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: NAVY,
                  border: `2px solid ${NAVY}`,
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "Poppins, sans-serif",
                  textDecoration: "none",
                }}
              >
                {t.sparkGameFinder.resultCta}
              </a>
              <button
                onClick={() =>
                  addToCart({
                    id: selected.productId,
                    name: selected.gameName,
                    price: selected.price,
                  })
                }
                style={{
                  background: ORANGE,
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "Poppins, sans-serif",
                  cursor: "pointer",
                }}
              >
                {t.sparkGameFinder.buyCta}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
