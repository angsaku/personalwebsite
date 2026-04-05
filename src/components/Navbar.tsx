"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ScrollLink from "@/components/ScrollLink";
import ScrambleText from "@/components/ScrambleText";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Visual", href: "#visual" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 60));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      {/* Pill wrapper — transitions from full-width bar to centered capsule */}
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled
            ? "mt-3 w-auto rounded-full bg-[#020618]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "mt-0 w-full bg-transparent border-transparent"
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "px-7 h-14 gap-8"
              : "max-w-6xl mx-auto px-6 h-16 gap-8"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Satriya Kurniawan"
              className={`w-auto transition-all duration-500 ${scrolled ? "h-7" : "h-8"}`}
              width={32}
              height={32}
              fetchPriority="high"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <ScrollLink
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-all duration-300 tracking-wide"
                >
                  <ScrambleText text={link.label} />
                </ScrollLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <ScrollLink
              href="#contact"
              className="text-sm px-5 py-2 border border-[#E5212E] text-[#E5212E] rounded-full hover:bg-[#E5212E] hover:text-white transition-all duration-300"
            >
              Let&apos;s Talk
            </ScrollLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-400 hover:text-white p-1 transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu — full width dropdown */}
      {open && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl bg-[#020618]/95 backdrop-blur-xl border border-white/[0.08] px-6 py-6 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors text-base"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </ScrollLink>
          ))}
          <ScrollLink
            href="#contact"
            className="mt-2 text-sm px-5 py-2 border border-[#E5212E] text-[#E5212E] rounded-full text-center hover:bg-[#E5212E] hover:text-white transition-all"
            onClick={() => setOpen(false)}
          >
            Let&apos;s Talk
          </ScrollLink>
        </div>
      )}
    </header>
  );
}
