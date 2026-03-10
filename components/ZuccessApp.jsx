"use client";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { T, ORANGE, WHATSAPP_LINK } from "@/lib/translations";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BestSellers from "@/components/BestSellers";
import Bundles from "@/components/Bundles";
import Solutions from "@/components/Solutions";
import DesignStudio from "@/components/DesignStudio";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function ZuccessApp() {
  const [locale, setLocale] = useState("en");
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const t = T[locale];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exist = prev.find(i => i.id === product.id);
      if (exist) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartCount(c => c + 1);
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    return sum + price * item.qty;
  }, 0);

  return (
    <div dir={t.dir} style={{ fontFamily: "Nunito, sans-serif", background: "#EBEBDF", minHeight: "100vh", color: "#080844" }}>
      <Header
        t={t}
        locale={locale}
        setLocale={setLocale}
        cartCount={cartCount}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        scrolled={scrolled}
      />

      <CartDrawer
        t={t}
        cartItems={cartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        totalPrice={totalPrice}
      />

      <HeroSection t={t} />
      <HowItWorks t={t} />
      <BestSellers t={t} addToCart={addToCart} />
      <Bundles t={t} />
      <Solutions t={t} />
      <DesignStudio t={t} locale={locale} />
      <Testimonials t={t} />
      <FAQ t={t} />
      <FinalCTA t={t} />
      <Footer t={t} />

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
        style={{ position: "fixed", bottom: 24, right: t.dir === "rtl" ? "auto" : 24, left: t.dir === "rtl" ? 24 : "auto", width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, textDecoration: "none", zIndex: 999, boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "all 0.2s ease" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.6)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; }}
      ><MessageCircle size={26} color="white" strokeWidth={2.5} /></a>
    </div>
  );
}
