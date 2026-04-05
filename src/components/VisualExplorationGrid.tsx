"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { VisualItem } from "@/lib/visual-explorations";

function isVideo(url: string) {
  return /\.(webm|mp4|mov)$/i.test(url);
}

const SPAN_PATTERN = [8, 4, 4, 8, 6, 6];

function getColSpan(index: number): string {
  const span = SPAN_PATTERN[index % SPAN_PATTERN.length];
  if (span === 8) return "col-span-12 md:col-span-8";
  if (span === 6) return "col-span-12 md:col-span-6";
  return "col-span-12 md:col-span-4";
}

export default function VisualExplorationGrid({ items }: { items: VisualItem[] }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (items.length === 0) return null;

  const activeItem = items[current];

  return (
    <>
      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-3 auto-rows-[280px]">
        {items.map((item, i) => (
          <div
            key={item.id}
            onClick={() => { setCurrent(i); setOpen(true); }}
            className={`${getColSpan(i)} relative rounded-2xl overflow-hidden bg-[#0a1128] border border-white/[0.06] group cursor-zoom-in`}
          >
            {isVideo(item.imageUrl) ? (
              <video
                src={item.imageUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-end pointer-events-none group-hover:pointer-events-auto"
              style={{ transition: "opacity 0.35s ease" }}
            >
              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020618] via-[#020618]/65 to-transparent" />
              {/* Red glow wash at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#E5212E]/20 to-transparent" />
              {/* Content panel */}
              <div className="relative px-5 pb-5 pt-4 border-t border-[#E5212E]/25">
                <p className="text-white font-bold text-base leading-snug mb-3 drop-shadow-sm">{item.title}</p>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#E5212E] text-white text-xs font-semibold rounded-full hover:bg-[#c41a25] transition-colors"
                  >
                    <ExternalLink size={11} />
                    View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 bg-white/[0.06] px-3 py-1.5 rounded-full">
            {current + 1} / {items.length}
          </div>

          {/* Prev */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 p-3 text-gray-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-full transition-colors z-10"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Media */}
          <div
            className="relative max-w-5xl max-h-[78vh] w-full mx-20 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo(activeItem.imageUrl) ? (
              <video
                src={activeItem.imageUrl}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="max-w-full max-h-[78vh] rounded-xl shadow-2xl"
              />
            ) : (
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title}
                width={1200}
                height={800}
                priority
                className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
              />
            )}
          </div>

          {/* Next */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 p-3 text-gray-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-full transition-colors z-10"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Title + source at bottom */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 px-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-semibold text-sm">{activeItem.title}</p>
            {activeItem.sourceUrl && (
              <a
                href={activeItem.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E5212E] bg-white/[0.06] hover:bg-white/[0.12] px-3 py-1.5 rounded-full transition-colors"
              >
                <ExternalLink size={11} />
                View Source
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
