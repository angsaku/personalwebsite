"use client";
import { ArrowDownRight } from "lucide-react";
import ScrollLink from "@/components/ScrollLink";

export default function HeroButtons() {
  return (
    <div className="flex items-center gap-4">
      <ScrollLink
        href="#work"
        className="group flex items-center gap-2 bg-[#E5212E] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#c41c28] transition-all duration-300"
      >
        View Work
        <ArrowDownRight
          size={16}
          className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
        />
      </ScrollLink>
      <ScrollLink
        href="#contact"
        className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
      >
        Get in touch
      </ScrollLink>
    </div>
  );
}
