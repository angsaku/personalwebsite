"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Template } from "@/lib/templates";

const PLATFORM_COLORS: Record<string, string> = {
  notion: "#000000",
  figma: "#a259ff",
  framer: "#0055ff",
  webflow: "#4353ff",
  canva: "#00c4cc",
};

function platformColor(platform: string) {
  return PLATFORM_COLORS[platform.toLowerCase()] ?? "var(--accent)";
}

export default function TemplatesSlider({ templates }: { templates: Template[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".sk-tpl-card");
    const cardW = card ? card.offsetWidth + 24 : 360;
    el.scrollBy({ left: dir * cardW, behavior: "smooth" });
  }

  if (templates.length === 0) return null;

  return (
    <div className="sk-tpl-slider-wrap">
      {/* Prev / Next */}
      <div className="sk-tpl-slider-controls">
        <button
          className="sk-tpl-arrow"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          className="sk-tpl-arrow"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* Scrollable track */}
      <div className="sk-tpl-track" ref={trackRef}>
        {templates.map((t) => (
          <a
            key={t.id}
            href={t.templateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sk-tpl-card rv"
            data-cursor="hover"
            data-cursor-label="↗ get"
          >
            {/* Thumbnail */}
            <div className="sk-tpl-thumb">
              {t.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.thumbnailUrl} alt={t.title} className="sk-tpl-thumb-img" />
              ) : (
                <div className="sk-tpl-thumb-ph">
                  <span className="sk-mono" style={{ color: platformColor(t.platform) }}>
                    {t.platform.toUpperCase() || "TEMPLATE"}
                  </span>
                </div>
              )}
              <div
                className="sk-tpl-platform-badge sk-mono"
                style={{ background: platformColor(t.platform) }}
              >
                {t.platform}
              </div>
            </div>

            {/* Body */}
            <div className="sk-tpl-body">
              <h3 className="sk-tpl-title">{t.title.toUpperCase()}</h3>
              <p className="sk-tpl-desc sk-serif">{t.description}</p>
              {t.tags.length > 0 && (
                <div className="sk-tpl-tags">
                  {t.tags.map((tag) => (
                    <span key={tag} className="sk-tpl-tag sk-mono">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className="sk-tpl-foot sk-mono">
              <span
                className="sk-tpl-price"
                style={t.price.toLowerCase() !== "free" ? { color: "var(--accent)" } : {}}
              >
                {t.price}
              </span>
              <span className="sk-tpl-go">↗</span>
            </footer>
          </a>
        ))}
      </div>
    </div>
  );
}
