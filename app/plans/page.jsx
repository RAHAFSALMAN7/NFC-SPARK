"use client";

import { useEffect, useState } from "react";
import { T } from "@/lib/translations";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import BestSellers from "@/components/BestSellers";

export default function PlansPage() {
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
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartCount((count) => count + 1);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const target = prev.find((item) => item.id === productId);
      if (!target) return prev;
      setCartCount((count) => Math.max(0, count - 1));
      if (target.qty === 1) return prev.filter((item) => item.id !== productId);
      return prev.map((item) => (item.id === productId ? { ...item, qty: item.qty - 1 } : item));
    });
  };

  const parsePriceValue = (rawPrice) => {
    const normalized = rawPrice
      .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632))
      .replace(/[^0-9]/g, "");
    return parseInt(normalized || "0", 10);
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parsePriceValue(item.price);
    return sum + price * item.qty;
  }, 0);

  return (
    <div
      dir={t.dir}
      style={{
        fontFamily: "Nunito, sans-serif",
        background: "#EBEBDF",
        minHeight: "100vh",
        color: "#080844",
        animation: "plansFadeIn 0.45s ease-out",
      }}
    >
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
        currencyCode="SAR"
        removeFromCart={removeFromCart}
      />

      <main id="plans" style={{ paddingTop: 64 }}>
        <BestSellers t={t} addToCart={addToCart} />
      </main>

      <style jsx global>{`
        @keyframes plansFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
