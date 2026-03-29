"use client";

import { useRef, useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";

type ReelItem = { url: string; thumbnail_url: string | null; instagram_url: string | null };

function toDirectUrl(url: string): string | null {
  const fileMatch = url.match(/\/file\/d\/([^/?]+)/);
  if (fileMatch) return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`;
  const openMatch = url.match(/[?&]id=([^&]+)/);
  if (openMatch) return `https://drive.google.com/uc?export=download&id=${openMatch[1]}`;
  return null;
}

function toThumbnailUrl(url: string): string | null {
  const fileMatch = url.match(/\/file\/d\/([^/?]+)/);
  if (fileMatch) return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w800`;
  return url.startsWith("http") ? url : null;
}

function VideoCard({ videoUrl, thumbnailUrl, instagramUrl }: {
  videoUrl: string;
  thumbnailUrl: string | null;
  instagramUrl: string | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  function handleMouseEnter() {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  }

  function handleMouseLeave() {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-[#0a1128] border border-white/[0.06] cursor-pointer"
      style={{ aspectRatio: "9/16" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        preload="none"
      />

      {/* Thumbnail cover — shown when not hovered */}
      {thumbnailUrl && (
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Dark overlay + play icon — shown when not hovered */}
      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}>
        <div className="w-14 h-14 rounded-full bg-white/10 border border-white/30 flex items-center justify-center backdrop-blur-sm">
          <Play size={20} className="text-white ml-1" fill="white" />
        </div>
      </div>

      {/* Instagram CTA — fades in on hover */}
      {instagramUrl && (
        <div
          className={`absolute bottom-0 inset-x-0 p-4 flex justify-end transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
        >
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium rounded-full hover:bg-white/20 transition-colors"
          >
            View on Instagram
            <ArrowUpRight size={12} />
          </a>
        </div>
      )}
    </div>
  );
}

export default function Reels({ items }: { items: ReelItem[] }) {
  const valid = items
    .map((item) => ({ ...item, videoUrl: toDirectUrl(item.url) }))
    .filter((item) => item.videoUrl) as (ReelItem & { videoUrl: string })[];

  if (valid.length === 0) {
    return <p className="text-xs text-gray-700 text-center py-8">No videos added yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {valid.map((item, i) => (
        <VideoCard
          key={i}
          videoUrl={item.videoUrl}
          thumbnailUrl={item.thumbnail_url ? toThumbnailUrl(item.thumbnail_url) : null}
          instagramUrl={item.instagram_url}
        />
      ))}
    </div>
  );
}
