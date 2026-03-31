"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteExperience } from "@/app/admin/actions";

type Exp = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
};

export default function ExperienceRow({ exp }: { exp: Exp }) {
  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-t border-white/[0.06] hover:bg-white/[0.02] transition-colors items-center">
      <div className="col-span-4">
        <p className="text-sm text-white font-medium">{exp.role}</p>
        <p className="text-xs text-[#E5212E]/70 mt-0.5">{exp.company}</p>
      </div>
      <div className="col-span-3">
        <p className="text-xs text-gray-500 font-mono">{exp.period}</p>
      </div>
      <div className="col-span-3">
        <p className="text-xs text-gray-600">{exp.location}</p>
      </div>
      <div className="col-span-2 flex items-center justify-end gap-2">
        <Link
          href={`/admin/experience/${exp.id}`}
          className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
        >
          <Pencil size={14} />
        </Link>
        <form action={deleteExperience.bind(null, exp.id)}>
          <button
            type="submit"
            className="p-2 text-gray-500 hover:text-[#E5212E] hover:bg-[#E5212E]/10 rounded-lg transition-colors"
            onClick={(e) => {
              if (!confirm("Delete this experience?")) e.preventDefault();
            }}
          >
            <Trash2 size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
