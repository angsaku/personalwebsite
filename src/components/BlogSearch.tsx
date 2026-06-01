"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/");
}

export default function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery]       = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = posts.map((p) => p.tag).filter(Boolean);
    return Array.from(new Set(tags));
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q);
      const matchesTag = !activeTag || p.tag === activeTag;
      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      {/* ── Search bar ── */}
      <div className="sk-blog-search-wrap">
        <span className="sk-blog-search-icon sk-mono">⌕</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH BY TITLE, TAG, OR KEYWORD..."
          className="sk-blog-search-input sk-mono"
        />
        {query && (
          <button
            type="button"
            className="sk-blog-search-clear sk-mono"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Tag filters ── */}
      {allTags.length > 0 && (
        <div className="sk-blog-tag-filters">
          <button
            type="button"
            className={`sk-blog-tag-btn sk-mono${!activeTag ? " active" : ""}`}
            onClick={() => setActiveTag(null)}
          >
            ALL
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`sk-blog-tag-btn sk-mono${activeTag === tag ? " active" : ""}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* ── Count ── */}
      <div className="sk-blog-results-count sk-mono">
        {filtered.length} {filtered.length === 1 ? "POST" : "POSTS"} FOUND
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="sk-blog-grid">
          {filtered.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`sk-blog-card${i === 0 ? " feat" : i % 3 === 2 ? " tilt-l" : ""}`}
              data-cursor="hover"
              data-cursor-label="↗ read"
            >
              {/* Cover thumbnail — only non-featured */}
              {i !== 0 && isValidUrl(post.coverUrl) && (
                // eslint-disable-next-line @next/next/no-img-element
                <div className="sk-blog-card-cover">
                  <img
                    src={post.coverUrl!}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              )}

              <header>
                <span className="b-tag sk-mono">{post.tag}</span>
                <span className="b-date sk-mono">{post.date}</span>
              </header>

              <h3 className="b-title">{post.title.toUpperCase()}</h3>

              <p className="b-excerpt sk-serif">{post.excerpt}</p>

              <footer>
                <span className="b-time sk-mono">{post.readTime}</span>
                <span className="b-go">→</span>
              </footer>
            </Link>
          ))}
        </div>
      ) : (
        <div className="sk-blog-empty">
          <div className="icon">✦</div>
          <div className="title">NO POSTS FOUND</div>
          <div className="sub sk-mono">TRY A DIFFERENT KEYWORD OR TAG</div>
          <button
            type="button"
            className="sk-btn-ghost sk-mono"
            onClick={() => { setQuery(""); setActiveTag(null); }}
            style={{ marginTop: 8 }}
          >
            CLEAR FILTERS <span>✕</span>
          </button>
        </div>
      )}
    </div>
  );
}
