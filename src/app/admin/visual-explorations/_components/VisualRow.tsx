"use client";

import Link from "next/link";
import { Pencil, Trash2, ExternalLink, Film } from "lucide-react";

function isVideo(url: string) {
  return /\.(webm|mp4|mov)$/i.test(url);
}
import { deleteVisualExploration } from "@/app/admin/actions";

type Item = {
  id: string;
  title: string;
  image_url: string;
  source_url: string | null;
  sort_order: number;
  published: boolean;
};

export default function VisualRow({ item }: { item: Item }) {
  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center">
      {/* Thumbnail */}
      <div className="col-span-1">
        {isVideo(item.image_url) ? (
          <div className="w-10 h-10 rounded-lg border border-white/[0.08] bg-[#0a1128] flex items-center justify-center">
            <Film size={14} className="text-[#E5212E]" />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image_url} alt={item.title} className="w-10 h-10 object-cover rounded-lg border border-white/[0.08]" />
        )}
      </div>
      {/* Title */}
      <p className="col-span-4 text-sm text-white font-medium truncate">{item.title}</p>
      {/* Source */}
      <div className="col-span-4 flex items-center gap-1.5">
        {item.source_url ? (
          <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#E5212E] hover:underline truncate max-w-[200px]">
            <ExternalLink size={10} />
            {item.source_url.replace(/^https?:\/\//, "")}
          </a>
        ) : (
          <span className="text-xs text-gray-700">—</span>
        )}
      </div>
      {/* Published */}
      <div className="col-span-1 flex justify-center">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${item.published ? "bg-green-500/10 text-green-400" : "bg-white/[0.04] text-gray-600"}`}>
          {item.published ? "Live" : "Draft"}
        </span>
      </div>
      {/* Order */}
      <p className="col-span-1 text-xs text-gray-600 text-center">{item.sort_order}</p>
      {/* Actions */}
      <div className="col-span-1 flex items-center justify-end gap-2">
        <Link href={`/admin/visual-explorations/${item.id}`} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors">
          <Pencil size={13} />
        </Link>
        <form action={deleteVisualExploration.bind(null, item.id)}>
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
