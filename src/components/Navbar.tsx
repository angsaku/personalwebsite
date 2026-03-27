"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ScrollLink from "@/components/ScrollLink";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrolledBg = "bg-[#020618]/90 backdrop-blur-md border-b border-white/5";
  const mobileBg = "bg-[#020618]/95 backdrop-blur-md border-t border-white/5";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? scrolledBg : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="Satriya Kurniawan"
            className="h-8 w-auto"
            width={32}
            height={32}
            fetchPriority="high"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <ScrollLink
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors tracking-wide"
              >
                {link.label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <ScrollLink
            href="#contact"
            className="text-sm px-5 py-2 border border-[#E5212E] text-[#E5212E] rounded-full hover:bg-[#E5212E] hover:text-white transition-all duration-300"
          >
            Let&apos;s Talk
          </ScrollLink>
        </div>

        {/* Mobile: menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="text-gray-400 hover:text-white p-1"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden px-6 py-6 flex flex-col gap-4 ${mobileBg}`}>
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
