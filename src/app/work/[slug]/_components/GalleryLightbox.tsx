"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Props { images: string[]; title: string; }

export default function GalleryLightbox({ images, title }: Props) {
  const [open, setOpen]       = useState(false);
  const [current, setCurrent] = useState(0);

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

  /* ── Grid layout: first image wider ── */
  const spanClass = (i: number, total: number) => {
    if (total === 1) return "sk-wd-gal-span-full";
    if (total === 2) return i === 0 ? "sk-wd-gal-span-8" : "sk-wd-gal-span-4";
    if (i === 0) return "sk-wd-gal-span-8";
    if (i === 1) return "sk-wd-gal-span-4";
    if (total === 4 && i === 3) return "sk-wd-gal-span-8";
    return "sk-wd-gal-span-4";
  };

  return (
    <>
      {/* Thumbnail grid */}
      <div className="sk-wd-gal-grid">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setCurrent(i); setOpen(true); }}
            className={`sk-wd-gal-thumb ${spanClass(i, images.length)}`}
            aria-label={`Open image ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} — ${i + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 800px"
              style={{ objectFit: "cover", transition: "transform .4s ease" }}
            />
            <div className="sk-wd-gal-overlay sk-mono">
              ↗ {i + 1} / {images.length}
            </div>
          </button>
        ))}
      </div>

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
