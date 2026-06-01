"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/selected-work";

export default function WorkList({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const hovered = hover !== null ? projects[hover] : null;

  return (
    <>
      <div className="sk-work">
        {projects.map((p, i) => (
          <Link
            key={p.id}
            href={`/work/${p.slug}`}
            className="sk-work-row rv"
            data-cursor="hover"
            data-cursor-label="↗ open"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="idx sk-mono">№ {String(i + 1).padStart(2, "0")}</span>
            <span className="title">{p.title.toUpperCase()}</span>
            <span className="meta sk-mono">
              {p.category}
              <br />
              {p.tags.slice(0, 2).join(" / ")}
            </span>
            <span className="yr sk-mono">{p.year}</span>
            <span className="arrow">→</span>
          </Link>
        ))}
      </div>

      {/* Hover thumbnail preview — follows cursor */}
      <div
        className={`sk-work-preview${hover !== null ? " show" : ""}`}
        style={{ left: pos.x + 24, top: pos.y - 60 }}
      >
        {hovered?.thumbnailUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hovered.thumbnailUrl}
              alt={hovered.title}
              className="sk-work-preview-img"
            />
            <div className="sk-work-preview-label sk-mono">
              ≈ {hovered.title}
            </div>
          </>
        ) : (
          <div className="ph">
            <span className="sk-mono">
              {hovered ? `≈ ${hovered.title}` : ""}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
