"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, X, Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

export default function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
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
      {/* Search bar */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, tag, or keyword..."
          className="w-full bg-[#0a1128] border border-white/[0.08] rounded-full pl-11 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/40 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
              !activeTag
                ? "bg-[#E5212E] border-[#E5212E] text-white"
                : "border-white/[0.08] text-gray-500 hover:border-white/20 hover:text-gray-300"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
                activeTag === tag
                  ? "bg-[#E5212E] border-[#E5212E] text-white"
                  : "border-white/[0.08] text-gray-500 hover:border-white/20 hover:text-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-gray-600 mb-8">
        {filtered.length} {filtered.length === 1 ? "post" : "posts"} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#E5212E]/30 transition-all duration-300"
            >
              {/* Cover */}
              <div className="aspect-video bg-[#020618] border-b border-white/[0.06] overflow-hidden flex-shrink-0">
                {post.coverUrl ? (
                  <Image
                    src={post.coverUrl}
                    alt={post.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 rounded-lg bg-[#E5212E]/10 border border-[#E5212E]/20 flex items-center justify-center">
                      <span className="text-[#E5212E] text-xl">✦</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#E5212E] font-medium tracking-wide">
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-700 flex items-center gap-1">
                    <Calendar size={10} />
                    {post.date}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-[#E5212E] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] mt-auto">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-600 group-hover:text-[#E5212E] transition-colors flex-shrink-0"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="w-14 h-14 rounded-xl bg-[#E5212E]/10 border border-[#E5212E]/20 mx-auto mb-4 flex items-center justify-center">
            <Search size={20} className="text-[#E5212E]" />
          </div>
          <p className="text-white font-medium mb-1">No posts found</p>
          <p className="text-gray-600 text-sm">Try a different keyword or tag.</p>
        </div>
      )}
    </div>
  );
}
