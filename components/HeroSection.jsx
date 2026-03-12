"use client";
import { useEffect, useRef, useState } from "react";
import PhoneMock from "./PhoneMock";
import { NAVY, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function HeroSection({ t }) {
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const node = statsRef.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;
        setHasAnimated(true);

        const targets = [500, 5000, 3, 4.9];
        const durationMs = 1400;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(targets.map((target) => target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatStatValue = (index) => {
    const isArabic = t.dir === "rtl";
    const value = counts[index];
    const numberFormatter = new Intl.NumberFormat(isArabic ? "ar" : "en");

    if (index === 0) {
      const rounded = Math.round(value);
      return isArabic ? `+${numberFormatter.format(rounded)}` : `${numberFormatter.format(rounded)}+`;
    }

    if (index === 1) {
      const roundedK = Math.round(value / 1000);
      return `${numberFormatter.format(roundedK)}K+`;
    }

    if (index === 2) {
      const rounded = Math.round(value);
      return isArabic ? `${numberFormatter.format(rounded)} دقائق` : `${numberFormatter.format(rounded)} Min`;
    }

    const fixed = (Math.round(value * 10) / 10).toFixed(1);
    const localized = isArabic ? fixed.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]) : fixed;
    return localized;
  };

  const S = {
    ctaPrimary: { display: "inline-flex", alignItems: "center", gap: 8, background: ORANGE, color: "white", padding: "14px 28px", borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", textDecoration: "none", border: "none", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(234,121,70,0.4)" },
    ctaSecondary: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "white", padding: "14px 28px", borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all 0.2s ease", backdropFilter: "blur(10px)" },
  };

  return (
    <section id="home" style={{
      background: `linear-gradient(135deg, #050530 0%, ${NAVY} 50%, #0d0d5a 100%)`,
      backgroundSize: "400% 400%", animation: "gradientShift 8s ease infinite",
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden", paddingTop: 64,
    }}>
      {/* BG grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(234,121,70,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(8,8,68,0.8) 0%, rgba(26,26,110,0.3) 50%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%", position: "relative", zIndex: 2 }}>

        {/* Left */}
        <div style={{ gridColumn: t.dir === "rtl" ? "2" : "1", gridRow: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(234,121,70,0.15)", border: "1px solid rgba(234,121,70,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ color: ORANGE, fontSize: 12, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>{t.hero.badge}</span>
          </div>

          <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 900, color: "white", fontFamily: "Poppins, sans-serif", lineHeight: 1.1, marginBottom: 8 }}>
            {t.hero.headline}
            <span style={{ display: "block", background: `linear-gradient(90deg, ${ORANGE}, #f4a261)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t.hero.headlineSub}
            </span>
          </h1>

          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", fontFamily: "Nunito, sans-serif", lineHeight: 1.7, margin: "20px 0 36px", maxWidth: 480 }}>
            {t.hero.sub}
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={S.ctaPrimary}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {t.hero.cta1}
            </a>

            <button
              onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
              style={S.ctaSecondary}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            >
              {t.hero.cta2}
            </button>
          </div>

          <p style={{ marginTop: 24, color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Nunito, sans-serif" }}>
            {t.hero.trustLine}
          </p>
        </div>

        {/* Right — phone */}
        <div className="phone-float" style={{ gridColumn: t.dir === "rtl" ? "1" : "2", gridRow: 1, display: "flex", justifyContent: "center" }}>
          <PhoneMock />
        </div>

      </div>

      {/* Stats strip */}
      <div ref={statsRef} style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ color: ORANGE, fontWeight: 900, fontSize: 22, fontFamily: "Poppins, sans-serif" }}>
                {formatStatValue(i)}
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Nunito, sans-serif" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}