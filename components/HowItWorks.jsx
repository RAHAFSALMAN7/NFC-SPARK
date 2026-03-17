"use client";
import { useEffect, useRef } from "react";
import { Camera, Share2, QrCode, RadioTower } from "lucide-react";
import Image from "next/image";
import { NAVY, BEIGE, ORANGE, WHATSAPP_LINK } from "@/lib/translations";

export default function HowItWorks({ t }) {
  const cardRefs = useRef([]);

  useEffect(() => {
    const elements = cardRefs.current.filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "60px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionStyle = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "80px 24px",
  };
  const titleStyle = {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: 800,
    color: NAVY,
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
    marginBottom: 12,
  };
  const subStyle = {
    fontSize: 16,
    color: "#666",
    fontFamily: "Nunito, sans-serif",
    textAlign: "center",
    marginBottom: 52,
    maxWidth: 560,
    margin: "0 auto 52px",
  };
  const ctaPrimary = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: ORANGE,
    color: "white",
    padding: "14px 28px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "Poppins, sans-serif",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 20px rgba(234,121,70,0.4)",
  };

  const iconMap = [Camera, Share2, QrCode, RadioTower];
  const stepImages = ["/step1.jpeg", "/step2.jpeg", "/step3.jpeg", "/step4.jpeg"];

  return (
    <section
      id="how-it-works"
      style={{
        background: "radial-gradient(circle at top left, rgba(234,121,70,0.08), transparent 55%), white",
      }}
    >
      <div style={sectionStyle}>
        <h2 style={titleStyle}>{t.howItWorks.title}</h2>
        <p style={subStyle}>{t.howItWorks.sub}</p>

        <div className="steps-grid">
          <div className="steps-rail" aria-hidden="true" />
          {t.howItWorks.steps.map((step, i) => {
            const Icon = iconMap[i] || Camera;
            const stepImage = stepImages[i] || "/step1.jpeg";
            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="step-card"
                data-index={i}
              >
                <div className="step-media" aria-hidden="true">
                  <Image
                    src={stepImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="step-header">
                  <div className="step-badge">
                    <span>{step.n}</span>
                  </div>
                  <div className="step-icon">
                    <Icon size={22} color="white" strokeWidth={2.2} />
                  </div>
                </div>

                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>

                {i < t.howItWorks.steps.length - 1 && (
                  <div className="step-connector" aria-hidden="true">
                    <span />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={ctaPrimary}>
            {t.hero.cta1}
          </a>
        </div>
      </div>

      <style jsx>{`
        .steps-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          perspective: 1400px;
        }

        @media (max-width: 1024px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
        }

        .steps-rail {
          position: absolute;
          inset: 20% 6%;
          border-radius: 999px;
          border: 1px dashed rgba(8, 8, 68, 0.18);
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 640px) {
          .steps-rail {
            inset: 10% 12%;
          }
        }

        .step-card {
          position: relative;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          background: ${BEIGE};
          border-radius: 22px;
          padding: 22px 20px 20px;
          border: 1px solid rgba(8, 8, 68, 0.06);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          transition:
            transform 0.35s cubic-bezier(0.19, 1, 0.22, 1),
            box-shadow 0.35s ease,
            opacity 0.55s ease,
            translate 0.55s ease;
          transform-style: preserve-3d;
          opacity: 0;
          translate: 0 18px;
          z-index: 1;
        }

        .step-card[data-visible='true'] {
          opacity: 1;
          translate: 0 0;
        }

        .step-card:hover {
          transform: translate3d(0, -8px, 0) rotateX(4deg);
          box-shadow: 0 20px 50px rgba(8, 8, 68, 0.16);
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 14px 0 12px;
        }

        .step-media {
          position: relative;
          width: 100%;
          height: 170px;
          border-radius: 16px;
          overflow: hidden;
          box-sizing: border-box;
          border: 1px solid rgba(8, 8, 68, 0.08);
          box-shadow: 0 10px 26px rgba(8, 8, 68, 0.12);
        }

        @media (max-width: 640px) {
          .step-media {
            height: 190px;
          }
        }

        .step-media :global(img) {
          transition: transform 0.55s ease;
          transform: scale(1);
        }

        .step-card:hover .step-media :global(img) {
          transform: scale(1.05);
        }

        .step-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          height: 40px;
          border-radius: 999px;
          background: white;
          box-shadow: 0 6px 16px rgba(8, 8, 68, 0.12);
          border: 1px solid rgba(8, 8, 68, 0.06);
          font-family: "Poppins, sans-serif";
          font-weight: 800;
          font-size: 14px;
          color: ${NAVY};
        }

        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          background: linear-gradient(135deg, ${ORANGE}, #f4a261);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 18px rgba(234, 121, 70, 0.35);
        }

        .step-title {
          font-size: 16px;
          font-weight: 800;
          color: ${NAVY};
          font-family: "Poppins, sans-serif";
          margin: 0 0 10px;
          text-align: left;
        }

        .step-desc {
          font-size: 13px;
          color: #666;
          font-family: "Nunito, sans-serif";
          line-height: 1.65;
          margin: 0;
          text-align: left;
        }

        .step-connector {
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translateY(-50%);
          display: none;
        }

        @media (min-width: 1025px) {
          .step-connector {
            display: block;
          }
        }

        .step-connector span {
          display: block;
          width: 32px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, ${ORANGE}, rgba(234, 121, 70, 0));
        }
      `}</style>
    </section>
  );
}