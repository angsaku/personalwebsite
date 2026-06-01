"use client";
import { useState, useRef, useEffect } from "react";
import type { VisualItem } from "@/lib/visual-explorations";

const VIDEO_EXTS = /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i;
function isVideo(url: string) { return VIDEO_EXTS.test(url); }

interface Tile {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  title: string;
  imageUrl: string;
  z?: number;
  dragging?: boolean;
}

/* Deterministic layout — cycles through sizes/rotations by index */
const WIDTHS  = [260, 200, 320, 220, 240, 340, 200, 180, 280, 220, 260];
const HEIGHTS = [200, 280, 210, 220, 240, 200, 250, 180, 180, 160, 220];
const ROTS    = [-4,   3,  -2,   5,   2,  -3,   6,  -5,   1,  -2,   3];

function buildTiles(items: VisualItem[]): Tile[] {
  return items.map((item, i) => {
    const col    = i % 3;
    const row    = Math.floor(i / 3);
    const jitter = (i % 2 === 0 ? 0 : 36);
    return {
      id:       item.id,
      x:        col * 400 + 20 + jitter,
      y:        row * 300 + 20 + (i % 3 === 1 ? 24 : 0),
      w:        WIDTHS[i % WIDTHS.length],
      h:        HEIGHTS[i % HEIGHTS.length],
      r:        ROTS[i % ROTS.length],
      title:    item.title,
      imageUrl: item.imageUrl,
    };
  });
}

const MAX_W = 320;

function onImgLoad(
  e: React.SyntheticEvent<HTMLImageElement>,
  id: string,
  setTiles: React.Dispatch<React.SetStateAction<Tile[]>>
) {
  const img = e.currentTarget;
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  if (!nw || !nh) return;
  const scale = Math.min(1, MAX_W / nw);
  const w = Math.round(nw * scale);
  const h = Math.round(nh * scale);
  setTiles((ts) => ts.map((t) => (t.id === id ? { ...t, w, h } : t)));
}

interface Lightbox { imageUrl: string; title: string; isVideo: boolean }

export default function PhotoDumpClient({ items }: { items: VisualItem[] }) {
  const [tiles, setTiles] = useState<Tile[]>(() => buildTiles(items));
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const dragging = useRef<{ id: string; dx: number; dy: number; moved: boolean } | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragging.current) return;
      const { id, dx, dy } = dragging.current;
      dragging.current.moved = true;
      setTiles((ts) =>
        ts.map((t) =>
          t.id === id ? { ...t, x: e.clientX - dx, y: e.clientY - dy, dragging: true } : t
        )
      );
    };
    const up = (e: MouseEvent) => {
      if (dragging.current) {
        const { id, moved } = dragging.current;
        setTiles((ts) => ts.map((t) => (t.id === id ? { ...t, dragging: false } : t)));
        if (!moved) {
          const tile = tiles.find((t) => t.id === id);
          if (tile) setLightbox({ imageUrl: tile.imageUrl, title: tile.title, isVideo: isVideo(tile.imageUrl) });
        }
      }
      dragging.current = null;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [tiles]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const onDown = (e: React.MouseEvent, t: Tile) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragging.current = { id: t.id, dx: e.clientX - rect.left, dy: e.clientY - rect.top, moved: false };
    setTiles((ts) => {
      const max = Math.max(...ts.map((x) => x.z ?? 1));
      return ts.map((x) => (x.id === t.id ? { ...x, z: max + 1 } : x));
    });
  };

  /* Stage height: enough to contain all tiles */
  const stageH = Math.max(600, ...tiles.map((t) => t.y + t.h + 40));

  return (
    <>
      <div className="sk-dump-stage" style={{ minHeight: stageH }}>
        <div className="sk-drag-hint sk-mono">★ pick up &amp; throw around</div>

        {tiles.map((t) => (
          <div
            key={t.id}
            className={`sk-dump-tile${t.dragging ? " is-dragging" : ""}`}
            data-cursor="drag"
            data-cursor-label="grab"
            onMouseDown={(e) => onDown(e, t)}
            style={{
              left: t.x,
              top: t.y,
              width: t.w,
              height: t.h,
              transform: `rotate(${t.r}deg)`,
              zIndex: t.z ?? 1,
              overflow: "hidden",
              position: "absolute",
            }}
          >
            {isVideo(t.imageUrl) ? (
              <video
                src={t.imageUrl}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={t.imageUrl}
                alt={t.title}
                draggable={false}
                onLoad={(e) => onImgLoad(e, t.id, setTiles)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            )}
            <div className="sk-dump-caption sk-mono">{t.title}</div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          {lightbox.isVideo ? (
            <video
              src={lightbox.imageUrl}
              autoPlay
              loop
              muted
              playsInline
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "90vw", maxHeight: "80vh", borderRadius: 4, cursor: "default" }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lightbox.imageUrl}
              alt={lightbox.title}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", borderRadius: 4, cursor: "default" }}
            />
          )}
          {lightbox.title && (
            <p
              className="sk-mono"
              style={{ marginTop: 16, color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}
            >
              {lightbox.title}
            </p>
          )}
        </div>
      )}
    </>
  );
}
