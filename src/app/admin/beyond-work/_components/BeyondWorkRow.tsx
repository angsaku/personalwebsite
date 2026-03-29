"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteBeyondWork } from "@/app/admin/actions";
import { ICON_MAP } from "@/lib/icon-map";

type Item = { id: string; icon: string; title: string; description: string; sort_order: number };

export default function BeyondWorkRow({ item }: { item: Item }) {
  const Icon = ICON_MAP[item.icon];

  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center">
      <div className="col-span-1 flex items-center justify-center w-8 h-8 rounded-lg bg-[#E5212E]/10 border border-[#E5212E]/20">
        {Icon ? <Icon size={14} className="text-[#E5212E]" /> : <span className="text-xs text-gray-500">{item.icon}</span>}
      </div>
      <p className="col-span-3 text-sm text-white font-medium truncate">{item.title}</p>
      <p className="col-span-6 text-xs text-gray-500 truncate">{item.description}</p>
      <p className="col-span-1 text-xs text-gray-600 text-center">{item.sort_order}</p>
      <div className="col-span-1 flex items-center justify-end gap-2">
        <Link
          href={`/admin/beyond-work/${item.id}`}
          className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <Pencil size={13} />
        </Link>
        <form action={deleteBeyondWork.bind(null, item.id)}>
          <button
            type="submit"
            className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            onClick={(e) => { if (!confirm("Delete this item?")) e.preventDefault(); }}
          >
            <Trash2 size={13} />
          </button>
        </form>
      </div>
    </div>
  );
}
