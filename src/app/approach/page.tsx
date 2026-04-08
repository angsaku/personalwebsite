export const revalidate = 3600;

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceApproachAccordion from "./_components/ServiceApproachAccordion";
import {
  getWorkflowConfig,
  getWorkflowPrinciples,
  getWorkflowPhases,
  getWorkflowServices,
} from "@/lib/workflow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Approach — Satriya Kurniawan",
  description: "How I work — my design philosophy, general workflow, and approach for each service.",
};

export default async function ApproachPage() {
  const [config, principles, phases, services] = await Promise.all([
    getWorkflowConfig(),
    getWorkflowPrinciples(),
    getWorkflowPhases(),
    getWorkflowServices(),
  ]);

  return (
    <div className="min-h-screen bg-[#020618] text-gray-200">
      <ScrollToTop />

      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#services"
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
        <div className="blur-blob absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#E5212E] rounded-full blur-[200px] opacity-[0.07] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-4 fade-up delay-1">My Approach</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-8 fade-up delay-2">
            {config.headline.replace(".", "")}<span className="text-[#E5212E]">.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed fade-up delay-3">
            {config.philosophy}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 pb-32 space-y-24">

        {/* Mindset */}
        <ScrollReveal direction="up" threshold={0.08}>
          <section>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-10">Mindset</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {principles.map((p, i) => (
                <div
                  key={p.id}
                  className="group p-6 bg-[#0a1128] border border-white/[0.06] rounded-2xl hover:border-[#E5212E]/20 transition-colors"
                >
                  <span className="text-xs text-[#E5212E]/40 font-mono group-hover:text-[#E5212E]/70 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold text-white mt-3 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Workflow Phases */}
        <ScrollReveal direction="up" threshold={0.06}>
          <section>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-10">General Workflow</p>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#E5212E]/40 via-[#E5212E]/10 to-transparent" />
              <div className="space-y-8">
                {phases.map((phase) => (
                  <div key={phase.id} className="relative flex gap-6 group">
                    {/* Bubble */}
                    <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-[#020618] border border-[#E5212E]/40 group-hover:border-[#E5212E] group-hover:bg-[#E5212E]/10 flex items-center justify-center transition-all duration-300 z-10">
                      <span className="text-xs font-bold text-[#E5212E]">{phase.number}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="bg-[#0a1128] border border-white/[0.06] group-hover:border-[#E5212E]/20 rounded-2xl p-6 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#E5212E] transition-colors">
                          {phase.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-4">{phase.description}</p>
                        <div
                          className="blog-content text-gray-400 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: phase.content }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Per-service approach */}
        <ScrollReveal direction="up" threshold={0.06}>
          <section>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">Per-Service Approach</p>
            <p className="text-gray-500 text-sm mb-8">How I adapt the process depending on the type of work.</p>
            <ServiceApproachAccordion services={services} />
          </section>
        </ScrollReveal>

        {/* How to work with me */}
        <ScrollReveal direction="up" threshold={0.08}>
          <section>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">How to Work With Me</p>
            <p className="text-gray-500 text-sm mb-8">Flexible engagement models depending on your needs.</p>
            <div
              className="blog-content bg-[#0a1128] border border-white/[0.06] rounded-2xl p-8 text-gray-400 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: config.engagement_content }}
            />
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" threshold={0.1}>
          <section className="border border-[#E5212E]/20 bg-[#E5212E]/[0.04] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs text-[#E5212E] tracking-[0.25em] uppercase mb-2">Ready to start?</p>
              <h3 className="text-lg font-semibold text-white">Let&apos;s work on something together.</h3>
              <p className="text-sm text-gray-500 mt-1">Tell me about your project and let&apos;s figure out the best way to move forward.</p>
            </div>
            <Link
              href="/#contact"
              className="flex items-center gap-2 px-6 py-3 bg-[#E5212E] text-white text-sm font-medium rounded-full hover:bg-[#c41a25] transition-colors whitespace-nowrap flex-shrink-0"
            >
              Get in Touch
              <ArrowUpRight size={15} />
            </Link>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
