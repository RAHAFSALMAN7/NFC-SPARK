"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { NAVY, BEIGE } from "@/lib/translations";

export default function Gallery() {
  const images = useMemo(
    () => Array.from({ length: 8 }, (_, i) => `/${i + 1}.jpeg`),
    []
  );

  const [lightboxSrc, setLightboxSrc] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const els = cardRefs.current.filter(Boolean);
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "40px 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxSrc]);

  return (
    <section id="gallery" style={{ background: BEIGE }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: NAVY, fontFamily: "Poppins, sans-serif", textAlign: "center", marginBottom: 12 }}>
          Gallery
        </h2>
        <p style={{ fontSize: 16, color: "#666", fontFamily: "Nunito, sans-serif", textAlign: "center", marginBottom: 52, maxWidth: 560, margin: "0 auto 52px" }}>
          A glimpse of our NFC products in action
        </p>

        <div className="grid">
          {images.map((src, idx) => (
            <button
              key={src}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="card"
              type="button"
              aria-label={`Open image ${idx + 1}`}
              onClick={() => setLightboxSrc(src)}
            >
              <div className="media">
                <Image
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  priority={idx < 2}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxSrc(null)}
        >
          <div className="lightboxInner" onClick={(e) => e.stopPropagation()}>
            <button className="close" type="button" onClick={() => setLightboxSrc(null)} aria-label="Close preview">
              ×
            </button>
            <div className="preview">
              <Image src={lightboxSrc} alt="Gallery preview" fill sizes="100vw" style={{ objectFit: "contain" }} />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }

        .card {
          appearance: none;
          border: 1px solid rgba(8, 8, 68, 0.08);
          background: white;
          border-radius: 18px;
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.6s ease, translate 0.6s ease;
          opacity: 0;
          translate: 0 14px;
          will-change: transform;
        }

        .card[data-visible="true"] {
          opacity: 1;
          translate: 0 0;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 45px rgba(8, 8, 68, 0.14);
        }

        .media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
        }

        .card:hover .media :global(img) {
          transform: scale(1.05);
          transition: transform 0.45s ease;
        }

        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
        }

        .lightboxInner {
          width: min(1100px, 100%);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          backdrop-filter: blur(8px);
          padding: 14px;
          position: relative;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(0, 0, 0, 0.25);
          color: white;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
        }

        .preview {
          position: relative;
          width: 100%;
          height: min(78vh, 720px);
          border-radius: 14px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </section>
  );
}

