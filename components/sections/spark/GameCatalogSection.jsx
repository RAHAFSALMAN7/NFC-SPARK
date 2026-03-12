"use client";
import { NAVY, ORANGE } from "@/lib/translations";

function GameCard({ game, t, addToCart }) {
  return (
    <article
      style={{
        background: "white",
        borderRadius: 20,
        border: "1px solid rgba(8,8,68,0.08)",
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={game.image}
          alt={game.title}
          style={{ width: "100%", height: 320, objectFit: "contain", display: "block", background: "#f8f6ef", padding: 12 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(8,8,68,0.02) 0%, rgba(8,8,68,0.3) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "16px 18px",
            color: "white",
          }}
        >
          <h3 style={{ fontSize: 22, fontWeight: 800, fontFamily: "Poppins, sans-serif", margin: 0 }}>
            {game.title}
          </h3>
        </div>
      </div>

      <div style={{ padding: "18px 18px 20px" }}>
        <p
          style={{
            fontSize: 14,
            color: "#666",
            fontFamily: "Nunito, sans-serif",
            lineHeight: 1.7,
            marginBottom: 14,
            textAlign: t.dir === "rtl" ? "right" : "left",
          }}
        >
          {game.description}
        </p>

        <div style={{ marginBottom: 16 }}>
          {game.features.map((feature, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: t.dir === "rtl" ? "flex-end" : "flex-start",
                gap: 8,
                marginBottom: 7,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE }} />
              <span style={{ fontSize: 13, color: "#444", fontFamily: "Nunito, sans-serif" }}>{feature}</span>
            </div>
          ))}
        </div>

        <p style={{ color: NAVY, fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 14 }}>
          {game.price}
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href={game.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              minWidth: 130,
              textAlign: "center",
              background: ORANGE,
              color: "white",
              borderRadius: 10,
              padding: "10px 12px",
              textDecoration: "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {t.sparkGames.demoCta}
          </a>
          <button
            onClick={() =>
              addToCart({
                id: game.productId,
                name: game.title,
                price: game.price,
              })
            }
            style={{
              flex: 1,
              minWidth: 130,
              textAlign: "center",
              background: ORANGE,
              color: "white",
              border: "none",
              borderRadius: 10,
              padding: "10px 12px",
              fontFamily: "Poppins, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {t.sparkGames.buyCta}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function GameCatalogSection({ t, addToCart }) {
  return (
    <section id="games" style={{ background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 800,
            color: NAVY,
            fontFamily: "Poppins, sans-serif",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {t.sparkGames.title}
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#666",
            fontFamily: "Nunito, sans-serif",
            textAlign: "center",
            marginBottom: 44,
            maxWidth: 700,
            margin: "0 auto 44px",
          }}
        >
          {t.sparkGames.sub}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {t.sparkGames.items.map((game) => (
            <GameCard key={game.id} game={game} t={t} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
