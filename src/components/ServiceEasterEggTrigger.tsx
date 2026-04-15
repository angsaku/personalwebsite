"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ServiceEasterEggTrigger() {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <span className="relative inline-block">
      <span
        className="cursor-pointer select-none"
        style={{ borderBottom: `2px solid ${hovered ? "#E5212E" : "transparent"}`, paddingBottom: "2px", transition: "border-color 0.3s ease" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => router.push("/approach")}
      >
        I can do<span className="text-[#E5212E]">.</span>
      </span>

      {/* Tooltip — desktop hover only */}
      <span
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#0a1128] border border-[#E5212E]/30 rounded-full text-xs text-[#E5212E] transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0, transform: `translateX(-50%) translateY(${hovered ? "0px" : "4px"})` }}
        aria-hidden
      >
        ✦ see my approach
      </span>

      {/* Mobile hint — always visible on small screens, same style as desktop tooltip */}
      <span
        className="md:hidden absolute -top-8 left-0 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 bg-[#0a1128] border border-[#E5212E]/30 rounded-full text-xs text-[#E5212E] pointer-events-none"
        aria-hidden
      >
        ✦ see my approach
      </span>
    </span>
  );
}
