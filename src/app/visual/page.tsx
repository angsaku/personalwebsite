export const revalidate = 3600;

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getVisualExplorations } from "@/lib/visual-explorations";
import VisualPageGrid from "./_components/VisualPageGrid";
import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Exploration — Satriya Kurniawan",
  description: "A collection of visual experiments, side explorations, and creative work outside of client projects.",
};

export default async function VisualPage() {
  const items = await getVisualExplorations();

  return (
    <div className="min-h-screen bg-[#020618] text-gray-200">
      <ScrollToTop />

      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#visual"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Satriya Kurniawan" className="h-7 w-auto" width={28} height={28} />
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
        <div className="blur-blob absolute top-0 right-1/4 w-96 h-96 bg-[#E5212E] rounded-full blur-[200px] opacity-[0.07] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-4 fade-up delay-1">
            Visual Exploration
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 fade-up delay-2">
            Things I&apos;ve made<span className="text-[#E5212E]">.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed fade-up delay-3">
            A collection of visual experiments, side explorations, and creative work outside of client projects.
          </p>
          <p className="text-xs text-gray-700 mt-4 fade-up delay-4">{items.length} visuals</p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 pb-32">
        {items.length > 0 ? (
          <VisualPageGrid items={items} />
        ) : (
          <p className="text-center text-gray-600 py-24">No visuals published yet.</p>
        )}
      </div>
    </div>
  );
}
