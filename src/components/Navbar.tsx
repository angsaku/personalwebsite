"use client";

import { useEffect, useRef, useState } from "react";

const LINKS: [string, string][] = [
  ["#work", "Work"],
  ["#about", "About"],
  ["#experience", "Experience"],
  ["#services", "Services"],
  ["#blog", "Blog"],
  ["#contact", "Contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Esc closes and returns focus; leaving the mobile breakpoint resets state
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 641px)");
    const onChange = () => { if (mq.matches) setOpen(false); };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <div className="sk-topbar">
      {/* Logo mark */}
      <div className="sk-topbar-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-sk.svg"
          alt="Satriya Kurniawan"
          width={40}
          height={40}
          style={{ display: "block", height: "40px", width: "auto" }}
        />
      </div>

      <button
        ref={toggleRef}
        type="button"
        className="sk-nav-toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sk-burger" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav
        id="primary-nav"
        className={`nav${open ? " is-open" : ""}`}
        aria-label="Primary"
      >
        {LINKS.map(([href, label], i) => (
          <a
            key={href}
            href={href}
            style={{ "--i": i } as React.CSSProperties}
            data-cursor="hover"
            data-cursor-label="↘ go"
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
