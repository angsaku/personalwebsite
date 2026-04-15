export const revalidate = 0;

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, MapPin, Mail, Linkedin, Instagram, Github, Youtube, MessageCircle } from "lucide-react";
import { getAboutContent } from "@/lib/about";
import { getBeyondWork } from "@/lib/beyond-work";
import { getCommunities } from "@/lib/communities";
import { getCtaContent } from "@/lib/cta";
import { ICON_MAP } from "@/lib/icon-map";
import type { Metadata } from "next";
import SkillTag from "@/components/SkillTag";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Me — Satriya Kurniawan",
  description: "A little more about who I am beyond the portfolio — hobbies, interests, and what drives me.",
};

function XLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function toDirectImageUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
}

// Bento span pattern for a 4-column grid (repeats)
// Gives: [wide][wide] / [narrow][narrow][wide] / [wide][wide] / ...
const SPAN_PATTERN = [2, 2, 1, 1, 2, 2, 2, 1, 1, 2];

function getBentoSpan(index: number) {
  return SPAN_PATTERN[index % SPAN_PATTERN.length] ?? 2;
}

export default async function AboutPage() {
  const [about, beyondWork, communities, cta] = await Promise.all([getAboutContent(), getBeyondWork(), getCommunities(), getCtaContent()]);

  return (
    <div className="min-h-screen bg-[#020618] text-gray-200">
      <ScrollToTop />
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#about"
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
        <div className="blur-blob absolute top-0 left-1/4 w-96 h-96 bg-[#E5212E] rounded-full blur-[200px] opacity-[0.07] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">

            {/* Photo */}
            <div className="flex-shrink-0 fade-up delay-1">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden bg-[#0a1128] border border-white/[0.08] relative">
                {about.photoUrl ? (
                  <Image src={toDirectImageUrl(about.photoUrl)} alt="Satriya Kurniawan" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl text-gray-600">👤</span>
                  </div>
                )}
              </div>
            </div>

            {/* Intro */}
            <div className="text-center md:text-left">
              <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3 fade-up delay-2">About Me</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3 fade-up delay-3">
                {about.heading}<span className="text-[#E5212E]">.</span>
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 mb-6 fade-up delay-4">
                <MapPin size={14} />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 fade-up delay-5">
                {about.resumeUrl && (
                  <a
                    href={about.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E5212E] text-white text-sm font-medium rounded-full hover:bg-[#c41a25] transition-colors"
                  >
                    <Download size={14} />
                    Download Resume
                  </a>
                )}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-gray-400 text-sm font-medium rounded-full hover:border-white/30 hover:text-white transition-colors"
                >
                  Get in Touch
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 pb-32 space-y-20">

        {/* Bio */}
        <ScrollReveal direction="up" threshold={0.1}>
          <section>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-6">My Story</p>
            <div className="space-y-5 text-gray-400 leading-relaxed text-lg">
              <p>{about.bioParagraph1}</p>
              <p>{about.bioParagraph2}</p>
            </div>
          </section>
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal direction="up" threshold={0.1}>
          <section>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-6">Core Skills</p>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Beyond Work — Bento grid */}
        <ScrollReveal direction="up" threshold={0.06}>
          <section>
          <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-6">Beyond Work</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[minmax(140px,auto)]">
            {beyondWork.map((item, i) => {
              const Icon = ICON_MAP[item.icon];
              const span = getBentoSpan(i);
              const isWide = span === 2;

              return (
                <div
                  key={item.id}
                  style={{ gridColumn: `span ${span}` }}
                  className="group relative p-5 bg-[#0a1128] border border-white/[0.06] rounded-2xl hover:border-[#E5212E]/30 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Subtle radial glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 0% 100%, rgba(229,33,46,0.06) 0%, transparent 70%)" }}
                  />

                  <div>
                    <div className={`rounded-xl bg-[#E5212E]/10 border border-[#E5212E]/20 flex items-center justify-center mb-4 group-hover:bg-[#E5212E]/20 transition-colors ${isWide ? "w-12 h-12" : "w-10 h-10"}`}>
                      {Icon && <Icon size={isWide ? 22 : 17} className="text-[#E5212E]" />}
                    </div>
                    <p className={`font-semibold text-white mb-1.5 ${isWide ? "text-base" : "text-sm"}`}>{item.title}</p>
                    <p className={`text-gray-500 leading-relaxed ${isWide ? "text-sm" : "text-xs"}`}>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          </section>
        </ScrollReveal>

        {/* Community */}
        <ScrollReveal direction="up" threshold={0.06}>
          <section>
          <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-6">Community</p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.06]" />
            <div className="space-y-10 pl-8">
              {communities.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Dot on the line */}
                  <div className="absolute -left-8 top-1.5 w-2 h-2 rounded-full bg-[#E5212E] ring-4 ring-[#020618] group-hover:scale-125 transition-transform" />

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div className="flex items-center gap-3">
                      {item.logo_url ? (
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0a1128] border border-white/[0.08] flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.logo_url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#0a1128] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-gray-600">{item.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-base font-semibold text-white">{item.name}</p>
                        <p className="text-sm text-[#E5212E]">{item.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 shrink-0 mt-0.5 sm:pt-1">{item.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          </section>
        </ScrollReveal>

      </div>

      {/* Let's Collaborate */}
      <ScrollReveal direction="up" threshold={0.08}>
        <section id="contact" className="relative overflow-hidden border-t border-white/[0.06] py-24 px-6">
          <div className="blur-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E5212E] rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center">
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-6">{cta.label}</p>

            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              {cta.headline}
            </h2>

            <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed mb-10">
              {cta.body_text}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a
                href={`mailto:${cta.email}`}
                className="group flex items-center gap-2 bg-[#E5212E] text-white px-6 py-4 rounded-full text-sm font-medium hover:bg-[#c41c28] transition-all duration-300 max-w-full overflow-hidden"
              >
                <Mail size={16} className="flex-shrink-0" />
                <span className="truncate">{cta.email}</span>
                <ArrowUpRight size={14} className="flex-shrink-0" />
              </a>
              <a
                href={`https://wa.me/${cta.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/10 text-gray-400 px-6 py-4 rounded-full text-sm font-medium hover:border-white/30 hover:text-white transition-all duration-300"
              >
                <MessageCircle size={16} className="flex-shrink-0" />
                WhatsApp
              </a>
            </div>

            <div className="flex flex-row items-center justify-center gap-3 mt-14 pt-10 border-t border-white/[0.06]">
              {[
                { label: "LinkedIn", icon: Linkedin, href: cta.linkedin_url, text: null, svg: null },
                { label: "Instagram", icon: Instagram, href: cta.instagram_url, text: null, svg: null },
                { label: "GitHub", icon: Github, href: cta.github_url, text: null, svg: null },
                { label: "X", icon: null, href: cta.twitter_url, text: null, svg: XLogo },
                { label: "YouTube", icon: Youtube, href: cta.youtube_url, text: null, svg: null },
                { label: "Behance", icon: null, href: cta.behance_url, text: "Be", svg: null },
                { label: "Dribbble", icon: null, href: cta.dribbble_url, text: "Dr", svg: null },
                { label: "TikTok", icon: null, href: cta.tiktok_url, text: "Tt", svg: null },
              ].filter((s) => s.href).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 border border-transparent hover:text-white hover:bg-[#E5212E]/10 hover:border-[#E5212E]/40 transition-all duration-200"
                >
                  {s.icon ? (
                    <s.icon size={16} />
                  ) : s.svg ? (
                    <s.svg size={16} />
                  ) : (
                    <span className="text-xs font-bold leading-none">{s.text}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

    </div>
  );
}
