"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface Props { images: string[]; title: string; }

export default function GalleryLightbox({ images, title }: Props) {
  const [open, setOpen]       = useState(false);
  const [current, setCurrent] = useState(0);
  const [active, setActive]   = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft")  prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape")     setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── Track the most-visible slide for the nav + progress bar ── */
  useEffect(() => {
    const root = sliderRef.current;
    if (!root) return;
    const ratios = new Array(images.length).fill(0);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = slideRefs.current.findIndex((el) => el === entry.target);
          if (idx !== -1) ratios[idx] = entry.intersectionRatio;
        });
        let bestIdx = 0;
        let bestRatio = -1;
        ratios.forEach((r, i) => { if (r > bestRatio) { bestRatio = r; bestIdx = i; } });
        setActive(bestIdx);
      },
      { root, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [images.length]);

  const scrollToSlide = (i: number) => {
    slideRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  /* ── Wide slides every third shot, for rhythm ── */
  const isWide = (i: number) => i % 3 === 1;

  return (
    <>
      {/* Horizontal slider */}
      <div className="sk-wd-gal-slider-wrap">
        <div className="sk-wd-gal-slider" ref={sliderRef}>
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              ref={(el) => { slideRefs.current[i] = el; }}
              onClick={() => { setCurrent(i); setOpen(true); }}
              className={`sk-wd-gal-slide ${isWide(i) ? "sk-wd-gal-slide-wide" : ""}`}
              aria-label={`Open image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${title} — ${i + 1}`}
                fill
                loading={i === 0 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 70vw, 620px"
                style={{ objectFit: "cover", transition: "transform .4s ease" }}
              />
              <div className="sk-wd-gal-overlay sk-mono">
                ↗ {i + 1} / {images.length}
              </div>
            </button>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="sk-wd-gal-nav sk-wd-gal-nav-prev"
              onClick={() => scrollToSlide(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label="Previous images"
            >
              ←
            </button>
            <button
              type="button"
              className="sk-wd-gal-nav sk-wd-gal-nav-next"
              onClick={() => scrollToSlide(Math.min(images.length - 1, active + 1))}
              disabled={active === images.length - 1}
              aria-label="More images"
            >
              →
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="sk-wd-gal-progress">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <div className="sk-wd-gal-progress-track">
            <div
              className="sk-wd-gal-progress-fill"
              style={{ width: `${((active + 1) / images.length) * 100}%` }}
            />
          </div>
          <span>{String(images.length).padStart(2, "0")}</span>
        </div>
      )}

      {/* Lightbox */}
      {open && (
        <div className="sk-wd-lightbox" onClick={() => setOpen(false)}>

          {/* Close */}
          <button
            type="button"
            className="sk-wd-lb-close sk-mono"
            onClick={() => setOpen(false)}
          >
            ESC ✕
          </button>

          {/* Counter */}
          <div className="sk-wd-lb-counter sk-mono">
            {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              className="sk-wd-lb-prev sk-mono"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              ←
            </button>
          )}

          {/* Image */}
          <div className="sk-wd-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[current]}
              alt={`${title} — ${current + 1}`}
              width={1200}
              height={800}
              priority
              style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain", display: "block" }}
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              className="sk-wd-lb-next sk-mono"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              →
            </button>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="sk-wd-lb-strip" onClick={(e) => e.stopPropagation()}>
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`sk-wd-lb-strip-thumb${i === current ? " active" : ""}`}
                  onClick={() => setCurrent(i)}
                >
                  <Image src={src} alt="" width={64} height={40} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
