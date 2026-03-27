export const revalidate = 0;

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSelectedWork } from "@/lib/selected-work";
import WorkList from "@/components/WorkList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects — Satriya Kurniawan",
  description: "A full collection of design projects spanning mobile, web, and enterprise products.",
};

export default async function WorkPage() {
  const projects = await getSelectedWork();

  return (
    <div className="min-h-screen bg-[#020618] text-gray-200">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#work"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Satriya Kurniawan"
              className="h-7 w-auto"
              width={28}
              height={28}
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
        <div className="blur-blob absolute top-0 right-1/4 w-80 h-80 bg-[#E5212E] rounded-full blur-[180px] opacity-[0.07] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            All Projects<span className="text-[#E5212E]">.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            A full collection of design projects spanning mobile, web, and enterprise products.
          </p>
        </div>
      </div>

      {/* Project list */}
      <div className="max-w-6xl mx-auto px-6 py-16 pb-32">
        <WorkList projects={projects} />
      </div>
    </div>
  );
}
