"use client";
import { NAVY, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function Header({ t, locale, setLocale, cartCount, cartOpen, setCartOpen, scrolled }) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(8,8,68,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/zuccess_logo.png"
            alt="Zuccess Logo"
            style={{
              height: 100,
              width: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={() =>
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
            }
          />
        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[["home", t.nav.home], ["shop", t.nav.shop], ["solutions", t.nav.solutions], ["games", t.nav.games]].map(
            ([id, label]) => (
              <button
                key={id}
                onClick={() =>
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "Nunito, sans-serif",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                }
              >
                {label}
              </button>
            )
          )}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Language toggle */}
          <button
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {t.nav.langToggle}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Nunito, sans-serif",
              position: "relative",
            }}
          >
            Cart
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: ORANGE,
                  color: "white",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25D366",
              color: "white",
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "Poppins, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {t.whatsappBtn}
          </a>
        </div>
      </div>
    </header>
  );
}