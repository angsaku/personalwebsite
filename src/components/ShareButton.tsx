"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link2, Linkedin, Twitter, Check } from "lucide-react";

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function shareLinkedIn() {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  }

  function shareX() {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Share"
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors"
      >
        <Share2 size={14} />
        Share
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#0a1128] border border-white/[0.08] rounded-xl shadow-xl z-50 overflow-hidden">
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Link2 size={14} />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button
            onClick={shareLinkedIn}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <Linkedin size={14} />
            Share to LinkedIn
          </button>
          <button
            onClick={shareX}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <Twitter size={14} />
            Share to X
          </button>
        </div>
      )}
    </div>
  );
}
