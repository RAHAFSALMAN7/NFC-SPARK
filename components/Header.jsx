"use client";
import { useState } from "react";
import { NAVY, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function Header({ t, locale, setLocale, cartCount, cartOpen, setCartOpen, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const navItems = [
    ["home", t.nav.home],
    ["shop", t.nav.shop],
    ["solutions", t.nav.solutions],
    ["games", t.nav.games],
  ];

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

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
        padding: "0 16px",
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
        <img
          src="/zuccess_logo.png"
          alt="Zuccess Logo"
          style={{ height: 70, cursor: "pointer" }}
          onClick={() => handleScroll("home")}
        />

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: 28 }}>
            {navItems.map(([id, label]) => (
              <button
                key={id}
                onClick={() => handleScroll(id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          
          {/* Language */}
          <button
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 12,
              cursor: "pointer",
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
              padding: "6px 10px",
              fontSize: 12,
              position: "relative",
              cursor: "pointer",
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
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: NAVY,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {navItems.map(([id, label]) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: 16,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            style={{
              background: "#25D366",
              color: "white",
              padding: 10,
              borderRadius: 8,
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            {t.whatsappBtn}
          </a>
        </div>
      )}
    </header>
  );
}