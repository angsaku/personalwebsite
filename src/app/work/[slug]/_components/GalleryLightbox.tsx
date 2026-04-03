"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function Skeleton() {
  return (
    <div className="absolute inset-0 bg-[#0a1128] animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}

interface Props {
  images: string[];
  title: string;
}

export default function GalleryLightbox({ images, title }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

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

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function openAt(i: number) {
    setCurrent(i);
    setOpen(true);
  }

  return (
    <>
      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-3 auto-rows-[220px]">
        {images.map((src, i) => {
          const total = images.length;
          let colSpan = "col-span-4";

          if (total === 1) {
            colSpan = "col-span-12";
          } else if (total === 2) {
            colSpan = i === 0 ? "col-span-8" : "col-span-4";
          } else {
            if (i === 0) colSpan = "col-span-8";
            else if (i === 1) colSpan = "col-span-4";
            else if (total === 4 && i === 3) colSpan = "col-span-8";
            else colSpan = "col-span-4";
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => openAt(i)}
              className={`${colSpan} relative rounded-xl overflow-hidden bg-[#0a1128] border border-white/[0.06] group cursor-zoom-in`}
            >
              <Skeleton />
              <Image
                src={src}
                alt={`${title} gallery ${i + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onLoad={(e) => {
                  const skeleton = (e.target as HTMLElement).previousElementSibling as HTMLElement | null;
                  if (skeleton) skeleton.style.display = "none";
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
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
            {current + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 p-3 text-gray-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-full transition-colors z-10"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt={`${title} ${current + 1}`}
              width={1200}
              height={800}
              priority
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 p-3 text-gray-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-full transition-colors z-10"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  className={`w-12 h-8 rounded-md overflow-hidden border-2 transition-all ${i === current ? "border-[#E5212E]" : "border-white/20 opacity-50 hover:opacity-100"}`}
                >
                  <Image src={src} alt="" width={48} height={32} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
