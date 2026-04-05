"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SkillTag from "@/components/SkillTag";

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
};

export default function ExperienceItem({ exp, defaultOpen = false }: { exp: Experience; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="group relative border-t border-white/[0.06]">
      <span className="service-sweep absolute top-0 left-0 right-0 h-px bg-[#E5212E]" />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 py-8 text-left"
      >
        {/* Period */}
        <div className="md:col-span-3">
          <p className="text-xs text-gray-600 font-mono">{exp.period}</p>
          <p className="text-xs text-gray-700 mt-1">{exp.location}</p>
        </div>

        {/* Role + company + chevron */}
        <div className="md:col-span-9 flex items-start justify-between gap-4">
          <div>
            <h3 className={`text-xl font-semibold transition-colors ${open ? "text-[#E5212E]" : "text-white group-hover:text-[#E5212E]"}`}>
              {exp.role}
            </h3>
            <p className="text-sm text-[#E5212E]/70 mt-0.5">{exp.company}</p>
          </div>
          <ChevronDown
            size={18}
            className={`flex-shrink-0 mt-1.5 text-gray-600 group-hover:text-[#E5212E] transition-all duration-300 ${open ? "rotate-180 text-[#E5212E]" : ""}`}
          />
        </div>
      </button>

      {/* Collapsible content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8">
            <div className="md:col-span-3" />
            <div className="md:col-span-9 space-y-4">
              {exp.description.startsWith("<") ? (
                <div
                  className="blog-content text-sm max-w-2xl [&_*]:text-gray-500 [&_strong]:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              ) : exp.description.includes("\n- ") || exp.description.startsWith("- ") ? (
                <ul className="space-y-1.5 max-w-2xl">
                  {exp.description.split("\n").filter(Boolean).map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#E5212E]/50 flex-shrink-0" />
                      <span>{line.replace(/^-\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">{exp.description}</p>
              )}
              {exp.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((tag) => (
                    <SkillTag key={tag} label={tag} className="px-3 py-1 text-xs" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
