export const revalidate = 0;

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSelectedWork } from "@/lib/selected-work";
import BlogSearch from "@/components/BlogSearch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Case Studies — Satriya Kurniawan",
  description: "Design processes, case studies, and lessons from shipping real products.",
};

export default async function BlogPage() {
  const projects = await getSelectedWork();

  return (
    <div className="min-h-screen bg-[#020618] text-gray-200">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#blog"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://fzjpbihupkiggcdvynua.supabase.co/storage/v1/object/public/Logo%20Client/favicon.svg"
              alt="Satriya Kurniawan"
              className="h-7 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#E5212E] rounded-full blur-[180px] opacity-[0.07] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-4">
            Blog & Case Studies
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Thoughts & insights<span className="text-[#E5212E]">.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Design processes, case studies, and lessons from shipping real products.
          </p>
        </div>
      </div>

      {/* Searchable content */}
      <div className="max-w-6xl mx-auto px-6 py-16 pb-32">
        <BlogSearch projects={projects} />
      </div>
    </div>
  );
}
