"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import type { Project } from "@/lib/selected-work";

const PER_PAGE = 6;

export default function WorkSearch({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.year.includes(q)
    );
  }, [projects, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const hovered = hover !== null ? paginated[hover] : null;

  function handleQuery(val: string) {
    setQuery(val);
    setPage(1);
  }

  return (
    <>
      {/* ── Search ── */}
      <div className="sk-blog-search-wrap">
        <span className="sk-blog-search-icon sk-mono">⌕</span>
        <input
          type="text"
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
          placeholder="SEARCH BY TITLE, CATEGORY, OR TAG..."
          className="sk-blog-search-input sk-mono"
          data-gramm="false"
          suppressHydrationWarning
        />
        {query && (
          <button
            type="button"
            className="sk-blog-search-clear sk-mono"
            onClick={() => handleQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Count ── */}
      <div className="sk-blog-results-count sk-mono">
        {filtered.length} {filtered.length === 1 ? "PROJECT" : "PROJECTS"} FOUND
      </div>

      {/* ── List ── */}
      {paginated.length > 0 ? (
        <div className="sk-work">
          {paginated.map((p, i) => (
            <Link
              key={p.id}
              href={`/work/${p.slug}`}
              className="sk-work-row rv"
              data-cursor="hover"
              data-cursor-label="↗ open"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="idx sk-mono">
                № {String((safePage - 1) * PER_PAGE + i + 1).padStart(2, "0")}
              </span>
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
      ) : (
        <div className="sk-blog-empty">
          <div className="icon">✦</div>
          <div className="title">NO PROJECTS FOUND</div>
          <div className="sub sk-mono">TRY A DIFFERENT KEYWORD</div>
          <button
            type="button"
            className="sk-btn-ghost sk-mono"
            onClick={() => handleQuery("")}
            style={{ marginTop: 8 }}
          >
            CLEAR <span>✕</span>
          </button>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="sk-work-pagination sk-mono">
          <button
            type="button"
            className="sk-work-page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
          >
            ← PREV
          </button>

          <div className="sk-work-page-nums">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`sk-work-page-num${n === safePage ? " active" : ""}`}
                onClick={() => setPage(n)}
              >
                {String(n).padStart(2, "0")}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="sk-work-page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
          >
            NEXT →
          </button>
        </div>
      )}

      {/* ── Hover thumbnail preview ── */}
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
            <div className="sk-work-preview-label sk-mono">≈ {hovered.title}</div>
          </>
        ) : (
          <div className="ph">
            <span className="sk-mono">{hovered ? `≈ ${hovered.title}` : ""}</span>
          </div>
        )}
      </div>
    </>
  );
}
