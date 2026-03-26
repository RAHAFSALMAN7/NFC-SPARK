"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAVY, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function Header({ t, locale, setLocale, cartCount, cartOpen, setCartOpen, scrolled }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: "home", label: t.nav.home, type: "section" },
    { id: "shop", label: t.nav.shop, type: "section" },
    { id: "plans", label: t.nav.plans ?? "Plans", type: "route", href: "/plans" },
    { id: "solutions", label: t.nav.solutions, type: "section" },
    { id: "games", label: t.nav.games, type: "section" },
  ];

  const goHome = () => {
    setMenuOpen(false);
    if (pathname === "/") {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    router.push("/");
  };

  const onNavItemClick = (item) => {
    setMenuOpen(false);
    if (item.type === "route" && item.href) {
      router.push(item.href);
      return;
    }

    if (pathname !== "/") {
      router.push(`/#${item.id}`);
      return;
    }

    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
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
        padding: "0 20px",
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
          style={{
            height: 70,
            cursor: "pointer",
          }}
          onClick={goHome}
        />

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: 28 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavItemClick(item)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "Nunito, sans-serif",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {/* Language */}
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
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Burger Button */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: 24,
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
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavItemClick(item)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: 16,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {item.label}
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